const fs = require('node:fs');

const plugin = fs.readFileSync('_plugins/cloudflare_web_analytics.rb', 'utf8');
const beacon = 'https://static.cloudflareinsights.com/beacon.min.js';

if (!plugin.includes('ENV.fetch("CLOUDFLARE_WEB_ANALYTICS_TOKEN", "").strip')) {
  throw new Error('Notes analytics must read CLOUDFLARE_WEB_ANALYTICS_TOKEN from the build environment.');
}
if (!plugin.includes(beacon)) {
  throw new Error('Cloudflare Web Analytics beacon is missing.');
}
if (!plugin.includes('data-cf-beacon')) {
  throw new Error('Cloudflare Web Analytics data-cf-beacon attribute is missing.');
}
if (/TOKEN\s*=\s*"[a-f0-9]{32}"/.test(plugin)) {
  throw new Error('Notes analytics must not hardcode the Cloudflare token.');
}

console.log('Cloudflare Web Analytics uses the repository-variable build path.');
