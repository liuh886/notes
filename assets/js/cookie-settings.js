/*
 * Cookie settings control.
 *
 * The consent dialog is shown once and the choice is stored, after which the
 * theme offers no way back into it. The footer control that this script wires
 * up calls `CookieConsent.showPreferences()` so withdrawing consent is as easy
 * as giving it.
 *
 * The button is real markup (see `_plugins/site_visual_polish.rb`), so it stays
 * keyboard accessible and visible without JavaScript; this only adds the
 * behaviour.
 */
(function () {
  "use strict";

  var SELECTOR = "[data-hao-cookie-settings]";
  var RETRY_INTERVAL_MS = 100;
  var MAX_RETRIES = 50;

  var open = function () {
    var consent = window.CookieConsent;
    if (!consent || typeof consent.showPreferences !== "function") return false;
    consent.showPreferences();
    return true;
  };

  var openWhenReady = function () {
    if (open()) return;

    // The consent library may still be loading, or blocked. Retry briefly and
    // then give up rather than leaving a listener spinning forever.
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (open() || attempts >= MAX_RETRIES) window.clearInterval(timer);
    }, RETRY_INTERVAL_MS);
  };

  var wire = function () {
    var controls = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < controls.length; i += 1) {
      controls[i].addEventListener("click", function (event) {
        event.preventDefault();
        openWhenReady();
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
