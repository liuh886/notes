# Homepage Frontend Governance

This document records the production rules for the Hao's Notes homepage after the August 2026 rescue work.

## Current ownership model

The homepage should use the stable `hao-home--safe` structure in `_pages/about.md`.

The active visual stack is intentionally short:

1. `site-polish.css`
2. `site-upgrade.css`
3. `hao-design.css`
4. `hao-home-safe.css`
5. `hao-home-center-fix.css`

Older Mission Log and v6 experiment styles must not be injected into production pages. They can remain in the repository temporarily for history, but they are not part of the active frontend surface.

## Deployment contract

Before a Pages artifact is uploaded, the workflow must verify `_site/index.html` contains:

- `hao-home--safe`
- `hao-home-center-fix.css?v=20260802-home-cleanup`
- `Zhihao LIU`

The artifact must not contain deprecated homepage styles such as:

- `mission-log-shell-v2.css`
- `hao-home-v6.css`

This prevents a green CI run from publishing an artifact that still points to the wrong homepage shell.

## Visual contract

The homepage should preserve these rules:

- The real al-folio navbar brand must remain visible as black `Zhihao LIU`.
- The navbar brand must not be fabricated with `::before` content.
- The homepage and navbar should share one centered page shell.
- Legacy about header/profile, legacy news, and legacy announcements should remain disabled on the homepage.
- The homepage should avoid fixed rails, full-bleed experimental canvases, and oversized hero typography that can clip at common desktop widths.

## Change policy

When the homepage visual layer changes:

1. Update `hao-home-center-fix.css` or `hao-home-safe.css`; avoid adding another final CSS layer.
2. Bump `STYLESHEET_VERSION` in `_plugins/site_visual_polish.rb`.
3. Keep `test/style_contract.js` aligned with the intended production shell.
4. Confirm the workflow artifact check passes before merging.
5. After merge, verify the live page shows the new stylesheet version in its HTML.
