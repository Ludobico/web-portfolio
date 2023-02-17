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
  });
  return (
    <div className="projects_top_div">
      <div className="projects firstpro">
        <div className="projects_img">
          <video
            style={{ width: "960px", height: "540px" }}
            muted
            autoPlay
            loop
          >
            <source src={firstproject} />
          </video>
        </div>
        <div className="projects_box">
          <div className="projects_desc">GreenTouch</div>
          <br />
          <div className="projects_desc">2022.08</div>
          <br />
          <div className="projects_desc">인공지능사관학교 첫번째 프로젝트</div>
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
        <div className="projects_img">
          <video
            style={{ width: "960px", height: "540px" }}
            muted
            autoPlay
            loop
          >
            <source src={secondproject} />
          </video>
        </div>
        <div className="projects_box">
          <div className="projects_desc">SoloFitness</div>
          <br />
          <div className="projects_desc">2022.12</div>
          <br />
          <div className="projects_desc">인공지능사관학교 두번째 프로젝트</div>
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
        <div className="projects_img">
          <img
            src={low_t_project}
            style={{ width: "960px", height: "540px" }}
          />
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
        </div>
      </div>
    </div>
  );
};

export default Projects;
