import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ShoppingCart, User, Eye } from 'lucide-react';
import { MetricCard } from './shared';
import MetricIcon from './shared/MetricIcon';
import { ProgressLoader } from './ProgressLoader';
import styles from './CustomersManagement.module.css';
import '../styles/animations.css';

interface Customer {
  id: string;
  customer_id: string;
  customer_name: string;
  company_name: string;
  email: string;
  phone: string;
  city?: string;
  postcode?: string;
  location_region?: string;
  status: string;
  created_time: string;
  created_date?: string;
  last_modified_time: string;
  outstanding_receivable_amount: number;
  total_spent: number;
  order_count: number;
  average_order_value: number;
  first_order_date?: string;
  last_order_date?: string;
  sales_agent_id?: string;
  customer_logo?: string;
  metrics?: {
    total_spent?: number;
    order_count?: number;
    last_order_date?: string;
    first_order_date?: string;
  };
}

interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  activeCustomers: number;
}

type SortBy = 'name' | 'date' | 'value' | 'orders';

// Mock data generator
const generateMockCustomers = (): Customer[] => {
  const companies = ['Tech Solutions Inc', 'Global Retail Co', 'Smart Industries', 'Digital Services Ltd', 'Innovation Hub', 'Future Systems', 'Data Analytics Corp', 'Cloud Technologies', 'Mobile Solutions', 'Web Services'];
  const cities = ['New York', 'London', 'San Francisco', 'Tokyo', 'Paris', 'Sydney', 'Toronto', 'Berlin', 'Singapore', 'Dubai'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Middle East', 'South America'];
  
  return Array.from({ length: 75 }, (_, i) => {
    const companyIndex = i % companies.length;
    const cityIndex = i % cities.length;
    const orderCount = Math.floor(Math.random() * 50) + 1;
    const totalSpent = Math.floor(Math.random() * 100000) + 5000;
    const createdDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    const lastOrderDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    return {
      id: `CUST-${1000 + i}`,
      customer_id: `CUST-${1000 + i}`,
      customer_name: `${['John', 'Jane', 'Robert', 'Sarah', 'Michael', 'Emma'][i % 6]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5]}`,
      company_name: companies[companyIndex],
      email: `contact${i + 1}@${companies[companyIndex].toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      city: cities[cityIndex],
      postcode: `${Math.floor(Math.random() * 90000 + 10000)}`,
      location_region: regions[Math.floor(cityIndex / 2)],
      status: Math.random() > 0.1 ? 'Active' : 'Inactive',
      created_time: createdDate.toISOString(),
      created_date: createdDate.toISOString().split('T')[0],
      last_modified_time: lastOrderDate.toISOString(),
      outstanding_receivable_amount: Math.random() > 0.7 ? Math.floor(Math.random() * 10000) : 0,
      total_spent: totalSpent,
      order_count: orderCount,
      average_order_value: Math.floor(totalSpent / orderCount),
      first_order_date: createdDate.toISOString(),
      last_order_date: lastOrderDate.toISOString(),
      sales_agent_id: `AGENT-${Math.floor(Math.random() * 5) + 1}`,
      customer_logo: Math.random() > 0.5 ? `/logos/company-${(i % 10) + 1}.png` : undefined,
      metrics: {
        total_spent: totalSpent,
        order_count: orderCount,
        last_order_date: lastOrderDate.toISOString(),
        first_order_date: createdDate.toISOString()
      }
    };
  });
};

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerMetrics, setCustomerMetrics] = useState<CustomerMetrics>({
    totalCustomers: 0,
    newCustomers: 0,
    activeCustomers: 0
  });

  const customersPerPage = 25;
  const navigate = useNavigate();

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
      
      // Calculate metrics
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      
      const newCustomers = mockCustomers.filter(c => 
        new Date(c.created_time) > threeMonthsAgo
      ).length;
      
      const activeCustomers = mockCustomers.filter(c => 
        c.status === 'Active'
      ).length;
      
      setCustomerMetrics({
        totalCustomers: mockCustomers.length,
        newCustomers,
        activeCustomers
      });
      
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const searchTerm = search.toLowerCase();
      return (
        customer.customer_name?.toLowerCase().includes(searchTerm) ||
        customer.company_name?.toLowerCase().includes(searchTerm) ||
        customer.email?.toLowerCase().includes(searchTerm)
      );
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.customer_name.localeCompare(b.customer_name);
        case 'date':
          return new Date(b.last_order_date || 0).getTime() - new Date(a.last_order_date || 0).getTime();
        case 'value':
          return b.total_spent - a.total_spent;
        case 'orders':
          return b.order_count - a.order_count;
        default:
          return 0;
      }
    });

    return filtered;
  }, [customers, search, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  const handleNewOrder = (customer: Customer) => {
    navigate(`/select-brand/${customer.id}`);
  };

  const handleViewCustomer = (customer: Customer) => {
    navigate(`/customer/${customer.id}`);
  };

  const handleViewOrders = (customer: Customer) => {
    navigate(`/orders?customer=${customer.customer_id}`);
  };

  if (loading) {
    return <ProgressLoader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Customer Management</h1>
        <button 
          className={styles.addButton}
          onClick={() => navigate('/customers/new')}
        >
          <Plus size={20} />
          Add Customer
        </button>
      </div>

      {/* Metrics Cards */}
      <div className={styles.metricsGrid}>
        <MetricCard
          title="Total Customers"
          value={customerMetrics.totalCustomers}
          format="number"
          icon={<MetricIcon type="customers" className={styles.metricIcon} />}
          className={styles.metricCard}
        />
        <MetricCard
          title="New Customers"
          value={customerMetrics.newCustomers}
          format="number"
          subtitle="Last 3 months"
          icon={<MetricIcon type="growth" className={styles.metricIcon} />}
          className={styles.metricCard}
        />
        <MetricCard
          title="Active Customers"
          value={customerMetrics.activeCustomers}
          format="number"
          icon={<MetricIcon type="active" className={styles.metricIcon} />}
          className={styles.metricCard}
        />
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.sortContainer}>
          <label className={styles.sortLabel}>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className={styles.sortSelect}
          >
            <option value="name">Name</option>
            <option value="date">Last Order</option>
            <option value="value">Total Value</option>
            <option value="orders">Order Count</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Location</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id} className={styles.row}>
                <td>
                  <div className={styles.customerInfo}>
                    <div className={styles.avatar}>
                      {customer.customer_logo ? (
                        <img src={customer.customer_logo} alt="" />
                      ) : (
                        <span>{customer.customer_name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className={styles.customerName}>{customer.customer_name}</div>
                      <div className={styles.companyName}>{customer.company_name}</div>
                    </div>
                  </div>
                </td>
                <td>{customer.email}</td>
                <td>
                  <div>
                    <div>{customer.city}</div>
                    <div className={styles.region}>{customer.location_region}</div>
                  </div>
                </td>
                <td>{customer.order_count}</td>
                <td>${customer.total_spent.toLocaleString()}</td>
                <td>
                  {customer.last_order_date 
                    ? new Date(customer.last_order_date).toLocaleDateString()
                    : 'Never'
                  }
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleNewOrder(customer)}
                      title="New Order"
                    >
                      <ShoppingCart size={16} />
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleViewCustomer(customer)}
                      title="View Customer"
                    >
                      <User size={16} />
                    </button>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleViewOrders(customer)}
                      title="View Orders"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}