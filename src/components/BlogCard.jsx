import React from 'react';
import './BlogCard.css';

export default function BlogCard({ project, onOpenCaseStudy }) {
  return (
    <article className="blog-card">
      <div className="blog-header">
        <h3 className="blog-title">{project.title}</h3>
        <span className="blog-accent" style={{ backgroundColor: project.color }}></span>
      </div>

      <p className="blog-tagline">{project.tagline}</p>

      <p className="blog-excerpt">
        {project.caseStudy}
      </p>

      <div className="blog-tech">
        {project.tech.slice(0, 4).map((tech, idx) => (
          <span key={idx} className="blog-tech-tag">{tech}</span>
        ))}
        {project.tech.length > 4 && (
          <span className="blog-tech-tag">+{project.tech.length - 4}</span>
        )}
      </div>

      <div className="blog-footer">
        <button className="blog-read-more" onClick={() => onOpenCaseStudy(project.slug)}>
          Read Full Case Study →
        </button>
        <a 
          href={project.github}
          className="blog-github-link"
          target="_blank"
          rel="noopener noreferrer"
          title="View on GitHub"
        >
          GitHub
        </a>
      </div>
    </article>
  );
}
