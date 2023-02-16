import {
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
  useTexture,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import * as THREE from "three";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
import "../Static/Contact.css";
import basecolor from "../Static/img/floor_texture/grid-texture.png";
import normal from "../Static/img/floor_texture/terrain_normal.jpg";
import rough from "../Static/img/floor_texture/terrain_roughness.jpg";

function Ground() {
  const roughmap = useLoader(TextureLoader, rough);
  const normalmap = useLoader(TextureLoader, normal);

  useEffect(() => {
    [normalmap, roughmap].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
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
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}

function Floor() {
  return (
    <>
      <OrbitControls />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <SpotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
      />
      <SpotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
      />
      <Ground />
    </>
  );
}
function Scene() {
  return (
    <Canvas>
      <Floor />
    </Canvas>
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
