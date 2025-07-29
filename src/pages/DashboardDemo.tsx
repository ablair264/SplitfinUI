import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FaChartLine, FaShoppingCart, FaDollarSign, FaUsers, FaFileAlt } from 'react-icons/fa';
import Dashboard from '../components/Dashboard/Dashboard';
import MasterLayout from '../layouts/MasterLayout';
import CustomersManagement from '../components/CustomersManagement/CustomersManagement';
import { Customer } from '../components/CustomersManagement/types';

// Lazy load view components
const RevenueView = lazy(() => import('../components/Dashboard/views/RevenueView'));
const OrdersView = lazy(() => import('../components/Dashboard/views/OrdersView'));

// Mock data generator for customers
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

// Loading fallback
const ViewLoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100%', 
    color: 'var(--text-secondary)' 
  }}>
    Loading view...
  </div>
);

const DashboardDemo: React.FC = () => {
  const [customers] = useState<Customer[]>(generateCustomerData());

  return (
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
            { to: '/dashboard-demo/orders', label: 'Orders', icon: <FaShoppingCart /> },
            { to: '/dashboard-demo/revenue', label: 'Revenue', icon: <FaDollarSign /> }
          ]
        },
        {
          id: 'customers',
          label: 'Customers',
          icon: <FaUsers />,
          to: '/dashboard-demo/customers'
        },
        {
          id: 'pricing',
          label: 'Pricing',
          icon: <FaFileAlt />,
          to: '/'
        }
      ]}
      logoSrc="/splitui.png"
      showThemeSelector={true}
      enableBreadcrumbs={true}
      unreadMessagesCount={3}
      unreadNotificationsCount={5}
    >
      <Routes>
        <Route path="/customers" element={<CustomersManagement customers={customers} />} />
        <Route path="/*" element={<Dashboard />}>
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders" element={
            <Suspense fallback={<ViewLoadingFallback />}>
              <OrdersView />
            </Suspense>
          } />
          <Route path="revenue" element={
            <Suspense fallback={<ViewLoadingFallback />}>
              <RevenueView />
            </Suspense>
          } />
        </Route>
      </Routes>
    </MasterLayout>
  );
};

export default DashboardDemo;
