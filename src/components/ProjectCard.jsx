import React, { useState } from "react";
import "./ProjectCard.css";

export default function ProjectCard({ project, onOpenCaseStudy }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`project-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image">
        <div className="project-image-placeholder">
          <span>{project.title}</span>
        </div>

        <div className="project-overlay"></div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>

        <p className="project-tagline">{project.tagline}</p>

        <p className="project-description">{project.shortDesc}</p>

        <div className="project-tech">
          {project.tech.map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-links">
          <a
            href={project.github}
            className="project-link github"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <button
            className="project-link case-study"
            onClick={() => onOpenCaseStudy(project.slug)}
          >
            Case Study →
          </button>
        </div>
      </div>

      <div
        className="project-accent"
        style={{ borderColor: project.color }}
      ></div>
    </div>
  );
}