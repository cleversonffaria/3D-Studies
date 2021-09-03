import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";

// import { softShadows } from "@react-three/drei";
import { gsap } from "gsap/dist/gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import * as THREE from "three";
import { WebGLRenderer, PerspectiveCamera, MeshStandardMaterial } from "three";

import doorMap from "public/assets/door/color.jpg";
import doorDisplacement from "public/assets/door/height.jpg";
import doorNormal from "public/assets/door/normal.jpg";
import doorRoughtness from "public/assets/door/roughness.jpg";
import doorAmbientOc from "public/assets/door/ambientOcclusion.jpg";

import { useTexture, OrbitControls, useMatcapTexture } from "@react-three/drei";

function Box(props) {
  const ref = useRef(null);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  const propsTexture = useTexture({
    map: doorMap.src,
    displacementMap: doorDisplacement.src,
    normalMap: doorNormal.src,
    roughnessMap: doorRoughtness.src,
    aoMap: doorAmbientOc.src,
  });

  const [matcap, url] = useMatcapTexture(
    554, // https://github.com/emmelleppi/matcaps/blob/master/matcap-list.json
    64, // size of the texture ( 64, 128, 256, 512, 1024 )
  );

  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={event => setActive(!active)}
      onPointerOver={event => setHover(true)}
      onPointerOut={event => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      {/* <meshStandardMaterial {...propsTexture} /> */}
      <meshMatcapMaterial matcap={matcap} />
    </mesh>
  );
}

function Canvas3D({ mainRef }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
      <Suspense fallback={null}>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <ambientLight />
        <pointLight position={[10, 20, 10]} />
        <Box position={[-0.8, 0, 0]} />
        <Box position={[0.8, 0, 0]} />
      </Suspense>
    </Canvas>
  );
}

export default Canvas3D;
