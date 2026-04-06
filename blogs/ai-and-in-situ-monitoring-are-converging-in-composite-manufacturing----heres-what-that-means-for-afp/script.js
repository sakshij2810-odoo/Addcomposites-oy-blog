/* ============================================
   AI & IN-SITU MONITORING AFP BLOG — JAVASCRIPT
   Sidebar Navigation, Infographics & Interactive Features
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

  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    scrollTimeout = window.requestAnimationFrame(highlightActiveSection);
  });
  highlightActiveSection();

  // ─── Smooth Scrolling for Sidebar Links ─────────────────────────────────────
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
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        navLinks.forEach(function (l) {
          l.classList.remove("active");
        });
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

  // ─── Close Menu Button ───────────────────────────────────────────────────────
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

  // Close sidebar on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
  });

  // ─── Card Animations (IntersectionObserver) ──────────────────────────────────
  var cardObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 },
  );

  document.querySelectorAll(".learn-more-card").forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    cardObserver.observe(el);
  });

  // ─── Image Hover Effects ─────────────────────────────────────────────────────
  document
    .querySelectorAll(".full-width-image, .split-image img")
    .forEach(function (img) {
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
  var btn = document.createElement("button");
  btn.innerHTML = "↑";
  btn.setAttribute("aria-label", "Scroll back to top");
  btn.style.cssText = [
    "position:fixed",
    "bottom:30px",
    "right:30px",
    "width:48px",
    "height:48px",
    "background:linear-gradient(135deg,#bf3425 0%,#9d2a1e 100%)",
    "color:#fff",
    "border:none",
    "border-radius:50%",
    "cursor:pointer",
    "font-size:20px",
    "font-weight:bold",
    "opacity:0",
    "visibility:hidden",
    "transition:all 0.3s ease",
    "z-index:1000",
    "box-shadow:0 4px 15px rgba(191,52,37,0.3)",
  ].join(";");
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)";
    this.style.boxShadow = "0 8px 25px rgba(191,52,37,0.4)";
  });
  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 15px rgba(191,52,37,0.3)";
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(btn);
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      btn.style.opacity = "1";
      btn.style.visibility = "visible";
    } else {
      btn.style.opacity = "0";
      btn.style.visibility = "hidden";
    }
  });

  // ─── Reading Progress Bar ────────────────────────────────────────────────────
  var bar = document.createElement("div");
  bar.style.cssText = [
    "position:fixed",
    "top:0",
    "left:0",
    "height:3px",
    "background:linear-gradient(90deg,#bf3425,#47577c)",
    "z-index:9999",
    "transition:width 0.1s linear",
    "width:0%",
  ].join(";");
  document.body.appendChild(bar);
  window.addEventListener("scroll", function () {
    var winH = window.innerHeight;
    var docH = document.documentElement.scrollHeight - winH;
    bar.style.width = (window.scrollY / docH) * 100 + "%";
  });

  // ─── Universal Reveal Observer ───────────────────────────────────────────────
  var revealPrefixes = ["ims-", "pts-", "sfh-", "cla-", "dta-", "tdc-"];
  var revealSelectors = revealPrefixes
    .map(function (p) {
      return "." + p + "reveal";
    })
    .join(", ");
  var revealEls = document.querySelectorAll(revealSelectors);

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
    // Dual-trigger: also check if already in viewport on load
    setTimeout(function () {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
        revealObserver.unobserve(el);
      }
    }, 100);
  });

  // ─── INFOGRAPHIC 2: Predicted vs Actual Tensile Strength (Chart.js) ──────────
  (function () {
    var canvas = document.getElementById("pts-chart");
    if (!canvas || typeof Chart === "undefined") return;
    var ctx = canvas.getContext("2d");

    // Perfect prediction line points
    var perfLine = [
      { x: 500, y: 500 },
      { x: 3500, y: 3500 },
    ];

    // Carbon fiber data (high strength 1800–3500 MPa)
    var carbonData = [
      { x: 2200, y: 2350 },
      { x: 2600, y: 2540 },
      { x: 2900, y: 2820 },
      { x: 3100, y: 3050 },
      { x: 3300, y: 3210 },
      { x: 2500, y: 2620 },
      { x: 3000, y: 2970 },
      { x: 3400, y: 3380 },
      { x: 2800, y: 2790 },
    ];
    // Kevlar data (1400–2500 MPa)
    var kevlarData = [
      { x: 1400, y: 1450 },
      { x: 1700, y: 1680 },
      { x: 2000, y: 1950 },
      { x: 2200, y: 2170 },
      { x: 1900, y: 1920 },
      { x: 1600, y: 1640 },
      { x: 2100, y: 2040 },
      { x: 1800, y: 1760 },
    ];
    // Glass data (800–1500 MPa)
    var glassData = [
      { x: 800, y: 820 },
      { x: 1000, y: 980 },
      { x: 1100, y: 1080 },
      { x: 1300, y: 1260 },
      { x: 1450, y: 1410 },
      { x: 950, y: 975 },
      { x: 1200, y: 1230 },
      { x: 1050, y: 1010 },
    ];

    new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Perfect Prediction (R²=1.0)",
            data: perfLine,
            type: "line",
            borderColor: "#1e293b",
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 0,
          },
          {
            label: "Carbon fiber",
            data: carbonData,
            backgroundColor: "rgba(71,87,124,0.85)",
            borderColor: "#47577c",
            pointRadius: 7,
            pointHoverRadius: 10,
            order: 1,
          },
          {
            label: "Kevlar",
            data: kevlarData,
            backgroundColor: "rgba(191,52,37,0.85)",
            borderColor: "#bf3425",
            pointRadius: 7,
            pointStyle: "rectRot",
            pointHoverRadius: 10,
            order: 2,
          },
          {
            label: "Glass fiber",
            data: glassData,
            backgroundColor: "rgba(157,157,156,0.85)",
            borderColor: "#9d9d9c",
            pointRadius: 7,
            pointStyle: "rect",
            pointHoverRadius: 10,
            order: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: { mode: "nearest", axis: "xy", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#bf3425",
            bodyColor: "#334155",
            borderColor: "#e2e8f0",
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function (ctx) {
                if (ctx.datasetIndex === 0) return null;
                return (
                  ctx.dataset.label +
                  ": Actual " +
                  ctx.parsed.x +
                  " MPa → Predicted " +
                  ctx.parsed.y +
                  " MPa"
                );
              },
            },
          },
        },
        scales: {
          x: {
            type: "linear",
            min: 400,
            max: 3600,
            title: {
              display: true,
              text: "Actual Tensile Strength (MPa)",
              font: { family: "Assistant", size: 13, weight: "600" },
              color: "#64748b",
            },
            grid: { color: "#f1f5f9" },
            ticks: { color: "#64748b", font: { family: "Assistant" } },
          },
          y: {
            type: "linear",
            min: 400,
            max: 3600,
            title: {
              display: true,
              text: "Predicted Tensile Strength (MPa)",
              font: { family: "Assistant", size: 13, weight: "600" },
              color: "#64748b",
            },
            grid: { color: "#f1f5f9" },
            ticks: { color: "#64748b", font: { family: "Assistant" } },
          },
        },
      },
    });
  })();

  // ─── INFOGRAPHIC 6: Training Dataset Composition (Chart.js) ─────────────────
  (function () {
    var canvas = document.getElementById("tdc-chart");
    if (!canvas || typeof Chart === "undefined") return;
    var ctx = canvas.getContext("2d");

    var chartDrawn = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !chartDrawn) {
            chartDrawn = true;
            new Chart(ctx, {
              type: "bar",
              data: {
                labels: ['"Good" Layup (95%)', "Defective (5%)"],
                datasets: [
                  {
                    data: [9500, 500],
                    backgroundColor: [
                      "rgba(71,87,124,0.85)",
                      "rgba(191,52,37,0.85)",
                    ],
                    borderColor: ["#47577c", "#bf3425"],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "#fff",
                    titleColor: "#bf3425",
                    bodyColor: "#334155",
                    borderColor: "#e2e8f0",
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                      label: function (ctx) {
                        return "Samples: " + ctx.parsed.y.toLocaleString();
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: {
                      color: "#64748b",
                      font: { family: "Assistant", size: 13, weight: "600" },
                    },
                  },
                  y: {
                    min: 0,
                    max: 10000,
                    title: {
                      display: true,
                      text: "Number of Samples",
                      font: { family: "Assistant", size: 13, weight: "600" },
                      color: "#64748b",
                    },
                    grid: { color: "#f1f5f9" },
                    ticks: {
                      color: "#64748b",
                      font: { family: "Assistant" },
                      callback: function (v) {
                        return v.toLocaleString();
                      },
                    },
                  },
                },
                animation: {
                  duration: 1000,
                  easing: "easeOutQuart",
                },
              },
            });
            observer.unobserve(canvas);
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(canvas);

    // Dual-trigger
    setTimeout(function () {
      var rect = canvas.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && !chartDrawn) {
        observer.disconnect();
        // trigger immediately
        var fakeEntry = [{ isIntersecting: true, target: canvas }];
        // re-call
        chartDrawn = true;
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ['"Good" Layup (95%)', "Defective (5%)"],
            datasets: [
              {
                data: [9500, 500],
                backgroundColor: [
                  "rgba(71,87,124,0.85)",
                  "rgba(191,52,37,0.85)",
                ],
                borderColor: ["#47577c", "#bf3425"],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#fff",
                titleColor: "#bf3425",
                bodyColor: "#334155",
                borderColor: "#e2e8f0",
                borderWidth: 1,
                padding: 10,
                callbacks: {
                  label: function (ctx) {
                    return "Samples: " + ctx.parsed.y.toLocaleString();
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  color: "#64748b",
                  font: { family: "Assistant", size: 13, weight: "600" },
                },
              },
              y: {
                min: 0,
                max: 10000,
                title: {
                  display: true,
                  text: "Number of Samples",
                  font: { family: "Assistant", size: 13, weight: "600" },
                  color: "#64748b",
                },
                grid: { color: "#f1f5f9" },
                ticks: {
                  color: "#64748b",
                  font: { family: "Assistant" },
                  callback: function (v) {
                    return v.toLocaleString();
                  },
                },
              },
            },
          },
        });
      }
    }, 200);
  })();
}); // end DOMContentLoaded
