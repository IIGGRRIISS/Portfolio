import React, { useEffect, useRef } from "react";
import "./Skills.css";

import { createTechnoBackground } from "../backgrounds/techno.js";

const skillsData = {
  languages: {
    title: "Languages",
    skills: [
      "Python",
      "JavaScript (ES6+)",
      "TypeScript",
    ],
  },

  ai_ml: {
    title: "AI / ML & Data",
    skills: [
      "PyTorch",
      "Scikit-learn",
      "XGBoost",
      "Hugging Face Transformers",
      "Sentence Transformers",
      "MediaPipe",
      "SHAP",
      "Pandas",
      "NumPy",
    ],
  },

  backend: {
    title: "Backend & Databases",
    skills: [
      "FastAPI",
      "Flask",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "SQL",
      "Prisma",
    ],
  },

  frontend: {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Chart.js",
      "Three.js",
    ],
  },

  tools: {
    title: "Tools & Infrastructure",
    skills: [
      "Git",
      "GitHub",
      "Jupyter",
      "Hugging Face Hub",
      "Postman",
      "Vercel",
      "Render",
      "Docker",
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