const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const read = (relPath) => fs.readFileSync(path.join(root, relPath), "utf8");
const exists = (relPath) => fs.existsSync(path.join(root, relPath));
const failures = [];

const requireIncludes = (source, values, label) => {
  for (const value of values) {
    if (!source.includes(value)) failures.push(`${label} must include: \`${value}\`.`);
  }
};

const requireAbsent = (source, values, label) => {
  for (const value of values) {
    if (source.includes(value)) failures.push(`${label} must not include: \`${value}\`.`);
  }
};

const requireRegex = (source, regex, message) => {
  if (!regex.test(source)) failures.push(message);
};

const frontMatterOf = (source) => {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  return match ? match[1] : "";
};

const categoriesFromFrontMatter = (frontMatter) => {
  const match = frontMatter.match(/^categories:\s*(.*)$/m);
  if (!match) return [];

  const inline = match[1].trim();
  if (inline) {
    const value = inline.replace(/^\[/, "").replace(/\]$/, "");
    return value
      .split(",")
      .map((category) => category.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }

  const afterCategories = frontMatter.slice(match.index + match[0].length).split("\n");
  const categories = [];
  for (const line of afterCategories) {
    if (/^\S/.test(line)) break;
    const item = line.match(/^\s*-\s*(.+?)\s*$/);
    if (item) categories.push(item[1].trim().replace(/^['"]|['"]$/g, ""));
  }
  return categories;
};

const config = read("_config.yml");
requireRegex(config, /^\s*theme:\s*al_folio_core\s*$/m, "`_config.yml` must keep `theme: al_folio_core`.");
for (const pluginName of ["al_folio_core", "al_folio_distill", "al_cookie", "al_icons", "al_math", "al_search"]) {
  requireRegex(config, new RegExp(`^\\s*-\\s*${pluginName}\\s*$`, "m"), `\`_config.yml\` plugins must include \`${pluginName}\`.`);
}
requireRegex(config, /^search_enabled:\s*true\s*$/m, "Native al-folio search must be enabled.");
requireRegex(config, /^posts_in_search:\s*true\s*$/m, "Post search indexing must be enabled.");
requireRegex(config, /^socials_in_search:\s*false\s*$/m, "Social search must remain disabled.");
requireRegex(config, /^bib_search:\s*false\s*$/m, "Bibliography search must remain disabled.");
requireIncludes(config, ["home_latest_notes:\n  enabled: false\n  limit: 3"], "Site config");

for (const forbiddenPath of ["_includes", "_layouts", "_sass", "_scripts", "assets/tailwind", "tailwind.config.js", "assets/webfonts"]) {
  if (exists(forbiddenPath)) failures.push(`Starter must not own core theme path \`${forbiddenPath}\`.`);
}

for (const removedFeatureLayer of ["_data/site_features.yml", "_plugins/site_features.rb"]) {
  if (exists(removedFeatureLayer)) failures.push(`Redundant feature configuration layer must be removed: \`${removedFeatureLayer}\`.`);
}

const productionCss = [
  "assets/css/footer-build.css",
  "assets/css/hao-home-center-fix.css",
  "assets/css/hao-home-atmosphere-v2.css",
  "assets/css/hao-home-current-work-texture-fix.css",
  "assets/css/cv-toc-polish.css",
  "assets/css/repositories-page-polish.css",
  "assets/css/portfolio-page-polish.css",
  "assets/css/legal-page.css",
];
for (const cssPath of productionCss) {
  if (!exists(cssPath)) failures.push(`Production stylesheet missing: \`${cssPath}\`.`);
}

const obsoleteCss = [
  "assets/css/hao-design.css",
  "assets/css/hao-home-safe.css",
  "assets/css/site-polish.css",
  "assets/css/site-upgrade.css",
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
for (const cssPath of obsoleteCss) {
  if (exists(cssPath)) failures.push(`Obsolete visual layer must be removed: \`${cssPath}\`.`);
}

const visualPlugin = read("_plugins/site_visual_polish.rb");
requireIncludes(
  visualPlugin,
  [
    "HOMEPAGE_STYLESHEETS",
    "hao-home-center-fix.css",
    "hao-home-atmosphere-v2.css",
    "hao-home-current-work-texture-fix.css",
    "CV_STYLESHEETS",
    "cv-toc-polish.css",
    "REPOSITORIES_STYLESHEETS",
    "repositories-page-polish.css",
    "PORTFOLIO_STYLESHEETS",
    "portfolio-page-polish.css",
    "LEGAL_STYLESHEETS",
    "legal-page.css",
    "def self.apply_home_body_class(page)",
    "hao-home-page",
    "def self.apply_home_navbar_brand(page)",
    "navbar-brand title font-weight-lighter hao-home-navbar-brand",
    "def self.apply_stylesheets(page, stylesheets)",
  ],
  "Site visual polish plugin",
);
requireAbsent(
  visualPlugin,
  ["site-polish.css", "site-upgrade.css", "hao-design.css", "hao-home-safe.css", "apply_home_portfolio_link"],
  "Site visual polish plugin",
);

const aboutPage = read("_pages/about.md");
requireIncludes(
  aboutPage,
  [
    "hao-home--production hao-home--alfolio",
    "Research records, shipped tools, and agentic AI systems.",
    "Offshore Bergen · Aug 2020",
    "calendar.app.google/UQ267iEs4MTAGFSd7",
    'id="current-work"',
    'id="selected-work"',
    'id="notes-publications"',
    'id="contact"',
    "Six active products, built and maintained.",
    "site.home_latest_notes",
    'id="latest-notes"',
    "latest_notes_feature.enabled",
    "Full notes archive",
    "{{ '/portfolio/' | relative_url }}",
  ],
  "Homepage",
);
requireRegex(aboutPage, /^layout:\s*about\b/m, "Homepage must keep al-folio `layout: about`.");
requireRegex(aboutPage, /^news:\s*false\b/m, "Homepage must keep legacy news disabled.");

const homepageActionCount = (aboutPage.match(/class="hao-home-button/g) || []).length;
if (homepageActionCount !== 1) failures.push(`Homepage banner must keep exactly one contact action; found ${homepageActionCount}.`);

const blogPage = read("_pages/blog.md");
requireIncludes(
  blogPage,
  [
    '<div class="post">',
    "site.blog_name",
    "site.blog_description",
    "primary_categories",
    "Research Notes|Build Logs|Field Notes|Essays",
    "'/blog/category/'",
    "post.tags",
    "'/blog/tag/'",
    '{% assign featured_posts = site.posts | where: "featured", "true" %}',
    "{% assign postlist = paginator.posts %}",
    'class="post-title"',
    "{% include pagination.liquid %}",
  ],
  "Blog index",
);
requireAbsent(
  blogPage,
  [
    "hao-blog-index",
    "Editorial lanes",
    'site.posts | where: "lane"',
    'id="research-notes"',
    'id="build-logs"',
    'id="field-notes"',
    'id="essays"',
    'id="all-notes"',
  ],
  "Blog index",
);

const allowedBlogCategories = new Set(["Research Notes", "Build Logs", "Field Notes", "Essays"]);
const postFiles = fs.readdirSync(path.join(root, "_posts")).filter((file) => file.endsWith(".md"));
for (const postFile of postFiles) {
  const postPath = path.join("_posts", postFile);
  const frontMatter = frontMatterOf(read(postPath));
  if (!frontMatter) {
    failures.push(`${postPath} must have YAML front matter.`);
    continue;
  }

  if (/^lane:\s*/m.test(frontMatter)) failures.push(`${postPath} must not use the obsolete \`lane\` taxonomy.`);

  const categories = categoriesFromFrontMatter(frontMatter);
  if (categories.length !== 1) {
    failures.push(`${postPath} must have exactly one primary Blog category; found ${categories.length}.`);
    continue;
  }

  if (!allowedBlogCategories.has(categories[0])) {
    failures.push(`${postPath} uses unsupported Blog category \`${categories[0]}\`.`);
  }
}

const currentOperations = read("_data/current_operations.yml");
for (const product of ["CCUS Policy Hub", "Ownly", "AlphaEngine", "FlappyK", "RhythmCoach", "NewsFlow"]) {
  if (!currentOperations.includes(product)) failures.push(`Current work must retain ${product}.`);
}

const homeCss = read("assets/css/hao-home-center-fix.css");
requireIncludes(
  homeCss,
  [
    "--hao-alfolio-content-shell-max: 81rem",
    "--hao-alfolio-nav-shell-max: 84rem",
    '.hao-home-page > .container[role="main"]',
    ".hao-home-page #navbar > .container",
    '"intro profile"',
    '"index index"',
    ".hao-home-navbar-brand",
    "@media (max-width: 992px)",
    "@media (max-width: 760px)",
  ],
  "Homepage CSS",
);

const cvCss = read("assets/css/cv-toc-polish.css");
requireIncludes(cvCss, ["scrollbar-width: none", "-ms-overflow-style: none", "::-webkit-scrollbar"], "CV TOC CSS");
requireAbsent(cvCss, ["overflow-y: hidden"], "CV TOC CSS");

for (const doc of ["docs/DESIGN_SYSTEM.md", "docs/HOMEPAGE_FRONTEND_GOVERNANCE.md"]) {
  if (!exists(doc)) failures.push(`Canonical design document missing: \`${doc}\`.`);
}
for (const obsoleteDoc of ["docs/REDESIGN_ROADMAP.md", "docs/MISSION_LOG_PLAN.md"]) {
  if (exists(obsoleteDoc)) failures.push(`Obsolete design document must be removed: \`${obsoleteDoc}\`.`);
}

const designSystem = read("docs/DESIGN_SYSTEM.md");
requireIncludes(
  designSystem,
  [
    "Research & Product Studio",
    "The current production site is the source of truth.",
    "Blog keeps the native al-folio chronological reading flow",
    "Existing `tags` and `categories` are the only editorial taxonomy mechanism.",
    "`categories` define the top-level Blog information architecture",
    "Every post has exactly one primary category",
    "**Research Notes**, **Build Logs**, **Field Notes**, and **Essays**",
    "`tags` remain fine-grained descriptors",
    "Legacy topical categories belong in `tags`",
    "Do not introduce a second classification field such as `lane`",
    "Post-render HTML regex rewriting is technical debt.",
    "Feature switches should use existing Jekyll/al-folio configuration directly.",
  ],
  "Design system",
);

const pluginToggleContract = read("test/integration_plugin_toggles.sh");
requireIncludes(pluginToggleContract, ['remove_plugin_and_build "al_analytics"', 'remove_plugin_and_build "al_img_tools"'], "Plugin toggle contract");
requireAbsent(pluginToggleContract, ['remove_plugin_and_build "al_search"'], "Plugin toggle contract");

for (const hiddenNavPage of ["_pages/projects.md", "_pages/repositories.md", "cv.md"]) {
  if (!/^nav:\s*false$/m.test(read(hiddenNavPage))) {
    failures.push(`Homepage nav strategy requires \`${hiddenNavPage}\` to keep \`nav: false\`.`);
  }
}

for (const requiredPath of ["test/visual", "test/integration_plugin_toggles.sh", "test/integration_distill.sh"]) {
  if (!exists(requiredPath)) failures.push(`Integration/visual contract missing required path: \`${requiredPath}\`.`);
}

if (failures.length > 0) {
  console.error("Starter style contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Starter style contract check passed.");
