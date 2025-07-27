import React from 'react';
import MetricCard from '../shared/MetricCard';
import CardChart from '../shared/CardChart';

const ChartTest: React.FC = () => {
  // Test data for MetricCard
  const testChartData = [
    { name: '22/07', value: 14000 },
    { name: '23/07', value: 15200 },
    { name: '24/07', value: 13800 },
    { name: '25/07', value: 16500 },
    { name: '26/07', value: 14200 },
    { name: '27/07', value: 14420 },
    { name: '28/07', value: 15100 }
  ];

  // Test data for CardChart
  const agentData = [
    { name: 'Sarah Johnson', value: 12500 },
    { name: 'Michael Chen', value: 11800 },
    { name: 'Emma Williams', value: 7600 },
    { name: 'James Rodriguez', value: 6400 },
    { name: 'Lisa Thompson', value: 2800 }
  ];

  return (
    <div style={{ padding: '20px', background: '#0f1419', minHeight: '100vh' }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>Chart Component Test</h2>
      
      {/* Test MetricCard with chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <MetricCard
          id="test-revenue"
          title="Total Revenue"
          value={14420}
          subtitle="All channels combined"
          trend={{ value: 14, isPositive: true }}
          chartData={testChartData}
          format="currency"
          displayMode="full"
          design="variant1"
          color="#79d5e9"
        />
        
        <MetricCard
          id="test-orders"
          title="Total Orders"
          value={29}
          subtitle="Processed orders"
          trend={{ value: 9, isPositive: true }}
          chartData={[]}  // Test with empty data
          format="number"
          displayMode="full"
          design="variant2"
          color="#799de9"
        />
        
        <MetricCard
          id="test-customers"
          title="Active Customers"
          value={30}
          subtitle="Unique buyers"
          trend={{ value: 5, isPositive: true }}
          // No chartData prop - test default behavior
          format="number"
          displayMode="full"
          design="variant3"
          color="#79e9c5"
        />
      </div>

      {/* Test CardChart components */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <CardChart
          id="test-agents"
          title="Sales Team Performance"
          subtitle="Top 5 agents by revenue"
          data={agentData}
          type="bar"
          dataKey="value"
          colors={['#79d5e9', '#799de9', '#79e9c5', '#FF9F00', '#C96868']}
          design="default"
          height={280}
        />
        
        <CardChart
          id="test-agents-empty"
          title="Sales Team Performance (No Data)"
          subtitle="Testing with empty data"
          data={[]}  // Test with empty data
          type="bar"
          dataKey="value"
          design="horizontal-bars"
          height={280}
        />
      </div>
    </div>
  );
};

export default ChartTest;
