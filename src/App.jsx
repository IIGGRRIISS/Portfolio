import React, { useState, useEffect } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import Contact from "./components/Contact";

import GridX from "./components/GridX";
import Signify from "./components/Signify";
import BlogCaseStudy from "./components/BlogCaseStudy";

import { projects } from "./data/projects";

import ScrollToTop from "./components/Scrolltotop";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("portfolio-theme") || "dark"
  );

  const [projectSlug, setProjectSlug] = useState(() => {
    const pathParts = window.location.pathname
      .split("/")
      .filter(Boolean);

    return pathParts[0] === "projects"
      ? pathParts[pathParts.length - 1] || ""
      : "";
  });

  /*
   * Keep project pages working with browser
   * back / forward buttons.
   */
  useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname
        .split("/")
        .filter(Boolean);

      const lastPart =
        pathParts[pathParts.length - 1] || "";

      setProjectSlug(
        pathParts[0] === "projects"
          ? lastPart
          : ""
      );
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  /*
   * Apply and persist theme.
   */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(
      "portfolio-theme",
      theme
    );
  }, [theme]);

  /*
   * Find selected project.
   */
  const selectedProject = projects.find(
    (project) =>
      project.slug === projectSlug &&
      project.published !== false
  );

  /*
   * Open project case study.
   */
  const openCaseStudy = (slug) => {
    window.history.pushState(
      {},
      "",
      `/projects/${slug}`
    );

    setProjectSlug(slug);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  /*
   * Return to main portfolio.
   */
  const closeCaseStudy = () => {
    window.location.href = "/#projects";
  };

  /*
   * Main section navigation.
   */
  const scrollToSection = (sectionId) => {
    if (projectSlug) {
      window.location.href = `/#${sectionId}`;
      return;
    }

    setActiveSection(sectionId);

    const element =
      document.getElementById(sectionId);

    element?.scrollIntoView({
      behavior: "smooth"
    });
  };

  /*
   * Dedicated project case-study pages.
   */
  const renderProjectCaseStudy = () => {
    if (!selectedProject) {
      return null;
    }

    switch (selectedProject.slug) {
      case "grid-x":
        return (
          <GridX
            onBack={closeCaseStudy}
          />
        );

      case "signify":
        return (
          <Signify
            onBack={closeCaseStudy}
          />
        );

      case "blog-app":
        return (
          <BlogCaseStudy
            onBack={closeCaseStudy}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">

      <Navbar
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === "dark"
              ? "light"
              : "dark"
          )
        }
      />

      {selectedProject ? (

        /*
         * Dedicated project case-study page
         */

        renderProjectCaseStudy()

      ) : (

        /*
         * Main portfolio
         */

        <>
          <main className="main-content">

            <section id="home">
              <Hero
                scrollToSection={scrollToSection}
              />
            </section>

            <section id="skills">
              <Skills />
            </section>

            <section id="projects">
              <Projects
                onOpenCaseStudy={
                  openCaseStudy
                }
              />
            </section>

            <section id="blog">
              <Blog
                onOpenCaseStudy={
                  openCaseStudy
                }
              />
            </section>

            <section id="contact">
              <Contact />
            </section>

          </main>

          <footer className="footer">
            <div className="container">
              <p>
                &copy; 2026 IGRIS. React 💙❤️
              </p>
            </div>
          </footer>

          <ScrollToTop />
        </>
      )}

    </div>
  );
}