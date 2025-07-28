import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MetricCard from '../shared/MetricCard';
import CardChart from '../shared/CardChart';
import CardTable from '../shared/CardTable';
import FullGraph from '../shared/FullGraph';
import { TableCard } from '../shared';
import { ProgressLoader } from '../ProgressLoader';
import MetricIcon from '../shared/MetricIcon';
import MetricCardSquare from '../shared/MetricCardSquare';
// import { useColors } from '../shared/ColorProvider'; // Removed - using props instead

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

const OverviewView: React.FC = () => {
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

  // Use colors from props instead of ColorProvider to avoid context issues
  // const colors = useColors();

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
      
      {/* Square Metric Cards Section */}
      <div style={{
        marginTop: '24px',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'var(--text-primary)'
        }}>Key Metrics Overview</h3>
        <div 
          className="square-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 280px)',
            gridTemplateRows: 'repeat(2, 280px)',
            gap: '1rem',
            justifyContent: 'center',
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          <style>
            {`
              @media (max-width: 900px) {
                .square-cards-grid {
                  grid-template-columns: repeat(2, 280px) !important;
                  grid-template-rows: repeat(3, 280px) !important;
                  gap: 1rem !important;
                }
              }
              @media (max-width: 600px) {
                .square-cards-grid {
                  grid-template-columns: 280px !important;
                  grid-template-rows: repeat(6, 280px) !important;
                  gap: 1rem !important;
                }
              }
            `}
          </style>
          <MetricCardSquare
            id="square-orders"
            title="Total Orders"
            value={data?.metrics.totalOrders || 4586}
            trend={{ value: 5, isPositive: true }}
            format="number"
            design={dashboardState.cardVariants.squareOrders || 'variant3'}
            onVariantChange={(variant) => {
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, squareOrders: variant }
              });
            }}
            color={getMetricCardColor(0)}
            cardIndex={0}
            chartData={[
              { name: 'Online Store', value: 1500, percentage: 5 },
              { name: 'Amazon', value: 400, percentage: 10 },
              { name: 'eBay', value: 400, percentage: 4 },
              { name: 'Retail', value: 700, percentage: 10 }
            ]}
          />
          
          <MetricCardSquare
            id="square-revenue"
            title="Total Revenue"
            value={data?.metrics.totalRevenue || 28450}
            trend={{ value: 12, isPositive: true }}
            format="currency"
            design={dashboardState.cardVariants.squareRevenue || 'variant1'}
            onVariantChange={(variant) => {
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, squareRevenue: variant }
              });
            }}
            color={getMetricCardColor(1)}
            cardIndex={1}
            chartData={[
              { name: 'Product Sales', value: 18500, percentage: 15 },
              { name: 'Services', value: 7200, percentage: 8 },
              { name: 'Subscriptions', value: 1750, percentage: 12 },
              { name: 'Other', value: 1000, percentage: 5 }
            ]}
          />
          
          <MetricCardSquare
            id="square-customers"
            title="Active Users"
            value={data?.metrics.totalCustomers || 1247}
            trend={{ value: 8, isPositive: true }}
            format="number"
            design={dashboardState.cardVariants.squareCustomers || 'variant2'}
            onVariantChange={(variant) => {
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, squareCustomers: variant }
              });
            }}
            color={getMetricCardColor(2)}
            cardIndex={2}
            chartData={[
              { name: 'Mobile', value: 450, percentage: 12 },
              { name: 'Desktop', value: 380, percentage: 6 },
              { name: 'Tablet', value: 280, percentage: 18 },
              { name: 'API', value: 137, percentage: 3 }
            ]}
          />
          
          <MetricCardSquare
            id="square-conversion"
            title="Conversion Rate"
            value={3.2}
            trend={{ value: 0.5, isPositive: true }}
            format="percentage"
            design={dashboardState.cardVariants.squareConversion || 'variant2'}
            onVariantChange={(variant) => {
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, squareConversion: variant }
              });
            }}
            color={getMetricCardColor(3)}
            cardIndex={3}
          />
          
          <MetricCardSquare
            id="square-cart"
            title="Cart Abandonment"
            value={68.5}
            trend={{ value: 2.3, isPositive: false }}
            format="percentage"
            design={dashboardState.cardVariants.squareCart || 'variant1'}
            onVariantChange={(variant) => {
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, squareCart: variant }
              });
            }}
            color={getMetricCardColor(4)}
            cardIndex={4}
          />
          
          <MetricCardSquare
            id="square-satisfaction"
            title="Customer Satisfaction"
            value={4.8}
            trend={{ value: 0.2, isPositive: true }}
            format="number"
            design={dashboardState.cardVariants.squareSatisfaction || 'variant3'}
            onVariantChange={(variant) => {
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, squareSatisfaction: variant }
              });
            }}
            color={getMetricCardColor(5)}
            cardIndex={5}
            chartData={[
              { name: '5 Stars', value: 850, percentage: 15 },
              { name: '4 Stars', value: 620, percentage: 8 },
              { name: '3 Stars', value: 180, percentage: -12 },
              { name: '2 Stars', value: 50, percentage: -5 }
            ]}
          />
        </div>
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