---
layout: page
permalink: /portfolio/
title: Market Insights
description: Time-series observations on Energy, Tech, and Macroeconomics.
nav: false
nav_order: 5
---

While my primary work focuses on physical climate data, I maintain a keen interest in **financial time-series analysis**, particularly within the energy and technology sectors.

Understanding market volatility and correlations is crucial for the energy transition. This dashboard serves as a sandbox where I monitor:
*   **Energy Economics:** The interplay between fossil fuel prices and renewable energy indices.
*   **Macro Trends:** Global indicators that influence climate policy and infrastructure investment.
*   **Data Patterns:** Observing real-time stochastic processes and market sentiment.

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
