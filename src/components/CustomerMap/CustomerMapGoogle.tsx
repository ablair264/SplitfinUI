import React, { useState, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api';
import './CustomerMap.css';

// Generic Customer interface for map
export interface MapCustomer {
  id: string;
  name: string;
  email: string;
  postcode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  region?: string;
  totalSpent?: number;
  orderCount?: number;
  lastOrderDate?: string;
  customFields?: Record<string, any>;
}

export interface RegionConfig {
  center: { lat: number; lng: number };
  color: string;
}

export interface CustomerMapProps {
  // Data
  customers?: MapCustomer[];
  regions?: Record<string, RegionConfig>;
  
  // Configuration
  googleMapsApiKey?: string;
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
  loading?: boolean;
  loadingMessage?: string;
  
  // Features
  enableClustering?: boolean;
  enableRegionFilter?: boolean;
  enableInfoWindow?: boolean;
  enableDirections?: boolean;
  
  // Callbacks
  onCustomerClick?: (customer: MapCustomer) => void;
  onViewCustomer?: (customer: MapCustomer) => void;
  onGetDirections?: (customer: MapCustomer) => void;
  
  // Customization
  mapHeight?: string;
  sidebarTitle?: string;
  legendTitle?: string;
  markerThresholds?: {
    high: { value: number; color: string };
    medium: { value: number; color: string };
    low: { color: string };
  };
}

// Default UK regions
const DEFAULT_UK_REGIONS: Record<string, RegionConfig> = {
  'Scotland': {
    center: { lat: 56.4907, lng: -4.2026 },
    color: '#1f77b4'
  },
  'North East': {
    center: { lat: 54.9783, lng: -1.6178 },
    color: '#ff7f0e'
  },
  'North West': {
    center: { lat: 53.7632, lng: -2.7044 },
    color: '#2ca02c'
  },
  'Wales': {
    center: { lat: 52.1307, lng: -3.7837 },
    color: '#d62728'
  },
  'Midlands': {
    center: { lat: 52.4862, lng: -1.8904 },
    color: '#9467bd'
  },
  'London': {
    center: { lat: 51.5074, lng: -0.1278 },
    color: '#8c564b'
  },
  'South East': {
    center: { lat: 51.2787, lng: 0.5217 },
    color: '#e377c2'
  },
  'South West': {
    center: { lat: 50.7772, lng: -3.9997 },
    color: '#7f7f7f'
  },
  'Ireland': {
    center: { lat: 53.4129, lng: -8.2439 },
    color: '#ff6b6b'
  }
};

// Mock data generator
const generateMockMapCustomers = (): MapCustomer[] => {
  const regions = Object.keys(DEFAULT_UK_REGIONS);
  const postcodes = ['SW1A 1AA', 'EH1 1YZ', 'CF10 1NS', 'M1 1AD', 'B1 1AA', 'L1 1AA', 'NE1 1AA', 'BS1 1AA'];
  
  return Array.from({ length: 100 }, (_, i) => {
    const region = regions[Math.floor(Math.random() * regions.length)];
    const regionCenter = DEFAULT_UK_REGIONS[region].center;
    
    return {
      id: `customer-${i + 1}`,
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      postcode: postcodes[Math.floor(Math.random() * postcodes.length)],
      coordinates: {
        latitude: regionCenter.lat + (Math.random() - 0.5) * 2,
        longitude: regionCenter.lng + (Math.random() - 0.5) * 2
      },
      region,
      totalSpent: Math.floor(Math.random() * 20000),
      orderCount: Math.floor(Math.random() * 50),
      lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
    };
  });
};

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#1a2332" }]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#2c3e50" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#34495e" }]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#34495e" }]
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#34495e" }]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1a1f2a" }]
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#95a5a6" }]
    }
  ]
};

// Default callbacks
const defaultCallbacks = {
  onCustomerClick: (customer: MapCustomer) => console.log('Customer clicked:', customer.id),
  onViewCustomer: (customer: MapCustomer) => console.log('View customer:', customer.id),
  onGetDirections: (customer: MapCustomer) => {
    const destination = `${customer.coordinates.latitude},${customer.coordinates.longitude}`;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  }
};

export default function CustomerMapGoogle({
  customers: propCustomers,
  regions = DEFAULT_UK_REGIONS,
  googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  defaultCenter = { lat: 54.5, lng: -4 },
  defaultZoom = 6,
  loading = false,
  loadingMessage = 'Loading customer locations...',
  enableClustering = true,
  enableRegionFilter = true,
  enableInfoWindow = true,
  enableDirections = true,
  onCustomerClick = defaultCallbacks.onCustomerClick,
  onViewCustomer = defaultCallbacks.onViewCustomer,
  onGetDirections = defaultCallbacks.onGetDirections,
  mapHeight = '100vh',
  sidebarTitle = 'UK Regions',
  legendTitle = 'Customer Value',
  markerThresholds = {
    high: { value: 10000, color: '#ff4444' },
    medium: { value: 5000, color: '#ff8800' },
    low: { color: '#4CAF50' }
  }
}: CustomerMapProps) {
  // Log for debugging
  if (import.meta.env.DEV) {
    console.log('CustomerMapGoogle Debug:', {
      hasApiKey: !!googleMapsApiKey,
      keyLength: googleMapsApiKey?.length,
      keyPrefix: googleMapsApiKey?.substring(0, 10) + '...',
      env: import.meta.env.MODE
    });
  }
  
  if (!googleMapsApiKey && import.meta.env.DEV) {
    console.warn('CustomerMapGoogle: No Google Maps API key found. Set VITE_GOOGLE_MAPS_API_KEY in your environment variables or pass googleMapsApiKey prop.');
  }
  
  // Check if we're in development mode without a key
  const isDevelopmentWithoutKey = import.meta.env.DEV && !googleMapsApiKey;
  
  // Add global error handler for Google Maps
  React.useEffect(() => {
    const handleError = (event: any) => {
      if (event.message?.includes('ApiTargetBlockedMapError')) {
        console.error('🗺️ Google Maps API Error Detected!');
        console.error('Even though your key is unrestricted, this error means:');
        console.error('1. Maps JavaScript API is NOT enabled in your Google Cloud project');
        console.error('2. OR billing is not set up (required even for free tier)');
        console.error('3. OR the API key belongs to a different project');
        console.error('');
        console.error('To fix:');
        console.error('1. Go to: https://console.cloud.google.com/apis/library');
        console.error('2. Search for "Maps JavaScript API"');
        console.error('3. Click on it and press ENABLE');
        console.error('4. Make sure billing is enabled for your project');
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  // Use provided customers or generate mock data
  const customers = propCustomers || generateMockMapCustomers();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<MapCustomer | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calculate region statistics
  const regionStats = useMemo(() => {
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

  // Filter customers by region
  const filteredCustomers = useMemo(() => {
    if (!enableRegionFilter || !selectedRegion) return customers;
    return customers.filter(customer => customer.region === selectedRegion);
  }, [customers, selectedRegion, enableRegionFilter]);

  const handleRegionClick = (region: string) => {
    if (!enableRegionFilter) return;
    
    setSelectedRegion(region === selectedRegion ? null : region);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
    
    if (map && region !== selectedRegion && regions[region]) {
      const regionData = regions[region];
      map.panTo(regionData.center);
      map.setZoom(7);
    } else if (map) {
      map.panTo(defaultCenter);
      map.setZoom(defaultZoom);
    }
  };

  const getMarkerIcon = (customer: MapCustomer): google.maps.Symbol => {
    const totalSpent = customer.totalSpent || 0;
    const scale = Math.min(Math.max(totalSpent / 1000, 10), 20);
    
    const color = totalSpent >= markerThresholds.high.value ? markerThresholds.high.color :
                  totalSpent >= markerThresholds.medium.value ? markerThresholds.medium.color :
                  markerThresholds.low.color;
    
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: scale,
      fillColor: color,
      fillOpacity: 0.8,
      strokeColor: 'white',
      strokeWeight: 2
    };
  };

  const handleMarkerClick = (customer: MapCustomer) => {
    setSelectedCustomer(customer);
    onCustomerClick(customer);
  };

  if (loading) {
    return (
      <div className="customer-map-loading">
        <div className="spinner"></div>
        <p>{loadingMessage}</p>
      </div>
    );
  }

  if (!googleMapsApiKey || isDevelopmentWithoutKey) {
    console.error('Google Maps API key not found. Make sure VITE_GOOGLE_MAPS_API_KEY is set in your environment variables.');
    return (
      <div className="customer-map-error" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Google Maps Configuration Required</h3>
        <p>Google Maps API key is required. Please provide a valid API key.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>
          Set <code>VITE_GOOGLE_MAPS_API_KEY</code> in your environment variables.
        </p>
        
        {/* Show helpful info if API key exists but is blocked */}
        {googleMapsApiKey && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,193,7,0.1)', borderRadius: '8px', textAlign: 'left', maxWidth: '600px', margin: '1.5rem auto' }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#ff6b6b' }}>⚠️ API Key Detected but Still Blocked!</h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Since your key is unrestricted, the issue is likely:
            </p>
            <ol style={{ fontSize: '0.875rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Maps JavaScript API is NOT enabled</strong>
                <ul style={{ marginTop: '0.25rem' }}>
                  <li>Go to: <code>APIs & Services → Library</code></li>
                  <li>Search for "Maps JavaScript API"</li>
                  <li>Click <strong>ENABLE</strong></li>
                </ul>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong>Billing is not set up</strong>
                <ul style={{ marginTop: '0.25rem' }}>
                  <li>Google requires billing even for free tier</li>
                  <li>You get $200 free credit monthly</li>
                  <li>Go to Billing and link a payment method</li>
                </ul>
              </li>
              <li>
                <strong>Wrong Project</strong>
                <ul style={{ marginTop: '0.25rem' }}>
                  <li>Check you're in the right Google Cloud project</li>
                  <li>The API must be enabled in the SAME project as your key</li>
                </ul>
              </li>
            </ol>
            <p style={{ fontSize: '0.875rem', marginTop: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
              💡 <strong>Quick Test:</strong> Visit{' '}
              <code style={{ wordBreak: 'break-all' }}>https://maps.googleapis.com/maps/api/js?key={googleMapsApiKey.substring(0, 10)}...</code>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="customer-map-container" style={{ height: mapHeight }}>
      {/* Mobile menu toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Sidebar overlay for mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className={`map-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>{sidebarTitle}</h2>
        {enableRegionFilter && (
          <div className="region-list">
            {Object.entries(regions).map(([region, config]) => (
              <div
                key={region}
                className={`region-item ${selectedRegion === region ? 'active' : ''}`}
                onClick={() => handleRegionClick(region)}
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
        )}
        
        <div className="map-legend">
          <h3>{legendTitle}</h3>
          <div className="legend-item">
            <div className="legend-marker" style={{ backgroundColor: markerThresholds.low.color }}></div>
            <span>&lt; £{markerThresholds.medium.value.toLocaleString()}</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker" style={{ backgroundColor: markerThresholds.medium.color }}></div>
            <span>£{markerThresholds.medium.value.toLocaleString()} - £{markerThresholds.high.value.toLocaleString()}</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker" style={{ backgroundColor: markerThresholds.high.color }}></div>
            <span>&gt; £{markerThresholds.high.value.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="map-content">
        <LoadScript 
          googleMapsApiKey={googleMapsApiKey}
          onError={(error) => {
            console.error('Google Maps Load Error:', error);
            console.error('This usually means the API is not enabled or billing is not set up.');
          }}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={defaultZoom}
            options={mapOptions}
            onLoad={setMap}
          >
            {enableClustering ? (
              <MarkerClusterer
                options={{
                  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                  gridSize: 60,
                  minimumClusterSize: 3,
                  styles: [{
                    textColor: 'white',
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
                    height: 53,
                    width: 53
                  }]
                }}
              >
                {(clusterer) => (
                  <>
                    {filteredCustomers.map(customer => (
                      <Marker
                        key={customer.id}
                        position={{
                          lat: customer.coordinates.latitude,
                          lng: customer.coordinates.longitude
                        }}
                        icon={getMarkerIcon(customer)}
                        clusterer={clusterer}
                        onClick={() => handleMarkerClick(customer)}
                      />
                    ))}
                  </>
                )}
              </MarkerClusterer>
            ) : (
              <>
                {filteredCustomers.map(customer => (
                  <Marker
                    key={customer.id}
                    position={{
                      lat: customer.coordinates.latitude,
                      lng: customer.coordinates.longitude
                    }}
                    icon={getMarkerIcon(customer)}
                    onClick={() => handleMarkerClick(customer)}
                  />
                ))}
              </>
            )}

            {enableInfoWindow && selectedCustomer && (
              <InfoWindow
                position={{
                  lat: selectedCustomer.coordinates.latitude,
                  lng: selectedCustomer.coordinates.longitude
                }}
                onCloseClick={() => setSelectedCustomer(null)}
              >
                <div className="customer-popup-enhanced">
                  <div className="popup-header">
                    <h4>{selectedCustomer.name}</h4>
                    <p className="customer-email">{selectedCustomer.email}</p>
                  </div>
                  
                  <div className="popup-info">
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{selectedCustomer.postcode}</span>
                    </div>
                    <div className="popup-stats">
                      <div className="stat-item">
                        <span className="stat-label">Orders</span>
                        <span className="stat-value">{selectedCustomer.orderCount || 0}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Last Order</span>
                        <span className="stat-value">
                          {selectedCustomer.lastOrderDate 
                            ? new Date(selectedCustomer.lastOrderDate).toLocaleDateString('en-GB', { 
                                day: '2-digit', 
                                month: 'short', 
                                year: 'numeric' 
                              })
                            : 'No orders'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="popup-actions">
                    <button 
                      className="popup-btn btn-view"
                      onClick={() => {
                        setSelectedCustomer(null);
                        onViewCustomer(selectedCustomer);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      View Customer
                    </button>
                    {enableDirections && (
                      <button 
                        className="popup-btn btn-directions"
                        onClick={() => onGetDirections(selectedCustomer)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/>
                        </svg>
                        Get Directions
                      </button>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
