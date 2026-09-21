// Page-weight budget for the built site.
//
// Runs against a Jekyll build (`_site` by default), so it can only assert what
// the build actually emits. Budgets are deliberately loose enough to be stable
// and tight enough to catch a new heavyweight dependency, a re-added runtime, or
// an accidental stylesheet layer. Run it after a build:
//
//   node test/performance_budget.js [_site]

const fs = require("node:fs");
const path = require("node:path");

const siteDir = process.argv[2] || "_site";
const failures = [];
const notes = [];

if (!fs.existsSync(siteDir)) {
  console.error(`Performance budget check failed: no build directory at \`${siteDir}\`.`);
  process.exit(1);
}

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
};

// Generated asset demos and vendored HTML are not site pages.
const pages = walk(siteDir).filter((file) => !path.relative(siteDir, file).startsWith(`assets${path.sep}`));

const pagesToReport = ["index.html", "blog/index.html", "cv/index.html", "repositories/index.html", "portfolio/index.html"];
const kB = (bytes) => `${Math.round(bytes / 1024)}kB`;

const budgets = {
  pageBytes: 160 * 1024,
  stylesheets: 14,
  scripts: 24,
  origins: 10,
  localCssBytes: 200 * 1024,
};

// Runtimes that were removed from this site on purpose. Re-appearing means a
// configuration default was restored or a new layer was added. Only asset URLs
// are inspected, so prose that happens to mention one of these words is fine.
const forbiddenAssets = ["masonry", "imagesloaded", "polyfill", "academicons", "scholar-icons"];

const cssFiles = new Set();
const origins = new Set();
const report = [];

for (const file of pages) {
  const relative = path.relative(siteDir, file).split(path.sep).join("/");
  const html = fs.readFileSync(file, "utf8");
  const bytes = Buffer.byteLength(html);

  const stylesheets = [...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*>/gi)].map((match) => match[0].match(/\bhref="([^"]+)"/i)?.[1] || "");
  // Only a real `src` attribute is a request. `\bsrc=` would also match inside
  // `data-src=` (the deferred-embed form), which made this count every deferred
  // TradingView embed as if it loaded. Quotes are handled explicitly so a
  // hand-written single-quoted tag is still counted.
  const scripts = [...html.matchAll(/<script\b[^>]*[\s"']src=(?:"([^"]+)"|'([^']+)')/gi)].map((match) => match[1] || match[2]);

  for (const href of stylesheets) {
    if (href.startsWith("/")) cssFiles.add(href.split("?")[0]);
  }
  const assets = [...stylesheets, ...scripts];
  for (const asset of assets) {
    if (/^https?:\/\//i.test(asset)) origins.add(new URL(asset).origin);
    for (const runtime of forbiddenAssets) {
      if (asset.toLowerCase().includes(runtime)) {
        failures.push(`\`${relative}\` must not load removed runtime \`${runtime}\` (${asset}).`);
      }
    }
  }

  if (bytes > budgets.pageBytes) {
    failures.push(`\`${relative}\` is ${kB(bytes)} of HTML (budget ${kB(budgets.pageBytes)}).`);
  }
  if (stylesheets.length > budgets.stylesheets) {
    failures.push(`\`${relative}\` requests ${stylesheets.length} stylesheets (budget ${budgets.stylesheets}).`);
  }
  if (scripts.length > budgets.scripts) {
    failures.push(`\`${relative}\` requests ${scripts.length} scripts (budget ${budgets.scripts}).`);
  }

  if (pagesToReport.includes(relative)) {
    report.push({ page: relative, html: kB(bytes), css: stylesheets.length, js: scripts.length });
  }
}

let localCssBytes = 0;
for (const href of cssFiles) {
  const file = path.join(siteDir, href);
  if (fs.existsSync(file)) localCssBytes += fs.statSync(file).size;
}
if (localCssBytes > budgets.localCssBytes) {
  failures.push(`Local CSS totals ${kB(localCssBytes)} across ${cssFiles.size} files (budget ${kB(budgets.localCssBytes)}).`);
}
if (origins.size > budgets.origins) {
  failures.push(`Pages load assets from ${origins.size} third-party origins (budget ${budgets.origins}).`);
}

notes.push(`pages=${pages.length} localCss=${kB(localCssBytes)} in ${cssFiles.size} files thirdPartyOrigins=${origins.size}`);

if (failures.length > 0) {
  console.error("Performance budget check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Performance budget check passed.");
console.log(`  ${notes.join(" · ")}`);
for (const row of report.sort((a, b) => a.page.localeCompare(b.page))) {
  console.log(`  ${row.page.padEnd(28)} html=${row.html.padStart(6)} css=${String(row.css).padStart(2)} js=${String(row.js).padStart(2)}`);
}
