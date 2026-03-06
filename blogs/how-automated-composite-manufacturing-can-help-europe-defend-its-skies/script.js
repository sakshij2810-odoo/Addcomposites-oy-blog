/* ============================================
   EUROPE DRONE DEFENSE BLOG - JAVASCRIPT
   Sidebar Navigation & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");

  // ============================================
  // Highlight active section in sidebar based on scroll position
  // ============================================
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

  // ============================================
  // Smooth scrolling for sidebar links
  // ============================================
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
        if (sidebar) sidebar.classList.remove("active");
      }
    });
  });

  // ============================================
  // Mobile Nav Toggle
  // ============================================
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", () => {
      const sidebar = document.querySelector(".blog-sidebar");
      if (sidebar) sidebar.classList.toggle("active");
    });
  }

  // ============================================
  // Scroll-triggered animations with IntersectionObserver
  // ============================================
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

  // Animate cards and key elements
  const animatedElements = document.querySelectorAll(
    ".stat-card, .learn-more-card, .highlight-box, .infographic-placeholder, .intro-card, .key-question",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // ============================================
  // Image hover effects
  // ============================================
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
      this.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)";
    });
  });

  // ============================================
  // Back to Top Button
  // ============================================
  const createBackToTop = () => {
    const button = document.createElement("button");
    button.innerHTML = "&#8593;";
    button.setAttribute("aria-label", "Back to top");
    button.className = "back-to-top";
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
  // Reading Progress Indicator
  // ============================================
  const createProgressBar = () => {
    const progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-label", "Reading progress");
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
  // Learn More card stagger animation
  // ============================================
  const learnMoreCards = document.querySelectorAll(".learn-more-card");
  learnMoreCards.forEach((card, index) => {
    card.style.transitionDelay = index * 80 + "ms";
  });

  // ============================================
  // Stat cards count-up animation (triggered by IntersectionObserver)
  // ============================================
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll(".stat-card").forEach((card) => {
    statObserver.observe(card);
  });

  // ============================================
  // Lazy loading for images without native support
  // ============================================
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

// <!-- INFOGRAPHIC 1: Ukraine Air Defense Kills Monthly Breakdown -->
(function () {
  // Animate bars on load / scroll
  function animateBars() {
    var fills = document.querySelectorAll(".uad-bar-fill");
    fills.forEach(function (fill) {
      var targetWidth = fill.getAttribute("data-width");
      fill.style.width = targetWidth;
      var innerLabel = fill.querySelector(".uad-bar-label-inner");
      if (innerLabel) innerLabel.style.opacity = "1";
    });
  }

  // Use IntersectionObserver if available
  var container = document.querySelector(".uad-container");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(animateBars, 150);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(container);
  } else {
    setTimeout(animateBars, 300);
  }
})();
// <!-- INFOGRAPHIC 2: Interceptor Drone Cost vs Traditional Air Defense -->
(function () {
  function animateAll() {
    // Animate mini bar fills
    document.querySelectorAll(".idc-mini-bar-fill").forEach(function (el) {
      var w = el.getAttribute("data-width");
      setTimeout(function () {
        el.style.width = w;
      }, 200);
    });
    // Show banner
    var banner = document.getElementById("idcBanner");
    if (banner) banner.classList.add("idc-visible");
  }

  var container = document.getElementById("idcContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateAll();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(container);
  } else {
    setTimeout(animateAll, 400);
  }
})();
//  <!-- INFOGRAPHIC 3: Interceptor Drone Material Selection Hierarchy -->
(function () {
  var animated = false;

  function drawLines() {
    if (animated) return;
    animated = true;
    var ids = [
      "mshTrunk",
      "mshCross",
      "mshBrL",
      "mshBrM",
      "mshBrR",
      "mshDnL",
      "mshDnM",
      "mshDnR",
    ];
    ids.forEach(function (id, i) {
      setTimeout(function () {
        var el = document.getElementById(id);
        if (el) el.classList.add("msh-drawn");
      }, i * 80);
    });
    // Fade in arrow heads
    ["mshArrL", "mshArrM", "mshArrR"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) {
            el.style.opacity = 0;
            el.style.transition = "opacity 0.3s";
            el.style.opacity = 1;
          }
        },
        680 + i * 60,
      );
    });
  }

  // IntersectionObserver
  var container = document.getElementById("mshContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            drawLines();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(container);
  } else {
    setTimeout(drawLines, 300);
  }

  // Tooltip logic
  var tooltip = document.getElementById("mshTooltip");
  var tipTargets = document.querySelectorAll("[data-tip]");

  tipTargets.forEach(function (el) {
    el.addEventListener("mouseenter", function (e) {
      tooltip.textContent = el.getAttribute("data-tip");
      tooltip.classList.add("msh-visible");
      positionTip(e);
    });
    el.addEventListener("mousemove", positionTip);
    el.addEventListener("mouseleave", function () {
      tooltip.classList.remove("msh-visible");
    });
  });

  function positionTip(e) {
    var rect = container.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    tooltip.style.left =
      Math.min(
        x - tooltip.offsetWidth / 2,
        rect.width - tooltip.offsetWidth - 8,
      ) + "px";
    tooltip.style.top = y - tooltip.offsetHeight - 14 + "px";
  }
})();
//  <!-- INFOGRAPHIC 4: Interceptor Performance Envelope vs Target Speeds -->
(function () {
  var triggered = false;

  function animate() {
    if (triggered) return;
    triggered = true;

    // Animate bar fills with staggered delay
    var fills = document.querySelectorAll(".ipe-fill");
    fills.forEach(function (fill, i) {
      var w = fill.getAttribute("data-w");
      setTimeout(
        function () {
          fill.style.width = w;
          var lbl = fill.querySelector(".ipe-fill-inner-label");
          if (lbl) lbl.style.opacity = "1";
        },
        80 + i * 120,
      );
    });

    // Show threshold line & tag
    setTimeout(function () {
      var line = document.getElementById("ipeThreshLine");
      var tag = document.getElementById("ipeThreshTag");
      if (line) line.classList.add("ipe-shown");
      if (tag) tag.classList.add("ipe-shown");
    }, 1400);

    // Show banner
    setTimeout(function () {
      var banner = document.getElementById("ipeBanner");
      if (banner) banner.classList.add("ipe-shown");
    }, 1600);
  }

  var container = document.getElementById("ipeContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
// <!-- INFOGRAPHIC 5: Manufacturing Method Comparison -->
(function () {
  var triggered = false;

  function buildWorkers(id, count, color) {
    var el = document.getElementById(id);
    if (!el) return;
    for (var i = 0; i < count; i++) {
      var dot = document.createElement("div");
      dot.className = "mmc-worker-icon";
      dot.style.background = color;
      dot.style.opacity = "0";
      dot.style.transition = "opacity 0.3s ease " + (0.8 + i * 0.08) + "s";
      el.appendChild(dot);
    }
  }

  function animate() {
    if (triggered) return;
    triggered = true;

    // Show rows staggered
    var rows = document.querySelectorAll(".mmc-metric-row");
    rows.forEach(function (row, i) {
      setTimeout(function () {
        row.classList.add("mmc-visible");
      }, i * 90);
    });

    // Animate bars
    var fills = document.querySelectorAll(".mmc-bar-fill");
    fills.forEach(function (fill, i) {
      var w = fill.getAttribute("data-w");
      setTimeout(
        function () {
          fill.style.width = w;
        },
        150 + i * 60,
      );
    });

    // Worker dots
    buildWorkers("mmcW1", 8, "#9d9d9c");
    buildWorkers("mmcW2", 2, "#47577c");
    buildWorkers("mmcW3", 2, "#bf3425");
    setTimeout(function () {
      document.querySelectorAll(".mmc-worker-icon").forEach(function (d) {
        d.style.opacity = "1";
      });
    }, 50);

    // Summary
    setTimeout(function () {
      var s = document.getElementById("mmcSummary");
      if (s) s.style.opacity = "1";
    }, 1200);
  }

  var container = document.getElementById("mmcContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
//  <!-- INFOGRAPHIC 6: Thermoset AFP vs Thermoplastic AFP -->
(function () {
  var triggered = false;

  function animate() {
    if (triggered) return;
    triggered = true;

    // Thermoset steps
    var tsSteps = document.querySelectorAll("#tvaTs .tva-step");
    var tsArrows = document.querySelectorAll("#tvaTs .tva-arrow svg");
    tsSteps.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add("tva-in");
      }, i * 120);
    });
    tsArrows.forEach(function (el, i) {
      setTimeout(
        function () {
          el.classList.add("tva-in");
        },
        80 + i * 120,
      );
    });

    // Thermoplastic steps
    var tpSteps = document.querySelectorAll("#tvaTp .tva-step");
    var tpArrows = document.querySelectorAll("#tvaTp .tva-arrow svg");
    tpSteps.forEach(function (el, i) {
      setTimeout(
        function () {
          el.classList.add("tva-in");
        },
        600 + i * 130,
      );
    });
    tpArrows.forEach(function (el, i) {
      setTimeout(
        function () {
          el.classList.add("tva-in");
        },
        680 + i * 130,
      );
    });

    // Advantage cards
    var cards = document.querySelectorAll(".tva-adv-card");
    cards.forEach(function (card, i) {
      setTimeout(
        function () {
          card.classList.add("tva-in");
        },
        1200 + i * 100,
      );
    });
  }

  var container = document.getElementById("tvaContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
//  <!-- INFOGRAPHIC 7: Hybrid LFAM + AFP Workflow -->
(function () {
  var triggered = false;

  function animate() {
    if (triggered) return;
    triggered = true;

    // Step 1
    setTimeout(function () {
      document.getElementById("hlaStep1").classList.add("hla-visible");
    }, 100);

    // Connector 1
    setTimeout(function () {
      document.getElementById("hlaConn1").classList.add("hla-visible");
    }, 500);

    // Step 2
    setTimeout(function () {
      document.getElementById("hlaStep2").classList.add("hla-visible");
    }, 700);

    // Connector 2
    setTimeout(function () {
      document.getElementById("hlaConn2").classList.add("hla-visible");
    }, 1100);

    // Result block
    setTimeout(function () {
      document.getElementById("hlaResult").classList.add("hla-visible");
    }, 1300);

    // Result cards staggered
    ["hlaRc1", "hlaRc2", "hlaRc3", "hlaRc4", "hlaRc5"].forEach(
      function (id, i) {
        setTimeout(
          function () {
            var el = document.getElementById(id);
            if (el) el.classList.add("hla-visible");
          },
          1500 + i * 110,
        );
      },
    );
  }

  var container = document.getElementById("hlaContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
// <!-- INFOGRAPHIC 8: Automated Composite Drone Manufacturing Capability — EU vs US vs China -->
(function () {
  var triggered = false;

  // Strength block configurations per row per country
  // [filled, total, color]
  var configs = {
    capS1usa: [12, 12, "#47577c"],
    capS1cn: [12, 12, "#bf3425"],
    capS1eu: [3, 12, "#9d9d9c"],

    capS2usa: [12, 12, "#47577c"],
    capS2cn: [12, 12, "#bf3425"],
    capS2eu: [0, 12, "#9d9d9c"],

    capS3usa: [12, 12, "#47577c"],
    capS3cn: [12, 12, "#bf3425"],
    capS3eu: [0, 12, "#9d9d9c"],

    capS4usa: [12, 12, "#47577c"],
    capS4cn: [12, 12, "#bf3425"],
    capS4eu: [0, 12, "#9d9d9c"],

    capS5eu: [2, 12, "#bf3425"],
  };

  function buildBlocks(id, filled, total, color) {
    var el = document.getElementById(id);
    if (!el) return;
    for (var i = 0; i < total; i++) {
      var b = document.createElement("div");
      b.className = "cap-block";
      if (i < filled) {
        b.style.background = color;
        b.classList.add("cap-filled");
      } else {
        b.classList.add("cap-empty");
      }
      b.style.transitionDelay = 0.05 * i + "s";
      el.appendChild(b);
    }
  }

  function animate() {
    if (triggered) return;
    triggered = true;

    // Build all blocks
    Object.keys(configs).forEach(function (id) {
      var c = configs[id];
      buildBlocks(id, c[0], c[1], c[2]);
    });

    // Reveal rows
    ["capR1", "capR2", "capR3", "capR4", "capR5"].forEach(function (id, i) {
      setTimeout(function () {
        var el = document.getElementById(id);
        if (el) el.classList.add("cap-visible");
      }, i * 130);
    });

    // Summary cards
    ["capSumUsa", "capSumCn", "capSumEu"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("cap-visible");
        },
        800 + i * 120,
      );
    });
  }

  var container = document.getElementById("capContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
// <!-- INFOGRAPHIC 9: EU Defense Procurement Content -->
(function () {
  var triggered = false;

  function animate() {
    if (triggered) return;
    triggered = true;

    // Reveal rows staggered
    ["edpR1", "edpR2", "edpR3"].forEach(function (id, i) {
      setTimeout(function () {
        var el = document.getElementById(id);
        if (el) el.classList.add("edp-visible");
      }, i * 200);
    });

    // Animate bar fills
    setTimeout(function () {
      document.querySelectorAll(".edp-bar-fill").forEach(function (fill) {
        var w = fill.getAttribute("data-w");
        if (w) fill.style.width = w;
        var lbl = fill.querySelector(".edp-bar-inner-label");
        if (lbl) lbl.style.opacity = "1";
      });
    }, 200);

    // Gap annotations
    ["edpGap1", "edpGap2"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("edp-visible");
        },
        1400 + i * 150,
      );
    });

    // Finding cards
    ["edpFc1", "edpFc2"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("edp-visible");
        },
        1700 + i * 130,
      );
    });
  }

  var container = document.getElementById("edpContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
//  <!-- INFOGRAPHIC 10: Addcomposites Product Ecosystem -->
(function () {
  var triggered = false;

  function animateSvgLine(el, prop, delay) {
    setTimeout(function () {
      if (el) el.style.transition = "stroke-dashoffset 0.5s ease";
      if (el) el.style.strokeDashoffset = "0";
    }, delay);
  }

  function animate() {
    if (triggered) return;
    triggered = true;

    // Hub
    setTimeout(function () {
      document.getElementById("apeHub").classList.add("ape-in");
    }, 80);

    // SVG connectors
    var trunk = document.getElementById("apeTrunk");
    if (trunk) {
      trunk.style.strokeDasharray = "20";
      trunk.style.strokeDashoffset = "20";
      animateSvgLine(trunk, null, 400);
    }
    var cross = document.getElementById("apeCross");
    if (cross) animateSvgLine(cross, null, 550);

    ["apeBrL", "apeBrM", "apeBrR"].forEach(function (id, i) {
      var el = document.getElementById(id);
      if (el) animateSvgLine(el, null, 750 + i * 80);
    });

    ["apeArrL", "apeArrM", "apeArrR"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) {
            el.style.transition = "opacity 0.3s ease";
            el.style.opacity = "1";
          }
        },
        900 + i * 80,
      );
    });

    // Cards
    ["apeCardL", "apeCardM", "apeCardR"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("ape-in");
        },
        1050 + i * 130,
      );
    });

    // Down arrows
    ["apeDnL", "apeDnM", "apeDnR"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("ape-in");
        },
        1500 + i * 80,
      );
    });

    // Outcomes
    ["apeOutL", "apeOutM", "apeOutR"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("ape-in");
        },
        1700 + i * 100,
      );
    });

    // Workflow banner
    setTimeout(function () {
      var el = document.getElementById("apeWfBanner");
      if (el) el.classList.add("ape-in");
    }, 2000);
  }

  var container = document.getElementById("apeContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
//  <!-- INFOGRAPHIC 11: Forward Manufacturing Deployment Concept -->
(function () {
  var triggered = false;

  function animateDash(id, delay) {
    setTimeout(function () {
      var el = document.getElementById(id);
      if (el) {
        el.style.transition = "stroke-dashoffset 0.55s ease";
        el.style.strokeDashoffset = "0";
      }
    }, delay);
  }

  function animate() {
    if (triggered) return;
    triggered = true;

    // Top panel
    setTimeout(function () {
      document.getElementById("fmdTop").classList.add("fmd-in");
    }, 100);

    // Down arrow + launch
    setTimeout(function () {
      document.getElementById("fmdDnArrow").classList.add("fmd-in");
    }, 550);

    setTimeout(function () {
      document.getElementById("fmdLaunch").classList.add("fmd-in");
    }, 700);

    // Network nodes staggered
    ["fmdNodeA", "fmdNodeB", "fmdNodeC", "fmdNodeD"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("fmd-in");
        },
        950 + i * 120,
      );
    });

    // SVG converging lines
    ["fmdNL1", "fmdNL2", "fmdNL3", "fmdNL4"].forEach(function (id, i) {
      animateDash(id, 1500 + i * 80);
    });

    setTimeout(function () {
      var dot = document.getElementById("fmdNDot");
      if (dot) {
        dot.style.transition = "opacity 0.3s ease";
        dot.style.opacity = "1";
      }
    }, 1800);

    // Combined banner
    setTimeout(function () {
      document.getElementById("fmdCombined").classList.add("fmd-in");
    }, 1900);

    // Model cards
    ["fmdMc1", "fmdMc2", "fmdMc3"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("fmd-in");
        },
        2100 + i * 120,
      );
    });
  }

  var container = document.getElementById("fmdContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
// <!-- INFOGRAPHIC 12: European Drone Defence Funding Landscape -->
(function () {
  var triggered = false;

  function animate() {
    if (triggered) return;
    triggered = true;

    // Funding rows
    ["edfR1", "edfR2", "edfR3", "edfR4", "edfR5", "edfR6", "edfR7"].forEach(
      function (id, i) {
        setTimeout(function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("edf-in");
        }, i * 100);
      },
    );

    // Mini bar fills
    setTimeout(function () {
      document.querySelectorAll(".edf-funding-fill").forEach(function (f) {
        var w = f.getAttribute("data-w");
        if (w) f.style.width = w;
      });
    }, 100);

    // Total strip
    setTimeout(function () {
      var el = document.getElementById("edfTotal");
      if (el) el.classList.add("edf-in");
    }, 850);

    // Market rows
    ["edfM24", "edfM26", "edfM28", "edfM30", "edfM34"].forEach(
      function (id, i) {
        setTimeout(
          function () {
            var el = document.getElementById(id);
            if (el) el.classList.add("edf-in");
          },
          1050 + i * 140,
        );
      },
    );

    // Market bar fills
    setTimeout(function () {
      document.querySelectorAll(".edf-mbar-fill").forEach(function (f) {
        var w = f.getAttribute("data-w");
        if (w) f.style.width = w;
        var lbl = f.querySelector(".edf-mbar-inner");
        if (lbl) lbl.style.opacity = "1";
      });
    }, 1150);

    // Growth summary
    setTimeout(function () {
      var el = document.getElementById("edfGrowthBanner");
      if (el) el.classList.add("edf-in");
    }, 1900);
  }

  var container = document.getElementById("edfContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
//  <!-- INFOGRAPHIC 13: Ethical Positioning — The Interceptor Drone in the Spectrum -->
(function () {
  var triggered = false;

  function animate() {
    if (triggered) return;
    triggered = true;

    // Axis
    setTimeout(function () {
      document.getElementById("epsAxis").classList.add("eps-in");
    }, 80);

    // Position dot strip
    setTimeout(function () {
      document.getElementById("epsPosRow").classList.add("eps-in");
    }, 400);

    // Offensive cards left-to-right
    ["epsOff1", "epsOff2", "epsOff3"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("eps-in");
        },
        700 + i * 130,
      );
    });

    // Defensive cards
    ["epsDef1", "epsDef2", "epsFeat"].forEach(function (id, i) {
      setTimeout(
        function () {
          var el = document.getElementById(id);
          if (el) el.classList.add("eps-in");
        },
        750 + i * 130,
      );
    });

    // ICRC banner
    setTimeout(function () {
      document.getElementById("epsIcrc").classList.add("eps-in");
    }, 1400);
  }

  var container = document.getElementById("epsContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
//  <!-- INFOGRAPHIC 14: The Pivot — From Civil Aerospace to Distributed Drone Production -->
(function () {
  var triggered = false;

  function animate() {
    if (triggered) return;
    triggered = true;

    // Pivot diagram
    setTimeout(function () {
      document.getElementById("pvtPivot").classList.add("pvt-in");
    }, 100);

    // Barrier rows + bars staggered
    ["pvtB1", "pvtB2", "pvtB3", "pvtB4", "pvtB5", "pvtB6"].forEach(
      function (id, i) {
        setTimeout(
          function () {
            var el = document.getElementById(id);
            if (el) el.classList.add("pvt-in");
          },
          500 + i * 110,
        );
      },
    );

    // Trad fills
    setTimeout(function () {
      document.querySelectorAll(".pvt-trad-fill").forEach(function (f) {
        var w = f.getAttribute("data-w");
        if (w) f.style.width = w;
      });
    }, 600);

    // Checkmarks
    ["pvtC1", "pvtC2", "pvtC3", "pvtC4", "pvtC5", "pvtC6"].forEach(
      function (id, i) {
        setTimeout(
          function () {
            var el = document.getElementById(id);
            if (el) el.classList.add("pvt-in");
          },
          650 + i * 110,
        );
      },
    );

    // Closing banner
    setTimeout(function () {
      document.getElementById("pvtClosing").classList.add("pvt-in");
    }, 1400);
  }

  var container = document.getElementById("pvtContainer");
  if (container && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    io.observe(container);
  } else {
    setTimeout(animate, 300);
  }
})();
