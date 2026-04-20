/* ============================================
   COBAIN / AFP GBDL BLOG — JAVASCRIPT
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
//  <!-- INFOGRAPHIC 1 PLACEHOLDER -->
(function () {
  var ids = [
    "udg2-s1",
    "udg2-a1",
    "udg2-s2",
    "udg2-a2",
    "udg2-s3",
    "udg2-down",
    "udg2-out",
  ];
  var root = document.getElementById("udg2-root");
  if (!root) return;
  function reveal() {
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.add("udg2-in");
    });
  }
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            reveal();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    obs.observe(root);
  } else {
    reveal();
  }
})();
//   <!-- INFOGRAPHIC 2 PLACEHOLDER -->
(function () {
  // ── Data model ──
  var DATA = {
    I: {
      glyph: "I",
      color: "geo",
      name: "I-Beam Profile",
      desc: "Symmetric double-flange — highest bending stiffness",
      verdict:
        "Best for primary frames where bending load governs. AFP layup on web is efficient.",
      verdictClass: "fpt2-verdict-geo",
      tabClass: "fpt2-active-geo",
      labelBg: "#47577c",
      labelText: "I-Beam Profile",
      params: [
        {
          key: "w",
          name: "Width (w)",
          desc: "Overall flange span",
          annot: "I-aw",
        },
        { key: "h", name: "Height (h)", desc: "Web height", annot: "I-ah" },
        {
          key: "t1",
          name: "Thickness t1",
          desc: "Top flange thickness",
          annot: "I-at1",
        },
        {
          key: "t2",
          name: "Thickness t2",
          desc: "Bottom flange thickness",
          annot: "I-at2",
        },
        {
          key: "t3",
          name: "Web t3",
          desc: "Web (shear) thickness",
          annot: "I-at3",
        },
        {
          key: "r1r2",
          name: "Radii r1/r2",
          desc: "Corner fillet radii",
          annot: "I-ar",
        },
      ],
    },
    C: {
      glyph: "C",
      color: "str",
      name: "C-Channel Profile",
      desc: "Open section — ideal for clip &amp; bracket attachment",
      verdict:
        "Efficient for secondary frames. Open section allows easy fastener access.",
      verdictClass: "fpt2-verdict-str",
      tabClass: "fpt2-active-str",
      labelBg: "#9d9d9c",
      labelText: "C-Channel Profile",
      params: [
        {
          key: "w",
          name: "Width (w)",
          desc: "Flange projection length",
          annot: "C-aw",
        },
        {
          key: "h",
          name: "Height (h)",
          desc: "Total section height",
          annot: "C-ah",
        },
        {
          key: "t1",
          name: "Flange t1",
          desc: "Top &amp; bottom flanges",
          annot: "C-at1",
        },
        {
          key: "t2",
          name: "Web t2",
          desc: "Web (vertical) thickness",
          annot: "C-at2",
        },
        {
          key: "r1r2",
          name: "Radii r1/r2",
          desc: "Inner corner radii",
          annot: "C-ar",
        },
      ],
    },
    O: {
      glyph: "Ω",
      color: "mfg",
      name: "Ω (Omega / Hat) Profile",
      desc: "Closed hat section — best torsional stiffness &amp; panel integration",
      verdict:
        "Preferred for skin-stringer structures. Enclosed box resists torsion most effectively.",
      verdictClass: "fpt2-verdict-mfg",
      tabClass: "fpt2-active-mfg",
      labelBg: "#bf3425",
      labelText: "Omega / Hat Profile",
      params: [
        {
          key: "out",
          name: "Outer Belt",
          desc: "Wide base flange width",
          annot: "O-aout",
        },
        {
          key: "in",
          name: "Inner Belt",
          desc: "Top cap / hat width",
          annot: "O-ain",
        },
        {
          key: "h",
          name: "Height (h)",
          desc: "Total section height",
          annot: "O-ah",
        },
        {
          key: "t1",
          name: "Cap t1",
          desc: "Inner cap thickness",
          annot: "O-at1",
        },
        {
          key: "t2",
          name: "Base t2",
          desc: "Outer belt thickness",
          annot: "O-at2",
        },
        {
          key: "r",
          name: "Radii (r)",
          desc: "All four corner radii",
          annot: "O-ar",
        },
      ],
    },
  };

  var curProfile = "I";
  var curAnnotEl = null;
  var curChipEl = null;

  function clearAnnot() {
    if (curAnnotEl) {
      curAnnotEl.classList.remove("fpt2-annot-show");
      curAnnotEl = null;
    }
    if (curChipEl) {
      curChipEl.classList.remove(
        "fpt2-chip-on-geo",
        "fpt2-chip-on-str",
        "fpt2-chip-on-mfg",
      );
      curChipEl = null;
    }
  }

  function renderInfo(pid) {
    var p = DATA[pid];
    var colorClass = "fpt2-chip-on-" + p.color;
    var html =
      '<div class="fpt2-profile-id fpt2-id-' +
      p.color +
      '">' +
      '<div class="fpt2-profile-glyph">' +
      p.glyph +
      "</div>" +
      '<div><div class="fpt2-profile-meta-name">' +
      p.name +
      "</div>" +
      '<div class="fpt2-profile-meta-desc">' +
      p.desc +
      "</div></div>" +
      "</div>" +
      '<div class="fpt2-params-head">Parametric Dimensions — hover to highlight</div>' +
      '<div class="fpt2-params-grid">';
    p.params.forEach(function (param) {
      html +=
        '<div class="fpt2-param-chip" data-annot="' +
        param.annot +
        '" data-color="' +
        colorClass +
        '"' +
        ' onmouseenter="fpt2HoverChip(this)" onmouseleave="fpt2UnhoverChip(this)">' +
        '<span class="fpt2-pname">' +
        param.name +
        "</span>" +
        '<span class="fpt2-pval">' +
        param.desc +
        "</span>" +
        "</div>";
    });
    html +=
      "</div>" +
      '<div class="fpt2-verdict ' +
      p.verdictClass +
      '">' +
      p.verdict +
      "</div>";
    document.getElementById("fpt2-info").innerHTML = html;
  }

  window.fpt2Switch = function (pid, btn) {
    clearAnnot();
    var p = DATA[pid];
    // Hide all SVGs
    ["I", "C", "O"].forEach(function (id) {
      document.getElementById("fpt2-" + id).classList.remove("fpt2-svg-active");
    });
    // Show selected (force reflow for animation)
    var svgEl = document.getElementById("fpt2-" + pid);
    void svgEl.offsetWidth;
    svgEl.classList.add("fpt2-svg-active");

    // Update panel label
    var lbl = document.getElementById("fpt2-panel-label");
    lbl.textContent = p.labelText;
    lbl.style.background = p.labelBg;

    // Update tabs
    document.querySelectorAll(".fpt2-tab").forEach(function (t) {
      t.classList.remove(
        "fpt2-active-geo",
        "fpt2-active-str",
        "fpt2-active-mfg",
      );
    });
    btn.classList.add(p.tabClass);

    curProfile = pid;
    renderInfo(pid);
  };

  window.fpt2HoverChip = function (chip) {
    clearAnnot();
    var annotId = chip.getAttribute("data-annot");
    var colorCls = chip.getAttribute("data-color");
    var el = document.getElementById(annotId);
    if (el) {
      el.classList.add("fpt2-annot-show");
      curAnnotEl = el;
    }
    chip.classList.add(colorCls);
    curChipEl = chip;
  };

  window.fpt2UnhoverChip = function (chip) {
    clearAnnot();
  };

  // Init info panel
  renderInfo("I");

  // Scroll reveal
  var root = document.getElementById("fpt2-root");
  if (!root) return;
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            root.style.opacity = "1";
            root.style.transform = "none";
            obs.disconnect();
          }
        });
      },
      { threshold: 0.08 },
    );
    root.style.opacity = "0";
    root.style.transform = "translateY(20px)";
    root.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    obs.observe(root);
  }
})();
//   <!-- INFOGRAPHIC 3 PLACEHOLDER -->
(function () {
  window.hlupToggle = function (card) {
    card.classList.toggle("hlup-open");
  };

  // Scroll reveal
  var root = document.getElementById("hlup-root");
  var outEl = document.getElementById("hlup-out");
  if (!root) return;

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            // Steps are already .hlup-in via HTML for simplicity — just trigger output panel
            if (outEl) outEl.classList.add("hlup-in");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.08 },
    );
    obs.observe(root);

    // Also animate steps on scroll
    var stepObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add("hlup-in");
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".hlup-step").forEach(function (s) {
      s.classList.remove("hlup-in");
      stepObs.observe(s);
    });
  } else {
    document.querySelectorAll(".hlup-step").forEach(function (s) {
      s.classList.add("hlup-in");
    });
    if (outEl) outEl.classList.add("hlup-in");
  }

  // Auto-open step 2 (Laminating) to show formula on load after delay
  setTimeout(function () {
    var cards = document.querySelectorAll(".hlup-card");
    if (cards[1]) cards[1].classList.add("hlup-open");
  }, 900);
})();
//    <!-- INFOGRAPHIC 4 PLACEHOLDER -->
(function () {
  // Ply toggle
  window.adpcTogglePly = function (row) {
    var isOpen = row.classList.contains("adpc-ply-open");
    document.querySelectorAll(".adpc-ply-row").forEach(function (r) {
      r.classList.remove("adpc-ply-open");
    });
    if (!isOpen) row.classList.add("adpc-ply-open");
  };

  // Scroll reveal
  var root = document.getElementById("adpc-root");
  if (!root) return;

  var animIds = ["adpc-b1", "adpc-c1", "adpc-b2", "adpc-c2", "adpc-b3"];
  var delays = [0, 180, 220, 400, 440];

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animIds.forEach(function (id, i) {
              setTimeout(function () {
                var el = document.getElementById(id);
                if (el) el.classList.add("adpc-in");
              }, delays[i]);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.06 },
    );
    obs.observe(root);
  } else {
    animIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.add("adpc-in");
    });
  }
})();
// <!-- INFOGRAPHIC 5 PLACEHOLDER -->
(function () {
  var root = document.getElementById("wfcmp-root");
  if (!root) return;

  var targets = [
    { id: "wfcmp-vs", delay: 0 },
    { id: "wfcmp-c1", delay: 80 },
    { id: "wfcmp-c2", delay: 200 },
    { id: "wfcmp-delta", delay: 420 },
  ];

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            targets.forEach(function (t) {
              setTimeout(function () {
                var el = document.getElementById(t.id);
                if (el) el.classList.add("wfcmp-in");
              }, t.delay);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.08 },
    );
    obs.observe(root);
  } else {
    targets.forEach(function (t) {
      var el = document.getElementById(t.id);
      if (el) el.classList.add("wfcmp-in");
    });
  }
})();
