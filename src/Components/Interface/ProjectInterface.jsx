import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React from "react";
import "../../Static/ProjectInterface.css";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import {
  Icosahedron,
  PerspectiveCamera,
  SpotLight,
  useTexture,
} from "@react-three/drei";
import lensflare0 from "../../Static/img/flare/lensflare0.png";
import lightmap from "../../Static/img/lightmap.png";
import Project from "./Project";
import Swarmbasecolor from "../../Static/img/glass_texture/Glass_Window_003_basecolor.jpg";
import Swarmnormalmap from "../../Static/img/glass_texture/Glass_Window_003_normal.jpg";
import SwarmHeight from "../../Static/img/glass_texture/Glass_Window_003_height.png";
import SwarmRough from "../../Static/img/glass_texture/Glass_Window_003_roughness.jpg";
import SwarmAO from "../../Static/img/glass_texture/Glass_Window_003_ambientOcclusion.jpg";
import Swarmmetal from "../../Static/img/glass_texture/Glass_Window_003_metallic.jpg";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function Light() {
  const lightRef = useRef();

  useFrame(({ mouse }) => {
    lightRef.current.position.x = mouse.x * 20;
    lightRef.current.position.y = mouse.y * 20;
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        color={0xff7f00}
        intensity={100}
        distance={100}
      />
    </>
  );
}

function MouseSpot() {
  const { viewport } = useThree();
  const texture = useTexture(lensflare0);
  const lightmaptex = useTexture(lightmap);

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
        <meshBasicMaterial color={0xff7f00} />
        <directionalLight ref={ref} color="gray" intensity={1} distance={200} />
      </mesh>
      <EffectComposer>
        <Bloom
          intensity={1.0} // The bloom intensity.
          blurPass={undefined} // A blur pass.
          luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
      </EffectComposer>
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

function Swarm({ count }) {
  const mesh = useRef();
  const light = useRef();
  const { size, viewport, mouse } = useThree();
  const aspect = (mouse.x * viewport.width) / (mouse.y * viewport.height);

  const basecolor = useTexture(Swarmbasecolor);
  const normal = useTexture(Swarmnormalmap);
  const heightmap = useTexture(SwarmHeight);
  const roughmap = useTexture(SwarmRough);
  const AOmap = useTexture(SwarmAO);
  const metalmap = useTexture(Swarmmetal);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 10;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 40;
      const yFactor = -50 + Math.random() * 40;
      const zFactor = -50 + Math.random() * 40;
      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0,
      });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Makes the light follow the mouse
    light.current.position.set(
      -state.mouse.x * aspect,
      -state.mouse.y * aspect,
      0
    );
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01;
      particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  // const roughmap = useTexture(SwarmRough);
  // const AOmap = useTexture(SwarmAO);
  // const metalmap = useTexture(Swarmmetal);
  return (
    <>
      <directionalLight ref={light} intensity={2} color="white">
        <mesh scale={[1, 1, 6]}>
          {/* <dodecahedronBufferGeometry args={[1, 0]} /> */}
          {/* <meshBasicMaterial color="lightblue" transparent /> */}
        </mesh>
      </directionalLight>
      <ambientLight />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          map={basecolor}
          normalMap={normal}
          displacementMap={heightmap}
          roughnessMap={roughmap}
          //   roughness={0.9}
          metalnessMap={metalmap}
          //   metalness={0.7}
          aoMap={AOmap}
          aoMapIntensity={0.1}
          color={0xffffff}
          castShadow
        />
      </instancedMesh>
    </>
  );
}
const Scene = () => {
  return (
    <Canvas>
      <MouseSpot />
      <Light />
      <CenterMesh />
      <Swarm count={700} />
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