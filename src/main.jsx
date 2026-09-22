import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Create canvas container for Three.js backgrounds
const canvasContainer = document.createElement('div')
canvasContainer.id = 'canvas-container'
document.body.insertBefore(canvasContainer, document.body.firstChild)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Initialize background scenes and transitions
setTimeout(() => {
  initBarbaTransitions()
}, 100)