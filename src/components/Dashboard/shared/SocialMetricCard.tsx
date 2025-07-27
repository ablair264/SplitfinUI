import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MetricCard from '../shared/MetricCard';
import SocialMetricCard from '../shared/SocialMetricCard';
import CardChart from '../shared/CardChart';
import CardTable from '../shared/CardTable';
import FullGraph from '../shared/FullGraph';
import SegmentedButtonGroup from '../shared/SegmentedButtonGroup';
import { TableCard } from '../shared';
import { ProgressLoader } from '../ProgressLoader';
import MetricIcon from '../shared/MetricIcon';

// Define the interface for the context data
interface DashboardViewProps {
  data: any;
  agents: any[];
  brands: any[];
  items: any[];
  dashboardState: any;
  chartDataCache: any;
  getBarChartColors: string[];
  calculateTrendFromPrevious: (current: number, previous: number) => any;
  prepareRevenueOrderData: any[];
  handleAIInsight: (title: string, type: string) => void;
  updateDashboardState: (updates: any) => void;
  graphColors: { primary: string; secondary: string; tertiary: string };
  getMetricCardColor: (index?: number) => string;
  navigate: (path: string) => void;
}

const CHART_COLORS = ['#48B79B', '#6B8E71', '#8B7355', '#A66B6B', '#7B9EA6', '#9B7B8F'];

// Social media icons
const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E4405F">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.96-1.05 1.51-2.66 2.5-4.39 2.59-1.21.06-2.42-.2-3.45-.77-1.33-.73-2.37-1.9-2.95-3.32-.48-1.19-.49-2.51-.03-3.71.38-1.03 1.02-1.96 1.85-2.66.95-.8 2.17-1.25 3.41-1.29.81-.02 1.61.1 2.36.33.04.01.07.03.11.04.07-1.4.14-2.79.21-4.19-.96-.16-1.94-.2-2.91-.1-.96.1-1.9.35-2.79.74-1.46.63-2.73 1.65-3.64 2.94-.92 1.29-1.48 2.8-1.67 4.36-.19 1.56-.02 3.16.5 4.65.52 1.49 1.35 2.86 2.4 3.99 1.05 1.13 2.32 2.01 3.71 2.58 1.39.57 2.9.79 4.41.65 1.51-.14 2.98-.57 4.31-1.26 1.33-.69 2.51-1.64 3.46-2.78.95-1.14 1.66-2.46 2.1-3.86.44-1.4.6-2.87.47-4.33-.13-1.46-.5-2.9-1.1-4.25-.6-1.35-1.43-2.59-2.44-3.67-.36-.39-.75-.75-1.16-1.09z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const OverviewView: React.FC = () => {
  const [socialCardDesign, setSocialCardDesign] = React.useState<'grid' | 'focus' | 'pie'>('grid');
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>('Instagram');
  
  // Get the props from the outlet context with default values
  const context = useOutletContext<DashboardViewProps | null>();
  
  // Provide default values if context is null
  const {
    data = null,
    agents = [],
    brands = [],
    items = [],
    dashboardState = { 
      metricDisplayMode: 'full',
      barChartColors: 'blue',
      chartDesign: 'table',
      cardVariants: {},
      isEditMode: false
    },
    chartDataCache = {},
    getBarChartColors = ['#79d5e9'],
    calculateTrendFromPrevious = () => undefined,
    prepareRevenueOrderData = [],
    handleAIInsight = () => {},
    updateDashboardState = () => {},
    graphColors = { primary: '#79d5e9', secondary: '#4daeac', tertiary: '#f77d11' },
    getMetricCardColor = () => '#79d5e9',
    navigate = () => {}
  } = context || {};

  // Mock social media data - you can replace this with real data from your backend
  const socialPlatforms = [
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      current: 367,
      target: 500,
      color: '#E4405F',
      growth: 9,
      views: 14600
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      current: 20,
      target: 340,
      color: '#1877F2',
      growth: -56,
      views: 7000
    },
    {
      name: 'TikTok',
      icon: <TikTokIcon />,
      current: 467,
      target: 500,
      color: '#000000',
      growth: 59,
      views: 3000
    },
    {
      name: 'YouTube',
      icon: <YouTubeIcon />,
      current: 207,
      target: 414,
      color: '#FF0000',
      growth: 59,
      views: 3000
    }
  ];

  // Show loading if no data
  if (!context || !data || !data.metrics) {
    return (
      <ProgressLoader
        progress={30}
        message="Loading dashboard data..."
      />
    );
  }

  return (
    <div className="overview-container" style={{ padding: '0', width: '100%' }}>
      {/* Metrics Grid */}
      <div className={`metrics-grid ${dashboardState.metricDisplayMode === 'compact' ? 'compact-grid' : ''}`} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
        minHeight: dashboardState.metricDisplayMode === 'compact' ? '120px' : '200px'
      }}>
        <MetricCard
          id="totalRevenue"
          title="Total Revenue"
          value={data?.metrics.totalRevenue || 0}
          subtitle="All channels combined"
          trend={calculateTrendFromPrevious(
            data?.metrics.totalRevenue || 0,
            (data?.metrics.totalRevenue || 0) * 0.88
          )}
          chartData={chartDataCache.revenue}
          format="currency"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants.totalRevenue}
          onClick={() => navigate('/dashboard/revenue')}
          onOptionsClick={() => handleAIInsight('Total Revenue', 'totalRevenue')}
          onVariantChange={(variant) => {
            updateDashboardState({ 
              cardVariants: { ...dashboardState.cardVariants, totalRevenue: variant }
            });
          }}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="dollar-sign" size={24} /> : undefined}
          color={getMetricCardColor(0)}
          cardIndex={0}
        />
        
        <MetricCard
          id="totalOrders"
          title="Total Orders"
          value={data?.metrics.totalOrders || 0}
          subtitle="Processed orders"
          trend={calculateTrendFromPrevious(
            data?.metrics.totalOrders || 0,
            (data?.metrics.totalOrders || 0) * 0.92
          )}
          chartData={chartDataCache.orders}
          format="number"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants.totalOrders}
          onClick={() => navigate('/dashboard/orders')}
          onOptionsClick={() => handleAIInsight('Total Orders', 'totalOrders')}
          onVariantChange={(variant) => {
            updateDashboardState({ 
              cardVariants: { ...dashboardState.cardVariants, totalOrders: variant }
            });
          }}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="package" size={24} /> : undefined}
          color={getMetricCardColor(1)}
          cardIndex={1}
        />
        
        <MetricCard
          id="activeCustomers"
          title="Active Customers"
          value={data?.metrics.totalCustomers || 0}
          subtitle="Unique buyers"
          trend={calculateTrendFromPrevious(
            data?.metrics.totalCustomers || 0,
            (data?.metrics.totalCustomers || 0) * 0.95
          )}
          chartData={chartDataCache.customers}
          format="number"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants.activeCustomers}
          onClick={() => navigate('/customers')}
          onOptionsClick={() => handleAIInsight('Active Customers', 'totalCustomers')}
          onVariantChange={(variant) => {
            updateDashboardState({ 
              cardVariants: { ...dashboardState.cardVariants, activeCustomers: variant }
            });
          }}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="users" size={24} /> : undefined}
          color={getMetricCardColor(2)}
          cardIndex={2}
        />
        
        <MetricCard
          id="avgOrderValue"
          title="Avg Order Value"
          value={data?.metrics.averageOrderValue || 0}
          subtitle="Per transaction"
          trend={calculateTrendFromPrevious(
            data?.metrics.averageOrderValue || 0,
            (data?.metrics.averageOrderValue || 0) * 0.97
          )}
          chartData={chartDataCache.avgOrder}
          format="currency"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants.avgOrderValue}
          onOptionsClick={() => handleAIInsight('Average Order Value', 'averageOrderValue')}
          onVariantChange={(variant) => {
            updateDashboardState({ 
              cardVariants: { ...dashboardState.cardVariants, avgOrderValue: variant }
            });
          }}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="bar-chart" size={24} /> : undefined}
          color={getMetricCardColor(3)}
          cardIndex={3}
        />
        
        <MetricCard
          id="outstandingInvoices"
          title="Outstanding Invoices"
          value={data?.metrics.outstandingInvoices || 0}
          subtitle="Pending payment"
          trend={calculateTrendFromPrevious(
            data?.metrics.outstandingInvoices || 0,
            (data?.metrics.outstandingInvoices || 0) * 1.1
          )}
          chartData={chartDataCache.invoices}
          format="currency"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants.outstandingInvoices}
          onClick={() => navigate('/dashboard/invoices')}
          onOptionsClick={() => handleAIInsight('Outstanding Invoices', 'outstandingInvoices')}
          onVariantChange={(variant) => {
            updateDashboardState({ 
              cardVariants: { ...dashboardState.cardVariants, outstandingInvoices: variant }
            });
          }}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="order" size={24} /> : undefined}
          color={getMetricCardColor(4)}
          cardIndex={4}
        />
        
        <MetricCard
          id="marketplaceOrders"
          title="Marketplace Orders"
          value={data?.metrics.marketplaceOrders || 0}
          subtitle="Amazon, eBay, etc"
          chartData={chartDataCache.marketplace}
          format="number"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants.marketplaceOrders}
          onOptionsClick={() => handleAIInsight('Marketplace Orders', 'marketplaceOrders')}
          onVariantChange={(variant) => {
            updateDashboardState({ 
              cardVariants: { ...dashboardState.cardVariants, marketplaceOrders: variant }
            });
          }}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="shopping-cart" size={24} /> : undefined}
          color={getMetricCardColor(5)}
          cardIndex={5}
        />
      </div>

      {/* Social Media Metrics Card */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        <SocialMetricCard
          id="social-followers"
          title="FOLLOWERS vs TARGET"
          platforms={socialPlatforms}
          trend={{ value: 9, isPositive: true }}
          design={socialCardDesign}
          selectedPlatform={selectedPlatform}
          onVariantChange={setSocialCardDesign}
          onPlatformSelect={setSelectedPlatform}
          onOptionsClick={() => handleAIInsight('Social Media Performance', 'socialMedia')}
          cardIndex={6}
        />
      </div>

      {/* Card Charts Grid */}
      <div className="card-charts-grid" id="card-charts-section">
        {dashboardState.chartDesign === 'table' ? (
          <TableCard
            id="agent-performance"
            title="Sales Team Performance"
            subtitle="Top 5 agents by revenue"
            data={agents
            .sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0))
            .slice(0, 5)
            .map(agent => ({
                name: agent.agentName || agent.name || 'Unknown Agent',
              value: `£${Math.round(agent.totalRevenue || 0).toLocaleString()}`,
              subtext: `${agent.totalOrders || agent.orderCount || 0} orders`
            }))}
            columns={[
              { key: 'name', label: 'Agent', width: '60%' },
              { key: 'value', label: 'Revenue', align: 'right' }
            ]}
            valueColor={(value) => '#22c55e'}
            maxRows={5}
          />
        ) : (
          <CardChart
            id="agent-performance"
            title="Sales Team Performance"
            subtitle="Top 5 agents by revenue"
            data={agents
            .sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0))
            .slice(0, 5)
              .map(agent => ({
              name: agent.agentName || agent.name || 'Unknown Agent',
              value: Math.round(agent.totalRevenue || 0)
            }))}
            type={dashboardState.chartDesign === 'horizontal-bars' ? 'bar' : dashboardState.chartDesign === 'pie-with-legend' ? 'pie' : 'bar'}
            dataKey="value"
            colors={getBarChartColors}
            design={dashboardState.chartDesign}
            height={280}
            onClick={() => console.log('View agent details')}
            showLegend={dashboardState.chartDesign === 'pie-with-legend'}
          />
        )}

        <CardChart
          id="brand-distribution"
          title="Brand Performance"
          subtitle="Revenue distribution by brand"
          data={brands.length > 0 ? brands.map(brand => ({
            name: brand.name || 'Unknown',
            value: brand.revenue || 0
          })) : [{ name: 'No brand data available', value: 1 }]}
          type="pie"
          dataKey="value"
          colors={CHART_COLORS}
          showLegend={true}
          height={280}
          onClick={() => navigate('/dashboard/brands')}
        />
      </div>

      {/* Card Tables Grid */}
      <div className="card-tables-grid">
        <CardTable
          id="top-products"
          title="Top Products"
          subtitle="Best performing items this period"
          columns={[
            { key: 'name', label: 'Product', width: '40%' },
            { key: 'brand', label: 'Brand', width: '25%' },
            { key: 'quantity', label: 'Units', align: 'right' },
            { 
              key: 'revenue', 
              label: 'Revenue', 
              align: 'right',
              format: (value) => `£${Math.round(value).toLocaleString()}`
            }
          ]}
          data={items.length > 0 ? items.map(item => ({
            ...item,
            name: item.name || item.item_name || 'Unknown Product'
          })) : []}
          maxRows={10}
          onViewAll={() => navigate('/inventory')}
          showIndex={true}
          highlightRows={true}
        />

        <CardTable
          id="recent-orders"
          title="Recent Orders"
          subtitle="Latest transactions"
          columns={[
            { key: 'order_number', label: 'Order #', width: '20%' },
            { key: 'customer_name', label: 'Customer' },
            { 
              key: 'date', 
              label: 'Date',
              format: (value) => new Date(value).toLocaleDateString()
            },
            { 
              key: 'total', 
              label: 'Total', 
              align: 'right',
              format: (value) => `£${value.toLocaleString()}`
            }
          ]}
          data={data?.orders?.slice(0, 10).map(order => ({
            ...order,
            order_number: order.order_number || order.id.slice(-8)
          })) || []}
          maxRows={5}
          onRowClick={(row) => navigate(`/order/${row.id}`)}
          onViewAll={() => navigate('/orders')}
        />
      </div>
      
       {/* Main Revenue & Order Trends Chart */}
      <div className="full-graph-container">
        <FullGraph
          id="revenue-orders-trend"
          title="Revenue & Order Trends"
          subtitle="Track your business performance over time"
          data={prepareRevenueOrderData}
          type="composed"
          lines={[
            { dataKey: 'revenue', color: graphColors.primary, name: 'Revenue', type: 'area' },
            { dataKey: 'orders', color: graphColors.secondary, name: 'Orders', type: 'line' }
          ]}
          showBrush={true}
          showGrid={true}
          showLegend={true}
          height={400}
        />
      </div>
    </div>
  );
};

export default OverviewView;