import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light">
      <div className="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="/about-us">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link active" href="/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link active" href="/contact-us">
              Contact Us
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link active" href="/get-started">
              Get Started
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link active" href="/portal">
              Client Portal
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link active" href="/work-portal">
              Work Portal
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link active" href="/about-us">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link active" href="/services">
              Services
            </a>
          </li>
          <li className="nav-item">
            <a class="nav-link active" href="/portfolio">
              Portfolio
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
