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
  [
    "hao-home-center-fix.css",
    "hao-home-atmosphere-v2.css",
    "hao-home-current-work-texture-fix.css",
  ],
  "Homepage stylesheet registration",
);
requireAbsent(plugin, ["hao-home-atmosphere.css"], "Homepage stylesheet registration");

const css = read("assets/css/hao-home-atmosphere-v2.css");
requireIncludes(
  css,
  [
    "Homepage atmospheric refinement v2",
    "One shared ambient field for the complete hero-to-Current work composition.",
    ".hao-home-page .hao-home--alfolio::before",
    "height: 72rem",
    "animation: hao-home-shared-ambient-drift 38s",
    "@keyframes hao-home-shared-ambient-drift",
    "transform: translate3d(-11rem, 10rem, 0) scale(1.06)",
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
  [
    "position: fixed",
    "animation-duration: 1s",
    "filter: hue-rotate",
    "backdrop-filter",
    ".hao-home-page .hao-home-intro::before",
    "@keyframes hao-home-ambient-breathe",
  ],
  "Homepage atmosphere stylesheet",
);

const currentWorkFix = read("assets/css/hao-home-current-work-texture-fix.css");
requireIncludes(
  currentWorkFix,
  [
    "Current work scientific texture visibility correction",
    "The purple ambient field is owned by the shared",
    ".hao-home-page #current-work::before",
    "z-index: 0",
    "repeating-radial-gradient",
    "background-size: auto, 56px 56px",
    "opacity: 0.58",
    ".hao-home-page #current-work > *",
    "z-index: 1",
  ],
  "Current work texture correction",
);
requireAbsent(
  currentWorkFix,
  [
    "position: fixed",
    "backdrop-filter",
    "mix-blend-mode",
    "background-size: auto, auto, 26px 26px",
    "opacity: 0.9",
    ".hao-home-page #current-work::after",
    "hao-home-ambient-breathe",
  ],
  "Current work texture correction",
);

if (failures.length > 0) {
  console.error("Homepage atmosphere contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Homepage atmosphere contract check passed.");
