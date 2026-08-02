# Homepage Frontend Governance

This document records the production rules for the Hao's Notes homepage after the August 2026 rescue and redesign work.

## Current ownership model

The homepage should use the stable `hao-home--safe hao-home--production` structure in `_pages/about.md`.

The active visual stack is intentionally short:

1. `site-polish.css`
2. `site-upgrade.css`
3. `hao-design.css`
4. `hao-home-safe.css`
5. `hao-home-center-fix.css`

`hao-home-safe.css` keeps the homepage out of the legacy al-folio about-page surface. `hao-home-center-fix.css` is the production homepage layer. It owns the page shell, hero, card system, section rhythm, profile card, and responsive behavior.

Older Mission Log and v6 experiment styles must not be injected or kept as active production CSS.

## Shell contract

The homepage uses one shared shell token:

- `--hao-page-shell-max`
- `--hao-page-gutter`
- `--hao-page-shell`

The navbar container and `.hao-home--production` must both use this same shell. Do not reintroduce competing width variables such as old `--hao-home-shell-*` or `--hao-prod-shell` page-width tokens.

## Navbar brand contract

The homepage must render a real anchor:

```html
<a class="navbar-brand hao-home-navbar-brand" data-hao-home-brand="true" href="/">Zhihao LIU</a>
```

This is injected only on the homepage by `_plugins/site_visual_polish.rb`, because the homepage and secondary pages do not always emit identical navbar-brand markup. Blog and other secondary pages should continue to use the theme's native brand.

The homepage brand must not be fabricated with `::before` content, and it must not be hidden with `font-size: 0`.

## Deployment contract

Before a Pages artifact is uploaded, the workflow must verify `_site/index.html` contains:

- `hao-home--safe`
- `hao-home--production`
- `Build systems that turn field evidence into usable products.`
- `hao-home-center-fix.css?v=20260802-shell-navbar-fix`
- `hao-home-navbar-brand`
- `Zhihao LIU`

The artifact must not contain deprecated homepage styles such as:

- `mission-log-shell-v2.css`
- `hao-home-v6.css`

This prevents a green CI run from publishing an artifact that still points to the wrong homepage shell.

## Visual contract

The homepage should preserve these rules:

- The homepage navbar brand must remain visible as black `Zhihao LIU`.
- The homepage and navbar must share one centered page shell.
- The homepage should keep the current white, purple, and soft-gradient visual language.
- The homepage should feel like a production personal product surface: composed hero, profile card, current-work cards, systems grid, knowledge workspace, trajectory, and contact block.
- Legacy about header/profile, legacy news, and legacy announcements should remain disabled on the homepage.
- The homepage should avoid fixed rails, full-bleed experimental canvases, and oversized hero typography that can clip at common desktop widths.

## Change policy

When the homepage visual layer changes:

1. Update `hao-home-center-fix.css` or `hao-home-safe.css`; avoid adding another final CSS layer.
2. Bump `STYLESHEET_VERSION` in `_plugins/site_visual_polish.rb`.
3. Keep `test/style_contract.js` aligned with the intended production shell.
4. Confirm the workflow artifact check passes before merging.
5. After merge, verify the live page shows the new stylesheet version in its HTML.
