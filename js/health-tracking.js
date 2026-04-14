let toastTimer = null;
  const TOAST_DURATION = 10000;

  function showTrackingModal() {
    const modal = new bootstrap.Modal(document.getElementById('trackingModal'));
    modal.show();
  }

  // Form Submit
  document.getElementById('trackingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    this.classList.add('was-validated');
    if (!this.checkValidity()) return;

    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('trackingEmail').value.trim();
    const goal = document.getElementById('trackingGoal').value || "General wellness monitoring";

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Setting up...';
    btn.disabled = true;

    setTimeout(() => {
      // Hide the form modal
      bootstrap.Modal.getInstance(document.getElementById('trackingModal')).hide();

      // Show the beautiful toast
      showToast({
        name: name,
        email: email,
        goal: goal
      });

      btn.innerHTML = originalText;
      btn.disabled = false;
      this.reset();
      this.classList.remove('was-validated');
    }, 1200);
  });

  // Show Toast (same style as consultation page)
  function showToast(data) {
    document.getElementById('tName').textContent = data.name;
    document.getElementById('tGoal').textContent = data.goal;

    const toast = document.getElementById('hcToast');
    const bar = document.getElementById('toastProgress');

    toast.classList.remove('hide');
    void toast.offsetWidth;
    toast.classList.add('show');

    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(1)';
    void bar.offsetWidth;
    bar.style.transition = 'transform ' + (TOAST_DURATION / 1000) + 's linear';
    bar.style.transform = 'scaleX(0)';

    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, TOAST_DURATION);
  }

  function hideToast() {
    const toast = document.getElementById('hcToast');
    toast.classList.remove('show');
    toast.classList.add('hide');
    clearTimeout(toastTimer);
  }
