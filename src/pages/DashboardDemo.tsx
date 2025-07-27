import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import OverviewView from '../components/Dashboard/views/OverviewView';
import RevenueView from '../components/Dashboard/views/RevenueView';
import OrdersView from '../components/Dashboard/views/OrdersView';
import ForecastingView from '../components/Dashboard/views/ForecastingView';

const DashboardDemo: React.FC = () => {
  const location = useLocation();
  
  // Debug: Check current path
  console.log('Dashboard Demo - Current path:', location.pathname);
  
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />}>
        <Route index element={<OverviewView />} />
        <Route path="revenue" element={<RevenueView />} />
        <Route path="orders" element={<OrdersView />} />
        <Route path="forecasting" element={<ForecastingView />} />
      </Route>
    </Routes>
  );
};

export default DashboardDemo;
