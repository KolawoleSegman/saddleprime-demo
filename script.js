/**
 * SaddlePrime Y13 Landing Page, Vanilla JS
 * Demo only: no backend, no real orders stored.
 */

(function () {
  'use strict';

  // ---------- DOM refs ----------
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const orderModal = document.getElementById('orderModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');
  const modalSuccess = document.getElementById('modalSuccess');
  const successClose = document.getElementById('successClose');
  const orderForm = document.getElementById('orderForm');
  const yearEl = document.getElementById('year');

  // ---------- Year ----------
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Product Rotator (hero) ----------
  (function initProductRotator() {
    const rotator = document.getElementById('productRotator');
    if (!rotator) return;

    const slides = Array.from(rotator.querySelectorAll('.rotator-slide'));
    const dots = Array.from(rotator.querySelectorAll('.rotator-dot'));
    const prevBtn = document.getElementById('rotatorPrev');
    const nextBtn = document.getElementById('rotatorNext');
    const total = slides.length;
    if (total < 2) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 4000; // ms between auto-rotates

    function goTo(index) {
      if (index === current) return;
      const prev = current;
      current = (index + total) % total;

      slides[prev].classList.remove('is-active');
      slides[prev].setAttribute('aria-hidden', 'true');
      slides[current].classList.add('is-active');
      slides[current].setAttribute('aria-hidden', 'false');

      dots.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', String(active));
      });
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(next, INTERVAL);
    }

    function stopAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const i = Number(dot.getAttribute('data-index'));
        goTo(i);
        startAuto();
      });
    });

    // Pause auto-rotate on hover / focus (desktop)
    rotator.addEventListener('mouseenter', stopAuto);
    rotator.addEventListener('mouseleave', startAuto);
    rotator.addEventListener('focusin', stopAuto);
    rotator.addEventListener('focusout', startAuto);

    // Keyboard: left/right when rotator is focused
    rotator.setAttribute('tabindex', '0');
    rotator.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        startAuto();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        startAuto();
      }
    });

    startAuto();
  })();

  // ---------- Mobile navigation ----------
  function openNav() {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleNav);

    // Close when a nav link is clicked
    navMenu.querySelectorAll('.nav-link, .order-btn').forEach((el) => {
      el.addEventListener('click', closeNav);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  // ---------- Order Modal ----------
  const openTriggers = document.querySelectorAll('[data-open-modal]');

  function openModal() {
    orderModal.hidden = false;
    // Force reflow then add class for transition
    requestAnimationFrame(() => {
      orderModal.classList.add('is-open');
    });
    document.body.classList.add('modal-open');
    // Reset form view
    modalBody.hidden = false;
    modalSuccess.hidden = true;
    orderForm.reset();
    clearErrors();
    // Focus first field
    const firstInput = orderForm.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  function closeModal() {
    orderModal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      orderModal.hidden = true;
    }, 300);
  }

  openTriggers.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (successClose) {
    successClose.addEventListener('click', closeModal);
  }

  // Close on overlay click
  orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
      closeModal();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // ---------- Form validation (demo only) ----------
  function clearErrors() {
    orderForm.querySelectorAll('.form-error').forEach((el) => {
      el.textContent = '';
    });
    orderForm.querySelectorAll('.is-invalid').forEach((el) => {
      el.classList.remove('is-invalid');
    });
  }

  function showError(input, errorEl, message) {
    input.classList.add('is-invalid');
    errorEl.textContent = message;
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    const name = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const state = document.getElementById('state');
    const accept = document.getElementById('acceptOrder');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const addressError = document.getElementById('addressError');
    const stateError = document.getElementById('stateError');
    const acceptError = document.getElementById('acceptError');

    if (!name.value.trim()) {
      showError(name, nameError, 'Please enter your full name.');
      valid = false;
    }

    const phoneVal = phone.value.trim();
    if (!phoneVal) {
      showError(phone, phoneError, 'Please enter your phone number.');
      valid = false;
    } else if (!/^[0-9+\s\-()]{8,15}$/.test(phoneVal)) {
      showError(phone, phoneError, 'Please enter a valid phone number.');
      valid = false;
    }

    if (!address.value.trim()) {
      showError(address, addressError, 'Please enter your delivery address.');
      valid = false;
    }

    if (!state.value.trim()) {
      showError(state, stateError, 'Please enter your state.');
      valid = false;
    }

    if (!accept.checked) {
      acceptError.textContent = 'Please confirm you will accept the order.';
      valid = false;
    }

    return valid;
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // DEMO: No real submission. Validate only.
      if (!validateForm()) {
        return;
      }

      // Show success state
      modalBody.hidden = true;
      modalSuccess.hidden = false;
    });
  }

  // ---------- FAQ Accordion ----------
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(btn.getAttribute('aria-controls'));

      // Close all others
      faqQuestions.forEach((other) => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherAnswer = document.getElementById(other.getAttribute('aria-controls'));
          if (otherAnswer) {
            otherAnswer.hidden = true;
          }
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', String(!isExpanded));
      if (answer) {
        answer.hidden = isExpanded;
      }
    });
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll(
    '.feature-card, .included-card, .why-card, .section-header, .pricing-card, .faq-list, .showcase-content, .showcase-visual'
  );

  revealEls.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
