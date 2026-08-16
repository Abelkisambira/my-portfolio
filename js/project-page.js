(function () {
  const projects = {
    'buwate-residence': {
      title: 'Buwate Residence', type: 'Residential project', location: 'Buwate, Uganda', year: '2024', scope: 'Landscape & exterior',
      summary: 'A considered residential transformation shaped around outdoor flow, soft planting, and a relaxed family lifestyle.',
      story: 'A collection of quiet outdoor moments, designed to make the home feel more connected to its setting.',
      captions: ['Proposed arrival experience', 'Landscape and driveway concept', 'Developed exterior perspective', 'Planting and material study', 'Construction in progress', 'Completed residence at day', 'Completed residence at night'],
      stages: ['Stage 01 · Rendered vision', 'Stage 01 · Rendered vision', 'Stage 01 · Rendered vision', 'Stage 01 · Rendered vision', 'Stage 02 · Construction', 'Stage 03 · Final result', 'Stage 03 · Final result'],
      images: [
        './assets/images/portfolio/buwate_render1.png', './assets/images/portfolio/buwate_render2.png', './assets/images/portfolio/buwate_render3.png', './assets/images/portfolio/buwate_render4.png', './assets/images/portfolio/buwate.png', './assets/images/portfolio/buwate_after1.png', './assets/images/portfolio/buwate_after2.png'
      ]
    },
    'entebbe-residence': {
      title: 'Entebbe Residence', type: 'Residential project', location: 'Entebbe, Uganda', year: '2023', scope: 'Interior & landscape',
      summary: 'A tranquil home built around natural light, warm finishes, and practical luxury that feels calm and inviting.',
      story: 'Every view is considered for warmth, ease, and a calm rhythm between inside and out.',
      captions: ['Initial design direction', 'Spatial planning study', 'Developed interior visualisation', 'Light and finish exploration', 'Room detail study', 'Site condition during works', 'Completed residence detail', 'Completed residence'],
      stages: ['Stage 01 · Rendered vision', 'Stage 01 · Rendered vision', 'Stage 01 · Rendered vision', 'Stage 01 · Rendered vision', 'Stage 01 · Rendered vision', 'Stage 02 · Construction', 'Stage 03 · Final result', 'Stage 03 · Final result'],
      images: [
        './assets/images/portfolio/entebbe_render1.png', './assets/images/portfolio/entebbe_render2.png', './assets/images/portfolio/entebbe_render3.png', './assets/images/portfolio/entebbe_render4.png', './assets/images/portfolio/entebbe_render5.png', './assets/images/portfolio/entebbe_before.png', './assets/images/portfolio/entebbe_after1.png', './assets/images/portfolio/entebbe_after2.png'
      ]
    },
    'hossan-residence': {
      title: 'Hossan Residence', type: 'Landscape project', location: 'Wakiso, Uganda', year: '2024', scope: 'Landscape concept',
      summary: 'A landscape-led residential concept that brings together planting, shade, and soft architecture for a more restorative setting.',
      story: 'The landscape is designed as a sequence of restorative places—structured, shaded, and alive with planting.',
      captions: ['Initial landscape concept', 'Developed garden perspective', 'Existing site condition', 'Existing boundary and arrival', 'Existing outdoor setting', 'Site detail during works', 'Site circulation during works', 'Existing landscape condition', 'Existing material condition', 'Existing garden edge', 'Existing exterior context', 'Final landscape vision'],
      stages: ['Stage 01 · Rendered vision', 'Stage 01 · Rendered vision', 'Stage 02 · Construction', 'Stage 02 · Construction', 'Stage 02 · Construction', 'Stage 02 · Construction', 'Stage 02 · Construction', 'Stage 02 · Construction', 'Stage 02 · Construction', 'Stage 02 · Construction', 'Stage 02 · Construction', 'Stage 03 · Final vision'],
      images: [
        './assets/images/portfolio/hossana_render1.png', './assets/images/portfolio/hossana_render2.png', './assets/images/portfolio/hossana_before1.png', './assets/images/portfolio/hossana_before2.png', './assets/images/portfolio/hossana_before3.png', './assets/images/portfolio/hossana_before4.png', './assets/images/portfolio/hossana_before5.png', './assets/images/portfolio/hossana_before6.png', './assets/images/portfolio/hossana_before7.png', './assets/images/portfolio/hossana_before8.png', './assets/images/portfolio/hossana_before9.png', './assets/images/portfolio/hossana_render3.png'
      ]
    }
  };

  const id = new URLSearchParams(window.location.search).get('project');
  const project = projects[id] || projects['buwate-residence'];
  const setText = (selector, value) => { const el = document.querySelector(selector); if (el) el.textContent = value; };

  document.title = `${project.title} | Ergon Designs`;
  setText('#project-type', project.type);
  setText('#project-title', project.title);
  setText('#project-summary', project.summary);
  setText('#project-location', project.location);
  setText('#project-year', project.year);
  setText('#project-scope', project.scope);

  const hero = document.querySelector('#project-hero-image');
  hero.src = project.images[0];
  hero.alt = `${project.title} featured view`;
  setText('#hero-image-stage', project.stages[0]);

  setText('#gallery-title', 'A closer look');
  setText('#gallery-copy', project.story);

  const galleryImage = document.querySelector('#gallery-image');
  const galleryCaption = document.querySelector('#gallery-caption');
  const galleryStage = document.querySelector('#gallery-stage');
  const galleryCount = document.querySelector('#gallery-count');
  const thumbnails = document.querySelector('#gallery-thumbnails');
  let currentIndex = 0;

  const showSlide = (index) => {
    currentIndex = (index + project.images.length) % project.images.length;
    galleryImage.classList.add('is-changing');
    window.setTimeout(() => {
      galleryImage.src = project.images[currentIndex];
      galleryImage.alt = `${project.title} — ${project.captions[currentIndex]}`;
      galleryImage.classList.remove('is-changing');
    }, 120);
    galleryCaption.textContent = project.captions[currentIndex];
    galleryStage.textContent = project.stages[currentIndex];
    galleryCount.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(project.images.length).padStart(2, '0')}`;
    thumbnails.querySelectorAll('.gallery-thumb').forEach((button, buttonIndex) => {
      button.classList.toggle('is-active', buttonIndex === currentIndex);
    });
  };

  project.images.forEach((image, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-thumb';
    button.setAttribute('aria-label', `View image ${index + 1}`);
    const imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.alt = '';
    imageElement.loading = 'lazy';
    button.appendChild(imageElement);
    button.addEventListener('click', () => showSlide(index));
    thumbnails.appendChild(button);
  });

  document.querySelector('#gallery-previous').addEventListener('click', () => showSlide(currentIndex - 1));
  document.querySelector('#gallery-next').addEventListener('click', () => showSlide(currentIndex + 1));
  showSlide(0);
})();
