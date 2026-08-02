# Homepage Frontend Governance

This document records the visual governance rules after the August 2026 homepage rescue and the subsequent decision to restore the site to an al-folio-first baseline.

## Site-wide baseline

The starter should look like upstream al-folio by default. Secondary pages such as Blog, Projects, Repositories, CV, and individual posts must not receive broad custom visual CSS from `_plugins/site_visual_polish.rb`.

The plugin may still perform narrow content fixes, such as the CV title text replacement, but custom visual CSS should be scoped to the homepage only.

## Homepage ownership model

The homepage must keep the native al-folio `layout: about` structure. The page content should live inside the upstream about-page sequence:

1. `.post`
2. `.post-header`
3. `.post-title`
4. `.desc`
5. `article`
6. `.profile`
7. `.clearfix`

The custom homepage content root is:

```html
<div class="hao-home hao-home--production hao-home--alfolio">
```

Do not reintroduce `hao-home--safe` as the active homepage root. That old rescue class hid the native al-folio title/profile surface and pushed the page toward a standalone landing-page shell.

## Active visual stack

The active custom visual stack for rendered pages is intentionally minimal:

1. Upstream al-folio theme styles from the theme/gem layer.
2. `hao-home-center-fix.css` on the homepage only.

`site-polish.css`, `site-upgrade.css`, `hao-design.css`, and `hao-home-safe.css` may remain in the repository for history, but they must not be injected into the blog index or other secondary pages. They should not be treated as active production visual layers.

Older Mission Log and v6 experiment styles must not be injected or kept as active production CSS.

## Shell contract

The homepage should follow al-folio's native shell and widen it, rather than replacing it.

Allowed shell tokens:

- `--hao-alfolio-shell-max`
- `--hao-alfolio-gutter`
- `--hao-alfolio-shell`

The following elements should share the same widened shell:

- `body:has(.hao-home--alfolio) main > .container`
- `body:has(.hao-home--alfolio) .navbar > .container`
- `body:has(.hao-home--alfolio) .navbar > .container-fluid`

Do not reintroduce competing standalone page-width tokens such as `--hao-page-shell`, old `--hao-home-shell-*`, or `--hao-prod-shell`.

## Navbar brand contract

Upstream al-folio intentionally does not render the left navbar brand on the homepage when `page.permalink == '/'`; it renders the brand on secondary pages. For this customized homepage, `_plugins/site_visual_polish.rb` reinserts the same semantic brand pattern used by the upstream secondary-page header:

```html
<a class="navbar-brand title font-weight-lighter hao-home-navbar-brand" data-hao-home-brand="true" href="/"><span class="font-weight-bold">Zhihao</span> LIU</a>
```

This preserves the original al-folio brand typography rather than fabricating text with CSS. Blog and secondary pages should continue to use the theme's native brand.

The homepage brand must not be fabricated with `::before` content, hidden with `font-size: 0`, or restyled into a different typography system.

## Deployment contract

Before a Pages artifact is uploaded, the workflow must verify `_site/index.html` contains:

- `hao-home--alfolio`
- `Research records, shipped tools, and field-informed systems.`
- `hao-home-center-fix.css?v=20260802-alfolio-baseline`
- `hao-home-navbar-brand`
- `font-weight-bold">Zhihao</span> LIU`

The workflow must also verify `_site/blog/index.html` does not contain active custom visual stylesheets:

- `site-polish.css`
- `site-upgrade.css`
- `hao-design.css`
- `hao-home-safe.css`
- `hao-home-center-fix.css`

This prevents a green CI run from keeping the homepage fixed while leaving the blog index visually polluted.

## Visual contract

The homepage should preserve these rules:

- Keep the native al-folio about-page title, subtitle, profile image, article flow, and clearfix structure visible.
- Widen the original al-folio container instead of rebuilding a standalone landing-page shell.
- Keep the homepage navbar brand visually aligned with al-folio's original brand style: `<span class="font-weight-bold">Zhihao</span> LIU`.
- Place `Current work`, `Systems`, `Knowledge`, `Trajectory`, and `Contact` as compatible content modules inside the original layout.
- Use light cards, subtle borders, and the existing theme accent; avoid heavy hero panels, full-bleed canvases, duplicated profile cards, or product-site visual language.
- Keep legacy news, latest posts, selected papers, and announcements disabled unless deliberately reintroduced.

## Change policy

When the homepage visual layer changes:

1. Update `hao-home-center-fix.css` or the homepage markdown; avoid adding another final CSS layer.
2. Bump `STYLESHEET_VERSION` in `_plugins/site_visual_polish.rb`.
3. Keep `test/style_contract.js` aligned with the intended al-folio-compatible shell.
4. Confirm both homepage and blog artifact checks pass before merging.
5. After merge, verify the live homepage shows the new stylesheet version and the live blog does not include custom visual CSS links.
