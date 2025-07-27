import React from 'react';
import MetricCard from '../components/Dashboard/shared/MetricCard';
import { ColorProvider } from '../components/Dashboard/shared/ColorProvider';
import '../components/Dashboard/dashboard.css';

const MetricCardTest: React.FC = () => {
  // Generate test data
  const testChartData = [
    { name: '22/07', value: 1200 },
    { name: '23/07', value: 1500 },
    { name: '24/07', value: 1800 },
    { name: '25/07', value: 1600 },
    { name: '26/07', value: 2000 },
    { name: '27/07', value: 2200 },
    { name: '28/07', value: 2100 }
  ];

  return (
    <div style={{ 
      padding: '40px', 
      background: '#0f1419', 
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h1 style={{ color: 'white', marginBottom: '40px' }}>MetricCard Test Page</h1>
      
      <ColorProvider 
        barChartColors="primary"
        graphColors={{ primary: '#79d5e9', secondary: '#4daeac', tertiary: '#f77d11' }}
      >
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '20px',
          maxWidth: '1200px'
        }}>
          <MetricCard
            id="test-revenue"
            title="Total Revenue"
            value={9949}
            subtitle="All channels combined"
            trend={{ value: 14, isPositive: true }}
            chartData={testChartData}
            format="currency"
            displayMode="full"
            design="variant1"
            color="#79d5e9"
            onVariantChange={(variant) => console.log('Variant changed to:', variant)}
          />
          
          <MetricCard
            id="test-orders"
            title="Total Orders"
            value={28}
            subtitle="Processed orders"
            trend={{ value: 9, isPositive: true }}
            chartData={testChartData.map(d => ({ ...d, value: Math.floor(d.value / 50) }))}
            format="number"
            displayMode="full"
            design="variant2"
            color="#799de9"
            onVariantChange={(variant) => console.log('Variant changed to:', variant)}
          />
          
          <MetricCard
            id="test-customers"
            title="Active Customers"
            value={31}
            subtitle="Unique buyers"
            trend={{ value: 5, isPositive: true }}
            chartData={testChartData.map(d => ({ ...d, value: Math.floor(d.value / 40) }))}
            format="number"
            displayMode="full"
            design="variant3"
            color="#79e9c5"
            onVariantChange={(variant) => console.log('Variant changed to:', variant)}
          />
        </div>
        
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>Without Chart Data (Should Show Generated Data)</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '20px',
            maxWidth: '1200px'
          }}>
            <MetricCard
              id="test-no-data"
              title="No Data Test"
              value={5000}
              subtitle="Should show generated chart"
              trend={{ value: 10, isPositive: false }}
              format="currency"
              displayMode="full"
              design="variant1"
              color="#FF9F00"
            />
          </div>
        </div>
      </ColorProvider>
    </div>
  );
};

export default MetricCardTest;