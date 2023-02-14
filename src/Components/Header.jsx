import React from "react";
import "../Static/Header.css";
import { useNavigate } from "react-router";

const Header = () => {
  const navigator = useNavigate();

  const toTop = () => {
    navigator("/");
  };
  const toContact = () => {
    navigator("/contact");
  };
  const toInfo = () => {
    navigator("/info");
  };
  return (
    <div className="header_top_div">
      <header>
        <div className="nav">
          <ul className="nav_list">
            <li>
              <a>
                <span onClick={toTop}>Top</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={toInfo}>Skill</span>
              </a>
            </li>
            <li>
              <a>
                <span>Project</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={toContact}>Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
