import React from "react";
import "./Hero.css";
const Hero = () => {
    return (React.createElement("div", { className: "hero" },
        React.createElement("div", { className: "heroLeftPlaceholder" }),
        React.createElement("div", { className: "heroRightSide" },
            React.createElement("h1", { className: "heroHeading" }, "Sunny Software"),
            React.createElement("p", { className: "heroSubHeading" }, "Expert engineering from the sunny California Valley"),
            React.createElement("a", { href: "/get-started", className: "btn btn-primary" }, "Get Started Today!"))));
};
export default Hero;
