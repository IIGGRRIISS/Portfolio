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
    slug: "blog-app",

    title: "Blog App",

    tagline: "Dynamic Server-Side Rendered Blog Platform",

    description:
      "A dynamic blog website built with Node.js, Express.js, and EJS. The application provides complete blog post management through create, read, update, and delete operations with server-side rendering.",

    shortDesc:
      "Node.js and Express blog platform with CRUD operations and EJS server-side rendering.",

    image: "/projects/blog.jpg",

    tech: [
      "Node.js",
      "Express.js",
      "EJS",
      "HTML",
      "CSS",
      "JavaScript"
    ],

    role: "Full-Stack Developer",

    problem:
      "A blog platform needs a straightforward content workflow that allows users to create, publish, view, edit, and delete posts without unnecessary complexity.",

    approach:
      "I built the application using Node.js and Express.js for the backend and EJS for server-side rendering. The project focuses on understanding routing, server-side templates, CRUD operations, and the fundamentals of building a dynamic web application.",

    highlights: [
      "Implemented complete CRUD operations for blog posts.",
      "Built individual pages for viewing blog posts.",
      "Added editing functionality for existing posts.",
      "Implemented deletion of blog posts.",
      "Used EJS for server-side rendering and dynamic content.",
      "Created responsive styling for the blog interface."
    ],

    features: [
      "Create Blog Posts",
      "Publish Blog Posts",
      "View Individual Posts",
      "Edit Existing Posts",
      "Delete Posts",
      "Server-Side Rendering",
      "Responsive Styling"
    ],

    results: [
      {
        value: "CRUD",
        label: "Complete blog management"
      },
      {
        value: "EJS",
        label: "Server-side rendering"
      },
      {
        value: "Express",
        label: "Backend framework"
      },
      {
        value: "Node.js",
        label: "Runtime environment"
      }
    ],

    architecture: [
      "Node.js provides the runtime environment for the application.",
      "Express.js handles routing and server-side application logic.",
      "EJS renders dynamic pages on the server.",
      "HTML and CSS provide the structure and styling of the interface.",
      "JavaScript handles client-side interactions."
    ],

    caseStudy:
      "This project was created as part of my full-stack web development learning journey. It focused on understanding how a dynamic server-rendered application works, including Express routing, EJS templates, CRUD operations, and the relationship between frontend pages and backend logic.",

    collaborators: [
      {
        name: "Syed Ibrahim Ali",
        role: "Full-Stack Developer",
        link: null,
        type: "self"
      }
    ],

    github:
      "https://github.com/IIGGRRIISS/Blog",

    color: "#ff2a2a"
  }
];