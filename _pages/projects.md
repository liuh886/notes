---
layout: page
title: Projects
nav_title: projects
permalink: /projects/
description: Selected projects in climate, energy, and offshore decision tooling.
nav: true
nav_order: 2
year_categories: [2025-2026, 2023-2024, 2022, 2019-2020] # Projects show in project page
horizontal: false
---

<!-- pages/projects.md -->

<div class="projects-intro">
  <p class="projects-intro__lede">
    I build decision tools from climate/energy and offshore data — from governance frameworks to shippable artifacts.
  </p>

  <div class="tracks">
    <div class="track card hoverable">
      <div class="card-body">
        <h2 class="track__title">Trust &amp; MRV</h2>
        <p class="track__desc">Turn “regulator/finance trust” into auditable data, disclosure, and governance design.</p>
        <div class="track__chips">
          <a class="chip" href="{{ '/projects/2026_ccus_dmrv/' | relative_url }}">CCUS dMRV</a>
        </div>
      </div>
    </div>

    <div class="track card hoverable">
      <div class="card-body">
        <h2 class="track__title">Platform Narrative &amp; Content Ops</h2>
        <p class="track__desc">Build partner-facing portals where the story stays consistent across web + decks.</p>
        <div class="track__chips">
          <a class="chip" href="{{ '/projects/2026_oceanhub/' | relative_url }}">OceanHub</a>
        </div>
      </div>
    </div>

    <div class="track card hoverable">
      <div class="card-body">
        <h2 class="track__title">Knowledge Product</h2>
        <p class="track__desc">Package domain know-how into searchable hubs that accelerate screening and onboarding.</p>
        <div class="track__chips">
          <a class="chip" href="{{ '/projects/2025_4d_seismic/' | relative_url }}">4D Seismic Hub</a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="projects">
{%- if site.enable_project_categories and page.year_categories %}
  <!-- Display categorized projects -->
  {%- for year in page.year_categories %}
  <h2 class="category">{{ year }}</h2>
  {%- assign categorized_projects = site.projects | where: "year", year -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}

<!-- Display projects without categories -->

{%- assign sorted_projects = site.projects | sort: "importance" -%}

  <!-- Generate cards for each project -->

{% if page.horizontal -%}

  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>

---
