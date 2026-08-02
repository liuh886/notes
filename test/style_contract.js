const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

const read = (relPath) => fs.readFileSync(path.join(root, relPath), "utf8");
const exists = (relPath) => fs.existsSync(path.join(root, relPath));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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
  if (!regex.test(source)) {
    failures.push(message);
  }
};

const packageJson = JSON.parse(read("package.json"));
const scripts = packageJson.scripts || {};
const forbiddenScripts = [
  "build:css",
  "build:tailwind",
  "build:tailwind:watch",
];

for (const forbiddenScript of forbiddenScripts) {
  if (Object.prototype.hasOwnProperty.call(scripts, forbiddenScript)) {
    failures.push(
      `Starter package.json must not define \`${forbiddenScript}\`; ` +
        "build ownership belongs to gem repos.",
    );
  }
}

const config = read("_config.yml");
requireRegex(
  config,
  /^\s*theme:\s*al_folio_core\s*$/m,
  "`_config.yml` must keep `theme: al_folio_core` for thin-starter wiring.",
);

for (const pluginName of [
  "al_folio_core",
  "al_folio_distill",
  "al_cookie",
  "al_icons",
  "al_math",
]) {
  requireRegex(
    config,
    new RegExp(`^\\s*-\\s*${escapeRegExp(pluginName)}\\s*$`, "m"),
    `\`_config.yml\` plugins must include \`${pluginName}\`.`,
  );
}

for (const libraryKey of ["fontawesome", "academicons", "scholar-icons"]) {
  const hasLibrary = new RegExp(
    `^\\s{2}${escapeRegExp(libraryKey)}:\\s*$`,
    "m",
  ).test(config);

  if (!hasLibrary) {
    failures.push(
      `\`_config.yml\` must define ` +
        `\`third_party_libraries.${libraryKey}\` for al_icons runtime wiring.`,
    );
    continue;
  }

  const hasIntegrity = new RegExp(
    `^\\s{2}${escapeRegExp(libraryKey)}:[\\s\\S]*?` +
      "^\\s{4}integrity:\\s*$[\\s\\S]*?^\\s{6}css:\\s*\"sha",
    "m",
  ).test(config);

  if (!hasIntegrity) {
    failures.push(
      `\`_config.yml\` should define an SRI hash for ` +
        `\`third_party_libraries.${libraryKey}.integrity.css\`.`,
    );
  }
}

for (const libraryKey of ["tikzjax", "tocbot"]) {
  requireRegex(
    config,
    new RegExp(`^\\s{2}${escapeRegExp(libraryKey)}:\\s*$`, "m"),
    `\`_config.yml\` must define ` +
      `\`third_party_libraries.${libraryKey}\` for v1 runtime contracts.`,
  );
}

const gemfile = read("Gemfile");
requireRegex(
  gemfile,
  /gem 'al_math', '= 1\.0\.1'/,
  "`Gemfile` should pin `al_math` to released version `1.0.1`.",
);

if (/gem 'al_math',\s*:git =>/.test(gemfile)) {
  failures.push(
    "`Gemfile` must not use git-branch pin for `al_math`; " +
      "use released gem version.",
  );
}

for (const forbiddenPath of [
  "_includes",
  "_layouts",
  "_sass",
  "_scripts",
  "assets/tailwind",
  "tailwind.config.js",
  "assets/webfonts",
]) {
  if (exists(forbiddenPath)) {
    failures.push(
      `Starter must not own core component path \`${forbiddenPath}\`; ` +
        "move ownership to the corresponding gem.",
    );
  }
}

for (const forbiddenGlobPath of [
  "assets/fonts/academicons.woff",
  "assets/fonts/academicons.ttf",
  "assets/fonts/scholar-icons.woff",
  "assets/fonts/scholar-icons.ttf",
]) {
  if (exists(forbiddenGlobPath)) {
    failures.push(
      `Starter must not own icon runtime artifact ` +
        `\`${forbiddenGlobPath}\`; icon ownership belongs to al_icons.`,
    );
  }
}

for (const requiredPath of [
  "test/visual",
  "test/integration_plugin_toggles.sh",
  "test/integration_distill.sh",
]) {
  if (!exists(requiredPath)) {
    failures.push(
      `Starter integration/visual contract missing required path: ` +
        `\`${requiredPath}\`.`,
    );
  }
}

const visualPlugin = read("_plugins/site_visual_polish.rb");
requireIncludes(
  visualPlugin,
  ["site-polish.css", "site-upgrade.css", "hao-design.css", "hao-home-v6.css"],
  "Site visual polish plugin",
);

if (!exists("assets/css/site-upgrade.css")) {
  failures.push("Frontend upgrade layer missing: `assets/css/site-upgrade.css`.");
} else {
  const upgradeCss = read("assets/css/site-upgrade.css");
  requireIncludes(
    upgradeCss,
    [
      "article:has(.header-bar) .post-list",
      "article:has(.header-bar) .featured-posts .row",
      "body:has(.cv) .sticky-top::-webkit-scrollbar",
      "content-visibility: auto",
      "prefers-reduced-motion",
    ],
    "Frontend upgrade CSS",
  );
}

if (!exists("assets/css/hao-design.css")) {
  failures.push("Hao design system layer missing: `assets/css/hao-design.css`.");
} else {
  const haoDesignCss = read("assets/css/hao-design.css");
  requireIncludes(
    haoDesignCss,
    [
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
    ],
    "Hao design CSS",
  );
}

if (!exists("assets/css/hao-home-v6.css")) {
  failures.push("Clean homepage reframe CSS missing: `assets/css/hao-home-v6.css`.");
} else {
  const homeCss = read("assets/css/hao-home-v6.css");
  requireIncludes(
    homeCss,
    [
      ".hao-home--v6",
      ".hao-home-hero",
      ".hao-home-index",
      ".hao-home-current-grid",
      ".hao-home-system-grid",
      "overflow-x: clip",
      "prefers-reduced-motion",
    ],
    "Homepage v6 CSS",
  );
}

const aboutPage = read("_pages/about.md");
requireIncludes(
  aboutPage,
  [
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
  ],
  "Hao homepage v6",
);

requireAbsent(
  aboutPage,
  ["mission-log-home--product", "mission-page-rail", "operations-console"],
  "Hao homepage v6",
);

requireRegex(
  aboutPage,
  /^news:\s*false\b/m,
  "Hao homepage must keep legacy `news` disabled.",
);

requireRegex(
  aboutPage,
  /^\s*enabled:\s*false\b/m,
  "Hao homepage must keep legacy announcements disabled.",
);

if (!exists("_data/current_operations.yml")) {
  failures.push("Current operations data missing: `_data/current_operations.yml`.");
} else {
  const currentOperations = read("_data/current_operations.yml");
  requireIncludes(
    currentOperations,
    [
      "OP-01",
      "CCUS Policy Hub",
      "Ownly",
      "FlappyK",
      "RhythmCoach",
      "AlphaEngine",
      "dispatches",
      "Shell reset",
    ],
    "Current operations log",
  );
}

for (const hiddenNavPage of [
  "_pages/projects.md",
  "_pages/repositories.md",
  "cv.md",
]) {
  if (!/^nav:\s*false$/m.test(read(hiddenNavPage))) {
    failures.push(
      `Hao homepage nav strategy requires \`${hiddenNavPage}\` ` +
        "to keep `nav: false`.",
    );
  }
}

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
