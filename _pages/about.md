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
  .home-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem;
    margin: 1.15rem 0 2.2rem;
    color: var(--global-text-color-light);
    font-size: 0.95rem;
  }
  .home-links a {
    color: var(--global-theme-color);
    font-weight: 600;
    text-decoration: none;
  }
  .home-links a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .home-links span {
    opacity: 0.45;
  }
  .home-focus {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    margin: 1.9rem 0 2.85rem;
    max-width: 48rem;
    border-top: 1px solid var(--global-divider-color);
  }
  .home-focus__item {
    display: grid;
    grid-template-columns: minmax(7.5rem, 0.34fr) 1fr;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--global-divider-color);
  }
  .home-focus__label {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.5;
    font-weight: 700;
    color: var(--global-text-color);
    text-transform: uppercase;
  }
  .home-focus__item p {
    margin-bottom: 0;
    font-size: 0.95rem;
    line-height: 1.62;
    color: var(--global-text-color);
  }
  .home-focus__item p a {
    color: var(--global-theme-color);
    font-weight: 600;
    text-decoration: none;
  }
  .home-focus__item p a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .contact-icons .cv-social-text::before {
    content: 'CV';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25em;
    font-size: 0.82em;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1;
  }
  .contact-icons a[title='Rss icon'] {
    display: none !important;
  }
  .contact-note {
    display: none;
  }
  @media (max-width: 575px) {
    .home-focus__item {
      grid-template-columns: 1fr;
      gap: 0.25rem;
    }
  }
---

<div class="home-intro">
  <p>Throughout my career, I've worked at the intersection of climate, geospatial data, and applied machine learning.</p>
  <p>I build reusable decision tools from climate and geophysical data, with a bias toward workflows that can be reviewed, reproduced, and shipped.</p>
</div>

<div class="home-links" aria-label="Selected links">
  <a href="https://calendar.app.google/UQ267iEs4MTAGFSd7" target="_blank" rel="noopener noreferrer">Book a chat</a>
  <span>/</span>
  <a href="{{ '/portfolio/' | relative_url }}">Market Insights</a>
  <span>/</span>
  <a href="{{ '/cv/' | relative_url }}">CV</a>
</div>

<div class="home-focus">
  <div class="home-focus__item">
    <p class="home-focus__label">Research</p>
    <p>Peer-reviewed work on satellite laser altimetry and snow modeling (2025). High-precision geophysical modeling for remote and harsh environments. See <a href="{{ '/publications/' | relative_url }}">publications</a>.</p>
  </div>
  <div class="home-focus__item">
    <p class="home-focus__label">Climate & Energy</p>
    <p>At the intersection of ML and energy assets: from 4D seismic monitoring for CCUS/Reservoirs to bias correction for climate-energy datasets.</p>
  </div>
  <div class="home-focus__item">
    <p class="home-focus__label">Decision Tools</p>
    <p>Building shippable decision tools: from Bayesian Models to AI Agents, with a focus on reproducibility and production-ready code.</p>
  </div>
</div>
