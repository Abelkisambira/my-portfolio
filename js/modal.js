(function () {
  const site = window.ergonSite = window.ergonSite || {};
  const initialized = site.initialized = site.initialized || {};

  if (initialized.projectModal) return;
  initialized.projectModal = true;

  const projects = {
    'buwate-residence': {
      title: 'Buwate Residence',
      description:
        'A custom residential concept shaped around outdoor flow, layered textures, and a welcoming family lifestyle.',
      year: '2024',
      phases: [
        { label: '', image: './assets/images/portfolio/buwate_render1.png' },
        { label: '', image: './assets/images/portfolio/buwate_render2.png' },
        { label: '', image: './assets/images/portfolio/buwate_render3.png' },
        { label: '', image: './assets/images/portfolio/buwate_render4.png' },
        { label: '', image: './assets/images/portfolio/buwate.png' },
        { label: '', image: './assets/images/portfolio/buwate_after1.png' },
        { label: '', image: './assets/images/portfolio/buwate_after2.png' }
      ]
    },
    'entebbe-residence': {
      title: 'Entebbe Residence',
      description:
        'A tranquil home design focused on natural light, warm finishes, and practical luxury that feels calm and inviting.',
      year: '2023',
      phases: [
        {  image: './assets/images/portfolio/entebbe_render1.png' },
        { image: './assets/images/portfolio/entebbe_render2.png' },
        {  image: './assets/images/portfolio/entebbe_render3.png' },
        { image: './assets/images/portfolio/entebbe_render4.png' },
        {  image: './assets/images/portfolio/entebbe_render5.png' },
        {  image: './assets/images/portfolio/entebbe_before.png' },
        {  image: './assets/images/portfolio/entebbe_after1.png' },
        {  image: './assets/images/portfolio/entebbe_after2.png' }
      ]
    },
    'hossan-residence': {
      title: 'Hossan Residence',
      description:
        'A landscape-led residential concept combining planting, shade, and soft architecture for a more restorative home setting.',
      year: '2024',
      phases: [
        {  image: './assets/images/portfolio/hossana_render1.png' },
        {  image: './assets/images/portfolio/hossana_render2.png' },
        {  image: './assets/images/portfolio/hossana_render3.png' },
        {  image: './assets/images/portfolio/hossana_before1.png' },
        {  image: './assets/images/portfolio/hossana_before2.png' },
        {  image: './assets/images/portfolio/hossana_before3.png' },
        { image: './assets/images/portfolio/hossana_before4.png' },
        { image: './assets/images/portfolio/hossana_before5.png' },
        { image: './assets/images/portfolio/hossana_before6.png' },
        { image: './assets/images/portfolio/hossana_before7.png' },
        { image: './assets/images/portfolio/hossana_before8.png' },
        { image: './assets/images/portfolio/hossana_before9.png' },
        { image: './assets/images/portfolio/hossana_render3.png' }
      ]
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalMeta = document.getElementById('modal-meta');
  const modalPhaseLabel = document.getElementById('modal-phase-label');
  const modalGalleryThumbs = document.getElementById('modal-gallery-thumbs');
  const modalClose = document.getElementById('modal-close');
  const body = document.body;

  if (!modal || !modalTitle || !modalImage || !modalDescription || !modalMeta || !modalPhaseLabel || !modalGalleryThumbs) return;

  function setModalLock(isOpen) {
    body.classList.toggle('modal-open', isOpen);
  }

  function renderGallery(project) {
    if (!project || !project.phases) return;

    modalGalleryThumbs.innerHTML = '';

    project.phases.forEach((phase, index) => {
      const thumbButton = document.createElement('button');
      thumbButton.type = 'button';
      thumbButton.className = 'thumb-btn';
      thumbButton.setAttribute('aria-label', `${phase.label} preview`);
      thumbButton.dataset.index = String(index);

      const img = document.createElement('img');
      img.src = phase.image;
      img.alt = `${project.title} - ${phase.label}`;

      const label = document.createElement('span');
      label.textContent = phase.label;

      thumbButton.appendChild(img);
      thumbButton.appendChild(label);

      thumbButton.addEventListener('click', () => {
        const allThumbs = modalGalleryThumbs.querySelectorAll('.thumb-btn');
        allThumbs.forEach((button) => button.classList.remove('is-active'));
        thumbButton.classList.add('is-active');

        modalImage.src = phase.image;
        modalImage.alt = `${project.title} - ${phase.label}`;
        modalPhaseLabel.textContent = phase.label;
      });

      modalGalleryThumbs.appendChild(thumbButton);
    });

    const firstPhase = project.phases[0];
    modalImage.src = firstPhase.image;
    modalImage.alt = `${project.title} - ${firstPhase.label}`;
    modalPhaseLabel.textContent = firstPhase.label;

    const firstThumb = modalGalleryThumbs.querySelector('.thumb-btn');
    if (firstThumb) {
      firstThumb.classList.add('is-active');
    }
  }

  function openModal(project) {
    if (!project) return;

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalMeta.textContent = `Year: ${project.year}`;
    renderGallery(project);

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    setModalLock(true);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    setModalLock(false);
  }

  function setActiveProject(card) {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((item) => {
      const isActive = item === card;
      item.classList.toggle('is-active', isActive);
      item.classList.toggle('is-inactive', !isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
  }

  document.querySelectorAll('article.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      setActiveProject(card);
      const projectId = card.getAttribute('data-project');
      const project = projects[projectId];

      if (project) {
        openModal(project);
      }
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
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
})();
