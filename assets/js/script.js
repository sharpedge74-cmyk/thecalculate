// Polite non-blocking alert replacement to prevent iframe freezing
window.alert = function(message) {
  let toast = document.getElementById('applet-toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'applet-toast-notice';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#19161d;color:#ffffff;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:99999;max-width:90vw;text-align:center;transition:opacity 0.2s ease-in-out;font-family:sans-serif;pointer-events:none;';
    if (document.body) {
      document.body.appendChild(toast);
    } else {
      document.addEventListener('DOMContentLoaded', () => document.body.appendChild(toast));
    }
  }
  toast.textContent = message;
  toast.style.display = 'block';
  toast.style.opacity = '1';
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 200);
  }, 3500);
};

// Global interactive helpers
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Nav Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMobileNav = document.getElementById('closeMobileNav');
  const mobileNav = document.getElementById('mobileNav');
  
  function openMobile() {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobile() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobile);
  if (closeMobileNav) closeMobileNav.addEventListener('click', closeMobile);

  // Desktop Mega Menu
  const megaTrigger = document.getElementById('megaTrigger');
  const megaMenu = document.getElementById('megaMenu');
  
  function toggleMega(force) {
    if (!megaTrigger || !megaMenu) return;
    const open = force !== undefined ? force : !megaMenu.classList.contains('open');
    megaMenu.classList.toggle('open', open);
    megaTrigger.setAttribute('aria-expanded', String(open));
  }
  
  if (megaTrigger) {
    megaTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMega();
    });
  }
  
  document.addEventListener('click', function(e) {
    if (megaMenu && megaTrigger && !megaMenu.contains(e.target) && e.target !== megaTrigger) {
      toggleMega(false);
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      toggleMega(false);
      closeMobile();
    }
  });

  // Mobile Sticky Anchor Ad Close
  const closeMobileAd = document.getElementById('closeMobileAd');
  const mobileAdAnchor = document.getElementById('mobileAdAnchor');
  if (closeMobileAd && mobileAdAnchor) {
    closeMobileAd.addEventListener('click', function() {
      mobileAdAnchor.classList.add('dismissed');
      try {
        sessionStorage.setItem('imrango_ad_dismissed', 'true');
      } catch (e) {}
    });
    try {
      if (sessionStorage.getItem('imrango_ad_dismissed') === 'true') {
        mobileAdAnchor.classList.add('dismissed');
      }
    } catch (e) {}
  }

  // Stepper increment/decrement buttons
  document.querySelectorAll('.stepper-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const step = parseFloat(this.getAttribute('data-step') || '1');
      const dir = parseFloat(this.getAttribute('data-dir') || '1');
      const input = document.getElementById(targetId);
      if (input) {
        let current = parseFloat(input.value) || 0;
        let nextVal = Math.round((current + (step * dir)) * 10) / 10;
        const min = input.min !== '' ? parseFloat(input.min) : 0;
        const max = input.max !== '' ? parseFloat(input.max) : 999;
        if (nextVal < min) nextVal = min;
        if (nextVal > max) nextVal = max;
        input.value = nextVal;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });

  // Slider synchronization with numeric input
  document.querySelectorAll('.slider-sync').forEach(slider => {
    slider.addEventListener('input', function() {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        input.value = this.value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
});
