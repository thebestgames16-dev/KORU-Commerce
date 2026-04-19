import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // ── TORUS KNOT wireframe ──
    const knotGeo = new THREE.TorusKnotGeometry(1.8, 0.45, 180, 20, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0xc8a84b,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // ── ICOSAHEDRON glow ring ──
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xe8d5a3,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // ── PARTICLES ──
    const count = 2800;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      speeds[i] = 0.3 + Math.random() * 0.7;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc8a84b,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── MOUSE ──
    let mx = 0, my = 0;
    let tx = 0, ty = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // ── ANIMATE ──
    let raf: number;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      tx += (mx * 0.35 - tx) * 0.05;
      ty += (my * 0.35 - ty) * 0.05;

      knot.rotation.x = t * 0.08 + ty * 0.4;
      knot.rotation.y = t * 0.12 + tx * 0.4;
      knot.rotation.z = t * 0.05;

      ico.rotation.x = t * 0.04 - ty * 0.2;
      ico.rotation.y = t * 0.06 + tx * 0.2;

      particles.rotation.y = t * 0.025;
      particles.rotation.x = Math.sin(t * 0.03) * 0.15;

      // breathe knot scale
      const breathe = 1 + Math.sin(t * 0.6) * 0.04;
      knot.scale.setScalar(breathe);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      mountRef.current?.removeChild(renderer.domElement);
      knotGeo.dispose(); knotMat.dispose();
      icoGeo.dispose(); icoMat.dispose();
      pGeo.dispose(); pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
