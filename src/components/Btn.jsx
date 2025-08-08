import React from "react";
import { CiStar } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./WrapButton.css"; // Ensure you have the CSS file for styling

export const WrapButton = ({ className = "", children, href, onClick  }) => {
  const content = (
    <div className={`wrap-button ${className}`} onClick={onClick}>
      <div className={href ? "button-inner" : "button-inner orange"}>
        {!href && <CiStar className="globe" />}
        <p className="button-text">
          {children ? children : "Try Now"}
        </p>
      </div>
      <div className="arrow-container">
        <FaLongArrowAltRight size={18} className="arrow-icon" />
      </div>
    </div>
  );

  return <div className="wrap-button-wrapper">{href ? <a href={href}>{content}</a> : content}</div>;
};
