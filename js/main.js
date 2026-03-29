/* ================================================================
   GREENRIDGE LANDSCAPING - Main JavaScript
   ================================================================ */

(function () {
  "use strict";

  // --------------------------------
  // Mobile Menu
  // --------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!isOpen));
      this.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      mainNav.classList.toggle("is-open", !isOpen);
      document.body.style.overflow = isOpen ? "" : "hidden";
    });

    // Close menu on nav link click
    mainNav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        mainNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        mainNav.classList.remove("is-open");
        document.body.style.overflow = "";
        menuToggle.focus();
      }
    });
  }

  // --------------------------------
  // Sticky Header
  // --------------------------------
  var header = document.getElementById("header");
  var scrollThreshold = 50;

  function updateHeader() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // --------------------------------
  // Scroll Animations (IntersectionObserver)
  // --------------------------------
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    var fadeElements = document.querySelectorAll(".fade-up");

    if (fadeElements.length > 0 && "IntersectionObserver" in window) {
      var fadeObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              fadeObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -40px 0px",
        },
      );

      fadeElements.forEach(function (el) {
        fadeObserver.observe(el);
      });
    } else {
      // Fallback: show everything
      fadeElements.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  } else {
    // Reduced motion: show everything immediately
    document.querySelectorAll(".fade-up").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // --------------------------------
  // Trust Bar Counter Animation
  // --------------------------------
  var counters = document.querySelectorAll("[data-count]");

  if (
    counters.length > 0 &&
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    // Show final values immediately
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var duration = 1600;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  // --------------------------------
  // Back to Top Button
  // --------------------------------
  var backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 600) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      },
      { passive: true },
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --------------------------------
  // Form Handling
  // --------------------------------
  var form = document.getElementById("estimateForm");
  var formSuccess = document.getElementById("formSuccess");
  var submitBtn = document.getElementById("submitBtn");

  if (form) {
    form.addEventListener("submit", function (e) {
      // Clear previous invalid states
      form.querySelectorAll(".invalid").forEach(function (el) {
        el.classList.remove("invalid");
      });

      // Basic validation
      var isValid = true;
      var requiredFields = form.querySelectorAll("[required]");

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add("invalid");
          isValid = false;
        }

        // Email format check
        if (field.type === "email" && field.value.trim()) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            field.classList.add("invalid");
            isValid = false;
          }
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Focus the first invalid field
        var firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // If Netlify is handling the form, let it submit normally.
      // For demo purposes (non-Netlify), show success state.
      if (!window.location.hostname.includes("netlify")) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Simulate submission delay for demo
        setTimeout(function () {
          form.hidden = true;
          formSuccess.hidden = false;
        }, 800);
      }
    });

    // Clear invalid on input
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        this.classList.remove("invalid");
      });
    });
  }

  // --------------------------------
  // Smooth Scroll for anchor links
  // --------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        // Update URL without adding to history
        if (history.replaceState) {
          history.replaceState(null, null, targetId);
        }
      }
    });
  });
})();
