/* ============================================
   CFRP ADVANCES 2026 BLOG — JAVASCRIPT
   Sidebar Navigation & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ─── Elements ───────────────────────────────────────────────────────────────
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");
  const sidebar = document.querySelector(".blog-sidebar");
  const menuToggle = document.querySelector(".mobile-nav-toggle");
  const closeBtn = document.querySelector(".sidebar-close");

  // ─── Sidebar open/close helpers ─────────────────────────────────────────────
  function openSidebar() {
    if (sidebar) sidebar.classList.add("active");
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("active");
  }

  // ─── Active Section Highlighting ────────────────────────────────────────────
  function highlightActiveSection() {
    let scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Throttle with rAF
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    scrollTimeout = window.requestAnimationFrame(highlightActiveSection);
  });

  highlightActiveSection();

  // ─── Smooth Scrolling for Sidebar Links ─────────────────────────────────────
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerOffset = 40;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        closeSidebar();

        setTimeout(function () {
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 80);

        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // ─── Mobile Menu Toggle ──────────────────────────────────────────────────────
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      sidebar.classList.toggle("active");
    });
  }

  // ─── Close Menu Button (inside sidebar) ─────────────────────────────────────
  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeSidebar();
    });
  }

  // Close sidebar when clicking outside of it on mobile
  document.addEventListener("click", function (e) {
    if (
      sidebar &&
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  // Close sidebar on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  // ─── Card Animations (IntersectionObserver) ──────────────────────────────────
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".stat-card, .learn-more-card, .feature-item",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Immediate viewport check so items visible on load animate in
  setTimeout(function () {
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  }, 50);

  // ─── Image Hover Effects ─────────────────────────────────────────────────────
  const images = document.querySelectorAll(
    ".full-width-image, .split-image img",
  );
  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      this.style.transform = "scale(1.01)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
    });
    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
    });
  });

  // ─── Table Row Hover ─────────────────────────────────────────────────────────
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f1f5f9";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // ─── Back to Top Button ──────────────────────────────────────────────────────
  const createBackToTop = () => {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Scroll back to top");
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #bf3425 0%, #9d2a1e 100%);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(191, 52, 37, 0.3);
    `;

    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 8px 25px rgba(191, 52, 37, 0.4)";
    });
    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(191, 52, 37, 0.3)";
    });
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(button);

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 500) {
        button.style.opacity = "1";
        button.style.visibility = "visible";
      } else {
        button.style.opacity = "0";
        button.style.visibility = "hidden";
      }
    });
  };

  createBackToTop();

  // ─── Reading Progress Bar ────────────────────────────────────────────────────
  const createProgressBar = () => {
    const progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #bf3425, #47577c);
      z-index: 9999;
      transition: width 0.1s linear;
      width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  };

  createProgressBar();
});
//   <!-- INFOGRAPHIC 1 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("rf1Wrap");
  var cross = document.getElementById("rf1Cross");
  if (!wrap) return;
  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          wrap.querySelectorAll(".rf1-arc").forEach(function (a) {
            a.classList.add("rf1-vis");
          });
          if (cross) cross.classList.add("rf1-vis");
          io.disconnect();
        }
      });
    },
    { threshold: 0.12 },
  );
  io.observe(wrap);
})();
//   <!-- INFOGRAPHIC 2 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("dp2Wrap");
  if (!wrap) return;

  // Build dots
  function mkDots(id, n, riskFn) {
    var el = document.getElementById(id);
    if (!el) return;
    for (var i = 0; i < n; i++) {
      var d = document.createElement("div");
      d.className = "dp2-dot";
      var r = riskFn(i, n);
      d.style.background = r.color;
      d.style.opacity = r.op;
      el.appendChild(d);
    }
  }
  mkDots("dp2DotsConv", 22, function (i) {
    return { color: "#bf3425", op: "0.82" };
  });
  mkDots("dp2DotsDyn", 22, function (i, n) {
    var ops = [0.82, 0.75, 0.6, 0.42, 0.28, 0.18, 0.12, 0.08, 0.06, 0.05];
    var op = ops[i] !== undefined ? ops[i] : 0.04;
    return { color: i < 4 ? "#bf3425" : "#c8d4e0", op: String(op) };
  });

  function animate() {
    wrap.querySelectorAll(".dp2-bar-fill").forEach(function (el) {
      el.style.width = (el.getAttribute("data-w") || "70") + "%";
    });
    var sb = document.getElementById("dp2SegBar");
    if (sb) sb.style.width = "100%";
  }

  var rows = wrap.querySelectorAll(".dp2-row");
  var footer = document.getElementById("dp2Footer");

  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          rows.forEach(function (r) {
            r.classList.add("dp2-vis");
          });
          if (footer) footer.classList.add("dp2-vis");
          setTimeout(animate, 300);
          io.disconnect();
        }
      });
    },
    { threshold: 0.12 },
  );
  io.observe(wrap);
})();
// <!-- INFOGRAPHIC 3 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("te3Wrap");
  if (!wrap) return;

  function animate() {
    // layers
    wrap.querySelectorAll(".te3-layer").forEach(function (el) {
      el.style.width = (el.getAttribute("data-w") || "80") + "%";
    });
    // stress fills
    wrap.querySelectorAll(".te3-stress-fill").forEach(function (el) {
      el.style.width = (el.getAttribute("data-s") || "50") + "%";
    });
    // rings: dashoffset = 131 * (1 - fraction)
    // data-offset stores remaining offset (already computed above)
    wrap.querySelectorAll(".te3-ring-fg").forEach(function (el) {
      el.style.strokeDashoffset = el.getAttribute("data-offset");
    });
  }

  var stages = wrap.querySelectorAll(".te3-stage");
  var scale = document.getElementById("te3Scale");

  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          stages.forEach(function (s) {
            s.classList.add("te3-vis");
          });
          if (scale) scale.classList.add("te3-vis");
          setTimeout(animate, 300);
          io.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(wrap);
})();
//    <!-- INFOGRAPHIC 4 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("tb4Wrap");
  if (!wrap) return;
  function animate() {
    wrap.querySelectorAll(".tb4-metric-fill").forEach(function (el) {
      el.style.width = (el.getAttribute("data-w") || "60") + "%";
    });
  }
  var panels = wrap.querySelectorAll(".tb4-panel");
  var callout = document.getElementById("tb4Callout");
  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          panels.forEach(function (p) {
            p.classList.add("tb4-vis");
          });
          if (callout) callout.classList.add("tb4-vis");
          setTimeout(animate, 300);
          io.disconnect();
        }
      });
    },
    { threshold: 0.12 },
  );
  io.observe(wrap);
})();
// <!-- INFOGRAPHIC 5 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("ep5Wrap");
  if (!wrap) return;
  var els = {
    base: document.getElementById("ep5Base"),
    plus: document.getElementById("ep5Plus"),
    csr: document.getElementById("ep5Csr"),
    arrow: document.getElementById("ep5Arrow"),
    mod: document.getElementById("ep5Mod"),
    bottom: document.getElementById("ep5Bottom"),
  };
  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          Object.values(els).forEach(function (el) {
            if (el) el.classList.add("ep5-vis");
          });
          io.disconnect();
        }
      });
    },
    { threshold: 0.12 },
  );
  io.observe(wrap);
})();
//  <!-- INFOGRAPHIC 6 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("eol6Wrap");
  if (!wrap) return;

  function animate() {
    wrap.querySelectorAll(".eol6-pos-fill").forEach(function (el) {
      el.style.width = (el.getAttribute("data-w") || "50") + "%";
    });
  }

  var rows = wrap.querySelectorAll(".eol6-row");
  var brace = document.getElementById("eol6Brace");
  var scale = document.getElementById("eol6Scale");
  var finding = document.getElementById("eol6Finding");

  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          rows.forEach(function (r) {
            r.classList.add("eol6-vis");
          });
          if (brace) brace.classList.add("eol6-vis");
          if (scale) scale.classList.add("eol6-vis");
          if (finding) finding.classList.add("eol6-vis");
          setTimeout(animate, 280);
          io.disconnect();
        }
      });
    },
    { threshold: 0.12 },
  );
  io.observe(wrap);
})();
//   <!-- INFOGRAPHIC 7 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("rcf7Wrap");
  if (!wrap) return;

  function animate() {
    wrap.querySelectorAll(".rcf7-output-bar-fill").forEach(function (el) {
      el.style.width = (el.getAttribute("data-w") || "60") + "%";
    });
  }

  var els = [
    document.getElementById("rcf7Input"),
    document.getElementById("rcf7Arr1"),
    document.getElementById("rcf7Arr2"),
    document.getElementById("rcf7P1"),
    document.getElementById("rcf7P2"),
    document.getElementById("rcf7P3"),
    document.getElementById("rcf7O1"),
    document.getElementById("rcf7O2"),
    document.getElementById("rcf7O3"),
    document.getElementById("rcf7Coupled"),
    document.getElementById("rcf7Finding"),
  ];

  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          els.forEach(function (el) {
            if (el) el.classList.add("rcf7-vis");
          });
          setTimeout(animate, 320);
          io.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(wrap);
})();
//   <!-- INFOGRAPHIC 8 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("ifd8Wrap");
  if (!wrap) return;

  var targets = [
    document.getElementById("ifd8DiagPanel"),
    document.getElementById("ifd8Eq"),
    document.getElementById("ifd8Compare"),
    document.getElementById("ifd8Finding"),
  ];

  var annotCards = wrap.querySelectorAll(".ifd8-annot-card");

  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          targets.forEach(function (el) {
            if (el) el.classList.add("ifd8-vis");
          });
          annotCards.forEach(function (c) {
            c.classList.add("ifd8-vis");
          });
          io.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(wrap);
})();
//    <!-- INFOGRAPHIC 9 PLACEHOLDER -->
(function () {
  var wrap = document.getElementById("conv9Wrap");
  if (!wrap) return;

  var hub = document.getElementById("conv9Hub");
  var pillars = wrap.querySelectorAll(".conv9-pillar");
  var banner = document.getElementById("conv9Banner");

  var io = new IntersectionObserver(
    function (e) {
      e.forEach(function (en) {
        if (en.isIntersecting) {
          if (hub) hub.classList.add("conv9-vis");
          pillars.forEach(function (p) {
            p.classList.add("conv9-vis");
          });
          if (banner) banner.classList.add("conv9-vis");
          io.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(wrap);
})();
