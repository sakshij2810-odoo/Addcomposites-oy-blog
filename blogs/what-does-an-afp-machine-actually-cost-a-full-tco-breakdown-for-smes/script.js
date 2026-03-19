/* ============================================
   AFP TCO BLOG - JAVASCRIPT
   Sidebar Navigation & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------------------
     READING PROGRESS BAR
  ------------------------------------------ */
  const progressBar = document.getElementById("readingProgress");

  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";
  }

  /* ------------------------------------------
     BACK TO TOP BUTTON
  ------------------------------------------ */
  const backToTopBtn = document.getElementById("backToTop");

  function updateBackToTop() {
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

  /* ------------------------------------------
     MOBILE NAVIGATION TOGGLE
  ------------------------------------------ */
  const mobileToggle = document.getElementById("mobileNavToggle");
  const sidebar = document.getElementById("blogSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const closeBtn = document.getElementById("sidebarClose");

  function openSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.add("active");
    overlay.classList.add("active");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
    if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
    // Delay hiding overlay to allow transition
    setTimeout(() => {
      if (!sidebar.classList.contains("active")) {
        overlay.style.display = "none";
      }
    }, 350);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      if (sidebar && sidebar.classList.contains("active")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }

  // Close sidebar on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  /* ------------------------------------------
     SIDEBAR ACTIVE SECTION HIGHLIGHTING
  ------------------------------------------ */
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

  /* ------------------------------------------
     SMOOTH SCROLLING FOR SIDEBAR LINKS
  ------------------------------------------ */
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Close mobile sidebar first
        if (sidebar && sidebar.classList.contains("active")) {
          closeSidebar();
        }

        // Slight delay to let sidebar close before scrolling
        setTimeout(
          () => {
            const headerOffset = 40;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          },
          sidebar && sidebar.classList.contains("active") ? 300 : 0,
        );

        // Update active state immediately
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  /* ------------------------------------------
     THROTTLED SCROLL HANDLER
  ------------------------------------------ */
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    scrollTimeout = window.requestAnimationFrame(function () {
      highlightActiveSection();
      updateProgress();
      updateBackToTop();
    });
  });

  // Initial calls
  highlightActiveSection();
  updateProgress();
  updateBackToTop();

  /* ------------------------------------------
     INTERSECTION OBSERVER - CARD ANIMATIONS
  ------------------------------------------ */
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

  // Elements to animate on scroll into view
  const animatedElements = document.querySelectorAll(
    ".stat-card, .learn-more-card, .feature-item, .cost-reveal-card, .col-card, .filter-card, .reference-item, .checklist-group",
  );

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s`;
    observer.observe(el);
  });

  /* ------------------------------------------
     IMAGE HOVER ENHANCEMENT
  ------------------------------------------ */
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
      this.style.boxShadow = "";
    });
  });

  /* ------------------------------------------
     TABLE ROW HOVER HIGHLIGHT
  ------------------------------------------ */
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f1f5f9";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  /* ------------------------------------------
     INTERACTIVE CHECKLIST ITEMS
  ------------------------------------------ */
  const checkboxes = document.querySelectorAll(".check-box");
  checkboxes.forEach((box) => {
    box.addEventListener("click", function () {
      const item = this.closest(".checklist-item");
      if (item) {
        const isChecked = item.dataset.checked === "true";
        if (isChecked) {
          item.dataset.checked = "false";
          this.textContent = "☐";
          this.style.color = "";
          item.style.textDecoration = "";
          item.style.opacity = "";
        } else {
          item.dataset.checked = "true";
          this.textContent = "☑";
          this.style.color = "#065f46";
          item.style.textDecoration = "line-through";
          item.style.opacity = "0.65";
        }
      }
    });
  });

  /* ------------------------------------------
     HANDLE WINDOW RESIZE
     Close mobile sidebar if resized to desktop
  ------------------------------------------ */
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeSidebar();
    }
  });

  /* ------------------------------------------
     SIDEBAR SCROLL SYNC
     Keep active link visible in desktop sidebar
  ------------------------------------------ */
  function scrollSidebarToActive() {
    if (window.innerWidth <= 768) return;
    const activeLink = document.querySelector(".blog-sidebar-link.active");
    if (activeLink && sidebar) {
      const linkTop = activeLink.offsetTop;
      const sidebarScrollTop = sidebar.scrollTop;
      const sidebarHeight = sidebar.clientHeight;

      if (
        linkTop < sidebarScrollTop ||
        linkTop > sidebarScrollTop + sidebarHeight - 60
      ) {
        sidebar.scrollTo({
          top: linkTop - sidebarHeight / 2 + 30,
          behavior: "smooth",
        });
      }
    }
  }

  // Enhanced scroll handler with sidebar scroll sync
  window.addEventListener("scroll", function () {
    if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    scrollTimeout = window.requestAnimationFrame(function () {
      highlightActiveSection();
      updateProgress();
      updateBackToTop();
      scrollSidebarToActive();
    });
  });
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
