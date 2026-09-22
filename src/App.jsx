import React, { useState, useEffect } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import GridX from "./components/GridX";
import Signify from "./components/Signify";
import BlogCaseStudy from "./components/BlogCaseStudy";
import { projects } from "./data/projects";
import ScrollToTop from "./components/Scrolltotop";

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

const getProjectSlug = () => {
  const path = window.location.pathname;
  const prefix = `${BASE_PATH}/projects/`;

  if (path.startsWith(prefix)) {
    return path.slice(prefix.length).split("/")[0] || "";
  }

  return "";
};

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("portfolio-theme") || "dark"
  );

  const [projectSlug, setProjectSlug] = useState(getProjectSlug);

  /*
   * Keep project pages working with browser
   * back / forward buttons.
   */
  useEffect(() => {
    const handlePopState = () => {
      setProjectSlug(getProjectSlug());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /*
   * Automatically mark Projects as active
   * while viewing a project case study.
   */
  useEffect(() => {
    if (projectSlug) {
      setActiveSection("projects");
    }
  }, [projectSlug]);

  /*
   * Automatically detect which main section
   * is currently visible on the homepage.
   */
  useEffect(() => {
    if (projectSlug) {
      return;
    }

    const sections = ["home", "skills", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [projectSlug]);

  /*
   * Apply and persist theme.
   */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem("portfolio-theme", theme);
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
      `${BASE_PATH}/projects/${slug}`
    );

    setProjectSlug(slug);
    setActiveSection("projects");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * Return to main portfolio.
   */
  const closeCaseStudy = () => {
    window.location.href = `${BASE_PATH}/#projects`;
  };

  /*
   * Main section navigation.
   */
  const scrollToSection = (sectionId) => {
    if (projectSlug) {
      window.location.href = `${BASE_PATH}/#${sectionId}`;
      return;
    }

    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
        return <GridX onBack={closeCaseStudy} />;

      case "signify":
        return <Signify onBack={closeCaseStudy} />;

      case "blog-app":
        return <BlogCaseStudy onBack={closeCaseStudy} />;

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
            currentTheme === "dark" ? "light" : "dark"
          )
        }
      />

      {selectedProject ? (
        renderProjectCaseStudy()
      ) : (
        <>
          <main className="main-content">
            <section id="home">
              <Hero scrollToSection={scrollToSection} />
            </section>

            <section id="skills">
              <Skills />
            </section>

            <section id="projects">
              <Projects onOpenCaseStudy={openCaseStudy} />
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