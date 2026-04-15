/* ============================================
   CFRT FINANCIAL CASE BLOG — JAVASCRIPT
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

// <!-- INFOGRAPHIC 1 PLACEHOLDER -->

(function () {
  var els = document.querySelectorAll(".cfrpw-wave-card, .cfrpw-connector");

  if (!els.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("cfrpw-visible");
        }
      });
    },
    { threshold: 0.15 },
  );

  els.forEach(function (el) {
    observer.observe(el);
  });
})();
//   <!-- INFOGRAPHIC 2 PLACEHOLDER -->
(function () {
  var els = document.querySelectorAll(".tpc-phase, .tpc-footer");
  if (!els.length) return;
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("tpc-visible");
      });
    },
    { threshold: 0.12 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
})();
//   <!-- INFOGRAPHIC 3 PLACEHOLDER -->
(function () {
  var DATA = {
    PP: {
      name: "PP",
      fullName: "Polypropylene",
      color: "#bf3425",
      domain: "Automotive · High Volume",
      tg: "−10 to 10°C",
      tm: "160–180°C",
      cost: "$2–5 / kg",
      apps: "Short/long fiber composites · Automotive high-volume structural parts",
    },
    PA: {
      name: "PA",
      fullName: "Polyamide (Nylon)",
      color: "#c0442a",
      domain: "Automotive · Pressure Vessels",
      tg: "50–70°C",
      tm: "210–270°C",
      cost: "$2–5 / kg",
      apps: "Automotive structures · Pressure vessels (CF-PA12)",
    },
    PPS: {
      name: "PPS",
      fullName: "Polyphenylene Sulfide",
      color: "#7a6a8a",
      domain: "Aircraft Secondary · Semi-structural",
      tg: "85–95°C",
      tm: "280–290°C",
      cost: "$5–15 / kg",
      apps: "Rudder ribs · Aileron ribs · Landing flaps",
    },
    PEI: {
      name: "PEI",
      fullName: "Polyetherimide (Ultem®)",
      color: "#5e6e90",
      domain: "Interior · FST-Critical",
      tg: "215–225°C",
      tm: "Amorphous",
      cost: "$15–25 / kg",
      apps: "Interior structures · FST (Flame/Smoke/Toxicity) critical parts",
    },
    LMPAEK: {
      name: "LMPAEK",
      fullName: "Low-Melt PAEK",
      color: "#3e5a7c",
      domain: "Aerospace · AFP Processing",
      tg: "120–130°C",
      tm: "270–290°C",
      cost: "$150–200 / kg",
      apps: "AFP & stamp forming · MFFD fuselage skins",
    },
    PEEK: {
      name: "PEEK",
      fullName: "Polyether Ether Ketone",
      color: "#47577c",
      domain: "Aerospace Primary / Secondary",
      tg: "143°C",
      tm: "343°C",
      cost: "$100–150 / kg",
      apps: "Primary & secondary aircraft structures",
    },
    PEKK: {
      name: "PEKK",
      fullName: "Polyetherketoneketone",
      color: "#2e3f5c",
      domain: "Aerospace · Fire/Smoke Critical",
      tg: "150–165°C",
      tm: "305–360°C",
      cost: "> $200 / kg",
      apps: "Better fire/smoke resistance · Wider process window than PEEK",
    },
  };

  // Build bubbles
  var nodes = document.querySelectorAll(".tmsm-node");
  nodes.forEach(function (node) {
    var id = node.getAttribute("data-id");
    var d = DATA[id];
    if (!d) return;
    var bubble = document.createElement("div");
    bubble.className = "tmsm-bubble";
    bubble.style.background = d.color;
    bubble.style.color = "white";
    bubble.textContent = id;
    // stagger
    node.style.transitionDelay = Object.keys(DATA).indexOf(id) * 0.07 + "s";
    node.appendChild(bubble);

    node.addEventListener("click", function () {
      // deactivate all
      nodes.forEach(function (n) {
        n.classList.remove("tmsm-active");
      });
      node.classList.add("tmsm-active");
      showDetail(d);
    });
  });

  function showDetail(d) {
    var panel = document.getElementById("tmsm-detail");
    panel.innerHTML =
      '<div class="tmsm-detail-header">' +
      '<div class="tmsm-detail-badge" style="background:' +
      d.color +
      ';">' +
      d.name +
      "</div>" +
      '<div><div class="tmsm-detail-name">' +
      d.fullName +
      ' <span style="font-family:DM Sans;font-size:16px;color:#9d9d9c;">(' +
      d.name +
      ")</span></div>" +
      '<div class="tmsm-detail-domain" style="color:' +
      d.color +
      ';">' +
      d.domain +
      "</div></div>" +
      "</div>" +
      '<div class="tmsm-detail-specs">' +
      '<div class="tmsm-spec-chip"><div class="tmsm-spec-chip-label">Glass Trans. (T<sub>g</sub>)</div><div class="tmsm-spec-chip-value">' +
      d.tg +
      "</div></div>" +
      '<div class="tmsm-spec-chip"><div class="tmsm-spec-chip-label">Melt Temp (T<sub>m</sub>)</div><div class="tmsm-spec-chip-value">' +
      d.tm +
      "</div></div>" +
      '<div class="tmsm-spec-chip"><div class="tmsm-spec-chip-label">Cost</div><div class="tmsm-spec-chip-value">' +
      d.cost +
      "</div></div>" +
      "</div>" +
      '<div class="tmsm-detail-apps"><strong>Applications →</strong> ' +
      d.apps +
      "</div>";
    panel.classList.add("tmsm-detail-show");
  }

  // Intersection reveal
  var root = document.getElementById("tmsm-root");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          root.classList.add("tmsm-visible");
          obs.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );
  obs.observe(root);
})();
//  <!-- INFOGRAPHIC 4 PLACEHOLDER -->
(function () {
  var tracks = document.querySelectorAll(".cpr-track");
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("cpr-visible");
      });
    },
    { threshold: 0.1 },
  );
  tracks.forEach(function (t) {
    obs.observe(t);
  });
})();
//   <!-- INFOGRAPHIC 5 PLACEHOLDER -->
(function () {
  var root = document.getElementById("mffd-root");
  var upper = document.getElementById("mffd-upper");
  var lower = document.getElementById("mffd-lower");
  var joinCard = document.getElementById("mffd-join");

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          root.classList.add("mffd-visible");
          setTimeout(function () {
            upper.classList.add("mffd-anim");
          }, 100);
          setTimeout(function () {
            lower.classList.add("mffd-anim");
          }, 220);
          setTimeout(function () {
            joinCard.classList.add("mffd-anim");
          }, 800);
          obs.disconnect();
        }
      });
    },
    { threshold: 0.08 },
  );
  obs.observe(root);
})();
//  <!-- INFOGRAPHIC 6 PLACEHOLDER -->
(function () {
  var root = document.getElementById("cmf-root");
  var nodes = root.querySelectorAll(".cmf-node[id]");

  var obsRoot = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          root.classList.add("cmf-visible");
          // stagger each node
          var delay = 0;
          nodes.forEach(function (node) {
            (function (n, d) {
              setTimeout(function () {
                n.classList.add("cmf-anim");
              }, d);
            })(node, delay);
            delay += 70;
          });
          obsRoot.disconnect();
        }
      });
    },
    { threshold: 0.08 },
  );

  obsRoot.observe(root);
})();
