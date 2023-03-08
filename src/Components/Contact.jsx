import {
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, Suspense, useRef } from "react";
import * as THREE from "three";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
import { GLTFLoader, RGBELoader } from "three-stdlib";
import "../Static/Contact.css";
import Fade from "react-reveal/Fade";
import gltfcolor from "../Static/img/Metal_Diamond_001_SD/Metal_Diamond_001_COLOR.jpg";
import gltfdisp from "../Static/img/Metal_Diamond_001_SD/Metal_Diamond_001_DISP.png";
import gltfnormal from "../Static/img/Metal_Diamond_001_SD/Metal_Diamond_001_NORM.jpg";
import gltfao from "../Static/img/Metal_Diamond_001_SD/Metal_Diamond_001_OCC.jpg";
import gltfrough from "../Static/img/Metal_Diamond_001_SD/Metal_Diamond_001_ROUGH.jpg";
import { Tween } from "gsap/gsap-core";
import gsap from "gsap";

/**
 *
 * @returns planegeometry로 바닥같은 객체를 생성하고 MeshReflectorMaterial을 사용하여 반사효과를 주었습니다. 여기에 텍스쳐를 설정하여 더욱 바닥같은 느낌을 주었습니다.
 */
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
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normalmap}
        normalScale={[0.15, 0.15]}
        roughnessMap={roughmap}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        metalness={0.8}
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

/**
 *
 * @returns 카메라의 위치와 광원을 설정하였습니다.
 */
function Floor() {
  const spotlightRef = useRef();
  // useEffect(() => {
  //   gsap.to(spotlightRef.current, {
  //     intensity: 15,
  //     duration: 5,
  //     repeat: -1,
  //     yoyo: true,
  //   });
  // });

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
        ref={spotlightRef}
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

/**
 *
 * @returns GLTFModel을 불러와서 바닥위에 조각상을 배치시켰고, matalness와 roughness를 설정함으로써 폴리곤보단 금속재질의 조각상으로 재질을 변경하였습니다.
 */
const GLTFModel = () => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/elven_ranger_statue/scene.gltf");
  const color = useTexture(gltfcolor);
  const disp = useTexture(gltfdisp);
  const normal = useTexture(gltfnormal);
  const ao = useTexture(gltfao);
  const rough = useTexture(gltfrough);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.metalness = 1;
        child.material.roughness = 0.1;
      }
    });
  });

  return (
    <group>
      <mesh ref={ref}>
        <primitive object={gltf.scene} scale={0.2} position={[0, 2, 0]} />;
      </mesh>
      <directionalLight color={0xffffff} intensity={0.5} />
    </group>
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

/**
 *
 * @returns Threejs를 사용하지않은 일반적인 html 컴포넌트입니다.
 */
const Contact_Text = () => {
  const link_1 = () => {
    window.open("https://github.com/Ludobico", "_blank");
  };
  return (
    <div className="Contact_text_top_div">
      <Fade bottom duration={2000}>
        <section className="contact_section">
          <div className="section_div">
            <div className="split_div">contact</div>
          </div>
          <div className="quote">Stay hungry, Stay foolish</div>
          <div className="contact_grid_box">
            <div className="contact_email">
              <div>E-Mail</div>
              <div>aqs450@gmail.com</div>
              <div>kk99270@naver.com</div>
            </div>
            <div className="contact_social">
              <div>social</div>
              <div onClick={link_1}>Github</div>
            </div>
          </div>
        </section>
      </Fade>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="Contact_top_div">
      <Scene />
      <Contact_Text />
    </div>
  );
};

export default Contact;
