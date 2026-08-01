# Hao's Notes Redesign Roadmap

This roadmap turns Hao's Notes from an al-folio-styled academic site into an independent personal knowledge site and product-aware portfolio.

## Current state

- al-folio remains the Jekyll runtime and plugin base.
- `site-polish.css` contains earlier visual fixes.
- `site-upgrade.css` contains the first modern visual-system pass, product repository CTAs, CV scrollbar removal, and performance/accessibility refinements.
- `hao-design.css` is the new design-system foundation layer and should become the long-term local visual contract.

## Workstream A — Design Systems subagent

### A1. Foundation

- Add design positioning and contracts.
- Define `--hao-*` design tokens.
- Establish page-width, card, CTA, focus, and CV sidebar rules.

### A2. Consolidation

- Audit `site-polish.css` and `site-upgrade.css`.
- Move stable repeated patterns into `hao-design.css`.
- Keep only legacy compatibility shims in older files.

### A3. Finalization

- Produce one clear public style guide for future agents.
- Remove obsolete token duplication after pages are visually verified.

## Workstream B — Frontend Architecture subagent

### B1. Runtime boundary

- Keep al-folio as a runtime and plugin system.
- Avoid upstream chasing.
- Do not copy theme internals unless a page must become locally owned.

### B2. Local page ownership

Prioritize pages in this order:

1. Repositories
2. Homepage
3. Blog
4. Projects
5. CV

For each page, decide whether CSS-only control is enough or whether a local layout/component should be introduced.

### B3. Contract testing

- Expand `test/style_contract.js` for design-system invariants.
- Guard against missing `hao-design.css` injection.
- Guard against visible CV sidebar scrollbar regressions.
- Guard against deleting reduced-motion and focus rules.

## Workstream C — Content / IA subagent

### C1. Homepage

Reframe homepage around:

- professional identity;
- key domains: climate/energy data, geospatial ML, CCUS/dMRV, offshore/geophysics, agent-native tools;
- featured products/projects;
- latest writing.

### C2. Repositories

Group repositories into:

- Products & Apps: FlappyK, RhythmCoach, Ownly, iCal Pro;
- Agent & Knowledge Tools: Ductor, Obsidian gateway, GhostCam;
- Climate / Energy / Geoscience: CCUS Policy Hub, 4D Seismic Hub, Ice Block Expedition;
- Teaching / Archive: GEO4300, Open Phrasebank, older experiments.

### C3. Projects

Make projects read as a portfolio:

- what problem each project solves;
- why it matters;
- what the user can open or learn;
- how it connects to the overall identity.

### C4. Blog

Make the blog feel editorial:

- clearer category navigation;
- better summary rhythm;
- improved reading width;
- stronger distinction between essays, notes, release posts, and technical logs.

## Workstream D — QA / Performance subagent

### D1. Required checks

Every design PR should verify:

- GitHub Pages build;
- `npm run lint:style-contract`;
- `ruby -c _plugins/site_visual_polish.rb`;
- dark mode smoke check;
- mobile viewport smoke check;
- `/`, `/blog/`, `/projects/`, `/repositories/`, `/cv/` manual review.

### D2. Performance and accessibility

Preserve:

- `content-visibility: auto` for long card lists;
- reduced motion fallbacks;
- visible keyboard focus states;
- lazy-loaded external cards/images;
- no heavyweight animation frameworks.

## Proposed PR sequence

### PR A — redesign foundation

- Add `DESIGN_SYSTEM.md`.
- Add this roadmap.
- Add `hao-design.css`.
- Inject `hao-design.css` after existing layers.
- Extend style contract checks.

### PR B — repositories as product directory

- Split `/repositories/` into explicit groups.
- Promote products/apps as first-class cards.
- Preserve GitHub stats fallback.

### PR C — homepage as front door

- Rewrite homepage structure.
- Add featured work section.
- Add product/project entry points.

### PR D — blog/projects editorial pass

- Improve blog index and post reading system.
- Rebalance project grouping and card summaries.

### PR E — CV page ownership

- Modernize the CV page inside the Hao design system.
- Keep printable/exported CV unaffected.

## Decision log

- 2026-08-01: Freeze al-folio as visual source of truth. al-folio remains runtime only.
- 2026-08-01: Keep product vanity URLs as safe redirects, not embedded multi-app publishing.
- 2026-08-01: Use incremental PRs; avoid a full framework migration.
