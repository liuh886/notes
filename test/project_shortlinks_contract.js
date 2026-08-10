import fs from "node:fs";

const expected = new Map([
  ["flappyk", { permalink: "flappyk", target: "https://liuh886.github.io/FlappyK/" }],
  ["rhythmcoach", { permalink: "rhythmcoach", target: "https://liuh886.github.io/RhythmCoach/" }],
  ["newsflow", { permalink: "newsflow", target: "https://liuh886.github.io/NewsFlow/" }],
  ["ownly", { permalink: "ownly", target: "https://liuh886.github.io/ownly/" }],
  ["alphaengine", { permalink: "alpha_engine", target: "https://liuh886.github.io/alpha_engine/" }],
  ["admin", { permalink: "admin", target: "https://liuh886.github.io/admin/" }],
  ["notes", { permalink: "notes", target: "https://zhihaol.eu.org/" }],
]);

if (fs.existsSync("_layouts/redirect.html")) {
  throw new Error("Shortlinks must not take ownership of the theme layout directory");
}

for (const [file, { permalink, target }] of expected) {
  const page = fs.readFileSync(`_pages/shortcuts/${file}.md`, "utf8");
  if (!page.includes("layout: null")) throw new Error(`${file} must stay theme-independent`);
  if (!page.includes(`permalink: /${permalink}/`)) throw new Error(`${file} permalink is incorrect`);
  if (!page.includes(`redirect_to: ${target}`)) throw new Error(`${file} target is incorrect`);
  if (!page.includes("sitemap: false")) throw new Error(`${file} must stay out of the sitemap`);
  if (!page.includes('meta name="robots" content="noindex,nofollow,noarchive"')) {
    throw new Error(`${file} must remain unindexed`);
  }
  if (!page.includes("window.location.replace")) {
    throw new Error(`${file} must preserve the immediate JavaScript redirect`);
  }
  if (!page.includes('http-equiv="refresh"')) {
    throw new Error(`${file} must retain the no-JavaScript fallback`);
  }
  if (!page.includes('rel="canonical"')) {
    throw new Error(`${file} must declare the destination as canonical`);
  }
}

console.log("Project shortlink contract checks passed");
