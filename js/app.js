/**
 * APPLICATION COORDINATOR — Shree Varsha V K Portfolio
 * Manages Inline SVG Brain Hotspots, Curved Arrows, Modals & Section Views
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cinematic Opening Sequence
  const openingScreen = document.getElementById('opening-screen');
  const skipBtn = document.getElementById('opening-skip-btn');

  function endOpeningSequence() {
    if (!openingScreen) return;
    openingScreen.classList.add('fade-out');
    setTimeout(() => {
      openingScreen.style.display = 'none';
    }, 800);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', endOpeningSequence);
  }

  setTimeout(() => {
    endOpeningSequence();
  }, 2800);

  // 2. Navigation Breadcrumb Coordinator
  const breadcrumbCurrent = document.getElementById('breadcrumb-current-section');

  function updateBreadcrumbs(sectionName) {
    if (breadcrumbCurrent) {
      breadcrumbCurrent.innerText = sectionName.toUpperCase();
    }
  }

  // 3. Section View Controller
  const brainStageView = document.getElementById('brain-stage-view');
  const portfolioContentView = document.getElementById('portfolio-content-view');
  const stickyBackBar = document.getElementById('sticky-back-bar');

  function openSectionView(sectionId, sectionDisplayName) {
    if (!portfolioContentView || !brainStageView) return;

    updateBreadcrumbs(sectionDisplayName || sectionId);

    // Hide brain stage & reveal content
    brainStageView.classList.add('stage-hidden');
    portfolioContentView.classList.add('view-active');
    if (stickyBackBar) stickyBackBar.style.display = 'flex';

    // Scroll to specific section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function returnToBrainHome() {
    if (!portfolioContentView || !brainStageView) return;

    updateBreadcrumbs('CENTRAL BRAIN');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    portfolioContentView.classList.remove('view-active');
    brainStageView.classList.remove('stage-hidden');
    if (stickyBackBar) stickyBackBar.style.display = 'none';
  }

  // Bind Back to Brain Buttons
  const backToBrainBtn = document.getElementById('back-to-brain-btn');
  const headerBrainBtn = document.getElementById('header-brain-home-btn');

  if (backToBrainBtn) backToBrainBtn.addEventListener('click', returnToBrainHome);
  if (headerBrainBtn) headerBrainBtn.addEventListener('click', returnToBrainHome);

  // =========================================================================
  // 4. INLINE SVG BRAIN HOTSPOT INTERACTION & DYNAMIC CURVED ARROWS
  // =========================================================================
  const svg = document.getElementById('anatomical-brain-svg');
  const brainGroup = document.getElementById('interactive-brain-group');
  const arrowGroup = document.getElementById('dynamic-callout-arrow-group');
  const calloutBadge = document.getElementById('brain-hover-callout');
  const calloutCategory = document.getElementById('callout-category');
  const calloutTitle = document.getElementById('callout-title');
  const calloutSubtitle = document.getElementById('callout-subtitle');
  const calloutDot = document.querySelector('.callout-dot');
  const calloutCard = document.querySelector('.callout-card');

  // Lobe Anchor Points on SVG Coordinate Plane (1000x700 viewBox)
  const lobeAnchors = {
    'region-frontal': { x: 380, y: 220, calloutOffset: { x: -300, y: -90 } },
    'region-parietal': { x: 620, y: 190, calloutOffset: { x: 260, y: -110 } },
    'region-occipital': { x: 740, y: 380, calloutOffset: { x: 280, y: 40 } },
    'region-temporal': { x: 420, y: 410, calloutOffset: { x: -310, y: 80 } },
    'region-hippocampus': { x: 570, y: 260, calloutOffset: { x: 260, y: -20 } },
    'region-cerebellum': { x: 570, y: 530, calloutOffset: { x: -280, y: 160 } },
    'satellite-research': { x: 160, y: 140, calloutOffset: { x: -20, y: -120 } },
    'satellite-memorea': { x: 830, y: 490, calloutOffset: { x: 40, y: 80 } }
  };

  const hotspotElements = document.querySelectorAll('.brain-lobe-hotspot, .brain-satellite-node');

  hotspotElements.forEach(elem => {
    // 1. Hover & Focus Event
    function activateHotspot(e) {
      const id = elem.id;
      const label = elem.getAttribute('data-label');
      const subtitle = elem.getAttribute('data-subtitle');
      const target = elem.getAttribute('data-target');
      const color = elem.getAttribute('data-color') || '#C85A32';

      // Mark brain group as focused to subtly dim other lobes
      if (brainGroup) brainGroup.classList.add('has-focus');
      elem.classList.add('is-active');

      // Update Callout Content
      if (calloutTitle) calloutTitle.innerText = label;
      if (calloutSubtitle) calloutSubtitle.innerText = subtitle;
      if (calloutCategory) calloutCategory.innerText = id.includes('satellite') ? 'EXPLORE' : 'HOTSPOT';
      if (calloutDot) calloutDot.style.backgroundColor = color;
      if (calloutCard) calloutCard.style.borderLeftColor = color;

      // Position Callout & Render Curved Bezier Arrow
      positionCalloutAndArrow(id, color);

      // Bind Callout click to same section
      if (calloutBadge) {
        calloutBadge.onclick = () => {
          openSectionView(target, label);
        };
      }
    }

    // 2. Mouse Leave Event
    function deactivateHotspot() {
      if (brainGroup) brainGroup.classList.remove('has-focus');
      elem.classList.remove('is-active');
      if (calloutBadge) calloutBadge.style.display = 'none';
      if (arrowGroup) arrowGroup.innerHTML = '';
    }

    // 3. Click Event
    function clickHotspot() {
      const label = elem.getAttribute('data-label');
      const target = elem.getAttribute('data-target');
      deactivateHotspot();
      openSectionView(target, label);
    }

    elem.addEventListener('mouseenter', activateHotspot);
    elem.addEventListener('mouseleave', deactivateHotspot);
    elem.addEventListener('focus', activateHotspot);
    elem.addEventListener('blur', deactivateHotspot);
    elem.addEventListener('click', clickHotspot);
    elem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHotspot();
      }
    });
  });

  function positionCalloutAndArrow(lobeId, color) {
    if (!svg || !calloutBadge || !arrowGroup) return;

    const anchor = lobeAnchors[lobeId] || { x: 500, y: 350, calloutOffset: { x: 250, y: -50 } };
    const svgRect = svg.getBoundingClientRect();

    // Scale factors from SVG 1000x700 coordinate plane to screen pixels
    const scaleX = svgRect.width / 1000;
    const scaleY = svgRect.height / 700;

    const screenX = svgRect.left + anchor.x * scaleX;
    const screenY = svgRect.top + anchor.y * scaleY;

    // Callout Target Coordinate in screen pixels
    const isMobile = window.innerWidth < 768;
    let targetLeft, targetTop;

    if (isMobile) {
      targetLeft = window.innerWidth / 2;
      targetTop = window.innerHeight - 150;
      calloutBadge.style.left = `${targetLeft}px`;
      calloutBadge.style.top = `${targetTop}px`;
      calloutBadge.style.transform = 'translateX(-50%)';
    } else {
      targetLeft = Math.max(20, Math.min(window.innerWidth - 300, screenX + anchor.calloutOffset.x * scaleX));
      targetTop = Math.max(80, Math.min(window.innerHeight - 180, screenY + anchor.calloutOffset.y * scaleY));
      calloutBadge.style.left = `${targetLeft}px`;
      calloutBadge.style.top = `${targetTop}px`;
      calloutBadge.style.transform = 'none';
    }

    calloutBadge.style.display = 'block';

    // Calculate Arrow End Point on SVG canvas
    const endSvgX = (targetLeft + 120 - svgRect.left) / scaleX;
    const endSvgY = (targetTop + 40 - svgRect.top) / scaleY;

    // Quadratic Bezier Control Point for Hand-Drawn Arc
    const midX = (anchor.x + endSvgX) / 2;
    const midY = Math.min(anchor.y, endSvgY) - 35;

    arrowGroup.innerHTML = `
      <path 
        d="M ${anchor.x} ${anchor.y} Q ${midX} ${midY}, ${endSvgX} ${endSvgY}" 
        fill="none" 
        stroke="${color}" 
        stroke-width="1.8" 
        stroke-dasharray="5 3" 
        stroke-linecap="round"
        opacity="0.85"
      />
      <circle cx="${anchor.x}" cy="${anchor.y}" r="4" fill="${color}" />
      <circle cx="${endSvgX}" cy="${endSvgY}" r="3" fill="${color}" />
    `;
  }

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
