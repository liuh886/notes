const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const failures = [];

const requireIncludes = (source, values, label) => {
  for (const value of values) {
    if (!source.includes(value)) {
      failures.push(`${label} must include: \`${value}\`.`);
    }
  }
};

const requireAbsent = (source, values, label) => {
  for (const value of values) {
    if (source.includes(value)) {
      failures.push(`${label} must not include: \`${value}\`.`);
    }
  }
};

const plugin = read("_plugins/site_visual_polish.rb");
requireIncludes(
  plugin,
  ["hao-home-center-fix.css", "hao-home-atmosphere-v2.css"],
  "Homepage stylesheet registration",
);
requireAbsent(plugin, ["hao-home-atmosphere.css"], "Homepage stylesheet registration");

const css = read("assets/css/hao-home-atmosphere-v2.css");
requireIncludes(
  css,
  [
    "Homepage atmospheric refinement v2",
    "@keyframes hao-home-ambient-drift",
    "@keyframes hao-home-ambient-breathe",
    "@keyframes hao-home-image-halo",
    "@media (prefers-reduced-motion: reduce)",
    ".hao-home-page #current-work::before",
    ".hao-home-page #selected-work::before",
    ".hao-home-page #notes-publications::before",
    ".hao-home-page #contact::before",
    "repeating-radial-gradient",
    ".profile .more-info",
    "text-align: center",
  ],
  "Homepage atmosphere stylesheet",
);
requireAbsent(
  css,
  ["position: fixed", "animation-duration: 1s", "filter: hue-rotate", "backdrop-filter"],
  "Homepage atmosphere stylesheet",
);

if (failures.length > 0) {
  console.error("Homepage atmosphere contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Homepage atmosphere contract check passed.");
