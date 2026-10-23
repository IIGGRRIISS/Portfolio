import React, { useEffect, useRef } from "react";
import "./Marketplace.css";
import { createMarketplaceBackground } from "../backgrounds/Marketplace.js";

export default function Marketplace() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const background = createMarketplaceBackground(backgroundRef.current);

    return () => {
      background?.dispose();
    };
  }, []);

  const backToProjects = () => {
    window.location.href = "/#projects";
  };

  return (
    <main className="marketplace-page">
      {/* HERO */}
      <section className="marketplace-hero">
        {/* ADDED THE BACKGROUND HERE */}
        <div
          ref={backgroundRef}
          className="marketplace-hero-background"
          aria-hidden="true"
        />

        <div className="marketplace-container">
          <a href="/#projects" className="marketplace-back">
            ← Back to Projects
          </a>

          <div className="marketplace-hero-content">
            <p className="marketplace-eyebrow">
              CASE STUDY <span>·</span> FULL-STACK / TYPESCRIPT / NEXT.JS
            </p>

            <h1>
              MKT<span>.</span>
            </h1>

            <p className="marketplace-hero-title">
              Multi-Vendor E-Commerce Marketplace
            </p>

            <p className="marketplace-hero-description">
              A full-stack e-commerce marketplace where users can buy and sell products. 
              Built as a monorepo with a Next.js frontend and an Express + Prisma backend.
            </p>

            <div className="marketplace-hero-actions">
              <a
                href="https://marketplace-web-nu-murex.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="marketplace-primary-btn"
              >
                View Live Demo ↗
              </a>

              <span className="marketplace-project-type">
                Personal Project
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="marketplace-section marketplace-overview">
        <div className="marketplace-container">
          <div className="marketplace-section-header">
            <span>01</span>
            <div>
              <p>PROJECT OVERVIEW</p>
              <h2>
                A complete monorepo ecosystem for modern e-commerce.
              </h2>
            </div>
          </div>

          <div className="marketplace-overview-grid">
            <div className="marketplace-overview-text">
              <p>
                The Marketplace is a dynamic web application built with
                Next.js, Express, Prisma, and PostgreSQL. It allows users to
                sign up as Buyers or Sellers, manage products, add items to a
                cart, and complete an atomic checkout process.
              </p>

              <p>
                Unlike a simple storefront, this application handles complex
                relational data and role-based access control, ensuring that
                sellers can only manage their own inventory while buyers can
                browse the full catalog.
              </p>

              <p>
                I built this project to master full-stack TypeScript
                development, modern deployment workflows (Vercel + Render +
                Neon), and database transactions.
              </p>
            </div>

            <div className="marketplace-facts">
              <div className="marketplace-fact">
                <strong>JWT</strong>
                <span>Role-based Auth</span>
              </div>

              <div className="marketplace-fact">
                <strong>Prisma</strong>
                <span>Type-safe ORM</span>
              </div>

              <div className="marketplace-fact">
                <strong>Next.js</strong>
                <span>App Router Frontend</span>
              </div>

              <div className="marketplace-fact">
                <strong>Neon</strong>
                <span>Serverless Postgres</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section className="marketplace-section marketplace-purpose">
        <div className="marketplace-container">
          <div className="marketplace-section-header">
            <span>02</span>
            <div>
              <p>THE PURPOSE</p>
              <h2>
                Bridging the gap between buyers and sellers securely.
              </h2>
            </div>
          </div>

          <div className="marketplace-purpose-content">
            <p className="marketplace-large-text">
              The goal was to build a scalable, production-ready platform
              that handles real-world e-commerce complexities.
            </p>

            <p>
              This project gave me practical experience working with
              monorepo architectures, handling atomic database transactions
              (like checkout), implementing JWT authentication with distinct
              user roles, and deploying a decoupled frontend and backend to
              modern cloud platforms.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="marketplace-section marketplace-features">
        <div className="marketplace-container">
          <div className="marketplace-section-header">
            <span>03</span>
            <div>
              <p>CORE FEATURES</p>
              <h2>
                Everything needed for a seamless marketplace.
              </h2>
            </div>
          </div>

          <div className="marketplace-feature-grid">
            <article className="marketplace-feature">
              <span className="marketplace-feature-number">01</span>
              <h3>Authentication</h3>
              <p>
                Secure JWT-based signup and login with distinct Buyer and Seller roles.
              </p>
            </article>

            <article className="marketplace-feature">
              <span className="marketplace-feature-number">02</span>
              <h3>Seller Dashboard</h3>
              <p>
                Sellers can list new products, edit existing ones, and manage their storefronts.
              </p>
            </article>

            <article className="marketplace-feature">
              <span className="marketplace-feature-number">03</span>
              <h3>Product Catalog</h3>
              <p>
                Browse a responsive catalog with product variants and dynamic pricing.
              </p>
            </article>

            <article className="marketplace-feature">
              <span className="marketplace-feature-number">04</span>
              <h3>Shopping Cart</h3>
              <p>
                Add items, update quantities, and manage cart contents smoothly.
              </p>
            </article>

            <article className="marketplace-feature">
              <span className="marketplace-feature-number">05</span>
              <h3>Checkout & Orders</h3>
              <p>
                Place orders securely and view detailed order history.
              </p>
            </article>

            <article className="marketplace-feature">
              <span className="marketplace-feature-number">06</span>
              <h3>Responsive UI</h3>
              <p>
                A modern, dark-mode-ready design built with Tailwind CSS.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="marketplace-section marketplace-flow-section">
        <div className="marketplace-container">
          <div className="marketplace-section-header">
            <span>04</span>
            <div>
              <p>ARCHITECTURE</p>
              <h2>
                A decoupled, scalable infrastructure.
              </h2>
            </div>
          </div>

          <div className="marketplace-architecture">
            <div className="marketplace-architecture-card">
              <span>01</span>
              <h3>Client</h3>
              <p>
                Next.js App Router frontend hosted on Vercel, utilizing Tailwind CSS.
              </p>
            </div>
            <div className="marketplace-architecture-arrow">→</div>
            <div className="marketplace-architecture-card">
              <span>02</span>
              <h3>API</h3>
              <p>
                Express.js server hosted on Render, handling REST requests.
              </p>
            </div>
            <div className="marketplace-architecture-arrow">→</div>
            <div className="marketplace-architecture-card">
              <span>03</span>
              <h3>ORM</h3>
              <p>
                Prisma handles type-safe database queries and migrations.
              </p>
            </div>
            <div className="marketplace-architecture-arrow">→</div>
            <div className="marketplace-architecture-card">
              <span>04</span>
              <h3>Database</h3>
              <p>
                Serverless PostgreSQL hosted on Neon for scalable storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="marketplace-section marketplace-technology">
        <div className="marketplace-container">
          <div className="marketplace-section-header">
            <span>05</span>
            <div>
              <p>TECHNOLOGY</p>
              <h2>
                The stack behind the platform.
              </h2>
            </div>
          </div>

          <div className="marketplace-tech-list">
            <span>Next.js</span>
            <span>React</span>
            <span>TypeScript</span>
            <span>Tailwind CSS</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>Prisma</span>
            <span>PostgreSQL</span>
            <span>JWT</span>
            <span>Zod</span>
            <span>Vercel</span>
            <span>Render</span>
          </div>
        </div>
      </section>

      {/* WHAT I LEARNED */}
      <section className="marketplace-section marketplace-learning">
        <div className="marketplace-container">
          <div className="marketplace-section-header">
            <span>06</span>
            <div>
              <p>WHAT I LEARNED</p>
              <h2>
                A deep dive into production-grade full-stack development.
              </h2>
            </div>
          </div>

          <div className="marketplace-learning-grid">
            <article>
              <span>01</span>
              <h3>Monorepos</h3>
              <p>
                Learned how to structure and manage a repository containing both frontend and backend code.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Type Safety</h3>
              <p>
                Leveraged TypeScript and Prisma to ensure end-to-end type safety from the database to the UI.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Auth & Security</h3>
              <p>
                Implemented JWT authentication and role-based access control to secure API endpoints.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Deployment</h3>
              <p>
                Gained experience deploying decoupled services across Vercel, Render, and Neon.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SETUP */}
      <section className="marketplace-section marketplace-setup">
        <div className="marketplace-container">
          <div className="marketplace-section-header">
            <span>07</span>
            <div>
              <p>RUNNING THE PROJECT</p>
              <h2>
                Monorepo setup and execution.
              </h2>
            </div>
          </div>

          <div className="marketplace-setup-grid">
            <div className="marketplace-setup-copy">
              <p>
                The project can be run locally by cloning the repository,
                installing dependencies for both the `marketplace-api` and
                `marketplace-web` folders, configuring the environment
                variables, and running the dev servers.
              </p>

              <a
                href="https://github.com/IIGGRRIISS/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="marketplace-github-btn"
              >
                Open Repository ↗
              </a>
            </div>

            <div className="marketplace-code">
              <div className="marketplace-code-line">
                <span>01</span>
                <code>git clone https://github.com/IIGGRRIISS/marketplace.git</code>
              </div>
              <div className="marketplace-code-line">
                <span>02</span>
                <code>cd marketplace/marketplace-api && npm install</code>
              </div>
              <div className="marketplace-code-line">
                <span>03</span>
                <code>npx prisma migrate dev</code>
              </div>
              <div className="marketplace-code-line">
                <span>04</span>
                <code>npm run dev</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="marketplace-footer">
        <div className="marketplace-container">
          <div className="marketplace-footer-content">
            <div>
              <p>MARKETPLACE</p>
              <h2>
                Buy. Sell.
                <br />
                Scale.
              </h2>
            </div>

            <div className="marketplace-footer-actions">
              <a
                href="https://marketplace-web-nu-murex.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="marketplace-primary-btn"
              >
                View Live Demo ↗
              </a>

              <button
                type="button"
                className="marketplace-secondary-btn"
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