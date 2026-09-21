import React from "react";
import "./Hero.css";

import profileImage from "../assets/Ibrahim.jpeg";

export default function Hero({ scrollToSection }) {
  return (
    <div className="hero">
      <div className="container hero-container">

        <div className="hero-content">

          <p className="hero-eyebrow">
            FULL STACK DEVELOPER
          </p>

          <h1 className="hero-title">
            <span className="hero-greeting">
              Hello, I’m
            </span>

            <span className="hero-name">
              <span>SYED IBRAHIM</span>
              <span>ALI</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            I build practical, user-focused web applications—from
            interactive learning tools to data-rich dashboards—using
            React, Node.js, PostgreSQL, and AI/ML workflows.
          </p>

          <p className="hero-context">
            B.E. in Artificial Intelligence &amp; Machine Learning
          </p>

          <div className="hero-cta">

            <button
              className="btn"
              type="button"
              onClick={() => scrollToSection("projects")}
            >
              Explore Projects
            </button>

            <button
              className="btn btn-outline"
              type="button"
              onClick={() => scrollToSection("contact")}
            >
              Get in Touch
            </button>

          </div>

        </div>

        <div className="hero-profile">

          <div className="hero-profile-glow"></div>

          <div className="hero-profile-frame">
            <img
              src={profileImage}
              alt="Syed Ibrahim Ali"
              className="hero-profile-image"
            />
          </div>

          <div className="hero-profile-accent"></div>

        </div>

      </div>
    </div>
  );
}