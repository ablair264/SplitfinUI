import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MetricCard from '../shared/MetricCard';
import CardTable from '../shared/CardTable';
import CardChart from '../shared/CardChart';
import MetricIcon from '../shared/MetricIcon';
import { TableCard } from '../shared';

interface OrdersViewProps {
  data: any;
  agents: any[];
  brands: any[];
  dashboardState: any;
  chartDataCache: any;
  getBarChartColors: string[];
  navigate: any;
  EmptyState: React.FC<{ message: string }>;
  getMetricCardColor: (index?: number) => string;
  calculateTrendFromPrevious: (current: number, previous: number) => any;
  updateDashboardState?: (updates: any) => void;
}

const OrdersView: React.FC = () => {
  const {
    data,
    agents,
    brands,
    dashboardState,
    chartDataCache,
    getBarChartColors,
    navigate,
    EmptyState,
    getMetricCardColor,
    calculateTrendFromPrevious,
    updateDashboardState
  } = useOutletContext<OrdersViewProps>();

  return (
    <div className="orders-view">
      {/* Order Metric Cards */}
      <div className="metrics-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        <MetricCard
          id="ordersTotal"
          title="Total Orders"
          value={data?.metrics.totalOrders || 0}
          subtitle="All orders in period"
          trend={calculateTrendFromPrevious(
            data?.metrics.totalOrders || 0,
            (data?.metrics.totalOrders || 0) * 0.92
          )}
          format="number"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants?.ordersTotal || 'variant2'}
          chartData={chartDataCache.orders}
          onVariantChange={(variant) => updateDashboardState?.({
            cardVariants: { ...dashboardState.cardVariants, ordersTotal: variant }
          })}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="package" size={24} /> : undefined}
          color={getMetricCardColor(1)}
          cardIndex={0}
        />
        <MetricCard
          id="ordersAvgValue"
          title="Average Order Value"
          value={data?.metrics.averageOrderValue || 0}
          subtitle="Per transaction"
          trend={calculateTrendFromPrevious(
            data?.metrics.averageOrderValue || 0,
            (data?.metrics.averageOrderValue || 0) * 0.97
          )}
          format="currency"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants?.ordersAvgValue || 'variant1'}
          chartData={chartDataCache.avgOrder}
          onVariantChange={(variant) => updateDashboardState?.({
            cardVariants: { ...dashboardState.cardVariants, ordersAvgValue: variant }
          })}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="order" size={24} /> : undefined}
          color={getMetricCardColor(1)}
          cardIndex={1}
        />
        <MetricCard
          id="ordersMarketplace"
          title="Marketplace Orders"
          value={data?.metrics.marketplaceOrders || 0}
          subtitle="From external channels"
          format="number"
          displayMode={dashboardState.metricDisplayMode}
          design={dashboardState.cardVariants?.ordersMarketplace || 'variant3'}
          chartData={chartDataCache.marketplace}
          onVariantChange={(variant) => updateDashboardState?.({
            cardVariants: { ...dashboardState.cardVariants, ordersMarketplace: variant }
          })}
          icon={dashboardState.metricDisplayMode === 'compact' ? <MetricIcon name="shopping-cart" size={24} /> : undefined}
          color={getMetricCardColor(2)}
          cardIndex={2}
        />
      </div>

      {/* Order Performance Charts */}
      <div className="card-charts-grid">
        <CardTable
          id="agent-orders-table"
          title="Most Orders (Sales Agent)"
          subtitle="Top performing sales agents"
          columns={[
            { key: 'rank', label: '#', width: '10%' },
            { key: 'name', label: 'Agent', width: '40%' },
            { key: 'orderCount', label: 'Orders', align: 'right' },
            { 
              key: 'totalSales', 
              label: 'Revenue', 
              align: 'right',
              format: (value) => `£${Math.round(value).toLocaleString()}`
            }
          ]}
          data={agents.slice(0, 5).map((agent, index) => ({
            ...agent,
            rank: index + 1
          }))}
          maxRows={5}
          showIndex={false}
          highlightRows={true}
        />

        {dashboardState.chartDesign === 'table' ? (
          <TableCard
            id="brand-orders-chart"
            title="Most Orders (Brands)"
            subtitle="Orders distribution by brand"
            data={brands.slice(0, 5).map(brand => ({
              name: brand.name || 'Unknown',
              value: brand.orderCount || 0,
              subtext: `£${Math.round(brand.revenue || 0).toLocaleString()} revenue`
            }))}
            columns={[
              { key: 'name', label: 'Brand Name' },
              { key: 'value', label: 'Orders' }
            ]}
            valueColor={(value) => '#22c55e'}
            maxRows={5}
          />
        ) : (
          <CardChart
            id="brand-orders-chart"
            title="Most Orders (Brands)"
            subtitle="Orders distribution by brand"
            data={brands.slice(0, 5).map(brand => ({
              name: brand.name || 'Unknown',
              value: brand.orderCount || 0
            }))}
            type="bar"
            dataKey="value"
            colors={getBarChartColors}
            design={dashboardState.chartDesign}
            height={280}
          />
        )}
      </div>

      {/* Recent Orders Table */}
      <div className="orders-table-container">
        <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--text-primary)' }}>Recent Orders</h3>
          <button 
            onClick={() => navigate('/orders')}
            className="view-all-button"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#1a1f2a',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(251, 191, 36, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(251, 191, 36, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(251, 191, 36, 0.2)';
            }}
          >
            View All Orders
          </button>
        </div>
        <table className="enhanced-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Channel</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders
              ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id.slice(-8)}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.customerName}</td>
                  <td>£{order.total.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${order.status || 'pending'}`}>
                      {order.status || 'pending'}
                    </span>
                  </td>
                  <td>
                    {order.is_marketplace_order ? (
                      <span className="channel-badge marketplace">
                        Marketplace
                      </span>
                    ) : (
                      <span className="channel-badge direct">Direct</span>
                    )}
                  </td>
                  <td>{order.line_items?.length || 0} items</td>
                </tr>
              ))}
          </tbody>
        </table>
        
        {(!data?.orders || data.orders.length === 0) && (
          <EmptyState message="No orders found for the selected period" />
        )}
      </div>
    </div>
  );
};

export default OrdersView;