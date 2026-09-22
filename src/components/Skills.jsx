import React, { useEffect, useRef } from "react";
import "./Skills.css";

import { createTechnoBackground } from "../backgrounds/techno.js";

const skillsData = {
  frontend: {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
      "Responsive Design",
      "UI Development",
    ],
  },

  backend: {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Full Stack",
      "Server Architecture",
      "Authentication",
    ],
  },

  tools: {
    title: "Tools & Libraries",
    skills: [
      "GitHub",
      "Three.js",
      "Data Visualization",
      "Postman API",
      "Responsive Design",
      "Web Development",
    ],
  },

  databases: {
    title: "Databases",
    skills: [
      "PostgreSQL",
      "SQL",
      "MongoDB",
      "Data Analysis",
      "Schema Design",
      "Query Optimization",
    ],
  },
};

export default function Skills() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const background = createTechnoBackground(
      backgroundRef.current
    );

    return () => {
      background?.dispose();
    };
  }, []);

  return (
    <div className="skills-section">

      {/* Three.js shader background */}
      <div
        ref={backgroundRef}
        className="skills-techno-background"
        aria-hidden="true"
      />

      <div className="container skills-content">
        <div className="section-header">
          <h2>Skills</h2>
          <p>Technologies and tools I work with</p>
        </div>

        <div className="skills-grid">
          {Object.values(skillsData).map(
            (category, idx) => (
              <div
                key={category.title}
                className="skill-box"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${
                    idx * 0.1
                  }s backwards`,
                }}
              >
                <div className="skill-box-header">
                  <span className="skill-icon">
                    {category.icon}
                  </span>

                  <h3>{category.title}</h3>
                </div>

                <div className="skill-box-content">
                  <ul className="skill-list">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="skill-item"
                      >
                        <span className="skill-dot"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="skill-box-accent"></div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}