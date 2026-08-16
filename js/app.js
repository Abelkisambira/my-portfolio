(function () {
  const site = window.ergonSite = window.ergonSite || {};
  const initialized = site.initialized = site.initialized || {};

  if (initialized.app) return;
  initialized.app = true;

  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sectionEls = Array.from(document.querySelectorAll('header[id], main section[id], footer[id]'));
  const revealItems = document.querySelectorAll('[data-reveal]');
  const statCards = document.querySelectorAll('.stat-card--count');
  const projectCards = document.querySelectorAll('.project-card');

  const setActiveLink = (currentId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-active', isActive);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href')?.slice(1);
      if (targetId) setActiveLink(targetId);
    });
  });

  if (navLinks.length && sectionEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry && visibleEntry.target.id) {
        setActiveLink(visibleEntry.target.id);
      }
    }, {
      rootMargin: '-35% 0px -55% 0px',
      threshold: [0.1, 0.3, 0.6]
    });

    sectionEls.forEach((section) => observer.observe(section));
  }

  if ('IntersectionObserver' in window && revealItems.length) {
    const revealObserver = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const animateCount = (counter) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = target >= 100 ? '+' : '';
    const duration = 1200;
    const startTime = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const appearOnce = () => {
    statCards.forEach((card) => {
      const count = card.querySelector('[data-count]');
      if (!count) return;
      if (count.dataset.animated === 'true') return;
      count.dataset.animated = 'true';
      animateCount(count);
    });
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          appearOnce();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statCards.forEach((card) => counterObserver.observe(card));
  } else {
    statCards.forEach((card) => {
      const count = card.querySelector('[data-count]');
      if (count) animateCount(count);
    });
  }

  projectCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 14;
      const rotateX = (0.5 - (y / rect.height)) * 12;

      card.style.setProperty('--rotateX', `${rotateX}deg`);
      card.style.setProperty('--rotateY', `${rotateY}deg`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rotateX', '0deg');
      card.style.setProperty('--rotateY', '0deg');
    });
  });
  // Footer animation on scroll
const footer = document.querySelector('.footer-section');

if (footer) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  observer.observe(footer);
}

  const focusableSelectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])';

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;

    const modal = document.getElementById('project-modal');
    if (!modal || modal.classList.contains('hidden')) return;

    const focusableElements = Array.from(modal.querySelectorAll(focusableSelectors));
    if (!focusableElements.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
