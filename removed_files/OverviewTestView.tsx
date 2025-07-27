import React from 'react';
import { useOutletContext } from 'react-router-dom';

const OverviewTestView: React.FC = () => {
  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Dashboard Overview Test</h1>
      <p>If you can see this, the routing is working!</p>
      <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
        <h2>Test Content</h2>
        <p>This is a test view to verify the dashboard is rendering properly.</p>
      </div>
    </div>
  );
};

export default OverviewTestView;
