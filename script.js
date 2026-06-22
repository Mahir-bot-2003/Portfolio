/* ═══════════════════════════════════════════════════════════
   MAHIR MAKAR — PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ─── NAVBAR SCROLL ────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ─── MOBILE NAVIGATION ───────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });

  // ─── SCROLL REVEAL ANIMATIONS ─────────────────────────────
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.animationDelay || '0s';
        const delayMs = parseFloat(delay) * 1000;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delayMs);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── SKILL BARS ANIMATION ─────────────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  skillFills.forEach(bar => skillObserver.observe(bar));

  // ─── STAT COUNTER ANIMATION ───────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  function animateCounter(el, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  statNumbers.forEach(num => counterObserver.observe(num));

  // ─── CANVAS NETWORK PARTICLES ───────────────────────────────────
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 74, 0, 0.6)';
        ctx.fill();
      }
    }
    
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 74, 0, ${0.2 - distance/600})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
  }

  // ─── TILT EFFECT ON PROJECT CARDS ─────────────────────────
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ─── MAGNETIC EFFECT ON BUTTONS ───────────────────────────
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // ─── PARALLAX EFFECT ON LANDING ───────────────────────────
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const landingText = document.querySelector('.landing-text-main');
    if (landingText && scrolled < window.innerHeight) {
      landingText.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  }, { passive: true });

  // ─── CURSOR GLOW (DESKTOP ONLY) ──────────────────────────
  if (window.matchMedia('(min-width: 769px)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(232, 97, 10, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: left 0.3s ease, top 0.3s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ─── TEXT TYPING EFFECT FOR DESIGNATIONS ──────────────────
  const designationItems = document.querySelectorAll('.designation-item');
  
  designationItems.forEach((item, index) => {
    const text = item.textContent;
    item.textContent = '';
    item.style.opacity = '1';
    
    const startDelay = 800 + (index * 600);
    
    setTimeout(() => {
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          item.textContent += text[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 30);
    }, startDelay);
  });

  // ─── INTERSECTION OBSERVER FOR TIMELINE DOTS ──────────────
  const timelineDots = document.querySelectorAll('.timeline-dot');
  
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'scale(1.3)';
        entry.target.style.boxShadow = '0 0 0 6px rgba(232, 97, 10, 0.3), 0 0 20px rgba(232, 97, 10, 0.2)';
        setTimeout(() => {
          entry.target.style.transform = 'scale(1)';
        }, 600);
      }
    });
  }, { threshold: 0.5 });

  timelineDots.forEach(dot => {
    dot.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    dotObserver.observe(dot);
  });

  // ─── RIPPLE EFFECT ON CARDS ───────────────────────────────
  const allCards = document.querySelectorAll('.cert-card, .achievement-card, .timeline-card');
  
  allCards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: rgba(232, 97, 10, 0.1);
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-effect {
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // ─── PRELOADER ────────────────────────────────────────────
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger landing animations
    const landingReveals = document.querySelectorAll('.landing-section .reveal-up');
    landingReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, index * 150);
    });
  });
});

// Contact Form Submission Handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit-new');
      const originalContent = submitBtn.innerHTML;
      
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Show sending state
      submitBtn.innerHTML = 'Sending... <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>';
      submitBtn.style.opacity = '0.8';
      submitBtn.style.pointerEvents = 'none';

      // Actual API call to Formsubmit.co
      fetch("https://formsubmit.co/ajax/mahirmakar25@gmail.com", {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: fullName,
              email: email,
              message: message,
              _subject: "New Portfolio Message from " + fullName,
              _template: "box" // nice email template
          })
      })
      .then(response => response.json())
      .then(data => {
          if(data.success) {
            submitBtn.innerHTML = 'Message Sent! <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            submitBtn.style.backgroundColor = '#10B981'; // Success Green
            submitBtn.style.color = '#fff';
            submitBtn.style.borderColor = '#10B981';
            contactForm.reset();
          } else {
            throw new Error("Formsubmit failed");
          }
      })
      .catch(error => {
          submitBtn.innerHTML = 'Failed <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
          submitBtn.style.backgroundColor = '#EF4444'; // Error Red
          submitBtn.style.borderColor = '#EF4444';
      })
      .finally(() => {
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.borderColor = '';
            submitBtn.style.opacity = '1';
            submitBtn.style.pointerEvents = 'auto';
          }, 3000);
      });
    });
  }
});

// ─── CERTIFICATE MODAL ───────────────────────────────────────
function openModal(imageSrc) {
  const modal = document.getElementById('certModal');
  const modalImage = document.getElementById('modalImage');
  modalImage.src = imageSrc;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('certModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
