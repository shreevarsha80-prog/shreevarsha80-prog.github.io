/**
 * 3D BRAIN ENGINE - Three.js Tactile Editorial Human Brain
 * Interactive Neuro-Navigation System for Shree Varsha V K's Portfolio
 */

class BrainEngine {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) {
      console.error('Brain canvas container not found:', canvasContainerId);
      return;
    }

    this.regions = {};
    this.regionMeshes = [];
    this.activeRegion = null;
    this.hoveredRegion = null;
    this.isTransitioning = false;
    this.isSectionView = false;
    this.mouse = new THREE.Vector2(-999, -999);
    this.targetRotation = new THREE.Euler(0.1, -0.2, 0);
    this.currentRotation = new THREE.Euler(0.1, -0.2, 0);
    this.cameraDefaultPos = new THREE.Vector3(0, 0.4, 6.2);
    this.cameraTargetPos = this.cameraDefaultPos.clone();
    this.cameraLookAt = new THREE.Vector3(0, 0, 0);
    this.cameraCurrentLookAt = new THREE.Vector3(0, 0, 0);

    // Callbacks
    this.onRegionHover = null;
    this.onRegionLeave = null;
    this.onRegionSelect = null;
    this.onAnchorUpdate = null;

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();
    
    // 2. Camera setup
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.camera.position.copy(this.cameraDefaultPos);
    this.camera.lookAt(this.cameraLookAt);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting System (Warm Editorial Clay Studio Lighting)
    this.setupLighting();

    // 5. Brain Group & Anatomical Model Creation
    this.brainGroup = new THREE.Group();
    this.brainGroup.position.set(0, -0.05, 0);
    this.scene.add(this.brainGroup);

    this.createTactileBrainModel();
    this.createSynapticParticles();
    this.createNeuralAura();

    // 6. Raycasting
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Points = { threshold: 0.2 };

    // 7. Event Listeners
    this.setupEvents();

    // 8. Animation Loop
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLighting() {
    // Ambient soft warm studio fill
    const ambientLight = new THREE.AmbientLight(0xf7f2ea, 0.9);
    this.scene.add(ambientLight);

    // Hemisphere light (Warm sky ivory / cool ground shadow)
    const hemiLight = new THREE.HemisphereLight(0xfffbf5, 0xdfd7cc, 0.85);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    // Key Light (Warm soft directional light)
    this.keyLight = new THREE.DirectionalLight(0xfff3e6, 1.4);
    this.keyLight.position.set(4, 5, 5);
    this.keyLight.castShadow = true;
    this.scene.add(this.keyLight);

    // Rim Backlight (Accentuates cortical folds & silhouette)
    const rimLight = new THREE.DirectionalLight(0xc85a32, 0.75);
    rimLight.position.set(-5, 4, -4);
    this.scene.add(rimLight);

    // Fill Cool Light (Subtle contrast)
    const fillLight = new THREE.DirectionalLight(0x8fa8b2, 0.6);
    fillLight.position.set(-4, -3, 3);
    this.scene.add(fillLight);
  }

  // Generates procedurally convoluted brain gyri normal & bump canvas
  generateGyriTexture() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);

    // Draw wavy sulci & gyri ribbons
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#404040';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < 45; i++) {
      ctx.beginPath();
      let x = Math.random() * size;
      let y = Math.random() * size;
      ctx.moveTo(x, y);

      for (let j = 0; j < 6; j++) {
        x += (Math.random() - 0.5) * 90;
        y += (Math.random() - 0.5) * 90;
        ctx.bezierCurveTo(
          x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 60,
          x + (Math.random() - 0.5) * 60, y + (Math.random() - 0.5) * 60,
          x, y
        );
      }
      ctx.stroke();
    }

    // Gaussian blur simulation for smooth tactile folds
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  }

  // Constructs anatomically proportioned human brain with dual hemispheres & interactive lobes
  createTactileBrainModel() {
    this.gyriTexture = this.generateGyriTexture();

    // Region definitions with plain-language navigation mapping
    this.regionDefs = [
      {
        id: 'thinking',
        name: 'THINKING',
        subtitle: 'Decisions, self-reflection & personal philosophy',
        sectionId: 'about',
        color: 0x8E82A6, // Soft lavender
        emissive: 0x3d3252,
        anchor: new THREE.Vector3(0, 0.95, 0.85),
        camOffset: new THREE.Vector3(0, 0.6, 3.8),
        lookAtOffset: new THREE.Vector3(0, 0.4, 0.5),
        geometryConfig: {
          type: 'frontal',
          left: [-0.62, 0.45, 0.65],
          right: [0.62, 0.45, 0.65],
          scale: [0.82, 0.9, 1.05]
        }
      },
      {
        id: 'learning',
        name: 'LEARNING & MEMORY',
        subtitle: 'What I learn, question and build upon (Academics & ProtoSem)',
        sectionId: 'academics',
        color: 0x5B8C9B, // Dusty teal
        emissive: 0x1f3c47,
        anchor: new THREE.Vector3(0, 0.15, 0.25),
        camOffset: new THREE.Vector3(0.4, 0.3, 3.8),
        lookAtOffset: new THREE.Vector3(0, 0.1, 0),
        geometryConfig: {
          type: 'hippocampus',
          left: [-0.55, 0.05, 0.1],
          right: [0.55, 0.05, 0.1],
          scale: [0.72, 0.65, 0.85]
        }
      },
      {
        id: 'people',
        name: 'PEOPLE & CONNECTIONS',
        subtitle: 'Where psychology meets people (Social Vertical & Leadership)',
        sectionId: 'social',
        color: 0xD47A58, // Muted coral / terracotta
        emissive: 0x522616,
        anchor: new THREE.Vector3(-1.15, -0.15, 0.3),
        camOffset: new THREE.Vector3(-2.8, -0.1, 3.6),
        lookAtOffset: new THREE.Vector3(-0.6, -0.1, 0.2),
        geometryConfig: {
          type: 'temporal',
          left: [-0.98, -0.18, 0.25],
          right: [0.98, -0.18, 0.25],
          scale: [0.72, 0.68, 1.0]
        }
      },
      {
        id: 'experiences',
        name: 'EXPERIENCES',
        subtitle: 'Leadership, student governance & campus journey',
        sectionId: 'journey',
        color: 0xC85A32, // Warm terracotta
        emissive: 0x4f1f0e,
        anchor: new THREE.Vector3(0, 0.92, -0.45),
        camOffset: new THREE.Vector3(0.5, 2.2, 3.4),
        lookAtOffset: new THREE.Vector3(0, 0.5, -0.3),
        geometryConfig: {
          type: 'parietal',
          left: [-0.68, 0.68, -0.38],
          right: [0.68, 0.68, -0.38],
          scale: [0.86, 0.85, 0.95]
        }
      },
      {
        id: 'creativity',
        name: 'SEEING & CREATIVITY',
        subtitle: 'Visual perception, dance, guitar & creative expression',
        sectionId: 'skills',
        color: 0xCCA046, // Mustard ochre
        emissive: 0x473511,
        anchor: new THREE.Vector3(0, 0.2, -1.25),
        camOffset: new THREE.Vector3(0, 0.8, -4.2),
        lookAtOffset: new THREE.Vector3(0, 0.1, -0.8),
        geometryConfig: {
          type: 'occipital',
          left: [-0.6, 0.15, -1.05],
          right: [0.6, 0.15, -1.05],
          scale: [0.78, 0.76, 0.88]
        }
      },
      {
        id: 'skills',
        name: 'SKILLS & MOVEMENT',
        subtitle: 'Dance choreography, guitar, public speaking & tool proficiency',
        sectionId: 'skills',
        color: 0x7E9A86, // Sage green
        emissive: 0x1d3623,
        anchor: new THREE.Vector3(0, -0.85, -0.85),
        camOffset: new THREE.Vector3(0, -1.5, 3.8),
        lookAtOffset: new THREE.Vector3(0, -0.6, -0.5),
        geometryConfig: {
          type: 'cerebellum',
          left: [-0.58, -0.72, -0.78],
          right: [0.58, -0.72, -0.78],
          scale: [0.68, 0.58, 0.72]
        }
      },
      {
        id: 'research',
        name: 'CURIOSITY & RESEARCH',
        subtitle: 'Psychology research methods, cognitive inquiries & behavioral nudges',
        sectionId: 'research',
        color: 0xB87D8A, // Dusty rose
        emissive: 0x472028,
        anchor: new THREE.Vector3(0.95, 0.55, 0.35),
        camOffset: new THREE.Vector3(2.6, 1.1, 3.5),
        lookAtOffset: new THREE.Vector3(0.5, 0.3, 0.2),
        geometryConfig: {
          type: 'research',
          left: [-0.75, 0.42, 0.15],
          right: [0.75, 0.42, 0.15],
          scale: [0.65, 0.65, 0.7]
        }
      },
      {
        id: 'ventures',
        name: 'MEMOREA VENTURE',
        subtitle: 'Founder / Entrepreneurship — "Memories, made to wear"',
        sectionId: 'ventures',
        color: 0xD8A878, // Warm sand/amber
        emissive: 0x4f341c,
        anchor: new THREE.Vector3(1.15, -0.2, 0.25),
        camOffset: new THREE.Vector3(2.8, -0.2, 3.6),
        lookAtOffset: new THREE.Vector3(0.6, -0.1, 0.2),
        geometryConfig: {
          type: 'ventures',
          left: [-0.92, -0.05, 0.45],
          right: [0.92, -0.05, 0.45],
          scale: [0.62, 0.62, 0.68]
        }
      }
    ];

    // Build mesh instances for each region
    this.regionDefs.forEach(def => {
      const regionGroup = new THREE.Group();
      regionGroup.name = `region_${def.id}`;

      // Create tactile clay material
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        roughness: 0.68,
        metalness: 0.04,
        bumpMap: this.gyriTexture,
        bumpScale: 0.045,
        emissive: def.emissive,
        emissiveIntensity: 0.08,
        flatShading: false
      });

      // Dual hemisphere meshes for realistic left & right anatomy
      const { left, right, scale, type } = def.geometryConfig;
      const leftMesh = this.buildLobeGeometry(type, scale);
      leftMesh.position.set(left[0], left[1], left[2]);
      leftMesh.material = mat;
      leftMesh.castShadow = true;
      leftMesh.receiveShadow = true;
      leftMesh.userData = { regionId: def.id, hemisphere: 'left' };
      regionGroup.add(leftMesh);
      this.regionMeshes.push(leftMesh);

      const rightMesh = this.buildLobeGeometry(type, scale);
      rightMesh.position.set(right[0], right[1], right[2]);
      rightMesh.material = mat;
      rightMesh.castShadow = true;
      rightMesh.receiveShadow = true;
      rightMesh.userData = { regionId: def.id, hemisphere: 'right' };
      regionGroup.add(rightMesh);
      this.regionMeshes.push(rightMesh);

      this.brainGroup.add(regionGroup);
      this.regions[def.id] = {
        def,
        group: regionGroup,
        material: mat,
        baseColor: new THREE.Color(def.color),
        emissiveColor: new THREE.Color(def.emissive),
        anchor: def.anchor.clone()
      };
    });

    // Anatomical Brainstem & Spinal Cord Base (Tactile Cream Bone)
    this.createBrainstem();

    // Central Longitudinal Sagittal Fissure & Corpus Callosum
    this.createCorpusCallosum();
  }

  // Deforms sphere geometries into organic cortical lobe envelopes
  buildLobeGeometry(type, scale) {
    let geo;
    if (type === 'cerebellum') {
      geo = new THREE.SphereGeometry(0.72, 32, 28);
      // Flatten horizontally and add cerebellar folia ripples
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);
        y *= 0.65;
        // Folia horizontal striations
        y += Math.sin(y * 22) * 0.02;
        pos.setXYZ(i, x, y, z);
      }
    } else {
      geo = new THREE.SphereGeometry(0.85, 36, 32);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);

        // Organic sculpting per lobe category
        if (type === 'frontal') {
          z *= 1.25;
          y += Math.sin(x * 3) * 0.05;
          x += Math.sign(x) * 0.1;
        } else if (type === 'temporal') {
          y *= 0.75;
          z *= 1.1;
          x *= 1.15;
        } else if (type === 'occipital') {
          z *= 1.15;
          x *= 0.9;
        } else if (type === 'parietal') {
          y *= 1.1;
          z *= 0.95;
        }

        // Cortical bulge & organic irregularity
        const noise = Math.sin(x * 4.2 + y * 3.1) * Math.cos(z * 4.5) * 0.04;
        pos.setXYZ(i, x + noise, y + noise, z + noise);
      }
    }

    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo);
    mesh.scale.set(scale[0], scale[1], scale[2]);
    return mesh;
  }

  createBrainstem() {
    const stemGeo = new THREE.CylinderGeometry(0.24, 0.18, 1.2, 24);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0xE8DEC8, // Muted tactile bone/cream
      roughness: 0.72,
      metalness: 0.02,
      bumpMap: this.gyriTexture,
      bumpScale: 0.02
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.position.set(0, -1.05, -0.22);
    stemMesh.rotation.x = -0.15;
    stemMesh.castShadow = true;
    stemMesh.receiveShadow = true;
    this.brainGroup.add(stemMesh);

    // Pons bulge
    const ponsGeo = new THREE.SphereGeometry(0.32, 24, 20);
    const ponsMesh = new THREE.Mesh(ponsGeo, stemMat);
    ponsMesh.position.set(0, -0.75, -0.12);
    ponsMesh.scale.set(1.1, 0.7, 0.85);
    this.brainGroup.add(ponsMesh);
  }

  createCorpusCallosum() {
    const fissureMat = new THREE.MeshBasicMaterial({
      color: 0x1c1917,
      transparent: true,
      opacity: 0.45
    });
    const fissureGeo = new THREE.BoxGeometry(0.04, 1.6, 2.4);
    const fissureMesh = new THREE.Mesh(fissureGeo, fissureMat);
    fissureMesh.position.set(0, 0.25, 0);
    this.brainGroup.add(fissureMesh);
  }

  createSynapticParticles() {
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0xC85A32), // Terracotta
      new THREE.Color(0x5B8C9B), // Teal
      new THREE.Color(0x8E82A6), // Lavender
      new THREE.Color(0xCCA046), // Mustard
      new THREE.Color(0xD47A58)  // Coral
    ];

    for (let i = 0; i < particleCount; i++) {
      // Clustered around the brain outer envelope
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.6 + Math.random() * 0.9;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.1;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.95;
      positions[i * 3 + 2] = r * Math.cos(phi) * 1.2;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = 1.0 + Math.random() * 2.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular soft glow texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(235, 180, 140, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: pTexture,
      transparent: true,
      opacity: 0.65,
      vertexColors: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.brainGroup.add(this.particles);
  }

  createNeuralAura() {
    // Subtle ambient atmospheric glow around brain core
    const auraGeo = new THREE.SphereGeometry(2.4, 24, 24);
    const auraMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0xF4EFEB) },
        viewVector: { value: this.camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.45 - dot(vNormal, vNormel), 2.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, intensity * 0.25);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    this.aura = new THREE.Mesh(auraGeo, auraMat);
    this.brainGroup.add(this.aura);
  }

  setupEvents() {
    // Mouse movement tracking
    window.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Subtle parallax tilt following cursor
      if (!this.isSectionView) {
        this.targetRotation.y = this.mouse.x * 0.45;
        this.targetRotation.x = 0.1 - this.mouse.y * 0.35;
      }
    });

    // Mouse click for region selection
    this.container.addEventListener('click', (e) => {
      if (this.isTransitioning) return;

      const rect = this.container.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      this.raycaster.setFromCamera(clickMouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.regionMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const regionId = hitMesh.userData.regionId;
        if (regionId) {
          this.selectRegion(regionId);
        }
      }
    });

    // Touch support for mobile/tablets
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      }
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      if (this.isTransitioning) return;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.regionMeshes, false);
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const regionId = hitMesh.userData.regionId;
        if (regionId) {
          this.selectRegion(regionId);
        }
      }
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      if (!this.container) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  // Raycasting & Hover Check
  checkHover() {
    if (this.isTransitioning || this.isSectionView) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.regionMeshes, false);

    let newHoveredId = null;
    if (intersects.length > 0) {
      newHoveredId = intersects[0].object.userData.regionId;
    }

    if (newHoveredId !== this.hoveredRegion) {
      // Leave previous region
      if (this.hoveredRegion && this.regions[this.hoveredRegion]) {
        this.unhighlightRegion(this.hoveredRegion);
        if (this.onRegionLeave) this.onRegionLeave(this.hoveredRegion);
      }

      // Enter new region
      this.hoveredRegion = newHoveredId;
      if (this.hoveredRegion && this.regions[this.hoveredRegion]) {
        this.highlightRegion(this.hoveredRegion);
        if (this.onRegionHover) {
          const regionData = this.regions[this.hoveredRegion];
          const screenPos = this.getScreenCoordinates(regionData.anchor);
          this.onRegionHover(this.hoveredRegion, regionData.def, screenPos);
        }
      } else {
        this.container.style.cursor = 'default';
      }
    } else if (this.hoveredRegion && this.regions[this.hoveredRegion]) {
      // Continually update screen position for dynamic curved arrow
      if (this.onAnchorUpdate) {
        const regionData = this.regions[this.hoveredRegion];
        const screenPos = this.getScreenCoordinates(regionData.anchor);
        this.onAnchorUpdate(this.hoveredRegion, screenPos);
      }
    }
  }

  highlightRegion(regionId) {
    const target = this.regions[regionId];
    if (!target) return;

    this.container.style.cursor = 'pointer';

    // Highlight target meshes
    target.material.emissiveIntensity = 0.55;
    target.group.children.forEach(mesh => {
      mesh.scale.set(
        target.def.geometryConfig.scale[0] * 1.08,
        target.def.geometryConfig.scale[1] * 1.08,
        target.def.geometryConfig.scale[2] * 1.08
      );
    });

    // Dim other non-hovered regions slightly for high focus
    Object.keys(this.regions).forEach(id => {
      if (id !== regionId) {
        this.regions[id].material.opacity = 0.65;
        this.regions[id].material.transparent = true;
      }
    });
  }

  unhighlightRegion(regionId) {
    const target = this.regions[regionId];
    if (!target) return;

    target.material.emissiveIntensity = 0.08;
    target.group.children.forEach(mesh => {
      mesh.scale.set(
        target.def.geometryConfig.scale[0],
        target.def.geometryConfig.scale[1],
        target.def.geometryConfig.scale[2]
      );
    });

    // Restore all materials
    Object.keys(this.regions).forEach(id => {
      this.regions[id].material.opacity = 1.0;
      this.regions[id].material.transparent = false;
    });
  }

  // Projects a 3D anchor position onto 2D screen viewport pixels
  getScreenCoordinates(vector3D) {
    const v = vector3D.clone();
    v.applyMatrix4(this.brainGroup.matrixWorld);
    v.project(this.camera);

    const rect = this.container.getBoundingClientRect();
    const x = ((v.x + 1) / 2) * rect.width + rect.left;
    const y = ((-v.y + 1) / 2) * rect.height + rect.top;
    return { x, y, visible: v.z < 1.0 };
  }

  // Click & Camera Tween into Region Section
  selectRegion(regionId) {
    const region = this.regions[regionId];
    if (!region || this.isTransitioning) return;

    this.isTransitioning = true;
    this.activeRegion = regionId;

    // Notify application listener
    if (this.onRegionSelect) {
      this.onRegionSelect(regionId, region.def);
    }

    // Tween camera toward clicked lobe
    const targetCam = region.def.camOffset.clone();
    const targetLook = region.def.lookAtOffset.clone();

    this.tweenCamera(targetCam, targetLook, 1200, () => {
      this.isTransitioning = false;
      this.isSectionView = true;
    });
  }

  // Smooth Camera Lerp/Tween
  tweenCamera(targetPosition, targetLookAt, duration = 1000, onComplete = null) {
    const startPos = this.camera.position.clone();
    const startLookAt = this.cameraLookAt.clone();
    const startTime = performance.now();

    const updateTween = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      // Cubic bezier ease-in-out
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      this.camera.position.lerpVectors(startPos, targetPosition, ease);
      this.cameraLookAt.lerpVectors(startLookAt, targetLookAt, ease);
      this.camera.lookAt(this.cameraLookAt);

      if (progress < 1.0) {
        requestAnimationFrame(updateTween);
      } else {
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(updateTween);
  }

  // Return to Central Brain Home
  resetToBrainHome(onComplete = null) {
    this.isTransitioning = true;
    this.isSectionView = false;
    this.activeRegion = null;

    if (this.hoveredRegion) {
      this.unhighlightRegion(this.hoveredRegion);
      this.hoveredRegion = null;
    }

    this.targetRotation.set(0.1, -0.2, 0);

    this.tweenCamera(this.cameraDefaultPos, new THREE.Vector3(0, 0, 0), 1100, () => {
      this.isTransitioning = false;
      if (onComplete) onComplete();
    });
  }

  // Main Render Animation Loop
  animate() {
    requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Idle rotation & breathing physics
    if (!this.isSectionView && !this.isTransitioning) {
      // Gentle breathing scale oscillation
      const breath = 1.0 + Math.sin(elapsedTime * 1.5) * 0.012;
      this.brainGroup.scale.set(breath, breath, breath);

      // Subtle organic floating on Y axis
      this.brainGroup.position.y = -0.05 + Math.sin(elapsedTime * 1.2) * 0.04;

      // Smooth rotation interpolation
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
      this.brainGroup.rotation.x = this.currentRotation.x;
      this.brainGroup.rotation.y = this.currentRotation.y + Math.sin(elapsedTime * 0.3) * 0.08;
    }

    // 2. Synaptic particles slow spin & sparkle
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.06;
      this.particles.rotation.x = Math.sin(elapsedTime * 0.04) * 0.08;
    }

    // 3. Hover raycast test
    this.checkHover();

    // 4. Render frame
    this.renderer.render(this.scene, this.camera);
  }
}

window.BrainEngine = BrainEngine;
