import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DemoPage from './pages/DemoPage'
import MetricCardTest from './pages/MetricCardTest'
import Documentation from './pages/Documentation/Documentation'
import LoginDemo from './pages/LoginDemo'
import DashboardDemo from './pages/DashboardDemo'

// Import all CSS files to ensure they're bundled
import './styles/ScrollFixes.css'
import './styles/animations.css'
import './components/Dashboard/dashboard.css'
import './layouts/masterlayout.css'
import './components/Login/login.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo/*" element={<DemoPage />} />
        <Route path="/login-demo" element={<LoginDemo />} />
        <Route path="/dashboard-demo/*" element={<DashboardDemo />} />
        <Route path="/test/metriccard" element={<MetricCardTest />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </div>
  )
}

export default App