import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const failures = [];

const requireIncludes = (source, values, label) => {
  for (const value of values) {
    if (!source.includes(value)) failures.push(`${label} must include: ${value}`);
  }
};

const privacy = read("_pages/privacy.md");
requireIncludes(
  privacy,
  [
    "permalink: /privacy/",
    "title: Privacy Policy",
    "Hao Apps",
    "Supabase",
    "Cloudflare Web Analytics",
    "Google Analytics",
    "We do not sell personal information.",
    "does not use social-login access to read timelines",
    "Effective date:</strong> 9 August 2026",
  ],
  "Privacy Policy",
);

const terms = read("_pages/terms.md");
requireIncludes(
  terms,
  [
    "permalink: /terms/",
    "title: Terms of Service",
    "Hao Apps",
    "Google, GitHub, X, or Apple",
    "do not constitute personalized investment",
    "Historical performance, model outputs, forecasts, rankings, and simulations do not guarantee future results.",
    "Effective date:</strong> 9 August 2026",
  ],
  "Terms of Service",
);

const plugin = read("_plugins/site_visual_polish.rb");
requireIncludes(
  plugin,
  [
    "LEGAL_STYLESHEETS",
    "legal-page.css",
    '[/privacy/, /terms/]'.replaceAll("/", '\"/').replaceAll(', ', '\", \"'),
  ],
  "Site visual polish plugin",
);
requireIncludes(
  plugin,
  [
    "def self.legal_page?(page)",
    "hao-legal-page",
    "def self.apply_footer_legal_links(page)",
    'data-hao-legal-links=\\"true\\"'.replaceAll("\\", ""),
    "Privacy",
    "Terms",
  ],
  "Site visual polish plugin",
);

const legalCss = read("assets/css/legal-page.css");
requireIncludes(
  legalCss,
  [
    ".hao-legal-page > .container[role=\"main\"]",
    ".hao-legal-document",
    ".hao-legal-document h2",
    ".hao-legal-related",
    "@media (max-width: 576px)",
  ],
  "Legal page stylesheet",
);

const footerCss = read("assets/css/footer-build.css");
requireIncludes(footerCss, [".hao-legal-links", ".hao-legal-links a"], "Footer stylesheet");

if (failures.length > 0) {
  console.error("Legal page contract check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Legal page contract checks passed");
