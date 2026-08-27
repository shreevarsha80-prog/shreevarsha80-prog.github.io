/**
 * APPLICATION COORDINATOR - Shree Varsha V K Portfolio
 * Manages Opening Cinematic, 3D Brain Navigation, Modals & Section Views
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Brain Engine & Neural Arrows
  const brainContainer = document.getElementById('brain-canvas-container');
  let brainEngine = null;
  let neuralArrows = null;

  if (brainContainer && window.BrainEngine) {
    brainEngine = new window.BrainEngine('brain-canvas-container');
    window.brainEngineInstance = brainEngine;

    if (window.NeuralArrowsManager) {
      neuralArrows = new window.NeuralArrowsManager('neural-svg-canvas', 'neural-badges-container');
      
      // Wire hover events from 3D brain to SVG neural arrows
      brainEngine.onRegionHover = (regionId, def, screenCoords) => {
        neuralArrows.showArrowAndBadge(regionId, def, screenCoords);
      };

      brainEngine.onAnchorUpdate = (regionId, screenCoords) => {
        neuralArrows.updateAnchorPosition(regionId, screenCoords);
      };

      brainEngine.onRegionLeave = () => {
        neuralArrows.hideArrowAndBadge();
      };
    }

    // Wire region click event to open portfolio section
    brainEngine.onRegionSelect = (regionId, def) => {
      if (neuralArrows) neuralArrows.hideArrowAndBadge();
      openSectionView(def.sectionId, def.name);
    };
  }

  // 2. Cinematic Opening Sequence
  const openingScreen = document.getElementById('opening-screen');
  const skipBtn = document.getElementById('opening-skip-btn');

  function endOpeningSequence() {
    if (!openingScreen) return;
    openingScreen.classList.add('fade-out');
    setTimeout(() => {
      openingScreen.style.display = 'none';
    }, 1000);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', endOpeningSequence);
  }

  // Auto-transition opening sequence after 3.2 seconds
  setTimeout(() => {
    endOpeningSequence();
  }, 3200);

  // 3. Navigation Breadcrumb Coordinator
  const breadcrumbCurrent = document.getElementById('breadcrumb-current-section');

  function updateBreadcrumbs(sectionName) {
    if (breadcrumbCurrent) {
      breadcrumbCurrent.innerText = sectionName.toUpperCase();
    }
  }

  // 4. Section View Controller
  const brainStageView = document.getElementById('brain-stage-view');
  const portfolioContentView = document.getElementById('portfolio-content-view');
  const stickyBackBar = document.getElementById('sticky-back-bar');

  function openSectionView(sectionId, sectionDisplayName) {
    if (!portfolioContentView || !brainStageView) return;

    updateBreadcrumbs(sectionDisplayName || sectionId);

    // Hide 3D brain stage & reveal content
    brainStageView.classList.add('stage-hidden');
    portfolioContentView.classList.add('view-active');
    if (stickyBackBar) stickyBackBar.style.display = 'flex';

    // Scroll to specific section anchor
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function returnToBrainHome() {
    if (!portfolioContentView || !brainStageView) return;

    updateBreadcrumbs('CENTRAL BRAIN');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide content & bring 3D brain back
    portfolioContentView.classList.remove('view-active');
    brainStageView.classList.remove('stage-hidden');
    if (stickyBackBar) stickyBackBar.style.display = 'none';

    if (brainEngine) {
      brainEngine.resetToBrainHome();
    }
  }

  // Bind Back to Brain Buttons
  const backToBrainBtn = document.getElementById('back-to-brain-btn');
  const headerBrainBtn = document.getElementById('header-brain-home-btn');

  if (backToBrainBtn) backToBrainBtn.addEventListener('click', returnToBrainHome);
  if (headerBrainBtn) headerBrainBtn.addEventListener('click', returnToBrainHome);

  // Bind Quick Region Chips at bottom of Brain stage
  document.querySelectorAll('.quick-region-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const regionId = e.currentTarget.getAttribute('data-region');
      if (brainEngine && regionId) {
        brainEngine.selectRegion(regionId);
      }
    });
  });

  // 5. Top-Left Profile Anchor & About Me Modal
  const profileAnchorBtn = document.getElementById('profile-anchor-btn');
  const aboutMeModal = document.getElementById('about-me-modal');
  const closeAboutModalBtn = document.getElementById('close-about-modal-btn');

  if (profileAnchorBtn && aboutMeModal) {
    profileAnchorBtn.addEventListener('click', () => {
      aboutMeModal.classList.add('modal-open');
    });
  }

  if (closeAboutModalBtn && aboutMeModal) {
    closeAboutModalBtn.addEventListener('click', () => {
      aboutMeModal.classList.remove('modal-open');
    });
  }

  // 6. ProtoSem 20-Week Journal Timeline Renderer
  const weeksGridContainer = document.getElementById('protosem-weeks-grid');
  const protoModal = document.getElementById('protosem-week-modal');
  const closeProtoModalBtn = document.getElementById('close-protosem-modal-btn');

  function renderProtoSemGrid(phaseFilter = 'all') {
    if (!weeksGridContainer || !window.protoSemWeeksData) return;

    const data = window.protoSemWeeksData;
    const filtered = phaseFilter === 'all'
      ? data
      : data.filter(item => item.phase === parseInt(phaseFilter));

    weeksGridContainer.innerHTML = filtered.map(item => {
      const weekPad = item.week < 10 ? `0${item.week}` : `${item.week}`;
      return `
        <div class="week-journal-card" onclick="openProtoSemModal(${item.week})" role="button" tabindex="0">
          <div class="week-card-top">
            <span class="week-phase-tag">PHASE 0${item.phase}</span>
            <span class="week-card-num">#W${weekPad}</span>
          </div>
          <div>
            <h4 class="week-card-title font-serif">${item.label}: ${item.title}</h4>
            <p class="week-card-subtitle">${item.subtitle}</p>
          </div>
          <div class="week-card-footer">
            <span class="week-status-badge">${item.status}</span>
            <span class="week-open-tag font-serif italic">Read Note →</span>
          </div>
        </div>
      `;
    }).join('');
  }

  window.filterProtoPhase = function(phase, btn) {
    document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderProtoSemGrid(phase);
  };

  window.openProtoSemModal = function(weekNum) {
    if (!window.protoSemWeeksData || !protoModal) return;
    const item = window.protoSemWeeksData.find(w => w.week === weekNum);
    if (!item) return;

    document.getElementById('modal-proto-phase').innerText = `PHASE 0${item.phase} • 20-WEEK INNOVATION JOURNAL`;
    document.getElementById('modal-proto-title').innerText = `${item.label}: ${item.title}`;
    document.getElementById('modal-proto-subtitle').innerText = item.subtitle;
    document.getElementById('modal-proto-body').innerHTML = item.content;

    const takeawaysList = document.getElementById('modal-proto-takeaways');
    if (takeawaysList && item.takeaways) {
      takeawaysList.innerHTML = item.takeaways.map(t => `<li><i class="fa-solid fa-check text-terracotta mr-2"></i>${t}</li>`).join('');
    }

    protoModal.classList.add('modal-open');
  };

  if (closeProtoModalBtn && protoModal) {
    closeProtoModalBtn.addEventListener('click', () => {
      protoModal.classList.remove('modal-open');
    });
  }

  // Initial ProtoSem Render
  renderProtoSemGrid('all');

  // 7. Lightbox for Media Gallery
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');

  window.openLightbox = function(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.innerText = caption || '';
    lightboxModal.classList.add('modal-open');
  };

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('modal-open');
    });
  }

  // 8. Global Keyboard Shortcuts (Escape to Close Modals / Return to Brain)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (aboutMeModal && aboutMeModal.classList.contains('modal-open')) {
        aboutMeModal.classList.remove('modal-open');
      } else if (protoModal && protoModal.classList.contains('modal-open')) {
        protoModal.classList.remove('modal-open');
      } else if (lightboxModal && lightboxModal.classList.contains('modal-open')) {
        lightboxModal.classList.remove('modal-open');
      } else if (portfolioContentView && portfolioContentView.classList.contains('view-active')) {
        returnToBrainHome();
      }
    }
  });

  // Click outside modal window to dismiss
  [aboutMeModal, protoModal, lightboxModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('modal-open');
      }
    });
  });
});
