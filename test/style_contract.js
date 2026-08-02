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

const visualPlugin = read("_plugins/site_visual_polish.rb");
requireIncludes(visualPlugin, ["site-polish.css", "site-upgrade.css", "hao-design.css", "hao-home-safe.css"], "Site visual polish plugin");
requireRegex(visualPlugin, /"hao-home-v6\.css",\s*"hao-home-safe\.css"/m, "Safe homepage stylesheet must load after v6 so it can override the failed layout.");

if (!exists("assets/css/site-upgrade.css")) failures.push("Frontend upgrade layer missing: `assets/css/site-upgrade.css`.");
if (!exists("assets/css/hao-design.css")) failures.push("Hao design system layer missing: `assets/css/hao-design.css`.");
if (!exists("assets/css/hao-home-safe.css")) failures.push("Safe homepage CSS missing: `assets/css/hao-home-safe.css`.");

const homeSafeCss = exists("assets/css/hao-home-safe.css") ? read("assets/css/hao-home-safe.css") : "";
requireIncludes(homeSafeCss, [
  ".hao-home--safe",
  "body:has(.hao-home--safe) .post-title",
  "body:has(.hao-home--safe) .profile",
  "overflow-x: clip",
  "font-size: clamp(2.4rem, 5vw, 4.25rem)",
  "grid-template-columns: minmax(0, 1fr) minmax(18rem, 20rem)",
  "@media (max-width: 900px)",
  "@media (max-width: 680px)",
  "prefers-reduced-motion",
], "Safe homepage CSS");
requireAbsent(homeSafeCss, ["position: fixed", "min-height: 100vh", "100vw"], "Safe homepage CSS");

const aboutPage = read("_pages/about.md");
requireIncludes(aboutPage, [
  "hao-home--safe",
  "Climate data, geoscience evidence, and small tools.",
  "Current work",
  "Active tracks, not a news feed.",
  "Selected systems",
  "Research record",
  "Field observations",
  "Career trajectory",
  "hao-safe-contact",
], "Safe homepage");
requireAbsent(aboutPage, [
  "hao-home--v6",
  "Building small data systems for climate, geoscience, and personal productivity.",
  "mission-log-home--product",
  "mission-page-rail",
  "operations-console",
], "Safe homepage");
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

for (const requiredDoc of ["docs/DESIGN_SYSTEM.md", "docs/REDESIGN_ROADMAP.md", "docs/MISSION_LOG_PLAN.md"]) {
  if (!exists(requiredDoc)) failures.push(`Hao redesign documentation missing required path: \`${requiredDoc}\`.`);
}

if (failures.length > 0) {
  console.error("Starter style contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Starter style contract check passed.");
