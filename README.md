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
- `_plugins/site_visual_polish.rb` injects local presentation layers after theme rendering.
- `assets/css/site-polish.css` contains the established visual polish layer.
- `assets/css/site-upgrade.css` contains newer page-level layout and performance refinements.
- `.github/workflows/deploy.yml` builds and deploys the site through GitHub Pages.

## Local development

```bash
bundle install
npm ci
bundle exec jekyll serve
```

Then open the local Jekyll URL shown in the terminal.

## Verification

Use these checks before opening or merging visual/layout changes:

```bash
npm run lint:style-contract
npx prettier --check README.md assets/css/site-upgrade.css .github/workflows/deploy.yml test/style_contract.js
ruby -c _plugins/site_visual_polish.rb
bundle exec jekyll build
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
