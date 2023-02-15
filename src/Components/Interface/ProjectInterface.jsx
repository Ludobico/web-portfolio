import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React from "react";
import "../../Static/ProjectInterface.css";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";
import { PerspectiveCamera, SpotLight, useTexture } from "@react-three/drei";
import { Lensflare, LensflareElement } from "three-stdlib";
import hexangle from "../../Static/img/flare/hexangle.png";
import lensflare0 from "../../Static/img/flare/lensflare0.png";
import lensflare0_alpha from "../../Static/img/flare/lensflare0_alpha.png";
import lensflare1 from "../../Static/img/flare/lensflare1.png";
import lensflare2 from "../../Static/img/flare/lensflare2.png";
import lensflare3 from "../../Static/img/flare/lensflare3.png";
import Project from "./Project";

function Light() {
  const lightRef = useRef();

  useFrame(({ mouse }) => {
    lightRef.current.position.x = mouse.x * 20;
    lightRef.current.position.y = mouse.y * 20;
  });

  return (
    <>
      <pointLight ref={lightRef} color="white" intensity={1} distance={200} />
    </>
  );
}

function MouseSpot() {
  const { viewport } = useThree();
  const texture = useTexture(lensflare0);
  const lensflare = new Lensflare();
  const element = new LensflareElement(
    texture,
    500,
    0,
    new THREE.Color("white")
  );
  lensflare.addElement(element);

  const ref = useRef();
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    ref.current.position.set(x, y, 0);
    ref.current.rotation.set(-y, x, 0);
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereBufferGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial />
        <pointLight ref={ref} color="gray" intensity={1} distance={200} />
      </mesh>
    </group>
  );
}

function CenterMesh() {
  return (
    <mesh position={[0, 0, 0]}>
      <torusBufferGeometry args={[3, 0.02, 40, 80]} />
      <meshStandardMaterial color={0xff7f00} metalness={0.9} roughness={0.1} />
    </mesh>
  );
}
const Scene = () => {
  return (
    <Canvas>
      <MouseSpot />
      <Light />
      <CenterMesh />
    </Canvas>
  );
};

const ProjectInterface = () => {
  return (
    <div className="Pin_top_div">
      <Project />
      <Scene />
    </div>
  );
};

export default ProjectInterface;
