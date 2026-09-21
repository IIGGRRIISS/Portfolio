import React from 'react';
import './Navbar.css';

export default function Navbar({ scrollToSection, activeSection, theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO - LEFT */}
        <div className="navbar-logo" onClick={onToggleTheme}>
          <img 
src={`${import.meta.env.BASE_URL}${theme === 'dark' ? 'logo-dark.jpg' : 'logo-light.png'}`}
            alt="Theme Toggle"
            className="logo-img"
          />
        </div>

        {/* NAV LINKS - RIGHT */}
        <ul className="nav-links">
          <li>
            <a href="#home" onClick={() => scrollToSection('home')} 
               className={activeSection === 'home' ? 'active' : ''}>
              Home
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => scrollToSection('skills')} 
               className={activeSection === 'skills' ? 'active' : ''}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" onClick={() => scrollToSection('projects')} 
               className={activeSection === 'projects' ? 'active' : ''}>
              Projects
            </a>
          </li>
          <li>
            <a href="#blog" onClick={() => scrollToSection('blog')} 
               className={activeSection === 'blog' ? 'active' : ''}>
              Blog
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => scrollToSection('contact')} 
               className={activeSection === 'contact' ? 'active' : ''}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}