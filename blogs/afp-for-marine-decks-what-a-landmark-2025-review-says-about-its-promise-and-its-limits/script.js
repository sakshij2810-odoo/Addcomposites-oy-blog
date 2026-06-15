/* ============================================
   AFP MARINE DECKS BLOG — JAVASCRIPT
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
//    <!-- INFOGRAPHICS START 1 -->
(function () {
  var data = [
    { label: "Automotive", pct: 31 },
    { label: "Construction", pct: 26 },
    { label: "Marine", pct: 12 },
    { label: "Electronic", pct: 10 },
    { label: "Appliances", pct: 8 },
    { label: "Consumer Goods", pct: 8 },
    { label: "Miscellaneous", pct: 4 },
    { label: "Aerospace", pct: 1 },
  ];

  var maxPct = data[0].pct;

  /* Navy → Red gradient anchored to the two extremes */
  function getColor(pct) {
    if (pct >= 26) return "#47577c";
    if (pct >= 10) return "#6b7ba0";
    if (pct >= 8) return "#9d9d9c";
    if (pct >= 4) return "#b87060";
    return "#bf3425";
  }

  var list = document.getElementById("frpBarList");

  data.forEach(function (item, i) {
    var row = document.createElement("div");
    row.className = "frp-bar-row" + (i === 0 ? " frp-bar-row--top" : "");
    row.setAttribute("data-pct", item.pct);

    var trackWidthPct = (item.pct / maxPct) * 100;
    var color = getColor(item.pct);

    row.innerHTML =
      '<div class="frp-bar-label">' +
      item.label +
      "</div>" +
      '<div class="frp-bar-track">' +
      '<div class="frp-bar-fill" style="background:' +
      color +
      "; --target-w:" +
      trackWidthPct +
      '%">' +
      '<span class="frp-bar-inner-label">' +
      item.label +
      "</span>" +
      "</div>" +
      "</div>" +
      '<div class="frp-bar-pct">' +
      item.pct +
      "%</div>" +
      '<div class="frp-tooltip">' +
      item.pct +
      "% — " +
      item.label +
      "</div>";

    list.appendChild(row);
  });

  /* IntersectionObserver: staggered entrance */
  var rows = list.querySelectorAll(".frp-bar-row");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var allRows = list.querySelectorAll(".frp-bar-row");
          allRows.forEach(function (row, idx) {
            setTimeout(function () {
              row.classList.add("frp-visible");
              var fill = row.querySelector(".frp-bar-fill");
              var targetW = fill.style.getPropertyValue("--target-w") || "0%";
              /* Read from data-pct on row */
              var pct = parseFloat(row.getAttribute("data-pct"));
              fill.style.width = (pct / maxPct) * 100 + "%";

              var innerLabel = fill.querySelector(".frp-bar-inner-label");
              if (pct >= 10) {
                setTimeout(function () {
                  innerLabel.style.opacity = "1";
                }, 600);
              }
            }, idx * 80);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(list);
})();
//  <!-- INFOGRAPHICS START 2 -->
(function () {
  var root = document.getElementById("frpMatrixRoot");
  var quadrants = root.querySelectorAll(".frp-quadrant");
  var nodes = root.querySelectorAll(".frp-node");
  var tooltip = document.getElementById("frpMTooltip");
  var svgWrap = document.getElementById("frpSvgWrap");

  /* Staggered entrance via IntersectionObserver */
  var observed = false;
  var observer = new IntersectionObserver(
    function (entries) {
      if (observed) return;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observed = true;

        /* Quadrants fade first */
        quadrants.forEach(function (q, i) {
          setTimeout(function () {
            q.classList.add("frp-q-visible");
          }, i * 60);
        });

        /* Nodes pop in with stagger */
        var nodeOrder = [
          "frpNodeAFP",
          "frpNodeATL",
          "frpNodeAM",
          "frpNodeFW",
          "frpNodeVARTM",
        ];
        nodeOrder.forEach(function (id, i) {
          setTimeout(
            function () {
              var el = document.getElementById(id);
              if (el) el.classList.add("frp-node-visible");
            },
            280 + i * 120,
          );
        });

        observer.disconnect();
      });
    },
    { threshold: 0.25 },
  );

  observer.observe(root);

  /* Tooltip on hover */
  nodes.forEach(function (node) {
    node.addEventListener("mouseenter", function (e) {
      var label = node.getAttribute("data-label");
      var desc = node.getAttribute("data-desc");
      tooltip.innerHTML =
        "<strong>" +
        label +
        '</strong><br><span style="font-size:11px;opacity:0.88">' +
        desc +
        "</span>";

      var rect = svgWrap.getBoundingClientRect();
      var cx = parseFloat(node.getAttribute("data-cx"));
      var cy = parseFloat(node.getAttribute("data-cy"));
      var svgEl = document.getElementById("frpMatrixSvg");
      var vb = svgEl.viewBox.baseVal;
      var scaleX = rect.width / vb.width;
      var scaleY = rect.height / vb.height;
      var px = cx * scaleX;
      var py = cy * scaleY;

      tooltip.style.left = px - 20 + "px";
      tooltip.style.top = py - 72 + "px";
      tooltip.classList.add("frp-tip-visible");
    });

    node.addEventListener("mouseleave", function () {
      tooltip.classList.remove("frp-tip-visible");
    });
  });
})();
//   <!-- INFOGRAPHICS START 3 -->
(function () {
  var root = document.getElementById("afpmRoot");
  var observed = false;

  var observer = new IntersectionObserver(
    function (entries) {
      if (observed) return;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observed = true;

        /* Panels slide in */
        setTimeout(function () {
          document.getElementById("afpmLeft").classList.add("afpm-visible");
          document.getElementById("afpmRight").classList.add("afpm-visible");
        }, 100);

        /* Arrow */
        setTimeout(function () {
          document.getElementById("afpmArrow").classList.add("afpm-visible");
        }, 350);

        /* Left items stagger */
        var leftItems = document.querySelectorAll("#afpmLeftItems .afpm-item");
        leftItems.forEach(function (item, i) {
          setTimeout(
            function () {
              item.classList.add("afpm-visible");
            },
            300 + i * 90,
          );
        });

        /* Right items stagger */
        var rightItems = document.querySelectorAll(
          "#afpmRightItems .afpm-item",
        );
        rightItems.forEach(function (item, i) {
          setTimeout(
            function () {
              item.classList.add("afpm-visible");
            },
            400 + i * 110,
          );
        });

        /* Stat bar */
        setTimeout(function () {
          document.getElementById("afpmStat").classList.add("afpm-visible");
        }, 800);

        observer.disconnect();
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(root);
})();
//   <!-- INFOGRAPHICS START 4 -->
(function () {
  var rows = [
    { id: "mprR1", fillPct: 80 },
    { id: "mprR2", fillPct: 93 },
    { id: "mprR3", fillPct: 60 },
    { id: "mprR4", fillPct: 87 },
    { id: "mprR5", fillPct: 82 },
  ];

  var groupLabels = ["mprLbl1", "mprLbl2"];
  var observed = false;

  var observer = new IntersectionObserver(
    function (entries) {
      if (observed) return;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observed = true;

        /* Group labels */
        groupLabels.forEach(function (id, i) {
          setTimeout(function () {
            document.getElementById(id).classList.add("mpr-visible");
          }, i * 200);
        });

        /* Rows stagger */
        rows.forEach(function (r, i) {
          setTimeout(
            function () {
              var row = document.getElementById(r.id);
              row.classList.add("mpr-visible");
              var fill = row.querySelector(".mpr-bar-fill");
              fill.style.width = r.fillPct + "%";
              var inner = fill.querySelector(".mpr-bar-inner");
              setTimeout(function () {
                inner.style.opacity = "1";
              }, 650);
            },
            180 + i * 110,
          );
        });

        /* Legend */
        setTimeout(function () {
          document.getElementById("mprLegend").classList.add("mpr-visible");
        }, 900);

        observer.disconnect();
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(document.getElementById("mprRoot"));
})();
//  <!-- INFOGRAPHICS START 5 -->

(function () {
  var data = [
    { label: "Kevlar", value: 248.06, fibers: ["kevlar"], top: true },
    {
      label: "Carbon+Kevlar+Glass",
      value: 239.7,
      fibers: ["carbon", "kevlar", "glass"],
      top: false,
    },
    {
      label: "Kevlar+Glass",
      value: 228.0,
      fibers: ["kevlar", "glass"],
      top: false,
    },
    {
      label: "Carbon+Kevlar",
      value: 207.4,
      fibers: ["carbon", "kevlar"],
      top: false,
    },
    { label: "Carbon", value: 138.26, fibers: ["carbon"], top: false },
    {
      label: "Carbon+Glass",
      value: 136.5,
      fibers: ["carbon", "glass"],
      top: false,
    },
    { label: "Glass", value: 113.16, fibers: ["glass"], top: false },
  ];

  var maxVal = data[0].value;

  var chipClass = {
    kevlar: "chip-kevlar",
    carbon: "chip-carbon",
    glass: "chip-glass",
  };
  var chipLabel = { kevlar: "K", carbon: "C", glass: "G" };

  /* Color scale: top 4 = navy shades, bottom 3 = gray */
  var colors = [
    "#47577c",
    "#5a6d96",
    "#6b7ea8",
    "#7d8fb8",
    "#9d9d9c",
    "#adadad",
    "#bebebe",
  ];

  var list = document.getElementById("izodList");

  data.forEach(function (item, i) {
    var row = document.createElement("div");
    row.className = "izod-row";
    row.setAttribute("data-val", item.value);
    row.setAttribute("data-fill", ((item.value / maxVal) * 100).toFixed(1));

    /* Chips */
    var chipsHtml = item.fibers
      .map(function (f) {
        return (
          '<span class="izod-chip ' +
          chipClass[f] +
          '">' +
          chipLabel[f] +
          "</span>"
        );
      })
      .join("");

    var rankBadge = item.top ? '<span class="izod-rank">★ TOP</span>' : "";

    row.innerHTML =
      '<div class="izod-label">' +
      "<span>" +
      item.label +
      rankBadge +
      "</span>" +
      '<div class="izod-chips">' +
      chipsHtml +
      "</div>" +
      "</div>" +
      '<div class="izod-track">' +
      '<div class="izod-fill" style="background:' +
      colors[i] +
      '">' +
      '<span class="izod-fill-label">' +
      item.value.toFixed(2) +
      " kJ/m²</span>" +
      "</div>" +
      "</div>" +
      '<div class="izod-value">' +
      item.value.toFixed(2) +
      "</div>" +
      '<div class="izod-tooltip">' +
      item.label +
      "<br>" +
      item.value.toFixed(2) +
      " kJ/m²</div>";

    list.appendChild(row);
  });

  /* IntersectionObserver */
  var observed = false;
  var observer = new IntersectionObserver(
    function (entries) {
      if (observed) return;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observed = true;

        var rows = list.querySelectorAll(".izod-row");
        rows.forEach(function (row, i) {
          setTimeout(function () {
            row.classList.add("izod-visible");
            var fill = row.querySelector(".izod-fill");
            var target = parseFloat(row.getAttribute("data-fill"));
            fill.style.width = target + "%";
            var inner = fill.querySelector(".izod-fill-label");
            if (target > 55) {
              setTimeout(function () {
                inner.style.opacity = "1";
              }, 650);
            }
          }, i * 90);
        });

        setTimeout(function () {
          document.getElementById("izodSummary").classList.add("izod-visible");
        }, 900);

        observer.disconnect();
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(document.getElementById("izodRoot"));
})();
// <!-- INFOGRAPHICS START 6 -->
(function () {
  var observed = false;
  var observer = new IntersectionObserver(
    function (entries) {
      if (observed) return;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observed = true;

        setTimeout(function () {
          document.getElementById("qlStep1").classList.add("ql-visible");
        }, 100);
        setTimeout(function () {
          document.getElementById("qlArrow1").classList.add("ql-visible");
        }, 280);
        setTimeout(function () {
          document.getElementById("qlStep2").classList.add("ql-visible");
        }, 380);
        setTimeout(function () {
          document.getElementById("qlArrow2").classList.add("ql-visible");
        }, 560);
        setTimeout(function () {
          document.getElementById("qlStep3").classList.add("ql-visible");
        }, 640);

        setTimeout(function () {
          var prog = document.getElementById("qlProgress");
          prog.classList.add("ql-visible");
          document.getElementById("qlProgressFill").style.width = "100%";
        }, 900);

        observer.disconnect();
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(document.getElementById("qlRoot"));
})();
