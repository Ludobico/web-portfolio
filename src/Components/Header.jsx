import React from "react";
import "../Static/Header.css";
import { useNavigate } from "react-router";
import useZustand from "./Store/Zustand";

const Header = () => {
  const { skill_scroll } = useZustand();
  const depression2 = () => {
    document
      .getElementById({ skill_scroll })
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="header_top_div">
      <header>
        <div className="nav">
          <ul className="nav_list">
            <li>
              <a>
                <span>Top</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={depression2}>Skill</span>
              </a>
            </li>
            <li>
              <a>
                <span>Project</span>
              </a>
            </li>
            <li>
              <a>
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
