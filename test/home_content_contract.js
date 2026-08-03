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
    "Six maintained product and research lanes.",
    "operation.secondary_href",
    "deployment.repository_href",
    "deployment.href contains 'http'",
  ],
  "Homepage content template",
);
requireAbsent(about, ["Five maintained product and research lanes."], "Homepage content template");

const operations = read("_data/current_operations.yml");
requireIncludes(
  operations,
  [
    "title: AlphaEngine",
    "href: https://liuh886.github.io/alpha_engine/",
    "secondary_href: https://github.com/liuh886/alpha_engine",
    "title: NewsFlow",
    "status: COMING SOON",
    "href: https://github.com/liuh886/NewsFlow",
  ],
  "Current operations data",
);
requireAbsent(
  operations,
  ["href: https://github.com/liuh886/alpha_engine\n    label: View repository"],
  "Current operations data",
);

const deployments = read("_data/selected_deployments.yml");
requireIncludes(
  deployments,
  [
    "title: OceanHub",
    "href: https://liuh886.github.io/oceanhub/",
    "repository_href: https://github.com/liuh886/OceanHub",
    "title: 4D Seismic Hub",
    "href: https://liuh886.github.io/4d-seismic-hub/",
    "repository_href: https://github.com/liuh886/4d-seismic-hub",
  ],
  "Selected deployments data",
);

const oceanHub = read("_projects/2026_oceanhub.md");
requireIncludes(
  oceanHub,
  [
    "https://liuh886.github.io/oceanhub/",
    "https://github.com/liuh886/OceanHub",
    "Open OceanHub",
    "View Source Code",
  ],
  "OceanHub project record",
);

if (failures.length > 0) {
  console.error("Homepage content contract check failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("Homepage content contract check passed.");
