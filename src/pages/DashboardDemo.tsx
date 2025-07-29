import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';

// Lazy load view components
const RevenueView = lazy(() => import('../components/Dashboard/views/RevenueView'));
const OrdersView = lazy(() => import('../components/Dashboard/views/OrdersView'));

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
  return (
    <Routes>
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
  );
};

export default DashboardDemo;
