import * as THREE from "three";

export function createMarketplaceBackground(container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 15);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x3b82f6, 2); // Blue light
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.5); // Green light
  dirLight2.position.set(-5, -5, 5);
  scene.add(dirLight2);

  const cardsGroup = new THREE.Group();
  scene.add(cardsGroup);

  // Function to create a single 3D Product Card
  const createCard = () => {
    const cardGroup = new THREE.Group();

    // 1. The Glass Card Base
    const cardWidth = 2;
    const cardHeight = 2.8;
    const cardGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, 0.05);
    const cardMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      metalness: 0.2,
      roughness: 0.2,
      transmission: 0.8, // Glass effect
      thickness: 0.5,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1.0,
    });
    const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
    cardGroup.add(cardMesh);

    // 2. The "Image" Placeholder (a slightly lighter dark box)
    const imgGeometry = new THREE.PlaneGeometry(1.6, 1.4);
    const imgMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.5,
    });
    const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
    imgMesh.position.set(0, 0.5, 0.03); // Push slightly forward
    cardGroup.add(imgMesh);

    // 3. A "Price" or "Title" block (White line)
    const titleGeometry = new THREE.PlaneGeometry(1.2, 0.15);
    const titleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
    titleMesh.position.set(-0.2, -0.5, 0.03); // Bottom left
    cardGroup.add(titleMesh);

    // 4. An "Add to Cart" button (Green box)
    const btnGeometry = new THREE.PlaneGeometry(0.5, 0.2);
    const btnMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981 }); // Green
    const btnMesh = new THREE.Mesh(btnGeometry, btnMaterial);
    btnMesh.position.set(0.4, -0.9, 0.03); // Bottom right
    cardGroup.add(btnMesh);

    return cardGroup;
  };

  // Generate a bunch of cards
  const cards = [];
  for (let i = 0; i < 15; i++) {
    const card = createCard();
    
    // Randomize position, rotation, and scale
    card.position.x = (Math.random() - 0.5) * 25;
    card.position.y = (Math.random() - 0.5) * 15;
    card.position.z = (Math.random() - 0.5) * 10 - 2; // Push back a bit

    card.rotation.x = (Math.random() - 0.5) * 0.5;
    card.rotation.y = (Math.random() - 0.5) * 0.5;
    
    // Randomize size
    const scale = Math.random() * 0.6 + 0.4;
    card.scale.set(scale, scale, scale);

    // Store initial data for animation
    card.userData = {
      floatSpeed: Math.random() * 0.5 + 0.5,
      floatDistance: Math.random() * 1.5 + 0.5,
      initialY: card.position.y,
      initialRotationX: card.rotation.x,
      initialRotationY: card.rotation.y,
    };

    cardsGroup.add(card);
    cards.push(card);
  }

  // Mouse Parallax tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const handleMouseMove = (event) => {
    // Normalize mouse coordinates (-1 to 1)
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  // Only apply mouse tracking on window, not container, so it works anywhere on the page
  window.addEventListener("mousemove", handleMouseMove);

  // Handle Resize
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", handleResize);

  // Animation Loop
  let animationFrameId;
  const clock = new THREE.Clock();

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Smooth mouse parallax
    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;
    
    cardsGroup.position.x += (targetX - cardsGroup.position.x) * 0.05;
    cardsGroup.position.y += (targetY - cardsGroup.position.y) * 0.05;

    // Animate individual cards
    cards.forEach((card) => {
      // Floating motion
      card.position.y = card.userData.initialY + Math.sin(time * card.userData.floatSpeed) * card.userData.floatDistance;
      
      // Subtle continuous rotation
      card.rotation.x = card.userData.initialRotationX + Math.sin(time * 0.2) * 0.1;
      card.rotation.y = card.userData.initialRotationY + Math.cos(time * 0.3) * 0.1;
    });

    renderer.render(scene, camera);
  };

  animate();

  // Cleanup
  return {
    dispose: () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}