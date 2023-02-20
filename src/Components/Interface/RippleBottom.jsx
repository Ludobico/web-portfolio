import React, { useEffect, useState } from "react";
import "../../Static/RippleBottom.css";

const RippleBottom = () => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setScroll("scroll_active");
    } else {
      setScroll(null);
    }
  };
  return (
    <div className="rippleBottom_top_div" id={scroll}>
      <div className="ripple_scroll_div">
        <div className="ripple_scroll"></div>
      </div>
    </div>
  );
};

export default RippleBottom;
