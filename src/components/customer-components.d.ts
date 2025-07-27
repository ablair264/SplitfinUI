/**
 * Type definitions for Splitfin UI Customer Components
 * These interfaces define the data structures and props for all customer-related components
 */

// ========================================
// CustomersManagement Component Types
// ========================================

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

// ========================================
// CustomerMapGoogle Component Types
// ========================================

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

// ========================================
// CustomerDetail Component Types
// ========================================

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

// ========================================
// Utility Types
// ========================================

export type CustomerStatus = 'active' | 'inactive' | 'pending';
export type OrderStatus = 'pending' | 'completed' | 'cancelled';
export type SortBy = 'name' | 'date' | 'value' | 'orders';

// ========================================
// Data Transformation Helpers
// ========================================

export interface DataTransformers {
  // Transform your API data to component format
  toCustomer: (apiData: any) => Customer;
  toMapCustomer: (customer: Customer) => MapCustomer;
  toDetailCustomer: (customer: Customer) => CustomerDetailData;
  
  // Transform component data back to API format
  fromCustomer: (customer: Customer) => any;
}

// ========================================
// Component Exports
// ========================================

export declare const CustomersManagement: React.FC<CustomersManagementProps>;
export declare const CustomerMapGoogle: React.FC<CustomerMapProps>;
export declare const CustomerDetail: React.FC<CustomerDetailProps>;
