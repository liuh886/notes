# Hao's Notes

[![deploy](https://github.com/liuh886/notes/actions/workflows/deploy.yml/badge.svg)](https://github.com/liuh886/notes/actions/workflows/deploy.yml)

Personal website and public knowledge base for **Zhihao Liu**.

This site presents research, projects, working notes, and selected open-source tools around climate and energy data science, geospatial machine learning, CCUS monitoring, offshore geophysics, and agent-native workflows.

## Site structure

- **About** — concise professional positioning and selected publications.
- **Blog** — working notes, research updates, field notes, and technical write-ups.
- **Projects** — curated project narratives grouped by period.
- **Repositories** — selected GitHub projects with lightweight metadata cards.
- **CV** — public CV rendered from the al-folio CV pipeline.

## Technical stack

The site is built with Jekyll and the al-folio runtime, with local customizations kept intentionally thin:

- `_config.yml` owns site identity, routing, analytics, and plugin configuration.
- `_plugins/site_visual_polish.rb` injects local presentation layers and per-page runtimes after theme rendering.
- `assets/css/*.css` holds one scoped stylesheet per customized surface (see `docs/DESIGN_SYSTEM.md` for the ownership list).
- `.github/workflows/deploy.yml` builds, verifies, and deploys the site through GitHub Pages.

Theme files (`_includes/`, `_layouts/`, `_sass/`, `assets/tailwind/`) are provided by the `al_folio_core` and `al_*` gems and must not be forked into this repository; `test/style_contract.js` enforces that boundary.

## Local development

```bash
bundle install
npm ci
bundle exec jekyll serve
```

Then open the local Jekyll URL shown in the terminal.

On Windows, `bundle install` needs a working Ruby 3.3 install; if none is available, the Docker path (`docker compose up`) or CI is the supported alternative.

## Verification

Use these checks before opening or merging visual/layout changes:

```bash
npm run lint:style-contract
npx prettier --check test/style_contract.js
ruby -c _plugins/site_visual_polish.rb
bundle exec jekyll build
node test/performance_budget.js _site
```

`test/design` holds browser assertions for the things that cannot be reviewed by
reading CSS (shell geometry, colour tokens in both themes, reduced motion, focus,
and sideways scrolling). CI serves the fresh build over localhost and runs them;
locally you can point them at any deployed site:

```bash
DESIGN_BASE_URL=https://zhihaol.eu.org npx playwright test --config test/design/playwright.config.js
```

For visual changes, manually check at least:

- `/`
- `/blog/`
- `/projects/`
- `/repositories/`
- `/cv/`

## Deployment

Merges to `master` trigger the `deploy` workflow. Pull requests run the build and verification path but do not deploy to GitHub Pages.

![site preview](https://i.imgur.com/9gwqfdz.png)
