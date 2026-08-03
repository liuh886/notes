# Homepage Frontend Governance

This document records the production rules for the Hao's Notes homepage after the August 2026 return to an al-folio-compatible design.

## Ownership model

The site keeps upstream al-folio as its visual baseline. Blog, Projects, Repositories, publications, and individual posts must not receive broad custom visual CSS from this starter repository.

The homepage keeps the native `layout: about` DOM and adds one scoped content root:

```html
<div class="hao-home hao-home--production hao-home--alfolio">
```

`_plugins/site_visual_polish.rb` adds `hao-home-page` to the rendered `<body>` and injects only `hao-home-center-fix.css` on `/`.

The CV is the only secondary-page exception. It receives `hao-cv-page` and the narrowly scoped `cv-toc-polish.css` layer, which hides the native TOC scrollbar chrome while preserving the existing tocbot scrolling behavior.

## Optical shell contract

The theme's `.container` includes 15 px of inline padding. Matching the outer boxes of the navbar and main container therefore did not match their visible content edges.

The desktop shell uses:

- homepage content outer width: `81rem`
- navbar and footer outer width: `84rem`
- shared gutter calculation: `clamp(1rem, 3vw, 2.5rem)`

This three-rem difference is deliberate optical compensation. The visible left edge of the homepage should align with the navbar brand, and the visible right edge should align with the navbar controls. Do not describe the two outer containers as numerically identical.

The scoped nodes are:

- `.hao-home-page > .container[role="main"]`
- `.hao-home-page #navbar > .container`
- `.hao-home-page #navbar > .container-fluid`
- `.hao-home-page footer > .container`

## Banner contract

The desktop banner contains:

- the custom introduction on the left;
- the native profile image on the right;
- `Offshore Bergen · Aug 2020` directly under the image;
- one `Contact` action linked to the Google booking page;
- the section index below both columns.

The native about-page `.post-header` is hidden on the homepage. The duplicate `Zhihao LIU` and `Climate & Energy Data Scientist` block must not appear beneath the photograph. The real navbar brand remains visible.

At tablet and mobile widths, the order is:

1. profile image and field caption;
2. introduction and contact action;
3. section index.

## Homepage information architecture

The homepage has four sections:

1. **Current work** — only the five actively maintained product and research lanes.
2. **Projects & code** — a non-overlapping selection from the Projects and Repositories archives.
3. **Notes & publications** — actual blog writing plus the peer-reviewed paper and patent record.
4. **Contact** — booking, professional profiles, CV, publication archive, and notes archive.

The generic `Trajectory` block is not part of the homepage. Career history belongs in the CV.

### Duplication rules

- Items in `_data/current_operations.yml` must not be repeated in `_data/selected_deployments.yml`.
- `_data/research_records.yml` is reserved for publication and patent records, not products or knowledge hubs.
- `_data/field_observations.yml` must link to real blog entries.
- Project and repository selections should link back to their full archives.

## Current selected sources

The Projects & code section draws from real archive entries such as:

- dMRV is the key
- OceanHub
- 4D Seismic
- Quad 35 hybrid seismic acquisition
- iCal Pro for Obsidian
- GhostCam
- HTTP to Obsidian CLI Gateway
- Open Phrasebank

The Notes & publications section includes the 2025 snow-depth paper, the underwater seismic-device patent, and selected published notes.

## CV TOC contract

The CV keeps the upstream left-side `#toc-sidebar` and its sticky, vertically scrollable behavior. The custom layer must only remove scrollbar chrome:

- use `scrollbar-width: none` for Firefox;
- use `-ms-overflow-style: none` for legacy Microsoft engines;
- hide `::-webkit-scrollbar` for Chromium and Safari;
- do not set `overflow-y: hidden` or disable wheel, touch, or keyboard scrolling.

The stylesheet must load only on `/cv/` and must not leak into Blog or other secondary pages.

## Navbar brand contract

The homepage navbar brand is injected as real markup:

```html
<a class="navbar-brand title font-weight-lighter hao-home-navbar-brand" data-hao-home-brand="true" href="/">
  <span class="font-weight-bold">Zhihao</span> LIU
</a>
```

Do not fabricate the brand with pseudo-elements or hide its real text.

## Deployment contract

Before upload, CI must verify that `_site/index.html` contains:

- `hao-home--alfolio`
- `hao-home-page`
- the profile caption
- `Projects &amp; code`
- `Notes &amp; publications`
- representative real archive items
- the Google booking URL
- `hao-home-center-fix.css?v=20260803-cv-toc-home-81`
- the navbar brand

CI must also verify that `_site/cv/index.html` contains `hao-cv-page`, `#toc-sidebar`, and `cv-toc-polish.css?v=20260803-cv-toc-home-81`.

CI must reject a homepage that still contains `id="trajectory"`. Blog and other secondary pages must not load either scoped stylesheet.

## Change policy

When the homepage or CV TOC polish changes:

1. update the existing homepage markdown, data files, `hao-home-center-fix.css`, or `cv-toc-polish.css`;
2. do not add another final CSS layer for the same surface;
3. bump `STYLESHEET_VERSION`;
4. update the style contract and built-artifact checks;
5. merge only after the production Jekyll build and secondary-page isolation checks pass.
