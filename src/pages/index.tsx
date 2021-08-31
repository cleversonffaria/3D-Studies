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

  const group = new THREE.Group();

  // Red Cube
  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  );

  // Blue Cube

  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "blue" }),
  );

  // Position
  // cube1.position.x = 0.7;
  // cube1.position.y = -0.6;
  // cube1.position.z = 1;

  cube1.position.set(0.7, -0.6, 1);
  group.position.x = 3;

  // Scale
  // cube1.scale.x = 2;
  // cube1.scale.y = 0.5;
  // cube1.scale.z = 0.5;

  cube1.scale.set(2, 0.5, 0.5);
  group.scale.x = 2;
  group.scale.y = 0.2;

  //Rotate
  cube1.rotation.reorder("YXZ");
  // cube1.rotation.x = 3;
  // cube1.rotation.y = 3;
  cube1.rotation.z = Math.PI;

  group.add(cube1, cube2);

  scene.add(group);

  // Camera
  const sizes = { width: 800, height: 600 };

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 4;

  camera.lookAt(cube1.position);

  scene.add(camera);

  //Axes Helper
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

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
