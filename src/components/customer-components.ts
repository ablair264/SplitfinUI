// Export all customer-related components
export { default as CustomersManagement } from './CustomersManagement/CustomersManagement';
export type { Customer, CustomerMetrics, CustomersManagementProps } from './CustomersManagement/CustomersManagement';

export { default as CustomerMapGoogle } from './CustomerMap/CustomerMapGoogle';
export type { MapCustomer, RegionConfig, CustomerMapProps } from './CustomerMap/CustomerMapGoogle';

export { default as CustomerDetail } from './CustomerDetail/CustomerDetail';
export type { CustomerDetailData, Address, Contact, Order, CustomerDetailProps } from './CustomerDetail/CustomerDetail';
