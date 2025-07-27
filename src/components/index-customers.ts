// Customer Components Index
// Export all customer-related components and types

// Component exports
export { default as CustomersManagement } from './CustomersManagement/CustomersManagement';
export { default as CustomerMapGoogle } from './CustomerMap/CustomerMapGoogle';
export { default as CustomerDetail } from './CustomerDetail/CustomerDetail';

// Type exports from CustomersManagement
export type {
  Customer,
  CustomerMetrics,
  CustomersManagementProps
} from './CustomersManagement/CustomersManagement';

// Type exports from CustomerMapGoogle
export type {
  MapCustomer,
  RegionConfig,
  CustomerMapProps
} from './CustomerMap/CustomerMapGoogle';

// Type exports from CustomerDetail
export type {
  CustomerDetailData,
  Address,
  Contact,
  Order,
  CustomerDetailProps
} from './CustomerDetail/CustomerDetail';
