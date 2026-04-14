// ── Navbar shadow on scroll ──
  window.addEventListener('scroll', () => {
    document.getElementById('mainNavbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Scroll-spy: active nav highlight ──
  const sections = ['hero', 'services', 'doctors', 'about', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  function updateActiveNav() {
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-section', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav(); // run on load so Home is highlighted immediately

  // ── Scroll reveal ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  function showBookingModal() {
    new bootstrap.Modal(document.getElementById('globalBookingModal')).show();
  }

// Camp Registration Modal
  function showCampRegistrationModal() {
    new bootstrap.Modal(document.getElementById('campModal')).show();
  }

  document.getElementById('campForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('campName').value.trim();
    const phone = document.getElementById('campPhone').value.trim();

    // Simulate sending
    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Registering...';
    btn.disabled = true;

    setTimeout(() => {
      bootstrap.Modal.getInstance(document.getElementById('campModal')).hide();

      document.getElementById('campSuccessText').innerHTML = 
        `Thank you, <strong>${name}</strong>!<br><br>` +
        `Your free health check-up camp registration has been confirmed.<br>` +
        `We have sent the details to <strong>${phone}</strong>.<br><br>` +
        `See you this Sunday!`;

      new bootstrap.Modal(document.getElementById('campSuccessModal')).show();

      btn.innerHTML = originalText;
      btn.disabled = false;
      this.reset();
    }, 1200);
  });

  function closeCampSuccess() {
    bootstrap.Modal.getInstance(document.getElementById('campSuccessModal')).hide();
  }
