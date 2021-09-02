import React, { useEffect, useState } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";

// import { softShadows } from "@react-three/drei";
import { gsap } from "gsap/dist/gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import * as THREE from "three";
import { WebGLRenderer, PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// import imageSource from "public/assets/door/color.jpg";

function Canvas3D({ mainRef }) {
  const [renderer, setRenderer] = useState<WebGLRenderer>(null);
  const [camera, setCamera] = useState<PerspectiveCamera>(null);
  const [orbitControls, setOrbitControls] = useState<OrbitControls>(null);
  const [sizes, setSizes] = useState({
    width: 800,
    height: 600,
  });

  useEffect(() => {
    // Render
    setRenderer(
      new THREE.WebGLRenderer({
        canvas: document.querySelector(".webgl"),
      }),
    );

    // Camera
    const createCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
    );

    setCamera(createCamera);

    // OrbitControls
    setOrbitControls(
      new OrbitControls(createCamera, document.querySelector(".webgl")),
    );

    // Sizes
    // setSizes({
    //   width: window.,
    //   height: window.,
    // });
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
  cube1.position.set(2, 0, 0);

  // Scale
  // cube1.scale.set(2, 0.5, 0.5);

  //Rotate
  cube1.rotation.reorder("YXZ");

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
  if (camera) {
    camera.position.z = 6;
    scene.add(camera);
  }

  orbitControls.enableDamping = true;

  const tick = () => {
    // if (camera) {
    //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    //   camera.position.y = cursor.y * 5;
    //   camera.lookAt(new THREE.Vector3());
    // }

    // Upate Controls
    orbitControls.update();

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
