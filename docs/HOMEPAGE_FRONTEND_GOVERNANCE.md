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

The custom homepage content root is:

```html
<div class="hao-home hao-home--production hao-home--alfolio">
```

The rendered homepage body receives the explicit class `hao-home-page` from `_plugins/site_visual_polish.rb`. Homepage CSS must use that class as its scope. Do not rely on `body:has(...)`: the explicit body class is easier to audit, survives CSS processing predictably, and exposes the real theme container without affecting secondary pages.

Do not reintroduce `hao-home--safe` as the active homepage root. That old rescue class hid the native al-folio title/profile surface and pushed the page toward a standalone landing-page shell.

## Active visual stack

The whole site should use upstream al-folio as the default visual baseline. Blog, Projects, Repositories, CV, and other secondary pages should not receive broad custom visual CSS from the starter repository.

The only homepage-specific visual layer is:

1. `hao-home-center-fix.css`

`hao-home-center-fix.css` owns the shared navigation/content/footer shell, the coordinated introduction/profile/identity banner, light content cards, status labels, section rhythm, and responsive behavior for the homepage.

Older Mission Log and v6 experiment styles must not be injected or kept as active production CSS.

## Shell contract

The homepage follows al-folio's native shell and widens it rather than replacing it. Navigation, homepage content, and footer must use the same measured left and right edges. A visually wider content shell than the navigation is not allowed because it creates a subtle but noticeable alignment break across the page.

Allowed shell tokens:

- `--hao-alfolio-content-shell-max`
- `--hao-alfolio-nav-shell-max`
- `--hao-alfolio-gutter`
- `--hao-alfolio-content-shell`
- `--hao-alfolio-nav-shell`
- `--hao-home-profile-width`

The production desktop maximum is `84rem` for both shell calculations:

- homepage content: `84rem`
- navbar and footer: `84rem`

The real theme nodes are assigned as follows:

- `.hao-home-page > .container[role="main"]` uses the content shell.
- `.hao-home-page #navbar > .container` uses the navigation shell.
- `.hao-home-page #navbar > .container-fluid` uses the navigation shell.
- `.hao-home-page footer > .container` uses the navigation shell.

Although the code retains separate semantic content and navigation variables, their maximum width and gutter calculation must remain identical. This preserves explicit ownership while guaranteeing visual alignment.

The al-folio default layout renders the content container directly below `<body>`; it does not render a `main > .container` wrapper. Homepage changes must be based on the generated DOM, not an assumed wrapper.

Within the shared shell, the `.post`, homepage index, content sections, card grids, and contact block must not carry a narrower outer `max-width`. Individual paragraphs may keep readable line lengths.

Do not reintroduce competing standalone page-width tokens such as `--hao-alfolio-shell-max`, `--hao-page-shell`, old `--hao-home-shell-*`, or `--hao-prod-shell`.

## Banner contract

The custom introduction, native profile image, profile caption, and native title/subtitle form one coordinated banner.

On desktop:

- `.hao-home-intro` occupies the left column and leads the page narrative.
- the native `.profile` occupies the upper-right column.
- the profile caption `Offshore Bergen · Aug 2020` remains directly beneath the image as quiet field metadata.
- `.post-header`, containing `Zhihao LIU` and `Climate & Energy Data Scientist`, sits beneath the image and caption as the identity block.
- `.hao-home-index` and all following sections span the full shared shell below the banner.
- the upstream `article` and `.clearfix` wrappers may use `display: contents` so their children participate in the banner grid without duplicating the theme layout.
- the profile must not remain floated.

At tablet and mobile widths, the grid becomes one column in this order:

1. profile image and field caption
2. native name and role
3. custom introduction
4. section index

This keeps the complete identity unit together instead of separating the image, caption, and name with a long introductory block.

The banner contains exactly one direct action: `Contact`. It links to the existing Google appointment page at `https://calendar.app.google/UQ267iEs4MTAGFSd7`. The complete internal section navigation belongs in `.hao-home-index`; it should not be duplicated as another button row in the banner.

## Card hierarchy contract

Card identifiers remain quiet metadata. Status values use a subtle pill treatment with a light border and the existing theme accent. They should improve scanability without creating a dashboard-like visual system or adding status-specific colors that require a separate taxonomy.

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
- `hao-home-page`
- `Research records, shipped tools, and field-informed systems.`
- the evidence-driven homepage introduction
- `Offshore Bergen · Aug 2020`
- the Google appointment URL
- `hao-home-center-fix.css?v=20260803-shell-contact-caption`
- `hao-home-navbar-brand`
- `font-weight-bold">Zhihao</span> LIU`

The artifact must not contain deprecated homepage styles such as:

- `mission-log-shell-v2.css`
- `hao-home-v6.css`

The workflow must also verify `_site/blog/index.html` does not contain starter-level custom visual CSS such as `site-polish.css`, `site-upgrade.css`, `hao-design.css`, `hao-home-safe.css`, or `hao-home-center-fix.css`.

This prevents a green CI run from publishing an artifact that either points to the wrong homepage shell or pollutes secondary pages away from al-folio's baseline.

## Visual contract

The homepage should preserve these rules:

- Keep the native al-folio about-page title, subtitle, profile image, article, and clearfix semantics.
- Widen the original al-folio container instead of rebuilding a standalone landing-page shell.
- Keep navigation, homepage content, and footer visually aligned to the same left and right edges.
- Treat the introduction, profile, field caption, and identity block as one coordinated banner.
- Keep `Offshore Bergen · Aug 2020`, `Zhihao LIU`, and `Climate & Energy Data Scientist` grouped beneath the profile image.
- Use one banner action, `Contact`, linked to the Google booking page; keep internal navigation in the section index.
- Keep the homepage navbar brand visually aligned with al-folio's original brand style: `<span class="font-weight-bold">Zhihao</span> LIU`.
- Place `Current work`, `Systems`, `Knowledge`, `Trajectory`, and `Contact` as compatible content modules inside the original layout.
- Use light cards, subtle borders, restrained status pills, and the existing purple accent; avoid heavy hero panels, full-bleed canvases, duplicated profile cards, or product-site visual language.
- Keep legacy news, latest posts, selected papers, and announcements disabled unless deliberately reintroduced.

## Change policy

When the homepage visual layer changes:

1. Update `hao-home-center-fix.css` or the homepage markdown; avoid adding another final CSS layer.
2. Bump `STYLESHEET_VERSION` in `_plugins/site_visual_polish.rb`.
3. Keep `test/style_contract.js` aligned with the intended shell, banner, caption, and action hierarchy.
4. Confirm the workflow artifact check passes before merging.
5. After merge, verify the live page shows the new stylesheet version and the `hao-home-page` body class in its HTML.
