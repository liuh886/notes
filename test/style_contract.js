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
    "CV_STYLESHEETS",
    "cv-toc-polish.css",
    'STYLESHEET_VERSION = "20260803-cv-toc-home-81"',
    "def self.cv_page?(page)",
    "def self.apply_home_body_class(page)",
    "hao-home-page",
    "def self.apply_cv_body_class(page)",
    "hao-cv-page",
    "def self.apply_home_navbar_brand(page)",
    "navbar-brand title font-weight-lighter hao-home-navbar-brand",
    '<span class="font-weight-bold">Zhihao</span> LIU',
    "def self.apply_stylesheets(page, stylesheets)",
    "def self.apply_homepage_stylesheet(page)",
    "def self.apply_cv_stylesheet(page)",
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
    "mission-log-shell-v2.css",
    "hao-home-v6.css",
  ],
  "Site visual polish plugin",
);

if (!exists("assets/css/hao-home-center-fix.css")) {
  failures.push("Homepage al-folio-compatible CSS missing: `assets/css/hao-home-center-fix.css`.");
}

const homeCss = exists("assets/css/hao-home-center-fix.css") ? read("assets/css/hao-home-center-fix.css") : "";
requireIncludes(
  homeCss,
  [
    "al-folio baseline homepage enhancement",
    "--hao-alfolio-content-shell-max: 81rem",
    "--hao-alfolio-nav-shell-max: 84rem",
    "Optical alignment: the navbar container keeps its native 15px inline padding.",
    "A content shell three rem narrower",
    '.hao-home-page > .container[role="main"]',
    ".hao-home-page #navbar > .container",
    ".hao-home-page footer > .container",
    ".hao-home-page .post > article > .clearfix",
    "display: none !important;",
    '"intro profile"',
    '"index index"',
    ".hao-home-page .post > article > .profile",
    ".profile .more-info",
    ".hao-home-card-topline strong",
    ".hao-home-navbar-brand",
    ".hao-home-knowledge-grid",
    "@media (max-width: 992px)",
    "@media (max-width: 760px)",
  ],
  "Homepage CSS",
);
requireAbsent(
  homeCss,
  [
    '"intro header"',
    ".post-header .post-title",
    'content: "Zhihao LIU"',
    "font-size: 0 !important",
    "body:has(",
    "main > .container",
    "--hao-alfolio-shell-max",
    "--hao-page-shell",
    "--hao-prod-shell",
    ".hao-prod-hero",
    ".hao-prod-profile",
    "position: fixed",
  ],
  "Homepage CSS",
);

if (!exists("assets/css/cv-toc-polish.css")) {
  failures.push("CV TOC polish CSS missing: `assets/css/cv-toc-polish.css`.");
}

const cvTocCss = exists("assets/css/cv-toc-polish.css") ? read("assets/css/cv-toc-polish.css") : "";
requireIncludes(
  cvTocCss,
  [
    "CV table-of-contents polish",
    ".hao-cv-page #toc-sidebar",
    "scrollbar-width: none",
    "-ms-overflow-style: none",
    "::-webkit-scrollbar",
    "overscroll-behavior: contain",
  ],
  "CV TOC CSS",
);
requireAbsent(cvTocCss, ["overflow-y: hidden", "display: none !important"], "CV TOC CSS");

const aboutPage = read("_pages/about.md");
requireIncludes(
  aboutPage,
  [
    "hao-home--production hao-home--alfolio",
    "Data Scientist · AI Builder",
    "Research records, shipped tools, and agentic AI systems.",
    "Offshore Bergen · Aug 2020",
    "calendar.app.google/UQ267iEs4MTAGFSd7",
    'id="current-work"',
    'id="selected-work"',
    'id="notes-publications"',
    "Projects &amp; code",
    "Notes &amp; publications",
    "Five maintained product and research lanes.",
    "Selected work beyond the active product list.",
    "Formal outputs and selected working notes.",
    "Research outputs",
    "Peer-reviewed research, open data, and patent record.",
    "hao-home-contact",
  ],
  "Homepage",
);
requireAbsent(
  aboutPage,
  [
    "Climate data · Geoscience evidence · AI tools",
    'id="systems"',
    'id="knowledge"',
    'id="trajectory"',
    "Trajectory",
    "Public surfaces and working tools.",
    "A path from field operations to product systems.",
    "📍",
    "hao-home--safe",
    "hao-home--v6",
    "hao-prod-",
  ],
  "Homepage",
);

const homepageActionCount = (aboutPage.match(/class="hao-home-button/g) || []).length;
if (homepageActionCount !== 1) {
  failures.push(`Homepage banner must keep exactly one contact action; found ${homepageActionCount}.`);
}

requireRegex(aboutPage, /^layout:\s*about\b/m, "Homepage must keep al-folio `layout: about`.");
requireRegex(aboutPage, /^news:\s*false\b/m, "Hao homepage must keep legacy `news` disabled.");

const cvPage = read("cv.md");
requireIncludes(cvPage, ["layout: cv", "sidebar: left"], "CV page");

const selectedWork = read("_data/selected_deployments.yml");
requireIncludes(
  selectedWork,
  [
    "dMRV is the key",
    "OceanHub",
    "4D Seismic",
    "Climate-to-energy downscaling",
    "Quad 35 hybrid seismic acquisition",
    "OffshoreOrient Studio",
    "iCal Pro for Obsidian",
    "Ductor — AI Agentic Harness",
    "OPEN-SOURCE CONTRIBUTOR",
    "HTTP to Obsidian CLI Gateway",
    "Open Phrasebank",
  ],
  "Selected work data",
);
requireAbsent(
  selectedWork,
  ["GhostCam", "CCUS Policy Hub", "Ownly", "AlphaEngine", "FlappyK", "RhythmCoach"],
  "Selected work data",
);

const researchRecords = read("_data/research_records.yml");
requireIncludes(
  researchRecords,
  [
    "Retrieving snow depth distribution by downscaling ERA5 Reanalysis with ICESat-2 laser altimetry",
    "Snow-depth / ICESat-2 Zenodo dataset",
    "10.5281/zenodo.10048875",
    "Underwater seismic device identification system",
  ],
  "Research output data",
);
requireAbsent(researchRecords, ["CCUS Policy Hub", "4D Seismic Hub"], "Research output data");

const fieldNotes = read("_data/field_observations.yml");
requireIncludes(
  fieldNotes,
  [
    "NuthKaab Coreg vs Gradient Descent Coreg",
    "Field Trip to Ice Age Museum",
    "The Agentic Brain",
    "Obsidian CLI",
    "ICESat-2 vs DTM1, DTM10, Copernicus30, FABDEM",
    "/blog/2023/dataset/",
  ],
  "Selected notes data",
);

const workflow = read(".github/workflows/deploy.yml");
requireIncludes(
  workflow,
  [
    "Verify built homepage structure",
    "hao-home--alfolio",
    "hao-home-page",
    "hao-home-navbar-brand",
    'id=\"current-work\"',
    'id=\"selected-work\"',
    'id=\"notes-publications\"',
    'id=\"contact\"',
    "Verify repositories page layout artifact",
    "Verify CV TOC polish artifact",
    "hao-cv-page",
    "scrollbar-width: none",
    "Verify secondary pages keep al-folio baseline",
  ],
  "Deploy workflow",
);
requireAbsent(
  workflow,
  [
    "Data Scientist · AI Builder",
    "Research records, shipped tools, and agentic AI systems.",
    "Climate-to-energy downscaling",
    "OffshoreOrient Studio",
    "Ductor — AI Agentic Harness",
    "Snow-depth / ICESat-2 Zenodo dataset",
    "ICESat-2 vs DTM1, DTM10, Copernicus30, FABDEM",
    "NuthKaab Coreg vs Gradient Descent Coreg",
    "Quad 35 hybrid seismic acquisition",
    "hao-home-center-fix.css?v=20260803-cv-toc-home-81",
    "cv-toc-polish.css?v=20260803-cv-toc-home-81",
  ],
  "Deploy workflow",
);

for (const hiddenNavPage of ["_pages/projects.md", "_pages/repositories.md", "cv.md"]) {
  if (!/^nav:\s*false$/m.test(read(hiddenNavPage))) {
    failures.push(`Homepage nav strategy requires \`${hiddenNavPage}\` to keep \`nav: false\`.`);
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
