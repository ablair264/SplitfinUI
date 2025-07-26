import React, { useState, useMemo, useCallback } from 'react';
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
import DashboardHeader from './shared/DashboardHeader';
import { ColorProvider } from './shared/ColorProvider';
import { 
  generateMetricData, 
  generateChartData, 
  generateTableData,
  generateLineChartData,
  generateActivityData,
  generateDashboardSummary
} from './mockData';

// Constants
const CHART_COLORS = ['#48B79B', '#6B8E71', '#8B7355', '#A66B6B', '#7B9EA6', '#9B7B8F'];
const MULTICOLORED_PALETTE = [
  '#79d5e9', '#799de9', '#79e9c5', '#FF9F00', '#C96868',
  '#4daeac', '#61bc8e', '#fbbf24', '#dc2626', '#8b5cf6', '#ec4899'
];

interface DashboardProps {
  onNavigate?: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // State management
  const [dashboardState, setDashboardState] = useState({
    dateRange: '30_days',
    isEditMode: false,
    metricDisplayMode: 'full' as 'full' | 'compact',
    barChartColors: 'primary' as any,
    chartDesign: 'default' as 'default' | 'horizontal-bars' | 'pie-with-legend' | 'table',
    graphColors: {
      primary: '#79d5e9',
      secondary: '#4daeac',
      tertiary: '#f77d11'
    }
  });

  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Generate mock data
  const mockData = useMemo(() => {
    const metrics = generateMetricData();
    const chartData = generateChartData(30);
    const tableData = generateTableData(20);
    const lineChartData = generateLineChartData(3, 12);
    const activityData = generateActivityData(15);
    const summary = generateDashboardSummary();

    return {
      metrics,
      chartData,
      tableData,
      lineChartData,
      activityData,
      summary,
      totalRevenue: 156789,
      totalOrders: 432,
      activeCustomers: 1234,
      avgOrderValue: 363,
      outstandingInvoices: 45678,
      marketplaceOrders: 123
    };
  }, [dashboardState.dateRange]);

  // Memoized helper functions
  const getBarChartColors = useCallback(() => {
    const colorMap = {
      primary: dashboardState.graphColors.primary,
      secondary: '#799de9',
      tertiary: '#79e9c5',
      fourth: '#FF9F00',
      fifth: '#C96868',
      sixth: '#4daeac'
    };
    
    if (dashboardState.barChartColors === 'multicolored') {
      return MULTICOLORED_PALETTE;
    }
    
    return [colorMap[dashboardState.barChartColors] || dashboardState.graphColors.primary];
  }, [dashboardState.barChartColors, dashboardState.graphColors]);

  const getMetricCardColor = useCallback((index: number = 0) => {
    if (dashboardState.barChartColors === 'multicolored') {
      return MULTICOLORED_PALETTE[index % MULTICOLORED_PALETTE.length];
    }
    return getBarChartColors()[0];
  }, [dashboardState.barChartColors, getBarChartColors]);

  const calculateTrendFromPrevious = useCallback((current: number, previous: number) => {
    if (!previous || previous === 0) return undefined;
    const percentageChange = ((current - previous) / previous) * 100;
    return {
      value: Math.round(Math.abs(percentageChange)),
      isPositive: percentageChange > 0
    };
  }, []);

  // Update dashboard state
  const updateDashboardState = useCallback((updates: Partial<typeof dashboardState>) => {
    setDashboardState(prev => ({ ...prev, ...updates }));
  }, []);

  // Simulate data refresh
  const handleRefresh = useCallback(() => {
    setLoading(true);
    setLoadingProgress(0);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            setLoadingProgress(100);
          }, 500);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <ProgressLoader
          progress={loadingProgress}
          messages={[
            'Loading Dashboard..',
            'Fetching Data..',
            'Calculating Metrics..',
            'Preparing Visualizations..'
          ]}
        />
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="enhanced-dashboard">
        {/* Dashboard Header */}
        <DashboardHeader
          title="Dashboard"
          subtitle="Analytics Overview"
          dateRange={dashboardState.dateRange}
          onDateRangeChange={(value) => updateDashboardState({ dateRange: value })}
          isEditMode={dashboardState.isEditMode}
          onEditModeToggle={() => updateDashboardState({ isEditMode: !dashboardState.isEditMode })}
          onRefresh={handleRefresh}
          metricDisplayMode={dashboardState.metricDisplayMode}
          onMetricDisplayModeChange={(value) => updateDashboardState({ metricDisplayMode: value })}
          barChartColors={dashboardState.barChartColors}
          onBarChartColorsChange={(value) => updateDashboardState({ barChartColors: value })}
          chartDesign={dashboardState.chartDesign}
          onChartDesignChange={(value) => updateDashboardState({ chartDesign: value })}
        />

        <ColorProvider 
          barChartColors={dashboardState.barChartColors}
          graphColors={dashboardState.graphColors}
        >
          <div className="dashboard-content">
            {/* Metrics Row */}
            <div className="metrics-row">
              <MetricCard
                title="Total Revenue"
                value={`$${mockData.totalRevenue.toLocaleString()}`}
                previousValue={mockData.totalRevenue * 0.85}
                trend={calculateTrendFromPrevious(mockData.totalRevenue, mockData.totalRevenue * 0.85)}
                icon="💰"
                color={getMetricCardColor(0)}
                displayMode={dashboardState.metricDisplayMode}
                chartData={mockData.chartData}
                onAIInsight={() => alert('AI Insights would be shown here (Enhanced package only)')}
              />
              <MetricCard
                title="Total Orders"
                value={mockData.totalOrders.toString()}
                previousValue={380}
                trend={calculateTrendFromPrevious(mockData.totalOrders, 380)}
                icon="📦"
                color={getMetricCardColor(1)}
                displayMode={dashboardState.metricDisplayMode}
                chartData={mockData.chartData}
              />
              <MetricCard
                title="Active Customers"
                value={mockData.activeCustomers.toLocaleString()}
                previousValue={1100}
                trend={calculateTrendFromPrevious(mockData.activeCustomers, 1100)}
                icon="👥"
                color={getMetricCardColor(2)}
                displayMode={dashboardState.metricDisplayMode}
                chartData={mockData.chartData}
              />
              <MetricCard
                title="Avg Order Value"
                value={`$${mockData.avgOrderValue}`}
                previousValue={340}
                trend={calculateTrendFromPrevious(mockData.avgOrderValue, 340)}
                icon="💵"
                color={getMetricCardColor(3)}
                displayMode={dashboardState.metricDisplayMode}
                chartData={mockData.chartData}
              />
            </div>

            {/* Charts Row */}
            <div className="charts-row">
              <div className="chart-container">
                <CardChart
                  title="Revenue Trend"
                  data={mockData.chartData}
                  dataKey="value"
                  color={dashboardState.graphColors.primary}
                  chartType="line"
                />
              </div>
              <div className="chart-container">
                <CardChart
                  title="Order Distribution"
                  data={mockData.chartData.slice(0, 7)}
                  dataKey="value"
                  color={dashboardState.graphColors.secondary}
                  chartType="bar"
                />
              </div>
            </div>

            {/* Full Width Graph */}
            <div className="full-width-section">
              <FullGraph
                title="Performance Overview"
                data={mockData.lineChartData.categories.map((cat, idx) => ({
                  name: cat,
                  revenue: mockData.lineChartData.series[0].data[idx],
                  orders: mockData.lineChartData.series[1]?.data[idx] || 0,
                  customers: mockData.lineChartData.series[2]?.data[idx] || 0
                }))}
                lines={[
                  { dataKey: 'revenue', color: dashboardState.graphColors.primary, name: 'Revenue' },
                  { dataKey: 'orders', color: dashboardState.graphColors.secondary, name: 'Orders' },
                  { dataKey: 'customers', color: dashboardState.graphColors.tertiary, name: 'Customers' }
                ]}
                colors={dashboardState.graphColors}
              />
            </div>

            {/* Tables Row */}
            <div className="tables-row">
              <div className="table-container">
                <CardTable
                  title="Recent Orders"
                  data={mockData.tableData.slice(0, 5)}
                  columns={[
                    { key: 'id', label: 'Order ID' },
                    { key: 'customer', label: 'Customer' },
                    { key: 'amount', label: 'Amount' },
                    { key: 'status', label: 'Status' }
                  ]}
                  onRowClick={(row) => onNavigate && onNavigate(`/orders/${row.id}`)}
                />
              </div>
              <div className="table-container">
                <TableCard
                  title="Top Products"
                  headers={['Product', 'Sales', 'Revenue']}
                  rows={[
                    ['Premium Package', '156', '$45,890'],
                    ['Basic Package', '234', '$35,100'],
                    ['Enterprise Suite', '89', '$89,000'],
                    ['Starter Kit', '312', '$15,600'],
                    ['Pro Bundle', '145', '$72,500']
                  ]}
                />
              </div>
            </div>

            {/* Activity Feed */}
            <div className="activity-section">
              <div className="activity-header">
                <h3>Recent Activity</h3>
              </div>
              <div className="activity-list">
                {mockData.activityData.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'success' ? '✓' : 
                       activity.type === 'warning' ? '!' : 
                       activity.type === 'error' ? '✗' : 'ℹ'}
                    </div>
                    <div className="activity-content">
                      <p className="activity-message">{activity.message}</p>
                      <span className="activity-meta">
                        {activity.user} • {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ColorProvider>
      </div>
    </div>
  );
};

export default Dashboard;