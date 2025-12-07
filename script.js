/* ==========================================
   ShiftArmor Landing Page Scripts
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const _navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      if (_navLinks) {
        _navLinks.classList.toggle('active');
      }
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Navbar Background on Scroll
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.background = 'rgba(5, 5, 5, 0.98)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
  });

  // Floating CTA Visibility
  const floatingCta = document.querySelector('.floating-cta');
  const contactSection = document.getElementById('contact');

  if (floatingCta && contactSection) {
    window.addEventListener('scroll', function () {
      const contactRect = contactSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Hide when contact section is in view
      if (contactRect.top < windowHeight && contactRect.bottom > 0) {
        floatingCta.style.opacity = '0';
        floatingCta.style.pointerEvents = 'none';
      } else {
        floatingCta.style.opacity = '1';
        floatingCta.style.pointerEvents = 'auto';
      }
    });
  }

  // Form Submission Handler
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Collect form data
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showNotification("Thank you! We'll be in touch within 24 hours.", 'success');

        // Reset form
        this.reset();
      }, 1500);
    });
  }

  // Simple Notification System
  function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '16px 24px',
      background: type === 'success' ? '#22c55e' : '#3b82f6',
      color: '#fff',
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      zIndex: '9999',
      animation: 'slideIn 0.3s ease',
    });

    // Add animation keyframes if not exists
    if (!document.querySelector('#notificationStyles')) {
      const style = document.createElement('style');
      style.id = 'notificationStyles';
      style.textContent = `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  // Intersection Observer for Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.feature-card, .benefit-card, .problem-card, .industry-card, .pricing-card',
  );

  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add animation styles
  const animationStyle = document.createElement('style');
  animationStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(animationStyle);

  // Stagger animations for grid items
  document
    .querySelectorAll('.features-grid, .benefits-grid, .problem-grid, .industries-grid')
    .forEach((grid) => {
      const items = grid.querySelectorAll(
        '.feature-card, .benefit-card, .problem-card, .industry-card',
      );
      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 100}ms`;
      });
    });
});
