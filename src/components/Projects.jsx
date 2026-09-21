

import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectSkeleton from './Skeleton/ProjectSkeleton';
import './Projects.css';

export default function Projects({ onOpenCaseStudy }) {
  const { loading, items } = useFetch(projects, 1000);

  return (
    <div className="projects">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>A showcase of work I'm proud of. Bold design, solid code, real impact.</p>
        </div>

        <div className="projects-grid">
          {loading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            items?.filter((project) => project.published !== false).map((project, idx) => (
              <div 
                key={project.id}
                className="project-item"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s backwards`
                }}
              >
              <ProjectCard project={project} onOpenCaseStudy={onOpenCaseStudy} />
              </div>
            ))
          )}
        </div>

        <div className="projects-cta">
          <p>Want to see more? Check out my GitHub.</p>
          <a 
            href="https://github.com/IIGGRRIISS" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View All Projects
          </a>
        </div>
      </div>
    </div>
  );
}
