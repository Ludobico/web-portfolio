import React from "react";
import "../../Static/Project.css";
import { Image, Text } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Project = () => {
  return (
    <>
      <div className="project_intro">Projects</div>
      <div className="project_intro1">Using JavaScript</div>
      <div className="project_intro2">And Python</div>
      <div className="project_intro_sub">
        <div>프로젝트에 대한 자세한 정보는</div>
        <div>깃허브에 등록된 README를 읽어주세요</div>
      </div>
    </>
  );
};

export default Project;
