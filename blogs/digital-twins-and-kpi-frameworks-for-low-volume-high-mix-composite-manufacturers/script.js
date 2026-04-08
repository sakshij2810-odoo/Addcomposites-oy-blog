/* ============================================
   DIGITAL TWINS & KPI BLOG — JAVASCRIPT
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

/* ============================================
   INFOGRAPHIC 1 — LVHM MATRIX (prefix: lvhm-)
   ============================================ */
(function () {
  var wrap = document.getElementById("pvmx-wrap");
  var tt = document.getElementById("pvmx-tt");
  var ttT = document.getElementById("pvmx-tt-title");
  var ttB = document.getElementById("pvmx-tt-body");
  var zones = document.querySelectorAll(".pvmx-zone");

  function showTT(e, title, body) {
    ttT.textContent = title;
    ttB.textContent = body;
    tt.classList.add("pvmx-tt-visible");
    moveTT(e);
  }

  function moveTT(e) {
    var rect = wrap.getBoundingClientRect();
    var x = e.clientX - rect.left + 14;
    var y = e.clientY - rect.top - 10;
    // keep inside container
    if (x + 200 > rect.width) x = e.clientX - rect.left - 210;
    if (y + 90 > rect.height) y = e.clientY - rect.top - 100;
    tt.style.left = x + "px";
    tt.style.top = y + "px";
  }

  function hideTT() {
    tt.classList.remove("pvmx-tt-visible");
  }

  zones.forEach(function (z) {
    var title = z.getAttribute("data-title");
    var body = z.getAttribute("data-body");
    z.addEventListener("mouseenter", function (e) {
      showTT(e, title, body);
    });
    z.addEventListener("mousemove", function (e) {
      moveTT(e);
    });
    z.addEventListener("mouseleave", hideTT);
  });

  // Staggered entrance animation for zone bars
  var bars = document.querySelectorAll(".pvmx-zone-bar");
  bars.forEach(function (b, i) {
    b.style.opacity = "0";
    b.style.transition =
      "opacity 0.5s ease " +
      (0.2 + i * 0.18) +
      "s, transform 0.5s ease " +
      (0.2 + i * 0.18) +
      "s";
    b.style.transform = "scaleX(0.6)";
    b.style.transformOrigin = "left center";
    setTimeout(function () {
      b.style.opacity = "";
      b.style.transform = "scaleX(1)";
    }, 60);
  });
})();

/* ============================================
   INFOGRAPHIC 2 — PRISMA FUNNEL (prefix: pris-)
   ============================================ */
(function () {
  var root = document.getElementById("prisma-root");
  var tt = document.getElementById("prisma-tt");
  var ttT = document.getElementById("prisma-tt-ttl");
  var ttS1 = document.getElementById("prisma-tt-s1");
  var ttV1 = document.getElementById("prisma-tt-v1");
  var ttS2 = document.getElementById("prisma-tt-s2");
  var rows = document.querySelectorAll(".prisma-row");

  /* ── Animate bars on intersection ── */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var fills = entry.target.querySelectorAll(".prisma-bar-fill");
        fills.forEach(function (f, i) {
          var w = parseFloat(f.getAttribute("data-w")) || 0;
          setTimeout(
            function () {
              f.style.width = w + "%";
            },
            i * 90 + 80,
          );
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  /* Observe each row for staggered fill */
  rows.forEach(function (r, idx) {
    observer.observe(r);
  });

  /* ── Tooltip ── */
  function positionTT(e) {
    var rect = root.getBoundingClientRect();
    var x = e.clientX - rect.left + 16;
    var y = e.clientY - rect.top - 12;
    if (x + 210 > rect.width) x = e.clientX - rect.left - 220;
    if (y + 90 > rect.height) y = e.clientY - rect.top - 95;
    tt.style.left = x + "px";
    tt.style.top = y + "px";
  }

  rows.forEach(function (r) {
    var track = r.querySelector(".prisma-bar-track");
    var title = r.getAttribute("data-tt-title");
    var s1 = r.getAttribute("data-tt-src");
    var s2 = r.getAttribute("data-tt-src2");
    var n = r.getAttribute("data-n");

    track.addEventListener("mouseenter", function (e) {
      ttT.textContent = title;
      ttS1.textContent = s1;
      ttV1.textContent = n + " papers";
      ttS2.textContent = s2;
      tt.classList.add("prisma-tt-on");
      positionTT(e);
    });
    track.addEventListener("mousemove", positionTT);
    track.addEventListener("mouseleave", function () {
      tt.classList.remove("prisma-tt-on");
    });
  });
})();

/* ============================================
   INFOGRAPHIC 3 — KPI SHARE (prefix: kpi-)
   ============================================ */
(function () {
  var rows = document.querySelectorAll(".lvkpi-row");
  var tt = document.getElementById("lvkpi-tt");
  var ttTtl = document.getElementById("lvkpi-tt-title");
  var ttRnk = document.getElementById("lvkpi-tt-rank");
  var ttShr = document.getElementById("lvkpi-tt-share");

  /* ── IntersectionObserver: staggered bar fill ── */
  var fired = false;
  var io = new IntersectionObserver(
    function (entries) {
      if (fired) return;
      var visible = entries.some(function (e) {
        return e.isIntersecting;
      });
      if (!visible) return;
      fired = true;
      rows.forEach(function (r, i) {
        var fill = r.querySelector(".lvkpi-fill");
        var w = parseFloat(fill.getAttribute("data-w")) || 0;
        setTimeout(
          function () {
            fill.style.width = w + "%";
          },
          i * 70 + 100,
        );
      });
      io.disconnect();
    },
    { threshold: 0.15 },
  );

  rows.forEach(function (r) {
    io.observe(r);
  });

  /* ── Tooltip ── */
  rows.forEach(function (r) {
    var kpi = r.getAttribute("data-kpi");
    var pct = r.getAttribute("data-pct");
    var rank = r.getAttribute("data-rank");

    r.addEventListener("mouseenter", function (e) {
      ttTtl.textContent = kpi;
      ttRnk.innerHTML = "Rank: <b>" + rank + "</b>";
      ttShr.innerHTML = "Share of mentions: <b>~" + pct + "%</b>";
      tt.classList.add("lvkpi-tt-on");
      moveTT(e);
    });
    r.addEventListener("mousemove", moveTT);
    r.addEventListener("mouseleave", function () {
      tt.classList.remove("lvkpi-tt-on");
    });
  });

  function moveTT(e) {
    var x = e.clientX + 16;
    var y = e.clientY - 14;
    if (x + 220 > window.innerWidth) x = e.clientX - 230;
    if (y + 90 > window.innerHeight) y = e.clientY - 95;
    tt.style.left = x + "px";
    tt.style.top = y + "px";
  }
})();

/* ============================================
   INFOGRAPHIC 4 — SOLUTION FAMILIES (prefix: sol-)
   ============================================ */
(function () {
  var wrap = document.querySelector(".sol-reveal");
  if (!wrap) return;
  var animated = false;

  function animateSol() {
    if (animated) return;
    animated = true;
    var fills = wrap.querySelectorAll(".sol-bar-fill");
    fills.forEach(function (fill) {
      var target = fill.style.width;
      fill.style.width = "0";
      requestAnimationFrame(function () {
        setTimeout(function () {
          fill.style.width = target;
        }, 150);
      });
    });
  }

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateSol();
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  obs.observe(wrap);

  setTimeout(function () {
    var rect = wrap.getBoundingClientRect();
    if (rect.top < window.innerHeight) animateSol();
  }, 200);
})();

/* ============================================
   INFOGRAPHIC 5 — STARTUP APPLICABILITY (prefix: app-)
   ============================================ */
(function () {
  var rows = document.querySelectorAll(".rcap-row");
  var tt = document.getElementById("rcap-tt");
  var ttTtl = document.getElementById("rcap-tt-ttl");
  var ttBdy = document.getElementById("rcap-tt-body");

  /* ── Staggered bar fill on intersection ── */
  var fired = false;
  var io = new IntersectionObserver(
    function (entries) {
      if (fired) return;
      if (
        !entries.some(function (e) {
          return e.isIntersecting;
        })
      )
        return;
      fired = true;
      rows.forEach(function (r, i) {
        var fill = r.querySelector(".rcap-fill");
        var w = parseFloat(fill.getAttribute("data-w")) || 0;
        setTimeout(
          function () {
            fill.style.width = w + "%";
          },
          i * 130 + 120,
        );
      });
      io.disconnect();
    },
    { threshold: 0.15 },
  );

  rows.forEach(function (r) {
    io.observe(r);
  });

  /* ── Tooltip ── */
  rows.forEach(function (r) {
    var tipTitle = r.getAttribute("data-tip-title");
    var tipBody = r.getAttribute("data-tip-body");
    var color = getComputedStyle(r).getPropertyValue("--rcap-color").trim();

    r.addEventListener("mouseenter", function (e) {
      ttTtl.textContent = tipTitle;
      ttTtl.style.color = color;
      ttBdy.textContent = tipBody;
      ttBdy.style.maxWidth = "260px";
      ttBdy.style.whiteSpace = "normal";
      tt.classList.add("rcap-tt-on");
      moveTT(e);
    });
    r.addEventListener("mousemove", moveTT);
    r.addEventListener("mouseleave", function () {
      tt.classList.remove("rcap-tt-on");
    });
  });

  function moveTT(e) {
    var x = e.clientX + 16;
    var y = e.clientY - 14;
    if (x + 290 > window.innerWidth) x = e.clientX - 300;
    if (y + 110 > window.innerHeight) y = e.clientY - 120;
    tt.style.left = x + "px";
    tt.style.top = y + "px";
  }
})();

/* ============================================
   INFOGRAPHIC 6 — DT IMPROVEMENTS (prefix: dtr-)
   ============================================ */
(function () {
  var wrap = document.querySelector(".dtr-reveal");
  if (!wrap) return;
  var animated = false;

  function animateDtr() {
    if (animated) return;
    animated = true;
    var fills = wrap.querySelectorAll(".dtr-fill");
    fills.forEach(function (fill, i) {
      var target = parseFloat(fill.getAttribute("data-w"));
      fill.style.width = "0%";
      setTimeout(
        function () {
          fill.style.width = target + "%";
        },
        150 + i * 100,
      );
    });
  }

  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateDtr();
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  obs.observe(wrap);

  setTimeout(function () {
    var rect = wrap.getBoundingClientRect();
    if (rect.top < window.innerHeight) animateDtr();
  }, 200);
})();

/* ============================================
   INFOGRAPHIC 7 — LITERATURE GAP (prefix: gap-)
   ============================================ */
(function () {
  var cols = document.querySelectorAll(".lvhm-col");
  var observed = false;

  function revealCols() {
    if (observed) return;
    cols.forEach(function (col) {
      col.classList.add("lvhm-visible");
    });
    observed = true;
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealCols();
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(document.getElementById("lvhm-root"));
  } else {
    revealCols();
  }
})();

/* ============================================
   INFOGRAPHIC 8 — AFP KPI STACK (prefix: stk-)
   ============================================ */
(function () {
  var els = [
    document.getElementById("afpkpi-l1"),
    document.getElementById("afpkpi-c12"),
    document.getElementById("afpkpi-l2"),
    document.getElementById("afpkpi-c23"),
    document.getElementById("afpkpi-l3"),
    document.getElementById("afpkpi-c34"),
    document.getElementById("afpkpi-l4"),
  ];

  var delays = [0, 120, 200, 320, 400, 520, 600];
  var triggered = false;

  function revealAll() {
    if (triggered) return;
    triggered = true;
    els.forEach(function (el, i) {
      if (!el) return;
      setTimeout(function () {
        el.classList.add("afpkpi-visible");
      }, delays[i]);
    });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealAll();
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(document.getElementById("afpkpi-root"));
  } else {
    revealAll();
  }
})();

/* ============================================
   INFOGRAPHIC 9 — ACCESSIBILITY LADDER (prefix: lad-)
   ============================================ */
(function () {
  var stages = [
    document.getElementById("acldr-s1"),
    document.getElementById("acldr-s2"),
    document.getElementById("acldr-s3"),
    document.getElementById("acldr-s4"),
  ];
  var footer = document.getElementById("acldr-footer");
  var triggered = false;

  function reveal() {
    if (triggered) return;
    triggered = true;
    // Reveal stages bottom-to-top: s1 first, s4 last
    stages.forEach(function (el, i) {
      if (!el) return;
      setTimeout(function () {
        el.classList.add("acldr-visible");
      }, i * 150);
    });
    if (footer) footer.classList.add("acldr-visible");
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal();
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(document.getElementById("acldr-root"));
  } else {
    reveal();
  }
})();
