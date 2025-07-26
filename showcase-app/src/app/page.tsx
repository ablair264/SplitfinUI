'use client';

import { useState } from 'react';
import MetricCard from '@/components/MetricCard';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHeader from '@/components/DashboardHeader';
import FullGraph from '@/components/FullGraph';
import CardTable from '@/components/CardTable';
import CardChart from '@/components/CardChart';
import styles from './page.module.css';

// Mock data
const mockMetrics = {
  totalRevenue: 52304,
  totalOrders: 219,
  activeCustomers: 1463,
  avgOrderValue: 239,
  outstandingInvoices: 12148,
  marketplaceOrders: 161,
};

const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  name: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: '2-digit' 
  }),
  value: Math.floor(Math.random() * 5000) + 1000,
}));

const salesData = [
  { name: 'Demo Alastair', orders: 4, revenue: 12730 },
  { name: 'Dave Roberts', orders: 15, revenue: 12197 },
  { name: 'Nick Barr', orders: 4, revenue: 7493 },
  { name: 'Marcus Johnson', orders: 2, revenue: 6760 },
  { name: 'House Accounts', orders: 8, revenue: 2760 }
];

const brandData = [
  { name: 'rader', value: 28 },
  { name: 'relaxound', value: 35 },
  { name: 'remember', value: 18 },
  { name: 'my-flame-lifestyle', value: 8 },
  { name: 'elvang', value: 6 },
  { name: 'blomus', value: 3 },
  { name: 'unknown', value: 2 }
];

export default function Home() {
  const [dashboardState, setDashboardState] = useState({
    dateRange: '30_days',
    isEditMode: false,
    metricDisplayMode: 'full' as 'full' | 'compact',
    barChartColors: 'fourth' as any,
    chartDesign: 'default',
    cardVariants: {
      totalRevenue: 'variant1' as 'variant1' | 'variant2' | 'variant3',
      totalOrders: 'variant2' as 'variant1' | 'variant2' | 'variant3',
      activeCustomers: 'variant3' as 'variant1' | 'variant2' | 'variant3',
      avgOrderValue: 'variant1' as 'variant1' | 'variant2' | 'variant3',
      outstandingInvoices: 'variant2' as 'variant1' | 'variant2' | 'variant3',
      marketplaceOrders: 'variant3' as 'variant1' | 'variant2' | 'variant3',
    }
  });

  const updateDashboardState = (updates: any) => {
    setDashboardState(prev => ({ ...prev, ...updates }));
  };

  const calculateTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change)),
      isPositive: change > 0
    };
  };

  const getMetricCardColor = (index: number) => {
    const colors = ['#79d5e9', '#FF9F00', '#79d5e9', '#79d5e9', '#FF9F00', '#79d5e9'];
    return colors[index];
  };

  return (
    <DashboardLayout>
      <div className={styles.dashboardContent}>
        <DashboardHeader
          title="Dashboard"
          subtitle="Brand Manager Overview"
          dateRange={dashboardState.dateRange}
          onDateRangeChange={(value) => updateDashboardState({ dateRange: value })}
          isEditMode={dashboardState.isEditMode}
          onEditModeToggle={() => updateDashboardState({ isEditMode: !dashboardState.isEditMode })}
          onRefresh={() => window.location.reload()}
          metricDisplayMode={dashboardState.metricDisplayMode}
          onMetricDisplayModeChange={(value) => updateDashboardState({ metricDisplayMode: value })}
          barChartColors={dashboardState.barChartColors}
          onBarChartColorsChange={(value) => updateDashboardState({ barChartColors: value })}
        />

        {/* Cache Status (shown in edit mode) */}
        {dashboardState.isEditMode && (
          <div className={styles.cacheStatus}>
            <div className={styles.cacheInfo}>
              <span className={styles.cacheLabel}>IndexedDB</span>
              <span className={styles.cacheValue}>4 entries</span>
              <span className={styles.cacheValue}>0.0% used</span>
            </div>
            <button className={styles.cacheClearBtn}>Clear Cache</button>
          </div>
        )}

        {/* Metrics Grid */}
        <div className={styles.metricsGrid}>
          <MetricCard
            id="total-revenue"
            title="TOTAL REVENUE"
            value={mockMetrics.totalRevenue}
            subtitle="All channels combined"
            trend={calculateTrend(mockMetrics.totalRevenue, 45000)}
            chartData={mockChartData}
            format="currency"
            displayMode={dashboardState.metricDisplayMode}
            design={dashboardState.cardVariants.totalRevenue}
            cardIndex={0}
            color={getMetricCardColor(0)}
            onVariantChange={(variant) => 
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, totalRevenue: variant } 
              })
            }
          />
          
          <MetricCard
            id="total-orders"
            title="TOTAL ORDERS"
            value={mockMetrics.totalOrders}
            subtitle="Processed orders"
            trend={calculateTrend(mockMetrics.totalOrders, 200)}
            chartData={mockChartData.map(d => ({ ...d, value: Math.floor(Math.random() * 20) + 5 }))}
            format="number"
            displayMode={dashboardState.metricDisplayMode}
            design={dashboardState.cardVariants.totalOrders}
            cardIndex={1}
            color={getMetricCardColor(1)}
            onVariantChange={(variant) => 
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, totalOrders: variant } 
              })
            }
          />
          
          <MetricCard
            id="active-customers"
            title="ACTIVE CUSTOMERS"
            value={mockMetrics.activeCustomers}
            subtitle="Unique buyers"
            trend={calculateTrend(mockMetrics.activeCustomers, 1400)}
            chartData={mockChartData.map(d => ({ ...d, value: Math.floor(Math.random() * 100) + 40 }))}
            format="number"
            displayMode={dashboardState.metricDisplayMode}
            design={dashboardState.cardVariants.activeCustomers}
            cardIndex={2}
            color={getMetricCardColor(2)}
            onVariantChange={(variant) => 
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, activeCustomers: variant } 
              })
            }
          />

          <MetricCard
            id="avg-order-value"
            title="AVG ORDER VALUE"
            value={mockMetrics.avgOrderValue}
            subtitle="Per transaction"
            trend={calculateTrend(mockMetrics.avgOrderValue, 220)}
            chartData={mockChartData.map(d => ({ ...d, value: Math.floor(Math.random() * 100) + 180 }))}
            format="currency"
            displayMode={dashboardState.metricDisplayMode}
            design={dashboardState.cardVariants.avgOrderValue}
            cardIndex={3}
            color={getMetricCardColor(3)}
            onVariantChange={(variant) => 
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, avgOrderValue: variant } 
              })
            }
          />

          <MetricCard
            id="outstanding-invoices"
            title="OUTSTANDING INVOICES"
            value={mockMetrics.outstandingInvoices}
            subtitle="Pending payment"
            trend={calculateTrend(mockMetrics.outstandingInvoices, 13000)}
            chartData={mockChartData.map(d => ({ ...d, value: Math.floor(Math.random() * 2000) + 10000 }))}
            format="currency"
            displayMode={dashboardState.metricDisplayMode}
            design={dashboardState.cardVariants.outstandingInvoices}
            cardIndex={4}
            color={getMetricCardColor(4)}
            onVariantChange={(variant) => 
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, outstandingInvoices: variant } 
              })
            }
          />

          <MetricCard
            id="marketplace-orders"
            title="MARKETPLACE ORDERS"
            value={mockMetrics.marketplaceOrders}
            subtitle="Amazon, eBay, etc"
            chartData={mockChartData.map(d => ({ ...d, value: Math.floor(Math.random() * 10) + 3 }))}
            format="number"
            displayMode={dashboardState.metricDisplayMode}
            design={dashboardState.cardVariants.marketplaceOrders}
            cardIndex={5}
            color={getMetricCardColor(5)}
            onVariantChange={(variant) => 
              updateDashboardState({ 
                cardVariants: { ...dashboardState.cardVariants, marketplaceOrders: variant } 
              })
            }
          />
        </div>

        {/* Revenue & Orders Chart */}
        <FullGraph
          id="revenue-orders"
          title="Revenue & Order Trends"
          subtitle="Track your business performance over time"
          data={mockChartData}
          type="area"
          lines={[
            { dataKey: 'value', color: '#79d5e9', name: 'Revenue', format: 'currency' }
          ]}
          height={400}
        />

        {/* Tables Grid */}
        <div className={styles.tablesGrid}>
          <CardTable
            id="sales-team"
            title="Sales Team Performance"
            subtitle="Top 5 agents by revenue"
            data={salesData}
          />

          <CardChart
            id="brand-performance"
            title="Brand Performance"
            subtitle="Revenue distribution by brand"
            data={brandData}
            type="pie"
            height={300}
            showLegend={true}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}