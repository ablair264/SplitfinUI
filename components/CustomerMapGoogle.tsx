import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import './CustomerMap.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyB3fpUZexx1zRETMigOVtWFUNDe9Xe_sfs';

// UK Regions - keeping just centers for zoom functionality
const UK_REGIONS = {
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

interface Customer {
  id: string;
  customer_id: string;
  customer_name: string;
  email: string;
  postcode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  location_region?: string;
  total_spent?: number;
  order_count?: number;
  brand_preferences?: string;
  last_order_date?: string;
}

// Generate mock customers with UK coordinates
const generateMockCustomers = (): Customer[] => {
  const customers: Customer[] = [];
  const regions = Object.keys(UK_REGIONS);
  
  // Generate customers for each region
  regions.forEach((region, regionIndex) => {
    const regionData = UK_REGIONS[region as keyof typeof UK_REGIONS];
    const customerCount = Math.floor(Math.random() * 20) + 10; // 10-30 customers per region
    
    for (let i = 0; i < customerCount; i++) {
      const customerId = `CUST-${regionIndex * 100 + i + 1}`;
      const totalSpent = Math.floor(Math.random() * 20000) + 1000;
      const orderCount = Math.floor(Math.random() * 50) + 1;
      
      // Generate coordinates around the region center with some randomness
      const latOffset = (Math.random() - 0.5) * 2; // ±1 degree
      const lngOffset = (Math.random() - 0.5) * 3; // ±1.5 degrees
      
      customers.push({
        id: customerId,
        customer_id: customerId,
        customer_name: `${['John', 'Jane', 'Robert', 'Sarah', 'Michael', 'Emma'][i % 6]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5]}`,
        email: `customer${regionIndex}${i}@example.com`,
        postcode: `${region.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 99) + 1} ${Math.floor(Math.random() * 9) + 1}${['AB', 'CD', 'EF', 'GH', 'IJ'][i % 5]}`,
        coordinates: {
          latitude: regionData.center.lat + latOffset,
          longitude: regionData.center.lng + lngOffset
        },
        location_region: region,
        total_spent: totalSpent,
        order_count: orderCount,
        brand_preferences: ['TechCorp', 'StyleBrand', 'HomeGoods', 'SportZone'][Math.floor(Math.random() * 4)],
        last_order_date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
  });
  
  return customers;
};

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 54.5,
  lng: -4
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#1a1f2a" }]
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
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ecf0f1" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }, { weight: 2 }]
    }
  ]
};

const CustomerMapGoogle: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock customers
      const mockCustomers = generateMockCustomers();
      setCustomers(mockCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter customers by selected region
  const filteredCustomers = useMemo(() => {
    if (!selectedRegion) return customers;
    return customers.filter(customer => customer.location_region === selectedRegion);
  }, [customers, selectedRegion]);

  // Calculate regional statistics
  const regionalStats = useMemo(() => {
    const stats: Record<string, { count: number; revenue: number }> = {};
    
    customers.forEach(customer => {
      const region = customer.location_region;
      if (region) {
        if (!stats[region]) {
          stats[region] = { count: 0, revenue: 0 };
        }
        stats[region].count++;
        stats[region].revenue += customer.total_spent || 0;
      }
    });
    
    return stats;
  }, [customers]);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region === selectedRegion ? null : region);
    
    if (mapRef && region !== selectedRegion) {
      const regionData = UK_REGIONS[region as keyof typeof UK_REGIONS];
      mapRef.panTo(regionData.center);
      mapRef.setZoom(8);
    } else if (mapRef && region === selectedRegion) {
      mapRef.panTo(defaultCenter);
      mapRef.setZoom(6);
    }
  };

  const getMarkerIcon = (customer: Customer) => {
    const value = customer.total_spent || 0;
    let color: string;
    let scale: number;
    
    if (value < 5000) {
      color = '#10b981'; // Green
      scale = 0.7;
    } else if (value < 10000) {
      color = '#f59e0b'; // Orange
      scale = 0.85;
    } else {
      color = '#ef4444'; // Red
      scale = 1;
    }
    
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.8,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: scale * 10
    };
  };

  const handleMarkerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleViewCustomer = () => {
    if (selectedCustomer) {
      navigate(`/customer/${selectedCustomer.id}`);
    }
  };

  const handleGetDirections = () => {
    if (selectedCustomer?.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedCustomer.coordinates.latitude},${selectedCustomer.coordinates.longitude}`;
      window.open(url, '_blank');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="customer-map-container">
      {/* Sidebar */}
      <div className={`map-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Customer Locations</h2>
          <button className="sidebar-toggle desktop-hidden" onClick={toggleSidebar}>
            {isSidebarOpen ? '×' : '☰'}
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="region-list">
            <h3>Regions</h3>
            <button
              className={`region-item ${!selectedRegion ? 'active' : ''}`}
              onClick={() => handleRegionClick('')}
            >
              <span>All Regions</span>
              <span className="region-count">{customers.length}</span>
            </button>
            
            {Object.entries(UK_REGIONS).map(([region, data]) => {
              const stats = regionalStats[region] || { count: 0, revenue: 0 };
              return (
                <button
                  key={region}
                  className={`region-item ${selectedRegion === region ? 'active' : ''}`}
                  onClick={() => handleRegionClick(region)}
                >
                  <div className="region-info">
                    <span className="region-name">{region}</span>
                    <span className="region-revenue">
                      £{stats.revenue.toLocaleString()}
                    </span>
                  </div>
                  <span className="region-count">{stats.count}</span>
                </button>
              );
            })}
          </div>
          
          <div className="map-legend">
            <h3>Customer Value</h3>
            <div className="legend-item">
              <span className="legend-marker" style={{ backgroundColor: '#10b981' }}></span>
              <span>Under £5,000</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker" style={{ backgroundColor: '#f59e0b' }}></span>
              <span>£5,000 - £10,000</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker" style={{ backgroundColor: '#ef4444' }}></span>
              <span>Over £10,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      {!isSidebarOpen && (
        <button className="mobile-sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {/* Map */}
      <div className="map-container">
        {loading ? (
          <div className="map-loading">
            <div className="loader"></div>
            <p>Loading customer locations...</p>
          </div>
        ) : (
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={6}
              options={options}
              onLoad={(map) => setMapRef(map)}
            >
              <MarkerClusterer
                options={{
                  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                  gridSize: 60,
                  maxZoom: 15
                }}
              >
                {(clusterer) => (
                  <>
                    {filteredCustomers.map((customer) => {
                      if (!customer.coordinates) return null;
                      
                      return (
                        <Marker
                          key={customer.id}
                          position={{
                            lat: customer.coordinates.latitude,
                            lng: customer.coordinates.longitude
                          }}
                          icon={getMarkerIcon(customer)}
                          onClick={() => handleMarkerClick(customer)}
                          clusterer={clusterer}
                        />
                      );
                    })}
                  </>
                )}
              </MarkerClusterer>

              {selectedCustomer && selectedCustomer.coordinates && (
                <InfoWindow
                  position={{
                    lat: selectedCustomer.coordinates.latitude,
                    lng: selectedCustomer.coordinates.longitude
                  }}
                  onCloseClick={() => setSelectedCustomer(null)}
                >
                  <div className="info-window">
                    <h3>{selectedCustomer.customer_name}</h3>
                    <p className="info-email">{selectedCustomer.email}</p>
                    <div className="info-stats">
                      <div className="stat">
                        <span className="stat-label">Total Spent:</span>
                        <span className="stat-value">
                          £{selectedCustomer.total_spent?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Orders:</span>
                        <span className="stat-value">{selectedCustomer.order_count || 0}</span>
                      </div>
                    </div>
                    <div className="info-actions">
                      <button onClick={handleViewCustomer} className="info-button primary">
                        View Customer
                      </button>
                      <button onClick={handleGetDirections} className="info-button secondary">
                        Get Directions
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    </div>
  );
};

export default CustomerMapGoogle;