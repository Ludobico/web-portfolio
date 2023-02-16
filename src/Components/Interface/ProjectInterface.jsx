import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import "../../Static/ProjectInterface.css";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import {
  Effects,
  Icosahedron,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  SpotLight,
  useFBO,
  useTexture,
} from "@react-three/drei";
import Project from "./Project";
import Swarmbasecolor from "../../Static/img/glass_texture/Glass_Window_003_basecolor.jpg";
import Swarmnormalmap from "../../Static/img/glass_texture/Glass_Window_003_normal.jpg";
import SwarmHeight from "../../Static/img/glass_texture/Glass_Window_003_height.png";
import SwarmRough from "../../Static/img/glass_texture/Glass_Window_003_roughness.jpg";
import SwarmAO from "../../Static/img/glass_texture/Glass_Window_003_ambientOcclusion.jpg";
import Swarmmetal from "../../Static/img/glass_texture/Glass_Window_003_metallic.jpg";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { VMlightPass_C } from "./VMlightPass_C";
import { UnrealBloomPass } from "three-stdlib";
import Projects from "../Projects";

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
  const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      
    }`;

  const fragmentShader = `
      uniform float time;
      uniform float progress;
      uniform float radius;
      uniform vec2 lightPosition;
      varying vec2 vUv;

      void main() {
        vec2 p = -1.0 + 2.0 * vUv;
        float len = length(p);

        float distort = radius * pow(len, 2.0);
        vec2 uv = vUv + (p / len) * distort * progress;

        float intensity = 1.5 - length(lightPosition - vUv);
        vec3 color = vec3(1.0, 1.0, 1.0) * pow(intensity, 8.0);

        gl_FragColor = vec4(color, 1.0);
      }`;

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
        <meshStandardMaterial />
        {/* <shaderMaterial
          uniforms={{
            time: { value: 0 },
            progress: { value: 0.0 },
            radius: { value: 0.1 },
            lightPosition: { value: new THREE.Vector2(0.0, 0.0) },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        /> */}
        <directionalLight ref={ref} color="gray" intensity={1} distance={200} />
      </mesh>
      {/* <Effects>
        <shaderPass args={[VMlightPass_C]} needsSwap={false} />
      </Effects> */}
      <EffectComposer>
        <Bloom intensity={3.1} />
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
          // roughness={0.2}
          metalnessMap={metalmap}
          // metalness={0.7}
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
    <>
      <Canvas resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}>
        <CenterMesh />
        <MouseSpot />
        <Light />
        <Swarm count={300} />
      </Canvas>
    </>
  );
};

const ProjectInterface = () => {
  return (
    <>
      <div className="Pin_top_div">
        <Project />
        <Scene />
      </div>
    </>
  );
};

export default ProjectInterface;
