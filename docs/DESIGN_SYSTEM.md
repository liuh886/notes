# Hao's Notes Design System

Hao's Notes is no longer treated as an al-folio visual variant. The site should now be maintained as an independent personal knowledge site, professional portfolio, and product directory. al-folio remains useful as a Jekyll/runtime layer, but it should not define the site's visual identity or information architecture.

## Design positioning

**Calm, editorial, technical, product-aware.**

The site should feel like a quiet professional workspace: readable, precise, credible, and easy to scan. It should not feel like a loud SaaS landing page, a generic academic template, or a portfolio overloaded with animation.

## Design principles

1. **Content first** — typography, spacing, and hierarchy should make writing and project information easy to read.
2. **One optical system** — Home, Blog, Projects, Repositories, and CV should feel like one site, not theme fragments.
3. **Product-aware, not product-hype** — FlappyK, RhythmCoach, Ownly, and iCal Pro can have product CTAs, but cards should remain restrained.
4. **Local ownership over upstream inheritance** — new visual decisions belong to Hao's Notes, not al-folio defaults.
5. **Accessible by default** — keyboard focus, reduced motion, dark mode, and mobile layout are part of the design system, not afterthoughts.

## Subagent contracts

### Design Systems subagent

Owns the visual language:

- typography scale and line height;
- page width and reading width;
- spacing rhythm;
- card surfaces, borders, radius, and shadows;
- CTA hierarchy;
- focus states;
- dark mode parity.

Deliverables should be expressed through `assets/css/hao-design.css` and this document.

### Frontend Architecture subagent

Owns implementation boundaries:

- keep al-folio as runtime only;
- avoid copying `_layouts`, `_includes`, `_sass`, or upstream assets unless the page is intentionally localized;
- prefer Hao-specific classes and variables over brittle upstream selectors;
- keep `site-polish.css` and `site-upgrade.css` as transitional layers until the design system can absorb them safely;
- document every new layer in the style contract.

### Content / IA subagent

Owns site structure and content clarity:

- Homepage should introduce who Zhihao is, what he builds, and where to go next;
- Repositories should separate products/apps from research code and utility projects;
- Projects should read as a portfolio narrative, not a raw archive;
- Blog should feel editorial and readable;
- CV should remain formal, but visually native to Hao's Notes.

### QA / Performance subagent

Owns guardrails:

- preserve GitHub Pages deploy;
- preserve dark mode;
- preserve mobile layout;
- preserve keyboard focus;
- preserve reduced-motion support;
- prevent native CV scrollbar regressions;
- avoid unbounded visual effects and heavyweight assets;
- expand `test/style_contract.js` when design-system assumptions become important.

## Core tokens

The canonical Hao layer is `assets/css/hao-design.css`. It should define tokens with the `--hao-*` prefix. Existing `--note-*` variables may remain during transition but should not be the long-term source of truth.

Recommended token groups:

```css
--hao-page-max
--hao-reading-max
--hao-radius-sm
--hao-radius-md
--hao-radius-lg
--hao-border-subtle
--hao-surface-base
--hao-surface-soft
--hao-surface-hover
--hao-shadow-card
--hao-shadow-card-hover
--hao-focus-ring
--hao-space-section
--hao-space-card
```

## Page contracts

### Home

Home is the front door. It should answer:

- Who is this person?
- What does he build?
- What should I open next?

It should not be only a CV-like academic about page.

### Blog

Blog is editorial. It should prioritize:

- clear list rhythm;
- readable titles;
- useful summaries;
- tags/categories as navigation aids, not decoration;
- comfortable reading width.

### Projects

Projects are portfolio narratives. Cards should make categories and relevance obvious.

### Repositories

Repositories are product and code entry points. Product/app cards can expose primary CTAs such as `Open app`, `Play game`, or `Open plugin`, while still retaining source-code links.

### CV

CV remains formal. It should be clean, readable, and aligned with the site's visual system. The left navigation must remain scrollable without showing a heavy native scrollbar.

## Migration policy

Do not perform a full rewrite in one PR. Use this sequence:

1. add independent Hao design tokens and contract;
2. migrate repeated visual rules from `site-upgrade.css` into `hao-design.css` when safe;
3. localize page layouts only when a page requires structural control;
4. remove obsolete al-folio-specific overrides after visual parity is confirmed.

## Non-goals

- Do not chase upstream al-folio visual updates.
- Do not migrate to Next.js, Astro, or another framework unless the Jekyll runtime becomes a bottleneck.
- Do not embed separate app builds into the main site unless a future multi-app publishing plan is approved.
- Do not add heavy animation, large JS dependencies, or decorative visual noise.
