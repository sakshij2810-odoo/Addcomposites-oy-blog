/* ============================================
   THERMOPLASTIC AFP BLOG — JAVASCRIPT
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

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });

        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Close sidebar on mobile after link click
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

  // Close sidebar when clicking outside of it on mobile
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
//   <!-- INFOGRAPHIC 1: THERMOSET vs. THERMOPLASTIC — PHASE BEHAVIOUR -->
(function () {
  var els = document.querySelectorAll(".tpvts-reveal");
  if (!els.length) return;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  els.forEach(function (el) {
    observer.observe(el);
  });
})();
//    <!-- INFOGRAPHIC 2: Thermoplastic Matrix Comparison for AFP. Table comparing PA12, PA6, PPS, PEI (Ultem), PAEK, PEEK, PEKK by Tg (°C), Tm (°C), AFP process temperature, and key characteristic. Temperature range from 220°C (PA12) up to 420°C (PEEK/PEKK). Note amorphous polymers soften above Tg without distinct melt point. -->
(function () {
  /* ── Scroll-reveal ── */
  var revealEls = document.querySelectorAll(".tpmc-reveal");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
          /* Animate bars inside this element once visible */
          entry.target
            .querySelectorAll(".tpmc-bar-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 80);
            });
          entry.target
            .querySelectorAll(".tpmc-bar-range[data-l]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.left = bar.getAttribute("data-l") + "%";
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 80);
            });
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
//  INFOGRAPHIC 3: In-Situ Consolidation
(function () {
  var els = document.querySelectorAll(".isc-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 4
(function () {
  var els = document.querySelectorAll(".hsc-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".hsc-score-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 100);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 5
(function () {
  var els = document.querySelectorAll(".tah-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".tah-temp-bar-fill[data-h]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.height = bar.getAttribute("data-h") + "%";
              }, 120);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 6
(function () {
  var els = document.querySelectorAll(".twm-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".twm-cmp-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 120);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 7
(function () {
  var els = document.querySelectorAll(".trf-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 8
(function () {
  var els = document.querySelectorAll(".rpc-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".rpc-metric-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 120);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 9
(function () {
  var els = document.querySelectorAll(".eol-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".eol-value-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 120);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 10
(function () {
  var els = document.querySelectorAll(".vcb-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          /* single bars */
          e.target
            .querySelectorAll(".vcb-bar-single[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 100);
            });
          /* range bars */
          e.target
            .querySelectorAll(".vcb-bar-range[data-l]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.left = bar.getAttribute("data-l") + "%";
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 100);
            });
          /* timeline fill */
          e.target
            .querySelectorAll(".vcb-tl-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 150);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 11
(function () {
  var els = document.querySelectorAll(".crc-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".crc-gauge-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 100);
            });
          e.target
            .querySelectorAll(".crc-sch-bar[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 100);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 12
(function () {
  /* Position the reference line at €80 = 40% along the first .tpc-bar-track */
  function positionRefLine() {
    var firstTrack = document.querySelector(".tpc-bar-track");
    var refLine = document.querySelector(".tpc-ref-line");
    var refLabel = document.querySelector(".tpc-ref-label");
    if (!firstTrack || !refLine) return;
    var rect = firstTrack.getBoundingClientRect();
    var chartRect = document
      .querySelector(".tpc-chart")
      .getBoundingClientRect();
    var leftPx = rect.left - chartRect.left + rect.width * 0.4;
    refLine.style.left = leftPx + "px";
    refLabel.style.left = leftPx + 4 + "px";
  }
  window.addEventListener("load", positionRefLine);
  window.addEventListener("resize", positionRefLine);

  /* Scroll-reveal + bar animation */
  var els = document.querySelectorAll(".tpc-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".tpc-bar-range[data-l]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.left = bar.getAttribute("data-l") + "%";
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 100);
            });
          /* also trigger bars in already-visible sibling chart block */
          document
            .querySelectorAll(".tpc-bar-range[data-l]")
            .forEach(function (bar) {
              if (!bar.style.width || bar.style.width === "0%") {
                setTimeout(function () {
                  bar.style.left = bar.getAttribute("data-l") + "%";
                  bar.style.width = bar.getAttribute("data-w") + "%";
                }, 100);
              }
            });
          setTimeout(positionRefLine, 200);
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 13
(function () {
  var els = document.querySelectorAll(".qls-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".qls-tl-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 120);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 14
(function () {
  var els = document.querySelectorAll(".fpc-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 15
(function () {
  var els = document.querySelectorAll(".hae-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".hae-cmp-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 120);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
// INFOGRAPHIC 16
(function () {
  /* ── Scroll reveal ── */
  var els = document.querySelectorAll(".adt-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });

  /* ── Time axis: 2020 – 2035, step 0.5 yr ── */
  var years = [];
  for (var y = 2020; y <= 2035; y += 0.5) {
    years.push(y);
  }

  /* Sigmoid helper: smooth S-curve ramp */
  function sig(x, mid, slope, ceiling) {
    return ceiling / (1 + Math.exp(-slope * (x - mid)));
  }

  /* Each sector: centre of ramp, steepness, eventual ceiling (0-100 scale) */
  var sectors = [
    {
      label: "Space / Demonstrators",
      color: "rgba(71,87,124,0.55)",
      border: "rgba(71,87,124,0.7)",
      mid: 2021.5,
      slope: 2.2,
      ceil: 18,
    },
    {
      label: "Aero Primary Structure",
      color: "rgba(71,87,124,0.85)",
      border: "#47577c",
      mid: 2028.5,
      slope: 1.6,
      ceil: 35,
    },
    {
      label: "Aero Secondary + Semi",
      color: "rgba(157,157,156,0.75)",
      border: "#9d9d9c",
      mid: 2025.5,
      slope: 1.8,
      ceil: 55,
    },
    {
      label: "Defence / UAM / eVTOL",
      color: "rgba(191,52,37,0.55)",
      border: "rgba(191,52,37,0.75)",
      mid: 2027.0,
      slope: 1.7,
      ceil: 48,
    },
    {
      label: "Automotive / High-rate EV",
      color: "rgba(191,52,37,0.85)",
      border: "#bf3425",
      mid: 2030.5,
      slope: 2.0,
      ceil: 95,
    },
  ];

  var datasets = sectors.map(function (s) {
    return {
      label: s.label,
      data: years.map(function (y) {
        return sig(y, s.mid, s.slope, s.ceil);
      }),
      backgroundColor: s.color,
      borderColor: s.border,
      borderWidth: 2,
      fill: true,
      tension: 0.5,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: s.border,
    };
  });

  var commonTooltip = {
    backgroundColor: "#ffffff",
    titleColor: "#bf3425",
    bodyColor: "#1e293b",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    padding: 12,
    displayColors: true,
    callbacks: {
      title: function (items) {
        var yr = parseFloat(items[0].label);
        var m = Math.round((yr % 1) * 12);
        return "Year " + Math.floor(yr) + (m > 0 ? " H2" : " H1");
      },
      label: function (item) {
        return (
          " " + item.dataset.label + ": " + Math.round(item.raw) + " (index)"
        );
      },
    },
  };

  new Chart(document.getElementById("adtChart"), {
    type: "line",
    data: {
      labels: years,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      scales: {
        x: {
          type: "linear",
          min: 2020,
          max: 2035,
          ticks: {
            stepSize: 1,
            color: "#64748b",
            font: { size: 11, weight: "600" },
            callback: function (val) {
              /* only show integer years */
              return Number.isInteger(val) ? val : "";
            },
          },
          grid: { color: "#f1f5f9" },
          title: { display: false },
        },
        y: {
          min: 0,
          max: 100,
          ticks: {
            color: "#94a3b8",
            font: { size: 10 },
            callback: function (val) {
              var labels = {
                0: "Zero",
                20: "Low",
                40: "Medium",
                60: "High",
                80: "Very High",
                100: "Mass",
              };
              return labels[val] !== undefined ? labels[val] : "";
            },
            stepSize: 20,
          },
          grid: { color: "#f1f5f9" },
          title: {
            display: true,
            text: "Production Volume (indicative index)",
            color: "#94a3b8",
            font: { size: 10, weight: "600" },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: commonTooltip,
        /* "We are here" vertical line via annotation-less approach — drawn via chartArea */
      },
      animation: {
        duration: 1200,
        easing: "easeInOutQuart",
      },
    },
  });
})();
// INFOGRAPHIC 17
(function () {
  var els = document.querySelectorAll(".ds25-reveal");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
          e.target
            .querySelectorAll(".ds25-score-fill[data-w]")
            .forEach(function (bar) {
              setTimeout(function () {
                bar.style.width = bar.getAttribute("data-w") + "%";
              }, 120);
            });
        }
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
