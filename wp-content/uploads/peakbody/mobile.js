
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function prefersReducedMotion() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  function scrollToTop(instant) {
    var behavior = instant || prefersReducedMotion() ? "auto" : "smooth";
    try {
      window.scrollTo({ top: 0, left: 0, behavior: behavior });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }

  // Always land at top on fresh navigation (fixes mid-page restores / BFCache quirks)
  try {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  } catch (e) {}

  ready(function () {
    scrollToTop(true);

    // Cosma owns .menu-trigger / .mobile-menu open-close — enhance only.
    try {
      var style = document.createElement("style");
      style.textContent =
        ".mobile-menu.nav-is-visible{z-index:100050!important;pointer-events:auto!important}" +
        ".mobile-menu.nav-is-visible a{pointer-events:auto!important;position:relative;z-index:2}" +
        ".mobile-menu-overlay.is-visible{z-index:100040!important}" +
        "body.nav-is-visible{overflow:hidden}";
      document.head.appendChild(style);
    } catch (e) {}

    // Escape closes mobile nav; focus first link when opened
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!document.body.classList.contains("nav-is-visible")) return;
      var closeBtn = document.querySelector(".mobile-menu.nav-is-visible li.close-nav");
      if (closeBtn) closeBtn.click();
      else {
        document.body.classList.remove("nav-is-visible");
        document.querySelectorAll(".mobile-menu").forEach(function (m) {
          m.classList.remove("nav-is-visible");
        });
        document.querySelectorAll(".mobile-menu-overlay").forEach(function (o) {
          o.classList.remove("is-visible");
        });
      }
    });

    // When a nav link is followed, jump to top of the next page immediately
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target.closest(
          ".dt-primary-nav a, .mobile-menu a, .dt-logo-container a"
        );
        if (!a) return;
        var href = a.getAttribute("href") || "";
        if (!href || href.indexOf("#") === 0 || href.indexOf("javascript:") === 0)
          return;
        // Same-page hash: smooth scroll handled by CSS; leave alone
        try {
          var url = new URL(a.href, window.location.href);
          if (url.pathname === window.location.pathname && url.hash) return;
        } catch (err) {}
        // Mark intent so pageshow/load keep top
        try {
          sessionStorage.setItem("pb-scroll-top", "1");
        } catch (err2) {}
      },
      true
    );

    window.addEventListener("pageshow", function () {
      try {
        if (sessionStorage.getItem("pb-scroll-top") === "1") {
          sessionStorage.removeItem("pb-scroll-top");
          scrollToTop(true);
        }
      } catch (e) {}
    });

    // Back-to-top control
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pb-back-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        if (window.scrollY > 420) btn.classList.add("is-visible");
        else btn.classList.remove("is-visible");
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", function () {
      scrollToTop(false);
    });

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
