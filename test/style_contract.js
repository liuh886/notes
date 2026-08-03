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

const requireRegex = (source, regex, message) => {
  if (!regex.test(source)) failures.push(message);
};

const packageJson = JSON.parse(read("package.json"));
const scripts = packageJson.scripts || {};
for (const forbiddenScript of ["build:css", "build:tailwind", "build:tailwind:watch"]) {
  if (Object.prototype.hasOwnProperty.call(scripts, forbiddenScript)) {
    failures.push(`Starter package.json must not define \`${forbiddenScript}\`; build ownership belongs to gem repos.`);
  }
}

const config = read("_config.yml");
requireRegex(config, /^\s*theme:\s*al_folio_core\s*$/m, "`_config.yml` must keep `theme: al_folio_core` for thin-starter wiring.");
for (const pluginName of ["al_folio_core", "al_folio_distill", "al_cookie", "al_icons", "al_math"]) {
  requireRegex(config, new RegExp(`^\\s*-\\s*${pluginName}\\s*$`, "m"), `\`_config.yml\` plugins must include \`${pluginName}\`.`);
}

const gemfile = read("Gemfile");
requireRegex(gemfile, /gem 'al_math', '= 1\.0\.1'/, "`Gemfile` should pin `al_math` to released version `1.0.1`.");
if (/gem 'al_math',\s*:git =>/.test(gemfile)) {
  failures.push("`Gemfile` must not use git-branch pin for `al_math`; use released gem version.");
}

for (const forbiddenPath of ["_includes", "_layouts", "_sass", "_scripts", "assets/tailwind", "tailwind.config.js", "assets/webfonts"]) {
  if (exists(forbiddenPath)) {
    failures.push(`Starter must not own core component path \`${forbiddenPath}\`; move ownership to the corresponding gem.`);
  }
}

for (const requiredPath of ["test/visual", "test/integration_plugin_toggles.sh", "test/integration_distill.sh"]) {
  if (!exists(requiredPath)) failures.push(`Starter integration/visual contract missing required path: \`${requiredPath}\`.`);
}

const deprecatedHomepageFiles = [
  "assets/css/mission-log-deployments.css",
  "assets/css/mission-log-records.css",
  "assets/css/mission-log-observations.css",
  "assets/css/mission-log-trajectory.css",
  "assets/css/mission-log-visual-pass.css",
  "assets/css/mission-log-canvas-reset.css",
  "assets/css/mission-log-shell-v2.css",
  "assets/css/mission-log-cover-refinement.css",
  "assets/css/hao-home-v6.css",
];

for (const deprecatedFile of deprecatedHomepageFiles) {
  if (exists(deprecatedFile)) {
    failures.push(`Deprecated homepage experiment file must be removed: \`${deprecatedFile}\`.`);
  }
}

const visualPlugin = read("_plugins/site_visual_polish.rb");
requireIncludes(
  visualPlugin,
  [
    "HOMEPAGE_STYLESHEETS",
    "hao-home-center-fix.css",
    'STYLESHEET_VERSION = "20260803-shell-banner-grid"',
    "def self.apply_home_body_class(page)",
    "hao-home-page",
    "def self.apply_home_navbar_brand(page)",
    "navbar-brand title font-weight-lighter hao-home-navbar-brand",
    "<span class=\"font-weight-bold\">Zhihao</span> LIU",
    "def self.apply_homepage_stylesheet(page)",
    "?v=#{STYLESHEET_VERSION}",
  ],
  "Site visual polish plugin",
);
requireAbsent(
  visualPlugin,
  [
    "TARGET_PAGES",
    "TARGET_URLS",
    "TARGET_URL_PREFIXES",
    "site-polish.css",
    "site-upgrade.css",
    "hao-design.css",
    "hao-home-safe.css",
    'HOMEPAGE_BRAND = "Zhihao LIU"',
    "mission-log-deployments.css",
    "mission-log-records.css",
    "mission-log-observations.css",
    "mission-log-trajectory.css",
    "mission-log-visual-pass.css",
    "mission-log-canvas-reset.css",
    "mission-log-shell-v2.css",
    "mission-log-cover-refinement.css",
    "hao-home-v6.css",
  ],
  "Site visual polish plugin",
);

if (!exists("assets/css/hao-home-center-fix.css")) failures.push("Homepage al-folio-compatible CSS missing: `assets/css/hao-home-center-fix.css`.");

const homeAlfolioCss = exists("assets/css/hao-home-center-fix.css") ? read("assets/css/hao-home-center-fix.css") : "";
requireIncludes(
  homeAlfolioCss,
  [
    "al-folio baseline homepage enhancement",
    "--hao-alfolio-shell-max: 84rem",
    "One measurable shell for both surfaces.",
    '.hao-home-page > .container[role="main"]',
    ".hao-home-page #navbar > .container",
    ".hao-home-page .post > article > .clearfix",
    "grid-template-areas:",
    '"header profile"',
    "display: contents;",
    ".hao-home-page .post > article > .profile",
    ".hao-home-navbar-brand",
    ".hao-home--alfolio",
    ".hao-home-intro",
    ".hao-home-section",
    ".hao-home-knowledge-grid",
    "@media (max-width: 992px)",
    "@media (max-width: 760px)",
  ],
  "Homepage al-folio-compatible CSS",
);
requireAbsent(
  homeAlfolioCss,
  [
    'content: "Zhihao LIU"',
    "font-size: 0 !important",
    "body:has(",
    "main > .container",
    "--hao-page-shell",
    "--hao-prod-shell",
    ".hao-prod-hero",
    ".hao-prod-profile",
    ".navbar .navbar-brand:not(.hao-home-navbar-brand)",
    "position: fixed",
  ],
  "Homepage al-folio-compatible CSS",
);

const workflow = read(".github/workflows/deploy.yml");
requireIncludes(
  workflow,
  [
    "hao-home--alfolio",
    "hao-home-page",
    "Research records, shipped tools, and field-informed systems.",
    "hao-home-center-fix.css?v=20260803-shell-banner-grid",
    "hao-home-navbar-brand",
    'font-weight-bold">Zhihao</span> LIU',
    "Verify secondary pages keep al-folio baseline",
    "site-polish.css|site-upgrade.css|hao-design.css|hao-home-safe.css|hao-home-center-fix.css",
  ],
  "Deploy workflow homepage artifact guard",
);

const aboutPage = read("_pages/about.md");
requireIncludes(
  aboutPage,
  [
    "hao-home--production hao-home--alfolio",
    "Climate data · Geoscience evidence · AI tools",
    "Research records, shipped tools, and field-informed systems.",
    "Current work",
    "Systems",
    "Knowledge",
    "Trajectory",
    "Contact",
    "hao-home-contact",
  ],
  "al-folio-compatible homepage",
);
requireAbsent(
  aboutPage,
  [
    "hao-home--safe",
    "hao-home--v6",
    "hao-prod-",
    "Build systems that turn field evidence into usable products.",
    "Independent Builder · Climate · Geospatial · AI",
    "mission-log-home--product",
    "mission-page-rail",
    "operations-console",
  ],
  "al-folio-compatible homepage",
);
requireRegex(aboutPage, /^layout:\s*about\b/m, "Homepage must keep al-folio `layout: about`.");
requireRegex(aboutPage, /^news:\s*false\b/m, "Hao homepage must keep legacy `news` disabled.");
requireRegex(aboutPage, /^\s*enabled:\s*false\b/m, "Hao homepage must keep legacy announcements disabled.");

if (!exists("_data/current_operations.yml")) {
  failures.push("Current operations data missing: `_data/current_operations.yml`.");
} else {
  const currentOperations = read("_data/current_operations.yml");
  requireIncludes(currentOperations, ["OP-01", "CCUS Policy Hub", "Ownly", "FlappyK", "RhythmCoach", "AlphaEngine"], "Current operations log");
}

for (const hiddenNavPage of ["_pages/projects.md", "_pages/repositories.md", "cv.md"]) {
  if (!/^nav:\s*false$/m.test(read(hiddenNavPage))) {
    failures.push(`Hao homepage nav strategy requires \`${hiddenNavPage}\` to keep \`nav: false\`.`);
  }
}

for (const requiredDoc of ["docs/DESIGN_SYSTEM.md", "docs/REDESIGN_ROADMAP.md", "docs/MISSION_LOG_PLAN.md", "docs/HOMEPAGE_FRONTEND_GOVERNANCE.md"]) {
  if (!exists(requiredDoc)) failures.push(`Hao redesign documentation missing required path: \`${requiredDoc}\`.`);
}

if (failures.length > 0) {
  console.error("Starter style contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Starter style contract check passed.");
