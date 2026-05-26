const projects = {
    'coastal-living': {
        title: 'Coastal Living Room',
        description:
            'A layered interior palette using natural materials and coastal tones.',
        year: '2024',
        client: 'Private Residence',
        image: './assets/images/portfolio/coastal-living.jpg'
    },

    'kitchen-renovation': {
        title: 'Kitchen Renovation',
        description:
            'Modern kitchen renovation with durable finishes and custom joinery.',
        year: '2023',
        client: 'Family Home',
        image: './assets/images/portfolio/kitchen-renovation.jpg'
    },

    'urban-garden': {
        title: 'Urban Garden',
        description:
            'Compact ecological garden design focused on biodiversity.',
        year: '2022',
        client: 'City Residence',
        image: './assets/images/portfolio/urban-garden.jpg'
    }
};

const modal = document.getElementById('project-modal');

const modalTitle = document.getElementById('modal-title');

const modalImage = document.getElementById('modal-image');

const modalDescription =
    document.getElementById('modal-description');

const modalMeta = document.getElementById('modal-meta');

const modalClose =
    document.getElementById('modal-close');

function openModal(project) {
    modalTitle.textContent = project.title;

    modalImage.src = project.image;

    modalImage.alt = project.title;

    modalDescription.textContent =
        project.description;

    modalMeta.textContent =
        `Year: ${project.year} • Client: ${project.client}`;

    modal.classList.remove('hidden');

    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    modal.classList.add('hidden');

    modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
        const projectId =
            card.getAttribute('data-project');

        openModal(projects[projectId]);
    });
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});