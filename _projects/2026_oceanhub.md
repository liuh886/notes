---
layout: page
title: OceanHub
description: A partner-facing offshore energy and marine intelligence portal, with a reproducible content + deck pipeline.
img: assets/img/oceanhub-logo.png
importance: 0
year: 2025-2026
category: work
---

> **TL;DR**
> - **Problem:** Offshore projects often have fragmented stakeholders, unclear narratives, and slow partner onboarding.
> - **Data:** Markdown-first focus areas and insights, maintained as a structured content collection.
> - **Method:** Astro + Tailwind site with typed content collections; automated partner deck generation from source content.
> - **Output:** A live platform-style portal plus a reusable partner introduction deck pipeline.
> - **Impact:** Faster alignment across ecosystem partners and a repeatable workflow to publish updates consistently.
> - **Links:** [Open OceanHub](https://liuh886.github.io/OceanHub/) · [Source code](https://github.com/liuh886/OceanHub) · [SBGf Rio 25 reference](https://rio25.sbgf.org.br/Pages/oceanHub.php)

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <a href="https://liuh886.github.io/OceanHub/" target="_blank" class="btn btn-primary w-100">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open OceanHub
        </a>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <a href="https://github.com/liuh886/OceanHub" target="_blank" class="btn btn-outline-secondary w-100">
            <i class="fa-brands fa-github"></i> View Source Code
        </a>
    </div>
</div>

<br>

## What I built

OceanHub is a platform-style portal designed to align clients and ecosystem partners around offshore energy, monitoring, and marine intelligence.

Key components:
- **Partner-facing homepage:** platform tone and CTAs ("Explore Focus Areas", "Propose a Collaboration").
- **Content system:** Focus Areas + Insights authored in Markdown and surfaced as routes (content collections).
- **Reusable partner collateral:** a Markdown/HTML -> PPTX pipeline to generate a partner deck from source files, so the story stays consistent across web and slides.

## How it was implemented (high level)

- **Frontend:** Astro (static-first) + Tailwind CSS, with React used only where needed.
- **Content model:** type-safe content collections under `src/content/` (Focus Areas, Insights, Case Studies).
- **Deck pipeline:** scripts that transform curated narrative into a partner deck artifact (PPTX) for repeatable partner onboarding.
