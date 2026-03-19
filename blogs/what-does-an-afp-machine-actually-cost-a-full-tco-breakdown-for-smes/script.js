/* ============================================
   AFP TCO BLOG - JAVASCRIPT
   Sidebar Navigation, Progress Bar, Back to Top,
   Mobile Toggle & Interactive Features
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // READING PROGRESS BAR
  // ==========================================
  const progressBar = document.getElementById("readingProgress");

  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";
  }

  // ==========================================
  // BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (!backToTopBtn) return;
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // SIDEBAR ACTIVE SECTION HIGHLIGHTING
  // ==========================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");

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

  // ==========================================
  // COMBINED SCROLL HANDLER (throttled)
  // ==========================================
  let scrollRAF;
  window.addEventListener("scroll", function () {
    if (scrollRAF) window.cancelAnimationFrame(scrollRAF);
    scrollRAF = window.requestAnimationFrame(function () {
      highlightActiveSection();
      updateProgress();
      toggleBackToTop();
    });
  });

  // Initial calls
  highlightActiveSection();
  updateProgress();
  toggleBackToTop();

  // ==========================================
  // SMOOTH SCROLL FOR SIDEBAR LINKS
  // ==========================================
  const sidebar = document.getElementById("blogSidebar");

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

        // Close mobile sidebar after click
        if (sidebar && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  });

  // ==========================================
  // MOBILE NAVIGATION TOGGLE
  // ==========================================
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const sidebarClose = document.getElementById("sidebarClose");

  function openSidebar() {
    if (sidebar) {
      sidebar.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", openSidebar);
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
  }

  // Close sidebar when clicking outside (backdrop)
  document.addEventListener("click", function (e) {
    if (
      sidebar &&
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      e.target !== mobileNavToggle &&
      !mobileNavToggle.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  // Close sidebar on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  // ==========================================
  // CARD ENTRANCE ANIMATIONS (IntersectionObserver)
  // ==========================================
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

  const animatedElements = document.querySelectorAll(
    ".learn-more-card, .feature-item, .spec-card, .scenario-card, .infographic-placeholder",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // ==========================================
  // IMAGE HOVER EFFECTS
  // ==========================================
  const images = document.querySelectorAll(".split-image img");
  images.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      this.style.transform = "scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.14)";
    });
    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.10)";
    });
  });

  // ==========================================
  // TABLE ROW HOVER
  // ==========================================
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f1f5f9";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // ==========================================
  // SPEC ITEMS STAGGERED ANIMATION
  // ==========================================
  const specObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".spec-item");
          items.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateX(-10px)";
            item.style.transition = `opacity 0.4s ease ${index * 0.07}s, transform 0.4s ease ${index * 0.07}s`;
            setTimeout(
              () => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
              },
              50 + index * 70,
            );
          });
          specObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  const scenarioCards = document.querySelectorAll(".scenario-card");
  scenarioCards.forEach((card) => specObserver.observe(card));
});
