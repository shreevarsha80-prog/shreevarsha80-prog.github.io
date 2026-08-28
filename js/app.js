/**
 * APPLICATION COORDINATOR — Shree Varsha V K Portfolio
 * 3D Interactive Mind & Brain Navigation Matching Screenshot Design
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Breadcrumb Coordinator
  const breadcrumbCurrent = document.getElementById('breadcrumb-current-section');

  function updateBreadcrumbs(sectionName) {
    if (breadcrumbCurrent) {
      breadcrumbCurrent.innerText = sectionName.toUpperCase();
    }
  }

  // 2. Section Navigation & Scroll Controller
  const stickyBackBar = document.getElementById('sticky-back-bar');

  function navigateToSection(sectionId, sectionDisplayName) {
    updateBreadcrumbs(sectionDisplayName || sectionId);

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (stickyBackBar) stickyBackBar.style.display = 'flex';
    }
  }

  function returnToBrainHome() {
    updateBreadcrumbs('CENTRAL BRAIN');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (stickyBackBar) stickyBackBar.style.display = 'none';
  }

  // Bind Back to Brain Buttons
  const backToBrainBtn = document.getElementById('back-to-brain-btn');
  const headerBrainBtn = document.getElementById('header-brain-home-btn');

  if (backToBrainBtn) backToBrainBtn.addEventListener('click', returnToBrainHome);
  if (headerBrainBtn) headerBrainBtn.addEventListener('click', returnToBrainHome);

  // Monitor Scroll for Sticky Back to Brain
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      if (stickyBackBar) stickyBackBar.style.display = 'flex';
    } else {
      if (stickyBackBar) stickyBackBar.style.display = 'none';
      updateBreadcrumbs('CENTRAL BRAIN');
    }
  });

  // 3. Dynamic Connector Lines & Synapse-Card Sync
  const svgLinesLayer = document.getElementById('connector-lines-svg');
  const stage = document.querySelector('.brain-interactive-stage');

  const cardSynapseMap = [
    { cardId: 'card-social', synapseId: 'synapse-social', lineId: 'connector-line-social', target: 'social', label: 'SOCIAL MIND' },
    { cardId: 'card-thinking', synapseId: 'synapse-thinking', lineId: 'connector-line-thinking', target: 'about', label: 'THINKING LAB' },
    { cardId: 'card-growth', synapseId: 'synapse-growth', lineId: 'connector-line-growth', target: 'journey', label: 'GROWTH ZONE' },
    { cardId: 'card-learning', synapseId: 'synapse-learning', lineId: 'connector-line-learning', target: 'academics', label: 'LEARNING CENTER' },
    { cardId: 'card-idea', synapseId: 'synapse-idea', lineId: 'connector-line-idea', target: 'skills', label: 'IDEA STUDIO' },
    { cardId: 'card-future', synapseId: 'synapse-future', lineId: 'connector-line-future', target: 'ventures', label: 'FUTURE PATH' }
  ];

  function updateDynamicConnectors() {
    if (!stage || !svgLinesLayer || window.innerWidth <= 1100) return;

    const stageRect = stage.getBoundingClientRect();
    svgLinesLayer.setAttribute('viewBox', `0 0 ${stageRect.width} ${stageRect.height}`);

    cardSynapseMap.forEach(item => {
      const card = document.getElementById(item.cardId);
      const synapse = document.getElementById(item.synapseId);
      const lineGroup = document.getElementById(item.lineId);

      if (!card || !synapse || !lineGroup) return;

      const cardRect = card.getBoundingClientRect();
      const synCircle = synapse.querySelector('.synapse-core') || synapse.querySelector('circle');
      const synRect = synCircle ? synCircle.getBoundingClientRect() : synapse.getBoundingClientRect();

      // Synapse Center relative to Stage
      const sx = synRect.left + synRect.width / 2 - stageRect.left;
      const sy = synRect.top + synRect.height / 2 - stageRect.top;

      const isLeft = cardRect.left < stageRect.left + stageRect.width / 2;
      
      // Card target point
      const cx = isLeft ? (cardRect.right - stageRect.left) : (cardRect.left - stageRect.left);
      const cy = cardRect.top + cardRect.height / 2 - stageRect.top;

      // Calculate elbow bend
      const midX = isLeft ? (sx - 40) : (sx + 40);
      const elbowX = isLeft ? (cx + 30) : (cx - 30);

      const pathData = `M ${sx} ${sy} L ${midX} ${sy} L ${elbowX} ${cy} L ${cx} ${cy}`;

      const pathElem = lineGroup.querySelector('.connector-line');
      const dotElem = lineGroup.querySelector('.connector-dot');

      if (pathElem) pathElem.setAttribute('d', pathData);
      if (dotElem) {
        dotElem.setAttribute('cx', sx);
        dotElem.setAttribute('cy', sy);
      }
    });
  }

  // Initial connector update & on resize
  setTimeout(updateDynamicConnectors, 100);
  window.addEventListener('resize', updateDynamicConnectors);

  // Bind Card & Synapse Interactions
  cardSynapseMap.forEach(item => {
    const card = document.getElementById(item.cardId);
    const synapse = document.getElementById(item.synapseId);
    const lineGroup = document.getElementById(item.lineId);

    function activatePair() {
      if (card) card.classList.add('is-hovered');
      if (synapse) synapse.classList.add('is-active');
      if (lineGroup) lineGroup.classList.add('active');
    }

    function deactivatePair() {
      if (card) card.classList.remove('is-hovered');
      if (synapse) synapse.classList.remove('is-active');
      if (lineGroup) lineGroup.classList.remove('active');
    }

    function triggerNav() {
      navigateToSection(item.target, item.label);
    }

    if (card) {
      card.addEventListener('mouseenter', activatePair);
      card.addEventListener('mouseleave', deactivatePair);
      card.addEventListener('focus', activatePair);
      card.addEventListener('blur', deactivatePair);
      card.addEventListener('click', triggerNav);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerNav();
        }
      });
    }

    if (synapse) {
      synapse.addEventListener('mouseenter', activatePair);
      synapse.addEventListener('mouseleave', deactivatePair);
      synapse.addEventListener('focus', activatePair);
      synapse.addEventListener('blur', deactivatePair);
      synapse.addEventListener('click', triggerNav);
      synapse.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerNav();
        }
      });
    }
  });

  // Gentle 3D Cursor Parallax Tilt on Central Brain
  const brainVisualWrap = document.querySelector('.brain-center-visual-wrap');
  const brainGroup = document.querySelector('.sculpture-float-group');

  if (brainVisualWrap && brainGroup) {
    brainVisualWrap.addEventListener('mousemove', (e) => {
      const rect = brainVisualWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      brainGroup.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    });

    brainVisualWrap.addEventListener('mouseleave', () => {
      brainGroup.style.transform = 'none';
    });
  }

  // 4. Top-Left Profile Anchor & About Me Modal
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

  // 5. ProtoSem 20-Week Journal Timeline Renderer
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
        <div class="week-journal-card" onclick="openProtoSemModal(${item.week})" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openProtoSemModal(${item.week})">
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

  // 6. Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (aboutMeModal && aboutMeModal.classList.contains('modal-open')) {
        aboutMeModal.classList.remove('modal-open');
      } else if (protoModal && protoModal.classList.contains('modal-open')) {
        protoModal.classList.remove('modal-open');
      }
    }
  });

  // Click outside modal window to dismiss
  [aboutMeModal, protoModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('modal-open');
      }
    });
  });
});
