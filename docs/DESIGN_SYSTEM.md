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

A `Latest notes` block exists behind `_config.yml` → `home_latest_notes.enabled`. It is disabled by default and must cause no visual change while disabled.

### Blog

Blog keeps the native al-folio chronological reading flow as its visual and structural baseline.

- The main surface remains one paginated post stream.
- Existing `tags` and `categories` are the only editorial taxonomy mechanism.
- `categories` define the top-level Blog information architecture and are shown at the top of the Blog: **Research Notes**, **Build Logs**, **Field Notes**, and **Essays**.
- Every post has exactly one primary category from those four values.
- `tags` remain fine-grained descriptors for subject matter, technologies, methods, places, and other cross-cutting themes.
- Legacy topical categories belong in `tags`; obsolete structural labels such as `notes`, `images`, `links`, and `code` are removed rather than carried forward.
- Featured posts may remain above the chronological stream using the theme's existing card treatment.
- Do not introduce a second classification field such as `lane`, parallel sectioned feeds, or a custom Blog-only layout system.

Information-architecture improvements should therefore be incremental: keep the four category entry points stable, improve tags and post metadata in place, and preserve the chronological stream as the reading backbone.

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

Feature switches should use existing Jekyll/al-folio configuration directly. Do not add a parallel feature-config bridge when `_config.yml` already owns the capability.

## Search

Site search uses the existing maintained al-folio search capability. Do not build a parallel search implementation.

The native `_config.yml` switches enable search and post indexing while leaving social and bibliography search disabled. The native search UI is preferred because it matches the site's runtime visual language without an additional modal, stylesheet, or dependency.

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
