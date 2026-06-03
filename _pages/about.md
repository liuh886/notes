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
social: true # rendered from _data/socials.yml
home_cta: true
_styles: >
  .home-intro {
    max-width: 42rem;
  }
  .home-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1.5rem 0 2rem;
  }
  .home-actions a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 8px;
    padding: 0.58rem 0.9rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid var(--global-divider-color);
    color: var(--global-text-color);
    background: var(--global-bg-color);
  }
  .home-actions a:first-child {
    border-color: var(--global-theme-color);
    color: var(--global-theme-color);
  }
  .home-actions a:hover {
    border-color: var(--global-theme-color);
    color: var(--global-theme-color);
  }
  .home-proof {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.85rem;
    margin: 2.1rem 0 2.75rem;
  }
  @media (min-width: 768px) {
    .home-proof {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .home-proof__item {
    padding: 1.2rem 1.1rem;
    border: 1px solid var(--global-divider-color);
    background: var(--global-bg-color);
    border-radius: 8px;
    position: relative;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
  }
  .home-proof__item:hover {
    border-color: var(--global-theme-color);
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.055);
  }
  .home-proof__item h2 {
    font-size: 1.05rem;
    margin: 0 0 0.55rem 0;
    color: var(--global-text-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 650;
  }
  .home-proof__item h2 i {
    font-size: 0.9rem;
    color: var(--global-theme-color);
    width: 1rem;
    text-align: center;
  }
  .home-proof__item p {
    margin-bottom: 0;
    font-size: 0.95rem;
    line-height: 1.58;
    color: var(--global-text-color);
    opacity: 0.86;
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

<div class="home-intro">
  <p>Throughout my career, I've worked at the intersection of climate, geospatial data, and applied machine learning.</p>
  <p>I build reusable decision tools from climate and geophysical data, with a bias toward workflows that can be reviewed, reproduced, and shipped.</p>
</div>

<div class="home-actions">
  <a href="https://calendar.app.google/UQ267iEs4MTAGFSd7" target="_blank" rel="noopener noreferrer"><i class="fa-regular fa-calendar"></i> Book a chat</a>
  <a href="{{ '/projects/' | relative_url }}"><i class="fa-solid fa-diagram-project"></i> Portfolio</a>
</div>

<div class="home-proof">
  <div class="home-proof__item">
    <h2><i class="fa-solid fa-graduation-cap"></i> Research Credibility</h2>
    <p>Peer-reviewed work on satellite laser altimetry and snow modeling (2025). High-precision geophysical modeling for remote and harsh environments. See <a href="{{ '/publications/' | relative_url }}">publications</a>.</p>
  </div>
  <div class="home-proof__item">
    <h2><i class="fa-solid fa-bolt"></i> Climate & Energy</h2>
    <p>At the intersection of ML and energy assets: from 4D seismic monitoring for CCUS/Reservoirs to bias correction for climate-energy datasets.</p>
  </div>
  <div class="home-proof__item">
    <h2><i class="fa-solid fa-rocket"></i> Shipping Ability</h2>
    <p>Building shippable decision tools: from Bayesian Models to AI Agents, with a focus on reproducibility and production-ready code.</p>
  </div>
</div>
