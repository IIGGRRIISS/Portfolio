import * as THREE from "three";

/* ==========================================================================
 * Shaders
 * ======================================================================== */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform vec3  uColorRed;
  uniform vec3  uColorBlue;
  uniform float uOpacity;
  uniform float uAlphaChannel;  // 0 = additive (dark), 1 = normal (light)

  varying vec2 vUv;

  float hash11(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
  }

  const int LINES = 8;

  void main() {
    vec3  pm = vec3(0.0);   // premultiplied RGB accumulator
    float pa = 0.0;         // accumulated alpha

    float h  = max(uResolution.y, 1.0);
    float px = 1.0 / h;     // one CSS pixel in UV units

    for (int i = 0; i < LINES; i++) {
      float fi = float(i);

      // --- deterministic per-line personality --------------------------
      float depth   = 0.5 + hash11(fi * 2.13);
      float yJitter = (hash11(fi * 7.31) - 0.5) * 0.06;
      float cMix    = step(0.5, hash11(fi * 5.73));
      float speed   = 0.10 + hash11(fi * 9.41) * 0.15;
      float phase   = hash11(fi * 11.13);
      float tailLen = 0.04 + hash11(fi * 17.3) * 0.06;   // short tails

      // --- parallax ----------------------------------------------------
      vec2 uv = vUv - uMouse * vec2(0.012, 0.008) * depth;

      // --- line y-position ---------------------------------------------
      float t     = (fi + 0.5) / float(LINES);
      float yBase = mix(0.10, 0.90, t) + yJitter;
      yBase += sin(uTime * 0.25 + fi * 1.7) * 0.004;

      float dy = uv.y - yBase;

      // --- hairline: ~1px wide, antialiased, NO halo -------------------
      float halfWidth = px * 0.55;
      float line = 1.0 - smoothstep(halfWidth * 0.4, halfWidth, abs(dy));

      vec3 lineColor = mix(uColorRed, uColorBlue, cMix);

      // Resting line — very faint.
      float base = line * 0.28;

      // --- two travelling pulses (left -> right) -----------------------
      float pulseA = 0.0;
      for (int k = 0; k < 2; k++) {
        float fk = float(k);
        float head = fract(uTime * speed + phase + fk * 0.5);
        float dx = uv.x - head;
        dx -= floor(dx + 0.5);
        float w = dx > 0.0 ? 0.0018 : tailLen;
        float g = exp(-(dx * dx) / (w * w));
        float fadeIn  = smoothstep(0.0, 0.10, head);
        float fadeOut = 1.0 - smoothstep(0.90, 1.0, head);
        pulseA += g * fadeIn * fadeOut * (k == 0 ? 1.0 : 0.5);
      }

      // Pulse gently brightens the hairline; no bloom, no bloom halo.
      float intensity = base + pulseA * line * 0.55;
      intensity = clamp(intensity, 0.0, 1.0);

      // --- premultiplied "over" composite ------------------------------
      vec3 linePM = lineColor * intensity;
      pm = linePM + pm * (1.0 - intensity);
      pa = intensity + pa * (1.0 - intensity);
    }

    // Soft top / bottom vignette.
    float vig = smoothstep(0.0, 0.08, vUv.y) *
                (1.0 - smoothstep(0.92, 1.0, vUv.y));

    pm *= vig * uOpacity;
    pa *= vig * uOpacity;

    gl_FragColor = vec4(pm, clamp(pa, 0.0, 1.0) * uAlphaChannel);
  }
`;

/* ==========================================================================
 * Themes — low opacities so the lines read as subtle hairlines.
 * ======================================================================== */

const THEMES = {
  dark: {
    colorRed:  0xff3030,
    colorBlue: 0x4080ff,
    opacity:   0.45,
    alphaChannel: 0.0,
    blending:  THREE.CustomBlending,
    blendSrc:  THREE.OneFactor,
    blendDst:  THREE.OneFactor,
  },
  light: {
    colorRed:  0xc02020,
    colorBlue: 0x2040c0,
    opacity:   0.40,
    alphaChannel: 1.0,
    blending:  THREE.CustomBlending,
    blendSrc:  THREE.OneFactor,
    blendDst:  THREE.OneMinusSrcAlphaFactor,
  },
};

/* ==========================================================================
 * Public API
 * ======================================================================== */

/**
 * Thin red/blue hairlines drifting left to right.
 *
 * @param {HTMLElement} container
 * @param {object} [options]
 * @param {"dark"|"light"} [options.theme]
 * @returns {{ dispose: () => void, setTheme: (t: "dark"|"light") => void, getTheme: () => string }}
 */
export function createTechnoBackground(container, options = {}) {
  if (!container) {
    throw new Error("createTechnoBackground(): a container element is required.");
  }

  const config = {
    parallax: 1,
    maxPixelRatio: 2,
    ...options,
  };

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------- *
   * Theme resolution
   * -------------------------------------------------------------------- */

  function detectTheme() {
    const root = document.documentElement;
    if (root.dataset.theme === "light" || root.classList.contains("light"))
      return "light";
    if (root.dataset.theme === "dark" || root.classList.contains("dark"))
      return "dark";
    if (window.matchMedia?.("(prefers-color-scheme: light)").matches)
      return "light";
    return "dark";
  }

  const resolveTheme = (name) => THEMES[name] || THEMES.dark;

  let activeThemeName =
    options.theme === "light" || options.theme === "dark"
      ? options.theme
      : detectTheme();

  let target = resolveTheme(activeThemeName);

  /* ---------------------------------------------------------------------- *
   * Renderer / scene
   * -------------------------------------------------------------------- */

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (error) {
    console.warn("createTechnoBackground(): WebGL unavailable.", error);
    return { dispose() {}, setTheme() {}, getTheme: () => activeThemeName };
  }

  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  Object.assign(canvas.style, {
    display: "block",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  });
  container.appendChild(canvas);

  const scene  = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  /* ---------------------------------------------------------------------- *
   * Fullscreen quad
   * -------------------------------------------------------------------- */

  const geometry = new THREE.PlaneGeometry(2, 2);

  const uniforms = {
    uTime:         { value: 0 },
    uResolution:   { value: new THREE.Vector2(1, 1) },
    uMouse:        { value: new THREE.Vector2(0, 0) },
    uColorRed:     { value: new THREE.Color(target.colorRed) },
    uColorBlue:    { value: new THREE.Color(target.colorBlue) },
    uOpacity:      { value: target.opacity },
    uAlphaChannel: { value: target.alphaChannel },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: target.blending,
    blendSrc: target.blendSrc,
    blendDst: target.blendDst,
    blendEquation: THREE.AddEquation,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const current = {
    red:     new THREE.Color(target.colorRed),
    blue:    new THREE.Color(target.colorBlue),
    opacity: target.opacity,
  };
  const goal = {
    red:     new THREE.Color(target.colorRed),
    blue:    new THREE.Color(target.colorBlue),
    opacity: target.opacity,
  };

  /* ---------------------------------------------------------------------- *
   * Pointer input
   * -------------------------------------------------------------------- */

  const pointer       = { x: 0, y: 0 };
  const pointerTarget = { x: 0, y: 0 };

  function handlePointerMove(event) {
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerTarget.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerTarget.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }
  function handlePointerLeave() {
    pointerTarget.x = 0;
    pointerTarget.y = 0;
  }

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  document.addEventListener("pointerleave", handlePointerLeave, { passive: true });

  /* ---------------------------------------------------------------------- *
   * Sizing
   * -------------------------------------------------------------------- */

  let lastWidth = 0, lastHeight = 0, lastPixelRatio = 0;

  function applySize(force = false) {
    const width  = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) {
      uniforms.uResolution.value.set(1280, 720);
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, config.maxPixelRatio);

    if (!force && width === lastWidth && height === lastHeight &&
        pixelRatio === lastPixelRatio) {
      return;
    }

    lastWidth = width;
    lastHeight = height;
    lastPixelRatio = pixelRatio;

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);

    uniforms.uResolution.value.set(width, height);

    if (prefersReducedMotion) renderFrame(0);
  }

  let resizeObserver = null;
  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(() => applySize());
    resizeObserver.observe(container);
  }
  window.addEventListener("resize", applySize, { passive: true });

  /* ---------------------------------------------------------------------- *
   * Animation
   * -------------------------------------------------------------------- */

  const clock = new THREE.Clock();
  let elapsed = 0;
  let frameId = 0;
  let onScreen = true;
  let pageVisible = !document.hidden;

  const damp = (c, t, lambda, dt) => c + (t - c) * (1 - Math.exp(-lambda * dt));

  function renderFrame(dt) {
    elapsed += dt;
    uniforms.uTime.value = elapsed;

    const k = 1 - Math.exp(-6 * dt);
    current.red.lerp(goal.red, k);
    current.blue.lerp(goal.blue, k);
    current.opacity += (goal.opacity - current.opacity) * k;

    uniforms.uColorRed.value.copy(current.red);
    uniforms.uColorBlue.value.copy(current.blue);
    uniforms.uOpacity.value = current.opacity;

    pointer.x = damp(pointer.x, pointerTarget.x, 4, dt);
    pointer.y = damp(pointer.y, pointerTarget.y, 4, dt);
    uniforms.uMouse.value.set(
      pointer.x * config.parallax,
      pointer.y * config.parallax
    );

    renderer.render(scene, camera);
  }

  function loop() {
    frameId = requestAnimationFrame(loop);
    renderFrame(Math.min(clock.getDelta(), 1 / 30));
  }
  function start() {
    if (frameId || prefersReducedMotion) return;
    clock.getDelta();
    loop();
  }
  function stop() {
    if (!frameId) return;
    cancelAnimationFrame(frameId);
    frameId = 0;
  }
  function updateRunning() {
    if (onScreen && pageVisible) start(); else stop();
  }

  /* ---------------------------------------------------------------------- *
   * Theme switch
   * -------------------------------------------------------------------- */

  function setTheme(name) {
    if (name !== "dark" && name !== "light") return;

    activeThemeName = name;
    target = resolveTheme(name);

    goal.red.set(target.colorRed);
    goal.blue.set(target.colorBlue);
    goal.opacity = target.opacity;

    material.blending  = target.blending;
    material.blendSrc  = target.blendSrc;
    material.blendDst  = target.blendDst;
    uniforms.uAlphaChannel.value = target.alphaChannel;

    if (prefersReducedMotion) {
      current.red.copy(goal.red);
      current.blue.copy(goal.blue);
      current.opacity = goal.opacity;
      uniforms.uColorRed.value.copy(current.red);
      uniforms.uColorBlue.value.copy(current.blue);
      uniforms.uOpacity.value = current.opacity;
      renderFrame(0);
    }
  }

  /* ---------------------------------------------------------------------- *
   * Visibility + context loss
   * -------------------------------------------------------------------- */

  let intersectionObserver = null;
  if ("IntersectionObserver" in window) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        updateRunning();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);
  }

  function handleVisibilityChange() {
    pageVisible = !document.hidden;
    updateRunning();
  }
  document.addEventListener("visibilitychange", handleVisibilityChange);

  function handleContextLost(event) { event.preventDefault(); stop(); }
  function handleContextRestored()   { updateRunning(); }

  canvas.addEventListener("webglcontextlost", handleContextLost, false);
  canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

  /* ---------------------------------------------------------------------- *
   * Boot
   * -------------------------------------------------------------------- */

  applySize(true);
  updateRunning();

  /* ---------------------------------------------------------------------- *
   * Cleanup
   * -------------------------------------------------------------------- */

  return {
    dispose() {
      stop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();

      window.removeEventListener("resize", applySize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      geometry.dispose();
      material.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss?.();

      if (canvas.parentNode === container) container.removeChild(canvas);
    },
    setTheme,
    getTheme: () => activeThemeName,
  };
}