import React, { useEffect, useRef } from "react";
import "./BlogCaseStudy.css";
import { createBlogCaseStudyBackground } from "../backgrounds/BlogCaseStudy.js";

export default function BlogCaseStudy() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const background = createBlogCaseStudyBackground(backgroundRef.current);

    return () => {
      background?.dispose();
    };
  }, []);

  const backToProjects = () => {
    window.location.href = "/#projects";
  };

  return (
    <main className="blogcase-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="blogcase-hero">
        <div
          ref={backgroundRef}
          className="blogcase-hero-background"
          aria-hidden="true"
        />

        <div className="blogcase-container">

          <a
            href="/#projects"
            className="blogcase-back"
          >
            ← Back to Projects
          </a>

          <div className="blogcase-hero-content">

            <p className="blogcase-eyebrow">
              CASE STUDY <span>·</span> FULL-STACK / NODE.JS / EJS
            </p>

            <h1>
              BLOG<span>.</span>
            </h1>

            <p className="blogcase-hero-title">
              Dynamic Server-Side Rendered Blog Platform
            </p>

            <p className="blogcase-hero-description">
              A simple full-stack blog application built with Node.js,
              Express.js, and EJS, created to practice routing, CRUD
              operations, server-side rendering, and backend development.
            </p>

            <div className="blogcase-hero-actions">

              <a
                href="https://github.com/IIGGRRIISS/Blog"
                target="_blank"
                rel="noopener noreferrer"
                className="blogcase-primary-btn"
              >
                View on GitHub ↗
              </a>

              <span className="blogcase-project-type">
                Personal Project
              </span>

            </div>

          </div>
        </div>
      </section>


      {/* =========================
          OVERVIEW
      ========================= */}

      <section className="blogcase-section blogcase-overview">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>01</span>

            <div>
              <p>PROJECT OVERVIEW</p>

              <h2>
                A focused project for learning the fundamentals of backend web development.
              </h2>
            </div>

          </div>

          <div className="blogcase-overview-grid">

            <div className="blogcase-overview-text">

              <p>
                The Blog Website is a dynamic web application built with
                Node.js, Express.js, and EJS. It allows users to create,
                publish, view, edit, and delete blog posts through a simple
                server-rendered interface.
              </p>

              <p>
                Unlike a static website, the application uses Express.js
                routing and EJS templates to generate pages dynamically on
                the server.
              </p>

              <p>
                I built this project as part of my full-stack web development
                learning journey, with the main goal of becoming more
                comfortable with backend routing, CRUD operations, and
                server-side rendering.
              </p>

            </div>

            <div className="blogcase-facts">

              <div className="blogcase-fact">
                <strong>CRUD</strong>
                <span>Blog post operations</span>
              </div>

              <div className="blogcase-fact">
                <strong>EJS</strong>
                <span>Server-side rendering</span>
              </div>

              <div className="blogcase-fact">
                <strong>Express</strong>
                <span>Backend routing</span>
              </div>

              <div className="blogcase-fact">
                <strong>100%</strong>
                <span>Personal project</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          PURPOSE
      ========================= */}

      <section className="blogcase-section blogcase-purpose">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>02</span>

            <div>
              <p>THE PURPOSE</p>

              <h2>
                Learning by building something that actually works.
              </h2>
            </div>

          </div>

          <div className="blogcase-purpose-content">

            <p className="blogcase-large-text">
              The goal wasn't to build a huge blogging platform.
              It was to understand how the pieces of a backend application
              fit together.
            </p>

            <p>
              This project gave me practical experience working with
              Express.js routes, handling requests and responses, rendering
              dynamic content through EJS templates, and implementing the
              basic operations required by a CRUD application.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================= */}

      <section className="blogcase-section blogcase-features">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>03</span>

            <div>
              <p>CORE FEATURES</p>

              <h2>
                Everything needed for a simple dynamic blog.
              </h2>
            </div>

          </div>

          <div className="blogcase-feature-grid">

            <article className="blogcase-feature">

              <span className="blogcase-feature-number">
                01
              </span>

              <h3>Create Posts</h3>

              <p>
                Create and publish new blog posts through the application.
              </p>

            </article>


            <article className="blogcase-feature">

              <span className="blogcase-feature-number">
                02
              </span>

              <h3>View Posts</h3>

              <p>
                View individual blog posts through dynamically rendered
                pages.
              </p>

            </article>


            <article className="blogcase-feature">

              <span className="blogcase-feature-number">
                03
              </span>

              <h3>Edit Posts</h3>

              <p>
                Existing blog posts can be updated when their content needs
                to be changed.
              </p>

            </article>


            <article className="blogcase-feature">

              <span className="blogcase-feature-number">
                04
              </span>

              <h3>Delete Posts</h3>

              <p>
                Posts can be removed through the application's delete
                operation.
              </p>

            </article>


            <article className="blogcase-feature">

              <span className="blogcase-feature-number">
                05
              </span>

              <h3>Dynamic Rendering</h3>

              <p>
                EJS templates generate pages dynamically on the server based
                on application data.
              </p>

            </article>


            <article className="blogcase-feature">

              <span className="blogcase-feature-number">
                06
              </span>

              <h3>Responsive Styling</h3>

              <p>
                The interface uses simple responsive styling to keep the
                application usable across different screen sizes.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =========================
          CRUD
      ========================= */}

      <section className="blogcase-section blogcase-crud">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>04</span>

            <div>
              <p>CRUD OPERATIONS</p>

              <h2>
                The four basic operations behind the blog.
              </h2>
            </div>

          </div>

          <div className="blogcase-crud-grid">

            <article className="blogcase-crud-card">

              <div className="blogcase-crud-number">
                C
              </div>

              <div>
                <h3>Create</h3>

                <p>
                  A new blog post is submitted and added to the application.
                </p>
              </div>

            </article>


            <article className="blogcase-crud-card">

              <div className="blogcase-crud-number">
                R
              </div>

              <div>
                <h3>Read</h3>

                <p>
                  Blog content can be displayed through dynamically rendered
                  pages.
                </p>
              </div>

            </article>


            <article className="blogcase-crud-card">

              <div className="blogcase-crud-number">
                U
              </div>

              <div>
                <h3>Update</h3>

                <p>
                  Existing posts can be edited and their content updated.
                </p>
              </div>

            </article>


            <article className="blogcase-crud-card">

              <div className="blogcase-crud-number">
                D
              </div>

              <div>
                <h3>Delete</h3>

                <p>
                  Existing posts can be removed from the application.
                </p>
              </div>

            </article>

          </div>

        </div>

      </section>


      {/* =========================
          SERVER SIDE RENDERING
      ========================= */}

      <section className="blogcase-section blogcase-rendering">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>05</span>

            <div>
              <p>SERVER-SIDE RENDERING</p>

              <h2>
                EJS connects the backend with the interface.
              </h2>
            </div>

          </div>

          <div className="blogcase-rendering-grid">

            <div className="blogcase-rendering-copy">

              <p className="blogcase-large-text">
                Instead of building the interface entirely on the client,
                the application renders pages on the server.
              </p>

              <p>
                Express.js handles the application routes while EJS templates
                are used to generate HTML using the data available to the
                application.
              </p>

              <p>
                This project helped me understand the relationship between
                backend routes, application data, templates, and the final
                HTML delivered to the browser.
              </p>

            </div>


            <div className="blogcase-flow">

              <div className="blogcase-flow-step">

                <span>01</span>

                <strong>Browser Request</strong>

                <small>
                  User requests a page or performs an action.
                </small>

              </div>


              <div className="blogcase-flow-line" />


              <div className="blogcase-flow-step">

                <span>02</span>

                <strong>Express.js</strong>

                <small>
                  The appropriate server route handles the request.
                </small>

              </div>


              <div className="blogcase-flow-line" />


              <div className="blogcase-flow-step">

                <span>03</span>

                <strong>EJS Template</strong>

                <small>
                  Dynamic content is inserted into the template.
                </small>

              </div>


              <div className="blogcase-flow-line" />


              <div className="blogcase-flow-step">

                <span>04</span>

                <strong>Rendered HTML</strong>

                <small>
                  The server sends the generated page to the browser.
                </small>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          APPLICATION FLOW
      ========================= */}

      <section className="blogcase-section blogcase-flow-section">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>06</span>

            <div>
              <p>APPLICATION FLOW</p>

              <h2>
                From a request to a rendered blog page.
              </h2>
            </div>

          </div>


          <div className="blogcase-architecture">

            <div className="blogcase-architecture-card">

              <span>01</span>

              <h3>Client</h3>

              <p>
                A user interacts with the blog through the browser.
              </p>

            </div>


            <div className="blogcase-architecture-arrow">
              →
            </div>


            <div className="blogcase-architecture-card">

              <span>02</span>

              <h3>Express.js</h3>

              <p>
                The server receives the request and determines the route
                that should handle it.
              </p>

            </div>


            <div className="blogcase-architecture-arrow">
              →
            </div>


            <div className="blogcase-architecture-card">

              <span>03</span>

              <h3>Application Logic</h3>

              <p>
                The requested blog operation is processed by the application.
              </p>

            </div>


            <div className="blogcase-architecture-arrow">
              →
            </div>


            <div className="blogcase-architecture-card">

              <span>04</span>

              <h3>EJS</h3>

              <p>
                The appropriate template is rendered with the required
                content.
              </p>

            </div>


            <div className="blogcase-architecture-arrow">
              →
            </div>


            <div className="blogcase-architecture-card">

              <span>05</span>

              <h3>Browser</h3>

              <p>
                The rendered HTML is returned and displayed to the user.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          TECHNOLOGY
      ========================= */}

      <section className="blogcase-section blogcase-technology">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>07</span>

            <div>
              <p>TECHNOLOGY</p>

              <h2>
                The stack behind the application.
              </h2>
            </div>

          </div>


          <div className="blogcase-tech-list">

            <span>Node.js</span>
            <span>Express.js</span>
            <span>EJS</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>

          </div>

        </div>

      </section>


      {/* =========================
          WHAT I LEARNED
      ========================= */}

      <section className="blogcase-section blogcase-learning">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>08</span>

            <div>
              <p>WHAT I LEARNED</p>

              <h2>
                A small project with a useful backend foundation.
              </h2>
            </div>

          </div>


          <div className="blogcase-learning-grid">

            <article>

              <span>01</span>

              <h3>Express Routing</h3>

              <p>
                Practiced structuring routes and handling requests through
                Express.js.
              </p>

            </article>


            <article>

              <span>02</span>

              <h3>CRUD</h3>

              <p>
                Worked through the complete create, read, update, and delete
                lifecycle of application content.
              </p>

            </article>


            <article>

              <span>03</span>

              <h3>EJS</h3>

              <p>
                Learned how server-side templates can dynamically generate
                HTML pages.
              </p>

            </article>


            <article>

              <span>04</span>

              <h3>Backend Thinking</h3>

              <p>
                Built a better understanding of how browser requests,
                server logic, templates, and responses connect together.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =========================
          SETUP
      ========================= */}

      <section className="blogcase-section blogcase-setup">

        <div className="blogcase-container">

          <div className="blogcase-section-header">

            <span>09</span>

            <div>
              <p>RUNNING THE PROJECT</p>

              <h2>
                Simple setup from the repository.
              </h2>
            </div>

          </div>


          <div className="blogcase-setup-grid">

            <div className="blogcase-setup-copy">

              <p>
                The project can be run locally by cloning the repository,
                installing its dependencies, and starting the Node.js server.
              </p>

              <a
                href="https://github.com/IIGGRRIISS/Blog"
                target="_blank"
                rel="noopener noreferrer"
                className="blogcase-github-btn"
              >
                Open Repository ↗
              </a>

            </div>


            <div className="blogcase-code">

              <div className="blogcase-code-line">
                <span>01</span>
                <code>
                  git clone https://github.com/IIGGRRIISS/Blog.git
                </code>
              </div>

              <div className="blogcase-code-line">
                <span>02</span>
                <code>
                  cd Blog
                </code>
              </div>

              <div className="blogcase-code-line">
                <span>03</span>
                <code>
                  npm install
                </code>
              </div>

              <div className="blogcase-code-line">
                <span>04</span>
                <code>
                  node index.js
                </code>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <section className="blogcase-footer">

        <div className="blogcase-container">

          <div className="blogcase-footer-content">

            <div>

              <p>BLOG APP</p>

              <h2>
                Simple project.
                <br />
                Solid foundation.
              </h2>

            </div>


            <div className="blogcase-footer-actions">

              <a
                href="https://github.com/IIGGRRIISS/Blog"
                target="_blank"
                rel="noopener noreferrer"
                className="blogcase-primary-btn"
              >
                View GitHub ↗
              </a>

              <button
                type="button"
                className="blogcase-secondary-btn"
                onClick={backToProjects}
              >
                ← Back to Projects
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}