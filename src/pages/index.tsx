import React, { useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";

import * as THREE from "three";
import { WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/js/controls/OrbitControls";
import { OrbitControlsProps } from "@react-three/drei";

function Canvas3D({ mainRef }) {
  const [renderer, setRenderer] = useState<WebGLRenderer>(null);

  useEffect(() => {
    // Render
    setRenderer(
      prevState =>
        new THREE.WebGLRenderer({
          canvas: document.querySelector(".webgl"),
        }),
    );
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", event => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = -(event.clientY / sizes.width - 0.5);
    });

    requestRef.current = requestAnimationFrame(tick);
    renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    return () => cancelAnimationFrame(requestRef.current);
  }, [renderer]);

  let cursor = {
    x: 0,
    y: 0,
  };

  const requestRef = React.useRef(null);

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

  cube1.position.set(2, 0, 0);

  // Scale
  // cube1.scale.x = 2;
  // cube1.scale.y = 0.5;
  // cube1.scale.z = 0.5;

  // cube1.scale.set(2, 0.5, 0.5);

  //Rotate
  cube1.rotation.reorder("YXZ");
  // cube1.rotation.x = 3;
  // cube1.rotation.y = 3;
  // cube1.rotation.z = Math.PI;

  // const clock = new THREE.Clock();

  gsap.to(cube2.position, {
    duration: 1,
    delay: 1,
    x: 4,
  });

  gsap.to(cube2.position, {
    duration: 1,
    delay: 2,
    x: 0,
  });

  group.add(cube1, cube2);

  scene.add(group);

  // Camera
  const sizes = { width: 800, height: 600 };

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 6;

  // camera.lookAt(cube1.position);

  scene.add(camera);

  const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    // camera.position.y = Math.cos(elapsedTime);
    // camera.position.x = Math.sin(elapsedTime);
    // camera.lookAt(cube1.position);

    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    camera.position.y = cursor.y * 5;
    camera.lookAt(new THREE.Vector3());

    renderer?.render(scene, camera);

    requestRef.current = requestAnimationFrame(tick);
  };

  //Axes Helper
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  // Render
  renderer?.setSize(sizes.width, sizes.height);
  renderer?.render(scene, camera);

  return <canvas className="webgl"></canvas>;
}

export default Canvas3D;
