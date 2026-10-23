export const projects = [
  {
    id: 1,
    slug: "grid-x",
    title: "GRID-X",
    tagline: "AI-Powered Formula 1 Prediction & Strategy Platform",

    description:
      "GRID-X (Global Race Intelligence and Data Exchange) is an end-to-end AI-powered Formula 1 platform designed to simulate, analyze, and predict race performance. Developed as a degree capstone project, GRID-X combines data engineering, machine learning, deep learning, reinforcement learning, computer vision, and full-stack development into a unified racing intelligence platform.",

    shortDesc:
      "AI-powered Formula 1 analytics platform combining race prediction, telemetry analysis, strategy optimization, safety monitoring, and computer vision.",

    image: "/projects/grid-x.jpg",

    tech: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Machine Learning",
      "Deep Learning",
      "XGBoost",
      "Random Forest",
      "LSTM",
      "DQN",
      "CNN",
      "SHAP",
      "Three.js",
      "Chart.js",
      "REST APIs"
    ],

    role: "Full-Stack Developer & AI/ML Engineer",

    problem:
      "Formula 1 generates enormous amounts of telemetry, historical race data, environmental information, and strategic variables. Making sense of this information requires multiple analytical systems, while traditional race dashboards often separate prediction, strategy, safety, and visualization into different tools. GRID-X was designed to bring these capabilities together into one interactive platform.",

    approach:
      "We developed a unified architecture combining a FastAPI backend, machine learning pipelines, deep learning models, reinforcement learning, computer vision, and an interactive frontend. The platform processes telemetry and historical race data to generate predictions and analytical insights while presenting the results through responsive dashboards and visualizations.",

    highlights: [
      "Built a Random Forest regression system for lap-time prediction using 21 telemetry and environmental features.",
      "Implemented an XGBoost-based race outcome prediction system covering winner, podium, points, and top-10 classifications.",
      "Developed an LSTM-based pace forecaster using a 10-lap sliding window for upcoming lap performance.",
      "Built a DQN reinforcement learning system for pit-stop and tyre strategy optimization.",
      "Implemented CNN-based Formula 1 circuit recognition using ResNet50 transfer learning.",
      "Added XGBoost-based pre-race crash-risk prediction and tyre degradation safety monitoring.",
      "Integrated SHAP-based explainable AI to show which features influence model predictions.",
      "Built an interactive web dashboard containing 20+ responsive pages for race analytics, safety, strategy, vision, and explainability."
    ],

    features: [
      "Lap-Time Prediction",
      "Race Outcome Prediction",
      "Driver Style Analysis",
      "LSTM Pace Forecasting",
      "Reinforcement Learning Strategy Optimizer",
      "CNN Circuit Recognition",
      "Crash Risk Prediction",
      "Tyre Safety Monitoring",
      "SHAP Explainable AI",
      "Interactive Race Analytics Dashboard"
    ],

    results: [
      {
        value: "97%",
        label: "Lap-time prediction accuracy"
      },
      {
        value: "96%",
        label: "Race win classification accuracy"
      },
      {
        value: "0.993",
        label: "R² score for lap-time prediction"
      },
      {
        value: "20+",
        label: "Responsive frontend pages"
      }
    ],

    architecture: [
      "GitHub hosts the source code, application logic, API, frontend, preprocessing pipelines, and model training scripts.",
      "Hugging Face Hub stores large Formula 1 telemetry datasets and serialized trained models separately from the main repository.",
      "FastAPI provides REST API endpoints connecting the machine learning systems with the frontend.",
      "The frontend presents predictions, telemetry analysis, safety information, strategy recommendations, and computer vision results through interactive dashboards."
    ],

    datasets: [
      "Approximately 91,000 modern telemetry records from 2021–2024 collected using FastF1.",
      "Approximately 27,000 historical Formula 1 records from 1950–2020 sourced from the Ergast/Kaggle F1 dataset.",
      "A manually curated collection of Formula 1 circuit schematic images for circuit recognition."
    ],

    caseStudy:
      "GRID-X was developed as a degree capstone project to explore how different AI and data engineering techniques could work together inside a Formula 1 analytics platform. Rather than focusing on one prediction model, the project combines multiple machine learning approaches for prediction, strategy, safety, driver analysis, computer vision, and explainability.",

    collaborators: [
      {
        name: "Syed Ibrahim Ali",
        role: "Full-Stack Developer & AI/ML Engineer",
        link: null,
        type: "self"
      },
      {
        name: "Faiz Ahmed",
        role: "Project Collaborator",
        link: "https://github.com/Faiz-ahmed-13",
        type: "github"
      }
    ],

    github: "https://github.com/IIGGRRIISS/GRID-X",

    color: "#ff2a2a"
  },

  {
    id: 2,
    slug: "signify",

    title: "Bidirectional Communication System",

    tagline:
      "Indian Sign Language Communication & Interactive Learning System",

    description:
      "A bidirectional Indian Sign Language communication system designed to bridge communication between ISL users and non-signers. The project combines real-time sign recognition, text-to-sign translation, speech output, and a gamified learning experience.",

    shortDesc:
      "Bidirectional Indian Sign Language system combining real-time recognition, text-to-sign translation, speech, quizzes, and gamification.",

    image: "/projects/signify.jpg",

    tech: [
      "Python",
      "MediaPipe",
      "MLP",
      "Flask",
      "Streamlit",
      "JavaScript",
      "HTML",
      "CSS",
      "gTTS",
      "SVG",
      "JSON"
    ],

    role:
      "Full-Stack Developer & Machine Learning Developer",

    problem:
      "Indian Sign Language is not widely understood outside the signing community, creating a communication barrier between ISL users and people who do not know sign language. Existing solutions can also be one-directional or require large and computationally expensive datasets. We designed the system to explore a lightweight, bidirectional approach that could also make learning ISL more engaging.",

    approach:
      "The project was developed in two phases. The first phase was a Streamlit prototype used to validate real-time sign recognition and text-to-sign workflows. The second phase evolved the concept into a web-based game with quizzes, animations, scoring, and a leaderboard. MediaPipe hand landmarks provide lightweight input features, while MLP models classify gestures. A rule-based translation system maps words and phrases to visual ISL representations.",

    highlights: [
      "Implemented real-time hand landmark detection using MediaPipe.",
      "Used MLP classifiers trained on 42- and 84-landmark datasets for gesture recognition.",
      "Built sign-to-text and sign-to-speech workflows using real-time recognition and gTTS.",
      "Implemented text-to-sign translation using rule-based word and phrase mappings.",
      "Created SVG-based sign animations for visual communication.",
      "Developed a gamified learning experience with quizzes, scoring, and leaderboard functionality.",
      "Built a Flask backend for machine learning inference in the web game version.",
      "Contributed to a research paper presenting the project's technical approach and social impact."
    ],

    features: [
      "Real-Time Sign Recognition",
      "Sign → Text",
      "Sign → Speech",
      "Text → Sign",
      "Speech → Sign",
      "MediaPipe Hand Tracking",
      "MLP Gesture Classification",
      "ISL Learning Modules",
      "Interactive Quizzes",
      "Score & Leaderboard System",
      "SVG Sign Animations"
    ],

    results: [
      {
        value: "2",
        label: "Development phases"
      },
      {
        value: "42 / 84",
        label: "Landmark feature datasets"
      },
      {
        value: "2-Way",
        label: "Communication direction"
      },
      {
        value: "ML + Web",
        label: "Integrated system"
      }
    ],

    architecture: [
      "MediaPipe extracts hand landmarks from webcam input.",
      "MLP models classify the extracted landmarks into recognized ISL gestures.",
      "Recognized gestures are converted into text and can be spoken using gTTS.",
      "A rule-based translation layer maps text and phrases to corresponding ISL visual representations.",
      "The Flask backend provides machine learning inference for the web game version.",
      "The frontend provides learning modules, quizzes, animations, scoring, and leaderboard functionality."
    ],

    caseStudy:
      "The project started as a lightweight Streamlit prototype for validating the core machine learning workflow. It was later expanded into a web game that combined the technical system with an educational experience. The goal was not only to recognize signs, but also to make ISL learning more approachable through interaction, feedback, and gamification.",

    collaborators: [
      {
        name: "Syed Ibrahim Ali",
        role: "Full-Stack Developer & ML Developer",
        link: null,
        type: "self"
      },
      {
        name: "Mohammed Mudasir Ahmed",
        role: "Team Lead & Project Collaborator",
        link: "https://github.com/Mudasir24",
        type: "github"
      },
      {
        name: "Ozair Ali",
        role: "Project Collaborator",
        link: "mailto:ozaira956@gmail.com",
        type: "email"
      }
    ],

    github:
      "https://github.com/Mudasir24/bidirectional-indian-sign-language",

    color: "#ff2a2a"
  },

  {
    id: 3,
    slug: "finance-tracker",
    published: false,

    title: "Personal Finance Tracker",

    tagline: "Smart Expense Management & Analytics",

    description:
      "A full-stack personal finance application for tracking expenses, managing budgets, and visualizing spending patterns.",

    shortDesc:
      "Full-stack app for expense tracking with visual analytics and budget management.",

    image: "/projects/finance.jpg",

    tech: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Chart.js"
    ],

    role: "Full-Stack Developer",

    problem:
      "Managing personal expenses can become difficult when transactions, budgets, and spending patterns are spread across different tools.",

    approach:
      "The application combines a PostgreSQL database, Express backend, React frontend, and Chart.js visualizations to provide a centralized place for expense management and financial analysis.",

    highlights: [
      "Implemented expense logging with categories.",
      "Added budget tracking and monthly spending analytics.",
      "Created visual spending insights using Chart.js.",
      "Designed a responsive interface for managing personal finances."
    ],

    features: [
      "Expense Logging",
      "Category Management",
      "Budget Tracking",
      "Monthly Analytics",
      "Spending Visualization"
    ],

    liveDemo: "#",

    github:
      "https://github.com/IIGGRRIISS",

    color: "#ff2a2a"
  },

  {
    id: 4,
    slug: "marketplace",

    title: "Marketplace",

    tagline: "Full-Stack Multi-Vendor E-Commerce Platform",

    description:
      "A full-stack e-commerce marketplace where users can buy and sell products. Built as a monorepo with a Next.js frontend and an Express + Prisma backend, featuring JWT authentication, a seller dashboard, and a shopping cart.",

    shortDesc:
      "Monorepo e-commerce platform with Next.js, Express, Prisma, and PostgreSQL featuring buyer/seller roles and atomic checkout.",

    image: "/projects/marketplace.jpg",

    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Zod",
      "Vercel",
      "Render"
    ],

    role: "Full-Stack Developer",

    problem:
      "Building a multi-vendor marketplace requires managing complex relationships between users, products, carts, and orders. The challenge was to create a secure, scalable platform where sellers can manage their storefronts and buyers can seamlessly browse and purchase items.",

    approach:
      "I built a monorepo structure separating the Next.js frontend from the Express backend. I used Prisma ORM with a Neon PostgreSQL database for type-safe database interactions. The backend relies on JWT for stateless authentication and Zod for schema validation, while the frontend uses Tailwind CSS for a responsive, dark-mode-ready UI.",

    highlights: [
      "Architected a monorepo structure separating the Next.js frontend and Express backend.",
      "Implemented JWT-based authentication with distinct Buyer and Seller roles.",
      "Developed a Seller Dashboard allowing users to list, edit, and manage products.",
      "Created a fully functional shopping cart and atomic checkout transaction flow.",
      "Integrated Prisma ORM with a serverless Neon PostgreSQL database.",
      "Used Zod for robust backend data validation.",
      "Deployed the frontend on Vercel and the backend on Render."
    ],

    features: [
      "JWT Authentication",
      "Buyer / Seller Roles",
      "Seller Dashboard",
      "Product Catalog",
      "Shopping Cart",
      "Checkout & Orders",
      "Responsive UI",
      "Dark-mode Ready"
    ],

    results: [
      {
        value: "Monorepo",
        label: "Next.js & Express"
      },
      {
        value: "JWT",
        label: "Role-Based Auth"
      },
      {
        value: "Prisma",
        label: "Type-Safe ORM"
      },
      {
        value: "Live",
        label: "Deployed on Vercel & Render"
      }
    ],

    architecture: [
      "Frontend: Next.js (App Router), React, Tailwind CSS, TypeScript.",
      "Backend: Node.js, Express, Prisma ORM, Zod validation.",
      "Database: PostgreSQL hosted on Neon (Serverless).",
      "Authentication: JWT-based with Buyer and Seller role separation.",
      "Deployment: Vercel (Frontend), Render (Backend)."
    ],

    caseStudy:
      "The Marketplace project was built to master full-stack TypeScript development and modern deployment workflows. By leveraging a monorepo and serverless PostgreSQL, the application remains highly scalable while keeping the developer experience seamless across the frontend and backend.",

    collaborators: [
      {
        name: "Syed Ibrahim Ali",
        role: "Full-Stack Developer",
        link: null,
        type: "self"
      }
    ],

    liveDemo: "https://marketplace-web-nu-murex.vercel.app",
    github: "https://github.com/IIGGRRIISS/marketplace",

    color: "#ff2a2a"
  }
];