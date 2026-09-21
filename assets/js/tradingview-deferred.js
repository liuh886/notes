/*
 * Deferred TradingView embeds.
 *
 * The portfolio page ships every widget twice, once per colour theme, and the
 * analysis widget once per symbol. Only one of those variants is ever visible
 * at a time (the stylesheet hides the others, and inactive analysis panels are
 * `display: none`), so loading all of them costs one third-party request per
 * hidden variant.
 *
 * Every embed is therefore authored as `<script type="text/tradingview" data-src="...">`
 * with its JSON body intact. This script promotes a pending embed to a real
 * script only while its container is visible, and re-checks when the colour
 * theme changes or another analysis tab is selected.
 *
 * Without JavaScript no widget renders; TradingView's own embeds require
 * JavaScript regardless, so nothing regresses for those users.
 */
(function () {
  "use strict";

  var PENDING = 'script[type="text/tradingview"]';

  var isVisible = function (element) {
    // A <script> element is display:none itself, so the walk has to start at the
    // widget container that decides whether this variant is on screen.
    var container = element.closest(".tradingview-widget-container") || element.parentElement;
    for (var node = container; node && node !== document.documentElement; node = node.parentElement) {
      var style = window.getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden") return false;
    }
    return true;
  };

  var promote = function (pending) {
    var source = pending.getAttribute("data-src");
    if (!source) return;

    // TradingView's loader reads its own JSON body from `document.currentScript`,
    // so the promoted element has to carry the same text content.
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.textContent = pending.textContent;
    script.src = source;

    pending.setAttribute("data-promoted", "true");
    pending.parentNode.insertBefore(script, pending.nextSibling);
  };

  var loadVisible = function () {
    var pending = document.querySelectorAll(PENDING + ":not([data-promoted])");
    for (var i = 0; i < pending.length; i++) {
      if (isVisible(pending[i])) promote(pending[i]);
    }
  };

  var start = function () {
    loadVisible();

    new MutationObserver(loadVisible).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // The analysis tabs toggle `.is-active` on their panels.
    document.addEventListener("click", function (event) {
      if (event.target.closest && event.target.closest(".stock-analysis__selector")) {
        window.setTimeout(loadVisible, 0);
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
