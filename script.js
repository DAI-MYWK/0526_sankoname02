// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Counter Animation for Statistics
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector(".hero");
if (heroSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(animateCounters, 1000); // Delay for better effect
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(heroSection);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Tab functionality
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });
});

// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active");
      });

      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});

// Form submission handling
const contactForm = document.querySelector(".form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data["inquiry-type"]) {
      showNotification("必須項目を入力してください。", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification("正しいメールアドレスを入力してください。", "error");
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      showNotification(
        "お問い合わせを受け付けました。ありがとうございます！",
        "success"
      );
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            }"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#d4edda"
            : type === "error"
            ? "#f8d7da"
            : "#d1ecf1"
        };
        color: ${
          type === "success"
            ? "#155724"
            : type === "error"
            ? "#721c24"
            : "#0c5460"
        };
        border: 1px solid ${
          type === "success"
            ? "#c3e6cb"
            : type === "error"
            ? "#f5c6cb"
            : "#bee5eb"
        };
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        margin-left: auto;
        padding: 0.25rem;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      removeNotification(notification);
    });
}

function removeNotification(notification) {
  notification.style.transform = "translateX(100%)";
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effects to cards
function addCardHoverEffects() {
  const cards = document.querySelectorAll(
    ".reason-item, .voice-item, .staff-item, .feature-item, .work-category"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.transition = "all 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Initialize card hover effects
document.addEventListener("DOMContentLoaded", addCardHoverEffects);

// Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Add floating animation to hero elements
function addFloatingAnimation() {
  const floatingElements = document.querySelectorAll(".hero-stats .stat-item");

  floatingElements.forEach((element, index) => {
    element.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
  });
}

// CSS for floating animation
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .notification {
        font-family: 'Zen Maru Gothic', 'Noto Sans JP', sans-serif;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 1rem 0;
        gap: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Initialize floating animation
document.addEventListener("DOMContentLoaded", addFloatingAnimation);

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect for hero title
document.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".title-main");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1500);
  }
});

// Add particle effect to background
function createParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "particles";
  particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 179, 102, 0.3);
            border-radius: 50%;
            animation: float-particle ${
              Math.random() * 10 + 10
            }s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
    particleContainer.appendChild(particle);
  }

  document.body.appendChild(particleContainer);
}

// CSS for particle animation
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
document.addEventListener("DOMContentLoaded", createParticles);

// Add scroll progress indicator
function addScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #FF8C42, #6BBF59);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
}

// Initialize scroll progress
document.addEventListener("DOMContentLoaded", addScrollProgress);

// Add intersection observer for fade-in animations
function addFadeInAnimations() {
  const elements = document.querySelectorAll(
    ".section-header, .about-content > *, .reasons-grid > *, .work-category, .voice-item, .staff-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

// Initialize fade-in animations
document.addEventListener("DOMContentLoaded", addFadeInAnimations);
