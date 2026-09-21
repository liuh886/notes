// Design invariants, asserted against a running site.
//
// These are value assertions (computed styles, geometry, overflow), not pixel
// snapshots, so they are stable across machines and need no committed baseline.
// They exist because the homepage styling lives in CSS override layers that
// cannot be reviewed by reading alone.
//
// Locally:
//   DESIGN_BASE_URL=https://zhihaol.eu.org npx playwright test --config test/design/playwright.config.js
// In CI the base URL is the locally served `_site` build.

const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: __dirname,
  timeout: 90000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: process.env.DESIGN_BASE_URL || "http://127.0.0.1:8080",
    screenshot: "only-on-failure",
    navigationTimeout: 60000,
  },
});
