import React from 'react';
import {
  MetricCard,
  MetricCardSquare,
  CardChart,
  TableCard,
  DashboardHeader,
  MasterLayout,
  ColorProvider
} from 'silkr';

// Example: Simple Dashboard using Silkr components
const SimpleDashboard: React.FC = () => {
  // Sample data - replace with your own data source
  const revenueData = {
    title: 'Revenue',
    value: '$125,430',
    change: '+12.5%',
    trend: 'up' as const,
    chartData: [
      { name: 'Jan', value: 65000 },
      { name: 'Feb', value: 75000 },
      { name: 'Mar', value: 85000 },
      { name: 'Apr', value: 95000 },
      { name: 'May', value: 105000 },
      { name: 'Jun', value: 125430 }
    ]
  };

  const ordersData = {
    title: 'Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up' as const,
    chartData: [
      { name: 'Mon', value: 145 },
      { name: 'Tue', value: 189 },
      { name: 'Wed', value: 178 },
      { name: 'Thu', value: 201 },
      { name: 'Fri', value: 234 },
      { name: 'Sat', value: 287 }
    ]
  };

  const customersData = {
    title: 'Customers',
    value: '8,456',
    change: '+15.3%',
    trend: 'up' as const
  };

  const conversionData = {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-2.1%',
    trend: 'down' as const
  };

  const salesByRegion = [
    { region: 'North America', sales: 45000, growth: '+12%' },
    { region: 'Europe', sales: 38000, growth: '+8%' },
    { region: 'Asia', sales: 52000, growth: '+24%' },
    { region: 'South America', sales: 18000, growth: '+15%' }
  ];

  const chartData = {
    title: 'Sales Overview',
    data: [
      { month: 'Jan', sales: 4000, profit: 2400 },
      { month: 'Feb', sales: 3000, profit: 1398 },
      { month: 'Mar', sales: 2000, profit: 9800 },
      { month: 'Apr', sales: 2780, profit: 3908 },
      { month: 'May', sales: 1890, profit: 4800 },
      { month: 'Jun', sales: 2390, profit: 3800 }
    ]
  };

  return (
    <ColorProvider>
      <MasterLayout>
        <div className="dashboard-container" style={{ padding: '24px' }}>
          <DashboardHeader 
            title="Dashboard Overview"
            subtitle="Welcome back! Here's what's happening with your business"
          />
          
          {/* Metrics Row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '24px'
          }}>
            <MetricCard
              title={revenueData.title}
              value={revenueData.value}
              change={revenueData.change}
              trend={revenueData.trend}
              data={revenueData.chartData}
              variant="variant1"
              color="primary"
            />
            
            <MetricCard
              title={ordersData.title}
              value={ordersData.value}
              change={ordersData.change}
              trend={ordersData.trend}
              data={ordersData.chartData}
              variant="variant2"
              color="secondary"
            />
            
            <MetricCardSquare
              title={customersData.title}
              value={customersData.value}
              change={customersData.change}
              trend={customersData.trend}
              variant="variant1"
              color="tertiary"
            />
            
            <MetricCardSquare
              title={conversionData.title}
              value={conversionData.value}
              change={conversionData.change}
              trend={conversionData.trend}
              variant="variant3"
              color="fourth"
            />
          </div>

          {/* Charts Row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr', 
            gap: '20px',
            marginBottom: '24px'
          }}>
            <CardChart
              title={chartData.title}
              data={chartData.data}
              type="bar"
              color="primary"
            />
            
            <TableCard
              title="Sales by Region"
              data={salesByRegion}
              columns={[
                { key: 'region', label: 'Region' },
                { key: 'sales', label: 'Sales', format: 'currency' },
                { key: 'growth', label: 'Growth' }
              ]}
            />
          </div>
        </div>
      </MasterLayout>
    </ColorProvider>
  );
};

export default SimpleDashboard;