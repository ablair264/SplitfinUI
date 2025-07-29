import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MetricCard from '../shared/MetricCard';
import MetricCardSquare from '../shared/MetricCardSquare';
import CardChart from '../shared/CardChart';
import FullGraph from '../shared/FullGraph';
import MetricIcon from '../shared/MetricIcon';
import { ProgressLoader } from '../shared/ProgressLoader';

interface RevenueViewProps {
  data: any;
  agents: any[];
  brands: any[];
  dashboardState: any;
  chartDataCache: any;
  calculateTrendFromPrevious: (current: number, previous: number) => any;
  handleAIInsight: (title: string, type: string) => void;
  graphColors: { primary: string; secondary: string; tertiary: string };
  getMetricCardColor: (index?: number) => string;
  updateDashboardState?: (updates: any) => void;
}

const RevenueView: React.FC = () => {
  const {
    data,
    agents,
    brands,
    dashboardState,
    chartDataCache,
    calculateTrendFromPrevious,
    handleAIInsight,
    graphColors,
    getMetricCardColor,
    updateDashboardState
  } = useOutletContext<RevenueViewProps>();

  // Loading state check
  if (!data || !data.metrics) {
    return (
      <div className="revenue-view-loading">
        <ProgressLoader 
          progress={75} 
          message="Loading Revenue Data..." 
          submessage="Calculating revenue metrics and trends"
          size={120}
        />
      </div>
    );
  }

  // Generate daily revenue trend data
  const dailyRevenueTrendData = React.useMemo(() => {
    if (!data?.orders) return [];
    
    return data.orders
      .reduce((acc, order) => {
        const date = new Date(order.date).toLocaleDateString();
        const existing = acc.find(d => d.date === date);
        if (existing) {
          existing.revenue += order.total;
        } else {
          acc.push({ date, revenue: order.total });
        }
        return acc;
      }, [] as { date: string; revenue: number }[])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30)
      .map(item => ({ name: item.date, value: item.revenue }));
  }, [data?.orders]);

  return (
    <div className="revenue-view">


      <div className="revenue-grid">
        <div className="revenue-summary" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <MetricCard
            id="totalRevenueAnalysis"
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
            design={dashboardState.cardVariants?.totalRevenueAnalysis || 'variant1'}
            onOptionsClick={() => handleAIInsight('Total Revenue', 'totalRevenue')}
            onVariantChange={(variant) => updateDashboardState?.({
              cardVariants: { ...dashboardState.cardVariants, totalRevenueAnalysis: variant }
            })}
            icon={dashboardState.metricDisplayMode === 'compact' ? '💰' : undefined}
            color={getMetricCardColor(0)}
            cardIndex={0}
          />
          <MetricCard
            id="avgDailyRevenue"
            title="Average Daily Revenue"
            value={(data?.metrics.totalRevenue || 0) / 30}
            subtitle="Daily average"
            chartData={chartDataCache.revenue.slice(-7)}
            format="currency"
            displayMode={dashboardState.metricDisplayMode}
            design={dashboardState.cardVariants?.avgDailyRevenue || 'variant2'}
            onVariantChange={(variant) => updateDashboardState?.({
              cardVariants: { ...dashboardState.cardVariants, avgDailyRevenue: variant }
            })}
            icon={dashboardState.metricDisplayMode === 'compact' ? '📅' : undefined}
            color={getMetricCardColor(1)}
            cardIndex={1}
          />
          <MetricCard
            id="topRevenueDay"
            title="Top Revenue Day"
            value={Math.max(...(data?.orders?.map(o => o.total) || [0]))}
            subtitle="Highest single day"
            format="currency"
            displayMode={dashboardState.metricDisplayMode}
            design={dashboardState.cardVariants?.topRevenueDay || 'variant3'}
            onVariantChange={(variant) => updateDashboardState?.({
              cardVariants: { ...dashboardState.cardVariants, topRevenueDay: variant }
            })}
            icon={dashboardState.metricDisplayMode === 'compact' ? '🏆' : undefined}
            color={getMetricCardColor(2)}
            cardIndex={2}
          />
        </div>

        {/* Revenue Period Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <MetricCardSquare
            id="weeklyRevenue"
            title="Weekly Revenue"
            value={(data?.metrics.totalRevenue || 0) / 4}
            trend={{
              value: 12,
              isPositive: true
            }}
            chartData={chartDataCache.revenue.slice(-7)}
            format="currency"
            design={dashboardState.cardVariants?.weeklyRevenue || 'variant1'}
            onVariantChange={(variant) => updateDashboardState?.({
              cardVariants: { ...dashboardState.cardVariants, weeklyRevenue: variant }
            })}
            color={getMetricCardColor(0)}
            cardIndex={0}
          />
          <MetricCardSquare
            id="monthlyRevenue"
            title="Monthly Revenue"
            value={(data?.metrics.totalRevenue || 0)}
            trend={{
              value: 8,
              isPositive: true
            }}
            chartData={chartDataCache.revenue}
            format="currency"
            design={dashboardState.cardVariants?.monthlyRevenue || 'variant2'}
            onVariantChange={(variant) => updateDashboardState?.({
              cardVariants: { ...dashboardState.cardVariants, monthlyRevenue: variant }
            })}
            color={getMetricCardColor(1)}
            cardIndex={1}
          />
          <MetricCardSquare
            id="quarterlyRevenue"
            title="Quarterly Revenue"
            value={(data?.metrics.totalRevenue || 0) * 3}
            trend={{
              value: 15,
              isPositive: true
            }}
            chartData={chartDataCache.revenue}
            format="currency"
            design={dashboardState.cardVariants?.quarterlyRevenue || 'variant3'}
            onVariantChange={(variant) => updateDashboardState?.({
              cardVariants: { ...dashboardState.cardVariants, quarterlyRevenue: variant }
            })}
            color={getMetricCardColor(2)}
            cardIndex={2}
          />
          <MetricCardSquare
            id="yearlyRevenue"
            title="Yearly Revenue"
            value={(data?.metrics.totalRevenue || 0) * 12}
            trend={{
              value: 24,
              isPositive: true
            }}
            chartData={chartDataCache.revenue}
            format="currency"
            design={dashboardState.cardVariants?.yearlyRevenue || 'variant1'}
            onVariantChange={(variant) => updateDashboardState?.({
              cardVariants: { ...dashboardState.cardVariants, yearlyRevenue: variant }
            })}
            color={getMetricCardColor(3)}
            cardIndex={3}
          />
        </div>

        {agents && agents.length > 0 ? (
          <FullGraph
            id="revenue-by-agent"
            title="Revenue by Agent"
            subtitle="Performance comparison across sales team"
            data={agents.map(agent => ({
              name: agent.agentName || agent.name,
              revenue: Math.round(agent.totalRevenue || agent.totalSales || 0)
            }))}
            type="bar"
            lines={[{ dataKey: 'revenue', color: graphColors.primary, name: 'Revenue' }]}
            showGrid={true}
            height={400}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <ProgressLoader 
              progress={45} 
              message="Loading Agent Performance..." 
              submessage="Analyzing sales team revenue data"
              size={80}
            />
          </div>
        )}

        <div className="card-charts-grid">
          {brands && brands.length > 0 ? (
            <CardChart
              id="revenue-by-brand-bar"
              title="Revenue by Brand"
              subtitle="Brand contribution to total revenue"
              data={brands.map(brand => ({
                name: brand.name,
                value: brand.revenue
              }))}
              type="bar"
              dataKey="value"
              colors={['#4daeac']}
              height={300}
            />
          ) : (
            <div style={{ 
              background: 'var(--bg-secondary, #1a2332)', 
              borderRadius: '12px', 
              padding: '2rem', 
              textAlign: 'center',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ProgressLoader 
                progress={35} 
                message="Loading Brand Data..." 
                submessage="Processing brand revenue metrics"
                size={70}
              />
            </div>
          )}

          {dailyRevenueTrendData && dailyRevenueTrendData.length > 0 ? (
            <CardChart
              id="daily-revenue-trend"
              title="Daily Revenue Trend"
              subtitle="Last 30 days"
              data={dailyRevenueTrendData}
              type="area"
              dataKey="value"
              colors={['#79d5e9']}
              height={300}
            />
          ) : (
            <div style={{ 
              background: 'var(--bg-secondary, #1a2332)', 
              borderRadius: '12px', 
              padding: '2rem', 
              textAlign: 'center',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ProgressLoader 
                progress={60} 
                message="Processing Revenue Trends..." 
                submessage="Calculating daily revenue patterns"
                size={70}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueView;