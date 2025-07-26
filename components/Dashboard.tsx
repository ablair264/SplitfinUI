import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, Area, AreaChart
} from 'recharts';
import CountUp from 'react-countup';
import "./dashboard.css";
import Lottie from 'lottie-react';
import loaderAnimation from '../loader.json'; 
import { ProgressLoader } from './ProgressLoader';
import MetricCard from './shared/MetricCard';
import CardChart from './shared/CardChart';
import CardTable from './shared/CardTable';
import FullGraph from './shared/FullGraph';
import './shared/MetricCard.module.css';
import './shared/CardChart.module.css';
import './shared/CardTable.module.css';
import './shared/FullGraph.module.css';
import './shared/SegmentedButtonGroup.module.css';
import { TableCard } from './shared';
import AIInsightModal, { AIInsight } from './AIInsightModal';
import DashboardHeader from './shared/DashboardHeader';
import { ColorProvider } from './shared/ColorProvider';
import { generateMockDashboardData, generateMockAIInsight } from '../utils/mockData';

// Types
interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  previousPeriodRevenue: number;
  previousPeriodOrders: number;
  previousPeriodCustomers: number;
  previousPeriodAvgOrderValue: number;
  outstandingInvoices: number;
  outstandingAmount: number;
  marketplaceOrders: number;
  marketplaceRevenue: number;
}

interface AIInsightModalState {
  isOpen: boolean;
  insight: AIInsight | null;
  cardTitle: string;
  isLoading: boolean;
  enhanced?: boolean;
}

// Constants
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

// Utility components
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

const Dashboard: React.FC = () => {
  const { view = 'overview' } = useParams<{ view?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('30_days');
  const [isEditMode, setIsEditMode] = useState(false);
  const [metricDisplayMode, setMetricDisplayMode] = useState<'full' | 'compact'>('full');
  const [aiModalState, setAiModalState] = useState<AIInsightModalState>({
    isOpen: false,
    insight: null,
    cardTitle: '',
    isLoading: false,
    enhanced: false
  });

  // Dashboard customization state
  const [barChartColors, setBarChartColors] = useState<string>(() => 
    localStorage.getItem('dashboardBarChartColors') || 'primary'
  );
  const [chartDesign, setChartDesign] = useState<string>(() => 
    localStorage.getItem('dashboardChartDesign') || 'default'
  );
  const [cardVariants, setCardVariants] = useState(() => {
    const saved = localStorage.getItem('dashboardCardVariants');
    return saved ? JSON.parse(saved) : {
      totalRevenue: 'variant1',
      totalOrders: 'variant2',
      activeCustomers: 'variant3',
      avgOrderValue: 'variant1',
      outstandingInvoices: 'variant2',
      marketplaceOrders: 'variant3',
    };
  });
  const [graphColors, setGraphColors] = useState(() => {
    const saved = localStorage.getItem('dashboardGraphColors');
    return saved ? JSON.parse(saved) : {
      primary: '#79d5e9',
      secondary: '#4daeac',
      tertiary: '#f77d11'
    };
  });

  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = generateMockDashboardData();
        setData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dateRange]);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('dashboardBarChartColors', barChartColors);
  }, [barChartColors]);

  useEffect(() => {
    localStorage.setItem('dashboardChartDesign', chartDesign);
  }, [chartDesign]);

  useEffect(() => {
    localStorage.setItem('dashboardCardVariants', JSON.stringify(cardVariants));
  }, [cardVariants]);

  useEffect(() => {
    localStorage.setItem('dashboardGraphColors', JSON.stringify(graphColors));
  }, [graphColors]);

  // Handlers
  const handleViewChange = (newView: string) => {
    navigate(`/dashboard/${newView}`);
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  const handleAIInsightClick = async (cardTitle: string, enhanced = false) => {
    setAiModalState({
      isOpen: true,
      insight: null,
      cardTitle,
      isLoading: true,
      enhanced
    });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const insight = generateMockAIInsight(cardTitle);
      setAiModalState(prev => ({
        ...prev,
        insight: insight as AIInsight,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      setAiModalState(prev => ({
        ...prev,
        isLoading: false,
        insight: null
      }));
    }
  };

  const closeAIModal = () => {
    setAiModalState({
      isOpen: false,
      insight: null,
      cardTitle: '',
      isLoading: false,
      enhanced: false
    });
  };

  // Memoized calculations
  const chartData = useMemo(() => {
    if (!data?.trendData) return [];
    return data.trendData.map((item: any) => ({
      name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: item.revenue,
      orders: item.orders,
      customers: item.customers,
      avgOrderValue: item.averageOrderValue
    }));
  }, [data]);

  const topBrands = useMemo(() => {
    if (!data?.brands) return [];
    return data.brands
      .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);
  }, [data]);

  const topAgents = useMemo(() => {
    if (!data?.agents) return [];
    return data.agents
      .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);
  }, [data]);

  // Loading state
  if (loading) {
    return <ProgressLoader />;
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Render helpers
  const renderMetricCards = () => {
    const metrics = data?.metrics || {} as DashboardMetrics;
    
    return (
      <div className="dashboard-metrics-grid">
        <MetricCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          previousValue={metrics.previousPeriodRevenue}
          format="currency"
          trendData={chartData.map(d => ({ value: d.revenue }))}
          variant={cardVariants.totalRevenue}
          onVariantChange={(variant) => setCardVariants(prev => ({ ...prev, totalRevenue: variant }))}
          isEditMode={isEditMode}
          displayMode={metricDisplayMode}
          onAIClick={() => handleAIInsightClick('Total Revenue')}
        />
        <MetricCard
          title="Total Orders"
          value={metrics.totalOrders}
          previousValue={metrics.previousPeriodOrders}
          format="number"
          trendData={chartData.map(d => ({ value: d.orders }))}
          variant={cardVariants.totalOrders}
          onVariantChange={(variant) => setCardVariants(prev => ({ ...prev, totalOrders: variant }))}
          isEditMode={isEditMode}
          displayMode={metricDisplayMode}
          onAIClick={() => handleAIInsightClick('Total Orders')}
        />
        <MetricCard
          title="Active Customers"
          value={metrics.totalCustomers}
          previousValue={metrics.previousPeriodCustomers}
          format="number"
          trendData={chartData.map(d => ({ value: d.customers }))}
          variant={cardVariants.activeCustomers}
          onVariantChange={(variant) => setCardVariants(prev => ({ ...prev, activeCustomers: variant }))}
          isEditMode={isEditMode}
          displayMode={metricDisplayMode}
          onAIClick={() => handleAIInsightClick('Active Customers')}
        />
        <MetricCard
          title="Avg Order Value"
          value={metrics.averageOrderValue}
          previousValue={metrics.previousPeriodAvgOrderValue}
          format="currency"
          trendData={chartData.map(d => ({ value: d.avgOrderValue }))}
          variant={cardVariants.avgOrderValue}
          onVariantChange={(variant) => setCardVariants(prev => ({ ...prev, avgOrderValue: variant }))}
          isEditMode={isEditMode}
          displayMode={metricDisplayMode}
        />
        <MetricCard
          title="Outstanding Invoices"
          value={metrics.outstandingInvoices}
          format="number"
          subtitle={`$${metrics.outstandingAmount.toLocaleString()} unpaid`}
          variant={cardVariants.outstandingInvoices}
          onVariantChange={(variant) => setCardVariants(prev => ({ ...prev, outstandingInvoices: variant }))}
          isEditMode={isEditMode}
          displayMode={metricDisplayMode}
        />
        <MetricCard
          title="Marketplace Orders"
          value={metrics.marketplaceOrders}
          format="number"
          subtitle={`$${metrics.marketplaceRevenue.toLocaleString()} revenue`}
          variant={cardVariants.marketplaceOrders}
          onVariantChange={(variant) => setCardVariants(prev => ({ ...prev, marketplaceOrders: variant }))}
          isEditMode={isEditMode}
          displayMode={metricDisplayMode}
        />
      </div>
    );
  };

  const renderOverviewContent = () => (
    <>
      {renderMetricCards()}
      
      <div className="dashboard-charts-grid">
        <FullGraph
          title="Revenue Trends"
          data={chartData}
          dataKey="revenue"
          color={graphColors.primary}
          onColorChange={(color) => setGraphColors(prev => ({ ...prev, primary: color }))}
          isEditMode={isEditMode}
        />
        
        <CardChart
          title="Top Brands"
          data={topBrands}
          dataKey="totalRevenue"
          nameKey="name"
          chartType={chartDesign}
          onChartTypeChange={setChartDesign}
          isEditMode={isEditMode}
          colors={barChartColors}
          onColorsChange={setBarChartColors}
        />
        
        <CardTable
          title="Recent Customers"
          data={data?.recentCustomers || []}
          columns={[
            { key: 'name', label: 'Customer' },
            { key: 'email', label: 'Email' },
            { key: 'orderCount', label: 'Orders' },
            { key: 'totalSpent', label: 'Total Spent', format: 'currency' }
          ]}
        />
        
        <TableCard
          title="Top Products"
          data={data?.topItems || []}
          columns={[
            { key: 'name', label: 'Product' },
            { key: 'sku', label: 'SKU' },
            { key: 'totalQuantity', label: 'Qty Sold' },
            { key: 'totalRevenue', label: 'Revenue', format: 'currency' }
          ]}
        />
      </div>
    </>
  );

  return (
    <ColorProvider>
      <div className="dashboard-container">
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          isEditMode={isEditMode}
          onEditModeToggle={() => setIsEditMode(!isEditMode)}
          metricDisplayMode={metricDisplayMode}
          onMetricDisplayModeChange={setMetricDisplayMode}
          currentView={view}
          onViewChange={handleViewChange}
        />
        
        <div className="dashboard-content">
          {view === 'overview' && renderOverviewContent()}
          {view !== 'overview' && (
            <div className="dashboard-view-placeholder">
              <h2>{view.charAt(0).toUpperCase() + view.slice(1)} View</h2>
              <p>This view would contain detailed {view} analytics and data.</p>
            </div>
          )}
        </div>
        
        <AIInsightModal
          isOpen={aiModalState.isOpen}
          onClose={closeAIModal}
          insight={aiModalState.insight}
          cardTitle={aiModalState.cardTitle}
          isLoading={aiModalState.isLoading}
          enhanced={aiModalState.enhanced}
        />
      </div>
    </ColorProvider>
  );
};

export default Dashboard;