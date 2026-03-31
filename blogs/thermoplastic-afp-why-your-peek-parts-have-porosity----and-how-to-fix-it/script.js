/* ============================================
   PEEK POROSITY AFP BLOG — JAVASCRIPT
   Sidebar, Animations, Infographics
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

  // Close sidebar on outside click
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

  // Close sidebar on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
  });

  // ─── Card Animations ─────────────────────────────────────────────────────────
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };

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

  const animatedEls = document.querySelectorAll(
    ".learn-more-card, .feature-item",
  );
  animatedEls.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // ─── Image Hover Effects ─────────────────────────────────────────────────────
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

  // ─── Back to Top Button ──────────────────────────────────────────────────────
  (function () {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Scroll back to top");
    button.style.cssText = [
      "position:fixed",
      "bottom:30px",
      "right:30px",
      "width:48px",
      "height:48px",
      "background:linear-gradient(135deg,#bf3425 0%,#9d2a1e 100%)",
      "color:white",
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

    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 8px 25px rgba(191,52,37,0.4)";
    });
    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(191,52,37,0.3)";
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
  })();

  // ─── Reading Progress Bar ────────────────────────────────────────────────────
  (function () {
    const progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    progressBar.style.cssText = [
      "position:fixed",
      "top:0",
      "left:0",
      "height:3px",
      "background:linear-gradient(90deg,#bf3425,#47577c)",
      "z-index:9999",
      "transition:width 0.1s linear",
      "width:0%",
    ].join(";");
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const progress = (window.scrollY / documentHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 1 — VOID DISTRIBUTION (vds-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var vdsEls = document.querySelectorAll(
      ".vds-reveal, .vds-title, .vds-subtitle, .vds-diagram, .vds-legend",
    );
    if (!vdsEls.length) return;

    var tooltip = document.getElementById("vdsTooltip");
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("vds-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    vdsEls.forEach(function (el) {
      obs.observe(el);
    });

    // Also observe the container elements that use inline opacity/transform
    var container = document.querySelector(".vds-container");
    if (container) {
      var subEls = container.querySelectorAll(
        ".vds-title, .vds-subtitle, .vds-diagram, .vds-legend",
      );
      subEls.forEach(function (el) {
        var subObs = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                subObs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 },
        );
        subObs.observe(el);
      });
    }

    // Tooltip on void segments
    if (tooltip) {
      var voidSegs = document.querySelectorAll(".vds-ply-segment.void");
      voidSegs.forEach(function (seg) {
        seg.addEventListener("mouseenter", function (e) {
          tooltip.querySelector(".vds-tooltip-title").textContent =
            seg.dataset.tooltip || "";
          tooltip.querySelector(".vds-tooltip-desc").textContent =
            seg.dataset.desc || "";
          tooltip.style.display = "block";
          positionTooltip(e);
        });
        seg.addEventListener("mousemove", positionTooltip);
        seg.addEventListener("mouseleave", function () {
          tooltip.style.display = "none";
        });
      });

      function positionTooltip(e) {
        var rect = document
          .querySelector(".vds-container")
          .getBoundingClientRect();
        var x = e.clientX - rect.left + 10;
        var y = e.clientY - rect.top + 10;
        tooltip.style.left = x + "px";
        tooltip.style.top = y + "px";
      }
    }
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 2 — CONSOLIDATION TIME BUDGET (ctb-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var ctbEls = document.querySelectorAll(".ctb-reveal");
    if (!ctbEls.length) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("ctb-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    ctbEls.forEach(function (el) {
      obs.observe(el);
    });

    // Also apply opacity reveal to ctb-title / ctb-subtitle
    var ctbTitles = document.querySelectorAll(".ctb-title, .ctb-subtitle");
    ctbTitles.forEach(function (el) {
      var o = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              o.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      o.observe(el);
    });
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 3 — COMPACTION PRESSURE (cpv-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var cpvEls = document.querySelectorAll(
      ".cpv-reveal, .cpv-title, .cpv-subtitle",
    );
    if (!cpvEls.length) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("cpv-visible");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    cpvEls.forEach(function (el) {
      obs.observe(el);
    });
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 4 — MOISTURE ABSORPTION (mab-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var mabEls = document.querySelectorAll(
      ".mab-reveal, .mab-title, .mab-subtitle",
    );
    if (!mabEls.length) return;

    var animated = false;
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("mab-visible");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);

            // Animate the curve
            if (!animated) {
              animated = true;
              var curve = document.querySelector(".mab-curve");
              if (curve) {
                curve.style.strokeDashoffset = "0";
              }
            }
          }
        });
      },
      { threshold: 0.15 },
    );

    mabEls.forEach(function (el) {
      obs.observe(el);
    });
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 5 — PRE-DRYING PROTOCOL (pdp-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var pdpEls = document.querySelectorAll(".pdp-reveal, .pdp-title");
    if (!pdpEls.length) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("pdp-visible");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    pdpEls.forEach(function (el) {
      obs.observe(el);
    });
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 6 — HEATER THERMAL DEPTH (htd-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var htdEls = document.querySelectorAll(
      ".htd-reveal, .htd-title, .htd-subtitle",
    );
    if (!htdEls.length) return;

    var barsAnimated = false;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("htd-visible");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);

            if (!barsAnimated) {
              barsAnimated = true;
              setTimeout(function () {
                var bars = document.querySelectorAll(".htd-bar");
                bars.forEach(function (bar) {
                  var w =
                    bar.style.getPropertyValue("--w") ||
                    bar.getAttribute("style").match(/--w:([\d.]+%)/)?.[1];
                  if (w) {
                    bar.style.width = w;
                  } else {
                    // Fallback: parse the inline style
                    var styleStr = bar.getAttribute("style") || "";
                    var match = styleStr.match(/--w:\s*([\d.]+%)/);
                    if (match) bar.style.width = match[1];
                  }
                });
              }, 300);
            }
          }
        });
      },
      { threshold: 0.15 },
    );

    htdEls.forEach(function (el) {
      obs.observe(el);
    });
  })();

  // Actually animate htd-bars by reading data-w
  (function () {
    var bars = document.querySelectorAll(".htd-bar");
    bars.forEach(function (bar) {
      // Extract --w value from style attribute
      var styleAttr = bar.getAttribute("style") || "";
      var match = styleAttr.match(/--w:\s*([\d.]+%)/);
      var targetWidth = match ? match[1] : "0%";
      bar.setAttribute("data-w", targetWidth);
      bar.style.width = "0%"; // start at 0

      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setTimeout(function () {
                bar.style.width = targetWidth;
              }, 200);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 },
      );
      obs.observe(bar);
    });
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 7 — RECRYSTALLISATION WINDOW (rcw-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var rcwEls = document.querySelectorAll(
      ".rcw-reveal, .rcw-title, .rcw-subtitle",
    );
    if (!rcwEls.length) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("rcw-visible");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    rcwEls.forEach(function (el) {
      obs.observe(el);
    });

    // Animate SVG lines in rcw
    var rcwLines = document.querySelectorAll(".rcw-line");
    rcwLines.forEach(function (line) {
      var length = line.getTotalLength ? line.getTotalLength() : 600;
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;
      line.style.transition = "stroke-dashoffset 1.5s ease";

      var lineObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              line.style.strokeDashoffset = "0";
              lineObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );
      lineObs.observe(line);
    });
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 8 — DIAGNOSIS FLOWCHART (pdf-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var pdfEls = document.querySelectorAll(
      ".pdf-reveal, .pdf-title, .pdf-subtitle",
    );
    if (!pdfEls.length) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("pdf-visible");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    pdfEls.forEach(function (el) {
      obs.observe(el);
    });

    // Hover highlight on result nodes
    var resultNodes = document.querySelectorAll(".pdf-node.result");
    resultNodes.forEach(function (node) {
      node.style.transition = "transform 0.2s, box-shadow 0.2s";
      node.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)";
        this.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
      });
      node.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "none";
      });
    });
  })();

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOGRAPHIC 9 — PARAMETER TABLE (ppt-)
  // ═══════════════════════════════════════════════════════════════════════════
  (function () {
    var pptEls = document.querySelectorAll(
      ".ppt-reveal, .ppt-title, .ppt-subtitle",
    );
    if (!pptEls.length) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("ppt-visible");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    pptEls.forEach(function (el) {
      obs.observe(el);
    });

    // Row hover for table
    var rows = document.querySelectorAll(".ppt-table tbody tr");
    rows.forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "#f1f5f9";
      });
      row.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "";
      });
    });
  })();

  // ─── CTB Bar animation ───────────────────────────────────────────────────────
  (function () {
    var ctbBars = document.querySelectorAll(".ctb-bar");
    ctbBars.forEach(function (bar) {
      var styleStr = bar.getAttribute("style") || "";
      var match = styleStr.match(/width:\s*([\d.]+%)/);
      var targetWidth = match ? match[1] : "100%";
      bar.style.width = "0%";
      bar.style.transition = "width 1s ease 0.3s";

      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setTimeout(function () {
                bar.style.width = targetWidth;
              }, 200);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 },
      );
      obs.observe(bar);
    });
  })();
});
