import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CustomersManagement from './components/CustomersManagement';
import CustomerMapGoogle from './components/CustomerMapGoogle';
import ComponentShowcase from './components/ComponentShowcase';
import SimpleShowcase from './components/SimpleShowcase';
import AIInsightModal from './components/AIInsightModal';

// Demo guard component
const DemoGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const demoUser = localStorage.getItem('demoUser');
  
  if (!demoUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SimpleShowcase />} />
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="/simple" element={<SimpleShowcase />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Demo Routes */}
        <Route path="/dashboard/*" element={
          <DemoGuard>
            <MasterLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/:view" element={<Dashboard />} />
              </Routes>
            </MasterLayout>
          </DemoGuard>
        } />
        
        <Route path="/customers/*" element={
          <DemoGuard>
            <MasterLayout>
              <Routes>
                <Route path="/" element={<CustomersManagement />} />
                <Route path="/map" element={<CustomerMapGoogle />} />
                <Route path="/new" element={<div style={{ padding: '2rem', color: 'white' }}>Add New Customer Form</div>} />
                <Route path="/:id" element={<div style={{ padding: '2rem', color: 'white' }}>Customer Detail View</div>} />
              </Routes>
            </MasterLayout>
          </DemoGuard>
        } />
        
        <Route path="/analytics/*" element={
          <DemoGuard>
            <MasterLayout>
              <Routes>
                <Route path="/metrics" element={<div style={{ padding: '2rem', color: 'white' }}>Analytics Metrics</div>} />
                <Route path="/reports" element={<div style={{ padding: '2rem', color: 'white' }}>Analytics Reports</div>} />
                <Route path="/insights" element={<div style={{ padding: '2rem', color: 'white' }}>AI Insights</div>} />
              </Routes>
            </MasterLayout>
          </DemoGuard>
        } />
        
        <Route path="/components/*" element={
          <DemoGuard>
            <MasterLayout>
              <Routes>
                <Route path="/cards" element={<div style={{ padding: '2rem', color: 'white' }}>Card Components</div>} />
                <Route path="/buttons" element={<div style={{ padding: '2rem', color: 'white' }}>Button Components</div>} />
                <Route path="/modals" element={<div style={{ padding: '2rem', color: 'white' }}>Modal Components</div>} />
                <Route path="/charts" element={<div style={{ padding: '2rem', color: 'white' }}>Chart Components</div>} />
              </Routes>
            </MasterLayout>
          </DemoGuard>
        } />
        
        <Route path="/settings/*" element={
          <DemoGuard>
            <MasterLayout>
              <Routes>
                <Route path="/general" element={<div style={{ padding: '2rem', color: 'white' }}>General Settings</div>} />
                <Route path="/profile" element={<div style={{ padding: '2rem', color: 'white' }}>Profile Settings</div>} />
                <Route path="/notifications" element={<div style={{ padding: '2rem', color: 'white' }}>Notification Settings</div>} />
                <Route path="/security" element={<div style={{ padding: '2rem', color: 'white' }}>Security Settings</div>} />
              </Routes>
            </MasterLayout>
          </DemoGuard>
        } />
        
        {/* Fallback routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;