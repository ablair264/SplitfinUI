import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import WebDesign from './pages/WebDesign'
import WebsiteMaintenance from './pages/WebsiteMaintenance'
import WebDevelopment from './pages/WebDevelopment'
import Automation from './pages/Automation'
import ECommerce from './pages/ECommerce'
import PCRepair from './pages/PCRepair'

// Import all CSS files to ensure they're bundled
// Keep CSS centralized in main.tsx to avoid double-loading and overrides

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/web-design" element={<WebDesign />} />
        <Route path="/website-maintenance" element={<WebsiteMaintenance />} />
        {/* Temporary alias for older links */}
        <Route path="/seo" element={<WebsiteMaintenance />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/ecommerce" element={<ECommerce />} />
        <Route path="/pc-repair" element={<PCRepair />} />
      </Routes>
    </div>
  )
}

export default App
