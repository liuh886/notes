import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const failures = [];

const requireIncludes = (source, values, label) => {
  for (const value of values) {
    if (!source.includes(value)) failures.push(`${label} must include: ${value}`);
  }
};

const requireRegex = (source, regex, message) => {
  if (!regex.test(source)) failures.push(message);
};

// The effective date is editorial copy that legitimately changes when a policy
// is revised, so only its shape is an invariant here. Pinning the exact date
// meant every policy edit needed a test edit in the same change.
const effectiveDate = /Effective date:<\/strong>\s*\d{1,2} [A-Z][a-z]+ \d{4}/;

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
    "cc_cookie",
  ],
  "Privacy Policy"
);
requireRegex(privacy, effectiveDate, "Privacy Policy must carry an effective date.");

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
  ],
  "Terms of Service"
);
requireRegex(terms, effectiveDate, "Terms of Service must carry an effective date.");

const plugin = read("_plugins/site_visual_polish.rb");
requireIncludes(
  plugin,
  [
    "LEGAL_STYLESHEETS",
    "legal-page.css",
    '["/privacy/", "/terms/"]',
    "def self.legal_page?(page)",
    "hao-legal-page",
    "def self.apply_footer_legal_links(page)",
    'data-hao-legal-links="true"',
    "Privacy",
    "Terms",
  ],
  "Site visual polish plugin"
);

const legalCss = read("assets/css/legal-page.css");
requireIncludes(
  legalCss,
  ['.hao-legal-page > .container[role="main"]', ".hao-legal-document", ".hao-legal-document h2", ".hao-legal-related", "@media (max-width: 576px)"],
  "Legal page stylesheet"
);

const footerCss = read("assets/css/footer-build.css");
requireIncludes(footerCss, [".hao-legal-links", ".hao-legal-links a"], "Footer stylesheet");

// Withdrawal has to be as easy as consent: the footer carries a control that
// reopens the consent preferences, and the policy points at it.
const cookieSettingsJs = read("assets/js/cookie-settings.js");
requireIncludes(cookieSettingsJs, ["data-hao-cookie-settings", "showPreferences", "CookieConsent"], "Cookie settings control");
requireIncludes(
  plugin,
  ["def self.apply_cookie_settings_script(page)", 'data-hao-cookie-settings="true"', "cookie-settings.js", 'site.config["enable_cookie_consent"]'],
  "Site visual polish plugin cookie settings wiring"
);
requireIncludes(footerCss, [".hao-legal-links button"], "Footer stylesheet cookie settings button");
requireIncludes(privacy, ["Cookie settings"], "Privacy Policy withdrawal path");

if (failures.length > 0) {
  console.error("Legal page contract check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Legal page contract checks passed");
