const mobileMenuButton = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuButton.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');

    const expanded =
        mobileMenuButton.getAttribute('aria-expanded') === 'true';

    mobileMenuButton.setAttribute(
        'aria-expanded',
        !expanded
    );
});

document.querySelectorAll('#mobile-nav a').forEach((link) => {
    link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');

        mobileMenuButton.setAttribute(
            'aria-expanded',
            'false'
        );
    });
});