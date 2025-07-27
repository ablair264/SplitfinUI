import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';

// Lazy load view components
const OverviewView = lazy(() => import('../components/Dashboard/views/OverviewView'));
const RevenueView = lazy(() => import('../components/Dashboard/views/RevenueView'));
const OrdersView = lazy(() => import('../components/Dashboard/views/OrdersView'));
const ForecastingView = lazy(() => import('../components/Dashboard/views/ForecastingView'));

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
        <Route index element={
          <Suspense fallback={<ViewLoadingFallback />}>
            <OverviewView />
          </Suspense>
        } />
        <Route path="revenue" element={
          <Suspense fallback={<ViewLoadingFallback />}>
            <RevenueView />
          </Suspense>
        } />
        <Route path="orders" element={
          <Suspense fallback={<ViewLoadingFallback />}>
            <OrdersView />
          </Suspense>
        } />
        <Route path="forecasting" element={
          <Suspense fallback={<ViewLoadingFallback />}>
            <ForecastingView />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
};

export default DashboardDemo;
