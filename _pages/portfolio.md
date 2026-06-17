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

- **Energy Economics:** The interplay between fossil fuel prices and renewable energy indices.
- **Macro Trends:** Global indicators that influence climate policy and infrastructure investment.
- **Data Patterns:** Observing real-time stochastic processes and market sentiment.

---

## Market pulse

{% assign stocks = site.data.stocks %}
{% assign stock_symbols = stocks.symbols | default: '' | split: ',' %}
{% if stocks.symbols and stocks.symbols.size > 0 %}
{% assign stock_symbols = stocks.symbols %}
{% endif %}

<div class="stock-widget my-4 stock-widget--ticker">
  <div class="tradingview-widget-container stock-widget-light">
    <div class="tradingview-widget-container__widget"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
      {
        "symbols": [
          {% for symbol in stock_symbols %}
            {
              "proName": "{{ symbol | escape }}",
              "title": "{{ symbol | split: ':' | last }}"
            }{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ],
        "showSymbolLogo": true,
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "regular",
        "locale": "{{ stocks.locale | default: site.lang | default: 'en' }}"
      }
    </script>
  </div>

  <div class="tradingview-widget-container stock-widget-dark">
    <div class="tradingview-widget-container__widget"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
      {
        "symbols": [
          {% for symbol in stock_symbols %}
            {
              "proName": "{{ symbol | escape }}",
              "title": "{{ symbol | split: ':' | last }}"
            }{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": false,
        "displayMode": "regular",
        "locale": "{{ stocks.locale | default: site.lang | default: 'en' }}"
      }
    </script>
  </div>
</div>

<div class="stock-widget stock-widget--overview my-4">
  <div class="tradingview-widget-container stock-widget-light">
    <div class="tradingview-widget-container__widget"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js" async>
      {
        "symbols": [
          {% for symbol in stock_symbols %}["{{ symbol | escape }}"]{% unless forloop.last %},{% endunless %}{% endfor %}
        ],
        "chartOnly": false,
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "colorTheme": "light",
        "locale": "{{ stocks.locale | default: site.lang | default: 'en' }}",
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
        "fontSize": "12",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "lineWidth": 2,
        "dateRanges": ["1d|1","1m|30","3m|60","1y|1D","5y|1W","all|1M"]
      }
    </script>
  </div>

  <div class="tradingview-widget-container stock-widget-dark">
    <div class="tradingview-widget-container__widget"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js" async>
      {
        "symbols": [
          {% for symbol in stock_symbols %}["{{ symbol | escape }}"]{% unless forloop.last %},{% endunless %}{% endfor %}
        ],
        "chartOnly": false,
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "colorTheme": "dark",
        "locale": "{{ stocks.locale | default: site.lang | default: 'en' }}",
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
        "fontSize": "12",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "lineWidth": 2,
        "dateRanges": ["1d|1","1m|30","3m|60","1y|1D","5y|1W","all|1M"]
      }
    </script>
  </div>
</div>

## Market highlights

<div class="portfolio-widgets">
  <div class="portfolio-widgets__top-stories">
    <div class="stock-widget my-4">
      <div class="tradingview-widget-container stock-widget-light stock-widget--story">
        <div class="tradingview-widget-container__widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
          {
            "feedMode": "all_symbols",
            "isTransparent": false,
            "displayMode": "regular",
            "width": "100%",
            "height": "480",
            "colorTheme": "light",
            "locale": "{{ stocks.locale | default: site.lang | default: 'en' }}"
          }
        </script>
      </div>

      <div class="tradingview-widget-container stock-widget-dark stock-widget--story">
        <div class="tradingview-widget-container__widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
          {
            "feedMode": "all_symbols",
            "isTransparent": false,
            "displayMode": "regular",
            "width": "100%",
            "height": "480",
            "colorTheme": "dark",
            "locale": "{{ stocks.locale | default: site.lang | default: 'en' }}"
          }
        </script>
      </div>
    </div>

  </div>
  <div class="portfolio-widgets__analysis">
    {% assign default_symbol = stock_symbols | first | default: 'NASDAQ:AAPL' %}
    {% assign widget_id = 'analysis-' | append: page.url | slugify %}

    <div class="stock-widget my-4">
      <div class="stock-analysis__selector" data-analysis-tabs="{{ widget_id }}">
        <span class="stock-analysis__label">Analyze</span>
        <div class="stock-analysis__buttons">
          {% for symbol in stock_symbols %}
            <button class="stock-analysis__pill{% if symbol == default_symbol %} is-active{% endif %}" type="button" data-symbol="{{ symbol | escape }}">
              {{ symbol | split: ':' | last }}
            </button>
          {% endfor %}
        </div>
      </div>

      <div class="stock-analysis" data-analysis-panels="{{ widget_id }}">
        {% for symbol in stock_symbols %}
          <div class="stock-analysis__panel{% if symbol == default_symbol %} is-active{% endif %}" data-analysis-panel="{{ widget_id }}" data-symbol="{{ symbol | escape }}">
            <div class="tradingview-widget-container stock-widget-light stock-widget--analysis">
              <div class="tradingview-widget-container__widget"></div>
              <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
                {
                  "interval": "1D",
                  "width": "100%",
                  "isTransparent": false,
                  "height": "480",
                  "symbol": "{{ symbol | escape }}",
                  "showIntervalTabs": true,
                  "displayMode": "single",
                  "colorTheme": "light",
                  "locale": "{{ stocks.locale | default: site.lang | default: 'en' }}"
                }
              </script>
            </div>

            <div class="tradingview-widget-container stock-widget-dark stock-widget--analysis">
              <div class="tradingview-widget-container__widget"></div>
              <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
                {
                  "interval": "1D",
                  "width": "100%",
                  "isTransparent": false,
                  "height": "480",
                  "symbol": "{{ symbol | escape }}",
                  "showIntervalTabs": true,
                  "displayMode": "single",
                  "colorTheme": "dark",
                  "locale": "{{ stocks.locale | default: site.lang | default: 'en' }}"
                }
              </script>
            </div>
          </div>
        {% endfor %}
      </div>
    </div>

  </div>
</div>

<script>
  (function () {
    var tabs = document.querySelector('[data-analysis-tabs="{{ widget_id }}"]');
    var panels = document.querySelectorAll('[data-analysis-panel="{{ widget_id }}"]');

    if (!tabs || panels.length === 0) {
      return;
    }

    var buttons = tabs.querySelectorAll('[data-symbol]');

    function setActiveSymbol(symbol) {
      buttons.forEach(function (button) {
        button.classList.toggle('is-active', button.getAttribute('data-symbol') === symbol);
      });

      panels.forEach(function (panel) {
        panel.classList.toggle('is-active', panel.getAttribute('data-symbol') === symbol);
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        setActiveSymbol(button.getAttribute('data-symbol'));
      });
    });
  })();
</script>
