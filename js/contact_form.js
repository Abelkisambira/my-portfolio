const contactForm =
    document.getElementById('contact-form');

const formStatus =
    document.getElementById('form-status');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name =
        document.getElementById('name').value;

    const email =
        document.getElementById('email').value;

    const message =
        document.getElementById('message').value;

    const subject =
        encodeURIComponent(`Project Inquiry from ${name}`);

    const body =
        encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

    window.location.href =
        `mailto:contact@ergondesigns.com?subject=${subject}&body=${body}`;

    formStatus.textContent =
        'Opening your email client...';

    contactForm.reset();
});