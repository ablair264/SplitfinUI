// src/components/CustomerDetail/CustomerDetail.tsx
import React, { useState, useEffect } from 'react';
import { 
  FaArrowLeft, FaMapMarkerAlt, FaClipboardList, FaEnvelope, 
  FaPhone, FaExclamationTriangle, FaCheckCircle, FaRobot,
  FaCreditCard, FaChartLine, FaUserTie, FaBuilding
} from 'react-icons/fa';
import { useDeviceDetection, useDeviceConditional } from '../../hooks/useDeviceDetection';
import styles from './CustomerDetail.module.css';

// Generic Customer Detail Interface
export interface CustomerDetailData {
  id: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  creditLimit: number;
  outstandingAmount: number;
  overdueAmount: number;
  paymentPerformance: number;
  paymentTerms: number;
  paymentTermsLabel: string;
  totalInvoiced?: number;
  invoiceCount?: number;
  addresses?: {
    billing?: Address;
    shipping?: Address;
  };
  contacts?: Contact[];
  region?: string;
  status: 'active' | 'inactive' | 'pending';
  createdDate: string;
  lastModifiedDate?: string;
  notes?: string;
  customFields?: Record<string, any>;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  department?: string;
  isPrimary?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface CustomerDetailProps {
  // Data
  customer?: CustomerDetailData;
  recentOrders?: Order[];
  loading?: boolean;
  loadingMessage?: string;
  
  // Features
  enableAIInsights?: boolean;
  enableQuickActions?: boolean;
  
  // Callbacks
  onBack?: () => void;
  onViewMap?: (customer: CustomerDetailData) => void;
  onCreateOrder?: (customer: CustomerDetailData) => void;
  onViewAllOrders?: (customer: CustomerDetailData) => void;
  onGenerateInsights?: (customer: CustomerDetailData) => Promise<any>;
  onSendReminder?: (customer: CustomerDetailData) => void;
  onEmailContact?: (contact: Contact) => void;
  onCallCustomer?: (phone: string) => void;
  
  // Customization
  backButtonText?: string;
  errorMessage?: string;
  errorButtonText?: string;
  currencySymbol?: string;
  dateFormat?: 'en-GB' | 'en-US';
  
  // Tab configuration
  enableTabs?: {
    overview?: boolean;
    financial?: boolean;
    contacts?: boolean;
    orders?: boolean;
  };
}

// Mock data generator
const generateMockCustomer = (): CustomerDetailData => {
  const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];
  
  return {
    id: 'customer-1',
    name: 'Acme Corporation',
    companyName: 'Acme Corporation Ltd',
    email: 'contact@acmecorp.com',
    phone: '+44 20 1234 5678',
    creditLimit: 50000,
    outstandingAmount: 12500,
    overdueAmount: 2500,
    paymentPerformance: 85,
    paymentTerms: 30,
    paymentTermsLabel: 'Net 30 days',
    totalInvoiced: 125000,
    invoiceCount: 42,
    addresses: {
      billing: {
        address: '123 Business Street',
        city: 'London',
        state: 'Greater London',
        zip: 'SW1A 1AA',
        country: 'United Kingdom'
      },
      shipping: {
        address: '456 Warehouse Road',
        city: 'Manchester',
        state: 'Greater Manchester',
        zip: 'M1 1AD',
        country: 'United Kingdom'
      }
    },
    contacts: [
      {
        id: 'contact-1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@acmecorp.com',
        phone: '+44 20 1234 5679',
        department: 'Purchasing',
        isPrimary: true
      },
      {
        id: 'contact-2',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@acmecorp.com',
        phone: '+44 20 1234 5680',
        department: 'Finance'
      }
    ],
    region: 'London',
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastModifiedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Preferred customer with special pricing agreement.'
  };
};

const generateMockOrders = (): Order[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `order-${i + 1}`,
    orderNumber: `ORD-${1000 + i}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    total: Math.floor(Math.random() * 10000) + 1000,
    status: ['pending', 'completed', 'cancelled'][Math.floor(Math.random() * 3)] as Order['status']
  }));
};

// Default callbacks
const defaultCallbacks = {
  onBack: () => console.log('Back clicked'),
  onViewMap: (customer: CustomerDetailData) => console.log('View map for:', customer.id),
  onCreateOrder: (customer: CustomerDetailData) => console.log('Create order for:', customer.id),
  onViewAllOrders: (customer: CustomerDetailData) => console.log('View all orders for:', customer.id),
  onGenerateInsights: async (customer: CustomerDetailData) => {
    console.log('Generate insights for:', customer.id);
    return { insights: 'AI insights would appear here' };
  },
  onSendReminder: (customer: CustomerDetailData) => console.log('Send reminder to:', customer.id),
  onEmailContact: (contact: Contact) => window.location.href = `mailto:${contact.email}`,
  onCallCustomer: (phone: string) => window.location.href = `tel:${phone}`
};

export default function CustomerDetail({
  customer: propCustomer,
  recentOrders: propOrders,
  loading = false,
  loadingMessage = 'Loading customer details...',
  enableAIInsights = true,
  enableQuickActions = true,
  onBack = defaultCallbacks.onBack,
  onViewMap = defaultCallbacks.onViewMap,
  onCreateOrder = defaultCallbacks.onCreateOrder,
  onViewAllOrders = defaultCallbacks.onViewAllOrders,
  onGenerateInsights = defaultCallbacks.onGenerateInsights,
  onSendReminder = defaultCallbacks.onSendReminder,
  onEmailContact = defaultCallbacks.onEmailContact,
  onCallCustomer = defaultCallbacks.onCallCustomer,
  backButtonText = 'Back to Customers',
  errorMessage = 'Customer not found',
  errorButtonText = 'Back to Customers',
  currencySymbol = '£',
  dateFormat = 'en-GB',
  enableTabs = {
    overview: true,
    financial: true,
    contacts: true,
    orders: true
  }
}: CustomerDetailProps) {
  // Use provided data or generate mock data
  const customer = propCustomer || generateMockCustomer();
  const recentOrders = propOrders || generateMockOrders();
  
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'contacts' | 'orders'>('overview');
  
  // Device detection hooks
  const deviceInfo = useDeviceDetection();
  const { showOnIPad, showOnDesktop, showInPortrait, showInLandscape } = useDeviceConditional();

  // Calculate credit usage
  const creditUsage = customer.creditLimit > 0 
    ? (customer.outstandingAmount / customer.creditLimit) * 100 
    : 0;
  
  const getHealthColor = (performance: number) => {
    if (performance >= 90) return 'green';
    if (performance >= 70) return 'yellow';
    return 'red';
  };

  const getCreditStatusColor = (usage: number) => {
    if (usage >= 90) return 'red';
    if (usage >= 70) return 'yellow';
    return 'green';
  };

  const formatCurrency = (value: number | undefined | null): string => {
    if (value === undefined || value === null || isNaN(value)) {
      return `${currencySymbol}0`;
    }
    return `${currencySymbol}${value.toLocaleString()}`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString(dateFormat);
    } catch {
      return 'Invalid Date';
    }
  };

  const handleGenerateInsights = async () => {
    setLoadingInsights(true);
    try {
      const insights = await onGenerateInsights(customer);
      setAiInsights(insights);
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setLoadingInsights(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.customerDetailLoading}>
        <div className="spinner"></div>
        <p>{loadingMessage}</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className={styles.customerDetailError}>
        <h2>{errorMessage}</h2>
        <button onClick={onBack} className={`${styles.btn} ${styles.btnPrimary}`}>
          {errorButtonText}
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.customerDetailContainer} ${deviceInfo.deviceClass}`}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <FaArrowLeft /> {backButtonText}
        </button>
        
        <div className={styles.headerInfo}>
          <h1>{customer.companyName || customer.name}</h1>
          <div className={styles.headerBadges}>
            <span className={`${styles.customerStatusBadge} ${styles[customer.status]}`}>
              {customer.status}
            </span>
          </div>
        </div>

        <div className={styles.headerActions}>
          {showOnIPad(
            <button 
              className={`${styles.btn} ${styles.btnSecondary} ${styles.ipadOptimized}`}
              onClick={() => onViewMap(customer)}
            >
              <FaMapMarkerAlt /> Map
            </button>
          )}
          
          {showOnDesktop(
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => onViewMap(customer)}
            >
              <FaMapMarkerAlt /> View on Map
            </button>
          )}
          
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => onCreateOrder(customer)}
          >
            {deviceInfo.isIPad ? 'New Order' : 'Create Order'}
          </button>
        </div>
      </div>

      {/* Financial Health Summary */}
      <div className={`${styles.financialHealthSummary} ${deviceInfo.isIPad ? styles.ipadGrid : ''}`}>
        <div className={styles.healthCard}>
          <div className={styles.healthMetric}>
            <h3>Payment Performance</h3>
            <div className={`${styles.performanceScore} ${styles[getHealthColor(customer.paymentPerformance)]}`}>
              {customer.paymentPerformance}%
            </div>
            <p className={styles.metricLabel}>Historical payment reliability</p>
          </div>
        </div>

        <div className={styles.healthCard}>
          <div className={styles.healthMetric}>
            <h3>Credit Usage</h3>
            <div className={styles.creditUsageBar}>
              <div 
                className={`${styles.usageFill} ${styles[getCreditStatusColor(creditUsage)]}`}
                style={{ width: `${Math.min(creditUsage, 100)}%` }}
              />
            </div>
            <p className={styles.metricValue}>
              {formatCurrency(customer.outstandingAmount)} / {formatCurrency(customer.creditLimit)}
            </p>
            <p className={styles.metricLabel}>{creditUsage.toFixed(0)}% of credit limit</p>
          </div>
        </div>

        <div className={styles.healthCard}>
          <div className={styles.healthMetric}>
            <h3>Outstanding Amount</h3>
            <div className={styles.outstandingAmount}>
              {formatCurrency(customer.outstandingAmount)}
            </div>
            {customer.overdueAmount > 0 && (
              <p className={styles.overdueWarning}>
                <FaExclamationTriangle /> {formatCurrency(customer.overdueAmount)} overdue
              </p>
            )}
          </div>
        </div>

        <div className={styles.healthCard}>
          <div className={styles.healthMetric}>
            <h3>Payment Terms</h3>
            <div className={styles.paymentTerms}>
              {customer.paymentTermsLabel || 'N/A'}
            </div>
            <p className={styles.metricLabel}>{customer.paymentTerms || 0} days</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${styles.customerDetailTabs} ${deviceInfo.isIPad ? styles.ipadTabs : ''}`}>
        {showOnIPad(
          <div className={styles.ipadTabScroll}>
            {enableTabs.overview && (
              <button 
                className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            )}
            {enableTabs.financial && (
              <button 
                className={`${styles.tab} ${activeTab === 'financial' ? styles.active : ''}`}
                onClick={() => setActiveTab('financial')}
              >
                Financial
              </button>
            )}
            {enableTabs.contacts && (
              <button 
                className={`${styles.tab} ${activeTab === 'contacts' ? styles.active : ''}`}
                onClick={() => setActiveTab('contacts')}
              >
                Contacts
              </button>
            )}
            {enableTabs.orders && (
              <button 
                className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
            )}
          </div>
        )}
        
        {showOnDesktop(
          <>
            {enableTabs.overview && (
              <button 
                className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            )}
            {enableTabs.financial && (
              <button 
                className={`${styles.tab} ${activeTab === 'financial' ? styles.active : ''}`}
                onClick={() => setActiveTab('financial')}
              >
                Financial Details
              </button>
            )}
            {enableTabs.contacts && (
              <button 
                className={`${styles.tab} ${activeTab === 'contacts' ? styles.active : ''}`}
                onClick={() => setActiveTab('contacts')}
              >
                Contacts
              </button>
            )}
            {enableTabs.orders && (
              <button 
                className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Recent Orders
              </button>
            )}
          </>
        )}
      </div>

      {/* Tab Content */}
      <div className={styles.customerTabContent}>
        {activeTab === 'overview' && enableTabs.overview && (
          <div className={styles.overviewTab}>
            <div className={styles.infoGrid}>
              <div className={`${styles.customerInfoSection} ${styles.infoSection}`}>
                <h3><FaBuilding /> Company Information</h3>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Company Name</span>
                  <span className={styles.value}>{customer.companyName || customer.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Email</span>
                  <span className={styles.value}>{customer.email || 'N/A'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Phone</span>
                  <span className={styles.value}>{customer.phone || 'N/A'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Region</span>
                  <span className={styles.value}>{customer.region || 'N/A'}</span>
                </div>
              </div>

              <div className={`${styles.customerInfoSection} ${styles.infoSection}`}>
                <h3>Business Metrics</h3>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Total Invoiced</span>
                  <span className={styles.value}>{formatCurrency(customer.totalInvoiced)}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Invoice Count</span>
                  <span className={styles.value}>{customer.invoiceCount || 0}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Customer Since</span>
                  <span className={styles.value}>{formatDate(customer.createdDate)}</span>
                </div>
              </div>
            </div>

            {/* Addresses */}
            {customer.addresses && (customer.addresses.billing || customer.addresses.shipping) && (
              <div className={styles.addressesSection}>
                <h3>Addresses</h3>
                <div className={styles.addressGrid}>
                  {customer.addresses.billing && (
                    <div className={styles.addressCard}>
                      <h4>Billing Address</h4>
                      <p>{customer.addresses.billing.address}</p>
                      <p>{customer.addresses.billing.city}, {customer.addresses.billing.state}</p>
                      <p>{customer.addresses.billing.zip}</p>
                      <p>{customer.addresses.billing.country}</p>
                    </div>
                  )}
                  {customer.addresses.shipping && (
                    <div className={styles.addressCard}>
                      <h4>Shipping Address</h4>
                      <p>{customer.addresses.shipping.address}</p>
                      <p>{customer.addresses.shipping.city}, {customer.addresses.shipping.state}</p>
                      <p>{customer.addresses.shipping.zip}</p>
                      <p>{customer.addresses.shipping.country}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Insights */}
            {enableAIInsights && (
              <div className={styles.aiInsightsSection}>
                <div className={styles.sectionHeader}>
                  <h3><FaRobot /> AI Insights</h3>
                  <button 
                    className={`${styles.btn} ${styles.btnSmall}`}
                    onClick={handleGenerateInsights}
                    disabled={loadingInsights}
                  >
                    {loadingInsights ? 'Generating...' : 'Generate Insights'}
                  </button>
                </div>
                
                {aiInsights && (
                  <div className={styles.insightsContent}>
                    <p>{aiInsights.insights || 'AI insights generated successfully'}</p>
                  </div>
                )}
              </div>
            )}

            {/* iPad-specific quick actions */}
            {enableQuickActions && deviceInfo.isIPad && (
              <div className={styles.ipadQuickActions}>
                <h3>Quick Actions</h3>
                <div className={styles.quickActionsGrid}>
                  <button 
                    className={styles.quickActionBtn}
                    onClick={() => customer.phone && onCallCustomer(customer.phone)}
                  >
                    <FaPhone />
                    <span>Call Customer</span>
                  </button>
                  <button 
                    className={styles.quickActionBtn}
                    onClick={() => window.location.href = `mailto:${customer.email}`}
                  >
                    <FaEnvelope />
                    <span>Send Email</span>
                  </button>
                  <button 
                    className={styles.quickActionBtn}
                    onClick={() => onCreateOrder(customer)}
                  >
                    <FaClipboardList />
                    <span>New Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'financial' && enableTabs.financial && (
          <div className={styles.financialTab}>
            <div className={styles.financialGrid}>
              <div className={styles.financialCard}>
                <h3>Credit Information</h3>
                <div className={styles.financialItem}>
                  <span className={styles.label}>Credit Limit</span>
                  <span className={styles.value}>{formatCurrency(customer.creditLimit)}</span>
                </div>
                <div className={styles.financialItem}>
                  <span className={styles.label}>Available Credit</span>
                  <span className={styles.value}>
                    {formatCurrency(Math.max(0, customer.creditLimit - customer.outstandingAmount))}
                  </span>
                </div>
                <div className={styles.financialItem}>
                  <span className={styles.label}>Credit Status</span>
                  <span className={`${styles.status} ${styles[getCreditStatusColor(creditUsage)]}`}>
                    {creditUsage >= 90 ? 'Critical' : creditUsage >= 70 ? 'Warning' : 'Good'}
                  </span>
                </div>
              </div>

              <div className={styles.financialCard}>
                <h3>Outstanding Amounts</h3>
                <div className={styles.financialItem}>
                  <span className={styles.label}>Total Outstanding</span>
                  <span className={styles.value}>{formatCurrency(customer.outstandingAmount)}</span>
                </div>
                <div className={styles.financialItem}>
                  <span className={styles.label}>Overdue Amount</span>
                  <span className={`${styles.value} ${customer.overdueAmount > 0 ? styles.overdue : ''}`}>
                    {formatCurrency(customer.overdueAmount)}
                  </span>
                </div>
              </div>
            </div>

            {customer.overdueAmount > 0 && (
              <div className={styles.overdueAlert}>
                <FaExclamationTriangle />
                <div>
                  <h4>Payment Overdue</h4>
                  <p>This customer has {formatCurrency(customer.overdueAmount)} in overdue payments.</p>
                  <button 
                    className={`${styles.btn} ${styles.btnWarning}`}
                    onClick={() => onSendReminder(customer)}
                  >
                    Send Payment Reminder
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && enableTabs.contacts && (
          <div className={styles.contactsTab}>
            <div className={styles.contactsGrid}>
              {customer.contacts && customer.contacts.length > 0 ? (
                customer.contacts.map((contact) => (
                  <div key={contact.id} className={styles.contactCard}>
                    <div className={styles.contactHeader}>
                      <h4>{contact.firstName} {contact.lastName}</h4>
                      {contact.isPrimary && (
                        <span className={styles.primaryBadge}>Primary</span>
                      )}
                    </div>
                    <div className={styles.contactInfo}>
                      {contact.email && (
                        <p><FaEnvelope /> {contact.email}</p>
                      )}
                      {contact.phone && (
                        <p><FaPhone /> {contact.phone}</p>
                      )}
                      {contact.department && (
                        <p><FaUserTie /> {contact.department}</p>
                      )}
                    </div>
                    <div className={styles.contactActions}>
                      <button 
                        className={`${styles.btn} ${styles.btnSmall}`}
                        onClick={() => onEmailContact(contact)}
                      >
                        <FaEnvelope /> Email
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No contacts available</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && enableTabs.orders && (
          <div className={styles.ordersTab}>
            <div className={styles.ordersList}>
              {recentOrders.length > 0 ? (
                recentOrders.map(order => (
                  <div key={order.id} className={styles.orderItem}>
                    <div className={styles.orderInfo}>
                      <h4>Order #{order.orderNumber}</h4>
                      <p>{formatDate(order.date)}</p>
                    </div>
                    <div className={styles.orderStatus}>
                      <span className={`${styles.status} ${styles[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className={styles.orderAmount}>
                      {formatCurrency(order.total)}
                    </div>
                    <div className={styles.orderActions}>
                      <button 
                        className={`${styles.btn} ${styles.btnSmall}`}
                        onClick={() => console.log('View order:', order.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recent orders</p>
              )}
            </div>
            
            <button 
              className={`${styles.btn} ${styles.btnSecondary} ${styles.fullWidth}`}
              onClick={() => onViewAllOrders(customer)}
            >
              <FaClipboardList /> View All Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
