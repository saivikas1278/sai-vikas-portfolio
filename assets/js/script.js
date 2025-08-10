document.addEventListener('DOMContentLoaded', () => {
  // Update footer year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();

  // Typewriter effect
  const typewriterText = document.querySelector('.typewriter-text');
  if (typewriterText) {
    const phrases = [
      'Full-Stack Developer',
      'Problem Solver',
      'Tech Enthusiast',
      'Code Craftsman',
      'Innovation Seeker'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
  }

  // Testimonials slider
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
      });
    });

    // Auto-rotate testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // Scroll header effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Mobile navigation
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  mobileMenuBtn?.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active nav highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.desktop-nav a');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced contact form with EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init('IszgZjQjoAHMzT-uD');
  }

  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const dateInput = document.getElementById('date');

  if (dateInput) {
    dateInput.value = new Date().toLocaleString();
  }

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      formMessage.textContent = '';
      formMessage.className = 'form-message';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      emailjs.sendForm('service_aa3t9rc', 'template_dv554bv', contactForm)
        .then(() => {
          formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
          formMessage.classList.add('success');
          contactForm.reset();
          if (dateInput) dateInput.value = new Date().toLocaleString();
          
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        })
        .catch(error => {
          formMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to send message. Please try again.';
          formMessage.classList.add('error');
          console.error('EmailJS error:', error);
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Skill bar animation
  const animateSkillBars = () => {
    document.querySelectorAll('.skill-progress').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.width = width;
      }, 100);
    });
  };

  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    skillsObserver.observe(skillsSection);
  }

  // Add CSS animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});
