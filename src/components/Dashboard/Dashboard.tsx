import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, Area, AreaChart
} from 'recharts';
import CountUp from 'react-countup';
import "./dashboard.css";
import { ProgressLoader } from './ProgressLoader';
import MetricCard from './shared/MetricCard';
import CardChart from './shared/CardChart';
import CardTable from './shared/CardTable';
import FullGraph from './shared/FullGraph';
import './shared/MetricCard.module.css';
import './shared/CardChart.module.css';
import './shared/CardTable.module.css';
import './shared/FullGraph.module.css';
import { TableCard } from './shared';
import AIInsightModal, { AIInsight } from './AIInsightModal';
import { useDashboard } from '../../hooks/useDashboard';
import DashboardHeader from './shared/DashboardHeader';
import { ColorProvider } from './shared/ColorProvider';
import { CacheStatus } from './CacheStatus';

// Type definitions
export interface DashboardData {
  metrics: DashboardMetrics;
  orders: DashboardOrder[];
  customers: DashboardCustomer[];
  invoices: DashboardInvoice[];
  agentPerformance?: DashboardAgentPerformance[];
  agents?: DashboardAgentPerformance[];
  salesAgents?: DashboardAgentPerformance[];
  brands: DashboardBrand[];
  brandPerformance?: DashboardBrand[];
  topItems: DashboardTopItem[];
  items?: DashboardTopItem[];
  products?: DashboardTopItem[];
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  outstandingInvoices: number;
  marketplaceOrders: number;
  [key: string]: number;
}

export interface DashboardCustomer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface DashboardOrder {
  id: string;
  customerId: string;
  customerName?: string;
  date: string;
  total: number;
  status: string;
  is_marketplace_order?: boolean;
  invoice_status?: string;
  line_items?: Array<{
    item_id?: string;
    product_id?: string;
    variant_id?: string;
    sku?: string;
    name?: string;
    item_name?: string;
    description?: string;
    brand?: string;
    brand_normalized?: string;
    quantity: number;
    total?: number;
    item_total?: number;
  }>;
}

export interface DashboardInvoice {
  id: string;
  customerName: string;
  amount: number;
  dueDate: string;
  status: string;
  daysPastDue?: number;
}

export interface DashboardAgentPerformance {
  id: string;
  name: string;
  totalSales: number;
  orderCount: number;
  conversionRate: number;
}

export interface DashboardBrand {
  name: string;
  revenue: number;
  quantity: number;
  orderCount: number;
}

export interface DashboardTopItem {
  id: string;
  name: string;
  brand: string;
  quantity: number;
  revenue: number;
  sku?: string;
}

// Lazy load view components
const OverviewView = lazy(() => import('./views/OverviewView'));
const OrdersView = lazy(() => import('./views/OrdersView'));
const RevenueView = lazy(() => import('./views/RevenueView'));
const InvoicesView = lazy(() => import('./views/InvoicesView'));
const BrandsView = lazy(() => import('./views/BrandsView'));
const ForecastingView = lazy(() => import('./views/ForecastingView'));

interface DashboardProps {
  userId?: string;
  apiEndpoint?: string;
  onDataLoad?: (data: DashboardData) => void;
  onError?: (error: string) => void;
  enableAIInsights?: boolean;
  enableCaching?: boolean;
  customMetrics?: Record<string, any>;
  theme?: 'dark' | 'light';
  defaultDateRange?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface AIInsightModalState {
  isOpen: boolean;
  insight: AIInsight | null;
  cardTitle: string;
  isLoading: boolean;
  enhanced?: boolean;
}

interface OrderFilters {
  brand?: string;
  salesAgent?: string;
  status?: string;
  sortBy?: 'value' | 'date';
  pageSize: number;
  currentPage: number;
}

interface InvoiceFilters {
  searchTerm: string;
  status?: string;
}

// Constants moved outside component
const CHART_COLORS = ['#48B79B', '#6B8E71', '#8B7355', '#A66B6B', '#7B9EA6', '#9B7B8F'];
const MULTICOLORED_PALETTE = [
  '#79d5e9',   // primary
  '#799de9',   // secondary
  '#79e9c5',   // tertiary
  '#FF9F00',   // fourth
  '#C96868',   // fifth
  '#4daeac',   // sixth
  '#61bc8e',   // seventh
  '#fbbf24',   // eighth
  '#dc2626',   // ninth
  '#8b5cf6',   // tenth
  '#ec4899'    // eleventh
];

// Utility function memoized outside component
const EmptyState = React.memo(({ message }: { message: string }) => (
  <div style={{
    padding: '2rem',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '0.875rem'
  }}>
    {message}
  </div>
));

// View loading fallback
const ViewLoadingFallback = () => (
  <ProgressLoader
    progress={50}
    message="Loading view..."
  />
);

const Dashboard: React.FC<DashboardProps> = ({
  userId = 'demo-user',
  apiEndpoint,
  onDataLoad,
  onError,
  enableAIInsights = true,
  enableCaching = true,
  customMetrics = {},
  theme = 'dark',
  defaultDateRange = '30_days',
  autoRefresh = false,
  refreshInterval = 300000 // 5 minutes
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize user preferences in one go
  const userPreferences = useMemo(() => {
    const stored = localStorage.getItem('dashboardPreferences');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse preferences:', e);
      }
    }
    return {
      metricDisplayMode: 'full',
      barChartColors: 'blue',
      chartDesign: 'table',
      cardVariants: {
        totalRevenue: 'variant1',
        totalOrders: 'variant2',
        activeCustomers: 'variant3',
        avgOrderValue: 'variant1',
        outstandingInvoices: 'variant2',
        marketplaceOrders: 'variant3',
      },
      graphColors: {
        primary: '#79d5e9',
        secondary: '#4daeac',
        tertiary: '#f77d11'
      }
    };
  }, []);

  // Consolidated state management
  const [dashboardState, setDashboardState] = useState({
    dateRange: defaultDateRange,
    isEditMode: false,
    metricDisplayMode: userPreferences.metricDisplayMode as 'full' | 'compact',
    barChartColors: (userPreferences.barChartColors === 'blue' ? 'primary' : 
                     userPreferences.barChartColors === 'orange' ? 'fourth' : 
                     userPreferences.barChartColors || 'primary') as 'primary' | 'secondary' | 'tertiary' | 'fourth' | 'fifth' | 'sixth' | 'seventh' | 'eighth' | 'ninth' | 'tenth' | 'eleventh' | 'multicolored',
    chartDesign: userPreferences.chartDesign as 'default' | 'horizontal-bars' | 'pie-with-legend' | 'table',
    cardVariants: userPreferences.cardVariants,
    graphColors: userPreferences.graphColors || {
      primary: '#79d5e9',
      secondary: '#4daeac',
      tertiary: '#f77d11'
    }
  });

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [aiInsightModal, setAiInsightModal] = useState<AIInsightModalState>({
    isOpen: false,
    insight: null,
    cardTitle: '',
    isLoading: false
  });
  
  const [orderFilters, setOrderFilters] = useState<OrderFilters>({
    pageSize: 10,
    currentPage: 1
  });

  const [invoiceFilters, setInvoiceFilters] = useState<InvoiceFilters>({
    searchTerm: '',
    status: undefined
  });
  
  // Mock data hook (replace with your actual data hook)
  const { data, loading, error, refresh, isStale, isCached, lastUpdated } = useDashboard({
    userId,
    dateRange: dashboardState.dateRange,
    autoRefresh,
    apiEndpoint,
    enableCaching
  });

  // Notify parent components of data changes
  useEffect(() => {
    if (data && onDataLoad) {
      onDataLoad(data);
    }
  }, [data, onDataLoad]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Memoized data extraction
  const { agents, brands, items, invoices } = useMemo(() => {
    if (!data) return { agents: [], brands: [], items: [], invoices: [] };
    
    let agents = data.agentPerformance || data.agents || data.salesAgents || [];
    let brands = data.brands || data.brandPerformance || [];
    let items = data.topItems || data.items || data.products || [];
    
    if (!Array.isArray(agents)) agents = [];
    if (!Array.isArray(brands)) brands = [];
    if (!Array.isArray(items)) items = [];
    
    // FALLBACK: If brands array is empty but we have orders, calculate brands from order line items
    if (brands.length === 0 && data.orders && data.orders.length > 0) {
      const brandMap = new Map();
      
      data.orders.forEach(order => {
        if (order.line_items && Array.isArray(order.line_items)) {
          order.line_items.forEach(item => {
            let brandName = item.brand_normalized || item.brand || 'Unknown';
            if (brandName.toLowerCase() === 'rder') {
              brandName = 'rader';
            }
            
            if (!brandMap.has(brandName)) {
              brandMap.set(brandName, {
                name: brandName,
                revenue: 0,
                quantity: 0,
                orderCount: 0
              });
            }
            const brand = brandMap.get(brandName);
            brand.revenue += item.total || item.item_total || 0;
            brand.quantity += item.quantity || 0;
            brand.orderCount += 1;
          });
        }
      });
      
      brands = Array.from(brandMap.values()).sort((a, b) => b.revenue - a.revenue);
    }
    
    // FALLBACK: If items array is empty but we have orders, calculate items from order line items
    if (items.length === 0 && data.orders && data.orders.length > 0) {
      const itemMap = new Map();
      
      data.orders.forEach(order => {
        if (order.line_items && Array.isArray(order.line_items)) {
          order.line_items.forEach(item => {
            const itemId = item.item_id || item.product_id || item.variant_id || item.sku;
            if (!itemId) return;
            
            if (!itemMap.has(itemId)) {
              let brandName = item.brand_normalized || item.brand || 'Unknown';
              if (brandName.toLowerCase() === 'rder') {
                brandName = 'rader';
              }
              
              itemMap.set(itemId, {
                id: itemId,
                name: item.name || item.item_name || item.description || 'Unknown Item',
                brand: brandName,
                quantity: 0,
                revenue: 0,
                sku: item.sku || ''
              });
            }
            const aggregatedItem = itemMap.get(itemId);
            aggregatedItem.quantity += Number(item.quantity) || 0;
            aggregatedItem.revenue += Number(item.total || item.item_total) || 0;
          });
        }
      });
      
      items = Array.from(itemMap.values())
        .map(item => ({
          ...item,
          quantity: Math.round(item.quantity),
          revenue: Math.round(item.revenue)
        }))
        .sort((a, b) => b.revenue - a.revenue);
    }
    
    // Handle invoices - it should always be an array
    let invoices: DashboardInvoice[] = [];
    if (Array.isArray(data.invoices)) {
      invoices = data.invoices;
    }
    
    return { agents, brands, items, invoices };
  }, [data]);

  // Memoized chart data generation
  const chartDataCache = useMemo(() => {
    if (!data?.orders || data.orders.length === 0) {
      // Generate fallback data if no orders
      const fallbackData = Array.from({ length: 7 }, (_, i) => ({
        name: `${22 + i}/07`,
        value: 1000 + Math.floor(Math.random() * 2000)
      }));
      
      return {
        revenue: fallbackData.map(d => ({ ...d, value: d.value * 10 })),
        orders: fallbackData.map(d => ({ ...d, value: Math.floor(d.value / 100) })),
        avgOrder: fallbackData.map(d => ({ ...d, value: Math.floor(d.value / 3) })),
        customers: fallbackData.map(d => ({ ...d, value: Math.floor(d.value / 50) })),
        invoices: fallbackData.map(d => ({ ...d, value: d.value * 2 })),
        marketplace: fallbackData.map(d => ({ ...d, value: Math.floor(d.value / 200) }))
      };
    }
    
    const generateData = (metricType: string) => {
      const sortedOrders = [...data.orders].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      const last30Orders = sortedOrders.slice(-30);
      
      const aggregatedData = last30Orders.reduce((acc: Record<string, { date: string; value?: number; count?: number }>, order) => {
        const date = new Date(order.date).toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: '2-digit' 
        });
        
        if (!acc[date]) {
          acc[date] = { date, value: 0, count: 0 };
        }
        
        switch (metricType) {
          case 'revenue':
            acc[date].value = (acc[date].value || 0) + (order.total || 0);
            break;
          case 'orders':
            acc[date].count = (acc[date].count || 0) + 1;
            break;
          case 'avgOrder':
            acc[date].value = (acc[date].value || 0) + (order.total || 0);
            acc[date].count = (acc[date].count || 0) + 1;
            break;
          case 'customers':
            // For customers, generate a progressive count
            acc[date].count = Math.floor(data.metrics?.totalCustomers * (0.8 + Math.random() * 0.2));
            break;
          case 'invoices':
            if (order.invoice_status === 'outstanding') {
              acc[date].value = (acc[date].value || 0) + (order.total || 0);
            }
            break;
          case 'marketplace':
            if (order.is_marketplace_order) {
              acc[date].count = (acc[date].count || 0) + 1;
            }
            break;
        }
        
        return acc;
      }, {});
      
      const days = Object.values(aggregatedData).sort((a, b) => {
        const dateA = a.date.split('/').reverse().join('');
        const dateB = b.date.split('/').reverse().join('');
        return dateA.localeCompare(dateB);
      });
      
      return days.map(day => ({
        name: day.date,
        value: metricType === 'orders' || metricType === 'marketplace' ? (day.count || 0) : 
               metricType === 'avgOrder' && (day.count || 0) > 0 ? Math.round((day.value || 0) / (day.count || 1)) : 
               metricType === 'customers' ? (day.count || 0) :
               Math.round(day.value || 0)
      }));
    };

    return {
      revenue: generateData('revenue'),
      orders: generateData('orders'),
      avgOrder: generateData('avgOrder'),
      customers: generateData('customers'),
      invoices: generateData('invoices'),
      marketplace: generateData('marketplace')
    };
  }, [data?.orders, data?.metrics]);
  
  const calculatePreviousValue = (metricType: string): number => {
    // Calculate previous period value based on dateRange
    const currentValue = data?.metrics?.[metricType] || 0;
    
    switch (dashboardState.dateRange) {
      case '7_days':
        return currentValue * 0.95; // Estimate based on growth patterns
      case '30_days':
        return currentValue * 0.88;
      case '90_days':
        return currentValue * 0.75;
      default:
        return currentValue * 0.9;
    }
  };

  const extractRecentTrends = (metricType: string) => {
    if (!data?.orders) return { day7: 0, day14: 0, day30: 0 };
    
    const now = new Date();
    const day7Ago = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const day14Ago = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const day30Ago = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Calculate metrics for different periods
    const calculateMetricForPeriod = (startDate: Date) => {
      return data.orders
        .filter(order => new Date(order.date) >= startDate)
        .reduce((sum, order) => {
          switch (metricType) {
            case 'totalRevenue':
              return sum + (order.total || 0);
            case 'totalOrders':
              return sum + 1;
            case 'averageOrderValue':
              return sum + (order.total || 0);
            default:
              return sum;
          }
        }, 0);
    };
    
    return {
      day7: calculateMetricForPeriod(day7Ago),
      day14: calculateMetricForPeriod(day14Ago),
      day30: calculateMetricForPeriod(day30Ago)
    };
  };

  const getCurrentSeason = (): string => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  // Memoized helper functions
  const getBarChartColors = useCallback(() => {
    const colorMap = {
      primary: dashboardState.graphColors.primary,
      secondary: '#799de9',
      tertiary: '#79e9c5',
      fourth: '#FF9F00',
      fifth: '#C96868',
      sixth: '#4daeac',
      seventh: '#61bc8e',
      eighth: '#fbbf24',
      ninth: '#dc2626',
      tenth: '#8b5cf6',
      eleventh: '#ec4899'
    };
    
    if (dashboardState.barChartColors === 'multicolored') {
      return MULTICOLORED_PALETTE;
    }
    
    return [colorMap[dashboardState.barChartColors] || dashboardState.graphColors.primary];
  }, [dashboardState.barChartColors, dashboardState.graphColors]);

  const getMetricCardColor = useCallback((index: number = 0) => {
    const colorMap = {
      primary: dashboardState.graphColors.primary,
      secondary: '#799de9',
      tertiary: '#79e9c5',
      fourth: '#FF9F00',
      fifth: '#C96868',
      sixth: '#4daeac',
      seventh: '#61bc8e',
      eighth: '#fbbf24',
      ninth: '#dc2626',
      tenth: '#8b5cf6',
      eleventh: '#ec4899'
    };
    
    if (dashboardState.barChartColors === 'multicolored') {
      return MULTICOLORED_PALETTE[index % MULTICOLORED_PALETTE.length];
    }
    
    return colorMap[dashboardState.barChartColors] || dashboardState.graphColors.primary;
  }, [dashboardState.barChartColors, dashboardState.graphColors]);

  const calculateTrendFromPrevious = useCallback((current: number, previous: number): {
    value: number;
    isPositive: boolean;
  } | undefined => {
    if (!previous || previous === 0) return undefined;
    const percentageChange = ((current - previous) / previous) * 100;
    return {
      value: Math.round(Math.abs(percentageChange)),
      isPositive: percentageChange > 0
    };
  }, []);

  const prepareRevenueOrderData = useMemo(() => {
    if (!data?.orders) return [];
    
    return data.orders
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .reduce((acc, order) => {
        const date = new Date(order.date).toISOString().split('T')[0];
        const existing = acc.find(d => d.date === date);
        if (existing) {
          existing.orders += 1;
          existing.revenue += order.total;
        } else {
          acc.push({ date, orders: 1, revenue: order.total });
        }
        return acc;
      }, [] as { date: string; orders: number; revenue: number }[])
      .slice(-30);
  }, [data?.orders]);

  // AI Insights handler (configurable)
  const handleAIInsight = useCallback(async (cardTitle: string, metricType: string) => {
    if (!enableAIInsights) {
      console.log('AI Insights disabled');
      return;
    }

    setAiInsightModal({
      isOpen: true,
      insight: null,
      cardTitle,
      isLoading: true,
      enhanced: true
    });

    try {
      // Mock AI insight for demo purposes
      // Replace with your actual AI service integration
      const mockInsight: AIInsight = {
        insight: `Based on your ${metricType} data, there's been a ${Math.floor(Math.random() * 20) + 5}% increase compared to last period. This trend suggests strong performance in your current market segment.`,
        trend: 'increasing',
        action: `Consider expanding your ${metricType.includes('revenue') ? 'high-performing product lines' : 'customer acquisition efforts'} to capitalize on this positive momentum.`,
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
        impact: 'Performance is trending positively with significant growth opportunities.'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAiInsightModal(prev => ({ 
        ...prev, 
        insight: mockInsight, 
        isLoading: false, 
        enhanced: true 
      }));

    } catch (error) {
      console.error('Error getting AI insight:', error);
      
      // Fallback UI for any error
      setAiInsightModal({
        isOpen: true,
        insight: {
          insight: 'Unable to generate insights at this time.',
          trend: 'unavailable',
          action: 'An error occurred while fetching the analysis. Please try again later.',
          priority: 'medium',
          impact: 'Analysis temporarily unavailable'
        },
        cardTitle,
        isLoading: false
      });
    }
  }, [enableAIInsights, data, userId, dashboardState.dateRange, agents, brands]);

  const handleInvoiceReminder = useCallback(async (invoiceId: string, customerEmail: string) => {
    try {
      // Mock reminder functionality
      console.log(`Sending reminder for invoice ${invoiceId} to ${customerEmail}`);
      
      // Replace with your actual reminder service
      if (apiEndpoint) {
        await fetch(`${apiEndpoint}/api/invoices/remind`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-ID': userId
          },
          body: JSON.stringify({
            invoiceId,
            customerEmail
          })
        });
      }
    } catch (error) {
      console.error('Failed to send reminder:', error);
    }
  }, [userId, apiEndpoint]);

  // Update dashboard state helper
  const updateDashboardState = useCallback((updates: Partial<typeof dashboardState>) => {
    setDashboardState(prev => ({ ...prev, ...updates }));
  }, []);

  // Save preferences to localStorage (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('dashboardPreferences', JSON.stringify({
        metricDisplayMode: dashboardState.metricDisplayMode,
        barChartColors: dashboardState.barChartColors,
        chartDesign: dashboardState.chartDesign,
        cardVariants: dashboardState.cardVariants,
        graphColors: dashboardState.graphColors
      }));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [dashboardState.metricDisplayMode, dashboardState.barChartColors, dashboardState.chartDesign, dashboardState.cardVariants, dashboardState.graphColors]);

  // Loading progress effect
  useEffect(() => {
    if (loading) {
      setLoadingProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10 + 5;
        if (progress >= 90) {
          progress = 90;
          setLoadingProgress(progress);
          clearInterval(interval);
        } else {
          setLoadingProgress(progress);
        }
      }, 350);
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
    }
  }, [loading]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(() => {
        refresh();
      }, refreshInterval);
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, refresh]);

  // Prepare props for views
  const viewProps = useMemo(() => ({
    data,
    agents,
    brands,
    items,
    invoices,
    dashboardState,
    chartDataCache,
    getBarChartColors: getBarChartColors(),
    getMetricCardColor,
    calculateTrendFromPrevious,
    prepareRevenueOrderData,
    handleAIInsight,
    handleInvoiceReminder,
    updateDashboardState,
    navigate,
    orderFilters,
    setOrderFilters,
    invoiceFilters,
    setInvoiceFilters,
    EmptyState,
    graphColors: dashboardState.graphColors,
    customMetrics,
    enableAIInsights
  }), [
    data, agents, brands, items, invoices, dashboardState,
    chartDataCache, getBarChartColors, getMetricCardColor, calculateTrendFromPrevious,
    prepareRevenueOrderData, handleAIInsight, handleInvoiceReminder,
    updateDashboardState, navigate, orderFilters, invoiceFilters,
    customMetrics, enableAIInsights
  ]);

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <ProgressLoader
          progress={loadingProgress}
          messages={[
            'Loading Dashboard..',
            'Fetching Orders..',
            'Fetching Invoices..',
            'Fetching Customer Data..',
            'Calculating Statistics..'
          ]}
        />
        <div className="loading-content" style={{ display: 'none' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-content">
          <span className="error-icon">⚠️</span>
          <h2>Unable to load dashboard</h2>
          <p>{error}</p>
          <button onClick={refresh} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard-wrapper ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`} style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="enhanced-dashboard brand-manager-view">
        {/* Dashboard Header */}
        <DashboardHeader
          title="Dashboard"
          subtitle="Business Analytics Overview"
          dateRange={dashboardState.dateRange}
          onDateRangeChange={(value) => updateDashboardState({ dateRange: value })}
          isEditMode={dashboardState.isEditMode}
          onEditModeToggle={() => updateDashboardState({ isEditMode: !dashboardState.isEditMode })}
          onRefresh={refresh}
          metricDisplayMode={dashboardState.metricDisplayMode}
          onMetricDisplayModeChange={(value) => updateDashboardState({ metricDisplayMode: value })}
          barChartColors={dashboardState.barChartColors}
          onBarChartColorsChange={(value) => updateDashboardState({ barChartColors: value })}
          chartDesign={dashboardState.chartDesign}
          onChartDesignChange={(value) => updateDashboardState({ chartDesign: value })}
        />
        
        {/* Cache Status Component - Only show in edit mode */}
        {dashboardState.isEditMode && enableCaching && (
          <CacheStatus 
            userId={userId}
            dateRange={dashboardState.dateRange}
            onCacheCleared={() => refresh()}
          />
        )}

        <div className="view-content">
          <div className="dashboard-content-wrapper">
            {/* Wrap with ColorProvider and render Outlet for child routes */}
            <ColorProvider 
              barChartColors={dashboardState.barChartColors}
              graphColors={dashboardState.graphColors}
            >
              <Suspense fallback={<ViewLoadingFallback />}>
                <Outlet context={viewProps} />
              </Suspense>
            </ColorProvider>
          </div>
        </div>
      </div>

      {enableAIInsights && (
        <AIInsightModal
          isOpen={aiInsightModal.isOpen}
          onClose={() => setAiInsightModal(prev => ({ ...prev, isOpen: false }))}
          cardTitle={aiInsightModal.cardTitle}
          insight={aiInsightModal.insight}
          isLoading={aiInsightModal.isLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;