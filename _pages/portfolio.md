---
layout: page
permalink: /portfolio/
title: portfolio
description: A collection of my favorite stocks.
nav: true
nav_order: 5
---

## Market watchlist

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

## Market pulse

{% include stocks/ticker-tape.html %}
