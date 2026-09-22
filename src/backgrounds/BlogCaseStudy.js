import * as THREE from 'three';

export function createBlogCaseStudyBackground(container) {
  const width = container.clientWidth || 1280;
  const height = container.clientHeight || 720;

  /* ============================================================
   * THEME
   * ============================================================ */

  function detectTheme() {
    if (typeof document === 'undefined') return 'dark';
    const root = document.documentElement;
    if (root.dataset.theme === 'light' || root.classList.contains('light')) return 'light';
    if (root.dataset.theme === 'dark' || root.classList.contains('dark')) return 'dark';
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  const isLight = detectTheme() === 'light';

  // Light mode:  navy ink on cream paper.
  // Dark mode:   warm cream ink on dark paper.
  const COLORS = isLight
    ? {
        paper:   0x3a4a6a, // muted navy for ruled lines
        ink:     0x1a2440, // deep navy ink
        penBody: 0x18181c, // ebony
        penNib:  0xb58b16, // muted gold
      }
    : {
        paper:   0x9a9a86, // faint warm grey for ruled lines
        ink:     0xe8d5a0, // warm cream ink
        penBody: 0xe8dcc0, // ivory
        penNib:  0xf0d264, // bright gold
      };

  const OPACITY = isLight
    ? { paper: 0.10, ink: 0.62, penBody: 0.92, penNib: 1.0 }
    : { paper: 0.07, ink: 0.82, penBody: 0.94, penNib: 1.0 };

  const blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;

  /* ============================================================
   * SCENE
   * ============================================================ */

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 500);
  camera.position.set(0, 0, 60);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Lights — needed so the pen has 3D shading.
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
  keyLight.position.set(6, 12, 10);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.25);
  fillLight.position.set(-8, -4, 4);
  scene.add(fillLight);

  /* ============================================================
   * RULED PAPER LINES
   * ============================================================ */

  const paperPoints = [];
  const LINE_SPACING = 5;
  for (let y = -30; y <= 30; y += LINE_SPACING) {
    paperPoints.push(-200, y, -10, 200, y, -10);
  }

  const paperGeom = new THREE.BufferGeometry();
  paperGeom.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(paperPoints, 3)
  );

  const paperMat = new THREE.LineBasicMaterial({
    color: COLORS.paper,
    transparent: true,
    opacity: OPACITY.paper,
    depthTest: false,
    depthWrite: false,
  });

  const paperLines = new THREE.LineSegments(paperGeom, paperMat);
  paperLines.renderOrder = 0;
  scene.add(paperLines);

  /* ============================================================
   * SIGNATURE STROKE — a single flowing handwritten line
   * ============================================================ */

  const curvePoints = [
    new THREE.Vector3(-42, 2, 0),
    new THREE.Vector3(-38, 5, 0),
    new THREE.Vector3(-34, -1, 0),
    new THREE.Vector3(-30, 3, 0),
    new THREE.Vector3(-26, -2, 0),
    new THREE.Vector3(-22, 5, 0),
    new THREE.Vector3(-18, -1, 0),
    new THREE.Vector3(-14, 4, 0),
    new THREE.Vector3(-10, -2, 0),
    new THREE.Vector3(-6, 3, 0),
    new THREE.Vector3(-2, -4, 0),
    new THREE.Vector3(2, 5, 0),
    new THREE.Vector3(6, -1, 0),
    new THREE.Vector3(10, 5, 0),
    new THREE.Vector3(14, -3, 0),
    new THREE.Vector3(18, 2, 0),
    new THREE.Vector3(22, 6, 0),
    new THREE.Vector3(26, 0, 0),
    new THREE.Vector3(30, -4, 0),
    new THREE.Vector3(34, 3, 0),
    new THREE.Vector3(38, 1, 0),
    new THREE.Vector3(42, 4, 0),
  ];

  const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);

  const TUBULAR_SEGMENTS = 320;

  // Core ink stroke
  const inkCoreGeom = new THREE.TubeGeometry(curve, TUBULAR_SEGMENTS, 0.08, 6, false);
  const inkCoreMat = new THREE.MeshBasicMaterial({
    color: COLORS.ink,
    transparent: true,
    opacity: OPACITY.ink,
    blending,
    depthTest: false,
    depthWrite: false,
  });
  const inkCore = new THREE.Mesh(inkCoreGeom, inkCoreMat);
  inkCore.renderOrder = 2;
  scene.add(inkCore);

  // Soft outer glow (a slightly thicker, dimmer tube wrapped around it)
  const inkGlowGeom = new THREE.TubeGeometry(curve, TUBULAR_SEGMENTS, 0.22, 6, false);
  const inkGlowMat = new THREE.MeshBasicMaterial({
    color: COLORS.ink,
    transparent: true,
    opacity: OPACITY.ink * 0.22,
    blending,
    depthTest: false,
    depthWrite: false,
  });
  const inkGlow = new THREE.Mesh(inkGlowGeom, inkGlowMat);
  inkGlow.renderOrder = 1;
  scene.add(inkGlow);

  const inkCoreIndexCount = inkCoreGeom.index.count;
  const inkGlowIndexCount = inkGlowGeom.index.count;

  inkCoreGeom.setDrawRange(0, 0);
  inkGlowGeom.setDrawRange(0, 0);

  /* ============================================================
   * FOUNTAIN PEN
   *
   * Local origin = the pen tip. Body extends up +y.
   * Tilting the group keeps the tip anchored to the curve point.
   * ============================================================ */

  const penGroup = new THREE.Group();
  penGroup.renderOrder = 3;
  scene.add(penGroup);

  // Body — long tapered cylinder
  const penBodyGeom = new THREE.CylinderGeometry(0.42, 0.5, 8, 20);
  penBodyGeom.translate(0, 5.3, 0); // base at y=1.3, top at y=9.3

  const penBodyMat = new THREE.MeshLambertMaterial({
    color: COLORS.penBody,
    transparent: true,
    opacity: OPACITY.penBody,
  });
  const penBody = new THREE.Mesh(penBodyGeom, penBodyMat);
  penBody.renderOrder = 3;
  penGroup.add(penBody);

  // Nib — small cone with the tip at local origin
  const penNibGeom = new THREE.ConeGeometry(0.35, 1.3, 20);
  penNibGeom.rotateX(Math.PI);
  penNibGeom.translate(0, 0.65, 0); // tip at y=0, base at y=1.3

  const penNibMat = new THREE.MeshLambertMaterial({
    color: COLORS.penNib,
    transparent: true,
    opacity: OPACITY.penNib,
  });
  const penNib = new THREE.Mesh(penNibGeom, penNibMat);
  penNib.renderOrder = 3;
  penGroup.add(penNib);

  // Gold accent band near the top of the body
  const penBandGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.16, 20);
  penBandGeom.translate(0, 7.6, 0);

  const penBandMat = new THREE.MeshLambertMaterial({
    color: COLORS.penNib,
    transparent: true,
    opacity: OPACITY.penNib,
  });
  const penBand = new THREE.Mesh(penBandGeom, penBandMat);
  penBand.renderOrder = 3;
  penGroup.add(penBand);

  // Base tilt — the pen leans to the right, like it's held in a right hand.
  const BASE_TILT = -0.42;

  // Prime the pen at the start of the curve.
  penGroup.position.copy(curve.getPointAt(0));
  penGroup.rotation.z = BASE_TILT;

  /* ============================================================
   * ANIMATION — a slow draw → hold → fade cycle
   * ============================================================ */

  const clock = new THREE.Clock();
  let elapsed = 0;
  let phaseTime = 0;

  // 'drawing' | 'holding' | 'fading'
  let phase = 'drawing';

  const DRAW_DURATION = 6.5;   // seconds to complete one stroke
  const HOLD_DURATION = 1.4;   // pause on the finished signature
  const FADE_DURATION = 1.6;   // fade out before restart
  const FADE_IN_DURATION = 0.5;

  let drawT = 0;     // 0..1 — how much of the stroke is drawn
  let inkAlpha = 0;  // 0..1 — overall fade for the ink + pen

  let frameId;
  let disposed = false;

  const animate = () => {
    if (disposed) return;
    frameId = requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 1 / 30);
    elapsed += dt;
    phaseTime += dt;

    /* --- state machine --------------------------------------------- */

    if (phase === 'drawing') {
      drawT = Math.min(1, phaseTime / DRAW_DURATION);
      inkAlpha = Math.min(1, phaseTime / FADE_IN_DURATION);

      if (phaseTime >= DRAW_DURATION) {
        phase = 'holding';
        phaseTime = 0;
      }
    } else if (phase === 'holding') {
      drawT = 1;
      inkAlpha = 1;

      if (phaseTime >= HOLD_DURATION) {
        phase = 'fading';
        phaseTime = 0;
      }
    } else {
      // fading
      drawT = 1;
      inkAlpha = Math.max(0, 1 - phaseTime / FADE_DURATION);

      if (phaseTime >= FADE_DURATION) {
        phase = 'drawing';
        phaseTime = 0;
        drawT = 0;
        inkAlpha = 0;
      }
    }

    /* --- ink ------------------------------------------------------- */

    inkCoreGeom.setDrawRange(0, Math.floor(inkCoreIndexCount * drawT));
    inkGlowGeom.setDrawRange(0, Math.floor(inkGlowIndexCount * drawT));

    inkCoreMat.opacity = OPACITY.ink * inkAlpha;
    inkGlowMat.opacity = OPACITY.ink * 0.22 * inkAlpha;

    /* --- pen ------------------------------------------------------- */

    // getPointAt uses arc-length parameterization → constant pen speed.
    const safeT = Math.max(0.0001, Math.min(0.9999, drawT));
    penGroup.position.copy(curve.getPointAt(safeT));

    // Subtle live tilt — the hand rotates as it writes.
    penGroup.rotation.z = BASE_TILT + Math.sin(elapsed * 0.55) * 0.045;
    penGroup.rotation.x = Math.sin(elapsed * 0.31) * 0.025;

    penBodyMat.opacity = OPACITY.penBody * inkAlpha;
    penNibMat.opacity = OPACITY.penNib * inkAlpha;
    penBandMat.opacity = OPACITY.penNib * inkAlpha;

    /* --- camera breath -------------------------------------------- */

    camera.position.x = Math.sin(elapsed * 0.06) * 0.9;
    camera.position.y = Math.sin(elapsed * 0.045) * 0.6;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };

  animate();

  /* ============================================================
   * RESIZE
   * ============================================================ */

  const handleResize = () => {
    if (disposed) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  let resizeObserver = null;
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
  }
  window.addEventListener('resize', handleResize);

  requestAnimationFrame(handleResize);

  /* ============================================================
   * CLEANUP
   * ============================================================ */

  return {
    dispose: () => {
      if (disposed) return;
      disposed = true;

      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();

      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = undefined;
      }

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        const mat = obj.material;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });

      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss?.();

      const canvas = renderer.domElement;
      if (canvas && canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    },
  };
}