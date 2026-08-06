import fs from "node:fs";

const expected = new Map([
  ["flappyk", "https://liuh886.github.io/FlappyK/"],
  ["rhythmcoach", "https://liuh886.github.io/RhythmCoach/"],
  ["newsflow", "https://liuh886.github.io/NewsFlow/"],
  ["ownly", "https://liuh886.github.io/ownly/"],
  ["alphaengine", "https://liuh886.github.io/alpha_engine/"],
  ["admin", "https://liuh886.github.io/admin/"],
  ["notes", "https://zhihaol.eu.org/"],
]);

const layout = fs.readFileSync("_layouts/redirect.html", "utf8");
if (!layout.includes('meta name="robots" content="noindex,nofollow,noarchive"')) {
  throw new Error("Redirect layout must remain unindexed");
}
if (!layout.includes("window.location.replace")) {
  throw new Error("Redirect layout must preserve the immediate JavaScript redirect");
}
if (!layout.includes('http-equiv="refresh"')) {
  throw new Error("Redirect layout must retain the no-JavaScript fallback");
}

for (const [slug, target] of expected) {
  const page = fs.readFileSync(`_pages/shortcuts/${slug}.md`, "utf8");
  if (!page.includes("layout: redirect")) throw new Error(`${slug} must use the redirect layout`);
  if (!page.includes(`permalink: /${slug}/`)) throw new Error(`${slug} permalink is incorrect`);
  if (!page.includes(`redirect_to: ${target}`)) throw new Error(`${slug} target is incorrect`);
  if (!page.includes("sitemap: false")) throw new Error(`${slug} must stay out of the sitemap`);
}

console.log("Project shortlink contract checks passed");
