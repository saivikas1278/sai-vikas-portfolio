"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CanvasHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle system configuration
    const particlesCount = 800;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;

      velocities[i] = (Math.random() - 0.5) * 0.005;
      velocities[i + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i + 2] = (Math.random() - 0.5) * 0.005;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf97316, // Burnt Orange accent
      size: 0.03,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Floating Geometries (Icosahedron, Octahedron, Tetrahedron)
    const geometries = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(1.0),
      new THREE.TetrahedronGeometry(0.6),
    ];

    const floatingObjects: (THREE.Mesh & {
      rotationSpeed?: { x: number; y: number; z: number };
    })[] = [];

    const colors = [0xf59e0b, 0xf97316, 0xef4444]; // Electric Amber, Burnt Orange, Crimson Orange

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: colors[index % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });

      const mesh = new THREE.Mesh(geometry, material) as typeof floatingObjects[number];

      mesh.position.x = (index - 1) * 3;
      mesh.position.y = Math.sin(index) * 1.5;
      mesh.position.z = -1;

      mesh.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005,
      };

      floatingObjects.push(mesh);
      scene.add(mesh);
    });

    camera.position.z = 4.5;

    // Mouse Tracking Interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX - width / 2) * 0.001;
      targetMouseY = (event.clientY - height / 2) * 0.001;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll Tracking Interactivity
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow drift particle positions
      const posArray = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArray.length; i += 3) {
        posArray[i] += velocities[i];
        posArray[i + 1] += velocities[i + 1];
        posArray[i + 2] += velocities[i + 2];

        // Bounds bounce back
        if (Math.abs(posArray[i]) > 8) velocities[i] *= -1;
        if (Math.abs(posArray[i + 1]) > 8) velocities[i + 1] *= -1;
        if (Math.abs(posArray[i + 2]) > 8) velocities[i + 2] *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsedTime * 0.02;

      // Animate floating wireframes
      floatingObjects.forEach((obj, idx) => {
        if (obj.rotationSpeed) {
          obj.rotation.x += obj.rotationSpeed.x;
          obj.rotation.y += obj.rotationSpeed.y;
          obj.rotation.z += obj.rotationSpeed.z;
        }
        obj.position.y = Math.sin(elapsedTime * 0.4 + idx) * 0.8 + Math.cos(elapsedTime * 0.2) * 0.2;
      });

      // Lerp mouse camera drift
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX + Math.sin(elapsedTime * 0.05) * 0.1;
      camera.position.y = -mouseY + Math.cos(elapsedTime * 0.05) * 0.1;
      camera.position.z = 4.5 + Math.sin(scrollY * 0.001) * 0.5;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#030303]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
