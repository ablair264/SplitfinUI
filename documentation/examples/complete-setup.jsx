// Complete Dashboard Setup Example
// This example shows how to set up a full dashboard with authentication

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MasterLayout from './components/layouts/MasterLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import CustomersManagement from './components/CustomersManagement/CustomersManagement';
import CustomerMap from './components/CustomerMap/CustomerMap';

// Custom navigation configuration
const navigationSections = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <ChartLineIcon />,
    links: [
      { to: '/dashboard', label: 'Overview', icon: <HomeIcon /> },
      { to: '/dashboard/revenue', label: 'Revenue', icon: <PoundIcon /> },
      { to: '/dashboard/orders', label: 'Orders', icon: <ShoppingCartIcon /> },
      { to: '/dashboard/invoices', label: 'Invoices', icon: <FileInvoiceIcon /> }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: <UsersIcon />,
    links: [
      { to: '/customers', label: 'All Customers', icon: <UsersIcon /> },
      { to: '/customers/map', label: 'Customer Map', icon: <MapIcon /> },
      { to: '/customers/new', label: 'Add Customer', icon: <UserPlusIcon /> }
    ]
  },
  {
    id: 'products',
    label: 'Products',
    icon: <BoxIcon />,
    links: [
      { to: '/products', label: 'Catalogue', icon: <GridIcon /> },
      { to: '/products/inventory', label: 'Inventory', icon: <WarehouseIcon /> },
      { to: '/products/categories', label: 'Categories', icon: <TagIcon /> }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    links: [
      { to: '/settings/profile', label: 'Profile', icon: <UserIcon /> },
      { to: '/settings/company', label: 'Company', icon: <BuildingIcon /> },
      { to: '/settings/billing', label: 'Billing', icon: <CreditCardIcon /> }
    ]
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Verify token with your API
          const response = await fetch('/api/auth/verify', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle login
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { token, user } = await response.json();
      localStorage.setItem('authToken', token);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider) => {
    try {
      // Implement OAuth flow
      window.location.href = `/api/auth/${provider}`;
    } catch (error) {
      throw error;
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading SplitfinUI...</p>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <Login
        onLogin={handleLogin}
        onSocialLogin={handleSocialLogin}
        logoSrc="/logos/your-logo.png"
        title="Welcome Back"
        subtitle="Sign in to access your dashboard"
        showDemoHint={true}
        demoCredentials={{
          email: 'demo@splitfin.com',
          password: 'demo123'
        }}
      />
    );
  }

  // Authenticated app
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MasterLayout
              user={user}
              navigationSections={navigationSections}
              onLogout={handleLogout}
              logoSrc="/logos/your-logo.png"
              showThemeSelector={true}
              enableBreadcrumbs={true}
            />
          }
        >
          {/* Redirect root to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard routes */}
          <Route path="dashboard/*" element={<DashboardRoutes userId={user.id} />} />
          
          {/* Customer routes */}
          <Route path="customers" element={<CustomersManagement />} />
          <Route path="customers/map" element={<CustomerMap />} />
          <Route path="customers/new" element={<AddCustomer />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          
          {/* Other routes */}
          <Route path="products/*" element={<ProductRoutes />} />
          <Route path="settings/*" element={<SettingsRoutes />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Dashboard Routes Component
function DashboardRoutes({ userId }) {
  return (
    <Dashboard
      userId={userId}
      enableAIInsights={true}
      enableCaching={true}
      theme="dark"
      autoRefresh={false}
      refreshInterval={300000}
    />
  );
}

// Placeholder components
function AddCustomer() {
  return <div>Add Customer Form</div>;
}

function CustomerDetail() {
  const { id } = useParams();
  return <div>Customer Detail for ID: {id}</div>;
}

function ProductRoutes() {
  return <div>Product Management</div>;
}

function SettingsRoutes() {
  return <div>Settings</div>;
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
}

export default App;