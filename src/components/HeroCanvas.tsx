import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606); // Dark black
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create Hexagon lines (CylinderGeometry with 6 radial segments)
    const geometry = new THREE.CylinderGeometry(2, 2, 0.5, 6, 1, false);
    const edges = new THREE.EdgesGeometry(geometry);
    
    // Gold material for the hexagon wireframe
    const material = new THREE.LineBasicMaterial({ 
      color: 0xC8A84B, 
      linewidth: 2,
      transparent: true,
      opacity: 0.8
    });
    
    const hexagon = new THREE.LineSegments(edges, material);
    hexagon.rotation.x = Math.PI / 2; // Flat facing the camera
    scene.add(hexagon);

    // Particles background
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xC8A84B,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation on all 3 axes
      hexagon.rotation.x = Math.PI / 2 + Math.sin(elapsedTime * 0.3) * 0.2;
      hexagon.rotation.y = elapsedTime * 0.2;
      hexagon.rotation.z = Math.cos(elapsedTime * 0.2) * 0.2;

      // Particles gentle rotation
      particlesMesh.rotation.y = elapsedTime * 0.05;

      // Parallax effect based on mouse
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
      
      hexagon.position.x += (targetX - hexagon.position.x) * 0.05;
      hexagon.position.y += (targetY - hexagon.position.y) * 0.05;

      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationFrameId);
      
      // Cleanup Three.js memory
      geometry.dispose();
      edges.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
