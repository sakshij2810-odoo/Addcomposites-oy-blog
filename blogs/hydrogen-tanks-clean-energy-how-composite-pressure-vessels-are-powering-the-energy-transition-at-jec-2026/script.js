/* ============================================
   HYDROGEN PRESSURE VESSELS BLOG - JAVASCRIPT
   Sidebar Navigation, Progress Bar, Back to Top & Interactive Features
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

        // Update active state immediately
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Close mobile sidebar if open
        const sidebar = document.querySelector(".blog-sidebar");
        if (sidebar && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
        }
      }
    });
  });

  // Add subtle animation to cards on scroll into view
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

  // Animate cards
  const animatedElements = document.querySelectorAll(
    ".learn-more-card, .feature-item, .session-card, .highlight-box, .infographic-placeholder",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Add hover effect enhancement to images
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
      this.style.backgroundColor = "#f1f5f9";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const createBackToTop = () => {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Back to top");
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
      display: flex;
      align-items: center;
      justify-content: center;
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

  // ============================================
  // READING PROGRESS INDICATOR
  // ============================================
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

  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const sidebar = document.querySelector(".blog-sidebar");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");

      // Update button icon
      if (sidebar.classList.contains("active")) {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      } else {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    });
  }

  // Lazy loading images
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "100px" },
    );

    lazyImages.forEach((img) => imageObserver.observe(img));
  }
});
//    <!-- Figure 1 Placeholder -->
(function () {
  var ctx = document.getElementById("h2MarketStackedChart");

  var labels = ["2020", "2021", "2022", "2023", "2024", "2025", "2027", "2030"];

  /* Segment data in $B */
  var mobilityData = [0.15, 0.55, 0.6, 0.75, 0.9, 1.05, 1.3, 1.6];
  var industrialData = [0.1, 0.5, 0.5, 0.55, 0.65, 0.8, 1.0, 1.3];
  var aerospaceData = [0.05, 0.3, 0.35, 0.45, 0.55, 0.65, 0.85, 1.2];
  var stationaryData = [0.05, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 1.1];

  var commonTooltip = {
    backgroundColor: "#ffffff",
    titleColor: "#47577c",
    bodyColor: "#1e293b",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    padding: 14,
    cornerRadius: 8,
    displayColors: true,
    boxPadding: 4,
    callbacks: {
      label: function (context) {
        return (
          " " +
          context.dataset.label +
          ": $" +
          context.parsed.y.toFixed(2) +
          "B"
        );
      },
      footer: function (tooltipItems) {
        var total = 0;
        tooltipItems.forEach(function (item) {
          total += item.parsed.y;
        });
        return "Total: $" + total.toFixed(2) + "B";
      },
    },
  };

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Mobility",
          data: mobilityData,
          backgroundColor: "#47577c",
          hoverBackgroundColor: "#3a4866",
          borderRadius: {
            topLeft: 0,
            topRight: 0,
            bottomLeft: 4,
            bottomRight: 4,
          },
          borderSkipped: false,
        },
        {
          label: "Industrial",
          data: industrialData,
          backgroundColor: "#bf3425",
          hoverBackgroundColor: "#a52d20",
          borderRadius: 0,
          borderSkipped: false,
        },
        {
          label: "Aerospace",
          data: aerospaceData,
          backgroundColor: "#9d9d9c",
          hoverBackgroundColor: "#888888",
          borderRadius: 0,
          borderSkipped: false,
        },
        {
          label: "Stationary",
          data: stationaryData,
          backgroundColor: "#c8d0dc",
          hoverBackgroundColor: "#b0bac8",
          borderRadius: {
            topLeft: 4,
            topRight: 4,
            bottomLeft: 0,
            bottomRight: 0,
          },
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
        delay: function (context) {
          if (context.type === "data" && context.mode === "default") {
            return context.dataIndex * 120 + context.datasetIndex * 60;
          }
          return 0;
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: {
            color: "#475569",
            font: { size: 12, weight: "600" },
          },
          border: { color: "#e2e8f0" },
        },
        y: {
          stacked: true,
          grid: { color: "#f1f5f9" },
          border: { display: false },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            callback: function (value) {
              return "$" + value.toFixed(1) + "B";
            },
            stepSize: 1.0,
          },
          max: 6.0,
        },
      },
      plugins: {
        legend: {
          position: "top",
          align: "center",
          labels: {
            color: "#475569",
            font: { family: "Inter, sans-serif", size: 12, weight: "600" },
            usePointStyle: true,
            pointStyle: "rectRounded",
            padding: 16,
            boxWidth: 14,
            boxHeight: 10,
          },
        },
        tooltip: commonTooltip,
      },
    },
  });
})();
//   <!-- Figure 2 Placeholder -->
(function () {
  var tooltipData = {
    outer: {
      title: "Structural Shell — CFRP Laminate",
      body: "Thermoplastic carbon-fibre reinforced polymer with optimised helical + hoop winding for maximum burst pressure and fatigue resistance.",
      color: "#47577c",
    },
    inner: {
      title: "All-Composite Liner",
      body: "Eliminates the metal liner entirely. Matched coefficient of thermal expansion (CTE) across all layers prevents microcracking at cryogenic temperatures.",
      color: "#9d9d9c",
    },
    core: {
      title: "LH₂ Cavity — −253 °C",
      body: "Stores liquid hydrogen at cryogenic conditions. The linerless design prevents hydrogen permeation that plagues conventional metal-lined tanks.",
      color: "#bf3425",
    },
  };

  var diagram = document.getElementById("h2TankDiagram");
  var tooltip = document.getElementById("h2TankTooltip");
  var layers = diagram.querySelectorAll("[data-layer]");

  layers.forEach(function (layer) {
    layer.addEventListener("mouseenter", function (e) {
      var key = this.getAttribute("data-layer");
      var data = tooltipData[key];
      if (!data) return;
      tooltip.innerHTML =
        '<div class="h2-tank-tooltip-title" style="color:' +
        data.color +
        '">' +
        data.title +
        "</div>" +
        "<div>" +
        data.body +
        "</div>";
      tooltip.classList.add("visible");
      positionTooltip(e);
    });

    layer.addEventListener("mousemove", function (e) {
      positionTooltip(e);
    });

    layer.addEventListener("mouseleave", function () {
      tooltip.classList.remove("visible");
    });
  });

  function positionTooltip(e) {
    var rect = diagram.getBoundingClientRect();
    var x = e.clientX - rect.left + 16;
    var y = e.clientY - rect.top - 10;
    /* Keep tooltip within container */
    if (x + 230 > rect.width) x = x - 250;
    if (y + 120 > rect.height) y = y - 100;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
})();
//   <!-- Figure 3 Placeholder -->
//   <!-- Figure 4 Placeholder -->
//   <!-- Figure 5 Placeholder -->
(function () {
  var tooltipData = {
    robot: {
      title: "Robot AFP Head — Dome Layup",
      body: "Robotic arm with AFP end-effector lays non-geodesic tow paths on dome sections. Fibre steering enables complex curvature coverage that filament winding cannot achieve alone.",
    },
    winding: {
      title: "Filament Winding — Cylinder Body",
      body: "High-speed geodesic hoop and helical winding builds the cylindrical section. Provides optimal fibre angles for hoop stress resistance at high throughput.",
    },
    consol: {
      title: "Consolidation / Cure",
      body: "For thermoplastics: in-situ consolidation during placement using laser or hot-gas heating. For thermosets: autoclave or oven cure cycle to achieve full cross-linking.",
    },
    ndt: {
      title: "NDT Inspection + Proof Test",
      body: "Non-destructive testing (ultrasonic, thermography) to verify laminate integrity. Followed by hydraulic proof test to certify burst-pressure margin per regulatory standards.",
    },
  };

  var diagram = document.getElementById("h2ProcessDiagram");
  var tooltip = document.getElementById("h2ProcessTooltip");
  var steps = diagram.querySelectorAll("[data-step]");

  steps.forEach(function (step) {
    step.addEventListener("mouseenter", function (e) {
      var key = this.getAttribute("data-step");
      var d = tooltipData[key];
      if (!d) return;
      tooltip.innerHTML =
        '<div class="h2-process-tooltip-title">' +
        d.title +
        "</div>" +
        "<div>" +
        d.body +
        "</div>";
      tooltip.classList.add("visible");
      posTooltip(e);
    });
    step.addEventListener("mousemove", posTooltip);
    step.addEventListener("mouseleave", function () {
      tooltip.classList.remove("visible");
    });
  });

  function posTooltip(e) {
    var r = diagram.getBoundingClientRect();
    var x = e.clientX - r.left + 18;
    var y = e.clientY - r.top - 8;
    if (x + 240 > r.width) x = x - 260;
    if (y + 120 > r.height) y = y - 120;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
})();
// <!-- Figure 6 Placeholder -->
(function () {
  var tips = {
    "conv-glass":
      "Tempered soda-lime glass, 3.2 mm thick. Provides mechanical protection and optical clarity but adds significant weight (~8–12 kg/m²).",
    "conv-eva":
      "Ethylene-vinyl acetate encapsulant. Bonds cells to front and back layers; provides electrical insulation and moisture barrier.",
    "conv-cells":
      "Mono- or polycrystalline silicon PV cells. Standard ~156 mm wafers connected in series strings.",
    "conv-tpt":
      "Tedlar-PET-Tedlar backsheet. Protects rear from moisture ingress. Non-structural layer.",
    "metyx-gfrp":
      "Transparent glass-fibre reinforced polymer front sheet. Only ~2–4 kg/m² — up to 66% lighter than glass. Can be formed to curved profiles.",
    "metyx-eva":
      "Same EVA encapsulant as conventional — proven bonding and insulation chemistry is retained.",
    "metyx-cells":
      "Standard silicon PV cells — identical electrical performance. Compatible with existing cell supply chain.",
    "metyx-cfrp":
      "Structural CFRP sandwich backsheet replaces both the TPT layer and the Al frame. Self-supporting and formable to curved surfaces.",
  };

  function setupTooltips(wrapId, tipId) {
    var wrap = document.getElementById(wrapId);
    var tip = document.getElementById(tipId);
    var layers = wrap.querySelectorAll("[data-tip]");

    layers.forEach(function (layer) {
      layer.addEventListener("mouseenter", function (e) {
        var key = this.getAttribute("data-tip");
        if (!tips[key]) return;
        tip.textContent = tips[key];
        tip.classList.add("visible");
        pos(e);
      });
      layer.addEventListener("mousemove", pos);
      layer.addEventListener("mouseleave", function () {
        tip.classList.remove("visible");
      });
    });

    function pos(e) {
      var r = wrap.getBoundingClientRect();
      var x = e.clientX - r.left + 12;
      var y = e.clientY - r.top - 60;
      if (x + 210 > r.width) x = x - 220;
      if (y < 0) y = e.clientY - r.top + 16;
      tip.style.left = x + "px";
      tip.style.top = y + "px";
    }
  }

  setupTooltips("pvConvSvg", "pvConvTip");
  setupTooltips("pvMetyxSvg", "pvMetyxTip");
})();
