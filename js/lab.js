let toastTimer = null;
const TOAST_DURATION = 10000;

function showLabModal() {
  const modal = new bootstrap.Modal(document.getElementById('labModal'));
  modal.show();
}

document.getElementById('labForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.classList.add('was-validated');
  if (!this.checkValidity()) return;

  const name = document.getElementById('labName').value.trim();
  const email = document.getElementById('labEmail').value.trim();
  const phone = document.getElementById('labPhone').value.trim();
  const test = document.getElementById('labTest').value;

  const btn = this.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...';
  btn.disabled = true;

  setTimeout(() => {
    bootstrap.Modal.getInstance(document.getElementById('labModal')).hide();
    showToast({ name, test: test || 'Lab Test' });

    btn.innerHTML = originalText;
    btn.disabled = false;
    this.reset();
    this.classList.remove('was-validated');
  }, 1200);
});

function showToast(data) {
  document.getElementById('tName').textContent = data.name;
  document.getElementById('tTest').textContent = data.test;

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
