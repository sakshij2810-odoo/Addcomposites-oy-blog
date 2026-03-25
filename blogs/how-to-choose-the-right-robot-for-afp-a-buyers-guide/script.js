/* ============================================
   AFP ROBOT BUYER'S GUIDE — JAVASCRIPT
   Sidebar Navigation & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ─── Elements ───────────────────────────────────────────────────────────────
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");
  const sidebar = document.querySelector(".blog-sidebar");
  const menuToggle = document.querySelector(".mobile-nav-toggle");
  const closeBtn = document.querySelector(".sidebar-close");

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
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
        if (sidebar && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
        }
      }
    });
  });

  // ─── Mobile Menu Toggle ──────────────────────────────────────────────────────
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // ─── Close Menu Button (inside sidebar) ─────────────────────────────────────
  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", function () {
      sidebar.classList.remove("active");
    });
  }

  // Close sidebar when clicking outside
  document.addEventListener("click", function (e) {
    if (
      sidebar &&
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      sidebar.classList.remove("active");
    }
  });

  // Close sidebar on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
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
    ".stat-card, .learn-more-card, .feature-item, .checklist-item",
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

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

  // ─── Build Infographic HTML ──────────────────────────────────────────────────
  buildInfographic1();
  buildInfographic2();
  buildInfographic3();
  buildInfographic4();
  buildInfographic5();
  buildInfographic6();
  buildInfographic7();
  buildInfographic8();

  // ─── Wire up all IntersectionObservers for infographics ─────────────────────
  wireReveal(".pe-reveal");
  wireReveal(".rsp-reveal", wirePayloadBars);
  wireReveal(".psa-reveal");
  wireReveal(".rbl-reveal");
  wireReveal(".rva-reveal");
  wireReveal(".icb-reveal", wireIcebergItems);
  wireReveal(".srs-reveal");
  wireReveal(".rsf-reveal");
});

// ─── Generic scroll-reveal wirer ─────────────────────────────────────────────
function wireReveal(selector, callback) {
  var els = document.querySelectorAll(selector);
  if (!els.length) return;
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
          if (callback) callback(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
}

// ─── INFOGRAPHIC 1: Process Envelope → Robot Requirements ────────────────────
function buildInfographic1() {
  var placeholder = document.getElementById("infographic-1-placeholder");
  if (!placeholder) return;

  var inputs = [
    {
      icon: "📐",
      label: "Part Geometry",
      value: "Flat / single / double curvature / complex",
    },
    {
      icon: "🔄",
      label: "Steering Radius",
      value: "Minimum bend radius (path complexity)",
    },
    { icon: "🎯", label: "Placement Tolerance", value: "±0.25 to ±1 mm" },
    { icon: "⚡", label: "Layup Speed Target", value: "100–600 mm/s" },
    {
      icon: "🔧",
      label: "Future Upgrades",
      value: "Laser, scanner, flash lamp…",
    },
  ];

  var outputs = [
    {
      icon: "🦾",
      label: "Reach + Wrist Agility",
      value: "Driven by geometry & steering radius",
    },
    {
      icon: "📏",
      label: "Path Accuracy",
      value: "Driven by placement tolerance",
    },
    {
      icon: "⚖️",
      label: "Payload + Torque",
      value: "Driven by speed & process forces",
    },
    { icon: "📦", label: "Payload Headroom", value: "Driven by upgrade plans" },
  ];

  var html =
    '<div class="pe-container pe-reveal">' +
    '<div class="pe-title">YOUR PROCESS ENVELOPE → ROBOT REQUIREMENTS</div>' +
    '<div class="pe-subtitle">Define these four inputs before opening a robot datasheet — they map directly to robot capability requirements</div>' +
    '<div class="pe-flow">' +
    '<div class="pe-inputs">';

  inputs.forEach(function (inp) {
    html +=
      '<div class="pe-input-card">' +
      '<div class="pe-input-icon">' +
      inp.icon +
      "</div>" +
      '<div><div class="pe-input-label">' +
      inp.label +
      "</div>" +
      '<div class="pe-input-value">' +
      inp.value +
      "</div></div>" +
      "</div>";
  });

  html +=
    "</div>" +
    '<div class="pe-connector">' +
    '<div class="pe-connector-line"></div>' +
    '<div class="pe-arrow"></div>' +
    '<div class="pe-connector-line"></div>' +
    "</div>" +
    '<div class="pe-outputs">';

  outputs.forEach(function (out) {
    html +=
      '<div class="pe-output-card">' +
      '<div class="pe-output-icon">' +
      out.icon +
      "</div>" +
      '<div><div class="pe-output-label">' +
      out.label +
      "</div>" +
      '<div class="pe-output-value">' +
      out.value +
      "</div></div>" +
      "</div>";
  });

  html += "</div></div></div>";
  placeholder.innerHTML = html;
}

// ─── INFOGRAPHIC 2: Real System Payload ──────────────────────────────────────
function buildInfographic2() {
  var placeholder = document.getElementById("infographic-2-placeholder");
  if (!placeholder) return;

  var items = [
    { label: "AFP-XS head", value: "~20 kg", barPct: 28, type: "normal" },
    {
      label: "Material spool (loaded)",
      value: "~8–12 kg",
      barPct: 14,
      type: "normal",
    },
    { label: "Cable management", value: "~3–4 kg", barPct: 5, type: "normal" },
    {
      label: "Future upgrade margin (laser, flash lamp, scanner, cameras)",
      value: "+5–15 kg",
      barPct: 15,
      type: "normal",
    },
    {
      label: "Effective tool load at wrist (before process forces)",
      value: "~36–51 kg",
      barPct: 55,
      type: "subtotal",
    },
    {
      label:
        "Add compaction + fiber tension forces (50–300 N compaction, process-dependent)",
      value: "+dynamic",
      barPct: 0,
      type: "normal",
    },
  ];

  var minimums = [
    { product: "AFP-XS", robot: "Minimum robot", value: "70 kg" },
    { product: "AFP-X", robot: "Minimum robot", value: "250–300 kg" },
    { product: "AddX", robot: "Minimum robot", value: "70 kg" },
  ];

  var html =
    '<div class="rsp-container rsp-reveal">' +
    '<div class="rsp-title">REAL SYSTEM PAYLOAD — AFP-XS EXAMPLE</div>' +
    '<div class="rsp-subtitle">The effective wrist load is a stack, not just the head weight — account for all components plus process forces</div>' +
    '<div class="rsp-stack">';

  items.forEach(function (item, i) {
    html +=
      '<div class="rsp-item ' +
      item.type +
      '" style="transition-delay:' +
      i * 80 +
      'ms">' +
      '<div class="rsp-dot"></div>' +
      '<div class="rsp-item-label">' +
      item.label +
      "</div>";
    if (item.barPct > 0) {
      html +=
        '<div class="rsp-bar-track"><div class="rsp-bar-fill" data-w="' +
        item.barPct +
        '"></div></div>';
    }
    html += '<div class="rsp-item-value">' + item.value + "</div></div>";
  });

  html +=
    "</div>" +
    '<div style="font-size:12px;color:#64748b;margin-bottom:12px;font-weight:600;">MINIMUM ROBOT CLASS BY PRODUCT</div>' +
    '<div class="rsp-minimums">';

  minimums.forEach(function (m) {
    html +=
      '<div class="rsp-min-card">' +
      '<div class="rsp-min-product">' +
      m.product +
      "</div>" +
      '<div class="rsp-min-robot">' +
      m.robot +
      "</div>" +
      '<div class="rsp-min-value">' +
      m.value +
      "</div>" +
      "</div>";
  });

  html += "</div></div>";
  placeholder.innerHTML = html;
}

function wirePayloadBars(container) {
  var items = container.querySelectorAll(".rsp-item");
  items.forEach(function (item) {
    item.classList.add("visible");
  });
  var bars = container.querySelectorAll(".rsp-bar-fill[data-w]");
  bars.forEach(function (bar) {
    setTimeout(function () {
      bar.style.width = bar.getAttribute("data-w") + "%";
    }, 200);
  });
}

// ─── INFOGRAPHIC 3: Part Scale vs. Architecture ───────────────────────────────
function buildInfographic3() {
  var placeholder = document.getElementById("infographic-3-placeholder");
  if (!placeholder) return;

  var rows = [
    {
      scale: "≤ 2 m",
      arch: "Standard 6-axis robot on fixed base",
      notes: "Most common starting point",
      extra: "",
    },
    {
      scale: "3–4 m",
      arch: "Robot + positioner or robot on 7th axis",
      notes: "Part rotates to robot",
      extra: "",
    },
    {
      scale: "5–20 m",
      arch: "Robot on linear track",
      notes: "Robot travels along part",
      extra: "rail",
    },
    {
      scale: "30 m+",
      arch: "Gantry system — X/Y/Z motion only",
      notes: "Large fixed parts only",
      extra: "gantry",
    },
  ];

  var html =
    '<div class="psa-container psa-reveal">' +
    '<div class="psa-title">PART SCALE vs. SYSTEM ARCHITECTURE</div>' +
    '<div class="psa-subtitle">Part size dictates not just the robot model, but the entire cell configuration</div>' +
    '<div class="psa-header">' +
    '<div class="psa-hcell scale">Part Scale</div>' +
    '<div class="psa-hcell arch">Architecture</div>' +
    '<div class="psa-hcell notes">Notes</div>' +
    "</div>" +
    '<div class="psa-table">';

  rows.forEach(function (row) {
    html +=
      '<div class="psa-row">' +
      '<div class="psa-cell psa-cell-scale">' +
      row.scale +
      "</div>" +
      '<div class="psa-cell">' +
      row.arch;
    if (row.extra === "rail") {
      html +=
        '<div class="psa-rail">' +
        '<div class="psa-rail-dot"></div>' +
        '<div class="psa-rail-line"></div>' +
        '<div class="psa-rail-dot"></div>' +
        '<div class="psa-rail-text" style="margin:0 6px">ROBOT TRAVEL →</div>' +
        '<div class="psa-rail-line"></div>' +
        '<div class="psa-rail-dot"></div>' +
        "</div>";
    }
    html +=
      "</div>" +
      '<div class="psa-cell notes">' +
      '<span class="psa-badge">' +
      row.notes +
      "</span>" +
      "</div></div>";
  });

  html += "</div></div>";
  placeholder.innerHTML = html;
}

// ─── INFOGRAPHIC 4: Robot Brand Landscape ────────────────────────────────────
function buildInfographic4() {
  var placeholder = document.getElementById("infographic-4-placeholder");
  if (!placeholder) return;

  var brands = [
    {
      key: "kuka",
      name: "KUKA",
      notes:
        "Most common in Addcomposites installs. Controller flexibility is the key reason: external axis sync, continuous path, customization options all work well. Strong ecosystem for offline programming.",
      tags: [
        { label: "Most common", cls: "primary" },
        { label: "Continuous path", cls: "secondary" },
        { label: "External axis sync", cls: "secondary" },
      ],
    },
    {
      key: "abb",
      name: "ABB",
      notes:
        "Fully compatible. Strong hardware. Slightly more restrictive on controller customization than KUKA in some configurations.",
      tags: [
        { label: "Fully compatible", cls: "secondary" },
        { label: "Strong hardware", cls: "neutral" },
      ],
    },
    {
      key: "fanuc",
      name: "FANUC",
      notes:
        "Fully compatible. Widely available. Similar notes to ABB on controller flexibility.",
      tags: [
        { label: "Fully compatible", cls: "secondary" },
        { label: "Widely available", cls: "neutral" },
      ],
    },
    {
      key: "other",
      name: "Other Brands",
      notes:
        "Compatibility varies by platform. Some models may present challenges with controller integration for AFP-specific motion control requirements. Verify before committing.",
      tags: [{ label: "Verify compatibility", cls: "primary" }],
    },
  ];

  var html =
    '<div class="rbl-container rbl-reveal">' +
    '<div class="rbl-title">ROBOT BRAND LANDSCAPE FOR AFP</div>' +
    '<div class="rbl-subtitle">Field experience from 50+ Addcomposites installations — all major brands are compatible; patterns differ in controller flexibility</div>' +
    '<div class="rbl-grid">';

  brands.forEach(function (brand) {
    html +=
      '<div class="rbl-card ' +
      brand.key +
      '">' +
      '<div class="rbl-brand-badge ' +
      brand.key +
      '">' +
      brand.name +
      "</div>" +
      '<div class="rbl-content">' +
      '<div class="rbl-notes">' +
      brand.notes +
      "</div>";
    brand.tags.forEach(function (tag) {
      html += '<span class="rbl-tag ' + tag.cls + '">' + tag.label + "</span>";
    });
    html += "</div></div>";
  });

  html += "</div></div>";
  placeholder.innerHTML = html;
}

// ─── INFOGRAPHIC 5: Repeatability vs. Absolute Accuracy ──────────────────────
function buildInfographic5() {
  var placeholder = document.getElementById("infographic-5-placeholder");
  if (!placeholder) return;

  var html =
    '<div class="rva-container rva-reveal">' +
    '<div class="rva-title">REPEATABILITY vs. ABSOLUTE ACCURACY</div>' +
    '<div class="rva-subtitle">AFP requires absolute accuracy — not just repeatability. The datasheet number is the wrong one to optimize for.</div>' +
    '<div class="rva-cards">' +
    '<div class="rva-card repeat">' +
    '<div class="rva-card-header">REPEATABILITY</div>' +
    '<div class="rva-card-def">How precisely a robot returns to a previously taught point</div>' +
    '<div class="rva-value-row"><span class="rva-value-num">±0.05 mm</span></div>' +
    '<div class="rva-value-label">Typical value — often quoted on datasheets</div>' +
    "</div>" +
    '<div class="rva-card accuracy">' +
    '<div class="rva-card-header">ABSOLUTE ACCURACY</div>' +
    '<div class="rva-card-def">How precisely it reaches a programmed coordinate in 3D space</div>' +
    '<div class="rva-value-row"><span class="rva-value-num">±1–3 mm</span></div>' +
    '<div class="rva-value-label">Uncalibrated — what you actually get out of the box</div>' +
    '<div class="rva-value-row" style="margin-top:8px"><span class="rva-value-num" style="font-size:14px">±0.2–0.5 mm</span></div>' +
    '<div class="rva-value-label">After laser tracker calibration</div>' +
    "</div>" +
    "</div>" +
    '<div class="rva-tolerance">' +
    '<div class="rva-tol-label">AFP PLACEMENT TOLERANCE</div>' +
    '<div class="rva-tol-value">±0.25–1 mm</div>' +
    "</div>" +
    '<div class="rva-insight">⚠ Uncalibrated robots can be at or beyond tolerance limit before a single tow is placed. Laser tracker calibration is not optional for precision AFP work — budget for it upfront.</div>' +
    "</div>";

  placeholder.innerHTML = html;
}

// ─── INFOGRAPHIC 6: Iceberg Cost View ────────────────────────────────────────
function buildInfographic6() {
  var placeholder = document.getElementById("infographic-6-placeholder");
  if (!placeholder) return;

  var visibleItems = ["Robot purchase", "AFP head"];

  var hiddenItems = [
    "Offline programming software",
    "Laser tracker + calibration service",
    "TCP calibration routines",
    "Process validation + first-article runs",
    "Scrap during tuning",
    "Cycle time losses at conservative speeds",
  ];

  var html =
    '<div class="icb-container icb-reveal">' +
    '<div class="icb-title">TOTAL AFP SYSTEM COST — ICEBERG VIEW</div>' +
    '<div class="icb-subtitle">Robot cost is typically a minority of total AFP system investment — most costs sit below the waterline</div>' +
    '<div class="icb-visual">';

  // Visible zone
  html +=
    '<div class="icb-zone visible-zone">' +
    '<div class="icb-zone-header">Above Waterline <span class="icb-zone-badge">Visible</span></div>' +
    '<div class="icb-items">';
  visibleItems.forEach(function (item, i) {
    html +=
      '<div class="icb-item" data-delay="' +
      i * 100 +
      '">' +
      '<div class="icb-dot"></div>' +
      item +
      "</div>";
  });
  html += "</div></div>";

  // Hidden zone
  html +=
    '<div class="icb-zone hidden-zone">' +
    '<div class="icb-zone-header">Below Waterline <span class="icb-zone-badge">Hidden Costs</span></div>' +
    '<div class="icb-items">';
  hiddenItems.forEach(function (item, i) {
    html +=
      '<div class="icb-item" data-delay="' +
      (i + 2) * 120 +
      '">' +
      '<div class="icb-dot"></div>' +
      item +
      "</div>";
  });
  html += "</div></div>";

  html += "</div></div>";
  placeholder.innerHTML = html;
}

function wireIcebergItems(container) {
  var items = container.querySelectorAll(".icb-item");
  items.forEach(function (item) {
    var delay = parseInt(item.getAttribute("data-delay") || "0");
    setTimeout(function () {
      item.classList.add("visible");
    }, delay);
  });
}

// ─── INFOGRAPHIC 7: Specification Risk Spectrum ───────────────────────────────
function buildInfographic7() {
  var placeholder = document.getElementById("infographic-7-placeholder");
  if (!placeholder) return;

  var cols = [
    {
      key: "under",
      header: "UNDER-SPEC ⚠",
      steps: [
        { icon: "↓", cls: "srs-arrow-down", text: "Robot near payload limit" },
        {
          icon: "↓",
          cls: "srs-arrow-down",
          text: "High wrist torque from long TCP offset",
        },
        {
          icon: "↓",
          cls: "srs-arrow-down",
          text: "Path drift on curved surfaces",
        },
        {
          icon: "↓",
          cls: "srs-arrow-down",
          text: "Speed ceiling below target",
        },
        {
          icon: "↓",
          cls: "srs-arrow-down",
          text: "Re-selection required — costs more than getting it right upfront",
        },
      ],
    },
    {
      key: "correct",
      header: "✓ CORRECT ZONE",
      steps: [
        {
          icon: "→",
          cls: "srs-arrow-right",
          text: "60–70% payload utilization",
        },
        {
          icon: "→",
          cls: "srs-arrow-right",
          text: "Torque margin for process forces",
        },
        {
          icon: "→",
          cls: "srs-arrow-right",
          text: "Reliable accuracy at full speed",
        },
        {
          icon: "→",
          cls: "srs-arrow-right",
          text: "No wrist torque saturation",
        },
        {
          icon: "→",
          cls: "srs-arrow-right",
          text: "Upgrade headroom if planned",
        },
      ],
    },
    {
      key: "over",
      header: "OVER-SPEC",
      steps: [
        {
          icon: "—",
          cls: "srs-arrow-neutral",
          text: "Excess payload for tool size",
        },
        {
          icon: "—",
          cls: "srs-arrow-neutral",
          text: "Larger footprint, higher cost",
        },
        {
          icon: "—",
          cls: "srs-arrow-neutral",
          text: "Not inherently more accurate",
        },
        {
          icon: "—",
          cls: "srs-arrow-neutral",
          text: "Acceptable ONLY if upgrade to larger head is a concrete future plan",
        },
      ],
    },
  ];

  var html =
    '<div class="srs-container srs-reveal">' +
    '<div class="srs-title">SPECIFICATION RISK SPECTRUM</div>' +
    '<div class="srs-subtitle">Both failure modes carry real cost — the correct zone is operating at 60–70% of rated payload</div>' +
    '<div class="srs-columns">';

  cols.forEach(function (col) {
    html +=
      '<div class="srs-col ' +
      col.key +
      '">' +
      '<div class="srs-col-header">' +
      col.header +
      "</div>" +
      '<div class="srs-col-body">';
    col.steps.forEach(function (step) {
      html +=
        '<div class="srs-step"><span class="' +
        step.cls +
        '">' +
        step.icon +
        "</span><span>" +
        step.text +
        "</span></div>";
    });
    html += "</div></div>";
  });

  html += "</div></div>";
  placeholder.innerHTML = html;
}

// ─── INFOGRAPHIC 8: AFP Robot Selection Flow ──────────────────────────────────
function buildInfographic8() {
  var placeholder = document.getElementById("infographic-8-placeholder");
  if (!placeholder) return;

  var steps = [
    {
      title: "Define process envelope",
      detail:
        "Geometry, speed, placement tolerance, compaction force, fiber tension",
      branches: [],
    },
    {
      title: "Part > 30 m?",
      detail: "",
      branches: [
        { cls: "yes", text: "YES → Gantry architecture" },
        { cls: "no", text: "NO → Continue" },
      ],
    },
    {
      title: "Part > 5 m?",
      detail: "",
      branches: [
        { cls: "yes", text: "YES → Robot on linear track" },
        { cls: "no", text: "NO → Continue" },
      ],
    },
    {
      title: "Select AFP system",
      detail: "",
      branches: [
        { cls: "product", text: "AFP-XS / AddX → 70 kg class robot" },
        { cls: "product", text: "AFP-X → 250–300 kg class robot" },
      ],
    },
    {
      title: "Brand preference?",
      detail: "",
      branches: [
        { cls: "compat", text: "KUKA / ABB / Fanuc → All compatible" },
        { cls: "warn", text: "Others → Verify controller compatibility first" },
      ],
    },
    {
      title: "Run reach simulation vs. actual part",
      detail:
        "Validate wrist torque at maximum TCP offset before committing to a purchase",
      branches: [],
    },
    {
      title: "Confirm at ≤ 60–70% payload utilization",
      detail:
        "The remainder is your accuracy and reliability buffer — not wasted capacity",
      branches: [],
    },
  ];

  var html =
    '<div class="rsf-container rsf-reveal">' +
    '<div class="rsf-title">AFP ROBOT SELECTION FLOW</div>' +
    '<div class="rsf-subtitle">Work through this sequence after defining your process envelope — offline simulation before purchase is the most valuable step</div>' +
    '<div class="rsf-flow">';

  steps.forEach(function (step, i) {
    var isLast = i === steps.length - 1;
    html +=
      '<div class="rsf-step-wrap">' +
      '<div class="rsf-step-left">' +
      '<div class="rsf-num">' +
      (i + 1) +
      "</div>";
    if (!isLast) html += '<div class="rsf-vert-line"></div>';
    html +=
      "</div>" +
      '<div class="rsf-step-body">' +
      '<div class="rsf-step-card">' +
      '<div class="rsf-step-title">' +
      step.title +
      "</div>";
    if (step.detail)
      html += '<div class="rsf-step-detail">' + step.detail + "</div>";
    if (step.branches.length) {
      html += '<div class="rsf-branches">';
      step.branches.forEach(function (b) {
        html += '<div class="rsf-branch ' + b.cls + '">' + b.text + "</div>";
      });
      html += "</div>";
    }
    html += "</div></div></div>";
  });

  html += "</div></div>";
  placeholder.innerHTML = html;
}
