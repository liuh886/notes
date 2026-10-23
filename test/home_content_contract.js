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

const about = read("_pages/about.md");
requireIncludes(
  about,
  [
    "Turning climate and energy data into decision tools.",
    "Research records, shipped tools, and agentic AI systems.",
    "spanning climate intelligence",
    "site.data.current_operations.operations",
    "operation.secondary_href",
    "deployment.repository_href",
    "deployment.href contains 'http'",
  ],
  "Homepage content template"
);
requireAbsent(
  about,
  [
    "Five maintained product and research lanes.",
    "Six active products, built and maintained.",
    "NewsFlow, the newest live release.",
    "site.data.current_operations.upcoming",
    "the next product entering build",
  ],
  "Homepage content template"
);

const operations = read("_data/current_operations.yml");
requireIncludes(
  operations,
  [
    "- id: OP-01",
    "status: CLIMATE INTELLIGENCE",
    "title: Ownly",
    "status: LOCAL-FIRST APP",
    "- id: OP-03",
    "title: Ductor — AI Agentic Harness",
    "status: AGENT HARNESS",
    "- id: OP-04",
    "title: Climate-to-energy downscaling",
    "status: RESEARCH MODEL",
  ],
  "Current operations data"
);
requireAbsent(
  operations,
  [
    "title: AlphaEngine",
    "title: NewsFlow",
    "title: RhythmCoach",
    "upcoming:",
    "NEXT-01",
    "status: COMING SOON",
    "status: LIVE APP",
    "status: LIVE SYSTEM",
    "status: PRODUCT BUILD",
    "status: RESEARCH ENGINE",
    "status: LIVE ITERATION",
    "status: TRAINING TOOL",
    "label: Follow build",
  ],
  "Current operations data"
);

const deployments = read("_data/selected_deployments.yml");
requireIncludes(
  deployments,
  [
    "title: OceanHub",
    "href: https://liuh886.github.io/OceanHub/",
    "repository_href: https://github.com/liuh886/OceanHub",
    "title: 4D Seismic Hub",
    "href: https://liuh886.github.io/4d-seismic-hub/",
    "repository_href: https://github.com/liuh886/4d-seismic-hub",
    "- ref: C-02",
    "title: RhythmCoach",
  ],
  "Selected deployments data"
);
requireAbsent(deployments, ["https://liuh886.github.io/oceanhub/"], "Selected deployments data");

const oceanHub = read("_projects/2026_oceanhub.md");
requireIncludes(
  oceanHub,
  ["https://liuh886.github.io/OceanHub/", "https://github.com/liuh886/OceanHub", "Open OceanHub", "View Source Code"],
  "OceanHub project record"
);
requireAbsent(oceanHub, ["https://liuh886.github.io/oceanhub/"], "OceanHub project record");

if (failures.length > 0) {
  console.error("Homepage content contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Homepage content contract check passed.");
