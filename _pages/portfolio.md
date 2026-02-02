---
layout: page
permalink: /portfolio/
title: Portfolio
description: Experiments and dashboards (not primary focus).
nav: false
nav_order: 5
---

## Market pulse

{% include stocks/ticker-tape.html %}

{% include stocks/widget.html %}

## Market highlights

<div class="portfolio-widgets">
  <div class="portfolio-widgets__top-stories">
    {% include stocks/top-stories.html %}
  </div>
  <div class="portfolio-widgets__analysis">
    {% include stocks/technical-analysis.html %}
  </div>
</div>
