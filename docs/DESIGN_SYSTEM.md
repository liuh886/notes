# Hao's Notes Design System

This document is the canonical visual and information-architecture contract for Hao's Notes.

## Product positioning

**Research & Product Studio.**

Hao's Notes is Zhihao Liu's personal research and product studio: a public surface for research records, shipped tools, working notes, and selected professional outputs. The site should connect research, evidence, software, and writing without turning into a SaaS landing page or a raw project database.

## Production baseline

The current production site is the source of truth.

- Jekyll and `al_folio_core` remain the runtime and broad visual baseline.
- Local styling is intentionally narrow and page-scoped.
- The current homepage structure, spacing, profile placement, card treatment, dark mode, and mobile behavior must not regress during refactors.
- A refactor is successful only when it preserves the current visual result or improves it deliberately.

Do not introduce a second visual system in parallel with production.

## Visual direction

**Calm, editorial, technical, product-aware.**

The site should feel like a quiet professional workspace: readable, precise, credible, and easy to scan.

It should not feel like:

- a loud SaaS landing page;
- a generic academic template;
- a dashboard made entirely of equal-weight cards;
- an animation-heavy portfolio.

## Information architecture

### Home

Home remains the front door and the asset directory. Its current four-section structure stays authoritative:

1. **Current work** — the six actively maintained products and systems.
2. **Projects & code** — selected work beyond the active product list.
3. **Notes & publications** — formal outputs and selected working notes.
4. **Contact** — portfolio, booking, professional profiles, CV, publications, and notes archive.

`Current work` remains a six-item asset directory until an explicit product decision changes it.

A `Latest notes` block exists behind `site.data.site_features.home.latest_notes.enabled`. It is disabled by default and must cause no visual change while disabled.

### Blog

Blog is the editorial reading surface. Its reader-facing lanes are:

- **Research Notes** — methods, datasets, papers, and technical reasoning;
- **Build Logs** — architecture decisions, agentic workflows, and shipped systems;
- **Field Notes** — field work, expeditions, travel, and direct operational observations;
- **Essays** — longer-form reflections on ideas, judgment, learning, and life beyond technical work.

The four lanes are editorial entry points. The chronological `All notes` archive remains complete beneath them.

Historical tags and categories remain useful archive metadata, but they do not define the top-level Blog information architecture.

### Projects and repositories

Projects are portfolio narratives. Repositories are product and code entry points. They should remain distinct from the actively maintained `Current work` list and should not duplicate it without a clear reason.

### CV

CV remains formal and visually native to the site. Its sidebar must stay scrollable without heavy native scrollbar chrome.

## CSS ownership

Only production-loaded stylesheets should remain.

### Global

- `assets/css/footer-build.css`

### Homepage

- `assets/css/hao-home-center-fix.css`
- `assets/css/hao-home-atmosphere-v2.css`
- `assets/css/hao-home-current-work-texture-fix.css`

### Secondary pages

- `assets/css/cv-toc-polish.css`
- `assets/css/repositories-page-polish.css`
- `assets/css/portfolio-page-polish.css`
- `assets/css/legal-page.css`

Do not add another `safe`, `fix`, `vN`, `upgrade`, or fallback stylesheet for an existing surface. Change the stylesheet that owns that surface.

Unused historical visual layers should be deleted once production injection and source references confirm they are not used.

## Frontend architecture

Content belongs in Markdown or `_data` files. Styling belongs in the stylesheet that owns the surface. Build-time Ruby should be limited to behavior that cannot yet be expressed cleanly in the owned page source or supported theme configuration.

Post-render HTML regex rewriting is technical debt. Remove it incrementally only when an equivalent source-level implementation is available and the existing visual contract is preserved. Do not replace working output with an incomplete local layout merely to eliminate a regex.

The first completed step is moving the homepage `Portfolio` contact link into `_pages/about.md` instead of injecting it after render.

## Search

Site search uses the existing maintained al-folio search capability. Do not build a parallel search implementation.

Reader-facing search flags live in `_data/site_features.yml` and are applied before render by `_plugins/site_features.rb`. Search includes posts by default and excludes social and bibliography results unless a later product decision changes that scope.

The native search UI is preferred because it matches the site's runtime visual language without an additional modal or CSS layer.

## Accessibility and performance

Every change must preserve:

- keyboard focus states;
- dark mode;
- reduced-motion behavior;
- mobile layout;
- responsive and lazy-loaded images;
- readable line lengths;
- GitHub Pages build stability.

Do not add heavyweight animation, search, or UI dependencies when the existing runtime already provides the required capability.

## Change policy

1. Treat current production output as the visual baseline.
2. Change the smallest owning surface.
3. Prefer existing maintained runtime capabilities before adding packages or custom implementations.
4. Delete obsolete layers instead of preserving compatibility shims.
5. Update contract tests when an architectural invariant changes.
6. Merge only after production build and visual/interaction checks pass.
