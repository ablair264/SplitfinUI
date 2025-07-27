import React from 'react';
import { CustomerMapGoogle, CustomerMapFallback } from '../components/CustomerMap';
import { generateCustomers } from '../utils/MOCKDATA';

// Example page showing how to use CustomerMap with error handling
export default function CustomerMapExample() {
  // Get mock customers with location data
  const customers = generateCustomers(50).map((customer, index) => {
    // Generate UK postcodes based on region
    const postcodes = {
      'London': ['SW1A 1AA', 'EC1A 1BB', 'W1A 1AA', 'SE1 1AA', 'N1 1AA'],
      'Scotland': ['EH1 1YZ', 'G1 1AA', 'AB10 1AA', 'DD1 1AA', 'KY1 1AA'],
      'Wales': ['CF10 1NS', 'LL1 1AA', 'SA1 1AA', 'NP20 1AA', 'LD1 1AA'],
      'Midlands': ['B1 1AA', 'CV1 1AA', 'NG1 1AA', 'LE1 1AA', 'WV1 1AA'],
      'North West': ['M1 1AD', 'L1 1AA', 'WA1 1AA', 'PR1 1AA', 'BL1 1AA']
    };
    
    const region = ['London', 'Scotland', 'Wales', 'Midlands', 'North West'][index % 5];
    const regionPostcodes = postcodes[region];
    const postcode = regionPostcodes[Math.floor(Math.random() * regionPostcodes.length)];
    
    return {
      ...customer,
      coordinates: {
        latitude: 51.5074 + (Math.random() - 0.5) * 10, // UK centered
        longitude: -0.1278 + (Math.random() - 0.5) * 15
      },
      region: region,
      postcode: postcode
    };
  });

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
