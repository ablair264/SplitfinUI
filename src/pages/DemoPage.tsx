import React, { useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { FaChartLine, FaChartBar, FaDollarSign, FaShoppingCart, FaFileInvoice, FaTags, FaUsers, FaMapMarkedAlt, FaKey, FaMap } from 'react-icons/fa'
import DashboardDemo from './DashboardDemo'
import Login from '../components/Login/Login'
import MasterLayout from '../layouts/MasterLayout'
import CustomersManagement from '../components/CustomersManagement/CustomersManagement'
import CustomerMapGoogle from '../components/CustomerMap/CustomerMapGoogle'
import { Customer, MapCustomer } from '../components/CustomersManagement/types'
// Import demo-specific styles only
import './DemoPage.css'
import './DemoPageClean.css'

// Mock data generator
const generateCustomerData = (): Customer[] => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `customer-${i + 1}`,
    name: `${['Acme', 'Tech', 'Global', 'Prime'][i % 4]} Customer ${i + 1}`,
    companyName: `${['Acme Corp', 'Tech Industries', 'Global Solutions', 'Prime Services'][i % 4]} Ltd`,
    email: `contact${i + 1}@company.com`,
    phone: `+44 20 ${7000 + i} ${1000 + i}`,
    city: ['London', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast'][i % 5],
    postcode: `SW${(i % 20) + 1} ${(i % 9) + 1}AA`,
    region: ['London', 'North West', 'Scotland', 'Wales', 'Northern Ireland'][i % 5],
    status: ['active', 'inactive', 'pending'][i % 3] as 'active' | 'inactive' | 'pending',
    createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastModifiedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalSpent: Math.floor(Math.random() * 100000),
    orderCount: Math.floor(Math.random() * 50),
    lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

// Convert Customer to MapCustomer
const convertToMapCustomer = (customer: Customer): MapCustomer => {
  const regionCoords: Record<string, { lat: number; lng: number }> = {
    'London': { lat: 51.5074, lng: -0.1278 },
    'North West': { lat: 53.7632, lng: -2.7044 },
    'Scotland': { lat: 56.4907, lng: -4.2026 },
    'Wales': { lat: 52.1307, lng: -3.7837 },
    'Northern Ireland': { lat: 54.5973, lng: -5.9301 }
  };
  
  const baseCoord = regionCoords[customer.region || 'London'] || regionCoords['London'];
  
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    postcode: customer.postcode || '',
    coordinates: {
      latitude: baseCoord.lat + (Math.random() - 0.5) * 0.5,
      longitude: baseCoord.lng + (Math.random() - 0.5) * 0.5
    },
    region: customer.region,
    totalSpent: customer.totalSpent,
    orderCount: customer.orderCount,
    lastOrderDate: customer.lastOrderDate
  };
};

const DemoPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [customers] = useState<Customer[]>(generateCustomerData())
  
  // Ensure body can scroll on demo pages
  React.useEffect(() => {
    document.body.classList.add('demo-active')
    document.body.style.overflow = 'auto'
    
    return () => {
      document.body.classList.remove('demo-active')
      document.body.style.overflow = ''
    }
  }, [])
  
  const demos = [
    {
      id: 'login',
      path: '/demo/login',
      title: 'Login',
      icon: <FaKey />
    },
    {
      id: 'dashboard',
      path: '/demo/dashboard',
      title: 'Dashboard',
      icon: <FaChartLine />
    },
    {
      id: 'customers',
      path: '/demo/customers',
      title: 'Customers',
      icon: <FaUsers />
    },
  ]

  const currentDemo = demos.find(demo => location.pathname.startsWith(demo.path))

  return (
    <div className="demo-page-fullscreen">
      {/* Clean Navigation Bar */}
      <nav className="demo-top-nav">
        <div className="demo-nav-left">
          <Link to="/" className="demo-back-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
          <span className="demo-nav-separator">|</span>
          <span className="demo-nav-title">Live Component Demo</span>
        </div>
        
        <div className="demo-nav-center">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              to={demo.path}
              className={`demo-nav-link ${currentDemo?.id === demo.id ? 'active' : ''}`}
            >
              {demo.title}
            </Link>
          ))}
        </div>
        
        <div className="demo-nav-right">
          <Link to="/#pricing" className="demo-get-started">
            Get Components
          </Link>
        </div>
      </nav>

      {/* Full Screen Demo Content */}
      <div className="demo-fullscreen-content">
        <Routes>
          <Route path="/" element={
            <div className="demo-welcome-screen">
              <h1>Welcome to Split UI Demo</h1>
              <p>Select a component from the navigation above to see it in action</p>
              <div className="demo-quick-links">
                {demos.map((demo) => (
                  <Link
                    key={demo.id}
                    to={demo.path}
                    className="demo-quick-link"
                  >
                    <span className="demo-quick-icon">{demo.icon}</span>
                    <span>{demo.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          } />
          
          {/* Login Demo - Centered */}
          <Route path="login" element={
            <div className="demo-login-centered">
              <Login
                subtitle="Experience our premium login component"
                onLogin={async (email, password) => {
                  console.log('Demo login:', { email, password })
                  alert('Login successful! (This is a demo)')
                }}
                onSocialLogin={async (provider) => {
                  console.log('Demo social login:', provider)
                  alert(`${provider} login successful! (This is a demo)`)
                }}
                showDemoHint={true}
                demoCredentials={{
                  email: 'demo@splitui.com',
                  password: 'demo123'
                }}
              />
            </div>
          } />
          
          {/* Dashboard Demo - Full Screen */}
          <Route path="dashboard/*" element={
            <MasterLayout
              user={{
                id: 'demo-user',
                name: 'Demo User',
                email: 'demo@splitui.com',
                role: 'admin',
                avatar: undefined,
                initials: 'DU'
              }}
              navigationSections={[
                {
                  id: 'dashboard',
                  label: 'Dashboard',
                  icon: <FaChartLine />,
                  links: [
                    { to: '/demo/dashboard/orders', label: 'Orders', icon: <FaShoppingCart /> },
                    { to: '/demo/dashboard/revenue', label: 'Revenue', icon: <FaDollarSign /> }
                  ]
                },
                {
                  id: 'customers',
                  label: 'Customers',
                  icon: <FaUsers />,
                  links: [
                    { to: '/demo/customers', label: 'View All Customers', icon: <FaUsers /> }
                  ]
                }
              ]}
              logoSrc="/splitui.png"
              showThemeSelector={true}
              enableBreadcrumbs={true}
              unreadMessagesCount={3}
              unreadNotificationsCount={5}
            >
              <DashboardDemo />
            </MasterLayout>
          } />
          
          {/* Customers Demo - Full Screen */}
          <Route path="customers" element={
            <MasterLayout
              user={{
                id: 'demo-user',
                name: 'Demo User',
                email: 'demo@splitui.com',
                role: 'admin',
                avatar: undefined,
                initials: 'DU'
              }}
              navigationSections={[
                {
                  id: 'dashboard',
                  label: 'Dashboard',
                  icon: <FaChartLine />,
                  to: '/demo/dashboard'
                },
                {
                  id: 'customers',
                  label: 'Customers',
                  icon: <FaUsers />,
                  links: [
                    { to: '/demo/customers', label: 'View All Customers', icon: <FaUsers /> }
                  ]
                }
              ]}
              logoSrc="/splitui.png"
              showThemeSelector={true}
              enableBreadcrumbs={true}
            >
              <CustomersManagement customers={customers} />
            </MasterLayout>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default DemoPage