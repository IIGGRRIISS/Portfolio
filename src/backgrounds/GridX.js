import * as THREE from 'three';

export function createGridXBackground(container) {
  const width = container.clientWidth || 1280;
  const height = container.clientHeight || 720;

  /* ============================================================
   * THEME DETECTION
   * ============================================================ */

  function detectTheme() {
    if (typeof document === 'undefined') return 'dark';
    const root = document.documentElement;
    if (root.dataset.theme === 'light' || root.classList.contains('light')) {
      return 'light';
    }
    if (root.dataset.theme === 'dark' || root.classList.contains('dark')) {
      return 'dark';
    }
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  const isLight = detectTheme() === 'light';

  const BLENDING = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;

  const COLORS = isLight
    ? {
        circuitAura: 0xc21818,
        circuitGlow: 0xc21818,
        circuitCore: 0xd02828,
        carDot: 0xd02020,
        carHalo: 0xc21818,
        streakRed: 0xa01818,
        streakWhite: 0x444444,
        dots: 0xc21818,
      }
    : {
        circuitAura: 0xff2a2a,
        circuitGlow: 0xff2a2a,
        circuitCore: 0xff6666,
        carDot: 0xff5555,
        carHalo: 0xff2a2a,
        streakRed: 0xff2a2a,
        streakWhite: 0xffffff,
        dots: 0xff2a2a,
      };

  const OPACITY = isLight
    ? { aura: 0.06, glow: 0.22, core: 0.55, carDot: 0.9, carHalo: 0.18, redStreak: 0.55, whiteStreak: 0.35, dots: 0.3 }
    : { aura: 0.06, glow: 0.20, core: 0.9,  carDot: 1.0, carHalo: 0.16, redStreak: 0.7,  whiteStreak: 0.5,  dots: 0.35 };

  /* ============================================================
   * SCENE / CAMERA / RENDERER
   * ============================================================ */

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 500);
  camera.position.set(0, 0, 80);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  /* ============================================================
   * 1. ABSTRACT F1 CIRCUIT
   * ============================================================ */

  const circuitPoints = [
    new THREE.Vector3(-24, 4, 0),
    new THREE.Vector3(-30, 16, 0),
    new THREE.Vector3(-16, 24, 0),
    new THREE.Vector3(-2, 18, 0),
    new THREE.Vector3(12, 22, 0),
    new THREE.Vector3(24, 20, 0),
    new THREE.Vector3(30, 8, 0),
    new THREE.Vector3(22, -2, 0),
    new THREE.Vector3(28, -14, 0),
    new THREE.Vector3(16, -22, 0),
    new THREE.Vector3(0, -18, 0),
    new THREE.Vector3(-14, -24, 0),
    new THREE.Vector3(-26, -16, 0),
    new THREE.Vector3(-30, -4, 0),
  ];

  const curve = new THREE.CatmullRomCurve3(
    circuitPoints,
    true,
    'catmullrom',
    0.5
  );

  const circuitGroup = new THREE.Group();
  circuitGroup.position.set(10, 0, -8);
  circuitGroup.rotation.x = -0.12;
  scene.add(circuitGroup);

  const auraMat = new THREE.MeshBasicMaterial({
    color: COLORS.circuitAura,
    transparent: true,
    opacity: OPACITY.aura,
    blending: BLENDING,
    depthWrite: false,
    depthTest: false,
  });
  const auraMesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 400, 1.8, 6, true),
    auraMat
  );
  circuitGroup.add(auraMesh);

  const glowMat = new THREE.MeshBasicMaterial({
    color: COLORS.circuitGlow,
    transparent: true,
    opacity: OPACITY.glow,
    blending: BLENDING,
    depthWrite: false,
    depthTest: false,
  });
  const glowMesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 400, 0.55, 6, true),
    glowMat
  );
  circuitGroup.add(glowMesh);

  const coreMat = new THREE.MeshBasicMaterial({
    color: COLORS.circuitCore,
    transparent: true,
    opacity: OPACITY.core,
    blending: BLENDING,
    depthWrite: false,
    depthTest: false,
  });
  const coreMesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 400, 0.1, 4, true),
    coreMat
  );
  circuitGroup.add(coreMesh);

  const carDotMat = new THREE.MeshBasicMaterial({
    color: COLORS.carDot,
    transparent: true,
    opacity: OPACITY.carDot,
    blending: BLENDING,
    depthWrite: false,
    depthTest: false,
  });
  const carDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 12, 12),
    carDotMat
  );
  circuitGroup.add(carDot);

  const carHaloMat = new THREE.MeshBasicMaterial({
    color: COLORS.carHalo,
    transparent: true,
    opacity: OPACITY.carHalo,
    blending: BLENDING,
    depthWrite: false,
    depthTest: false,
  });
  const carHalo = new THREE.Mesh(
    new THREE.SphereGeometry(2.0, 12, 12),
    carHaloMat
  );
  circuitGroup.add(carHalo);

  /* ============================================================
   * 2. SPEED STREAKS
   * ============================================================ */

  const STREAK_GEOM = new THREE.PlaneGeometry(1, 0.07);
  const STREAK_X_RANGE = 170;
  const STREAK_Y_RANGE = 140;
  const STREAK_Z_RANGE = 60;

  const dummy = new THREE.Object3D();

  function makeStreakSystem(count, colorHex, opacity) {
    const mat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity,
      blending: BLENDING,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.InstancedMesh(STREAK_GEOM, mat, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;

    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * STREAK_X_RANGE * 2,
        y: (Math.random() - 0.5) * STREAK_Y_RANGE,
        z: -Math.random() * STREAK_Z_RANGE,
        width: 3 + Math.random() * 15,
        speed: 25 + Math.random() * 75,
      });

      dummy.position.set(0, 0, 0);
      dummy.scale.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    return { mesh, data, material: mat };
  }

  const redStreaks = makeStreakSystem(60, COLORS.streakRed, OPACITY.redStreak);
  const whiteStreaks = makeStreakSystem(22, COLORS.streakWhite, OPACITY.whiteStreak);
  scene.add(redStreaks.mesh);
  scene.add(whiteStreaks.mesh);

  function updateStreakSystem(system, dt) {
    const { mesh, data } = system;
    for (let i = 0; i < data.length; i++) {
      const s = data[i];
      s.x += s.speed * dt;

      if (s.x > STREAK_X_RANGE) {
        s.x = -STREAK_X_RANGE;
        s.y = (Math.random() - 0.5) * STREAK_Y_RANGE;
        s.z = -Math.random() * STREAK_Z_RANGE;
      }

      dummy.position.set(s.x, s.y, s.z);
      dummy.scale.set(s.width, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  /* ============================================================
   * 3. DISTANT DOTS
   * ============================================================ */

  const DOT_COUNT = 220;
  const dotPositions = new Float32Array(DOT_COUNT * 3);
  for (let i = 0; i < DOT_COUNT; i++) {
    dotPositions[i * 3]     = (Math.random() - 0.5) * 280;
    dotPositions[i * 3 + 1] = (Math.random() - 0.5) * 180;
    dotPositions[i * 3 + 2] = -70 - Math.random() * 60;
  }

  const dotGeom = new THREE.BufferGeometry();
  dotGeom.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));

  const dotMat = new THREE.PointsMaterial({
    color: COLORS.dots,
    size: 0.55,
    transparent: true,
    opacity: OPACITY.dots,
    blending: BLENDING,
    depthWrite: false,
    depthTest: false,
    sizeAttenuation: true,
  });

  const dots = new THREE.Points(dotGeom, dotMat);
  scene.add(dots);

  /* ============================================================
   * ANIMATION
   * ============================================================ */

  const clock = new THREE.Clock();
  let elapsed = 0;
  let frameId;
  let disposed = false;

  const animate = () => {
    if (disposed) return;
    frameId = requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 1 / 30);
    elapsed += dt;

    circuitGroup.rotation.z = elapsed * 0.05;
    const breath = 1 + Math.sin(elapsed * 1.3) * 0.025;
    auraMesh.scale.setScalar(breath);
    glowMesh.scale.setScalar(breath);

    const t = (elapsed * 0.045) % 1;
    const carPos = curve.getPointAt(t);
    carDot.position.copy(carPos);
    carHalo.position.copy(carPos);

    carHalo.scale.setScalar(1 + Math.sin(elapsed * 6) * 0.18);

    updateStreakSystem(redStreaks, dt);
    updateStreakSystem(whiteStreaks, dt);

    dots.position.x = Math.sin(elapsed * 0.04) * 6;

    camera.position.x = Math.sin(elapsed * 0.11) * 1.5;
    camera.position.y = Math.sin(elapsed * 0.07) * 0.9;
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

  // Force a size sync after the first paint — guards against a 0-size mount.
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