import React, { useEffect, useRef } from "react";
import "../Static/Projects.css";
import firstproject from "../Static/video/F_Project.mp4";
import secondproject from "../Static/video/S_Project.mp4";
import low_t_project from "../Static/gif/low_t_project.gif";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fade from "react-reveal/Fade";
import github from "../Static/img/github.png";
import react from "../Static/img/react.png";
import nodejs from "../Static/img/nodejs.png";
import mysql from "../Static/img/mysql.png";
import python from "../Static/img/python.png";
import mediapipe from "../Static/img/mediapipe.png";
import pytorch from "../Static/img/pytorch_logo.png";
import fastapi from "../Static/img/fastapi.png";
import three from "../Static/img/three.png";
import gsapImg from "../Static/img/gsap.png";
import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { neonCursor } from "threejs-toys";
import Contact from "./Contact";

const Projects = () => {
  useEffect(() => {
    const reveal = gsap.utils.toArray(".projects_desc");
    reveal.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "active",
        start: "top 90%",
        end: "bottom - 10%",
      });
    });

    const boxHeight = gsap.utils.toArray(".projects_box");
    boxHeight.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "boxActive",
        start: "top 80%",
        end: "bottom - 10%",
        scrub: true,
      });
    });
    const quaryDesc = gsap.utils.toArray(".query_desc");
    quaryDesc.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "query_desc_active",
        start: "top 90%",
        end: "bottom - 10%",
      });
    });

    neonCursor({
      el: document.getElementById("neonC"),
      shaderPoints: 16,
      curvePoints: 10,
      curveLerp: 0.5,
      radius1: 5,
      radius2: 5,
      velocityTreshold: 14,
      sleepRadiusX: 100,
      sleepRadiusY: 100,
      sleepTimeCoefX: 0.0025,
      sleepTimeCoefY: 0.0025,
    });
  });
  return (
    <>
      <div className="projects_top_div" id="neonC">
        <div className="projects firstpro">
          <div className="query_desc">GreenTouch 2022.08</div>
          <div className="projects_img">
            <video muted autoPlay loop>
              <source src={firstproject} />
            </video>
          </div>
          <div className="projects_box">
            <div className="projects_desc">GreenTouch</div>
            <br />
            <div className="projects_desc">2022.08</div>
            <br />
            <div className="projects_desc">
              인공지능사관학교 첫번째 프로젝트
            </div>
            <img className="github" src={github}></img>
          </div>
          <div className="useSkill">
            <Fade bottom delay={500}>
              <img className="useSkillIcon" src={react} />
            </Fade>
            <Fade bottom delay={1000}>
              <img className="useSkillIcon" src={nodejs} />
            </Fade>
            <Fade bottom delay={1500}>
              <img className="useSkillIcon" src={mysql} />
            </Fade>
          </div>
        </div>
        <div className="projects">
          <div className="query_desc">SoloFitness 2022.12</div>
          <div className="projects_img">
            <video muted autoPlay loop>
              <source src={secondproject} />
            </video>
            <div className="projects_box">
              <div className="projects_desc">SoloFitness</div>
              <br />
              <div className="projects_desc">2022.12</div>
              <br />
              <div className="projects_desc">
                인공지능사관학교 두번째 프로젝트
              </div>
              <img className="github" src={github}></img>
            </div>
          </div>
          <div className="useSkill">
            <Fade bottom delay={500}>
              <img className="useSkillIcon" src={react} />
            </Fade>
            <Fade bottom delay={1000}>
              <img className="useSkillIcon" src={nodejs} />
            </Fade>
            <Fade bottom delay={1500}>
              <img className="useSkillIcon" src={mysql} />
            </Fade>
            <Fade bottom delay={2000}>
              <img className="useSkillIcon" src={python} />
            </Fade>
            <Fade bottom delay={2500}>
              <img className="useSkillIcon" src={fastapi} />
            </Fade>
            <Fade bottom delay={3000}>
              <img className="useSkillIcon" src={mediapipe} />
            </Fade>
            <Fade bottom delay={3500}>
              <img className="useSkillIcon" src={pytorch} />
            </Fade>
          </div>
        </div>
        <div className="projects T_project">
          <div className="query_desc">Project-Rebecca 2023.01</div>
          <div className="projects_img">
            <img src={low_t_project} />
          </div>
          <div className="projects_box">
            <div className="projects_desc">Project-Rebecca</div>
            <br />
            <div className="projects_desc">2023.01</div>
            <br />
            <div className="projects_desc">Three.js 토이 프로젝트</div>
            <br />
            <img className="github" src={github}></img>
          </div>
          <div className="useSkill">
            <Fade bottom delay={500}>
              <img className="useSkillIcon" src={react} />
            </Fade>
            <Fade bottom delay={1000}>
              <img className="useSkillIcon" src={three} />
            </Fade>
            <Fade bottom delay={1500}>
              <img className="useSkillIcon" src={gsapImg} />
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
