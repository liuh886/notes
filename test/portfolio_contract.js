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
    "GLOBAL_STYLESHEETS",
    "footer-build.css",
    "PORTFOLIO_STYLESHEETS",
    "portfolio-page-polish.css",
    "def self.portfolio_page?(page)",
    "def self.apply_portfolio_body_class(page)",
    "hao-portfolio-page",
    "def self.apply_home_portfolio_link(page)",
    'data-hao-portfolio-link="true"',
    "def self.build_revision(page)",
    'ENV["GITHUB_SHA"]',
    "def self.apply_footer_build_revision(page)",
    "hao-build-revision",
    "· Build",
    "def self.apply_portfolio_stylesheet(page)",
  ],
  "Site visual polish plugin",
);

const portfolioCss = read("assets/css/portfolio-page-polish.css");
requireIncludes(
  portfolioCss,
  [
    ".hao-portfolio-page .portfolio-widgets",
    "grid-template-columns: minmax(0, 1.08fr) minmax(20rem, 0.92fr)",
    ".hao-portfolio-page .stock-widget--overview",
    ".hao-portfolio-page .stock-analysis__pill",
    ".hao-portfolio-page .stock-analysis__panel.is-active",
    'html[data-theme="dark"] .hao-portfolio-page .stock-widget-light',
    'html:not([data-theme="dark"]) .hao-portfolio-page .stock-widget-dark',
    "@media (max-width: 992px)",
  ],
  "Portfolio stylesheet",
);
requireAbsent(
  portfolioCss,
  ["body:has(", "position: fixed", "overflow-x: scroll"],
  "Portfolio stylesheet",
);

const footerCss = read("assets/css/footer-build.css");
requireIncludes(
  footerCss,
  [".hao-build-revision", ".hao-build-revision a", "white-space: nowrap"],
  "Footer build stylesheet",
);

const portfolioPage = read("_pages/portfolio.md");
requireIncludes(
  portfolioPage,
  [
    "permalink: /portfolio/",
    "stock-widget--ticker",
    "stock-widget--overview",
    "portfolio-widgets",
    "stock-analysis__selector",
  ],
  "Portfolio page",
);

if (failures.length > 0) {
  console.error("Portfolio and deployment contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Portfolio and deployment contract check passed.");
