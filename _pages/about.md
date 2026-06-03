---
layout: about
title: about
permalink: /
subtitle: Climate & Energy Data Scientist
subtitle_extra: "Caixin ESG30 Young Scholar"

profile:
  align: right
  image: blog_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>📍Offshore Bergen, 2020 Aug</p>

news: true # includes a list of news items
announcements:
  enabled: true
  scrollable: false
  limit: 4

latest_posts:
  enabled: false
  scrollable: true
  limit: 4

selected_papers: true # includes a list of papers marked as "selected={true}"
projects: false # includes projects
display_categories: [work] # Projects show in about page
social: true # includes social icons at the bottom of the page
home_cta: true
_styles: >
  .home-proof {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin: 2.5rem 0 3.5rem;
  }
  @media (min-width: 768px) {
    .home-proof {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto auto;
    }
  }
  .home-proof__item {
    padding: 1.75rem 1.5rem;
    border: 1px solid var(--global-divider-color);
    background: var(--global-bg-color);
    border-radius: 8px;
    position: relative;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .home-proof__item:hover {
    border-color: var(--global-theme-color);
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  }
  @media (min-width: 768px) {
    .home-proof__item--large {
      grid-column: span 2;
      grid-row: span 2;
      padding: 2.25rem 2rem;
    }
  }
  .home-proof .data-tag {
    font-family: "JetBrains Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--global-theme-color);
    margin-bottom: 1.25rem;
    display: inline-block;
    padding: 0.25rem 0.6rem;
    background: color-mix(in srgb, var(--global-theme-color) 8%, transparent);
    border-radius: 4px;
    width: fit-content;
    border: 1px solid color-mix(in srgb, var(--global-theme-color) 15%, transparent);
  }
  .home-proof__item h2 {
    font-size: 1.35rem;
    margin: 0 0 1rem 0;
    color: var(--global-text-color);
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 700;
  }
  .home-proof__item h2 i {
    font-size: 1.15rem;
    color: var(--global-theme-color);
  }
  .home-proof__item p {
    margin-bottom: 0;
    font-size: 1rem;
    line-height: 1.65;
    color: var(--global-text-color);
    opacity: 0.92;
  }
  .home-proof__item p a {
    color: var(--global-theme-color);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  html[data-theme='dark'] .home-proof__item {
    background: var(--global-card-bg-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
---

Throughout my career, I've worked at the intersection of climate, geospatial data, and applied machine learning.
I build reusable decision tools from climate and geophysical data, with a bias toward workflows that can be reviewed, reproduced, and shipped.

<div class="home-proof">
  <div class="home-proof__item home-proof__item--large">
    <span class="data-tag">CORE PILLAR 01</span>
    <h2><i class="fa-solid fa-graduation-cap"></i> Research Credibility</h2>
    <p>Peer-reviewed work on satellite laser altimetry and snow modeling (2025). High-precision geophysical modeling for remote and harsh environments. See <a href="{{ '/publications/' | relative_url }}">publications</a>.</p>
  </div>
  <div class="home-proof__item">
    <span class="data-tag">CORE PILLAR 02</span>
    <h2><i class="fa-solid fa-bolt"></i> Climate & Energy</h2>
    <p>At the intersection of ML and energy assets: from 4D seismic monitoring for CCUS/Reservoirs to bias correction for climate-energy datasets.</p>
  </div>
  <div class="home-proof__item">
    <span class="data-tag">CORE PILLAR 03</span>
    <h2><i class="fa-solid fa-rocket"></i> Shipping Ability</h2>
    <p>Building shippable decision tools: from Bayesian Models to AI Agents, with a focus on reproducibility and production-ready code.</p>
  </div>
</div>
