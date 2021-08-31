import React, { useEffect, useState } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";

// import { softShadows } from "@react-three/drei";
// import { gsap } from "gsap/dist/gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import * as THREE from "three";

function Canvas3D({ mainRef }) {
  const [canvas, setCanvas] = useState();
  useEffect(() => {
    setCanvas(prevState => document.querySelector(".webgl"));
  }, []);

  // Scene
  const scene = new THREE.Scene();

  // Red Cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // Camera
  const sizes = { width: 800, height: 600 };

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  camera.position.x = 2;

  scene.add(camera);

  // Render
  if (canvas) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  }

  return <canvas className="webgl"></canvas>;
}

export default Canvas3D;
