import * as THREE from 'three';

export function createSignifyBackground(container) {
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
        purple: 0x7c3aed,
        purpleBright: 0x8b5cf6,
        gold: 0xb58b16,
        goldBright: 0xc99f28,
      }
    : {
        purple: 0x8b5cf6,
        purpleBright: 0xa78bfa,
        gold: 0xd4af37,
        goldBright: 0xf0d264,
      };

  const OPACITY = isLight
    ? { dots: 0.7, bones: 0.28, flow: 0.55, ambient: 0.22 }
    : { dots: 1.0, bones: 0.45, flow: 0.95, ambient: 0.40 };

  /* ============================================================
   * SCENE / CAMERA / RENDERER
   * ============================================================ */

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 500);
  camera.position.set(0, 0, 70);

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
   * MEDIAPIPE-STYLE HAND LANDMARKS
   * 21 points per hand — wrist, 4 per finger.
   * Coordinates: wrist at (0,0), fingers point up (+y),
   * thumb to the left (-x), pinky to the right (+x).
   * ============================================================ */

  const HAND_LANDMARKS = [
    [0, 0],                                              // 0  wrist
    [-0.9, 0.5], [-1.6, 1.0], [-2.1, 1.6], [-2.4, 2.2],  // 1-4  thumb
    [-0.5, 1.6], [-0.6, 2.5], [-0.7, 3.1], [-0.8, 3.6],  // 5-8  index
    [0.2, 1.8], [0.2, 2.8], [0.2, 3.4], [0.2, 3.9],      // 9-12 middle
    [0.9, 1.7], [1.0, 2.6], [1.1, 3.2], [1.2, 3.6],      // 13-16 ring
    [1.5, 1.4], [1.7, 2.1], [1.9, 2.6], [2.0, 3.0],      // 17-20 pinky
  ];

  const HAND_BONES = [
    [0, 1], [1, 2], [2, 3], [3, 4],           // thumb chain
    [0, 5], [5, 6], [6, 7], [7, 8],           // index chain
    [0, 9], [9, 10], [10, 11], [11, 12],      // middle chain
    [0, 13], [13, 14], [14, 15], [15, 16],    // ring chain
    [0, 17], [17, 18], [18, 19], [19, 20],    // pinky chain
    [5, 9], [9, 13], [13, 17],                // palm web
  ];

  const HAND_SCALE = 3.2;

  /* ============================================================
   * BUILD A HAND — dots + bone cylinders
   * ============================================================ */

  const sharedDotGeom = new THREE.SphereGeometry(0.42, 8, 8);
  const sharedBoneGeom = new THREE.CylinderGeometry(0.14, 0.14, 1, 5, 1);

  function createHand(mirrored, dotColor, boneColor) {
    const group = new THREE.Group();
    const mx = mirrored ? -1 : 1;

    // Compute landmark world positions (relative to this hand's group).
    const positions = HAND_LANDMARKS.map(
      ([x, y]) =>
        new THREE.Vector3(x * HAND_SCALE * mx, y * HAND_SCALE, 0)
    );

    // Landmark dots
    const dotMat = new THREE.MeshBasicMaterial({
      color: dotColor,
      transparent: true,
      opacity: OPACITY.dots,
      blending: BLENDING,
      depthWrite: false,
      depthTest: false,
    });

    for (const pos of positions) {
      const dot = new THREE.Mesh(sharedDotGeom, dotMat);
      dot.position.copy(pos);
      group.add(dot);
    }

    // Bone cylinders connecting landmarks
    const boneMat = new THREE.MeshBasicMaterial({
      color: boneColor,
      transparent: true,
      opacity: OPACITY.bones,
      blending: BLENDING,
      depthWrite: false,
      depthTest: false,
    });

    const up = new THREE.Vector3(0, 1, 0);
    const dir = new THREE.Vector3();
    const midpoint = new THREE.Vector3();

    for (const [a, b] of HAND_BONES) {
      const start = positions[a];
      const end = positions[b];

      dir.subVectors(end, start);
      const length = dir.length();
      if (length < 1e-6) continue;

      midpoint.addVectors(start, end).multiplyScalar(0.5);

      const bone = new THREE.Mesh(sharedBoneGeom, boneMat);
      bone.position.copy(midpoint);
      bone.scale.set(1, length, 1);
      bone.quaternion.setFromUnitVectors(up, dir.clone().normalize());

      group.add(bone);
    }

    return { group, positions, dotMat, boneMat };
  }

  const leftHand = createHand(true, COLORS.purple, COLORS.purpleBright);
  leftHand.group.position.set(-24, 0, 0);

  const rightHand = createHand(false, COLORS.gold, COLORS.goldBright);
  rightHand.group.position.set(24, 0, 0);

  scene.add(leftHand.group);
  scene.add(rightHand.group);

  /* ============================================================
   * BIDIRECTIONAL FLOW PARTICLES
   * Purple flows right (ISL → text)
   * Gold flows left  (text → ISL)
   * ============================================================ */

  const FLOW_COUNT = 90;
  const flowData = [];
  const flowPositions = new Float32Array(FLOW_COUNT * 3);
  const flowColors = new Float32Array(FLOW_COUNT * 3);
  const flowAlpha = new Float32Array(FLOW_COUNT);

  for (let i = 0; i < FLOW_COUNT; i++) {
    const direction = i % 2 === 0 ? 1 : -1;
    const colorHex = direction > 0 ? COLORS.purple : COLORS.gold;
    const c = new THREE.Color(colorHex);

    flowData.push({
      progress: Math.random(),
      speed: 0.10 + Math.random() * 0.18,
      yOffset: (Math.random() - 0.5) * 26,
      zOffset: (Math.random() - 0.5) * 18,
      wavePhase: Math.random() * Math.PI * 2,
      direction,
    });

    flowColors[i * 3]     = c.r;
    flowColors[i * 3 + 1] = c.g;
    flowColors[i * 3 + 2] = c.b;

    flowAlpha[i] = 0;
  }

  const flowGeom = new THREE.BufferGeometry();
  flowGeom.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
  flowGeom.setAttribute('color', new THREE.BufferAttribute(flowColors, 3));
  flowGeom.setAttribute('aAlpha', new THREE.BufferAttribute(flowAlpha, 1));

  const flowMat = new THREE.ShaderMaterial({
    uniforms: {
      uSizeScale: { value: isLight ? 4.0 : 6.0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute float aAlpha;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float uSizeScale;
      uniform float uPixelRatio;

      void main() {
        vColor = color;
        vAlpha = aAlpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uSizeScale * uPixelRatio * (50.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float glow = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor * glow * vAlpha, glow * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: BLENDING,
    vertexColors: true,
  });

  const flowPoints = new THREE.Points(flowGeom, flowMat);
  scene.add(flowPoints);

  /* ============================================================
   * AMBIENT DOTS — background depth
   * ============================================================ */

  const AMBIENT_COUNT = 160;
  const ambientPositions = new Float32Array(AMBIENT_COUNT * 3);
  for (let i = 0; i < AMBIENT_COUNT; i++) {
    ambientPositions[i * 3]     = (Math.random() - 0.5) * 220;
    ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 150;
    ambientPositions[i * 3 + 2] = -45 - Math.random() * 45;
  }

  const ambientGeom = new THREE.BufferGeometry();
  ambientGeom.setAttribute(
    'position',
    new THREE.BufferAttribute(ambientPositions, 3)
  );

  const ambientMat = new THREE.PointsMaterial({
    color: COLORS.purple,
    size: 0.45,
    transparent: true,
    opacity: OPACITY.ambient,
    blending: BLENDING,
    depthWrite: false,
    depthTest: false,
    sizeAttenuation: true,
  });

  const ambientPoints = new THREE.Points(ambientGeom, ambientMat);
  scene.add(ambientPoints);

  /* ============================================================
   * ANIMATION
   * ============================================================ */

  const clock = new THREE.Clock();
  let elapsed = 0;
  let frameId;
  let disposed = false;

  const FLOW_START_X = 24;   // hands sit at ±24 on X
  const FLOW_END_X = -24;

  const animate = () => {
    if (disposed) return;
    frameId = requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 1 / 30);
    elapsed += dt;

    /* --- hands bob and tilt like slow signing ---------------------- */

    leftHand.group.rotation.z = Math.sin(elapsed * 0.45) * 0.06;
    leftHand.group.rotation.y = Math.sin(elapsed * 0.30) * 0.10;
    leftHand.group.position.y = Math.sin(elapsed * 0.65) * 1.4;

    rightHand.group.rotation.z = -Math.sin(elapsed * 0.45 + 1.1) * 0.06;
    rightHand.group.rotation.y = -Math.sin(elapsed * 0.30 + 1.1) * 0.10;
    rightHand.group.position.y = Math.sin(elapsed * 0.65 + 2.0) * 1.4;

    /* --- landmark dots pulse in brightness ------------------------- */

    const pulse = 0.85 + 0.15 * Math.sin(elapsed * 1.6);
    leftHand.dotMat.opacity = OPACITY.dots * pulse;
    rightHand.dotMat.opacity = OPACITY.dots * pulse;

    /* --- flow particles -------------------------------------------- */

    const posArr = flowGeom.attributes.position.array;
    const alphaArr = flowGeom.attributes.aAlpha.array;

    for (let i = 0; i < FLOW_COUNT; i++) {
      const p = flowData[i];

      p.progress += p.speed * dt;
      if (p.progress > 1) p.progress -= 1;

      const startX = p.direction > 0 ? -FLOW_START_X : FLOW_START_X;
      const endX   = p.direction > 0 ? FLOW_END_X : -FLOW_END_X;

      const x = startX + (endX - startX) * p.progress;
      const wave = Math.sin(p.progress * Math.PI * 2 + p.wavePhase) * 2.5;

      posArr[i * 3]     = x;
      posArr[i * 3 + 1] = p.yOffset + wave;
      posArr[i * 3 + 2] = p.zOffset;

      // Fade in over the first 15%, out over the last 15%.
      const fadeIn  = Math.min(1, p.progress / 0.15);
      const fadeOut = Math.min(1, (1 - p.progress) / 0.15);
      alphaArr[i] = fadeIn * fadeOut;
    }

    flowGeom.attributes.position.needsUpdate = true;
    flowGeom.attributes.aAlpha.needsUpdate = true;

    /* --- ambient dots drift slowly --------------------------------- */

    ambientPoints.rotation.z = elapsed * 0.008;

    /* --- camera breath --------------------------------------------- */

    camera.position.x = Math.sin(elapsed * 0.10) * 1.2;
    camera.position.y = Math.sin(elapsed * 0.07) * 0.8;
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
    flowMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  };

  let resizeObserver = null;
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
  }
  window.addEventListener('resize', handleResize);

  // Force a size sync after first paint — guards against a 0-size mount.
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

      // Shared geometries
      sharedDotGeom.dispose();
      sharedBoneGeom.dispose();

      // Everything else in the scene
      scene.traverse((obj) => {
        if (obj.geometry && obj.geometry !== sharedDotGeom && obj.geometry !== sharedBoneGeom) {
          obj.geometry.dispose();
        }
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