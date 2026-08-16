(function () {
  const site = window.ergonSite = window.ergonSite || {};
  const initialized = site.initialized = site.initialized || {};

  if (initialized.mobileMenu) return;
  initialized.mobileMenu = true;

  const mobileMenuButton = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!mobileMenuButton || !mobileNav) return;

  const closeMenu = () => {
    mobileNav.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-label', 'Open menu');
  };

  const openMenu = () => {
    mobileNav.classList.remove('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'true');
    mobileMenuButton.setAttribute('aria-label', 'Close menu');
  };

  mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
      return;
    }

    openMenu();
  });

  document.querySelectorAll('#mobile-nav a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('click', (event) => {
    const clickTarget = event.target;
    if (!(clickTarget instanceof HTMLElement)) return;

    const clickedInsideNav = mobileNav.contains(clickTarget);
    const clickedMenuButton = mobileMenuButton.contains(clickTarget);

    if (!clickedInsideNav && !clickedMenuButton) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
})();