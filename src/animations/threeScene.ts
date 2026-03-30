import * as THREE from 'three';

export interface ThreeSceneOptions {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export class HeroThreeScene {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private clock: THREE.Clock;
  private animId: number = 0;
  private mouse = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.clock = new THREE.Clock();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setClearColor(0x000000, 0);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    this.createParticles();
    this.createFloatingGeometry();
    this.addLight();
    this.bindEvents(canvas);
    this.animate();
  }

  private createParticles() {
    const count = 1200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#c9a96e'),
      new THREE.Color('#7c5cbf'),
      new THREE.Color('#e8c98a'),
      new THREE.Color('#9d7de0'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 120;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;
      sizes[i] = Math.random() * 2.5 + 0.5;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  private createFloatingGeometry() {
    // Wireframe torus
    const torusGeo = new THREE.TorusGeometry(8, 2.5, 16, 60);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xc9a96e,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(20, -5, -10);
    torus.name = 'torus';
    this.scene.add(torus);

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x7c5cbf,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-22, 6, -5);
    ico.name = 'ico';
    this.scene.add(ico);

    // Grid line plane
    const gridHelper = new THREE.GridHelper(80, 20, 0xc9a96e, 0x7c5cbf);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.04;
    gridHelper.position.y = -18;
    gridHelper.rotation.x = 0.3;
    gridHelper.name = 'grid';
    this.scene.add(gridHelper);
  }

  private addLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xc9a96e, 2, 60);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7c5cbf, 2, 60);
    pointLight2.position.set(-15, -8, 5);
    this.scene.add(pointLight2);
  }

  private bindEvents(canvas: HTMLCanvasElement) {
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    (canvas as unknown as { _cleanup: () => void })._cleanup = () =>
      window.removeEventListener('mousemove', onMouseMove);
  }

  private animate = () => {
    this.animId = requestAnimationFrame(this.animate);
    const elapsed = this.clock.getElapsedTime();

    // Rotate particles
    this.particles.rotation.y = elapsed * 0.04;
    this.particles.rotation.x = elapsed * 0.02;

    // Mouse parallax on camera
    this.camera.position.x += (this.mouse.x * 3 - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouse.y * 2 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    // Rotate geometries
    const torus = this.scene.getObjectByName('torus');
    const ico = this.scene.getObjectByName('ico');
    if (torus) {
      torus.rotation.x = elapsed * 0.3;
      torus.rotation.y = elapsed * 0.2;
    }
    if (ico) {
      ico.rotation.x = elapsed * 0.25;
      ico.rotation.y = elapsed * 0.35;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public resize(w: number, h: number) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  public destroy() {
    cancelAnimationFrame(this.animId);
    this.renderer.dispose();
  }
}
