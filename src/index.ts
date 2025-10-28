// Silkr - Modern React Dashboard Components
// Core Dashboard Components
export { default as MetricCard } from './components/Dashboard/shared/MetricCard';
export { default as MetricCardSquare } from './components/Dashboard/shared/MetricCardSquare';
export { default as CardChart } from './components/Dashboard/shared/CardChart';
export { default as CardTable } from './components/Dashboard/shared/CardTable';
export { default as TableCard } from './components/Dashboard/shared/TableCard';
export { default as DataTable } from './components/Dashboard/shared/DataTable';
export { default as FullGraph } from './components/Dashboard/shared/FullGraph';
export { default as DashboardHeader } from './components/Dashboard/shared/DashboardHeader';
export { default as SocialMetricCard } from './components/Dashboard/shared/SocialMetricCard';
export { ProgressLoader } from './components/Dashboard/shared/ProgressLoader';
export { default as MetricIcon } from './components/Dashboard/shared/MetricIcon';

// Layout Components
export { default as MasterLayout } from './layouts/MasterLayout';
export { default as Breadcrumb } from './components/Breadcrumb';

// Customer Management Components
export { default as CustomersManagement } from './components/CustomersManagement/CustomersManagement';
export { default as CustomerDetail } from './components/CustomerDetail/CustomerDetail';
export { CustomerMapGoogle, CustomerMapFallback } from './components/CustomerMap';

// Utility Components
export { ColorProvider } from './components/Dashboard/shared/ColorProvider';
export { default as NotificationCenter } from './components/NotificationCenter';
export { default as Login } from './components/Login/Login';

// Hooks
export { useDashboard } from './hooks/useDashboard';
export { useDeviceDetection } from './hooks/useDeviceDetection';
export { useProgressTracking } from './hooks/useProgressTracking';

// Types
export type { 
  DashboardData,
  DashboardMetrics,
  DashboardCustomer,
  DashboardOrder,
  DashboardInvoice,
  DashboardBrand
} from './types/dashboard';

// Utils
export { formatNumber, formatCurrency, formatPercentage, formatDate } from './utils/formatters';