/* ============================================
   AFP TCO BLOG - JAVASCRIPT
   Sidebar Navigation, Progress Bar, Back to Top,
   Mobile Toggle & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // READING PROGRESS BAR
  // ==========================================
  const progressBar = document.getElementById("readingProgress");

  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";
  }

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (!backToTopBtn) return;
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // SIDEBAR ACTIVE SECTION HIGHLIGHTING
  // ==========================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");

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

  // ==========================================
  // COMBINED SCROLL HANDLER (throttled)
  // ==========================================
  let scrollRAF;
  window.addEventListener("scroll", function () {
    if (scrollRAF) window.cancelAnimationFrame(scrollRAF);
    scrollRAF = window.requestAnimationFrame(function () {
      highlightActiveSection();
      updateProgress();
      toggleBackToTop();
    });
  });

  // Initial calls
  highlightActiveSection();
  updateProgress();
  toggleBackToTop();

  // ==========================================
  // SMOOTH SCROLL FOR SIDEBAR LINKS
  // ==========================================
  const sidebar = document.getElementById("blogSidebar");

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

        // Close mobile sidebar after click
        if (sidebar && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  });

  // ==========================================
  // MOBILE NAVIGATION TOGGLE
  // ==========================================
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const sidebarClose = document.getElementById("sidebarClose");

  function openSidebar() {
    if (sidebar) {
      sidebar.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", openSidebar);
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
  }

  // Close sidebar when clicking outside (backdrop)
  document.addEventListener("click", function (e) {
    if (
      sidebar &&
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      e.target !== mobileNavToggle &&
      !mobileNavToggle.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  // Close sidebar on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  // ==========================================
  // CARD ENTRANCE ANIMATIONS (IntersectionObserver)
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

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
    ".learn-more-card, .feature-item, .spec-card, .scenario-card, .infographic-placeholder",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // ==========================================
  // IMAGE HOVER EFFECTS
  // ==========================================
  const images = document.querySelectorAll(".split-image img");
  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      this.style.transform = "scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.14)";
    });
    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.10)";
    });
  });

  // ==========================================
  // TABLE ROW HOVER
  // ==========================================
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f1f5f9";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // ==========================================
  // SPEC ITEMS STAGGERED ANIMATION
  // ==========================================
  const specObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".spec-item");
          items.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateX(-10px)";
            item.style.transition = `opacity 0.4s ease ${index * 0.07}s, transform 0.4s ease ${index * 0.07}s`;
            setTimeout(
              () => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
              },
              50 + index * 70,
            );
          });
          specObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  const scenarioCards = document.querySelectorAll(".scenario-card");
  scenarioCards.forEach((card) => specObserver.observe(card));
});

//   <!-- INFOGRAPHIC 1: Three-model comparison table -->
(function () {
  var container = document.getElementById("afpCcContainer");

  var containerObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("afp-cc-visible");
          containerObs.unobserve(entry.target);

          // Stagger row reveals
          var rows = entry.target.querySelectorAll(
            "tbody tr:not(.afp-cc-row-divider)",
          );
          rows.forEach(function (row, i) {
            setTimeout(
              function () {
                row.classList.add("afp-cc-row-visible");
              },
              80 + i * 60,
            );
          });
          // Dividers appear instantly
          var dividers = entry.target.querySelectorAll(".afp-cc-row-divider");
          dividers.forEach(function (d) {
            d.style.opacity = "1";
            d.style.transform = "none";
          });
        }
      });
    },
    { threshold: 0.1 },
  );

  containerObs.observe(container);

  // Also make divider rows visible immediately (they have no transition class)
  var dividers = container.querySelectorAll(".afp-cc-row-divider");
  dividers.forEach(function (d) {
    d.style.opacity = "1";
    d.style.transform = "none";
    d.style.transition = "none";
  });
})();
//    <!-- INFOGRAPHIC 2: Year 1 Legacy AFP Cost Waterfall -->
(function () {
  var TOTAL = 3040000;

  var items = [
    {
      label: "Machine purchase",
      value: 2500000,
      color: "#47577c",
      display: "€2.5M",
    },
    {
      label: "Installation + commissioning",
      value: 225000,
      color: "#bf3425",
      display: "€225K avg",
    },
    {
      label: "Maintenance contract Year 1",
      value: 100000,
      color: "#7a8fb5",
      display: "€100K",
    },
    {
      label: "Consumables + tooling",
      value: 60000,
      color: "#d4614f",
      display: "€60K",
    },
    {
      label: "Software licence + training",
      value: 80000,
      color: "#9d9d9c",
      display: "€80K",
    },
    {
      label: "Integration specialist",
      value: 75000,
      color: "#b8bec8",
      display: "€75K",
    },
  ];

  var MAX_BAR_WIDTH_PCT = 88; // % of track width at max value
  var maxVal = items[0].value;

  function formatEur(v) {
    if (v >= 1000000)
      return "€" + (v / 1000000).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (v >= 1000) return "€" + Math.round(v / 1000) + "K";
    return "€" + v;
  }

  var chart = document.getElementById("afpWfChart");
  var tooltip = document.getElementById("afpWfTooltip");
  var tipTitle = document.getElementById("afpWfTipTitle");
  var tipValue = document.getElementById("afpWfTipValue");
  var tipPct = document.getElementById("afpWfTipPct");

  // Build rows
  items.forEach(function (item, i) {
    var pct = (item.value / maxVal) * MAX_BAR_WIDTH_PCT;

    var row = document.createElement("div");
    row.className = "afp-wf-bar-row";
    row.style.transitionDelay = i * 80 + "ms";

    // Add spacer before lower cost items
    if (i === 1) {
      var spacer = document.createElement("div");
      spacer.className = "afp-wf-spacer";
      chart.appendChild(spacer);
    }

    row.innerHTML =
      '<div class="afp-wf-y-label">' +
      formatEur(item.value) +
      "</div>" +
      '<div class="afp-wf-track">' +
      '<div class="afp-wf-connector"></div>' +
      '<div class="afp-wf-bar" data-idx="' +
      i +
      '" style="width:0; background:transparent">' +
      '<div class="afp-wf-bar-inner" style="background:' +
      item.color +
      '"></div>' +
      '<div class="afp-wf-bar-label">' +
      item.label +
      " <strong>(" +
      item.display +
      ")</strong></div>" +
      "</div>" +
      "</div>";

    chart.appendChild(row);

    // Store target width
    row.querySelector(".afp-wf-bar").dataset.targetPct = pct;
  });

  // Divider
  var divRow = document.createElement("div");
  divRow.className = "afp-wf-divider-row";
  divRow.innerHTML =
    '<div class="afp-wf-divider-spacer"></div><div class="afp-wf-divider-line"></div>';
  chart.appendChild(divRow);

  // Tooltip logic
  document.querySelectorAll(".afp-wf-bar").forEach(function (bar) {
    bar.addEventListener("mouseenter", function (e) {
      var idx = parseInt(bar.dataset.idx);
      var item = items[idx];
      tipTitle.textContent = item.label;
      tipValue.textContent = item.display;
      tipPct.textContent =
        ((item.value / TOTAL) * 100).toFixed(1) + "% of total Year 1 cost";
      tooltip.style.display = "block";
    });
    bar.addEventListener("mousemove", function (e) {
      tooltip.style.left = e.clientX + 14 + "px";
      tooltip.style.top = e.clientY - 44 + "px";
    });
    bar.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
  });

  // Intersection Observer
  var container = document.getElementById("afpWfContainer");
  var totalEl = document.getElementById("afpWfTotal");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);

        container.classList.add("afp-wf-visible");

        var rows = chart.querySelectorAll(".afp-wf-bar-row");
        rows.forEach(function (row, i) {
          setTimeout(
            function () {
              row.classList.add("afp-wf-row-visible");
              var bar = row.querySelector(".afp-wf-bar");
              var label = row.querySelector(".afp-wf-bar-label");
              if (bar) {
                bar.style.width = bar.dataset.targetPct + "%";
                setTimeout(function () {
                  if (label) label.classList.add("afp-wf-label-visible");
                }, 500);
              }
            },
            120 + i * 100,
          );
        });

        // Divider
        setTimeout(
          function () {
            divRow.classList.add("afp-wf-row-visible");
          },
          120 + rows.length * 100 + 100,
        );

        // Total
        setTimeout(
          function () {
            totalEl.classList.add("afp-wf-row-visible");
          },
          120 + rows.length * 100 + 260,
        );
      });
    },
    { threshold: 0.15 },
  );

  obs.observe(container);
})();
//   <!-- INFOGRAPHIC 3: Annual Hand Layup Cost by Category -->
(function () {
  var TOTAL = 465000;

  var items = [
    {
      label: "Labour",
      sub: "4 operators @ €40K/yr each",
      value: 160000,
      color: "#47577c",
    },
    {
      label: "Material waste",
      sub: "25% avg on €480K spend",
      value: 120000,
      color: "#bf3425",
    },
    {
      label: "Rework + NCR processing",
      sub: null,
      value: 70000,
      color: "#7a8fb5",
    },
    {
      label: "Quality inspection overhead",
      sub: null,
      value: 40000,
      color: "#d4614f",
    },
    {
      label: "Recruitment + training churn",
      sub: null,
      value: 30000,
      color: "#9d9d9c",
    },
    {
      label: "Tooling maintenance + consumables",
      sub: null,
      value: 25000,
      color: "#b8bec8",
    },
    {
      label: "Supervision + planning overhead",
      sub: null,
      value: 20000,
      color: "#c8cdd6",
    },
  ];

  var maxVal = items[0].value;

  function fmt(v) {
    if (v >= 1000000)
      return "€" + (v / 1000000).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (v >= 1000) return "€" + (v / 1000).toFixed(0) + "K";
    return "€" + v;
  }

  var chart = document.getElementById("afpHlChart");
  var tooltip = document.getElementById("afpHlTooltip");
  var tipTitle = document.getElementById("afpHlTipTitle");
  var tipValue = document.getElementById("afpHlTipValue");
  var tipPct = document.getElementById("afpHlTipPct");

  items.forEach(function (item, i) {
    var pct = (item.value / maxVal) * 88;

    var row = document.createElement("div");
    row.className = "afp-hl-row";
    row.style.transitionDelay = i * 70 + "ms";

    var subHtml = item.sub ? "<span>" + item.sub + "</span>" : "";

    row.innerHTML =
      '<div class="afp-hl-label">' +
      item.label +
      subHtml +
      "</div>" +
      '<div class="afp-hl-track">' +
      '<div class="afp-hl-bar" data-idx="' +
      i +
      '" style="background:' +
      item.color +
      '; width:0">' +
      '<span class="afp-hl-bar-pct">' +
      Math.round((item.value / TOTAL) * 100) +
      "%</span>" +
      "</div>" +
      "</div>" +
      '<div class="afp-hl-value">' +
      fmt(item.value) +
      "</div>";

    row.querySelector(".afp-hl-bar").dataset.targetPct = pct;
    chart.appendChild(row);

    // Tooltip
    row
      .querySelector(".afp-hl-bar")
      .addEventListener("mouseenter", function () {
        tipTitle.textContent = item.label;
        tipValue.textContent = fmt(item.value);
        tipPct.textContent =
          ((item.value / TOTAL) * 100).toFixed(1) + "% of total annual cost";
        tooltip.style.display = "block";
      });
    row
      .querySelector(".afp-hl-bar")
      .addEventListener("mousemove", function (e) {
        tooltip.style.left = e.clientX + 14 + "px";
        tooltip.style.top = e.clientY - 48 + "px";
      });
    row
      .querySelector(".afp-hl-bar")
      .addEventListener("mouseleave", function () {
        tooltip.style.display = "none";
      });
  });

  // IntersectionObserver
  var container = document.getElementById("afpHlContainer");
  var dividerEl = document.getElementById("afpHlDivider");
  var totalEl = document.getElementById("afpHlTotal");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-hl-visible");

        var rows = chart.querySelectorAll(".afp-hl-row");
        rows.forEach(function (row, i) {
          setTimeout(
            function () {
              row.classList.add("afp-hl-row-visible");
              var bar = row.querySelector(".afp-hl-bar");
              var valEl = row.querySelector(".afp-hl-value");
              var pctEl = row.querySelector(".afp-hl-bar-pct");
              if (bar) {
                bar.style.width = bar.dataset.targetPct + "%";
                setTimeout(function () {
                  if (valEl) valEl.classList.add("afp-hl-val-visible");
                  if (pctEl) pctEl.classList.add("afp-hl-pct-visible");
                }, 550);
              }
            },
            100 + i * 90,
          );
        });

        var delay = 100 + rows.length * 90 + 120;
        setTimeout(function () {
          dividerEl.classList.add("afp-hl-row-visible");
        }, delay);
        setTimeout(function () {
          totalEl.classList.add("afp-hl-row-visible");
        }, delay + 160);
      });
    },
    { threshold: 0.12 },
  );

  obs.observe(container);
})();
// <!-- INFOGRAPHIC 4: Material Waste Impact -->
(function () {
  var container = document.getElementById("afpMwContainer");
  var cardHl = document.getElementById("afpMwCardHl");
  var cardXs = document.getElementById("afpMwCardXs");
  var barHl = document.getElementById("afpMwBarHl");
  var barXs = document.getElementById("afpMwBarXs");
  var savingEl = document.getElementById("afpMwSaving");
  var subNoteEl = document.getElementById("afpMwSubNote");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);

        container.classList.add("afp-mw-visible");

        // Cards stagger
        setTimeout(function () {
          cardHl.classList.add("afp-mw-card-visible");
          barHl.style.width = barHl.dataset.target + "%";
        }, 150);

        setTimeout(function () {
          cardXs.classList.add("afp-mw-card-visible");
          barXs.style.width = barXs.dataset.target + "%";
        }, 300);

        setTimeout(function () {
          savingEl.classList.add("afp-mw-card-visible");
        }, 520);

        setTimeout(function () {
          subNoteEl.classList.add("afp-mw-card-visible");
        }, 700);
      });
    },
    { threshold: 0.12 },
  );

  obs.observe(container);

  // Hover lift handled by CSS — no JS needed
})();
// <!-- INFOGRAPHIC 5: Year 1 AFP-XS Cost Waterfall -->
(function () {
  var GROSS = 72000;

  var items = [
    {
      label: "Annual subscription",
      value: 42000,
      display: "€42,000",
      detail: null,
      color: "#47577c",
    },
    {
      label: "Installation + setup",
      value: 8000,
      display: "€8,000",
      detail: "avg",
      color: "#bf3425",
    },
    {
      label: "Operator training",
      value: 5000,
      display: "€5,000",
      detail: "1–2 weeks",
      color: "#7a8fb5",
    },
    {
      label: "Tooling adaptation",
      value: 5000,
      display: "€5,000",
      detail: "typical",
      color: "#d4614f",
    },
    {
      label: "Consumables Year 1",
      value: 12000,
      display: "€12,000",
      detail: null,
      color: "#9d9d9c",
    },
  ];

  var maxVal = items[0].value;
  var MAX_PCT = 86;

  function fmt(v) {
    if (v >= 1000) return "€" + (v / 1000).toFixed(0) + "K";
    return "€" + v;
  }

  var chart = document.getElementById("afpXswfChart");
  var tooltip = document.getElementById("afpXswfTooltip");
  var tipTitle = document.getElementById("afpXswfTipTitle");
  var tipValue = document.getElementById("afpXswfTipValue");
  var tipPct = document.getElementById("afpXswfTipPct");

  items.forEach(function (item, i) {
    var pct = (item.value / maxVal) * MAX_PCT;

    var row = document.createElement("div");
    row.className = "afp-xswf-row";
    row.style.transitionDelay = i * 80 + "ms";

    var labelHtml = item.label;
    if (item.detail)
      labelHtml +=
        " <strong>(" + item.display + " " + item.detail + ")</strong>";
    else labelHtml += " <strong>(" + item.display + ")</strong>";

    row.innerHTML =
      '<div class="afp-xswf-y-label">' +
      fmt(item.value) +
      "</div>" +
      '<div class="afp-xswf-track">' +
      '<div class="afp-xswf-connector"></div>' +
      '<div class="afp-xswf-bar" data-idx="' +
      i +
      '" data-target="' +
      pct +
      '" style="background:transparent;width:0">' +
      '<div class="afp-xswf-bar-inner" style="background:' +
      item.color +
      '"></div>' +
      '<div class="afp-xswf-bar-label">' +
      labelHtml +
      "</div>" +
      "</div>" +
      "</div>";

    chart.appendChild(row);

    var bar = row.querySelector(".afp-xswf-bar");
    bar.addEventListener("mouseenter", function () {
      tipTitle.textContent = item.label;
      tipValue.textContent = item.display;
      tipPct.textContent =
        ((item.value / GROSS) * 100).toFixed(1) + "% of gross Year 1 cost";
      tooltip.style.display = "block";
    });
    bar.addEventListener("mousemove", function (e) {
      tooltip.style.left = e.clientX + 14 + "px";
      tooltip.style.top = e.clientY - 46 + "px";
    });
    bar.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
  });

  // IntersectionObserver
  var container = document.getElementById("afpXswfContainer");
  var dividerEl = document.getElementById("afpXswfDivider");
  var grossEl = document.getElementById("afpXswfGross");
  var offsetEl = document.getElementById("afpXswfOffset");
  var netEl = document.getElementById("afpXswfNet");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-xswf-visible");

        var rows = chart.querySelectorAll(".afp-xswf-row");
        rows.forEach(function (row, i) {
          setTimeout(
            function () {
              row.classList.add("afp-xswf-row-visible");
              var bar = row.querySelector(".afp-xswf-bar");
              var lbl = row.querySelector(".afp-xswf-bar-label");
              if (bar) {
                bar.style.width = bar.dataset.target + "%";
                setTimeout(function () {
                  if (lbl) lbl.classList.add("afp-xswf-lbl-visible");
                }, 520);
              }
            },
            120 + i * 100,
          );
        });

        var base = 120 + rows.length * 100;
        setTimeout(function () {
          dividerEl.classList.add("afp-xswf-row-visible");
        }, base + 80);
        setTimeout(function () {
          grossEl.classList.add("afp-xswf-row-visible");
        }, base + 200);
        setTimeout(function () {
          offsetEl.classList.add("afp-xswf-row-visible");
        }, base + 360);
        setTimeout(function () {
          netEl.classList.add("afp-xswf-row-visible");
        }, base + 520);
      });
    },
    { threshold: 0.12 },
  );

  obs.observe(container);
})();
//   <!-- INFOGRAPHIC 6: 36-Month Cumulative Cost Comparison -->
(function () {
  // Monthly data points: M1 through M36
  var months = [];
  for (var i = 1; i <= 36; i++) months.push("M" + i);

  // Hand Layup: ~€32,333/mo (€388K / 12)
  var hlMonthly = 388000 / 12;
  // AFP-XS gross: €72K in Y1, then ~€42K/yr for Y2+Y3 (subscription only)
  // Y1: 72K over 12 months
  // Y2: 42K/yr → 3500/mo
  // Y3: same
  // AFP-XS net: ~€0 each month (savings offset)

  var hlData = [],
    xsGrossData = [],
    xsNetData = [];
  var hlCum = 0,
    xsGrossCum = 0;

  for (var m = 1; m <= 36; m++) {
    hlCum += hlMonthly;
    hlData.push(Math.round(hlCum));

    // Y1: setup costs spread across first year + subscription
    // Gross: 72K total Y1, then 3500/mo thereafter
    if (m <= 12) {
      xsGrossCum += 72000 / 12;
    } else {
      xsGrossCum += 3500;
    }
    xsGrossData.push(Math.round(xsGrossCum));

    // Net: savings ~€6,400/mo offset (76,800/yr), so net ≈ 0
    xsNetData.push(0);
  }

  var commonTooltip = {
    backgroundColor: "#ffffff",
    titleColor: "#bf3425",
    bodyColor: "#1e293b",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    padding: 12,
    displayColors: true,
    callbacks: {
      label: function (ctx) {
        var v = ctx.parsed.y;
        if (v === 0) return ctx.dataset.label + ": ~€0";
        return ctx.dataset.label + ": €" + v.toLocaleString("en-EU");
      },
    },
  };

  var ctx = document.getElementById("afp36mChart").getContext("2d");

  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Hand Layup",
          data: hlData,
          borderColor: "#9d9d9c",
          backgroundColor: "rgba(157,157,156,0.06)",
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
          fill: false,
          tension: 0.1,
        },
        {
          label: "AFP-XS (gross)",
          data: xsGrossData,
          borderColor: "#bf3425",
          backgroundColor: "rgba(191,52,37,0.05)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          fill: false,
          tension: 0.1,
        },
        {
          label: "AFP-XS (net, w/ savings)",
          data: xsNetData,
          borderColor: "#47577c",
          backgroundColor: "rgba(71,87,124,0.04)",
          borderWidth: 2,
          borderDash: [5, 4],
          pointRadius: 0,
          pointHoverRadius: 5,
          fill: false,
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1400,
        easing: "easeInOutQuart",
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#94a3b8",
            font: { size: 11 },
            maxTicksLimit: 7,
            callback: function (val, idx) {
              var labels = ["M1", "M6", "M12", "M18", "M24", "M30", "M36"];
              var indices = [0, 5, 11, 17, 23, 29, 35];
              return indices.indexOf(idx) !== -1 ? months[idx] : "";
            },
          },
        },
        y: {
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#94a3b8",
            font: { size: 11 },
            callback: function (v) {
              if (v >= 1000000) return "€" + (v / 1000000).toFixed(1) + "M";
              if (v >= 1000) return "€" + (v / 1000).toFixed(0) + "K";
              return "€" + v;
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#475569",
            font: { family: "Inter", size: 12, weight: "600" },
            usePointStyle: true,
            pointStyle: "line",
            boxWidth: 24,
          },
        },
        tooltip: commonTooltip,
      },
    },
  });

  // IntersectionObserver
  var container = document.getElementById("afp36mContainer");
  var tableEl = document.getElementById("afp36mTable");
  var calloutsEl = document.getElementById("afp36mCallouts");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-36m-visible");

        setTimeout(function () {
          tableEl.classList.add("afp-36m-tbl-visible");
        }, 600);
        setTimeout(function () {
          calloutsEl.classList.add("afp-36m-tbl-visible");
        }, 800);
      });
    },
    { threshold: 0.1 },
  );

  obs.observe(container);
})();
//    <!-- INFOGRAPHIC 7: Rework Cost Anatomy -->
(function () {
  var TOTAL = 1240;

  var items = [
    {
      label: "Defective part material",
      note: "written off",
      value: 400,
      color: "#bf3425",
    },
    {
      label: "Re-layup (repeat cycle)",
      note: null,
      value: 350,
      color: "#47577c",
    },
    {
      label: "Disassembly + analysis labour",
      note: null,
      value: 150,
      color: "#7a8fb5",
    },
    {
      label: "Schedule impact buffer",
      note: "downstream delays",
      value: 200,
      color: "#d4614f",
    },
    {
      label: "Re-kitting + preparation",
      note: null,
      value: 80,
      color: "#9d9d9c",
    },
    {
      label: "Re-inspection + sign-off",
      note: null,
      value: 60,
      color: "#b8bec8",
    },
  ];

  // Sort descending for visual impact
  items.sort(function (a, b) {
    return b.value - a.value;
  });

  var maxVal = items[0].value;
  var MAX_PCT = 88;

  function fmt(v) {
    return "€" + v.toLocaleString("en-EU");
  }

  var chart = document.getElementById("afpNcrChart");
  var tooltip = document.getElementById("afpNcrTooltip");
  var tipTitle = document.getElementById("afpNcrTipTitle");
  var tipValue = document.getElementById("afpNcrTipValue");
  var tipPct = document.getElementById("afpNcrTipPct");

  items.forEach(function (item, i) {
    var pct = (item.value / maxVal) * MAX_PCT;

    var row = document.createElement("div");
    row.className = "afp-ncr-row";
    row.style.transitionDelay = i * 75 + "ms";

    var noteHtml = item.note
      ? '<div class="afp-ncr-label-note">' + item.note + "</div>"
      : "";

    row.innerHTML =
      '<div class="afp-ncr-label-wrap">' +
      '<div class="afp-ncr-label">' +
      item.label +
      "</div>" +
      noteHtml +
      "</div>" +
      '<div class="afp-ncr-track">' +
      '<div class="afp-ncr-bar" data-target="' +
      pct +
      '" style="background:' +
      item.color +
      ';width:0">' +
      "</div>" +
      '<span class="afp-ncr-bar-pct">' +
      Math.round((item.value / TOTAL) * 100) +
      "%</span>" +
      "</div>" +
      '<div class="afp-ncr-value">' +
      fmt(item.value) +
      "</div>";

    chart.appendChild(row);

    var bar = row.querySelector(".afp-ncr-bar");
    var valEl = row.querySelector(".afp-ncr-value");
    var pctEl = row.querySelector(".afp-ncr-bar-pct");

    bar._valEl = valEl;
    bar._pctEl = pctEl;

    bar.addEventListener("mouseenter", function () {
      tipTitle.textContent = item.label;
      tipValue.textContent = fmt(item.value);
      tipPct.textContent =
        ((item.value / TOTAL) * 100).toFixed(1) + "% of total NCR cost";
      tooltip.style.display = "block";
    });
    bar.addEventListener("mousemove", function (e) {
      tooltip.style.left = e.clientX + 14 + "px";
      tooltip.style.top = e.clientY - 48 + "px";
    });
    bar.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
  });

  // Intersection Observer
  var container = document.getElementById("afpNcrContainer");
  var dividerEl = document.getElementById("afpNcrDivider");
  var totalEl = document.getElementById("afpNcrTotal");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-ncr-visible");

        var rows = chart.querySelectorAll(".afp-ncr-row");
        rows.forEach(function (row, i) {
          setTimeout(
            function () {
              row.classList.add("afp-ncr-row-visible");
              var bar = row.querySelector(".afp-ncr-bar");
              var valEl = row.querySelector(".afp-ncr-value");
              var pctEl = row.querySelector(".afp-ncr-bar-pct");
              if (bar) {
                bar.style.width = bar.dataset.target + "%";
                setTimeout(function () {
                  if (valEl) valEl.classList.add("afp-ncr-val-visible");
                  if (pctEl) pctEl.classList.add("afp-ncr-pct-visible");
                }, 540);
              }
            },
            100 + i * 85,
          );
        });

        var base = 100 + rows.length * 85 + 100;
        setTimeout(function () {
          dividerEl.classList.add("afp-ncr-row-visible");
        }, base);
        setTimeout(function () {
          totalEl.classList.add("afp-ncr-row-visible");
        }, base + 180);
      });
    },
    { threshold: 0.12 },
  );

  obs.observe(container);
})();
//   <!-- INFOGRAPHIC 8: Composites Labour Market Trend -->
(function () {
  var items = [
    { year: "2015", pct: 12, projected: false },
    { year: "2018", pct: 15, projected: false },
    { year: "2021", pct: 19, projected: false },
    { year: "2024", pct: 23, projected: false },
    { year: "2027", pct: 28, projected: true },
  ];

  var maxPct = 28;
  var MAX_PCT = 90;

  // Colour gradient: lighter navy → full navy → red tint for projected
  var colors = ["#7a8fb5", "#5e72a0", "#47577c", "#3a4a6b", "#bf3425"];

  var chart = document.getElementById("afpLmtChart");
  var axisEl = document.getElementById("afpLmtAxis");
  var callout = document.getElementById("afpLmtCallout");
  var tooltip = document.getElementById("afpLmtTooltip");
  var tipTitle = document.getElementById("afpLmtTipTitle");
  var tipValue = document.getElementById("afpLmtTipValue");
  var tipNote = document.getElementById("afpLmtTipNote");

  items.forEach(function (item, i) {
    var pct = (item.pct / maxPct) * MAX_PCT;
    var color = colors[i];

    var row = document.createElement("div");
    row.className = "afp-lmt-row";
    row.style.transitionDelay = i * 90 + "ms";

    var projTag = item.projected
      ? '<span class="afp-lmt-projected-tag">projected</span>'
      : "";

    row.innerHTML =
      '<div class="afp-lmt-year">' +
      item.year +
      "</div>" +
      '<div class="afp-lmt-track">' +
      '<div class="afp-lmt-bar' +
      (item.projected ? " afp-lmt-bar-projected" : "") +
      '" ' +
      'data-target="' +
      pct +
      '" style="background:' +
      color +
      ';width:0">' +
      '<span class="afp-lmt-pct-label">+' +
      item.pct +
      "%" +
      (item.projected ? " projected" : "") +
      "</span>" +
      "</div>" +
      "</div>";

    chart.appendChild(row);

    var bar = row.querySelector(".afp-lmt-bar");
    var label = row.querySelector(".afp-lmt-pct-label");

    bar.addEventListener("mouseenter", function () {
      tipTitle.textContent = item.year + " skill premium";
      tipValue.textContent = "+" + item.pct + "%";
      tipNote.textContent = item.projected
        ? "Projected figure (illustrative)"
        : "vs. general manufacturing worker wage";
      tooltip.style.display = "block";
    });
    bar.addEventListener("mousemove", function (e) {
      tooltip.style.left = e.clientX + 14 + "px";
      tooltip.style.top = e.clientY - 48 + "px";
    });
    bar.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
  });

  // IntersectionObserver
  var container = document.getElementById("afpLmtContainer");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-lmt-visible");

        var rows = chart.querySelectorAll(".afp-lmt-row");
        rows.forEach(function (row, i) {
          setTimeout(
            function () {
              row.classList.add("afp-lmt-row-visible");
              var bar = row.querySelector(".afp-lmt-bar");
              var label = row.querySelector(".afp-lmt-pct-label");
              if (bar) {
                bar.style.width = bar.dataset.target + "%";
                setTimeout(function () {
                  if (label) label.classList.add("afp-lmt-lbl-visible");
                }, 560);
              }
            },
            100 + i * 90,
          );
        });

        var base = 100 + rows.length * 90 + 80;
        setTimeout(function () {
          axisEl.classList.add("afp-lmt-row-visible");
        }, base);
        setTimeout(function () {
          callout.classList.add("afp-lmt-row-visible");
        }, base + 180);
      });
    },
    { threshold: 0.12 },
  );

  obs.observe(container);
})();
// <!-- INFOGRAPHIC 9: Floor Space Cost by System Type -->
(function () {
  var tooltip = document.getElementById("afpFsTooltip");
  var tipTitle = document.getElementById("afpFsTipTitle");
  var tipValue = document.getElementById("afpFsTipValue");
  var tipNote = document.getElementById("afpFsTipNote");

  function addTooltip(bar, title, value, note) {
    bar.addEventListener("mouseenter", function () {
      tipTitle.textContent = title;
      tipValue.textContent = value;
      tipNote.textContent = note;
      tooltip.style.display = "block";
    });
    bar.addEventListener("mousemove", function (e) {
      tooltip.style.left = e.clientX + 14 + "px";
      tooltip.style.top = e.clientY - 48 + "px";
    });
    bar.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
  }

  addTooltip(
    document.getElementById("afpFsBarLegacy"),
    "Legacy AFP Cell",
    "€28,800 / yr",
    "200 m² × €12/m²/mo × 12 months",
  );
  addTooltip(
    document.getElementById("afpFsBarXs"),
    "AFP-XS (standard bay)",
    "€4,320 / yr",
    "30 m² × €12/m²/mo × 12 months",
  );

  // Build floor area chip grids
  function buildChips(containerId, count, color, savedCount) {
    var el = document.getElementById(containerId);
    for (var i = 0; i < count; i++) {
      var chip = document.createElement("div");
      chip.className = "afp-fs-chip";
      chip.style.background = i < savedCount ? "rgba(191,52,37,0.18)" : color;
      chip.style.transitionDelay = i * 12 + "ms";
      if (savedCount && i < savedCount) {
        chip.title = "Wasted floor space";
      }
      el.appendChild(chip);
    }
  }

  // Legacy: 200 chips — 170 "wasted vs AFP-XS" shown in faint red, 30 "used"
  buildChips("afpFsChipsLegacy", 40, "#9d9d9c", 34); // 40 chips scaled: 34 = wasted, 6 = used
  buildChips("afpFsChipsXs", 6, "#47577c", 0); // 6 chips, all "used"

  // Intersection Observer
  var container = document.getElementById("afpFsContainer");
  var cardLegacy = document.getElementById("afpFsCardLegacy");
  var cardXs = document.getElementById("afpFsCardXs");
  var savingEl = document.getElementById("afpFsSaving");
  var fiveyrEl = document.getElementById("afpFs5yr");
  var barLegacy = document.getElementById("afpFsBarLegacy");
  var barXs = document.getElementById("afpFsBarXs");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-fs-visible");

        // Legacy card
        setTimeout(function () {
          cardLegacy.classList.add("afp-fs-card-visible");
          barLegacy.style.width = barLegacy.dataset.target + "%";
          setTimeout(function () {
            barLegacy
              .querySelector(".afp-fs-bar-label")
              .classList.add("afp-fs-lbl-visible");
            // Animate chips
            var chips = document.querySelectorAll(
              "#afpFsChipsLegacy .afp-fs-chip",
            );
            chips.forEach(function (c, i) {
              setTimeout(function () {
                c.style.opacity = "1";
              }, i * 12);
            });
          }, 600);
        }, 150);

        // AFP-XS card
        setTimeout(function () {
          cardXs.classList.add("afp-fs-card-visible");
          barXs.style.width = barXs.dataset.target + "%";
          setTimeout(function () {
            barXs
              .querySelector(".afp-fs-bar-label")
              .classList.add("afp-fs-lbl-visible");
            var chips = document.querySelectorAll("#afpFsChipsXs .afp-fs-chip");
            chips.forEach(function (c, i) {
              setTimeout(function () {
                c.style.opacity = "1";
              }, i * 40);
            });
          }, 600);
        }, 340);

        setTimeout(function () {
          savingEl.classList.add("afp-fs-card-visible");
        }, 640);
        setTimeout(function () {
          fiveyrEl.classList.add("afp-fs-card-visible");
        }, 840);
      });
    },
    { threshold: 0.12 },
  );

  obs.observe(container);
})();
//   <!-- INFOGRAPHIC 10: Time-to-Production Comparison -->
(function () {
  var foregoneItems = [
    { period: "6 months", months: 6, value: 150000, pct: 33 },
    { period: "12 months", months: 12, value: 300000, pct: 66 },
    { period: "18 months", months: 18, value: 450000, pct: 100 },
  ];

  // Build foregone rows
  var foreRows = document.getElementById("afpTtpForeRows");
  foregoneItems.forEach(function (item, i) {
    var row = document.createElement("div");
    row.className = "afp-ttp-foregone-row";
    row.style.transitionDelay = i * 80 + "ms";

    var colors = ["rgba(191,52,37,0.45)", "rgba(191,52,37,0.65)", "#bf3425"];

    row.innerHTML =
      '<div class="afp-ttp-foregone-period">' +
      item.period +
      " gap</div>" +
      '<div class="afp-ttp-foregone-track">' +
      '<div class="afp-ttp-foregone-bar" data-target="' +
      item.pct +
      '" style="background:' +
      colors[i] +
      ';width:0">' +
      '<span class="afp-ttp-bar-inner-lbl">' +
      item.months +
      " × €25K</span>" +
      "</div>" +
      "</div>" +
      '<div class="afp-ttp-foregone-val">€' +
      item.value / 1000 +
      "K foregone</div>";

    foreRows.appendChild(row);
  });

  // IntersectionObserver
  var container = document.getElementById("afpTtpContainer");
  var rowLegacy = document.getElementById("afpTtpRowLegacy");
  var rowXs = document.getElementById("afpTtpRowXs");
  var lineLegacy = document.getElementById("afpTtpLineLegacy");
  var lineXs = document.getElementById("afpTtpLineXs");
  var headLegacy = document.getElementById("afpTtpHeadLegacy");
  var headXs = document.getElementById("afpTtpHeadXs");
  var durLegacy = document.getElementById("afpTtpDurLegacy");
  var durXs = document.getElementById("afpTtpDurXs");
  var fpLegacy = document.getElementById("afpTtpFpLegacy");
  var fpXs = document.getElementById("afpTtpFpXs");
  var gapShade = document.getElementById("afpTtpGapShade");
  var dividerEl = document.getElementById("afpTtpDivider");
  var foreLabelEl = document.getElementById("afpTtpForeLabel");
  var warningEl = document.getElementById("afpTtpWarning");
  var trackLegacy = document.getElementById("afpTtpTrackLegacy");
  var trackXs = document.getElementById("afpTtpTrackXs");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-ttp-visible");

        // Legacy row
        setTimeout(function () {
          rowLegacy.classList.add("afp-ttp-row-visible");
          var trackW = trackLegacy.offsetWidth;
          var targetPx = trackW * 0.85;
          lineLegacy.style.width = targetPx + "px";
          setTimeout(function () {
            headLegacy.style.left = targetPx + "px";
            headLegacy.style.opacity = "1";
            durLegacy.classList.add("afp-ttp-lbl-visible");
            fpLegacy.classList.add("afp-ttp-lbl-visible");
            gapShade.classList.add("afp-ttp-lbl-visible");
          }, 700);
        }, 150);

        // AFP-XS row
        setTimeout(function () {
          rowXs.classList.add("afp-ttp-row-visible");
          var trackW = trackXs.offsetWidth;
          var targetPx = trackW * 0.22;
          lineXs.style.width = targetPx + "px";
          setTimeout(function () {
            headXs.style.left = targetPx + "px";
            headXs.style.opacity = "1";
            durXs.classList.add("afp-ttp-lbl-visible");
            fpXs.classList.add("afp-ttp-lbl-visible");
          }, 700);
        }, 400);

        // Divider + label
        setTimeout(function () {
          dividerEl.classList.add("afp-ttp-row-visible");
        }, 900);
        setTimeout(function () {
          foreLabelEl.classList.add("afp-ttp-row-visible");
        }, 1020);

        // Foregone rows
        var foreRowEls = foreRows.querySelectorAll(".afp-ttp-foregone-row");
        foreRowEls.forEach(function (row, i) {
          setTimeout(
            function () {
              row.classList.add("afp-ttp-row-visible");
              var bar = row.querySelector(".afp-ttp-foregone-bar");
              var valEl = row.querySelector(".afp-ttp-foregone-val");
              var lbl = row.querySelector(".afp-ttp-bar-inner-lbl");
              if (bar) {
                bar.style.width = bar.dataset.target + "%";
                setTimeout(function () {
                  if (valEl) valEl.classList.add("afp-ttp-lbl-visible");
                  if (lbl) lbl.classList.add("afp-ttp-lbl-visible");
                }, 520);
              }
            },
            1100 + i * 100,
          );
        });

        setTimeout(function () {
          warningEl.classList.add("afp-ttp-row-visible");
        }, 1500);
      });
    },
    { threshold: 0.1 },
  );

  obs.observe(container);
})();
//  <!-- INFOGRAPHIC 11: Three Numbers -->
(function () {
  var container = document.getElementById("afpFrpContainer");

  var sec1 = document.getElementById("afpFrpSec1");
  var sec2 = document.getElementById("afpFrpSec2");
  var sec3 = document.getElementById("afpFrpSec3");

  var pbVis = document.getElementById("afpFrpPbVis");
  var pbXs = document.getElementById("afpFrpPbXs");
  var pbLeg = document.getElementById("afpFrpPbLeg");

  var bullets = [
    ["afpFrpB1a", "afpFrpB1b"],
    ["afpFrpB2a", "afpFrpB2b", "afpFrpB2c", "afpFrpB2d"],
    ["afpFrpB3a", "afpFrpB3b", "afpFrpB3c"],
  ];

  function revealBullets(sectionBullets, baseDelay) {
    sectionBullets.forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("afp-frp-blt-visible");
        },
        baseDelay + i * 80,
      );
    });
  }

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-frp-visible");

        // Sec 1
        setTimeout(function () {
          sec1.classList.add("afp-frp-sec-visible");
          pbVis.classList.add("afp-frp-blt-visible");
          pbXs.style.width = pbXs.dataset.target + "%";
          pbLeg.style.width = pbLeg.dataset.target + "%";
          revealBullets(bullets[0], 400);
        }, 150);

        // Sec 2
        setTimeout(function () {
          sec2.classList.add("afp-frp-sec-visible");
          revealBullets(bullets[1], 300);
        }, 380);

        // Sec 3
        setTimeout(function () {
          sec3.classList.add("afp-frp-sec-visible");
          revealBullets(bullets[2], 300);
        }, 600);
      });
    },
    { threshold: 0.1 },
  );

  obs.observe(container);
})();
//   <!-- INFOGRAPHIC 12: Buyer's Checklist -->
(function () {
  var data = {
    tco: [
      "What is the all-in Year 1 cost (machine + install + training)?",
      "What does the annual maintenance contract cost after Year 1?",
      "What are the software licence and annual upgrade fees?",
      "What is the published scrap/rework benchmark for my material type?",
      "What is the typical material waste rate vs. my current process?",
    ],
    cap: [
      "How long from PO to first production part?",
      "What floor space and facility modifications are required?",
      "Can the system handle multiple material types without re-tooling?",
      "Is the programming software open or proprietary?",
      "Who owns the process knowledge (tow paths, material databases)?",
    ],
    risk: [
      "What happens to my process data if we change vendors?",
      "What is your support response SLA for production-down situations?",
      "What is the upgrade path if my production volumes change?",
      "Who are your current reference customers at similar scale?",
    ],
  };

  var TOTAL = data.tco.length + data.cap.length + data.risk.length;
  var checked = 0;

  function updateProgress() {
    document.getElementById("afpDdqProgressCount").textContent =
      checked + " / " + TOTAL;
    var pct = (checked / TOTAL) * 100;
    document.getElementById("afpDdqProgressFill").style.width = pct + "%";
  }

  function buildItems(items, containerId) {
    var container = document.getElementById(containerId);
    items.forEach(function (text, i) {
      var item = document.createElement("div");
      item.className = "afp-ddq-item";
      item.style.transitionDelay = i * 60 + "ms";
      item.innerHTML =
        '<div class="afp-ddq-checkbox"></div>' +
        '<div class="afp-ddq-item-text">' +
        text +
        "</div>";

      item.addEventListener("click", function () {
        if (item.classList.contains("afp-ddq-checked")) {
          item.classList.remove("afp-ddq-checked");
          checked = Math.max(0, checked - 1);
        } else {
          item.classList.add("afp-ddq-checked");
          checked++;
        }
        updateProgress();
      });

      container.appendChild(item);
    });
  }

  buildItems(data.tco, "afpDdqItemsTco");
  buildItems(data.cap, "afpDdqItemsCap");
  buildItems(data.risk, "afpDdqItemsRisk");

  // Reset
  document.getElementById("afpDdqReset").addEventListener("click", function () {
    document.querySelectorAll(".afp-ddq-item").forEach(function (el) {
      el.classList.remove("afp-ddq-checked");
    });
    checked = 0;
    updateProgress();
  });

  // IntersectionObserver
  var container = document.getElementById("afpDdqContainer");
  var progressEl = document.getElementById("afpDdqProgressWrap");
  var sec1 = document.getElementById("afpDdqSecTco");
  var sec2 = document.getElementById("afpDdqSecCap");
  var sec3 = document.getElementById("afpDdqSecRisk");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-ddq-visible");

        setTimeout(function () {
          progressEl.classList.add("afp-ddq-visible-el");
        }, 150);

        [
          [sec1, "afpDdqItemsTco", 280],
          [sec2, "afpDdqItemsCap", 460],
          [sec3, "afpDdqItemsRisk", 620],
        ].forEach(function (tuple) {
          var sec = tuple[0],
            itemsId = tuple[1],
            delay = tuple[2];
          setTimeout(function () {
            sec.classList.add("afp-ddq-sec-visible");
            var items = document.querySelectorAll(
              "#" + itemsId + " .afp-ddq-item",
            );
            items.forEach(function (item, i) {
              setTimeout(function () {
                item.classList.add("afp-ddq-item-visible");
              }, i * 60);
            });
          }, delay);
        });
      });
    },
    { threshold: 0.08 },
  );

  obs.observe(container);
})();
//   <!-- INFOGRAPHIC 13: Decision Framework -->
(function () {
  var volumes = [
    {
      range: "Under 200 kg/yr",
      hint: "Low-volume / prototyping",
      theme: "hand",
      icon: "🤚",
      title: "Hand Layup likely optimal at this scale",
      body: "AFP capital expenditure is difficult to justify below 200 kg/yr. Hand layup remains cost-effective. Revisit AFP when volumes grow or quality requirements tighten.",
    },
    {
      range: "200 – 2,000 kg/yr",
      hint: "Small-series / development",
      theme: "xs",
      icon: "✅",
      title: "AFP-XS on subscription is the primary candidate",
      body: "ROI typically positive in Year 1. Low entry cost, ~30 m² footprint, and open AddPath software make AFP-XS the natural fit for this volume band.",
    },
    {
      range: "2,000 – 20,000 kg/yr",
      hint: "Mid-volume production",
      theme: "multi",
      icon: "📈",
      title: "AFP-XS (multiple cells) or small-footprint AFP with leasing",
      body: "At this scale, consider deploying multiple AFP-XS cells in parallel, or evaluate compact gantry systems with leasing arrangements. Run a full TCO model before committing.",
    },
    {
      range: "Over 20,000 kg/yr",
      hint: "High-volume / industrial",
      theme: "legac",
      icon: "🏗️",
      title: "Legacy AFP or high-throughput multi-tow systems",
      body: "Throughput demands at this scale may justify legacy AFP or multi-tow gantry CapEx. Evaluate with a full 5-year TCO model including maintenance, floor space, and labour.",
    },
  ];

  var grid = document.getElementById("afpSgVolGrid");
  var resultEl = document.getElementById("afpSgResult");
  var iconEl = document.getElementById("afpSgResultIcon");
  var titleEl = document.getElementById("afpSgResultTitle");
  var bodyEl = document.getElementById("afpSgResultBody");
  var filtersEl = document.getElementById("afpSgFilters");
  var btns = [];

  volumes.forEach(function (vol, i) {
    var btn = document.createElement("div");
    btn.className = "afp-sg-vol-btn";
    btn.style.transitionDelay = i * 70 + "ms";
    btn.innerHTML =
      '<div class="afp-sg-vol-range">' +
      vol.range +
      "</div>" +
      '<div class="afp-sg-vol-hint">' +
      vol.hint +
      "</div>";

    btn.addEventListener("click", function () {
      btns.forEach(function (b) {
        b.classList.remove("afp-sg-selected");
      });
      btn.classList.add("afp-sg-selected");
      showResult(vol);
    });

    grid.appendChild(btn);
    btns.push(btn);
  });

  function showResult(vol) {
    // Hide then swap
    resultEl.classList.remove("afp-sg-result-anim");
    resultEl.className =
      "afp-sg-result afp-sg-result-show afp-sg-result-" + vol.theme;

    iconEl.textContent = vol.icon;
    titleEl.textContent = vol.title;
    bodyEl.textContent = vol.body;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        resultEl.classList.add("afp-sg-result-anim");
      });
    });

    // Show filters
    filtersEl.classList.add("afp-sg-filters-show");
    setTimeout(function () {
      filtersEl.classList.add("afp-sg-filters-anim");
      ["afpSgFg1", "afpSgFg2", "afpSgFg3"].forEach(function (id, i) {
        setTimeout(function () {
          document.getElementById(id).classList.add("afp-sg-fg-visible");
        }, i * 100);
      });
    }, 80);
  }

  // Filter option hover activate
  document.querySelectorAll(".afp-sg-filter-opt").forEach(function (opt) {
    opt.addEventListener("click", function () {
      var siblings = opt.parentNode.querySelectorAll(".afp-sg-filter-opt");
      siblings.forEach(function (s) {
        s.classList.remove("afp-sg-opt-active");
      });
      opt.classList.add("afp-sg-opt-active");
    });
  });

  // IntersectionObserver
  var container = document.getElementById("afpSgContainer");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-sg-visible");
        var buttons = grid.querySelectorAll(".afp-sg-vol-btn");
        buttons.forEach(function (b, i) {
          setTimeout(
            function () {
              b.classList.add("afp-sg-btn-visible");
            },
            150 + i * 70,
          );
        });
      });
    },
    { threshold: 0.1 },
  );
  obs.observe(container);
})();
//   <!-- INFOGRAPHIC 14: Decision Summary -->
(function () {
  /* winner: 'xs' | 'hl' | 'tie' */
  var rows = [
    {
      label: "3-year total cost",
      hl: { text: "~€1.16M", type: "bad" },
      xs: { text: "~€126K gross", type: "good" },
      winner: "xs",
      tip: "3-year gross cost difference: ~€1.03M in favour of AFP-XS",
    },
    {
      label: "3-year net (w/ savings)",
      hl: { text: "—", type: "neutral" },
      xs: { text: "~€0 or better", type: "good" },
      winner: "xs",
      tip: "Material savings offset AFP-XS subscription from Month 1",
    },
    {
      label: "CapEx required",
      hl: { text: "None", type: "good" },
      xs: { text: "None", type: "good" },
      winner: "tie",
      tip: "Both options require zero upfront capital expenditure",
    },
    {
      label: "Balance sheet risk",
      hl: { text: "None", type: "good" },
      xs: { text: "None", type: "good" },
      winner: "tie",
      tip: "Neither option creates a depreciating asset on the balance sheet",
    },
    {
      label: "Scrap rate",
      hl: { text: "15 – 30%", type: "bad" },
      xs: { text: "2 – 5%", type: "good" },
      winner: "xs",
      tip: "AFP-XS automated placement reduces scrap by up to 6×",
    },
    {
      label: "Material waste",
      hl: { text: "20 – 40%", type: "bad" },
      xs: { text: "< 6%", type: "good" },
      winner: "xs",
      tip: "Precision deposition cuts fibre waste by up to 7× vs hand layup",
    },
    {
      label: "Operator skill floor",
      hl: { text: "High", type: "bad" },
      xs: { text: "Low-medium", type: "good" },
      winner: "xs",
      tip: "AFP-XS requires lower operator skill, reducing training cost and churn risk",
    },
    {
      label: "Software lock-in",
      hl: { text: "N/A", type: "neutral" },
      xs: { text: "None (open)", type: "good" },
      winner: "xs",
      tip: "AddPath is an open, vendor-agnostic software platform",
    },
    {
      label: "Time to first part",
      hl: { text: "Today", type: "good" },
      xs: { text: "4 – 8 weeks", type: "ok" },
      winner: "hl",
      tip: "Hand layup requires no setup; AFP-XS typically 4–8 weeks from PO to first part",
    },
  ];

  var body = document.getElementById("afpDsBody");
  var tooltip = document.getElementById("afpDsTooltip");
  var tipTitle = document.getElementById("afpDsTipTitle");
  var tipBody = document.getElementById("afpDsTipBody");

  rows.forEach(function (row, i) {
    var el = document.createElement("div");
    el.className = "afp-ds-row";
    el.style.transitionDelay = i * 65 + "ms";

    function badge(d) {
      return (
        '<span class="afp-ds-badge afp-ds-badge-' +
        d.type +
        '">' +
        d.text +
        "</span>"
      );
    }

    // Winner dot indicator
    var hlWin = row.winner === "hl" ? " ◀" : "";
    var xsWin = row.winner === "xs" ? " ◀" : "";

    el.innerHTML =
      '<div class="afp-ds-cell">' +
      row.label +
      "</div>" +
      '<div class="afp-ds-cell afp-ds-cell-hl">' +
      badge(row.hl) +
      "</div>" +
      '<div class="afp-ds-cell afp-ds-cell-xs">' +
      badge(row.xs) +
      "</div>";

    // Tooltip on row hover
    el.addEventListener("mouseenter", function (e) {
      tipTitle.textContent = row.label;
      tipBody.textContent = row.tip;
      tooltip.style.display = "block";
    });
    el.addEventListener("mousemove", function (e) {
      tooltip.style.left = e.clientX + 14 + "px";
      tooltip.style.top = e.clientY - 46 + "px";
    });
    el.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });

    body.appendChild(el);
  });

  // IntersectionObserver
  var container = document.getElementById("afpDsContainer");
  var scoreEl = document.getElementById("afpDsScore");
  var scoreHl = document.getElementById("afpDsScoreHl");
  var scoreXs = document.getElementById("afpDsScoreXs");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        container.classList.add("afp-ds-visible");

        var rowEls = body.querySelectorAll(".afp-ds-row");
        rowEls.forEach(function (r, i) {
          setTimeout(
            function () {
              r.classList.add("afp-ds-row-visible");
            },
            120 + i * 65,
          );
        });

        var scoreDelay = 120 + rowEls.length * 65 + 140;
        setTimeout(function () {
          scoreEl.classList.add("afp-ds-row-visible");
          setTimeout(function () {
            scoreHl.style.width = scoreHl.dataset.target + "%";
            scoreXs.style.width = scoreXs.dataset.target + "%";
          }, 200);
        }, scoreDelay);
      });
    },
    { threshold: 0.08 },
  );

  obs.observe(container);
})();
