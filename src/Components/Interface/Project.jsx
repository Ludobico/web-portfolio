import React from "react";
import "../../Static/Project.css";
import { Image, Text } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Slide from "react-reveal/Slide";

/**
 *
 * @returns 프로젝트 문자열 컴포넌트입니다.
 */
const Project = () => {
  useEffect(() => {
    const reveal = gsap.utils.toArray(".project_reveal");
    reveal.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "active",
        start: "top 90%",
        end: "top 20%",
      });
    });
  });
  return (
    <>
      <Slide bottom cascade>
        <div className="project_intro">Projects</div>
      </Slide>
      <Slide bottom cascade>
        <div className="project_intro1">Using JavaScript</div>
      </Slide>
      <Slide bottom cascade>
        <div className="project_intro2">And Python</div>
      </Slide>
      <div className="project_intro_sub">
        <div className="project_reveal">프로젝트에 대한 자세한 정보는</div>
        <div className="project_reveal">
          하단의 깃허브 아이콘을 눌러서 확인해주세요.
        </div>
        <div className="project_reveal">
          모바일과 태블릿은 영상을 터치하시면 이동합니다.
        </div>
      </div>
    </>
  );
};

export default Project;
