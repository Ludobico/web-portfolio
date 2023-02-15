import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import "../Static/Ripple.css";
import circleImg from "./Asset/circle.png";
import lightImg from "../Static/img/light_texture.png";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  Text,
  useTexture,
} from "@react-three/drei";
import TypeWriterEffect from "react-typewriter-effect";
import gsap from "gsap";
import { useState } from "react";

function Points() {
  const imgTex = useLoader(THREE.TextureLoader, lightImg);
  const bufferRef = useRef();

  let t = 0;
  let f = 0.002;
  let a = 3;
  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const count = 100;
  const sep = 3;
  let positions = useMemo(() => {
    let positions = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z);
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, graph]);

  useFrame(() => {
    t += 15;

    const positions = bufferRef.current.array;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);

        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach="material"
        map={imgTex}
        color={0x00aaff}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

function AnimationCanvas() {
  return (
    <Canvas legacy={false} camera={{ position: [100, 10, 0], fov: 75 }}>
      <Points />
    </Canvas>
  );
}

function Intro() {
  return (
    <div className="Intro_top_div">
      <div className="Intro_dev">
        <TypeWriterEffect
          textStyle={{
            fontFamily: "Red Hat Display",
            fontSize: "6rem",
            textAlign: "center",
          }}
          startDelay={200}
          cursorColor="black"
          text="AI / Web Developer"
          typeSpeed={90}
        />
      </div>
      <div className="Intro_footer"></div>
    </div>
  );
}

const Ripple = () => {
  return (
    <div className="anim">
      <Suspense fallback={<div>Loading...</div>}>
        <Intro />
        <AnimationCanvas />
      </Suspense>
    </div>
  );
};

export default Ripple;
