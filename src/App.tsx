import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DemoPage from './pages/DemoPage'
import MetricCardTest from './pages/MetricCardTest'
import './styles/ScrollFixes.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo/*" element={<DemoPage />} />
        <Route path="/test/metriccard" element={<MetricCardTest />} />
      </Routes>
    </div>
  )
}

export default App