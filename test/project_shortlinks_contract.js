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

if (fs.existsSync("_layouts/redirect.html")) {
  throw new Error("Shortlinks must not take ownership of the theme layout directory");
}

for (const [slug, target] of expected) {
  const page = fs.readFileSync(`_pages/shortcuts/${slug}.md`, "utf8");
  if (!page.includes("layout: null")) throw new Error(`${slug} must stay theme-independent`);
  if (!page.includes(`permalink: /${slug}/`)) throw new Error(`${slug} permalink is incorrect`);
  if (!page.includes(`redirect_to: ${target}`)) throw new Error(`${slug} target is incorrect`);
  if (!page.includes("sitemap: false")) throw new Error(`${slug} must stay out of the sitemap`);
  if (!page.includes('meta name="robots" content="noindex,nofollow,noarchive"')) {
    throw new Error(`${slug} must remain unindexed`);
  }
  if (!page.includes("window.location.replace")) {
    throw new Error(`${slug} must preserve the immediate JavaScript redirect`);
  }
  if (!page.includes('http-equiv="refresh"')) {
    throw new Error(`${slug} must retain the no-JavaScript fallback`);
  }
  if (!page.includes('rel="canonical"')) {
    throw new Error(`${slug} must declare the destination as canonical`);
  }
}

console.log("Project shortlink contract checks passed");
