import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heroLeftPlaceholder"></div>
      <div className="heroRightSide">
        <h1 className="heroHeading">Sunny Software</h1>
        <p className="heroSubHeading">
          Expert engineering from the sunny California Valley
        </p>
        <a href="/get-started" className="btn btn-primary">
          Get Started Today!
        </a>
      </div>
    </div>
  );
};

export default Hero;
