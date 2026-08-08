const fs = require('node:fs');

const plugin = fs.readFileSync('_plugins/cloudflare_web_analytics.rb', 'utf8');
const token = 'b047ab48e64f47a49ae504d0e92c43e2';
const beacon = 'https://static.cloudflareinsights.com/beacon.min.js';

if (!plugin.includes(`TOKEN = "${token}".freeze`)) {
  throw new Error('Cloudflare Web Analytics token is not pinned for zhihaol.eu.org.');
}
if (!plugin.includes(beacon)) {
  throw new Error('Cloudflare Web Analytics beacon is missing.');
}
if (!plugin.includes('data-cf-beacon')) {
  throw new Error('Cloudflare Web Analytics data-cf-beacon attribute is missing.');
}
if (plugin.includes('CLOUDFLARE_WEB_ANALYTICS_TOKEN') || plugin.includes('ENV.fetch')) {
  throw new Error('Notes analytics must not retain the retired environment-token configuration layer.');
}

console.log('Cloudflare Web Analytics is pinned for zhihaol.eu.org.');
