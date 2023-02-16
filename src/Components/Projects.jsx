import React, { useEffect, useRef } from "react";
import "../Static/Projects.css";
import firstproject from "../Static/video/F_Project.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  });
  return (
    <div className="projects_top_div">
      <div className="projects firstpro">
        <div className="projects_img">
          <video
            src={firstproject}
            style={{ width: "960px", height: "540px" }}
            autoPlay={true}
            muted={true}
          />
        </div>
        <div className="projects_box">
          <div className="projects_desc">GreenTouch</div>
          <br />
          <div className="projects_desc">2022.08</div>
          <br />
          <div className="projects_desc">인공지능사관학교 첫번째 프로젝트</div>
        </div>
        <div>asdasd</div>
      </div>
    </div>
  );
};

export default Projects;
