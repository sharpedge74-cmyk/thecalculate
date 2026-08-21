// Mobile nav
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMobileNav = document.getElementById('closeMobileNav');
  const mobileNav = document.getElementById('mobileNav');
  function openMobile(){ mobileNav.classList.add('open'); hamburgerBtn.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; }
  function closeMobile(){ mobileNav.classList.remove('open'); hamburgerBtn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }
  if(hamburgerBtn) hamburgerBtn.addEventListener('click', openMobile);
  if(closeMobileNav) closeMobileNav.addEventListener('click', closeMobile);

  // Desktop mega menu
  const megaTrigger = document.getElementById('megaTrigger');
  const megaMenu = document.getElementById('megaMenu');
  function toggleMega(force){
    if(!megaTrigger || !megaMenu) return;
    const open = force !== undefined ? force : !megaMenu.classList.contains('open');
    megaMenu.classList.toggle('open', open);
    megaTrigger.setAttribute('aria-expanded', String(open));
  }
  if(megaTrigger) {
    megaTrigger.addEventListener('click', function(e){ e.stopPropagation(); toggleMega(); });
  }
  document.addEventListener('click', function(e) {
    if(megaMenu && megaTrigger && !megaMenu.contains(e.target) && e.target !== megaTrigger) {
      toggleMega(false);
    }
  });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape'){ toggleMega(false); closeMobile(); } });

  // Cookie banner
  const acceptBtn = document.getElementById('cookieAccept');
  const banner = document.getElementById('cookieBanner');
  if(acceptBtn && banner) {
    acceptBtn.addEventListener('click', function(){ banner.classList.add('hidden'); });
  }
});
