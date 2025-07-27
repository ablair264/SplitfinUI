import React, { useState } from 'react';
import './CustomerMap.css';

// Simple fallback map component that doesn't require Google Maps
export interface FallbackMapProps {
  customers?: Array<{
    id: string;
    name: string;
    region?: string;
    totalSpent?: number;
  }>;
  regions?: Record<string, { color: string }>;
  mapHeight?: string;
}

export default function CustomerMapFallback({
  customers = [],
  regions = {
    'Scotland': { color: '#1f77b4' },
    'North East': { color: '#ff7f0e' },
    'North West': { color: '#2ca02c' },
    'Wales': { color: '#d62728' },
    'Midlands': { color: '#9467bd' },
    'London': { color: '#8c564b' },
    'South East': { color: '#e377c2' },
    'South West': { color: '#7f7f7f' },
    'Ireland': { color: '#ff6b6b' }
  },
  mapHeight = '100vh'
}: FallbackMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Calculate region statistics
  const regionStats = React.useMemo(() => {
    const stats: Record<string, { count: number; revenue: number }> = {};
    
    Object.keys(regions).forEach(region => {
      stats[region] = { count: 0, revenue: 0 };
    });
    
    customers.forEach(customer => {
      const region = customer.region;
      if (region && stats[region]) {
        stats[region].count++;
        stats[region].revenue += customer.totalSpent || 0;
      }
    });
    
    return stats;
  }, [customers, regions]);

  return (
    <div className="customer-map-container" style={{ height: mapHeight }}>
      <div className="map-sidebar" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Customer Distribution</h2>
        <div className="region-list">
          {Object.entries(regions).map(([region, config]) => (
            <div
              key={region}
              className={`region-item ${selectedRegion === region ? 'active' : ''}`}
              onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
              style={{ borderLeftColor: config.color }}
            >
              <h3>{region}</h3>
              <div className="region-stats">
                <span>{regionStats[region]?.count || 0} customers</span>
                <span>£{(regionStats[region]?.revenue || 0).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="map-legend">
          <h3>Customer Value</h3>
          <div className="legend-item">
            <div className="legend-marker" style={{ backgroundColor: '#4CAF50' }}></div>
            <span>&lt; £5,000</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker" style={{ backgroundColor: '#ff8800' }}></div>
            <span>£5,000 - £10,000</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker" style={{ backgroundColor: '#ff4444' }}></div>
            <span>&gt; £10,000</span>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(121, 213, 233, 0.1)', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.875rem', margin: 0 }}>
            <strong>Note:</strong> Map view requires Google Maps API configuration. 
            Currently showing customer statistics by region.
          </p>
        </div>
      </div>
    </div>
  );
}
