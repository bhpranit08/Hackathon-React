import React from "react";
import verticalLogo from "../assets/verticalLogo.png";
const Hero = () => {
  return (
    <div className="content-section centered-flex blur-in">
      <div className="card centered-flex fade-down-in s1">
        <h1>Mangsir 21-22</h1>
        <img src={verticalLogo} className="hero-img" alt="" />
        <button className="btn-alt">Apply Now!</button>
      </div>
    </div>
  );
};
export default Hero;
