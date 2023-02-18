import {
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
  useTexture,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, Suspense, useRef } from "react";
import * as THREE from "three";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
import { GLTFLoader, RGBELoader } from "three-stdlib";
import "../Static/Contact.css";
import gltfTexture from "../Static/hdr/aerodynamics_workshop_1k.hdr";

function Ground() {
  const [roughmap, normalmap] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "floor_texture/terrain_roughness.jpg",
    process.env.PUBLIC_URL + "floor_texture/terrain_normal.jpg",
  ]);

  useEffect(() => {
    [normalmap, roughmap].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    normalmap.encoding = LinearEncoding;
  }, [normalmap, roughmap]);
  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normalmap}
        normalScale={[0.15, 0.15]}
        roughnessMap={roughmap}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}

function Floor() {
  return (
    <>
      <OrbitControls
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
        enablePan={false}
        enableZoom={false}
        autoRotate
      />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
    </>
  );
}

const GLTFModel = () => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/elven_ranger_statue/scene.gltf");

  return (
    <mesh ref={ref}>
      <primitive object={gltf.scene} scale={0.2} position={[0, 2, 0]} />;
    </mesh>
  );
};
function Scene() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Floor />
        <GLTFModel />
      </Canvas>
    </Suspense>
  );
}
const Contact = () => {
  return (
    <div className="Contact_top_div">
      <Scene />
    </div>
  );
};

export default Contact;
