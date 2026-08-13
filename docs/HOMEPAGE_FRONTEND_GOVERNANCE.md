# Homepage Frontend Governance

This document records implementation-specific production rules for the Hao's Notes homepage. `docs/DESIGN_SYSTEM.md` is the canonical site-wide design and information-architecture contract.

## Source of truth

The current production homepage is the visual baseline. Refactors must preserve its optical alignment, profile placement, spacing, responsive behavior, dark mode, and interaction quality unless an explicit design change improves them.

Do not use historical Mission Log or abandoned redesign plans as implementation guidance.

## Ownership model

The homepage keeps the native `layout: about` runtime and one scoped content root:

```html
<div class="hao-home hao-home--production hao-home--alfolio">
```

`_plugins/site_visual_polish.rb` still performs a small set of bounded post-render operations that depend on upstream theme markup. These are technical debt, not a preferred extension mechanism.

Remove a post-render patch only when its replacement can live in owned source without changing production output.

The `Portfolio` contact link is now owned directly by `_pages/about.md`; the corresponding post-render injection has been removed.

## Production stylesheet contract

The homepage loads exactly these local stylesheets, in this order:

1. `hao-home-center-fix.css`
2. `hao-home-atmosphere-v2.css`
3. `hao-home-current-work-texture-fix.css`

Do not add another homepage fallback or patch layer. If the homepage changes, modify the stylesheet that owns the relevant behavior.

## Optical shell contract

The theme's `.container` includes inline padding. Matching outer boxes numerically does not match visible content edges.

Desktop production uses:

- homepage content outer width: `81rem`;
- navbar and footer outer width: `84rem`;
- shared gutter calculation: `clamp(1rem, 3vw, 2.5rem)`.

The three-rem difference is deliberate optical compensation. Preserve visible alignment rather than forcing identical numeric container widths.

Scoped nodes:

- `.hao-home-page > .container[role="main"]`
- `.hao-home-page #navbar > .container`
- `.hao-home-page #navbar > .container-fluid`
- `.hao-home-page footer > .container`

## Banner contract

Desktop banner:

- custom introduction on the left;
- native profile image on the right;
- `Offshore Bergen · Aug 2020` directly under the image;
- one `Contact` action linked to the Google booking page;
- section index below both columns.

The headline remains:

> Research records, shipped tools, and agentic AI systems.

The duplicate native about-page name/role block stays hidden. The real navbar brand stays visible.

Tablet/mobile order:

1. profile image and field caption;
2. introduction and contact action;
3. section index.

## Homepage information architecture

The active homepage sections are:

1. **Current work** — six actively maintained products and systems;
2. **Projects & code** — a non-overlapping selection from project and repository archives;
3. **Notes & publications** — formal research outputs plus selected real writing;
4. **Contact** — portfolio, booking, professional profiles, CV, publications, and notes archive.

`Current work` remains unchanged until an explicit product decision changes it.

A `Latest notes` section is implemented but disabled by default through:

```yaml
home:
  latest_notes:
    enabled: false
    limit: 3
```

When disabled, it must render no section and no navigation item. Enabling it must reuse existing homepage visual primitives rather than introducing a new card system.

## Duplication rules

- Items in `_data/current_operations.yml` must not be repeated in `_data/selected_deployments.yml`.
- `_data/research_records.yml` is for formal research outputs, datasets, and patent records.
- `_data/field_observations.yml` links to real published notes.
- Project and repository selections link back to their full archives.
- Upstream projects must be described as contributions rather than personally owned repositories.

## Secondary-page isolation

The homepage visual layer must not leak into Blog, Projects, publications, or individual posts.

Narrow exceptions remain:

- CV: `cv-toc-polish.css`;
- Repositories: `repositories-page-polish.css`;
- Portfolio: `portfolio-page-polish.css`;
- Legal pages: `legal-page.css`.

## Navbar brand contract

The homepage navbar brand is currently injected as real markup by `_plugins/site_visual_polish.rb`:

```html
<a class="navbar-brand title font-weight-lighter hao-home-navbar-brand" data-hao-home-brand="true" href="/">
  <span class="font-weight-bold">Zhihao</span> LIU
</a>
```

This patch remains until an upstream-supported or source-owned replacement can preserve the exact current navbar behavior. Do not fabricate the brand with pseudo-elements.

## Deployment contract

CI should verify structural invariants rather than editorial copy. At minimum, the built site must preserve:

- `hao-home--alfolio`;
- `hao-home-page`;
- the profile caption;
- `current-work`, `selected-work`, `notes-publications`, and `contact` anchors;
- the Google booking URL;
- the homepage stylesheet set;
- the navbar brand;
- CV and repositories scoped styles;
- isolation of homepage styles from Blog and other secondary pages.

Feature-flagged `latest-notes` must be absent from the built homepage while disabled.

## Change policy

1. Update the owning Markdown, data file, plugin, or existing stylesheet.
2. Do not add a new final CSS layer for the same surface.
3. Remove post-render patches only after source-level parity exists.
4. Delete obsolete docs and unused visual assets rather than keeping migration or fallback layers.
5. Update relevant contracts whenever an invariant changes.
6. Merge only after build and visual checks pass.
