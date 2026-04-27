/* ============================================
   CFRT BLOG — JAVASCRIPT
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
    ".full-width-image, .split-image img, figure img",
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
// <!-- INFOGRAPHIC 1 PLACEHOLDER -->
(function () {
  var root = document.getElementById("tvtp-root");
  var rows = document.querySelectorAll(".tvtp-row");
  var wh = document.getElementById("tvtp-wh");
  var barsAnimated = false;

  function animateBars() {
    if (barsAnimated) return;
    barsAnimated = true;
    document.querySelectorAll(".tvtp-bar-fill").forEach(function (bar) {
      var w = bar.getAttribute("data-w");
      setTimeout(function () {
        bar.style.width = w + "%";
      }, 200);
    });
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el === root) {
          rows.forEach(function (row, i) {
            setTimeout(function () {
              row.classList.add("tvtp-visible");
            }, i * 70);
          });
          setTimeout(
            function () {
              wh.classList.add("tvtp-visible");
            },
            rows.length * 70 + 100,
          );
          animateBars();
        }
      });
    },
    { threshold: 0.15 },
  );

  io.observe(root);

  // Fallback: trigger immediately if already in view
  setTimeout(function () {
    var rect = root.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      rows.forEach(function (row, i) {
        setTimeout(function () {
          row.classList.add("tvtp-visible");
        }, i * 70);
      });
      setTimeout(
        function () {
          wh.classList.add("tvtp-visible");
        },
        rows.length * 70 + 100,
      );
      animateBars();
    }
  }, 300);
})();
// <!-- INFOGRAPHIC 2 PLACEHOLDER -->
(function () {
  var root = document.getElementById("cfrt-tl-root");
  var events = document.querySelectorAll(".cfrt-tl-event");
  var rvbanner = document.getElementById("cfrt-tl-rvbanner");

  function reveal() {
    events.forEach(function (ev, i) {
      var delay = parseInt(ev.getAttribute("data-delay")) || 0;
      setTimeout(function () {
        ev.classList.add("cfrt-tl-visible");
      }, delay);
    });
    setTimeout(function () {
      rvbanner.classList.add("cfrt-tl-visible");
    }, 700);
  }

  var triggered = false;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          reveal();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(root);

  // Fallback
  setTimeout(function () {
    if (!triggered) {
      var rect = root.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        triggered = true;
        reveal();
      }
    }
  }, 400);
})();
//  <!-- INFOGRAPHIC 3 PLACEHOLDER -->
(function () {
  // x = processing temp (°C), y = performance score (1–10)
  var materials = [
    {
      name: "PP",
      x: 170,
      y: 1.5,
      temp: "170–200°C",
      tg: "Tm: 160–180°C",
      cost: "$2–5/kg",
      tier: "Commodity",
      color: "#9d9d9c",
      r: 10,
      apps: "Automotive exteriors, orthopedic devices",
    },
    {
      name: "PA6 / PA12",
      x: 240,
      y: 3.2,
      temp: "240–280°C",
      tg: "Tm: 210–270°C",
      cost: "$2–5/kg",
      tier: "Engineering",
      color: "#9d9d9c",
      r: 11,
      apps: "Automotive structures, pressure vessels (H₂ storage — PA12)",
    },
    {
      name: "PEI",
      x: 310,
      y: 5.4,
      temp: "300–350°C",
      tg: "Tg: ~220°C",
      cost: "$15–25/kg",
      tier: "High",
      color: "#7a8daa",
      r: 11,
      apps: "Aerospace interiors — flame, smoke & toxicity qualification",
    },
    {
      name: "PPS",
      x: 330,
      y: 5.8,
      temp: "320–360°C",
      tg: "Tm: 280–290°C",
      cost: "$5–15/kg",
      tier: "High",
      color: "#7a8daa",
      r: 12,
      apps: "Aerospace primary & secondary structures, injection moulding",
    },
    {
      name: "LMPAEK",
      x: 340,
      y: 7.6,
      temp: "330–370°C",
      tg: "Tm: 270–290°C",
      cost: "$150–200/kg",
      tier: "Ultra-High",
      color: "#bf3425",
      r: 13,
      apps: "Aerospace AFP — accessible PAEK entry point, MFFD demonstrator",
    },
    {
      name: "PEKK",
      x: 370,
      y: 8.6,
      temp: "360–400°C",
      tg: "Tm: 305–360°C",
      cost: ">$200/kg",
      tier: "Ultra-High",
      color: "#bf3425",
      r: 13,
      apps: "Aerospace primary structures, demanding structural parts",
    },
    {
      name: "PEEK",
      x: 390,
      y: 9.3,
      temp: "370–420°C",
      tg: "Tm: 343°C",
      cost: "$100–150/kg",
      tier: "Ultra-High",
      color: "#47577c",
      r: 15,
      apps: "Aerospace primary structures, pressure vessels, high-temp applications",
    },
  ];

  // Tier band definitions: y ranges
  var tierBands = [
    { label: "Commodity", yMin: 0, yMax: 2.5, bg: "rgba(230,232,238,0.18)" },
    {
      label: "Engineering",
      yMin: 2.5,
      yMax: 4.5,
      bg: "rgba(210,216,230,0.18)",
    },
    { label: "High", yMin: 4.5, yMax: 7.0, bg: "rgba(180,192,214,0.16)" },
    { label: "Ultra-High", yMin: 7.0, yMax: 10.5, bg: "rgba(71,87,124,0.07)" },
  ];

  var tierBandsPlugin = {
    id: "tierBands",
    beforeDraw: function (chart) {
      var ctx = chart.ctx;
      var yAxis = chart.scales.y;
      var xAxis = chart.scales.x;
      tierBands.forEach(function (band) {
        var yTop = yAxis.getPixelForValue(band.yMax);
        var yBottom = yAxis.getPixelForValue(band.yMin);
        var xLeft = xAxis.left;
        var xRight = xAxis.right;
        ctx.save();
        ctx.fillStyle = band.bg;
        ctx.fillRect(xLeft, yTop, xRight - xLeft, yBottom - yTop);
        // Tier label on left edge
        ctx.font = "600 9px Inter, sans-serif";
        ctx.fillStyle = "rgba(100,116,139,0.6)";
        ctx.letterSpacing = "1px";
        ctx.textAlign = "left";
        ctx.fillText(
          band.label.toUpperCase(),
          xLeft + 5,
          (yTop + yBottom) / 2 + 4,
        );
        ctx.restore();
      });
    },
  };

  var canvas = document.getElementById("tms-canvas");
  var tooltip = document.getElementById("tms-tooltip");
  var wrap = document.getElementById("tms-chart-wrap");

  var chart = new Chart(canvas, {
    type: "bubble",
    plugins: [tierBandsPlugin],
    data: {
      datasets: materials.map(function (m) {
        return {
          label: m.name,
          data: [{ x: m.x, y: m.y, r: m.r }],
          backgroundColor: m.color + "cc",
          borderColor: m.color,
          borderWidth: 2,
          hoverBackgroundColor: m.color,
          hoverBorderWidth: 3,
        };
      }),
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 900,
        easing: "easeOutCubic",
      },
      scales: {
        x: {
          min: 130,
          max: 440,
          title: {
            display: true,
            text: "Processing Temperature (°C)  →  Higher",
            color: "#64748b",
            font: { size: 11, weight: "600" },
          },
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#9d9d9c",
            font: { size: 10 },
            callback: function (v) {
              return v + "°C";
            },
          },
        },
        y: {
          min: 0,
          max: 10.5,
          title: {
            display: true,
            text: "↑  Performance Tier",
            color: "#64748b",
            font: { size: 11, weight: "600" },
          },
          grid: { color: "#f1f5f9" },
          ticks: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      onHover: function (evt, elements) {
        canvas.style.cursor = elements.length ? "pointer" : "default";
        if (!elements.length) {
          tooltip.classList.remove("visible");
          return;
        }
        var idx = elements[0].datasetIndex;
        var m = materials[idx];
        document.getElementById("tms-tt-name").textContent = m.name;
        document.getElementById("tms-tt-temp").textContent = m.temp;
        document.getElementById("tms-tt-tg").textContent = m.tg;
        document.getElementById("tms-tt-cost").textContent = m.cost;
        document.getElementById("tms-tt-tier").textContent = m.tier;
        document.getElementById("tms-tt-apps").textContent = m.apps;

        // Position tooltip
        var rect = wrap.getBoundingClientRect();
        var canRect = canvas.getBoundingClientRect();
        var point = elements[0].element;
        var px = point.x + (canRect.left - rect.left);
        var py = point.y + (canRect.top - rect.top);

        var ttW = 220,
          ttH = 150;
        var left = px + 14;
        var top = py - 60;
        if (left + ttW > rect.width) left = px - ttW - 14;
        if (top < 0) top = 8;
        if (top + ttH > rect.height) top = rect.height - ttH - 8;

        tooltip.style.left = left + "px";
        tooltip.style.top = top + "px";
        tooltip.classList.add("visible");
      },
    },
  });

  // Draw material name labels on chart after render
  var labelPlugin = {
    id: "materialLabels",
    afterDatasetsDraw: function (chart) {
      var ctx = chart.ctx;
      materials.forEach(function (m, i) {
        var ds = chart.getDatasetMeta(i);
        if (!ds.data.length) return;
        var pt = ds.data[0];
        var offsetX = m.name === "PEEK" ? 16 : m.name === "PEKK" ? -42 : 16;
        var offsetY =
          m.name === "PA6 / PA12" ? -14 : m.name === "PEI" ? 14 : -14;
        ctx.save();
        ctx.font = "700 11px Inter, sans-serif";
        ctx.fillStyle = m.color;
        ctx.textAlign = offsetX > 0 ? "left" : "right";
        ctx.fillText(m.name, pt.x + offsetX, pt.y + offsetY);
        ctx.restore();
      });
    },
  };
  Chart.register(labelPlugin);
  chart.update();

  // Scroll reveal
  var root = document.getElementById("tms-root");
  var apps = document.getElementById("tms-apps");
  var triggered = false;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !triggered) {
          triggered = true;
          root.classList.add("tms-in");
          setTimeout(function () {
            apps.classList.add("tms-visible");
          }, 500);
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(root);
  setTimeout(function () {
    if (!triggered) {
      var r = root.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        triggered = true;
        root.classList.add("tms-in");
        setTimeout(function () {
          apps.classList.add("tms-visible");
        }, 500);
      }
    }
  }, 400);
})();
//   <!-- INFOGRAPHIC 4 PLACEHOLDER -->
(function () {
  var root = document.getElementById("cfam-root");
  var allCards = root.querySelectorAll(".cfam-card");
  var spectrum = document.getElementById("cfam-spectrum");
  var perfBar = document.getElementById("cfam-perf-bar");
  var formBar = document.getElementById("cfam-form-bar");
  var triggered = false;

  function reveal() {
    allCards.forEach(function (card) {
      var delay = parseInt(card.getAttribute("data-delay")) || 0;
      setTimeout(function () {
        card.classList.add("cfam-visible");
      }, delay);
    });
    setTimeout(function () {
      spectrum.classList.add("cfam-visible");
      setTimeout(function () {
        perfBar.style.width = "78%";
        formBar.style.width = "78%";
      }, 100);
    }, 320);
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !triggered) {
          triggered = true;
          reveal();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(root);

  setTimeout(function () {
    if (!triggered) {
      var r = root.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        triggered = true;
        reveal();
      }
    }
  }, 400);
})();
//   <!-- INFOGRAPHIC 5 PLACEHOLDER -->
(function () {
  var root = document.getElementById("cfdt-root");
  var rq = document.getElementById("cfdt-rq");
  var connSvg = document.getElementById("cfdt-connector-svg");
  var branches = root.querySelectorAll(".cfdt-branch");
  var triggered = false;

  function reveal() {
    rq.classList.add("cfdt-vis");
    setTimeout(function () {
      connSvg.style.opacity = "1";
    }, 200);
    branches.forEach(function (b) {
      var delay = parseInt(b.getAttribute("data-delay")) || 0;
      setTimeout(function () {
        b.classList.add("cfdt-vis");
      }, delay);
    });
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !triggered) {
          triggered = true;
          reveal();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(root);

  setTimeout(function () {
    if (!triggered) {
      var r = root.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        triggered = true;
        reveal();
      }
    }
  }, 400);
})();
//  <!-- INFOGRAPHIC 6 PLACEHOLDER -->
(function () {
  var root = document.getElementById("wmc-root");
  var cards = root.querySelectorAll(".wmc-card");
  var compare = document.getElementById("wmc-compare");
  var triggered = false;

  function reveal() {
    cards.forEach(function (c) {
      var d = parseInt(c.getAttribute("data-delay")) || 0;
      setTimeout(function () {
        c.classList.add("wmc-vis");
      }, d);
    });
    setTimeout(function () {
      compare.classList.add("wmc-vis");
    }, 500);
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !triggered) {
          triggered = true;
          reveal();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(root);

  setTimeout(function () {
    if (!triggered) {
      var r = root.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        triggered = true;
        reveal();
      }
    }
  }, 400);
})();
//   <!-- INFOGRAPHIC 7 PLACEHOLDER -->
(function () {
  var root = document.getElementById("isc-root");
  var cols = root.querySelectorAll(".isc-col");
  var specs = document.getElementById("isc-specs");
  var footnote = document.getElementById("isc-footnote");
  var speedBar = document.getElementById("isc-speed-bar");
  var accBar = document.getElementById("isc-acc-bar");
  var triggered = false;

  function reveal() {
    cols.forEach(function (col) {
      var d = parseInt(col.getAttribute("data-delay")) || 0;
      setTimeout(function () {
        col.classList.add("isc-vis");
        // stagger items inside
        col.querySelectorAll(".isc-item").forEach(function (item) {
          var id = parseInt(item.getAttribute("data-item-delay")) || 0;
          setTimeout(function () {
            item.classList.add("isc-item-vis");
          }, id);
        });
      }, d);
    });
    setTimeout(function () {
      specs.classList.add("isc-vis");
      speedBar.style.width = speedBar.getAttribute("data-w") + "%";
      accBar.style.width = accBar.getAttribute("data-w") + "%";
    }, 300);
    setTimeout(function () {
      footnote.classList.add("isc-vis");
    }, 550);
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !triggered) {
          triggered = true;
          reveal();
        }
      });
    },
    { threshold: 0.1 },
  );
  io.observe(root);

  setTimeout(function () {
    if (!triggered) {
      var r = root.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        triggered = true;
        reveal();
      }
    }
  }, 400);
})();
