import React, { useEffect, useRef } from "react";
import "./Signify.css";
import { createSignifyBackground } from "../backgrounds/Signify.js";

export default function Signify() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const background = createSignifyBackground(backgroundRef.current);

    return () => {
      background?.dispose();
    };
  }, []);

  const backToProjects = () => {
    window.location.href = "/#projects";
  };

  return (
    <main className="signify-page">
      {/* HERO */}
      <section className="signify-hero">
        <div
          ref={backgroundRef}
          className="signify-hero-background"
          aria-hidden="true"
        />

        <div className="signify-container">
          <button
            className="signify-back"
            type="button"
            onClick={backToProjects}
          >
            ← Back to Projects
          </button>

          <div className="signify-hero-content">
            <p className="signify-eyebrow">
              CASE STUDY <span>·</span> AI / ACCESSIBILITY / RESEARCH
            </p>

            <h1>
              SIGN<span>IFY</span>
            </h1>

            <p className="signify-hero-title">
              Bidirectional Indian Sign Language Communication System
            </p>

            <p className="signify-hero-description">
              A two-way communication system connecting Indian Sign Language
              users and non-signers through real-time sign recognition and
              rule-based text-to-sign translation.
            </p>

            <div className="signify-hero-actions">
              <a
                href="#signify-story"
                className="signify-primary-btn"
              >
                Explore the project ↓
              </a>

              <span className="signify-project-type">
                Research & Development Project
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section
        className="signify-section signify-intro"
        id="signify-story"
      >
        <div className="signify-container">
          <div className="signify-section-header">
            <span>01</span>

            <div>
              <p>THE IDEA</p>

              <h2>
                Bridging communication between ISL users and the wider
                community.
              </h2>
            </div>
          </div>

          <div className="signify-intro-grid">
            <div className="signify-intro-copy">
              <p className="signify-large-text">
                Communication should work in both directions.
              </p>

              <p>
                Signify was designed to enable two-way communication between
                Indian Sign Language users and people who do not know ISL.
                Instead of limiting translation to sign recognition, the
                system approaches the problem from both directions.
              </p>

              <p>
                The project evolved through two phases: a Streamlit prototype
                used to validate the approach, followed by a web-based game
                experience designed to make learning and interaction more
                engaging.
              </p>
            </div>

            <div className="signify-direction-card">
              <div className="signify-direction">
                <span>INPUT</span>
                <strong>ISL</strong>
                <small>Hand gestures</small>
              </div>

              <div className="signify-direction-arrow">↔</div>

              <div className="signify-direction">
                <span>OUTPUT</span>
                <strong>TEXT</strong>
                <small>Speech & signs</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTIVATION */}
      <section className="signify-section signify-motivation">
        <div className="signify-container">
          <div className="signify-section-header">
            <span>02</span>

            <div>
              <p>MOTIVATION</p>

              <h2>Designed around three principles.</h2>
            </div>
          </div>

          <div className="signify-principles">
            <article className="signify-principle">
              <span>01</span>

              <h3>Bidirectional</h3>

              <p>
                Supports both sign recognition and text-to-sign communication
                rather than limiting the system to one direction.
              </p>
            </article>

            <article className="signify-principle">
              <span>02</span>

              <h3>Lightweight</h3>

              <p>
                Uses MediaPipe hand landmarks instead of relying on large
                video datasets for gesture recognition.
              </p>
            </article>

            <article className="signify-principle">
              <span>03</span>

              <h3>Engaging</h3>

              <p>
                Uses quizzes, animations, scoring, and a leaderboard to make
                learning ISL more interactive.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SIGN TO TEXT */}
      <section className="signify-section signify-sign-to-text">
        <div className="signify-container">
          <div className="signify-section-header">
            <span>03</span>

            <div>
              <p>SIGN → TEXT / SPEECH</p>

              <h2>Recognising signs in real time.</h2>
            </div>
          </div>

          <div className="signify-system-layout">
            <div className="signify-system-copy">
              <p>
                The sign-recognition pipeline uses MediaPipe for real-time
                hand landmark detection. Those landmarks are passed into MLP
                models trained using 42- and 84-landmark datasets.
              </p>

              <p>
                Once a gesture is classified, Signify produces translated text
                and can convert the result into speech using gTTS.
              </p>
            </div>

            <div className="signify-pipeline">
              <div className="signify-pipeline-step">
                <span>01</span>
                <strong>Camera</strong>
                <small>Live webcam input</small>
              </div>

              <div className="signify-pipeline-line" />

              <div className="signify-pipeline-step">
                <span>02</span>
                <strong>MediaPipe</strong>
                <small>Hand landmarks</small>
              </div>

              <div className="signify-pipeline-line" />

              <div className="signify-pipeline-step">
                <span>03</span>
                <strong>MLP</strong>
                <small>Gesture classification</small>
              </div>

              <div className="signify-pipeline-line" />

              <div className="signify-pipeline-step">
                <span>04</span>
                <strong>Text / Speech</strong>
                <small>Translated output</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEXT TO SIGN */}
      <section className="signify-section signify-text-to-sign">
        <div className="signify-container">
          <div className="signify-section-header">
            <span>04</span>

            <div>
              <p>TEXT / SPEECH → SIGN</p>

              <h2>Turning language back into signs.</h2>
            </div>
          </div>

          <div className="signify-reverse-grid">
            <div className="signify-reverse-visual">
              <div className="signify-letter">A</div>

              <div className="signify-arrow">→</div>

              <div className="signify-sign-box">
                <span>ISL</span>
                <strong>SIGN</strong>
              </div>
            </div>

            <div className="signify-reverse-copy">
              <p>
                The reverse communication path uses a rule-based model to map
                words and phrases to their corresponding Indian Sign Language
                representations.
              </p>

              <p>
                SVG animations provide a visual representation of the signs,
                while gTTS provides speech playback for the text input.
              </p>

              <div className="signify-tech-pills">
                <span>Rule-Based Mapping</span>
                <span>SVG Animations</span>
                <span>gTTS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO PHASES */}
      <section className="signify-section signify-phases">
        <div className="signify-container">
          <div className="signify-section-header">
            <span>05</span>

            <div>
              <p>PROJECT EVOLUTION</p>

              <h2>From prototype to interactive experience.</h2>
            </div>
          </div>

          <div className="signify-phase-grid">
            <article className="signify-phase">
              <div className="signify-phase-number">01</div>

              <p className="signify-phase-label">
                STREAMLIT PROTOTYPE
              </p>

              <h3>Validate the approach.</h3>

              <p>
                The first phase focused on rapid prototyping and proof of
                concept. A live webcam feed was connected to the sign
                recognition pipeline to validate the core interaction.
              </p>

              <ul>
                <li>Rapid prototyping</li>
                <li>Live webcam input</li>
                <li>Sign recognition</li>
                <li>Text and speech output</li>
                <li>Minimal testing interface</li>
              </ul>
            </article>

            <article className="signify-phase signify-phase-featured">
              <div className="signify-phase-number">02</div>

              <p className="signify-phase-label">
                WEB GAME VERSION · EXPO
              </p>

              <h3>Turn learning into interaction.</h3>

              <p>
                The second phase transformed the prototype into a multi-page
                web experience with quizzes, animations, scoring, and a
                leaderboard designed to make learning ISL more engaging.
              </p>

              <ul>
                <li>HTML, CSS and JavaScript frontend</li>
                <li>Flask backend for ML inference</li>
                <li>ISL learning experience</li>
                <li>Interactive quizzes</li>
                <li>Score and leaderboard system</li>
                <li>SVG sign animations</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* GAME EXPERIENCE */}
      <section className="signify-section signify-game">
        <div className="signify-container">
          <div className="signify-section-header">
            <span>06</span>

            <div>
              <p>GAMIFIED EXPERIENCE</p>

              <h2>Learning ISL through interaction.</h2>
            </div>
          </div>

          <div className="signify-game-grid">
            <article>
              <span>01</span>

              <h3>Learn</h3>

              <p>
                Explore Indian Sign Language signs through a visual,
                interactive learning experience.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Quiz</h3>

              <p>
                Test recognition and understanding through image-based
                interactive quizzes.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Score</h3>

              <p>
                Players earn points through the game experience and can track
                their performance.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Leaderboard</h3>

              <p>
                A leaderboard adds a competitive element to encourage
                continued engagement.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="signify-section signify-research">
        <div className="signify-container">
          <div className="signify-research-box">
            <div className="signify-research-icon">
              R
            </div>

            <div>
              <p className="signify-research-label">
                RESEARCH CONTRIBUTION
              </p>

              <h2>
                From working system to research contribution.
              </h2>

              <p>
                The project was also presented as a research paper, documenting
                the model performance, system architecture, and potential
                social impact of the proposed communication approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="signify-section signify-team">
        <div className="signify-container">
          <div className="signify-section-header">
            <span>07</span>

            <div>
              <p>TEAM</p>

              <h2>Built as a collaborative project.</h2>
            </div>
          </div>

          <div className="signify-team-list">
            <div className="signify-team-member">
              <span>01</span>

              <div>
                <a href="https://github.com/IIGGRRIISS" target="_blank" rel="noopener noreferrer">
                  <strong>Syed Ibrahim Ali</strong>
                </a>
              </div>
            </div>

            <div className="signify-team-member">
              <span>02</span>

              <div>
                <a href="https://github.com/Mudasir24" target="_blank" rel="noopener noreferrer">
                  <strong>Mohammed Mudasir Ahmed</strong>
                </a>
                <small>Team Lead</small>
              </div>
            </div>

            <div className="signify-team-member">
              <span>03</span>

              <div>
                <a href="mailto:ozaira956@gmail.com">
                  <strong>Ozair Ali</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="signify-section signify-technology">
        <div className="signify-container">
          <div className="signify-section-header">
            <span>08</span>

            <div>
              <p>TECHNOLOGY</p>

              <h2>The technology behind Signify.</h2>
            </div>
          </div>

          <div className="signify-tech-list">
            <span>Python</span>
            <span>MediaPipe</span>
            <span>MLP</span>
            <span>Machine Learning</span>
            <span>gTTS</span>
            <span>Streamlit</span>
            <span>Flask</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>SVG</span>
            <span>JSON</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="signify-footer">
        <div className="signify-container">
          <div className="signify-footer-content">
            <div>
              <p>SIGNIFY</p>

              <h2>
                Communication
                <br />
                in both directions.
              </h2>
            </div>

            <button
              className="signify-secondary-btn"
              type="button"
              onClick={backToProjects}
            >
              ← Back to Projects
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}