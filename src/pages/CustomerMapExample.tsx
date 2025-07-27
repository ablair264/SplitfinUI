import React from 'react';
import { CustomerMapGoogle, CustomerMapFallback } from '../components/CustomerMap';
import { generateMockCustomers } from '../utils/MOCKDATA';

// Example page showing how to use CustomerMap with error handling
export default function CustomerMapExample() {
  // Get mock customers with location data
  const customers = generateMockCustomers(50).map((customer, index) => ({
    ...customer,
    coordinates: {
      latitude: 51.5074 + (Math.random() - 0.5) * 10, // UK centered
      longitude: -0.1278 + (Math.random() - 0.5) * 15
    },
    region: ['London', 'Scotland', 'Wales', 'Midlands', 'North West'][index % 5]
  }));

  // Check if we have a Google Maps API key
  const hasGoogleMapsKey = !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h1 style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(26, 31, 42, 0.9)',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        color: 'white'
      }}>
        Customer Map Example
      </h1>

      {hasGoogleMapsKey ? (
        <CustomerMapGoogle 
          customers={customers}
          mapHeight="100vh"
          enableClustering={true}
          enableRegionFilter={true}
          enableInfoWindow={true}
          enableDirections={true}
        />
      ) : (
        <CustomerMapFallback
          customers={customers}
          mapHeight="100vh"
        />
      )}
    </div>
  );
}
