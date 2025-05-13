// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {

  // Update current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Header scroll effect
  const header = document.getElementById('header');
  const scrollFunction = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', scrollFunction);

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  });

  closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  });

  // Highlight active navigation link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.desktop-nav a');

  const highlightNavLink = () => {
    let scrollPosition = window.scrollY + 100; // Adding offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const subject = this.querySelector('#subject').value.trim();
      const message = this.querySelector('#message').value.trim();

      // Simple validation
      if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate API call with timeout
      setTimeout(() => {
        // Reset form
        contactForm.reset();

        // Show success message
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        // Clear message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message';
    formMessage.classList.add(type);
    formMessage.style.display = 'block';
  }

  // Skill bar animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';

      setTimeout(() => {
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.width = width;
      }, 100);
    });
  }

  // Animate skill bars when section comes into view
  const skillsSection = document.querySelector('.skills-section');

  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
  }

  // Initialize AOS animation library if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
});
