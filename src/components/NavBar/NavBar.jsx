import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navBar">
      <ul>
        <li className="home">
          <Link to="/">
            <b>Sunny Software</b>
          </Link>
        </li>
        <li className="login">
          <Link to="/login">
            <b>Login Page</b>
          </Link>
        </li>
        <li className="contact">
          <Link to="/contact-us">
            <b>Contact Us</b>
          </Link>
        </li>
        <li className="getStarted">
          <Link to="/get-started">
            <b> Get Started</b>
          </Link>
        </li>
        <li className="clientPortal">
          <Link to="/portal">
            <b> Client Portal</b>
          </Link>
        </li>
        <li className="portal">
          <Link to="/work-portal">
            <b> Work Portal</b>
          </Link>
        </li>
        <li className="aboutUs">
          <Link to="/about-us">
            <b> About Us</b>
          </Link>
        </li>
        <li className="services">
          <Link to="/services">
            <b> Services</b>
          </Link>
        </li>
        <li className="portfolio">
          <Link to="/portfolio">
            <b> Portfolio</b>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
