# Homepage Frontend Governance

This document records the production rules for the Hao's Notes homepage after the August 2026 return to an al-folio-compatible design.

## Ownership model

The site keeps upstream al-folio as its visual baseline. Blog, Projects, publications, and individual posts must not receive broad custom visual CSS from this starter repository.

The homepage keeps the native `layout: about` DOM and adds one scoped content root:

```html
<div class="hao-home hao-home--production hao-home--alfolio">
```

`_plugins/site_visual_polish.rb` adds `hao-home-page` to the rendered `<body>` and injects only `hao-home-center-fix.css` on `/`.

Two secondary pages have narrow component exceptions:

- CV receives `hao-cv-page` and `cv-toc-polish.css`, which hides only the native TOC scrollbar chrome while preserving scrolling.
- Repositories receives `hao-repositories-page` and `repositories-page-polish.css`, because its custom repository-card markup is not styled by upstream al-folio.

Neither exception may leak into Blog, Projects, publications, or individual posts.

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

The headline is:

> Research records, shipped tools, and agentic AI systems.

Use the established English term `agentic AI`; do not reverse it to `AI agentic`.

The native about-page `.post-header` is hidden on the homepage. The duplicate `Zhihao LIU` and `Climate & Energy Data Scientist` block must not appear beneath the photograph. The real navbar brand remains visible.

At tablet and mobile widths, the order is:

1. profile image and field caption;
2. introduction and contact action;
3. section index.

## Homepage information architecture

The homepage has four sections:

1. **Current work** — only the five actively maintained product and research lanes.
2. **Projects & code** — a non-overlapping selection from the Projects and Repositories archives.
3. **Notes & publications** — one combined section containing formal research outputs and selected real blog writing.
4. **Contact** — booking, professional profiles, CV, publication archive, and notes archive.

The generic `Trajectory` block is not part of the homepage. Career history belongs in the CV.

### Duplication rules

- Items in `_data/current_operations.yml` must not be repeated in `_data/selected_deployments.yml`.
- `_data/research_records.yml` is reserved for formal research outputs, datasets, and patent records, not products or knowledge hubs.
- `_data/field_observations.yml` must link to real blog entries.
- Project and repository selections should link back to their full archives.
- Upstream projects must be described as contributions, not represented as personally owned repositories.

## Current selected sources

The Projects & code section draws from real archive entries and upstream work including:

- dMRV is the key
- OceanHub
- 4D Seismic
- Climate-to-energy downscaling
- Quad 35 hybrid seismic acquisition
- OffshoreOrient Studio
- iCal Pro for Obsidian
- Ductor — AI Agentic Harness, explicitly marked as an open-source contribution
- HTTP to Obsidian CLI Gateway
- Open Phrasebank

GhostCam is not part of the homepage selection.

The Notes & publications section includes:

- the 2025 snow-depth paper;
- the Snow-depth / ICESat-2 Zenodo dataset, DOI `10.5281/zenodo.10048875`;
- the underwater seismic-device patent;
- selected published notes, including `ICESat-2 vs DTM1, DTM10, Copernicus30, FABDEM`.

## Repositories page contract

The Repositories page uses custom markup from `_pages/repositories.md`; without its scoped stylesheet, GitHub profile images, light/dark stats images, repository details, chips, metrics, and calls to action collapse into an unstructured vertical flow.

The scoped layer must provide:

- one profile column;
- a two-column repository grid on desktop and one column below 768 px;
- equal-height card bodies with actions anchored after summaries;
- one theme-appropriate stats image, hiding `.repo-light` or `.repo-dark` as appropriate;
- constrained images and `min-width: 0`/`overflow-wrap` protection for long repository names;
- visible focus states and reduced-motion handling;
- no broad selectors outside `.hao-repositories-page`.

The stylesheet must load only on `/repositories/` and must not be replaced by the older broad `site-polish.css` or `site-upgrade.css` layers.

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
- the current agentic-AI headline
- `Projects &amp; code`
- `Notes &amp; publications`
- representative curated projects, code, dataset, and notes
- the Google booking URL
- `hao-home-center-fix.css?v=20260803-cv-toc-home-81`
- the navbar brand

CI must also verify:

- `_site/cv/index.html` contains `hao-cv-page`, `#toc-sidebar`, and `cv-toc-polish.css?v=20260803-cv-toc-home-81`;
- `_site/repositories/index.html` contains `hao-repositories-page`, the repository grid, and `repositories-page-polish.css?v=20260803-cv-toc-home-81`;
- Blog does not load any of the scoped homepage, CV, or repositories stylesheets.

CI must reject a homepage that still contains `GhostCam` or `id="trajectory"`.

## Change policy

When the homepage, CV TOC, or Repositories layout changes:

1. update the existing markdown, data files, or the one stylesheet that owns that surface;
2. do not add another final CSS layer for the same surface;
3. change the stylesheet path or bump `STYLESHEET_VERSION` when cached CSS contents change;
4. update the relevant frontend contract and built-artifact checks;
5. merge only after the production Jekyll build and secondary-page isolation checks pass.
