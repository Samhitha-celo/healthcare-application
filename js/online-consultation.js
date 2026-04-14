let toastTimer = null;
  const TOAST_DURATION = 12000;

  // Video / Chat toggle + email show/hide
  function selectType(type) {
    document.getElementById('videoCard').classList.toggle('active', type === 'video');
    document.getElementById('chatCard').classList.toggle('active', type === 'chat');

    const emailField = document.getElementById('emailField');
    if (type === 'chat') {
      emailField.style.display = 'none';
      document.getElementById('bookEmail').removeAttribute('required');
    } else {
      emailField.style.display = 'block';
      document.getElementById('bookEmail').setAttribute('required', 'required');
    }
  }

  // Show Toast
  function showToast(data) {
    const isVideo = data.type === 'Video';

    document.getElementById('tName').textContent    = data.name;
    document.getElementById('tType').textContent    = data.type + ' Consultation';
    document.getElementById('tSlot').textContent    = data.slot;
    document.getElementById('tConcern').textContent = data.concern || 'General consultation';
    document.getElementById('tDate').textContent    = new Date(data.date).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    const badge    = document.getElementById('tBadge');
    const bar      = document.getElementById('toastProgress');
    const sentIcon = document.getElementById('tSentIcon');

    if (isVideo) {
      badge.className    = 'toast-badge video';
      bar.className      = 'toast-progress video-bar';
      sentIcon.className = 'sent-icon video';
      sentIcon.innerHTML = '<i class="bi bi-envelope-fill"></i>';
      document.getElementById('tTitle').textContent    = 'Video appointment confirmed!';
      document.getElementById('tSubtitle').textContent = 'Your doctor will join the call on time.';
      document.getElementById('tSentTo').innerHTML     = 'Confirmation link sent to <strong>' + data.email + '</strong>';
    } else {
      badge.className    = 'toast-badge chat';
      bar.className      = 'toast-progress chat-bar';
      sentIcon.className = 'sent-icon chat';
      sentIcon.innerHTML = '<i class="bi bi-whatsapp"></i>';
      document.getElementById('tTitle').textContent    = 'Chat session confirmed!';
      document.getElementById('tSubtitle').textContent = 'A doctor will connect with you on WhatsApp.';
      document.getElementById('tSentTo').innerHTML     = 'WhatsApp details sent to <strong>' + data.phone + '</strong>';
    }

    const toast = document.getElementById('hcToast');
    toast.classList.remove('hide');
    void toast.offsetWidth;
    toast.classList.add('show');

    bar.style.transition = 'none';
    bar.style.transform  = 'scaleX(1)';
    void bar.offsetWidth;
    bar.style.transition = 'transform ' + (TOAST_DURATION / 1000) + 's linear';
    bar.style.transform  = 'scaleX(0)';

    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, TOAST_DURATION);
  }

  // Hide Toast
  function hideToast() {
    const toast = document.getElementById('hcToast');
    toast.classList.remove('show');
    toast.classList.add('hide');
    clearTimeout(toastTimer);
  }

  // Add to Calendar
  function addToCalendar() {
    hideToast();   // Close toast first

    const calendarModal = new bootstrap.Modal(document.getElementById('calendarModal'));
    calendarModal.show();
  }

  // Close Calendar Modal
  function closeCalendarModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('calendarModal'));
    if (modal) modal.hide();
  }

  // Form Submit
  document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    this.classList.add('was-validated');
    if (!this.checkValidity()) return;

    const isVideo = document.getElementById('videoCard').classList.contains('active');
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Booking...';
    btn.disabled = true;

    setTimeout(() => {
      showToast({
        name:    document.getElementById('bookName').value.trim(),
        email:   document.getElementById('bookEmail').value.trim(),
        phone:   document.getElementById('bookPhone').value.trim(),
        date:    document.getElementById('bookDate').value,
        slot:    document.getElementById('bookTime').value,
        concern: document.getElementById('bookConcern').value,
        type:    isVideo ? 'Video' : 'Chat'
      });

      btn.innerHTML = originalText;
      btn.disabled = false;
      this.reset();
      this.classList.remove('was-validated');
    }, 1200);
  });
