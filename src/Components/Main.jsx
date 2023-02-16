import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Header from "./Header";
import ProjectInterface from "./Interface/ProjectInterface";
import Ripple from "./Ripple";
import Skill from "./Skill";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader } from "@react-three/drei";
import Projects from "./Projects";
const Main = () => {
  gsap.registerPlugin(ScrollTrigger);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <Ripple />
        <Skill />
        <ProjectInterface />
        <Projects />
      </Suspense>
    </>
  );
};

export default Main;
