const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

const read = (relPath) => fs.readFileSync(path.join(root, relPath), "utf8");
const exists = (relPath) => fs.existsSync(path.join(root, relPath));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const failures = [];

const packageJson = JSON.parse(read("package.json"));
const scripts = packageJson.scripts || {};
for (const forbiddenScript of ["build:css", "build:tailwind", "build:tailwind:watch"]) {
  if (Object.prototype.hasOwnProperty.call(scripts, forbiddenScript)) {
    failures.push(`Starter package.json must not define \`${forbiddenScript}\`; build ownership belongs to gem repos.`);
  }
}

const config = read("_config.yml");
if (!/^\s*theme:\s*al_folio_core\s*$/m.test(config)) {
  failures.push("`_config.yml` must keep `theme: al_folio_core` for thin-starter wiring.");
}
if (!/^\s*-\s*al_folio_core\s*$/m.test(config)) {
  failures.push("`_config.yml` plugins must include `al_folio_core`.");
}
if (!/^\s*-\s*al_folio_distill\s*$/m.test(config)) {
  failures.push("`_config.yml` plugins must include `al_folio_distill` (distill is plugin-owned).");
}
if (!/^\s*-\s*al_cookie\s*$/m.test(config)) {
  failures.push("`_config.yml` plugins must include `al_cookie` (cookie consent is plugin-owned).");
}
if (!/^\s*-\s*al_icons\s*$/m.test(config)) {
  failures.push("`_config.yml` plugins must include `al_icons` (icon runtime is plugin-owned).");
}
if (!/^\s*-\s*al_math\s*$/m.test(config)) {
  failures.push("`_config.yml` plugins must include `al_math` when math features are enabled.");
}

for (const libraryKey of ["fontawesome", "academicons", "scholar-icons"]) {
  if (!new RegExp(`^\\s{2}${escapeRegExp(libraryKey)}:\\s*$`, "m").test(config)) {
    failures.push(`\`_config.yml\` must define \`third_party_libraries.${libraryKey}\` for al_icons runtime wiring.`);
    continue;
  }
  if (!new RegExp(`^\\s{2}${escapeRegExp(libraryKey)}:[\\s\\S]*?^\\s{4}integrity:\\s*$[\\s\\S]*?^\\s{6}css:\\s*"sha`, "m").test(config)) {
    failures.push(`\`_config.yml\` should define an SRI hash for \`third_party_libraries.${libraryKey}.integrity.css\`.`);
  }
}

for (const libraryKey of ["tikzjax", "tocbot"]) {
  if (!new RegExp(`^\\s{2}${escapeRegExp(libraryKey)}:\\s*$`, "m").test(config)) {
    failures.push(`\`_config.yml\` must define \`third_party_libraries.${libraryKey}\` for v1 runtime contracts.`);
  }
}

const gemfile = read("Gemfile");
if (!/gem 'al_math', '= 1\.0\.1'/.test(gemfile)) {
  failures.push("`Gemfile` should pin `al_math` to released version `1.0.1`.");
}
if (/gem 'al_math',\s*:git =>/.test(gemfile)) {
  failures.push("`Gemfile` must not use git-branch pin for `al_math`; use released gem version.");
}

for (const forbiddenPath of ["_includes", "_layouts", "_sass", "_scripts", "assets/tailwind", "tailwind.config.js", "assets/webfonts"]) {
  if (exists(forbiddenPath)) {
    failures.push(`Starter must not own core component path \`${forbiddenPath}\`; move ownership to the corresponding gem.`);
  }
}

for (const forbiddenGlobPath of [
  "assets/fonts/academicons.woff",
  "assets/fonts/academicons.ttf",
  "assets/fonts/scholar-icons.woff",
  "assets/fonts/scholar-icons.ttf",
]) {
  if (exists(forbiddenGlobPath)) {
    failures.push(`Starter must not own icon runtime artifact \`${forbiddenGlobPath}\`; icon ownership belongs to al_icons.`);
  }
}

for (const requiredPath of ["test/visual", "test/integration_plugin_toggles.sh", "test/integration_distill.sh"]) {
  if (!exists(requiredPath)) {
    failures.push(`Starter integration/visual contract missing required path: \`${requiredPath}\`.`);
  }
}

const visualPlugin = read("_plugins/site_visual_polish.rb");
for (const stylesheet of [
  "site-polish.css",
  "site-upgrade.css",
  "hao-design.css",
  "hao-home-v6.css",
]) {
  if (!visualPlugin.includes(stylesheet)) {
    failures.push(`Site visual polish plugin must inject \`${stylesheet}\`.`);
  }
}

if (!exists("assets/css/site-upgrade.css")) {
  failures.push("Frontend upgrade layer missing: `assets/css/site-upgrade.css`.");
} else {
  const upgradeCss = read("assets/css/site-upgrade.css");
  for (const requiredSelector of [
    "article:has(.header-bar) .post-list",
    "article:has(.header-bar) .featured-posts .row",
    "body:has(.cv) .sticky-top::-webkit-scrollbar",
    "content-visibility: auto",
    "prefers-reduced-motion",
  ]) {
    if (!upgradeCss.includes(requiredSelector)) {
      failures.push(`Frontend upgrade CSS must keep selector/contract: \`${requiredSelector}\`.`);
    }
  }
}

if (!exists("assets/css/hao-design.css")) {
  failures.push("Hao design system layer missing: `assets/css/hao-design.css`.");
} else {
  const haoDesignCss = read("assets/css/hao-design.css");
  for (const requiredSelector of [
    "--hao-page-max",
    "--hao-reading-max",
    "--hao-focus-ring",
    "--hao-mission-accent",
    ".mission-log-home",
    ".mission-section-kicker",
    ".mission-index__grid",
    ".operations-log__entry",
    "body:has(.cv) .sticky-top::-webkit-scrollbar",
    "scrollbar-width: none",
    "prefers-reduced-motion",
  ]) {
    if (!haoDesignCss.includes(requiredSelector)) {
      failures.push(`Hao design CSS must keep token/contract: \`${requiredSelector}\`.`);
    }
  }
}

if (!exists("assets/css/hao-home-v6.css")) {
  failures.push("Clean homepage reframe CSS missing: `assets/css/hao-home-v6.css`.");
} else {
  const homeCss = read("assets/css/hao-home-v6.css");
  for (const requiredSelector of [
    ".hao-home--v6",
    ".hao-home-hero",
    ".hao-home-index",
    ".hao-home-current-grid",
    ".hao-home-system-grid",
    "overflow-x: clip",
    "prefers-reduced-motion",
  ]) {
    if (!homeCss.includes(requiredSelector)) {
      failures.push(`Homepage v6 CSS must keep selector/contract: \`${requiredSelector}\`.`);
    }
  }
}

const aboutPage = read("_pages/about.md");
// prettier-ignore
for (const requiredHomeMarker of [
  "hao-home--v6",
  "Building small data systems for climate, geoscience, and personal productivity.",
  "Current work",
  "Active tracks, not a news feed.",
  "hao-home-current-grid",
  "Task notes",
  "Selected systems",
  "Research record",
  "Field observations",
  "Career trajectory",
  "hao-home-contact",
]) {
  if (!aboutPage.includes(requiredHomeMarker)) {
    failures.push(
      `Hao homepage v6 must keep marker: \`${requiredHomeMarker}\`.`,
    );
  }
}

for (const removedHomeMarker of [
  "mission-log-home--product",
  "mission-page-rail",
  "operations-console",
]) {
  if (aboutPage.includes(removedHomeMarker)) {
    failures.push(`Hao homepage v6 must not reintroduce old marker: \`${removedHomeMarker}\`.`);
  }
}

if (!/^news:\s*false\b/m.test(aboutPage)) {
  failures.push("Hao homepage must keep legacy `news` disabled.");
}
if (!/^\s*enabled:\s*false\b/m.test(aboutPage)) {
  failures.push("Hao homepage must keep legacy announcements disabled.");
}
if (!exists("_data/current_operations.yml")) {
  failures.push("Current operations data missing: `_data/current_operations.yml`.");
} else {
  const currentOperations = read("_data/current_operations.yml");
  // prettier-ignore
  for (const requiredOperation of ["OP-01", "CCUS Policy Hub", "Ownly", "FlappyK", "RhythmCoach", "AlphaEngine", "dispatches", "Shell reset"]) {
    if (!currentOperations.includes(requiredOperation)) {
      failures.push(
        `Current operations log must keep operation marker: \`${requiredOperation}\`.`,
      );
    }
  }
}

// prettier-ignore
for (const hiddenNavPage of [
  "_pages/projects.md",
  "_pages/repositories.md",
  "cv.md",
]) {
  if (!/^nav:\s*false$/m.test(read(hiddenNavPage))) {
    failures.push(
      `Hao homepage nav strategy requires \`${hiddenNavPage}\` to keep \`nav: false\`.`,
    );
  }
}

// prettier-ignore
for (const requiredDoc of [
  "docs/DESIGN_SYSTEM.md",
  "docs/REDESIGN_ROADMAP.md",
  "docs/MISSION_LOG_PLAN.md",
]) {
  if (!exists(requiredDoc)) {
    failures.push(
      `Hao redesign documentation missing required path: \`${requiredDoc}\`.`,
    );
  }
}

if (failures.length > 0) {
  console.error("Starter style contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Starter style contract check passed.");
