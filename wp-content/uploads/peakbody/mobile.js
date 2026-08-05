
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // Cosma's custom.js owns mobile open/close (.menu-trigger, .mobile-menu,
    // .mobile-menu-overlay, body.nav-is-visible). Do not intercept those clicks.

    // Ensure mobile panel sits above overlays so links remain clickable.
    try {
      var style = document.createElement("style");
      style.textContent =
        ".mobile-menu.nav-is-visible{z-index:100050!important;pointer-events:auto!important}" +
        ".mobile-menu.nav-is-visible a{pointer-events:auto!important;position:relative;z-index:2}" +
        ".mobile-menu-overlay.is-visible{z-index:100040!important}" +
        "body.nav-is-visible{overflow:hidden}";
      document.head.appendChild(style);
    } catch (e) {}

    // Elementor entrance animations fallback (static mirror)
    try {
      var els = document.querySelectorAll(".elementor-invisible");
      if (els.length && "IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (en) {
              if (!en.isIntersecting) return;
              var el = en.target;
              el.classList.remove("elementor-invisible");
              var settings = el.getAttribute("data-settings") || "";
              var m = settings.match(/"(_)?animation"\s*:\s*"([^"]+)"/);
              var name = m ? m[2] : "fadeInUp";
              var d = settings.match(/"(_)?animation_delay"\s*:\s*(\d+)/);
              el.style.animationDelay = (d ? d[2] : 0) + "ms";
              el.classList.add("animated", name);
              io.unobserve(el);
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
        );
        els.forEach(function (el) {
          io.observe(el);
        });
      }
    } catch (err) {}
  });
})();
