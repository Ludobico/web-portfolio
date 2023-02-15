import { Canvas } from "@react-three/fiber";
import React from "react";
import Header from "./Header";
import ProjectInterface from "./Interface/ProjectInterface";
import Ripple from "./Ripple";
import Skill from "./Skill";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Main = () => {
  gsap.registerPlugin(ScrollTrigger);
  return (
    <>
      <Header />
      <Ripple />
      <Skill />
      <ProjectInterface />
    </>
  );
};

export default Main;
