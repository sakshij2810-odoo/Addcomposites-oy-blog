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
