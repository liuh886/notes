const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const read = (relPath) => fs.readFileSync(path.join(root, relPath), "utf8");
const exists = (relPath) => fs.existsSync(path.join(root, relPath));
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

const cssPath = "assets/css/repositories-page-polish.css";
if (!exists(cssPath)) {
  failures.push(`Missing scoped repositories stylesheet: \`${cssPath}\`.`);
}

const plugin = read("_plugins/site_visual_polish.rb");
requireIncludes(
  plugin,
  [
    "REPOSITORIES_STYLESHEETS",
    "repositories-page-polish.css",
    "def self.repositories_page?(page)",
    'page.relative_path == "_pages/repositories.md"',
    'page.url.to_s == "/repositories/"',
    "def self.apply_repositories_body_class(page)",
    "hao-repositories-page",
    "def self.apply_repositories_stylesheet(page)",
    "SiteVisualPolish.apply_repositories_body_class(page)",
    "SiteVisualPolish.apply_repositories_stylesheet(page)",
  ],
  "Site visual polish plugin",
);

const css = exists(cssPath) ? read(cssPath) : "";
requireIncludes(
  css,
  [
    "Repositories page polish",
    ".hao-repositories-page .repo-grid",
    "grid-template-columns: repeat(2, minmax(0, 1fr))",
    ".hao-repositories-page .repo-card",
    ".hao-repositories-page .repo-card__body",
    ".hao-repositories-page .repo-card__actions",
    ".hao-repositories-page .repo-card__cta--primary",
    'html[data-theme="dark"] .hao-repositories-page .repo-light',
    'html:not([data-theme="dark"]) .hao-repositories-page .repo-dark',
    "overflow-wrap: anywhere",
    "@media (max-width: 767px)",
    "grid-template-columns: 1fr",
  ],
  "Repositories stylesheet",
);
requireAbsent(
  css,
  ["body:has(", "position: fixed", "overflow-x: scroll"],
  "Repositories stylesheet",
);

const page = read("_pages/repositories.md");
requireIncludes(
  page,
  [
    "repo-page-intro",
    "repo-profile-grid",
    "repo-section__header",
    "repo-grid",
    "repo-card__stats",
    "repo-card__body",
    "repo-card__actions",
  ],
  "Repositories page",
);

if (failures.length > 0) {
  console.error("Repositories page contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Repositories page contract check passed.");
