# Customer Components - Generic UI Kit

This folder contains three fully customizable customer management components that have been made completely generic and data-agnostic. All Firebase and specific business logic has been removed while preserving the original design and functionality.

## Components Overview

### 1. CustomersManagement
A comprehensive customer list component with search, sort, pagination, and metric cards.

**Key Features:**
- Metric cards showing total, new, and active customers
- Search and filter functionality
- Sortable columns (by name, date, value, orders)
- Pagination support
- Customizable actions (View, New Order, View Orders)
- Responsive design with mobile support
- Built-in mock data generator

### 2. CustomerMapGoogle
An interactive Google Maps component showing customer locations with clustering support.

**Key Features:**
- Google Maps integration with custom styling
- Marker clustering for better performance
- Region-based filtering (UK regions by default)
- Customer value visualization through marker colors
- Info windows with customer details
- Mobile-responsive sidebar
- Directions integration

### 3. CustomerDetail
A detailed customer view component with financial metrics and tabbed interface.

**Key Features:**
- Financial health summary cards
- Credit usage visualization
- Tabbed interface (Overview, Financial, Contacts, Orders)
- AI insights integration (optional)
- iPad-specific quick actions
- Responsive design for all devices

## Installation & Usage

### Basic Usage

```typescript
import { CustomersManagement, CustomerMapGoogle, CustomerDetail } from './components/customer-components';

// 1. Customer List
<CustomersManagement
  customers={yourCustomerData}
  onViewCustomer={(customer) => navigateToDetail(customer.id)}
  onCreateOrder={(customer) => createNewOrder(customer.id)}
/>

// 2. Customer Map
<CustomerMapGoogle
  customers={yourMapCustomerData}
  googleMapsApiKey="YOUR_API_KEY"
  onViewCustomer={(customer) => navigateToDetail(customer.id)}
/>

// 3. Customer Detail
<CustomerDetail
  customer={selectedCustomer}
  onBack={() => navigateBack()}
  onCreateOrder={(customer) => createNewOrder(customer.id)}
/>
```

### Data Interfaces

#### Customer (for CustomersManagement)
```typescript
interface Customer {
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
```

#### MapCustomer (for CustomerMapGoogle)
```typescript
interface MapCustomer {
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
```

#### CustomerDetailData (for CustomerDetail)
```typescript
interface CustomerDetailData {
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
```

## Customization Options

### CustomersManagement Props
- `title`: Custom page title
- `createButtonText`: Custom text for create button
- `searchPlaceholder`: Custom search placeholder
- `emptyStateMessage`: Message when no customers found
- `metricColors`: Customize metric card colors
- `enableSearch/Sort/Pagination/Actions`: Toggle features
- `customersPerPage`: Number of customers per page

### CustomerMapGoogle Props
- `googleMapsApiKey`: Your Google Maps API key (required)
- `defaultCenter`: Map center coordinates
- `defaultZoom`: Initial zoom level
- `regions`: Custom regions configuration
- `markerThresholds`: Customize value thresholds for marker colors
- `enableClustering/RegionFilter/InfoWindow/Directions`: Toggle features

### CustomerDetail Props
- `currencySymbol`: Change currency symbol (default: £)
- `dateFormat`: Date formatting ('en-GB' or 'en-US')
- `enableTabs`: Toggle which tabs to show
- `enableAIInsights`: Show/hide AI insights section
- `enableQuickActions`: Show/hide quick actions (iPad)

## Mock Data

All components include built-in mock data generators for testing:

```typescript
// Components will automatically generate mock data if none provided
<CustomersManagement /> // Will show 50 mock customers
<CustomerMapGoogle />   // Will show 100 mock locations
<CustomerDetail />      // Will show mock customer details
```

## API Integration Example

```typescript
// Transform your API data to match component interfaces
const transformAPIData = (apiCustomers) => {
  return apiCustomers.map(customer => ({
    id: customer.customer_id,
    name: customer.full_name,
    companyName: customer.company,
    email: customer.email_address,
    totalSpent: customer.lifetime_value,
    orderCount: customer.total_orders,
    status: customer.is_active ? 'active' : 'inactive',
    // ... map other fields
  }));
};

// Use with components
<CustomersManagement 
  customers={transformAPIData(apiResponse)}
  loading={isLoading}
/>
```

## Styling

All components use CSS modules for styling. The styles are fully preserved from the original design and include:
- Dark theme with glassmorphism effects
- Responsive layouts for mobile, tablet, and desktop
- Smooth animations and transitions
- Accessibility features (keyboard navigation, ARIA labels)

To customize colors or styles, you can:
1. Override CSS variables in your global styles
2. Use the built-in customization props
3. Wrap components with your own styled containers

## Requirements

- React 17+
- TypeScript (optional but recommended)
- Google Maps API key (for CustomerMapGoogle)
- CSS Modules support

## License

These components are part of the Splitfin UI Kit commercial package.
