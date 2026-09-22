import React, { useEffect, useRef } from "react";
import "./GridX.css";
import { createGridXBackground } from "../backgrounds/GridX.js";

export default function GridX({ onBack }) {
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const background = createGridXBackground(backgroundRef.current);

    return () => {
      background?.dispose();
    };
  }, []);

  return (
    <main className="gridx-page">
      {/* HERO */}
      <section className="gridx-hero">
        <div
          ref={backgroundRef}
          className="gridx-hero-background"
          aria-hidden="true"
        />

        <div className="gridx-container">
          <button className="gridx-back" onClick={onBack}>
            ← Back to Projects
          </button>

          <div className="gridx-hero-content">
            <p className="gridx-eyebrow">
              CASE STUDY <span>·</span> AI / ML / FULL-STACK
            </p>

            <h1>
              GRID<span>-</span>X
            </h1>

            <p className="gridx-hero-title">
              AI-Powered Formula 1 Prediction & Strategy Platform
            </p>

            <p className="gridx-hero-description">
              GRID-X (Global Race Intelligence and Data Exchange) is an
              end-to-end AI-powered Formula 1 platform designed to simulate,
              analyze, and predict race performance.
            </p>

            <div className="gridx-hero-actions">
              <a
                href="https://github.com/IIGGRRIISS/GRID-X"
                target="_blank"
                rel="noopener noreferrer"
                className="gridx-primary-btn"
              >
                View on GitHub ↗
              </a>

              <span className="gridx-project-type">
                Degree Capstone Project
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="gridx-section gridx-overview">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>01</span>

            <div>
              <p>PROJECT OVERVIEW</p>
              <h2>One platform. Multiple layers of race intelligence.</h2>
            </div>
          </div>

          <div className="gridx-overview-grid">
            <div className="gridx-overview-text">
              <p>
                Developed as a degree capstone project, GRID-X combines data
                engineering, machine learning, deep learning, reinforcement
                learning, and computer vision into a unified full-stack system.
              </p>

              <p>
                The platform is designed to simulate, analyze, and predict
                Formula 1 race performance through multiple AI-driven systems,
                from lap-time and race outcome prediction to strategy
                optimization, safety monitoring, and circuit recognition.
              </p>
            </div>

            <div className="gridx-facts">
              <div className="gridx-fact">
                <strong>9+</strong>
                <span>AI-powered systems</span>
              </div>

              <div className="gridx-fact">
                <strong>20+</strong>
                <span>Responsive dashboard pages</span>
              </div>

              <div className="gridx-fact">
                <strong>8</strong>
                <span>REST API endpoints</span>
              </div>

              <div className="gridx-fact">
                <strong>2</strong>
                <span>Project contributors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="gridx-section gridx-challenge">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>02</span>

            <div>
              <p>THE CHALLENGE</p>
              <h2>Bringing race intelligence into one platform.</h2>
            </div>
          </div>

          <div className="gridx-challenge-content">
            <p className="gridx-large-text">
              Formula 1 generates enormous amounts of telemetry, historical
              race data, environmental information, and visual circuit data.
              GRID-X brings different forms of race intelligence together into
              one system.
            </p>

            <p>
              Instead of focusing on a single prediction task, the platform
              combines predictive models, time-series forecasting,
              reinforcement learning, clustering, computer vision, safety
              analysis, and explainable AI within one full-stack application.
            </p>
          </div>
        </div>
      </section>

      {/* AI SYSTEMS */}
      <section className="gridx-section gridx-systems">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>03</span>

            <div>
              <p>AI SYSTEMS</p>
              <h2>The intelligence behind GRID-X.</h2>
            </div>
          </div>

          <div className="gridx-feature-grid">
            <article className="gridx-feature">
              <span className="gridx-feature-number">01</span>
              <h3>Lap-Time Prediction</h3>
              <p>
                Random Forest Regressor using 21 telemetry and environmental
                features to predict lap performance.
              </p>

              <div className="gridx-feature-metric">
                <strong>97%</strong>
                <span>accuracy</span>
              </div>
            </article>

            <article className="gridx-feature">
              <span className="gridx-feature-number">02</span>
              <h3>Race Outcome Prediction</h3>
              <p>
                A dual-era XGBoost ensemble predicts race winner, podium,
                points, and top-10 finishes.
              </p>

              <div className="gridx-feature-metric">
                <strong>96%</strong>
                <span>win classification accuracy</span>
              </div>
            </article>

            <article className="gridx-feature">
              <span className="gridx-feature-number">03</span>
              <h3>Driver Style Analysis</h3>
              <p>
                K-Means clustering analyzes driver behavior and classifies
                driving styles into four categories.
              </p>

              <div className="gridx-tags">
                <span>Aggressive</span>
                <span>Smooth</span>
                <span>Opportunistic</span>
                <span>Balanced</span>
              </div>
            </article>

            <article className="gridx-feature">
              <span className="gridx-feature-number">04</span>
              <h3>Pace Forecaster</h3>
              <p>
                An LSTM-based time-series model uses a 10-lap sliding window
                to forecast upcoming lap performance.
              </p>

              <div className="gridx-feature-label">
                LSTM · TIME SERIES
              </div>
            </article>

            <article className="gridx-feature">
              <span className="gridx-feature-number">05</span>
              <h3>Strategy Optimizer</h3>
              <p>
                A DQN agent operating in a Gymnasium environment optimizes
                pit-stop windows, tyre compounds, and race strategy decisions.
              </p>

              <div className="gridx-feature-label">
                DQN · REINFORCEMENT LEARNING
              </div>
            </article>

            <article className="gridx-feature">
              <span className="gridx-feature-number">06</span>
              <h3>Circuit Recognition</h3>
              <p>
                ResNet50 transfer learning identifies Formula 1 circuits from
                schematic track images.
              </p>

              <div className="gridx-feature-label">
                CNN · RESNET50
              </div>
            </article>

            <article className="gridx-feature">
              <span className="gridx-feature-number">07</span>
              <h3>Crash Risk Prediction</h3>
              <p>
                XGBoost estimates pre-race crash risk using circuit, driver
                aggression, weather, and racing conditions.
              </p>
            </article>

            <article className="gridx-feature">
              <span className="gridx-feature-number">08</span>
              <h3>Tyre Safety Monitoring</h3>
              <p>
                Analyses tyre degradation and assigns safety categories while
                providing pit-stop recommendations.
              </p>

              <div className="gridx-safety">
                <span>SAFE</span>
                <span>CAUTION</span>
                <span>CRITICAL</span>
              </div>
            </article>

            <article className="gridx-feature">
              <span className="gridx-feature-number">09</span>
              <h3>Explainable AI</h3>
              <p>
                SHAP-based analysis helps explain which features contribute to
                model predictions.
              </p>

              <div className="gridx-feature-label">
                SHAP · MODEL EXPLAINABILITY
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="gridx-section gridx-results">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>04</span>

            <div>
              <p>RESULTS</p>
              <h2>Performance measured in numbers.</h2>
            </div>
          </div>

          <div className="gridx-results-grid">
            <div className="gridx-result">
              <strong>97%</strong>
              <span>Lap-time prediction accuracy</span>
            </div>

            <div className="gridx-result">
              <strong>0.993</strong>
              <span>R² score</span>
            </div>

            <div className="gridx-result">
              <strong>2.787s</strong>
              <span>RMSE</span>
            </div>

            <div className="gridx-result">
              <strong>96%</strong>
              <span>Race win classification accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="gridx-section gridx-architecture">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>05</span>

            <div>
              <p>ARCHITECTURE & STORAGE</p>
              <h2>Built as a distributed full-stack system.</h2>
            </div>
          </div>

          <div className="gridx-architecture-grid">
            <article className="gridx-architecture-card">
              <div className="gridx-architecture-top">
                <span>01</span>
                <h3>GitHub</h3>
              </div>

              <p>
                The GitHub repository contains the core application and
                development infrastructure.
              </p>

              <ul>
                <li>Core application logic</li>
                <li>FastAPI backend</li>
                <li>API endpoints</li>
                <li>Data preprocessing</li>
                <li>Model training scripts</li>
                <li>Machine learning pipelines</li>
                <li>Frontend</li>
                <li>Documentation</li>
              </ul>
            </article>

            <article className="gridx-architecture-card gridx-huggingface">
              <div className="gridx-architecture-top">
                <span>02</span>
                <h3>Hugging Face Hub</h3>
              </div>

              <p>
                Large datasets and trained model binaries are hosted separately
                to keep the GitHub repository lightweight.
              </p>

              <div className="gridx-storage-stats">
                <div>
                  <strong>7.7GB+</strong>
                  <span>F1 telemetry datasets</span>
                </div>

                <div>
                  <strong>1.4GB+</strong>
                  <span>Serialized trained models</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* DATA */}
      <section className="gridx-section gridx-data">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>06</span>

            <div>
              <p>DATA</p>
              <h2>The data behind the models.</h2>
            </div>
          </div>

          <div className="gridx-data-grid">
            <article>
              <span>2021 — 2024</span>
              <strong>~91,000</strong>
              <p>
                Modern telemetry lap records collected using FastF1.
              </p>
            </article>

            <article>
              <span>1950 — 2020</span>
              <strong>~27,000</strong>
              <p>
                Historical entries sourced from the Ergast / Kaggle F1
                dataset.
              </p>
            </article>

            <article>
              <span>VISION DATA</span>
              <strong>Curated</strong>
              <p>
                High-resolution Formula 1 circuit schematics used for circuit
                recognition.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="gridx-section gridx-dashboard">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>07</span>

            <div>
              <p>FRONTEND DASHBOARD</p>
              <h2>A complete Formula 1 analytics interface.</h2>
            </div>
          </div>

          <p className="gridx-section-intro">
            GRID-X includes a responsive web-based dashboard designed to
            provide an interactive Formula 1 analytics experience. The
            frontend consists of 20+ responsive pages and communicates with the
            FastAPI backend through REST APIs.
          </p>

          <div className="gridx-dashboard-grid">
            <div className="gridx-dashboard-card">
              <span>01</span>
              <h3>Race Analytics</h3>

              <ul>
                <li>Lap-time predictions</li>
                <li>Race outcome predictions</li>
                <li>Driver performance analysis</li>
                <li>Driver style visualization</li>
                <li>Circuit analysis</li>
              </ul>
            </div>

            <div className="gridx-dashboard-card">
              <span>02</span>
              <h3>Safety & Strategy</h3>

              <ul>
                <li>Crash risk prediction</li>
                <li>Tyre degradation monitoring</li>
                <li>Tyre safety status</li>
                <li>Pit-stop recommendations</li>
                <li>Strategy optimization</li>
              </ul>
            </div>

            <div className="gridx-dashboard-card">
              <span>03</span>
              <h3>Vision & Explainability</h3>

              <ul>
                <li>AI-powered circuit recognition</li>
                <li>Circuit similarity analysis</li>
                <li>SHAP-based explanations</li>
                <li>Interactive visualizations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* API */}
      <section className="gridx-section gridx-api">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>08</span>

            <div>
              <p>API</p>
              <h2>The systems communicate through REST.</h2>
            </div>
          </div>

          <div className="gridx-api-table">
            <div className="gridx-api-row gridx-api-header">
              <span>Endpoint</span>
              <span>Method</span>
              <span>Description</span>
            </div>

            <div className="gridx-api-row">
              <code>/predict</code>
              <strong>POST</strong>
              <span>Full race prediction</span>
            </div>

            <div className="gridx-api-row">
              <code>/stint-simulate</code>
              <strong>POST</strong>
              <span>Linear stint simulation & tyre degradation</span>
            </div>

            <div className="gridx-api-row">
              <code>/crash-risk-predict</code>
              <strong>POST</strong>
              <span>Crash probability analysis</span>
            </div>

            <div className="gridx-api-row">
              <code>/tire-safety-predict</code>
              <strong>POST</strong>
              <span>Tyre degradation risk assessment</span>
            </div>

            <div className="gridx-api-row">
              <code>/next-lap</code>
              <strong>POST</strong>
              <span>LSTM-based pace forecasting</span>
            </div>

            <div className="gridx-api-row">
              <code>/strategy-optimize</code>
              <strong>POST</strong>
              <span>RL-driven pit-stop optimization</span>
            </div>

            <div className="gridx-api-row">
              <code>/analyze-circuit</code>
              <strong>POST</strong>
              <span>CNN track recognition from images</span>
            </div>

            <div className="gridx-api-row">
              <code>/explain-lap</code>
              <strong>POST</strong>
              <span>SHAP feature importance analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTRIBUTORS */}
      <section className="gridx-section gridx-contributors">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>09</span>

            <div>
              <p>CONTRIBUTORS</p>
              <h2>Built together.</h2>
            </div>
          </div>

          <div className="gridx-contributor-grid">
            <a
              href="https://github.com/IIGGRRIISS"
              target="_blank"
              rel="noopener noreferrer"
              className="gridx-contributor"
            >
              <span>01</span>

              <div>
                <strong>Syed Ibrahim Ali</strong>
                <p>@IIGGRRIISS</p>
              </div>

              <span className="gridx-contributor-arrow">↗</span>
            </a>

            <a
              href="https://github.com/Faiz-ahmed-13"
              target="_blank"
              rel="noopener noreferrer"
              className="gridx-contributor"
            >
              <span>02</span>

              <div>
                <strong>Faiz Ahmed</strong>
                <p>@Faiz-ahmed-13</p>
              </div>

              <span className="gridx-contributor-arrow">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="gridx-section gridx-tech">
        <div className="gridx-container">
          <div className="gridx-section-header">
            <span>10</span>

            <div>
              <p>TECHNOLOGY</p>
              <h2>What powers GRID-X.</h2>
            </div>
          </div>

          <div className="gridx-tech-list">
            <span>Python</span>
            <span>FastAPI</span>
            <span>Machine Learning</span>
            <span>Deep Learning</span>
            <span>Random Forest</span>
            <span>XGBoost</span>
            <span>K-Means</span>
            <span>LSTM</span>
            <span>Reinforcement Learning</span>
            <span>DQN</span>
            <span>Gymnasium</span>
            <span>CNN</span>
            <span>ResNet50</span>
            <span>SHAP</span>
            <span>FastF1</span>
            <span>REST APIs</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>GitHub</span>
            <span>Hugging Face Hub</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="gridx-footer">
        <div className="gridx-container">
          <div className="gridx-footer-content">
            <div>
              <p>GRID-X</p>
              <h2>
                Race intelligence,
                <br />
                reimagined.
              </h2>
            </div>

            <div className="gridx-footer-actions">
              <a
                href="https://github.com/IIGGRRIISS/GRID-X"
                target="_blank"
                rel="noopener noreferrer"
                className="gridx-primary-btn"
              >
                View GitHub ↗
              </a>

              <button
                className="gridx-secondary-btn"
                onClick={onBack}
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