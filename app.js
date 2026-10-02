/**
 * Portfolio App — Vanilla JS
 * Handles: mobile nav, smooth scroll, active section, form validation,
 * section reveal, and header scroll state.
 */

(() => {
  "use strict";

  // Mark that JS is running so CSS can safely animate sections.
  // Reveal sections already in (or near) the viewport first to avoid a blank flash.
  document.documentElement.classList.add("js");
  document.querySelectorAll(".section").forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      sec.classList.add("is-visible");
    }
  });
  document.body.classList.add("js-enabled");

  /* ---------- DOM refs ---------- */
  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  /* ---------- Mobile Navigation ---------- */
  function openMenu() {
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleMenu);

    // Close on link click (mobile)
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) closeMenu();
      });
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Close if resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) closeMenu();
    });
  }

  /* ---------- Header scroll state ---------- */
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Active section indicator ---------- */
  function setActiveLink() {
    const scrollPos = window.scrollY + 120; // offset for fixed header

    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    // Fallback for bottom of page
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50
    ) {
      current = "contact";
    }

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Section reveal (Intersection Observer) ---------- */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".section:not(.hero)").forEach((sec) => {
      revealObserver.observe(sec);
    });
  } else {
    // Ensure visibility when motion is reduced
    document.querySelectorAll(".section").forEach((sec) => {
      sec.classList.add("is-visible");
    });
  }

  /* ---------- Contact Form Validation & Real Submission ---------- */
  function showError(input, message) {
    input.classList.add("is-invalid");
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = "";
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    let valid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (!name.value.trim()) {
      showError(name, "Please enter your name.");
      valid = false;
    } else if (name.value.trim().length < 2) {
      showError(name, "Name must be at least 2 characters.");
      valid = false;
    } else {
      clearError(name);
    }

    if (!email.value.trim()) {
      showError(email, "Please enter your email.");
      valid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    } else {
      clearError(email);
    }

    if (!message.value.trim()) {
      showError(message, "Please write a message.");
      valid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, "Message should be at least 10 characters.");
      valid = false;
    } else {
      clearError(message);
    }

    return valid;
  }

  function setFormStatus(type, text) {
    if (!formStatus) return;
    formStatus.hidden = false;
    formStatus.className = "form-status " + type;
    formStatus.textContent = text;
  }

  if (contactForm) {
    ["name", "email", "message"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => clearError(el));
      }
    });

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        setFormStatus("error", "Please fix the errors above.");
        return;
      }

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const website = (document.getElementById("website") || {}).value || "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message, website }),
        });

        let data = {};
        try {
          data = await response.json();
        } catch (_) {
          data = {};
        }

        if (response.ok && data.ok) {
          setFormStatus(
            "success",
            data.message || "Message sent successfully. Thank you for reaching out!"
          );
          contactForm.reset();
          if (submitBtn) submitBtn.textContent = "Message Sent";
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = "Send Message";
            }
          }, 2500);
        } else {
          setFormStatus(
            "error",
            data.error ||
              "We couldn't send your message right now. Please try again or contact me directly by email."
          );
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
          }
        }
      } catch (err) {
        setFormStatus(
          "error",
          "We couldn't send your message right now. Please try again or contact me directly by email."
        );
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }
      }
    });
  }

  /* ---------- Smooth scroll offset for fixed header ---------- */
  // Native CSS scroll-behavior is used; this only adjusts focus for a11y
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        // Let CSS handle the smooth scroll; we only ensure focus for keyboard users
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ---------- Copyright year ---------- */
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
