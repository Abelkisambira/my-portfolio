const projects = {
    'buwate-residence': {
        title: 'Buwate Residence',
        description:
            'The residential home is located in Wakiso district and it was a newly constructed.I was required to come up or create a design concept of the exterior, manage and execute.',
        year: '2021',
        image: './assets/images/portfolio/buwate.png', },

    'entebbe-residence': {
        title: 'Entebbe Residence',
        description:
            'The residential home is located in Wakiso district and it is newly construcThe residential home is located in Wakiso district and it is a newly constructed.I was required to come up or create a design concept for the exterior, manage and execute.ted.',
        year: '2023',
        image: './assets/images/portfolio/entebbe_after1.png'
    },

    'hossan-residence': {
        title: 'Hossan Residence',
        description:
            'The residential home is located in Wakiso district and it is a newly constructed. I was Designed & managed the residential house from foundation to the level its on now',
        year: '2024',
        image: './assets/images/portfolio/hossana_render1.png'
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
        `Year: ${project.year}`;

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