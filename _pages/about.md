---
layout: about
title: About
permalink: /
nav_order: 0
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
---

<style id="home-page-polish">
  .home-intro {
    max-width: 42rem;
  }

  .home-intro p {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.72;
    color: var(--global-text-color);
  }

  .home-intro a {
    color: var(--global-theme-color);
    font-weight: 600;
    text-decoration: none;
  }

  .home-intro a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .contact-icons a[title="Rss icon"] {
    display: none !important;
  }

  .social {
    margin-top: 2.25rem;
  }

  .contact-note {
    display: block;
    margin-top: 0.75rem;
  }

  .home-social-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    margin-top: 1rem;
  }

  .home-social-cta__primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.35rem;
    padding: 0.54rem 1rem;
    border: 1px solid var(--global-theme-color);
    border-radius: 8px;
    color: var(--global-theme-color);
    font-weight: 650;
    text-decoration: none;
    line-height: 1;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .home-social-cta__primary:hover {
    color: var(--global-bg-color);
    background: var(--global-theme-color);
    text-decoration: none;
    transform: translateY(-1px);
  }

  .home-social-cta__secondary {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.45rem;
    color: var(--global-text-color-light);
    font-size: 0.9rem;
  }

  .home-social-cta__secondary a {
    color: var(--global-text-color);
    opacity: 0.78;
    text-decoration: none;
  }

  .home-social-cta__secondary a:hover {
    color: var(--global-theme-color);
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .home-social-cta__secondary span {
    opacity: 0.42;
  }

  @media (max-width: 575px) {
    .home-social-cta__primary {
      width: min(100%, 16rem);
    }
  }
</style>

<div class="home-intro">
  <p>I work with climate, geospatial, and energy-system data, with a particular interest in how research-grade models can become tools that people can inspect, reproduce, and use in real decisions.</p>
  <p>My recent work connects remote sensing, snow and climate-data downscaling, CCUS MRV, and 4D seismic monitoring. I care less about isolated demos and more about the full path from messy scientific data to a workflow that is technically credible, auditable, and useful outside a notebook.</p>
  <p>This site is where I keep notes, projects, publications, and selected engineering work across climate data science, geophysical monitoring, Bayesian modeling, and applied machine learning. You can find formal research outputs in <a href="{{ '/publications/' | relative_url }}">publications</a>, code and tools in <a href="{{ '/repositories/' | relative_url }}">repositories</a>, and working notes on the <a href="{{ '/blog/' | relative_url }}">blog</a>.</p>
</div>
