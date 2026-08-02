# Homepage Frontend Governance

This document records the production rules for the Hao's Notes homepage after the August 2026 rescue work and the subsequent return to an al-folio-compatible design direction.

## Current ownership model

The homepage must keep the native al-folio `layout: about` structure. The page content should live inside the upstream about-page sequence:

1. `.post`
2. `.post-header`
3. `.post-title`
4. `.desc`
5. `article`
6. `.profile`
7. `.clearfix`

The custom homepage content root is now:

```html
<div class="hao-home hao-home--production hao-home--alfolio">
```

Do not reintroduce `hao-home--safe` as the active homepage root. That old rescue class hid the native al-folio title/profile surface and pushed the page toward a standalone landing-page shell.

## Active visual stack

The whole site should use upstream al-folio as the default visual baseline. Blog, Projects, Repositories, CV, and other secondary pages should not receive broad custom visual CSS from the starter repository.

The only homepage-specific visual layer is:

1. `hao-home-center-fix.css`

`hao-home-center-fix.css` is the al-folio-compatible wide homepage layer. It owns only the wider native container, light content cards, section rhythm, and responsive behavior for the homepage.

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

Within that shell, the visible homepage content should also span the same available width. The `.post`, `article`, `article > .clearfix`, `.hao-home--alfolio`, `.hao-home-intro`, `.hao-home-index`, `.hao-home-section`, and `.hao-home-contact` blocks should not carry narrower outer `max-width` rules. Text paragraphs may keep readable line lengths, but the section and card-grid containers should align with the navbar's left and right edges.

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
- `hao-home-center-fix.css?v=20260802-home-width-align`
- `hao-home-navbar-brand`
- `font-weight-bold">Zhihao</span> LIU`

The artifact must not contain deprecated homepage styles such as:

- `mission-log-shell-v2.css`
- `hao-home-v6.css`

The workflow must also verify `_site/blog/index.html` does not contain starter-level custom visual CSS such as `site-polish.css`, `site-upgrade.css`, `hao-design.css`, `hao-home-safe.css`, or `hao-home-center-fix.css`.

This prevents a green CI run from publishing an artifact that either points to the wrong homepage shell or pollutes secondary pages away from al-folio's baseline.

## Visual contract

The homepage should preserve these rules:

- Keep the native al-folio about-page title, subtitle, profile image, article flow, and clearfix structure visible.
- Widen the original al-folio container instead of rebuilding a standalone landing-page shell.
- Align the visible homepage content blocks to the same left and right shell edges as the navbar.
- Keep the homepage navbar brand visually aligned with al-folio's original brand style: `<span class="font-weight-bold">Zhihao</span> LIU`.
- Place `Current work`, `Systems`, `Knowledge`, `Trajectory`, and `Contact` as compatible content modules inside the original layout.
- Use light cards, subtle borders, and the existing purple accent; avoid heavy hero panels, full-bleed canvases, duplicated profile cards, or product-site visual language.
- Keep legacy news, latest posts, selected papers, and announcements disabled unless deliberately reintroduced.

## Change policy

When the homepage visual layer changes:

1. Update `hao-home-center-fix.css` or the homepage markdown; avoid adding another final CSS layer.
2. Bump `STYLESHEET_VERSION` in `_plugins/site_visual_polish.rb`.
3. Keep `test/style_contract.js` aligned with the intended al-folio-compatible shell.
4. Confirm the workflow artifact check passes before merging.
5. After merge, verify the live page shows the new stylesheet version in its HTML.
