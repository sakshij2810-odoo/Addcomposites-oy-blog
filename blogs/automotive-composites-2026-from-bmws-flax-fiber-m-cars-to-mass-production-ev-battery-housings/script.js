/* ============================================
   AUTOMOTIVE COMPOSITES 2026 - JAVASCRIPT
   Sidebar Navigation & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");

  // Highlight active section in sidebar based on scroll position
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

  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function () {
      highlightActiveSection();
    });
  });

  // Initial highlight on page load
  highlightActiveSection();

  // Smooth scrolling for sidebar links
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

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Close mobile sidebar on link click
        const sidebar = document.querySelector(".blog-sidebar");
        if (sidebar && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
        }
      }
    });
  });

  // Intersection Observer for scroll-triggered animations
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

  // Animate cards and feature items on scroll
  const animatedElements = document.querySelectorAll(
    ".learn-more-card, .feature-item, .numbered-card, .award-meta-card, .series-note",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Image hover effects
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

  // Table row hover highlight
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#fef7f6";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // Back to top button
  const createBackToTop = () => {
    const button = document.createElement("button");
    button.innerHTML = "&#8593;";
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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

  // Reading progress bar at top
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

  // Mobile nav toggle
  document
    .querySelector(".mobile-nav-toggle")
    ?.addEventListener("click", () => {
      document.querySelector(".blog-sidebar").classList.toggle("active");
    });

  console.log("Automotive Composites 2026 - Scripts loaded successfully");
});
// INFOGRAPHIC 1:
(function () {
  var labels = ["2020", "2022", "2023", "2025", "2027", "2030"];
  var values = [6.2, 8.1, 8.7, 10.06, 12.3, 17.72];
  // First 3 are historical, last 3 are forecast
  var bgColors = [
    "#9d9d9c",
    "#9d9d9c",
    "#9d9d9c",
    "#47577c",
    "#47577c",
    "#47577c",
  ];
  var hoverColors = [
    "#7a7a79",
    "#7a7a79",
    "#7a7a79",
    "#bf3425",
    "#bf3425",
    "#bf3425",
  ];

  // Key label annotations
  var keyLabels = {
    3: "$10.06B",
    5: "$17.72B",
  };

  var ctx = document.getElementById("mktGrowthChart").getContext("2d");

  // Custom plugin to draw CAGR divider line + key value labels
  var annotationPlugin = {
    id: "mktAnnotations",
    afterDatasetsDraw: function (chart) {
      var ctx = chart.ctx;
      var xScale = chart.scales.x;
      var yScale = chart.scales.y;
      var meta = chart.getDatasetMeta(0);

      // Draw divider line between bar index 2 and 3
      var bar2 = meta.data[2];
      var bar3 = meta.data[3];
      if (bar2 && bar3) {
        var dividerX = (bar2.x + bar2.width / 2 + bar3.x - bar3.width / 2) / 2;
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(dividerX, yScale.top);
        ctx.lineTo(dividerX, yScale.bottom);
        ctx.stroke();
        ctx.restore();
      }

      // Draw key value labels above specific bars
      meta.data.forEach(function (bar, i) {
        if (keyLabels[i] !== undefined) {
          ctx.save();
          ctx.fillStyle = "#bf3425";
          ctx.font = "bold 11px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(keyLabels[i], bar.x, bar.y - 8);
          ctx.restore();
        }
      });
    },
  };

  new Chart(ctx, {
    type: "bar",
    plugins: [annotationPlugin],
    data: {
      labels: labels,
      datasets: [
        {
          label: "Market Size (USD Billion)",
          data: values,
          backgroundColor: bgColors,
          hoverBackgroundColor: hoverColors,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 900,
        easing: "easeOutQuart",
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#475569",
            font: { size: 12, weight: "600" },
          },
          border: { color: "#e2e8f0" },
        },
        y: {
          min: 0,
          max: 20,
          grid: { color: "#f1f5f9" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            callback: function (val) {
              return "$" + val + "B";
            },
          },
          border: { dash: [3, 3], color: "#e2e8f0" },
          title: {
            display: true,
            text: "USD Billion",
            color: "#94a3b8",
            font: { size: 11 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#bf3425",
          bodyColor: "#1e293b",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            title: function (items) {
              var idx = items[0].dataIndex;
              return idx < 3
                ? items[0].label + " (Historical)"
                : items[0].label + " (Forecast)";
            },
            label: function (item) {
              return " Market Size: $" + item.parsed.y.toFixed(2) + "B";
            },
          },
        },
      },
    },
  });

  // Add CAGR phase labels below x-axis via DOM
  var container = document.getElementById("mktGrowthChart").parentElement;
  var labelRow = document.createElement("div");
  labelRow.style.cssText =
    "display:flex;justify-content:space-between;margin-top:6px;padding:0 2px;";
  labelRow.innerHTML =
    '<span style="font-size:11px;color:#9d9d9c;font-weight:600;">← Historical (4.2% CAGR)</span>' +
    '<span style="font-size:11px;color:#47577c;font-weight:600;">Forecast (12% CAGR) →</span>';
  container.parentElement.insertBefore(labelRow, container.nextSibling);
})();
// INFOGRAPHIC 2
(function () {
  // Build flax rows
  var flaxRows = document.getElementById("nfs-flax-rows");
  for (var i = 0; i < 5; i++) {
    var row = document.createElement("div");
    row.className = "nfs-flax-row";
    row.style.animationDelay = i * 80 + "ms";
    flaxRows.appendChild(row);
  }

  // Build property rows with stagger
  var properties = [
    { text: "<strong>~40% lower CO₂e</strong> vs CFRP (production)", delay: 0 },
    { text: "Density <strong>40% lower</strong> than glass fiber", delay: 80 },
    {
      text: "<strong>Moisture-resistant prepreg</strong> (new, 2026)",
      delay: 160,
    },
    {
      text: "<strong>RTM-processable</strong> at production volumes",
      delay: 240,
    },
  ];

  var container = document.getElementById("nfs-properties");
  properties.forEach(function (p) {
    var row = document.createElement("div");
    row.className = "nfs-property-row";
    row.style.opacity = "0";
    row.style.transform = "translateY(10px)";
    row.style.transition =
      "opacity 0.4s ease " +
      p.delay +
      "ms, transform 0.4s ease " +
      p.delay +
      "ms, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease";
    row.innerHTML =
      '<div class="nfs-property-icon">▶</div>' +
      '<div class="nfs-property-text">' +
      p.text +
      "</div>";
    container.appendChild(row);
  });

  // Animate in on scroll / load
  function animateIn() {
    document.querySelectorAll(".nfs-property-row").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateIn();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(document.querySelector(".nfs-result-card"));
  } else {
    animateIn();
  }
})();
// INFOGRAPHIC 3
(function () {
  // Annotation plugin to draw the 40% reduction bracket
  var reductionPlugin = {
    id: "co2ReductionAnnotation",
    afterDatasetsDraw: function (chart) {
      var ctx = chart.ctx;
      var meta0 = chart.getDatasetMeta(0); // CFRP
      var meta1 = chart.getDatasetMeta(1); // Natural fiber
      var yScale = chart.scales.y;

      // Only annotate Production Phase (index 0)
      var barCFRP = meta0.data[0];
      var barNF = meta1.data[0];
      if (!barCFRP || !barNF) return;

      var x = barCFRP.x + barCFRP.width / 2 + 14;
      var yTop = barNF.y; // top of natural fiber bar (60%)
      var yBottom = barCFRP.y; // top of CFRP bar (100%)
      var xLine = x + 14;

      ctx.save();

      // Bracket lines
      ctx.strokeStyle = "#bf3425";
      ctx.lineWidth = 1.4;
      ctx.setLineDash([]);

      // Vertical bracket
      ctx.beginPath();
      ctx.moveTo(xLine, yTop);
      ctx.lineTo(xLine, yBottom);
      ctx.stroke();

      // Top tick
      ctx.beginPath();
      ctx.moveTo(xLine - 5, yTop);
      ctx.lineTo(xLine + 5, yTop);
      ctx.stroke();

      // Bottom tick
      ctx.beginPath();
      ctx.moveTo(xLine - 5, yBottom);
      ctx.lineTo(xLine + 5, yBottom);
      ctx.stroke();

      // Label
      var midY = (yTop + yBottom) / 2;
      ctx.fillStyle = "#bf3425";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("−40%", xLine + 8, midY + 4);

      ctx.restore();
    },
  };

  new Chart(document.getElementById("co2Chart"), {
    type: "bar",
    plugins: [reductionPlugin],
    data: {
      labels: ["Production Phase", "End-of-Life"],
      datasets: [
        {
          label: "CFRP (baseline)",
          data: [100, 15],
          backgroundColor: "#47577c",
          hoverBackgroundColor: "#2e3d59",
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.55,
          categoryPercentage: 0.75,
        },
        {
          label: "Natural Fiber (Bcomp ampliTex)",
          data: [60, 8],
          backgroundColor: "#bf3425",
          hoverBackgroundColor: "#8f2519",
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.55,
          categoryPercentage: 0.75,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 900,
        easing: "easeOutQuart",
      },
      layout: {
        padding: { right: 80 },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#1e293b",
            font: { size: 13, weight: "600" },
          },
          border: { color: "#e2e8f0" },
        },
        y: {
          min: 0,
          max: 120,
          grid: { color: "#f1f5f9" },
          border: { dash: [3, 3], color: "#e2e8f0" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            stepSize: 20,
            callback: function (val) {
              return val + "%";
            },
          },
          title: {
            display: true,
            text: "CO₂e (relative, CFRP = 100%)",
            color: "#94a3b8",
            font: { size: 11 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#bf3425",
          bodyColor: "#1e293b",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function (item) {
              var suffix =
                item.datasetIndex === 0
                  ? " (baseline)"
                  : " (vs CFRP: −" + (100 - item.parsed.y) + "%)";
              return (
                " " + item.dataset.label + ": " + item.parsed.y + "%" + suffix
              );
            },
          },
        },
      },
    },
  });
})();
// infographic 4
(function () {
  var rows = [
    {
      param: "Typical Weight",
      al: "110–160 kg",
      gfrp: "60–90 kg",
      win: true,
      badge: "~40% saving",
      tip: "Weight reduction enabled by composite structural architecture with over-molded ribs.",
      highlight: true,
    },
    {
      param: "Manufacturing Process",
      al: "Die casting + machining",
      gfrp: "Compression molding (LFT + CFRT organosheet)",
      win: true,
      badge: "Fewer steps",
      tip: "LFT = Long Fibre Thermoplastic. CFRT = Continuous Fibre Reinforced Thermoplastic. Combined in a single compression step.",
      highlight: true,
    },
    {
      param: "Cycle Time",
      al: "2–5 min die-cast + machining",
      gfrp: "2–4 min (compression)",
      win: false,
      badge: "Comparable",
      tip: "Both processes achieve similar cycle times; thermoplastic avoids secondary machining operations.",
      highlight: false,
    },
    {
      param: "Lifecycle CO₂",
      al: "Baseline (100%)",
      gfrp: "~75% of CFRP baseline",
      win: true,
      badge: "25% lower",
      tip: "Lifecycle CO₂ reduction primarily driven by lower production energy and thermoplastic recyclability.",
      highlight: true,
    },
    {
      param: "Recyclability",
      al: "High (Al recycling)",
      gfrp: "Thermoplastic remelting",
      win: false,
      badge: "Both capable",
      tip: "Thermoplastics can be remelted and reprocessed — unlike thermoset composites which are landfilled.",
      highlight: false,
    },
    {
      param: "Design Integration",
      al: "Limited (cast geometry)",
      gfrp: "High (over-mold, ribs)",
      win: true,
      badge: "Key advantage",
      tip: "Over-molding enables integrated rib structures, brackets, and inserts in a single operation.",
      highlight: true,
    },
    {
      param: "Semi-finished SKUs",
      al: "N/A (all-metal)",
      gfrp: "Minimized (key innovation)",
      win: true,
      badge: "Innov.",
      tip: "Standardised semi-finished organosheet blanks reduce variant complexity across vehicle platforms.",
      highlight: true,
    },
  ];

  var tbody = document.getElementById("cmp-tbody");

  rows.forEach(function (row, i) {
    var tr = document.createElement("tr");
    tr.style.opacity = "0";
    tr.style.transform = "translateY(8px)";
    tr.style.transition =
      "opacity 0.35s ease " +
      i * 60 +
      "ms, transform 0.35s ease " +
      i * 60 +
      "ms, background 0.18s ease";

    var badgeHtml = row.win
      ? '<span class="cmp-badge cmp-badge-win">▲ ' + row.badge + "</span>"
      : '<span class="cmp-badge cmp-badge-neutral">' + row.badge + "</span>";

    tr.innerHTML =
      '<td class="cmp-td-param"><span class="cmp-param-icon"></span>' +
      row.param +
      "</td>" +
      '<td class="cmp-td-al">' +
      row.al +
      "</td>" +
      '<td class="cmp-td-gfrp' +
      (row.highlight ? " cmp-highlight" : "") +
      '" data-tip="' +
      i +
      '">' +
      row.gfrp +
      badgeHtml +
      "</td>";

    tbody.appendChild(tr);
  });

  // Scroll-reveal
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            tbody.querySelectorAll("tr").forEach(function (tr) {
              tr.style.opacity = "1";
              tr.style.transform = "translateY(0)";
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(document.querySelector(".cmp-container"));
  } else {
    tbody.querySelectorAll("tr").forEach(function (tr) {
      tr.style.opacity = "1";
      tr.style.transform = "translateY(0)";
    });
  }

  // Tooltip
  var tooltip = document.getElementById("cmpTooltip");
  var tipTitle = document.getElementById("cmpTipTitle");
  var tipBody = document.getElementById("cmpTipBody");

  document.querySelectorAll(".cmp-td-gfrp[data-tip]").forEach(function (td) {
    td.addEventListener("mouseenter", function (e) {
      var idx = parseInt(td.getAttribute("data-tip"));
      var row = rows[idx];
      tipTitle.textContent = row.param;
      tipBody.textContent = row.tip;
      tooltip.style.opacity = "1";
      positionTip(e);
    });
    td.addEventListener("mousemove", positionTip);
    td.addEventListener("mouseleave", function () {
      tooltip.style.opacity = "0";
    });
  });

  function positionTip(e) {
    var x = e.clientX + 14;
    var y = e.clientY - 10;
    if (x + 240 > window.innerWidth) x = e.clientX - 230;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
})();
// infographic 5
(function () {
  var axes = [
    "Specific Stiffness",
    "Specific Strength",
    "Vibration Damping",
    "CO₂e (inverted)",
    "Cost (inverted)",
    "Recyclability",
  ];

  // Scores out of 10 — higher = better on each axis
  var datasets = [
    {
      label: "CFRP",
      data: [10, 10, 2, 1, 1, 4],
      borderColor: "#47577c",
      backgroundColor: "rgba(71, 87, 124, 0.12)",
      borderWidth: 2.2,
      pointBackgroundColor: "#47577c",
      pointRadius: 5,
      pointHoverRadius: 7,
      pointStyle: "rectRot", // diamond shape
    },
    {
      label: "E-Glass",
      data: [5, 5, 5, 5, 6, 6],
      borderColor: "#9d9d9c",
      backgroundColor: "rgba(157, 157, 156, 0.10)",
      borderWidth: 2,
      pointBackgroundColor: "#9d9d9c",
      pointRadius: 5,
      pointHoverRadius: 7,
      pointStyle: "rect",
    },
    {
      label: "Flax / Bcomp ampliTex",
      data: [4, 4, 9, 9, 9, 9],
      borderColor: "#bf3425",
      backgroundColor: "rgba(191, 52, 37, 0.10)",
      borderWidth: 2.2,
      pointBackgroundColor: "#bf3425",
      pointRadius: 5,
      pointHoverRadius: 7,
      pointStyle: "circle",
    },
  ];

  new Chart(document.getElementById("mprRadarChart"), {
    type: "radar",
    data: {
      labels: axes,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 900,
        easing: "easeOutQuart",
      },
      scales: {
        r: {
          min: 0,
          max: 10,
          angleLines: { color: "#e2e8f0", lineWidth: 1 },
          grid: { color: "#e2e8f0", lineWidth: 1 },
          pointLabels: {
            color: "#475569",
            font: { size: 12, weight: "600", family: "Inter, sans-serif" },
            padding: 10,
          },
          ticks: {
            display: false,
            backdropColor: "transparent",
            stepSize: 2,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#bf3425",
          bodyColor: "#1e293b",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            title: function (items) {
              return items[0].dataset.label;
            },
            label: function (item) {
              var axis = axes[item.dataIndex];
              var val = item.parsed.r;
              var note = "";
              if (axis.indexOf("inverted") > -1) note = " (lower = worse)";
              return " " + axis + ": " + val + "/10" + note;
            },
          },
        },
      },
    },
  });
})();
// infographic 6
(function () {
  // Y-axis: 0=Low, 1=Med, 2=High, 3=Very High
  // X-axis: log scale production volume
  var yLabels = ["Low", "Med", "High", "Very High"];

  // Process data points
  // [x: production volume, y: complexity 0-3, label, color, group]
  var points = [
    {
      x: 1500,
      y: 0.1,
      label: "Steel Stamping",
      color: "#9d9d9c",
      group: "conv",
    },
    {
      x: 80000,
      y: 0.15,
      label: "Aluminum Die Casting",
      color: "#9d9d9c",
      group: "conv",
    },
    {
      x: 12000,
      y: 1.1,
      label: "SMC/BMC Compression\nMolding",
      color: "#9d9d9c",
      group: "conv",
    },
    {
      x: 3500,
      y: 2.1,
      label: "JLR Beam\n(hybrid)",
      color: "#47577c",
      group: "rtm",
    },
    {
      x: 8000,
      y: 2.4,
      label: "BMW M Roof\n(automated RTM)",
      color: "#47577c",
      group: "rtm",
    },
    {
      x: 4500,
      y: 2.8,
      label: "HP-RTM\n(tailored structures)",
      color: "#47577c",
      group: "rtm",
    },
    { x: 2200, y: 2.6, label: "EV Housing", color: "#bf3425", group: "afp" },
    {
      x: 1200,
      y: 3.1,
      label: "AFP\n(tailored structures)",
      color: "#bf3425",
      group: "afp",
    },
  ];

  // Build chart.js scatter datasets grouped by color
  var groups = {
    afp: { label: "AFP / Composite", color: "#bf3425", data: [] },
    rtm: { label: "RTM / Hybrid", color: "#47577c", data: [] },
    conv: { label: "Conventional", color: "#9d9d9c", data: [] },
  };

  points.forEach(function (p) {
    groups[p.group].data.push({ x: p.x, y: p.y, label: p.label });
  });

  var datasets = Object.values(groups).map(function (g) {
    return {
      label: g.label,
      data: g.data,
      backgroundColor: g.color,
      borderColor: g.color,
      pointRadius: 8,
      pointHoverRadius: 11,
      pointStyle: "triangle",
      showLine: false,
    };
  });

  // Custom label plugin
  var labelPlugin = {
    id: "scvLabels",
    afterDatasetsDraw: function (chart) {
      var ctx = chart.ctx;
      chart.data.datasets.forEach(function (ds, di) {
        var meta = chart.getDatasetMeta(di);
        meta.data.forEach(function (point, pi) {
          var raw = ds.data[pi];
          if (!raw || !raw.label) return;
          var lines = raw.label.split("\n");
          var px = point.x;
          var py = point.y - 14;

          ctx.save();
          ctx.fillStyle = ds.backgroundColor;
          ctx.font = "bold 10.5px Inter, sans-serif";
          ctx.textAlign = "center";
          lines.forEach(function (line, li) {
            ctx.fillText(line, px, py - (lines.length - 1 - li) * 13);
          });
          ctx.restore();
        });
      });
    },
  };

  // Horizontal band plugin (complexity zones)
  var bandPlugin = {
    id: "scvBands",
    beforeDatasetsDraw: function (chart) {
      var ctx = chart.ctx;
      var yScale = chart.scales.y;
      var xScale = chart.scales.x;
      var bands = [
        { yMin: -0.4, yMax: 0.6, color: "rgba(157,157,156,0.06)" },
        { yMin: 0.6, yMax: 1.6, color: "rgba(71,87,124,0.05)" },
        { yMin: 1.6, yMax: 2.65, color: "rgba(71,87,124,0.09)" },
        { yMin: 2.65, yMax: 3.5, color: "rgba(191,52,37,0.07)" },
      ];
      bands.forEach(function (b) {
        var top = yScale.getPixelForValue(b.yMax);
        var bottom = yScale.getPixelForValue(b.yMin);
        ctx.save();
        ctx.fillStyle = b.color;
        ctx.fillRect(
          xScale.left,
          top,
          xScale.right - xScale.left,
          bottom - top,
        );
        ctx.restore();
      });
    },
  };

  new Chart(document.getElementById("scvChart"), {
    type: "scatter",
    plugins: [bandPlugin, labelPlugin],
    data: { datasets: datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: "easeOutQuart" },
      layout: { padding: { top: 30, right: 20 } },
      scales: {
        x: {
          type: "logarithmic",
          min: 800,
          max: 1500000,
          grid: { color: "#f1f5f9" },
          border: { color: "#e2e8f0" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            callback: function (val) {
              var map = {
                1000: "1,000",
                10000: "10,000",
                100000: "100,000",
                1000000: "1,000,000",
              };
              return map[val] || "";
            },
          },
          title: {
            display: true,
            text: "Annual Production Volume",
            color: "#94a3b8",
            font: { size: 12 },
          },
        },
        y: {
          min: -0.4,
          max: 3.5,
          grid: { color: "#f1f5f9" },
          border: { color: "#e2e8f0" },
          ticks: {
            color: "#475569",
            font: { size: 12, weight: "600" },
            stepSize: 1,
            callback: function (val) {
              var map = { 0: "Low", 1: "Med", 2: "High", 3: "Very High" };
              return map[Math.round(val)] !== undefined
                ? map[Math.round(val)]
                : "";
            },
          },
          title: {
            display: true,
            text: "Structural Complexity",
            color: "#94a3b8",
            font: { size: 12 },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#bf3425",
          bodyColor: "#1e293b",
          borderColor: "#e2e8f0",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            title: function (items) {
              var raw = items[0].raw;
              return raw.label
                ? raw.label.replace("\n", " ")
                : items[0].dataset.label;
            },
            label: function (item) {
              var vol = item.parsed.x.toLocaleString();
              var yVal = Math.round(item.parsed.y);
              var cplx =
                ["Low", "Med", "High", "Very High"][
                  Math.max(0, Math.min(3, yVal))
                ] || "";
              return [" Volume: ~" + vol + " units/yr", " Complexity: " + cplx];
            },
          },
        },
      },
    },
  });
})();
// infographic 7
(function () {
  var data = [
    {
      year: "2015",
      phase: "research",
      title: "BMW i3",
      body: "CFRP structural R&D; natural fiber used in door liners",
    },
    {
      year: "2017",
      phase: "research",
      title: "CF Usage Grows",
      body: "Carbon fiber demand rises; bio-fiber research accelerates",
    },
    {
      year: "2019",
      phase: "motorsport",
      title: "Bcomp Formula E",
      body: "ampliTex flax bodywork proved in motorsport (proof-of-concept)",
    },
    {
      year: "2021",
      phase: "motorsport",
      title: "HP-RTM <5 min",
      body: "High-pressure RTM cycle time breakthrough; SMC/BMC volume matures",
    },
    {
      year: "2023",
      phase: "premium",
      title: "SMC/BMC Vol.",
      body: "Compression molding scales; natural fiber enters premium programs",
    },
    {
      year: "2025",
      phase: "premium",
      title: "JLR Cross Beam",
      body: "Hybrid flax/carbon structural beam enters series production",
    },
    {
      year: "2026",
      phase: "premium",
      title: "BMW M3 Series",
      body: "NFC + automated RTM roof panel — JEC Innovation Award 2026",
    },
    {
      year: "2028",
      phase: "volume",
      title: "TP Battery Housing",
      body: "Thermoplastic NFC housing >50k units/yr; EV platform adoption",
    },
    {
      year: "2030",
      phase: "volume",
      title: "$17.7B Market",
      body: "Global composites market target at 12% CAGR forecast",
    },
  ];

  var yearsEl = document.getElementById("tlYears");
  var milestonesEl = document.getElementById("tlMilestones");

  // Tick colors per phase
  var phaseColor = {
    research: "#9d9d9c",
    motorsport: "#6b7fa8",
    premium: "#47577c",
    volume: "#bf3425",
  };

  data.forEach(function (item, i) {
    var col = document.createElement("div");
    col.className = "tl-year-col";

    var tick = document.createElement("div");
    tick.className = "tl-tick";
    tick.style.background = phaseColor[item.phase];

    var lbl = document.createElement("div");
    lbl.className = "tl-year-label";
    lbl.style.color = phaseColor[item.phase];
    lbl.textContent = item.year;

    col.appendChild(tick);
    col.appendChild(lbl);
    yearsEl.appendChild(col);

    // Milestone card
    var ms = document.createElement("div");
    ms.className = "tl-milestone";
    ms.setAttribute("data-phase", item.phase);
    ms.style.transitionDelay = i * 70 + "ms";

    var dot = document.createElement("div");
    dot.className = "tl-dot";

    var card = document.createElement("div");
    card.className = "tl-card";
    card.innerHTML =
      '<div class="tl-card-title">' +
      item.title +
      "</div>" +
      '<div class="tl-card-body">' +
      item.body +
      "</div>";

    ms.appendChild(dot);
    ms.appendChild(card);
    milestonesEl.appendChild(ms);
  });

  // Scroll-reveal
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            document.querySelectorAll(".tl-milestone").forEach(function (el) {
              el.classList.add("visible");
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(document.querySelector(".tl-container"));
  } else {
    document.querySelectorAll(".tl-milestone").forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
