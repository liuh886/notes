---
layout: about
title: about
permalink: /
subtitle: Climate & Energy Data Scientist

profile:
  align: right
  image: blog_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>📍Offshore Bergen, 2020 Aug</p>

news: true # includes a list of news items
latest_posts: false # recent blog
selected_papers: true # includes a list of papers marked as "selected={true}"
projects: false # includes projects
display_categories: [work] # Projects show in about page
social: true # includes social icons at the bottom of the page
home_cta: true
---

Throughout my career, I've worked at the intersection of climate, geospatial data, and applied machine learning.
I build reusable decision tools from climate and geophysical data, with a bias toward workflows that can be reviewed, reproduced, and shipped.

<div class="home-proof">
  <div class="home-proof__item" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; transition: transform 0.2s ease;">
    <h2 style="color: #B509AC; font-size: 1.25rem;"><i class="fas fa-graduation-cap"></i> Research Credibility</h2>
    <p style="font-size: 0.95rem; line-height: 1.6;">Peer-reviewed work on snow distribution from satellite laser altimetry (2025). See <a href="{{ '/publications/' | relative_url }}" style="color: #B509AC; font-weight: 600;">publications</a>.</p>
  </div>
  <div class="home-proof__item" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; transition: transform 0.2s ease;">
    <h2 style="color: #B509AC; font-size: 1.25rem;"><i class="fas fa-globe-europe"></i> Climate Relevance</h2>
    <p style="font-size: 0.95rem; line-height: 1.6;">Bias correction and spatial downscaling for climate and energy datasets, with uncertainty-aware evaluation.</p>
  </div>
  <div class="home-proof__item" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; transition: transform 0.2s ease;">
    <h2 style="color: #B509AC; font-size: 1.25rem;"><i class="fas fa-rocket"></i> Shipping Ability</h2>
    <p style="font-size: 0.95rem; line-height: 1.6;">Real-time estimation prototype: Unscented Kalman Filter + FastAPI + PostgreSQL, designed for B2B decision tooling.</p>
  </div>
</div>

<style>
.home-proof {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.home-proof__item:hover {
  transform: translateY(-5px);
  border-color: #B509AC !important;
}
</style>
