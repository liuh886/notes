const fs = require("node:fs");

const plugin = fs.readFileSync("_plugins/cloudflare_web_analytics.rb", "utf8");
const beacon = "https://static.cloudflareinsights.com/beacon.min.js";

if (!plugin.includes('ENV.fetch("CLOUDFLARE_WEB_ANALYTICS_TOKEN", "").strip')) {
  throw new Error("Notes analytics must read CLOUDFLARE_WEB_ANALYTICS_TOKEN from the build environment.");
}
if (!plugin.includes(beacon)) {
  throw new Error("Cloudflare Web Analytics beacon is missing.");
}
if (!plugin.includes("data-cf-beacon")) {
  throw new Error("Cloudflare Web Analytics data-cf-beacon attribute is missing.");
}
if (/TOKEN\s*=\s*"[a-f0-9]{32}"/.test(plugin)) {
  throw new Error("Notes analytics must not hardcode the Cloudflare token.");
}
if (!plugin.includes('type="text/plain" data-category="analytics"')) {
  throw new Error("Cloudflare Web Analytics must be gated behind the analytics consent category.");
}
if (!plugin.includes('site.config["enable_cookie_consent"]')) {
  throw new Error("The Cloudflare beacon gate must follow enable_cookie_consent.");
}

console.log("Cloudflare Web Analytics uses the repository-variable build path and the consent gate.");
