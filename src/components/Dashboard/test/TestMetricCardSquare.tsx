import React, { useState } from 'react';
import MetricCardSquare from '../shared/MetricCardSquare';

const TestMetricCardSquare: React.FC = () => {
  const [cardVariants, setCardVariants] = useState<Record<string, 'variant1' | 'variant2' | 'variant3'>>({
    card1: 'variant1',
    card2: 'variant2',
    card3: 'variant3'
  });

  const testData = [
    { name: 'Mon', value: 250 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 280 },
    { name: 'Thu', value: 350 },
    { name: 'Fri', value: 400 },
    { name: 'Sat', value: 320 },
    { name: 'Sun', value: 290 }
  ];

  return (
    <div style={{ 
      padding: '20px', 
      background: '#0f1419',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>MetricCardSquare Test</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 280px)',
        gap: '16px',
        justifyContent: 'center'
      }}>
        <MetricCardSquare
          id="test-1"
          title="Area Chart Test"
          value={1234}
          trend={{ value: 5, isPositive: true }}
          format="number"
          design={cardVariants.card1}
          onVariantChange={(variant) => setCardVariants({ ...cardVariants, card1: variant })}
          color="#79d5e9"
          chartData={testData}
        />
        
        <MetricCardSquare
          id="test-2"
          title="Line Chart Test"
          value={5678}
          trend={{ value: 12, isPositive: false }}
          format="currency"
          design={cardVariants.card2}
          onVariantChange={(variant) => setCardVariants({ ...cardVariants, card2: variant })}
          color="#4daeac"
          chartData={testData}
        />
        
        <MetricCardSquare
          id="test-3"
          title="Bar Chart Test"
          value={90.5}
          trend={{ value: 3, isPositive: true }}
          format="percentage"
          design={cardVariants.card3}
          onVariantChange={(variant) => setCardVariants({ ...cardVariants, card3: variant })}
          color="#f77d11"
        />
      </div>
      
      <div style={{ color: '#fff', marginTop: '20px' }}>
        <h3>Debug Info:</h3>
        <pre>{JSON.stringify(cardVariants, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TestMetricCardSquare;
