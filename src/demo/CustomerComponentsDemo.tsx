import React, { useState } from 'react';
import { CustomersManagement, CustomerMapGoogle, CustomerDetail } from '../components/customer-components';
import type { Customer, MapCustomer, CustomerDetailData } from '../components/customer-components';

/**
 * Demo showing how to use the generic customer components
 * This example demonstrates:
 * 1. How to provide data to the components
 * 2. How to handle callbacks and navigation between components
 * 3. How to customize the appearance and behavior
 */

// Mock data generators (in production, this would come from your API)
const generateCustomerData = (): Customer[] => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `customer-${i + 1}`,
    name: `${['Acme', 'Tech', 'Global', 'Prime'][i % 4]} Customer ${i + 1}`,
    companyName: `${['Acme Corp', 'Tech Industries', 'Global Solutions', 'Prime Services'][i % 4]} Ltd`,
    email: `contact${i + 1}@company.com`,
    phone: `+44 20 ${7000 + i} ${1000 + i}`,
    city: ['London', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast'][i % 5],
    postcode: `SW${(i % 20) + 1} ${(i % 9) + 1}AA`,
    region: ['London', 'North West', 'Scotland', 'Wales', 'Northern Ireland'][i % 5],
    status: ['active', 'inactive', 'pending'][i % 3] as 'active' | 'inactive' | 'pending',
    createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastModifiedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalSpent: Math.floor(Math.random() * 100000),
    orderCount: Math.floor(Math.random() * 50),
    lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

const convertToMapCustomer = (customer: Customer): MapCustomer => {
  // Generate random UK coordinates based on region
  const regionCoords: Record<string, { lat: number; lng: number }> = {
    'London': { lat: 51.5074, lng: -0.1278 },
    'North West': { lat: 53.7632, lng: -2.7044 },
    'Scotland': { lat: 56.4907, lng: -4.2026 },
    'Wales': { lat: 52.1307, lng: -3.7837 },
    'Northern Ireland': { lat: 54.5973, lng: -5.9301 }
  };
  
  const baseCoord = regionCoords[customer.region || 'London'] || regionCoords['London'];
  
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    postcode: customer.postcode || '',
    coordinates: {
      latitude: baseCoord.lat + (Math.random() - 0.5) * 0.5,
      longitude: baseCoord.lng + (Math.random() - 0.5) * 0.5
    },
    region: customer.region,
    totalSpent: customer.totalSpent,
    orderCount: customer.orderCount,
    lastOrderDate: customer.lastOrderDate
  };
};

const convertToDetailCustomer = (customer: Customer): CustomerDetailData => {
  return {
    id: customer.id,
    name: customer.name,
    companyName: customer.companyName,
    email: customer.email,
    phone: customer.phone,
    creditLimit: 50000,
    outstandingAmount: Math.random() * 20000,
    overdueAmount: Math.random() * 5000,
    paymentPerformance: Math.floor(Math.random() * 30) + 70,
    paymentTerms: 30,
    paymentTermsLabel: 'Net 30 days',
    totalInvoiced: customer.totalSpent,
    invoiceCount: customer.orderCount,
    addresses: {
      billing: {
        address: '123 Business Street',
        city: customer.city || 'London',
        state: 'England',
        zip: customer.postcode || 'SW1A 1AA',
        country: 'United Kingdom'
      },
      shipping: {
        address: '456 Warehouse Road',
        city: customer.city || 'London',
        state: 'England',
        zip: customer.postcode || 'SW1A 1AA',
        country: 'United Kingdom'
      }
    },
    contacts: [
      {
        id: 'contact-1',
        firstName: 'John',
        lastName: 'Smith',
        email: customer.email,
        phone: customer.phone,
        department: 'Purchasing',
        isPrimary: true
      }
    ],
    region: customer.region,
    status: customer.status,
    createdDate: customer.createdDate,
    lastModifiedDate: customer.lastModifiedDate
  };
};

export default function CustomerComponentsDemo() {
  const [currentView, setCurrentView] = useState<'list' | 'map' | 'detail'>('list');
  const [customers] = useState<Customer[]>(generateCustomerData());
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  
  // Find selected customer
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
  
  // Component callbacks
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomerId(customer.id);
    setCurrentView('detail');
  };
  
  const handleViewMap = () => {
    setCurrentView('map');
  };
  
  const handleCreateOrder = (customer: Customer | CustomerDetailData) => {
    console.log('Create order for:', customer.name);
    // In production, navigate to order creation page
  };
  
  const handleBack = () => {
    setCurrentView('list');
    setSelectedCustomerId(null);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* Navigation buttons for demo */}
      <div style={{ 
        position: 'fixed', 
        top: 20, 
        right: 20, 
        zIndex: 1000,
        display: 'flex',
        gap: '10px'
      }}>
        <button 
          onClick={() => setCurrentView('list')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentView === 'list' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Customer List
        </button>
        <button 
          onClick={() => setCurrentView('map')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentView === 'map' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Customer Map
        </button>
      </div>

      {/* Customer List View */}
      {currentView === 'list' && (
        <CustomersManagement
          customers={customers}
          onViewCustomer={handleViewCustomer}
          onCreateOrder={handleCreateOrder}
          onViewOrders={(customer) => console.log('View orders for:', customer.name)}
          onCreateCustomer={() => console.log('Create new customer')}
          title="Customer Management Demo"
          enableActions={true}
          enableSearch={true}
          enableSort={true}
          enablePagination={true}
          customersPerPage={25}
        />
      )}

      {/* Customer Map View */}
      {currentView === 'map' && (
        <CustomerMapGoogle
          customers={customers.map(convertToMapCustomer)}
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
          onViewCustomer={(mapCustomer) => {
            const customer = customers.find(c => c.id === mapCustomer.id);
            if (customer) handleViewCustomer(customer);
          }}
          enableClustering={true}
          enableRegionFilter={true}
          enableInfoWindow={true}
          enableDirections={true}
        />
      )}

      {/* Customer Detail View */}
      {currentView === 'detail' && selectedCustomer && (
        <CustomerDetail
          customer={convertToDetailCustomer(selectedCustomer)}
          onBack={handleBack}
          onViewMap={handleViewMap}
          onCreateOrder={handleCreateOrder}
          onViewAllOrders={(customer) => console.log('View all orders for:', customer.name)}
          enableAIInsights={true}
          enableQuickActions={true}
          enableTabs={{
            overview: true,
            financial: true,
            contacts: true,
            orders: true
          }}
        />
      )}
    </div>
  );
}

// Example of how to use individual components with custom styling
export function CustomersListExample() {
  return (
    <CustomersManagement
      // Provide your own customer data
      customers={generateCustomerData()}
      
      // Customize appearance
      title="My Customers"
      createButtonText="Add Customer"
      searchPlaceholder="Search by name or email..."
      
      // Customize metric colors
      metricColors={{
        total: '#3498db',
        new: '#e74c3c',
        active: '#2ecc71'
      }}
      
      // Handle actions
      onCreateCustomer={() => {
        // Your create customer logic
        console.log('Opening create customer form...');
      }}
      
      onViewCustomer={(customer) => {
        // Your view customer logic
        console.log('Viewing customer:', customer.name);
      }}
      
      // Disable features you don't need
      enableActions={true}
      enableSearch={true}
      enableSort={true}
      enablePagination={true}
    />
  );
}

// Example with API integration
export function CustomersWithAPIExample() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch customers from your API
  React.useEffect(() => {
    async function fetchCustomers() {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/customers');
        const data = await response.json();
        
        // Transform API data to match Customer interface
        const transformedCustomers = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          companyName: item.company,
          email: item.email,
          // ... map other fields
        }));
        
        setCustomers(transformedCustomers);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCustomers();
  }, []);
  
  return (
    <CustomersManagement
      customers={customers}
      loading={loading}
      loadingMessage="Fetching customers from API..."
      onRefresh={() => {
        // Refetch customers
        console.log('Refreshing customer data...');
      }}
    />
  );
}
