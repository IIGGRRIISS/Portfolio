import React from "react";
import "./Navbar.css";

export default function Navbar({
  scrollToSection,
  activeSection,
  theme,
  onToggleTheme,
}) {
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO - LEFT */}
        <div
          className="navbar-logo"
          onClick={onToggleTheme}
        >
          <img
            src={`${import.meta.env.BASE_URL}${
              theme === "dark"
                ? "logo-dark.jpg"
                : "logo-light.png"
            }`}
            alt="Theme Toggle"
            className="logo-img"
          />
        </div>

        {/* NAV LINKS - RIGHT */}
        <ul className="nav-links">

          <li>
            <a
              href="#home"
              onClick={(e) =>
                handleNavigation(e, "home")
              }
              className={
                activeSection === "home"
                  ? "active"
                  : ""
              }
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#skills"
              onClick={(e) =>
                handleNavigation(e, "skills")
              }
              className={
                activeSection === "skills"
                  ? "active"
                  : ""
              }
            >
              Skills
            </a>
          </li>

          <li>
            <a
              href="#projects"
              onClick={(e) =>
                handleNavigation(e, "projects")
              }
              className={
                activeSection === "projects"
                  ? "active"
                  : ""
              }
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#contact"
              onClick={(e) =>
                handleNavigation(e, "contact")
              }
              className={
                activeSection === "contact"
                  ? "active"
                  : ""
              }
            >
              Contact
            </a>
          </li>

        </ul>
      </div>
    </nav>
  );
}