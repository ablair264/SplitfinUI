import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Search, ShoppingCart, User, Eye } from 'lucide-react';
import { MetricCard } from '../Dashboard/shared';
import MetricIcon from '../Dashboard/shared/MetricIcon';
import { ProgressLoader } from '../Dashboard/shared/ProgressLoader';
import styles from './CustomersManagement.module.css';
import '../../styles/animations.css';

// Generic Customer interface
export interface Customer {
  id: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  city?: string;
  postcode?: string;
  region?: string;
  status: 'active' | 'inactive' | 'pending';
  createdDate: string;
  lastModifiedDate?: string;
  outstandingAmount?: number;
  totalSpent: number;
  orderCount: number;
  averageOrderValue?: number;
  firstOrderDate?: string;
  lastOrderDate?: string;
  logo?: string;
  customFields?: Record<string, any>;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  activeCustomers: number;
}

export interface CustomersManagementProps {
  // Data props
  customers?: Customer[];
  metrics?: CustomerMetrics;
  loading?: boolean;
  loadingMessage?: string;
  
  // Feature flags
  enableSearch?: boolean;
  enableSort?: boolean;
  enablePagination?: boolean;
  enableActions?: boolean;
  customersPerPage?: number;
  
  // Callbacks
  onCreateCustomer?: () => void;
  onViewCustomer?: (customer: Customer) => void;
  onCreateOrder?: (customer: Customer) => void;
  onViewOrders?: (customer: Customer) => void;
  onRefresh?: () => void;
  
  // Customization
  title?: string;
  createButtonText?: string;
  searchPlaceholder?: string;
  emptyStateMessage?: string;
  emptyStateIcon?: string;
  
  // Metric card customization
  metricColors?: {
    total?: string;
    new?: string;
    active?: string;
  };
}

type SortBy = 'name' | 'date' | 'value' | 'orders';

// Default mock data generator
const generateMockCustomers = (): Customer[] => {
  const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];
  const regions = ['London', 'Scotland', 'Wales', 'North East', 'North West', 'Midlands', 'South East', 'South West'];
  const companies = ['Tech Corp', 'Global Industries', 'Creative Agency', 'Retail Group', 'Manufacturing Ltd', 'Services Inc'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `customer-${i + 1}`,
    name: `Customer ${i + 1}`,
    companyName: companies[Math.floor(Math.random() * companies.length)] + ` ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    phone: `+44 20 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
    city: regions[Math.floor(Math.random() * regions.length)],
    postcode: `SW${Math.floor(Math.random() * 20) + 1} ${Math.floor(Math.random() * 9)}AA`,
    region: regions[Math.floor(Math.random() * regions.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastModifiedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    outstandingAmount: Math.random() * 10000,
    totalSpent: Math.floor(Math.random() * 100000),
    orderCount: Math.floor(Math.random() * 100),
    averageOrderValue: Math.floor(Math.random() * 1000),
    firstOrderDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastOrderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

// Default callbacks
const defaultCallbacks = {
  onCreateCustomer: () => console.log('Create customer clicked'),
  onViewCustomer: (customer: Customer) => console.log('View customer:', customer.id),
  onCreateOrder: (customer: Customer) => console.log('Create order for:', customer.id),
  onViewOrders: (customer: Customer) => console.log('View orders for:', customer.id),
};

export default function CustomersManagement({
  customers: propCustomers,
  metrics: propMetrics,
  loading = false,
  loadingMessage = 'Loading customers...',
  enableSearch = true,
  enableSort = true,
  enablePagination = true,
  enableActions = true,
  customersPerPage = 25,
  onCreateCustomer = defaultCallbacks.onCreateCustomer,
  onViewCustomer = defaultCallbacks.onViewCustomer,
  onCreateOrder = defaultCallbacks.onCreateOrder,
  onViewOrders = defaultCallbacks.onViewOrders,
  onRefresh,
  title = 'Customer Management',
  createButtonText = 'New Customer',
  searchPlaceholder = 'Search customers by name, company, or email...',
  emptyStateMessage = 'No customers found',
  emptyStateIcon = '👥',
  metricColors = {
    total: '#79d5e9',
    new: '#f77d11',
    active: '#61bc8e'
  }
}: CustomersManagementProps) {
  // Use provided customers or generate mock data
  const [customers] = useState<Customer[]>(propCustomers || generateMockCustomers());
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate metrics if not provided
  const customerMetrics = useMemo(() => {
    if (propMetrics) return propMetrics;
    
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
    
    const totalCustomers = customers.length;
    
    const newCustomers = customers.filter(customer => {
      const createdDate = new Date(customer.createdDate);
      return createdDate >= threeMonthsAgo;
    }).length;
    
    const activeCustomers = customers.filter(customer => 
      customer.status === 'active'
    ).length;

    return {
      totalCustomers,
      newCustomers,
      activeCustomers
    };
  }, [customers, propMetrics]);

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers;
    
    // Apply search filter
    if (enableSearch && search) {
      filtered = customers.filter(customer =>
        customer.name?.toLowerCase().includes(search.toLowerCase()) ||
        customer.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        customer.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting
    if (enableSort) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return (a.name || '').localeCompare(b.name || '');
          case 'date':
            const aDate = new Date(a.lastOrderDate || a.createdDate || 0);
            const bDate = new Date(b.lastOrderDate || b.createdDate || 0);
            return bDate.getTime() - aDate.getTime();
          case 'value':
            return (b.totalSpent || 0) - (a.totalSpent || 0);
          case 'orders':
            return (b.orderCount || 0) - (a.orderCount || 0);
          default:
            return 0;
        }
      });
    }
    
    return filtered;
  }, [customers, search, sortBy, enableSearch, enableSort]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / customersPerPage);
  const currentCustomers = enablePagination 
    ? filteredAndSortedCustomers.slice(
        (currentPage - 1) * customersPerPage,
        currentPage * customersPerPage
      )
    : filteredAndSortedCustomers;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Never';
    try {
      return new Date(dateString).toLocaleDateString('en-GB');
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <ProgressLoader
          progress={33}
          messages={[
            loadingMessage,
            'Fetching customer data...',
            'Calculating metrics...'
          ]}
        />
      </div>
    );
  }

  return (
    <div className={styles.customersContainer}>
      <div className={styles.pageHeader}>
        <h1>{title}</h1>
        <div className={styles.headerActions}>
          {onRefresh && (
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onRefresh}>
              Refresh
            </button>
          )}
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onCreateCustomer}>
            <Plus size={20} /> {createButtonText}
          </button>
        </div>
      </div>

      {/* Metric Cards - Compact Design with Enhanced Colors */}
      <div className={styles.metricsGrid3}>
        <MetricCard
          id="total-customers"
          title="Total Customers"
          value={customerMetrics.totalCustomers}
          subtitle="All customers"
          icon={<MetricIcon name="users" size={24} />}
          color={metricColors.total}
          displayMode="compact"
        />
        
        <MetricCard
          id="new-customers"
          title="New Customers"
          value={customerMetrics.newCustomers}
          subtitle="Last 3 months"
          icon={<MetricIcon name="user-plus" size={24} />}
          color={metricColors.new}
          displayMode="compact"
          trend={{
            value: customerMetrics.totalCustomers > 0 ? 
             Math.round(customerMetrics.newCustomers / customerMetrics.totalCustomers * 100) : 0,
            isPositive: customerMetrics.newCustomers > 0
          }}
        />
        
        <MetricCard
          id="active-customers"
          title="Active Customers"
          value={customerMetrics.activeCustomers}
          subtitle="Active status"
          icon={<MetricIcon name="user-check" size={24} />}
          color={metricColors.active}
          displayMode="compact"
          trend={{
            value: customerMetrics.totalCustomers > 0 ? 
              Math.round(customerMetrics.activeCustomers / customerMetrics.totalCustomers * 100) : 0,
            isPositive: customerMetrics.activeCustomers > 0
          }}
        />
      </div>

      {/* Search and Filter Controls */}
      {(enableSearch || enableSort) && (
        <div className={styles.customersControls}>
          {enableSearch && (
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          )}
          
          {enableSort && (
            <div className={styles.filterControls}>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className={styles.sortFilter}
              >
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Last Order</option>
                <option value="value">Sort by Total Value</option>
                <option value="orders">Sort by Order Count</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Customers Table */}
      <div className={styles.customersTable}>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderRow}>
              <div>Customer</div>
              <div>Email</div>
              <div>Last Order</div>
              {enableActions && <div>Actions</div>}
            </div>
          </div>
          
          <div className={styles.tableBody}>
            {currentCustomers.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>{emptyStateIcon}</div>
                <h3>{emptyStateMessage}</h3>
                <p>Try adjusting your search criteria or add a new customer.</p>
              </div>
            ) : (
              currentCustomers.map((customer) => (
                <div key={customer.id} className={styles.tableRow}>
                  <div className={styles.tableCell} data-label="Customer">
                    <div className={styles.customerLogoName}>
                      {customer.logo ? (
                        <img 
                          src={customer.logo} 
                          alt={customer.name}
                          className={styles.customerLogo}
                        />
                      ) : (
                        <div className={styles.customerLogoPlaceholder}>
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className={styles.customerName}>{customer.name}</div>
                        {customer.companyName && customer.companyName !== customer.name && (
                          <div className={styles.companyName}>{customer.companyName}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.tableCell} data-label="Email">
                    <div className={styles.customerEmail}>{customer.email}</div>
                  </div>
                  
                  <div className={styles.tableCell} data-label="Last Order">
                    <div className={styles.lastOrderDate}>
                      {formatDate(customer.lastOrderDate)}
                    </div>
                  </div>
                  
                  {enableActions && (
                    <div className={styles.tableCell} data-label="Actions">
                      <div className={styles.actionButtons}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCreateOrder(customer);
                          }}
                          className={`${styles.actionBtn} ${styles.newOrderBtn}`}
                          title="New Order"
                        >
                          <ShoppingCart size={12} />
                          New Order
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewCustomer(customer);
                          }}
                          className={`${styles.actionBtn} ${styles.viewCustomerBtn}`}
                          title="View Customer"
                        >
                          <User size={12} />
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewOrders(customer);
                          }}
                          className={`${styles.actionBtn} ${styles.viewOrdersBtn}`}
                          title="View Orders"
                        >
                          <Eye size={12} />
                          Orders
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {enablePagination && totalPages > 1 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing {(currentPage - 1) * customersPerPage + 1} to {Math.min(currentPage * customersPerPage, filteredAndSortedCustomers.length)} of {filteredAndSortedCustomers.length} customers
          </div>
          <div className={styles.paginationControls}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={styles.paginationBtn}
            >
              Previous
            </button>
            
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={styles.paginationBtn}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
