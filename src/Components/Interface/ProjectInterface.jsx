import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React from "react";
import "../../Static/ProjectInterface.css";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState } from "react";
import { PerspectiveCamera, SpotLight, useTexture } from "@react-three/drei";
import lightImg from "../../Static/img/blueLight.png";
import { Lensflare, LensflareElement } from "three-stdlib";

const Lens = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const lensflareRef = useRef();

  const handleMouseMove = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  useFrame(() => {
    if (lensflareRef.current) {
      lensflareRef.current.material.uniforms.uMouse.value.x = mouse.x;
      lensflareRef.current.material.uniforms.uMouse.value.y = mouse.y;
    }
  });

  return (
    <Lensflare ref={lensflareRef} position={[0, 0, -50]}>
      <LensflareElement
        position={new THREE.Vector3(0, 0, 0)}
        color="white"
        size={50}
      />
    </Lensflare>
  );
};

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
  const imgTex = useTexture(lightImg);

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
        <meshBasicMaterial map={imgTex} />
        <pointLight ref={ref} color="green" intensity={1} distance={200} />
      </mesh>
    </group>
  );
}
const Scene = () => {
  return (
    <Canvas>
      <MouseSpot />
      <Light />
    </Canvas>
  );
};

const ProjectInterface = () => {
  return (
    <div className="Pin_top_div">
      <Scene />
    </div>
  );
};

export default ProjectInterface;
