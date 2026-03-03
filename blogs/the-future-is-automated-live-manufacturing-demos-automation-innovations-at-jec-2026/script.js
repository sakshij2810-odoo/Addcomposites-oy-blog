/* ============================================
   AUTOMATION BLOG - JAVASCRIPT
   Sidebar Navigation, Progress Bar, Back to Top,
   Mobile Navigation & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");
  const sidebar = document.querySelector(".blog-sidebar");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const backToTopBtn = document.getElementById("backToTop");
  const progressBar = document.getElementById("readingProgress");

  // ============================================
  // Reading Progress Bar
  // ============================================
  function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  }

  // ============================================
  // Back to Top Button
  // ============================================
  function updateBackToTop() {
    if (backToTopBtn) {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");

      // Toggle hamburger to X icon
      if (sidebar.classList.contains("active")) {
        mobileToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      } else {
        mobileToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    });
  }

  // ============================================
  // Sidebar Active Section Highlighting
  // ============================================
  function highlightActiveSection() {
    let scrollPosition = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // ============================================
  // Scroll Event Handler (throttled)
  // ============================================
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function () {
      highlightActiveSection();
      updateProgressBar();
      updateBackToTop();
    });
  });

  // Initial calls
  highlightActiveSection();
  updateProgressBar();
  updateBackToTop();

  // ============================================
  // Smooth Scrolling for Sidebar Links
  // ============================================
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerOffset = 40;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update active state immediately
        navLinks.forEach(function (l) {
          l.classList.remove("active");
        });
        this.classList.add("active");

        // Close mobile sidebar if open
        if (sidebar && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
          if (mobileToggle) {
            mobileToggle.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            `;
          }
        }
      }
    });
  });

  // ============================================
  // Scroll-Triggered Animations (IntersectionObserver)
  // ============================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Animate cards and interactive elements
  const animatedElements = document.querySelectorAll(
    ".stat-card, .learn-more-card, .feature-item, .spec-card, .highlight-box, .blockquote-card, .key-question",
  );

  animatedElements.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // ============================================
  // Image Hover Effects
  // ============================================
  const images = document.querySelectorAll(
    ".full-width-image, .split-image img",
  );
  images.forEach(function (img) {
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

  // ============================================
  // Table Row Hover Highlight
  // ============================================
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach(function (row) {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f1f5f9";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });
});
//    <!-- Infographic Placeholder 1 -->
(function () {
  var tips = {
    hopperA: {
      title: "Hopper A — Primary Resin",
      body: 'Feeds the <span class="lsam-tooltip-highlight">primary thermoplastic pellets</span> (e.g. ABS, PETG, PPS) into the extruder. Gravity-fed with capacity for continuous long-run prints.',
    },
    hopperB: {
      title: "Hopper B — Secondary Resin",
      body: 'Enables <span class="lsam-tooltip-highlight">dual-material printing</span> — blending reinforcement (carbon-fiber filled compounds) or switching materials mid-print for functional grading.',
    },
    extruder: {
      title: "High-Output Extruder",
      body: 'Single-screw extruder rated to <span class="lsam-tooltip-highlight">450 °F (232 °C)</span>. Capable of depositing up to 500 lb/hr of polymer melt with precise bead geometry control.',
    },
    gantry: {
      title: "Gantry Motion System (X/Y/Z)",
      body: 'Precision 3-axis gantry with <span class="lsam-tooltip-highlight">±0.005″ repeatability</span>. Moves the print head across the full 5′ × 10′ build envelope at speeds up to 800 in/min.',
    },
    table: {
      title: "Moving Table — 5′ × 10′",
      body: 'Heated vacuum table providing <span class="lsam-tooltip-highlight">uniform thermal contact</span> and part hold-down. Supports near-net-shape molds, tooling, and large structural parts.',
    },
  };

  var tooltip = document.getElementById("lsamTooltip");
  var tooltipTitle = document.getElementById("lsamTooltipTitle");
  var tooltipBody = document.getElementById("lsamTooltipBody");
  var wrap = document.getElementById("lsamSvgWrap");

  var components = document.querySelectorAll(".lsam-component");

  components.forEach(function (el) {
    el.addEventListener("mouseenter", function (e) {
      var key = el.getAttribute("data-lsam-tip");
      if (!tips[key]) return;
      tooltipTitle.textContent = tips[key].title;
      tooltipBody.innerHTML = tips[key].body;
      tooltip.classList.add("lsam-tooltip-visible");
      positionTooltip(e);
    });

    el.addEventListener("mousemove", function (e) {
      positionTooltip(e);
    });

    el.addEventListener("mouseleave", function () {
      tooltip.classList.remove("lsam-tooltip-visible");
    });
  });

  function positionTooltip(e) {
    var rect = wrap.getBoundingClientRect();
    var x = e.clientX - rect.left + 16;
    var y = e.clientY - rect.top - 10;
    if (x + 270 > rect.width) x = e.clientX - rect.left - 275;
    if (y + 120 > rect.height) y = e.clientY - rect.top - 100;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
})();
// <!-- Infographic Placeholder 2 -->
(function () {
  var volumes = [10, 25, 50, 100, 150, 250, 500, 750, 1000];

  /* Manual layup: starts cheap at low vol but stays relatively flat (labor-dominated) */
  var manualCost = [4800, 4500, 4200, 3900, 3700, 3500, 3300, 3200, 3100];

  /* AFP/Automated: high fixed cost amortised → steep drop, then flattens below manual */
  var afpCost = [18000, 10000, 6200, 4200, 3700, 2600, 1800, 1400, 1100];

  new Chart(document.getElementById("lsamCrossoverChart"), {
    type: "line",
    data: {
      labels: volumes,
      datasets: [
        {
          label: "Manual Layup",
          data: manualCost,
          borderColor: "#9d9d9c",
          backgroundColor: "rgba(157, 157, 156, 0.08)",
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: "#9d9d9c",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointHoverBackgroundColor: "#7a7a79",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 3,
          fill: false,
          tension: 0.35,
          borderDash: [8, 4],
        },
        {
          label: "AFP / Automated",
          data: afpCost,
          borderColor: "#bf3425",
          backgroundColor: "rgba(191, 52, 37, 0.06)",
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: "#bf3425",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointHoverBackgroundColor: "#a82c1f",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 3,
          fill: false,
          tension: 0.35,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Annual Production Volume (parts)",
            color: "#47577c",
            font: { size: 13, weight: "600" },
          },
          grid: { color: "#f1f5f9" },
          ticks: { color: "#64748b", font: { weight: "500" } },
        },
        y: {
          title: {
            display: true,
            text: "Cost Per Part ($)",
            color: "#47577c",
            font: { size: 13, weight: "600" },
          },
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#64748b",
            font: { weight: "500" },
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
          },
          beginAtZero: false,
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#475569",
            font: { family: "Inter, sans-serif", weight: "600", size: 12 },
            usePointStyle: true,
            pointStyleWidth: 18,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#47577c",
          bodyColor: "#1e293b",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          padding: 14,
          displayColors: true,
          titleFont: { weight: "700", size: 13 },
          bodyFont: { size: 12 },
          callbacks: {
            title: function (items) {
              return items[0].label + " parts / year";
            },
            label: function (context) {
              var label = context.dataset.label || "";
              var val = "$" + context.parsed.y.toLocaleString();
              return " " + label + ":  " + val;
            },
            afterBody: function (items) {
              var manual = items[0] ? items[0].parsed.y : null;
              var afp = items[1] ? items[1].parsed.y : null;
              if (manual !== null && afp !== null) {
                var diff = manual - afp;
                if (diff > 0) {
                  return "\n  AFP saves $" + diff.toLocaleString() + "/part";
                } else if (diff < 0) {
                  return (
                    "\n  Manual saves $" +
                    Math.abs(diff).toLocaleString() +
                    "/part"
                  );
                } else {
                  return "\n  ≈ Crossover point";
                }
              }
              return "";
            },
          },
        },
        annotation: {
          annotations: {
            crossoverLine: {
              type: "line",
              xMin: 4,
              xMax: 4,
              borderColor: "#47577c",
              borderWidth: 2,
              borderDash: [6, 4],
              label: {
                display: true,
                content: "Crossover ≈ 150 parts",
                position: "start",
                backgroundColor: "#47577c",
                color: "#ffffff",
                font: { size: 11, weight: "600" },
                padding: { top: 4, bottom: 4, left: 8, right: 8 },
                borderRadius: 4,
                yAdjust: -10,
              },
            },
            manualZone: {
              type: "box",
              xMin: -0.5,
              xMax: 4,
              backgroundColor: "rgba(157, 157, 156, 0.04)",
              borderWidth: 0,
            },
            afpZone: {
              type: "box",
              xMin: 4,
              xMax: 9,
              backgroundColor: "rgba(191, 52, 37, 0.03)",
              borderWidth: 0,
            },
          },
        },
      },
    },
  });
})();
//    <!-- Infographic Placeholder 3 -->
(function () {
  var tips = {
    m1980: {
      title: "1980s — First AFP Gantries",
      body: 'Hercules/Cincinnati Milacron develop the first automated tow-placement gantries. Systems cost <span class="afp-tl-tooltip-highlight">$1–5 M</span>, filling entire factory bays. Only Tier-1 defence primes (Northrop, Lockheed) can justify the investment.',
    },
    m1990: {
      title: "1990s — 787 & A350 Programs",
      body: 'Boeing and Airbus commit to <span class="afp-tl-tooltip-highlight">composite-intensive airframes</span>. AFP becomes the enabling process for fuselage barrels and wing skins, validating the technology at production scale.',
    },
    m2000: {
      title: "2000s — AFP Standard in Aero",
      body: 'AFP is the <span class="afp-tl-tooltip-highlight">default method for large aerostructures</span>. Massive gantry systems from Electroimpact, MTorres, and Coriolis dominate. Market remains limited to high-volume aerospace OEMs.',
    },
    m2010: {
      title: "2010s — Robot AFP Systems",
      body: 'Industrial robot arms (KUKA, Fanuc) are paired with AFP end-effectors, cutting cost and footprint. <span class="afp-tl-tooltip-highlight">Emerging platforms</span> open AFP to automotive, energy, and marine sectors.',
    },
    m2026: {
      title: "2020s–2026 — Accessible AFP for All",
      body: 'Modular, rental-based systems bring AFP to <span class="afp-tl-tooltip-highlight">SMEs at ~€3,500/mo</span>. Open-architecture software and plug-and-play heads eliminate integration barriers. New sectors include sporting goods, construction, and urban air mobility.',
    },
  };

  var tooltip = document.getElementById("afpTlTooltip");
  var tooltipTitle = document.getElementById("afpTlTooltipTitle");
  var tooltipBody = document.getElementById("afpTlTooltipBody");
  var wrap = document.getElementById("afpTlWrap");

  document.querySelectorAll(".afp-tl-milestone").forEach(function (el) {
    el.addEventListener("mouseenter", function (e) {
      var key = el.getAttribute("data-afp-tl-tip");
      if (!tips[key]) return;
      tooltipTitle.textContent = tips[key].title;
      tooltipBody.innerHTML = tips[key].body;
      tooltip.classList.add("afp-tl-tooltip-visible");
      positionTooltip(e);
    });
    el.addEventListener("mousemove", positionTooltip);
    el.addEventListener("mouseleave", function () {
      tooltip.classList.remove("afp-tl-tooltip-visible");
    });
  });

  function positionTooltip(e) {
    var rect = wrap.getBoundingClientRect();
    var x = e.clientX - rect.left + 16;
    var y = e.clientY - rect.top + 16;
    if (x + 260 > rect.width) x = e.clientX - rect.left - 260;
    if (y + 120 > rect.height) y = e.clientY - rect.top - 130;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
})();
//    <!-- Infographic Placeholder 4 -->
(function () {
  var tips = {
    design: {
      title: "01 — Design",
      body: 'CAD geometry & laminate definition. Ply schedules, fibre angles, and stacking sequences are defined using <span class="afp-wf-tooltip-hl">composite design tools</span> (e.g. Fibersim, HyperSizer).',
    },
    pathplan: {
      title: "02 — Path Planning",
      body: 'AddPath generates optimised <span class="afp-wf-tooltip-hl">tow-placement trajectories</span> — managing steered paths, course boundaries, and overlap/gap constraints automatically.',
    },
    simulate: {
      title: "03 — Simulate",
      body: 'Virtual dry-run of the layup: collision checks, <span class="afp-wf-tooltip-hl">reachability analysis</span>, and thermal process simulation ensure manufacturability before any material is placed.',
    },
    robotprog: {
      title: "04 — Robot Programming",
      body: 'Toolpaths are post-processed into <span class="afp-wf-tooltip-hl">native robot code</span> (KRL, RAPID, etc.) with automatic kinematic solutions, singularity avoidance, and axis limits.',
    },
    execute: {
      title: "05 — Execute",
      body: 'The robot executes the program on the shop floor. Real-time <span class="afp-wf-tooltip-hl">process monitoring</span> captures temperature, compaction force, and layup speed.',
    },
    manufacture: {
      title: "06 — Manufacture",
      body: 'Material is deposited layer-by-layer. In-situ consolidation (for thermoplastics) or debulk cycles (for thermosets) ensure <span class="afp-wf-tooltip-hl">laminate integrity</span> at each ply.',
    },
    inspection: {
      title: "07 — Inspection",
      body: 'Automated NDI (laser profilometry, thermography) captures <span class="afp-wf-tooltip-hl">as-built geometry</span> and detects gaps, overlaps, wrinkles, or FOD. Data feeds back into the digital thread.',
    },
    dppqa: {
      title: "08 — DPP / QA",
      body: 'Digital Product Passport aggregates all process data — creating a <span class="afp-wf-tooltip-hl">full traceability record</span> per part. Non-conformances trigger corrective actions back to Design.',
    },
  };

  var tooltip = document.getElementById("afpWfTooltip");
  var tooltipTitle = document.getElementById("afpWfTooltipTitle");
  var tooltipBody = document.getElementById("afpWfTooltipBody");
  var wrap = document.getElementById("afpWfWrap");

  document.querySelectorAll(".afp-wf-node").forEach(function (el) {
    el.addEventListener("mouseenter", function (e) {
      var key = el.getAttribute("data-afp-wf-tip");
      if (!tips[key]) return;
      tooltipTitle.textContent = tips[key].title;
      tooltipBody.innerHTML = tips[key].body;
      tooltip.classList.add("afp-wf-tooltip-visible");
      positionTooltip(e);
    });
    el.addEventListener("mousemove", positionTooltip);
    el.addEventListener("mouseleave", function () {
      tooltip.classList.remove("afp-wf-tooltip-visible");
    });
  });

  function positionTooltip(e) {
    var rect = wrap.getBoundingClientRect();
    var x = e.clientX - rect.left + 16;
    var y = e.clientY - rect.top - 80;
    if (x + 265 > rect.width) x = e.clientX - rect.left - 270;
    if (y < 0) y = e.clientY - rect.top + 20;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
})();
//  <!-- Infographic Placeholder 5 -->
(function () {
  var tips = {
    backbone: {
      title: "SAUBER 4.0 Digital Backbone",
      body: 'Unified data layer co-developed by <span class="sauber-tooltip-hl">Siemens, DLR, and Fraunhofer</span>. Connects every manufacturing step — from fibre layup to final inspection — through a single digital thread with real-time data exchange.',
    },
    preform: {
      title: "Preform Automation — AFP / NCF",
      body: 'Automated fibre placement and non-crimp fabric layup. Produces <span class="sauber-tooltip-hl">net-shape preforms</span> with precise fibre orientation, reducing manual touch labour by up to 80%.',
    },
    smartmold: {
      title: "Smart Mold — RTM + Knowledge Management",
      body: 'Sensor-instrumented RTM tooling with <span class="sauber-tooltip-hl">embedded flow & cure monitoring</span>. The knowledge-management module learns optimal injection parameters from each cycle.',
    },
    inspect: {
      title: "Inspect & QA — Testia",
      body: 'Automated NDI powered by <span class="sauber-tooltip-hl">Testia (Airbus subsidiary)</span>. Combines ultrasonic, thermography, and digital-twin comparison to certify parts against aerospace quality standards.',
    },
    teijin: {
      title: "Teijin Carbon Fibers",
      body: 'Supplies <span class="sauber-tooltip-hl">Tenax™ carbon-fibre materials</span> optimised for AFP processing — including spread-tow fabrics and slit tapes with controlled tack and drapeability.',
    },
    ctc: {
      title: "CTC GmbH (Composite Technology Center)",
      body: 'Airbus-affiliated R&D centre providing <span class="sauber-tooltip-hl">process engineering and scale-up expertise</span> for RTM and infusion technologies in aerostructure production.',
    },
    fraunhofer: {
      title: "Fraunhofer Institutes",
      body: 'Research consortium (IGCV, ITWM) contributing <span class="sauber-tooltip-hl">simulation, AI-based process control, and NDI algorithms</span> that form the intelligence layer of the digital backbone.',
    },
  };

  var tooltip = document.getElementById("sauberTooltip");
  var tooltipTitle = document.getElementById("sauberTooltipTitle");
  var tooltipBody = document.getElementById("sauberTooltipBody");
  var wrap = document.getElementById("sauberWrap");

  var allHoverable = document.querySelectorAll(
    ".sauber-node, .sauber-partner-badge",
  );

  allHoverable.forEach(function (el) {
    el.addEventListener("mouseenter", function (e) {
      var key = el.getAttribute("data-sauber-tip");
      if (!tips[key]) return;
      tooltipTitle.textContent = tips[key].title;
      tooltipBody.innerHTML = tips[key].body;
      tooltip.classList.add("sauber-tooltip-visible");
      positionTooltip(e);
    });
    el.addEventListener("mousemove", positionTooltip);
    el.addEventListener("mouseleave", function () {
      tooltip.classList.remove("sauber-tooltip-visible");
    });
  });

  function positionTooltip(e) {
    var rect = wrap.getBoundingClientRect();
    var x = e.clientX - rect.left + 16;
    var y = e.clientY - rect.top - 80;
    if (x + 275 > rect.width) x = e.clientX - rect.left - 275;
    if (y < 0) y = e.clientY - rect.top + 20;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
})();
