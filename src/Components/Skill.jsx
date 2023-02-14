import React from "react";
import "../Static/Skill.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const Skill = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  useEffect(() => {
    const reveal = gsap.utils.toArray(".skill_text");
    reveal.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "active",
        start: "top 90%",
        end: "top 20%",
        markers: true,
      });
    });
    const skillre = gsap.utils.toArray(".item-text span");
    skillre.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "skillre",
        start: "top 90%",
        end: "top 20%",
        markers: true,
      });
    });

    const P90 = gsap.utils.toArray(".progress-bar.w-90");
    P90.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "P90",
        start: "top 90%",
        end: "bottom 20%",
        markers: true,
        scrub: true,
      });
    });
    const P85 = gsap.utils.toArray(".progress-bar.w-85");
    P85.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "P85",
        start: "top 90%",
        end: "bottom 20%",
        markers: true,
        scrub: true,
      });
    });
    const P70 = gsap.utils.toArray(".progress-bar.w-70");
    P70.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "P70",
        start: "top 90%",
        end: "bottom 20%",
        markers: true,
        scrub: true,
      });
    });
    const P60 = gsap.utils.toArray(".progress-bar.w-60");
    P60.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "P60",
        start: "top 90%",
        end: "bottom 20%",
        markers: true,
        scrub: true,
      });
    });
    const P55 = gsap.utils.toArray(".progress-bar.w-55");
    P55.forEach((text, i) => {
      ScrollTrigger.create({
        trigger: text,
        toggleClass: "P55",
        start: "top 90%",
        end: "bottom 20%",
        markers: true,
        scrub: true,
      });
    });
  }, []);

  return (
    <div className="Skill_top_div">
      <section className="skills container">
        <div className="title">
          <h2>Skills</h2>
          <div>
            <h2>My Skills</h2>
          </div>
        </div>
        <p className="skill_text">
          웹 개발과 AI개발에 필요한 언어를 공부중입니다.
        </p>
        <div className="row">
          <div className="item">
            <div className="item-text">
              <span>HTML5</span>
              <span className="w-90">90%</span>
            </div>
            <div className="progress">
              <div className="progress-bar w-90"></div>
            </div>
          </div>
          <div className="item">
            <div className="item-text">
              <span>CSS3</span>
              <span className="w-85">85%</span>
            </div>
            <div className="progress">
              <div className="progress-bar w-85"></div>
            </div>
          </div>
          <div className="item">
            <div className="item-text">
              <span>JavaScript</span>
              <span className="w-70">70%</span>
            </div>
            <div className="progress">
              <div className="progress-bar w-70"></div>
            </div>
          </div>
          <div className="item">
            <div className="item-text">
              <span>React</span>
              <span className="w-70">70%</span>
            </div>
            <div className="progress">
              <div className="progress-bar w-70"></div>
            </div>
          </div>
          <div className="item">
            <div className="item-text">
              <span>MySQL</span>
              <span className="w-60">60%</span>
            </div>
            <div className="progress">
              <div className="progress-bar w-60"></div>
            </div>
          </div>
          <div className="item">
            <div className="item-text">
              <span>Python</span>
              <span className="w-70">70%</span>
            </div>
            <div className="progress">
              <div className="progress-bar w-70"></div>
            </div>
          </div>
          <div className="item">
            <div className="item-text">
              <span>Pytorch</span>
              <span className="w-55">55%</span>
            </div>
            <div className="progress">
              <div className="progress-bar w-55"></div>
            </div>
          </div>
          <div className="item">
            <div className="item-text">
              <span>Three.JS</span>
              <span className="w-55">55%</span>
            </div>
            <div className="progress">
              <div className="progress-bar w-55"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skill;
