import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { 
  CustomersManagement, 
  CustomerMapGoogle, 
  CustomerDetail 
} from './components/customer-components';
import type { 
  Customer, 
  MapCustomer, 
  CustomerDetailData 
} from './components/customer-components';

/**
 * Sample integration showing how to use the customer components
 * with React Router and a typical application structure
 */

// Mock API service (replace with your actual API)
const customerAPI = {
  // Fetch all customers
  async getCustomers(): Promise<Customer[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, replace with actual API call:
    // const response = await fetch('/api/customers');
    // return response.json();
    
    return generateMockCustomers();
  },
  
  // Fetch single customer
  async getCustomer(id: string): Promise<CustomerDetailData | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production:
    // const response = await fetch(`/api/customers/${id}`);
    // return response.json();
    
    const customers = generateMockCustomers();
    const customer = customers.find(c => c.id === id);
    return customer ? convertToDetailCustomer(customer) : null;
  },
  
  // Create new customer
  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production:
    // const response = await fetch('/api/customers', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return response.json();
    
    return {
      id: `customer-${Date.now()}`,
      name: data.name || 'New Customer',
      email: data.email || 'new@customer.com',
      status: 'active',
      createdDate: new Date().toISOString(),
      totalSpent: 0,
      orderCount: 0,
      ...data
    } as Customer;
  }
};

// Helper functions for data transformation
function generateMockCustomers(): Customer[] {
  const companies = ['Acme Corp', 'Tech Industries', 'Global Solutions', 'Prime Services'];
  const cities = ['London', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast'];
  const regions = ['London', 'North West', 'Scotland', 'Wales', 'Northern Ireland'];
  
  return Array.from({ length: 100 }, (_, i) => ({
    id: `customer-${i + 1}`,
    name: `${companies[i % 4]} ${i + 1}`,
    companyName: `${companies[i % 4]} Ltd`,
    email: `contact${i + 1}@${companies[i % 4].toLowerCase().replace(' ', '')}.com`,
    phone: `+44 20 ${7000 + i} ${1000 + i}`,
    city: cities[i % 5],
    postcode: `SW${(i % 20) + 1} ${(i % 9) + 1}AA`,
    region: regions[i % 5],
    status: ['active', 'inactive', 'pending'][i % 3] as any,
    createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    totalSpent: Math.floor(Math.random() * 100000),
    orderCount: Math.floor(Math.random() * 50),
    lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

function convertToMapCustomer(customer: Customer): MapCustomer {
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
}

function convertToDetailCustomer(customer: Customer): CustomerDetailData {
  return {
    id: customer.id,
    name: customer.name,
    companyName: customer.companyName,
    email: customer.email,
    phone: customer.phone,
    creditLimit: 50000 + Math.floor(Math.random() * 50000),
    outstandingAmount: Math.floor(Math.random() * 20000),
    overdueAmount: Math.floor(Math.random() * 5000),
    paymentPerformance: Math.floor(Math.random() * 30) + 70,
    paymentTerms: [14, 30, 45, 60][Math.floor(Math.random() * 4)],
    paymentTermsLabel: ['Net 14 days', 'Net 30 days', 'Net 45 days', 'Net 60 days'][Math.floor(Math.random() * 4)],
    totalInvoiced: customer.totalSpent,
    invoiceCount: customer.orderCount,
    addresses: {
      billing: {
        address: `${Math.floor(Math.random() * 999) + 1} Business Street`,
        city: customer.city || 'London',
        state: 'England',
        zip: customer.postcode || 'SW1A 1AA',
        country: 'United Kingdom'
      }
    },
    contacts: [{
      id: 'contact-1',
      firstName: 'John',
      lastName: 'Smith',
      email: customer.email,
      phone: customer.phone,
      department: 'Purchasing',
      isPrimary: true
    }],
    region: customer.region,
    status: customer.status,
    createdDate: customer.createdDate,
    lastModifiedDate: customer.lastModifiedDate
  };
}

// Customer List Page Component
function CustomerListPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadCustomers();
  }, []);
  
  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerAPI.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to load customers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <CustomersManagement
      customers={customers}
      loading={loading}
      onCreateCustomer={() => navigate('/customers/new')}
      onViewCustomer={(customer) => navigate(`/customers/${customer.id}`)}
      onCreateOrder={(customer) => navigate(`/orders/new?customerId=${customer.id}`)}
      onViewOrders={(customer) => navigate(`/orders?customerId=${customer.id}`)}
      onRefresh={loadCustomers}
    />
  );
}

// Customer Map Page Component
function CustomerMapPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<MapCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadCustomers();
  }, []);
  
  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerAPI.getCustomers();
      setCustomers(data.map(convertToMapCustomer));
    } catch (error) {
      console.error('Failed to load customers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <CustomerMapGoogle
      customers={customers}
      loading={loading}
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
      onViewCustomer={(customer) => navigate(`/customers/${customer.id}`)}
    />
  );
}

// Customer Detail Page Component
function CustomerDetailPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (customerId) {
      loadCustomer(customerId);
    }
  }, [customerId]);
  
  const loadCustomer = async (id: string) => {
    try {
      setLoading(true);
      const data = await customerAPI.getCustomer(id);
      setCustomer(data);
    } catch (error) {
      console.error('Failed to load customer:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateInsights = async (customer: CustomerDetailData) => {
    // Simulate AI insights generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      insights: `Based on analysis, ${customer.name} has a ${customer.paymentPerformance}% payment reliability score. Consider offering extended payment terms to increase order frequency.`
    };
  };
  
  if (!customer && !loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Customer not found</h2>
        <button onClick={() => navigate('/customers')}>Back to Customers</button>
      </div>
    );
  }
  
  return (
    <CustomerDetail
      customer={customer || undefined}
      loading={loading}
      onBack={() => navigate('/customers')}
      onViewMap={() => navigate('/customers/map')}
      onCreateOrder={(customer) => navigate(`/orders/new?customerId=${customer.id}`)}
      onViewAllOrders={(customer) => navigate(`/orders?customerId=${customer.id}`)}
      onGenerateInsights={handleGenerateInsights}
      onSendReminder={(customer) => {
        console.log('Sending payment reminder to:', customer.email);
        alert(`Payment reminder sent to ${customer.email}`);
      }}
    />
  );
}

// Main App Component with Routes
export default function CustomerManagementApp() {
  return (
    <Routes>
      <Route path="/customers" element={<CustomerListPage />} />
      <Route path="/customers/map" element={<CustomerMapPage />} />
      <Route path="/customers/:customerId" element={<CustomerDetailPage />} />
      <Route path="/customers/new" element={<CreateCustomerPage />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

// Create Customer Page (example)
function CreateCustomerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    city: '',
    postcode: '',
    region: 'London'
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCustomer = await customerAPI.createCustomer({
        ...formData,
        status: 'active',
        createdDate: new Date().toISOString(),
        totalSpent: 0,
        orderCount: 0
      });
      navigate(`/customers/${newCustomer.id}`);
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Create New Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        {/* Add other form fields */}
        <button type="submit">Create Customer</button>
        <button type="button" onClick={() => navigate('/customers')}>Cancel</button>
      </form>
    </div>
  );
}

// Example of using with Context/Global State
export function CustomerManagementWithContext() {
  // You can wrap the components with your app's context providers
  return (
    <YourAppProvider>
      <YourAuthProvider>
        <YourThemeProvider>
          <CustomerManagementApp />
        </YourThemeProvider>
      </YourAuthProvider>
    </YourAppProvider>
  );
}
