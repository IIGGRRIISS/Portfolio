import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { projects } from '../data/projects';
import BlogCard from './BlogCard';
import ProjectSkeleton from './Skeleton/ProjectSkeleton';
import './Blog.css';

export default function Blog({ onOpenCaseStudy }) {
  const { loading, items } = useFetch(projects, 1200);

  return (
    <div className="blog">
      <div className="container">
        <div className="section-header">
          <h2>Project Case Studies</h2>
          <p>Deep dives into the tech, challenges, and lessons learned from building real products.</p>
        </div>

        <div className="blog-grid">
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
                className="blog-item"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s backwards`
                }}
              >
              <BlogCard project={project} onOpenCaseStudy={onOpenCaseStudy} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
