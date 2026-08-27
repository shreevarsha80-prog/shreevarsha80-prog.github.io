/**
 * NEURAL ARROWS & FLOATING EDITORIAL BADGES
 * Renders elegant, organic curved bezier arrows emerging from 3D brain lobes to plain-language labels.
 */

class NeuralArrowsManager {
  constructor(svgContainerId, badgeContainerId) {
    this.svg = document.getElementById(svgContainerId);
    this.badgeContainer = document.getElementById(badgeContainerId);
    this.currentRegionId = null;
    this.arrowPath = null;
    this.synapsePulse = null;
    this.badgeElement = null;
    this.labelPositions = {
      thinking: { xOffset: -320, yOffset: -160, align: 'right' },
      learning: { xOffset: 260, yOffset: -90, align: 'left' },
      people: { xOffset: -340, yOffset: 40, align: 'right' },
      experiences: { xOffset: 280, yOffset: -180, align: 'left' },
      creativity: { xOffset: -300, yOffset: 160, align: 'right' },
      skills: { xOffset: -260, yOffset: 220, align: 'right' },
      research: { xOffset: 300, yOffset: 60, align: 'left' },
      ventures: { xOffset: 320, yOffset: 170, align: 'left' }
    };

    this.init();
  }

  init() {
    if (!this.svg || !this.badgeContainer) return;
    this.svg.innerHTML = `
      <defs>
        <linearGradient id="neuralGradTerracotta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C85A32" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#E27650" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient id="neuralGradTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5B8C9B" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#8BB5C2" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient id="neuralGradLavender" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8E82A6" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#B3ABD0" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient id="neuralGradCoral" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D47A58" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#F2A486" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient id="neuralGradOchre" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#CCA046" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#E5BF6E" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient id="neuralGradSage" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7E9A86" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#A5BEAD" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient id="neuralGradRose" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B87D8A" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#D6A5AF" stop-opacity="0.3" />
        </linearGradient>
        <filter id="neuralGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <marker id="arrowDot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4">
          <circle cx="5" cy="5" r="4" fill="#C85A32" />
        </marker>
      </defs>
      <g id="neural-paths-group"></g>
      <g id="synapse-pulses-group"></g>
    `;

    this.pathsGroup = document.getElementById('neural-paths-group');
    this.pulsesGroup = document.getElementById('synapse-pulses-group');
  }

  showArrowAndBadge(regionId, def, screenCoords) {
    this.currentRegionId = regionId;
    const config = this.labelPositions[regionId] || { xOffset: 240, yOffset: -60, align: 'left' };

    // Screen bounds check
    const screenW = window.innerWidth;
    const isMobile = screenW < 768;

    let targetX, targetY;
    if (isMobile) {
      targetX = screenW / 2;
      targetY = window.innerHeight - 150;
    } else {
      targetX = Math.max(40, Math.min(screenW - 320, screenCoords.x + config.xOffset));
      targetY = Math.max(100, Math.min(window.innerHeight - 180, screenCoords.y + config.yOffset));
    }

    // Render / Update HTML Badge
    this.renderBadge(regionId, def, targetX, targetY, config.align, isMobile);

    // Render curved bezier SVG pathway
    this.renderCurvedPath(screenCoords.x, screenCoords.y, targetX, targetY, config.align, def.color, isMobile);
  }

  updateAnchorPosition(regionId, screenCoords) {
    if (this.currentRegionId !== regionId) return;
    const config = this.labelPositions[regionId] || { xOffset: 240, yOffset: -60, align: 'left' };
    const screenW = window.innerWidth;
    const isMobile = screenW < 768;

    let targetX, targetY;
    if (isMobile) {
      targetX = screenW / 2;
      targetY = window.innerHeight - 150;
    } else {
      targetX = Math.max(40, Math.min(screenW - 320, screenCoords.x + config.xOffset));
      targetY = Math.max(100, Math.min(window.innerHeight - 180, screenCoords.y + config.yOffset));
    }

    this.renderCurvedPath(screenCoords.x, screenCoords.y, targetX, targetY, config.align, null, isMobile);
  }

  renderCurvedPath(x1, y1, x2, y2, align, colorHex, isMobile) {
    if (!this.pathsGroup) return;

    // Attach end point to badge edge
    const badgeEndX = isMobile ? x2 : (align === 'right' ? x2 + 260 : x2 - 10);
    const badgeEndY = isMobile ? y2 - 10 : y2 + 40;

    // Calculate elegant natural bezier control points
    const dx = badgeEndX - x1;
    const dy = badgeEndY - y1;
    const curvature = Math.min(Math.abs(dx) * 0.55, 140);

    const cx1 = x1 + (dx > 0 ? curvature : -curvature);
    const cy1 = y1 + dy * 0.15;
    const cx2 = badgeEndX - (dx > 0 ? curvature * 0.8 : -curvature * 0.8);
    const cy2 = badgeEndY - dy * 0.2;

    const pathData = `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${badgeEndX.toFixed(1)} ${badgeEndY.toFixed(1)}`;

    if (!this.arrowPath) {
      this.arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this.arrowPath.setAttribute('class', 'neural-bezier-path');
      this.arrowPath.setAttribute('fill', 'none');
      this.arrowPath.setAttribute('stroke-width', '1.6');
      this.arrowPath.setAttribute('stroke-dasharray', '4 2');
      this.arrowPath.setAttribute('filter', 'url(#neuralGlow)');
      this.pathsGroup.appendChild(this.arrowPath);

      // Root origin node dot on brain surface
      this.originDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.originDot.setAttribute('r', '4');
      this.originDot.setAttribute('class', 'neural-origin-dot');
      this.pathsGroup.appendChild(this.originDot);

      // Synapse traveling pulse particle
      this.synapsePulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.synapsePulse.setAttribute('r', '3');
      this.synapsePulse.setAttribute('class', 'synapse-pulse-dot');
      this.pulsesGroup.appendChild(this.synapsePulse);
    }

    const strokeColor = '#C85A32';
    this.arrowPath.setAttribute('d', pathData);
    this.arrowPath.setAttribute('stroke', strokeColor);

    this.originDot.setAttribute('cx', x1);
    this.originDot.setAttribute('cy', y1);
    this.originDot.setAttribute('fill', strokeColor);

    // Trigger animate motion along bezier path
    this.synapsePulse.innerHTML = `
      <animateMotion path="${pathData}" dur="1.4s" repeatCount="indefinite" />
    `;
    this.synapsePulse.setAttribute('fill', '#FAF8F5');
    this.synapsePulse.setAttribute('stroke', strokeColor);
    this.synapsePulse.setAttribute('stroke-width', '1.5');
  }

  renderBadge(regionId, def, x, y, align, isMobile) {
    if (!this.badgeContainer) return;

    if (!this.badgeElement) {
      this.badgeElement = document.createElement('div');
      this.badgeElement.className = 'neural-floating-badge';
      this.badgeContainer.appendChild(this.badgeElement);
    }

    const colorHex = '#' + def.color.toString(16).padStart(6, '0');

    this.badgeElement.style.display = 'block';
    this.badgeElement.style.left = isMobile ? '50%' : `${x}px`;
    this.badgeElement.style.top = `${y}px`;
    if (isMobile) {
      this.badgeElement.style.transform = 'translateX(-50%)';
    } else {
      this.badgeElement.style.transform = 'none';
    }

    this.badgeElement.innerHTML = `
      <div class="badge-inner" style="border-left-color: ${colorHex};">
        <div class="badge-header">
          <span class="badge-dot" style="background-color: ${colorHex};"></span>
          <span class="badge-region-tag">${regionId.toUpperCase()} AREA</span>
        </div>
        <h3 class="badge-title font-serif">${def.name}</h3>
        <p class="badge-subtitle">${def.subtitle}</p>
        <div class="badge-action">
          <span class="badge-action-text font-serif italic">Enter Region</span>
          <span class="badge-arrow">→</span>
        </div>
      </div>
    `;

    this.badgeElement.onclick = () => {
      if (window.brainEngineInstance) {
        window.brainEngineInstance.selectRegion(regionId);
      }
    };
  }

  hideArrowAndBadge() {
    this.currentRegionId = null;
    if (this.pathsGroup) this.pathsGroup.innerHTML = '';
    if (this.pulsesGroup) this.pulsesGroup.innerHTML = '';
    this.arrowPath = null;
    this.originDot = null;
    this.synapsePulse = null;

    if (this.badgeElement) {
      this.badgeElement.style.display = 'none';
    }
  }
}

window.NeuralArrowsManager = NeuralArrowsManager;
