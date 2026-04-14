let toastTimer = null;
const TOAST_DURATION = 10000;

function showOrderModal() {
  const modal = new bootstrap.Modal(document.getElementById('orderModal'));
  modal.show();
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.classList.add('was-validated');
  if (!this.checkValidity()) return;

  const name = document.getElementById('orderName').value.trim();
  const email = document.getElementById('orderEmail').value.trim();

  const btn = this.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...';
  btn.disabled = true;

  setTimeout(() => {
    bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
    showToast({ name });

    btn.innerHTML = originalText;
    btn.disabled = false;
    this.reset();
    this.classList.remove('was-validated');
  }, 1200);
});

function showToast(data) {
  document.getElementById('tName').textContent = data.name;

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
