// Mock Data Generators for SplitfinUI Pack
// This file provides all the mock data needed for the UI components

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface MetricData {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
  color?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: Date;
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  avatar?: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

// Generate random numbers within range
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random float within range
const randomFloat = (min: number, max: number, decimals: number = 2): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

// Random date generator
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Mock user data
export const mockCurrentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
};

// Generate metric card data
export const generateMetricData = (): MetricData[] => [
  {
    label: 'Total Revenue',
    value: `£${randomBetween(50000, 150000).toLocaleString()}`,
    change: randomFloat(-10, 20),
    trend: Math.random() > 0.5 ? 'up' : 'down',
    icon: 'revenue',
    color: '#79d5e9'
  },
  {
    label: 'Active Users',
    value: randomBetween(1000, 5000).toLocaleString(),
    change: randomFloat(-5, 15),
    trend: Math.random() > 0.5 ? 'up' : 'down',
    icon: 'users',
    color: '#61bc8e'
  },
  {
    label: 'Conversion Rate',
    value: `${randomFloat(2, 8)}%`,
    change: randomFloat(-2, 5),
    trend: Math.random() > 0.5 ? 'up' : 'down',
    icon: 'chart',
    color: '#f59e0b'
  },
  {
    label: 'Avg Order Value',
    value: `£${randomBetween(50, 200)}`,
    change: randomFloat(-8, 12),
    trend: Math.random() > 0.5 ? 'up' : 'down',
    icon: 'cart',
    color: '#8b5cf6'
  }
];

// Generate chart data
export const generateChartData = (points: number = 7): ChartDataPoint[] => {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  
  return Array.from({ length: points }, (_, i) => ({
    label: labels[i % 7],
    value: randomBetween(100, 1000),
    date: new Date(today.getTime() - (points - i - 1) * 24 * 60 * 60 * 1000)
  }));
};

// Generate line chart data with multiple series
export const generateMultiSeriesChartData = () => {
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return {
    categories,
    series: [
      {
        name: 'Revenue',
        data: categories.map(() => randomBetween(20000, 50000)),
        color: '#79d5e9'
      },
      {
        name: 'Profit',
        data: categories.map(() => randomBetween(5000, 15000)),
        color: '#61bc8e'
      },
      {
        name: 'Expenses',
        data: categories.map(() => randomBetween(10000, 25000)),
        color: '#f59e0b'
      }
    ]
  };
};

// Generate table data
export const generateTableData = (rows: number = 10): TableRow[] => {
  const statuses = ['active', 'pending', 'completed', 'cancelled'];
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  
  return Array.from({ length: rows }, (_, i) => ({
    id: `row-${i + 1}`,
    name: `Customer ${i + 1}`,
    product: products[Math.floor(Math.random() * products.length)],
    amount: `£${randomBetween(50, 500)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: randomDate(new Date(2024, 0, 1), new Date()).toLocaleDateString()
  }));
};

// Generate customer data
export const generateCustomers = (count: number = 20): Customer[] => {
  const firstNames = ['Emma', 'Oliver', 'Sophia', 'Liam', 'Ava', 'Noah', 'Isabella', 'Ethan', 'Mia', 'Lucas'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const cities = [
    { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Manchester', country: 'UK', lat: 53.4808, lng: -2.2426 },
    { name: 'Birmingham', country: 'UK', lat: 52.4862, lng: -1.8904 },
    { name: 'Edinburgh', country: 'UK', lat: 55.9533, lng: -3.1883 },
    { name: 'Cardiff', country: 'UK', lat: 51.4816, lng: -3.1791 },
    { name: 'Glasgow', country: 'UK', lat: 55.8642, lng: -4.2518 },
    { name: 'Liverpool', country: 'UK', lat: 53.4084, lng: -2.9916 },
    { name: 'Bristol', country: 'UK', lat: 51.4545, lng: -2.5879 }
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    return {
      id: `customer-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+44 7${randomBetween(100, 999)} ${randomBetween(100000, 999999)}`,
      status: Math.random() > 0.2 ? 'active' : (Math.random() > 0.5 ? 'inactive' : 'pending') as any,
      totalOrders: randomBetween(1, 50),
      totalSpent: randomBetween(100, 10000),
      lastOrderDate: randomDate(new Date(2024, 0, 1), new Date()),
      location: {
        address: `${randomBetween(1, 200)} High Street`,
        city: city.name,
        country: city.country,
        lat: city.lat + randomFloat(-0.1, 0.1, 4),
        lng: city.lng + randomFloat(-0.1, 0.1, 4)
      },
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`
    };
  });
};

// Generate order data
export const generateOrders = (count: number = 50): Order[] => {
  const customers = generateCustomers(20);
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  return Array.from({ length: count }, (_, i) => {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    
    return {
      id: `ORD-${String(i + 1001).padStart(6, '0')}`,
      customerName: customer.name,
      date: randomDate(new Date(2024, 0, 1), new Date()),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total: randomBetween(50, 2000),
      items: randomBetween(1, 10)
    };
  });
};

// Generate activity/notification data
export const generateActivities = (count: number = 10) => {
  const activities = [
    { type: 'order', message: 'New order received', icon: '📦' },
    { type: 'user', message: 'New user registered', icon: '👤' },
    { type: 'payment', message: 'Payment processed', icon: '💳' },
    { type: 'review', message: 'New review posted', icon: '⭐' },
    { type: 'stock', message: 'Low stock alert', icon: '📊' },
    { type: 'message', message: 'New customer message', icon: '💬' }
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    const time = new Date();
    time.setMinutes(time.getMinutes() - randomBetween(1, 1440)); // Within last 24 hours
    
    return {
      id: `activity-${i + 1}`,
      ...activity,
      time,
      read: Math.random() > 0.3
    };
  });
};

// Generate AI insights data
export const generateAIInsights = () => {
  const insights = [
    {
      title: 'Revenue Trend Analysis',
      content: 'Your revenue has increased by 23% over the last quarter. The primary driver appears to be improved conversion rates in the mobile segment.',
      confidence: 92,
      recommendations: [
        'Increase mobile advertising budget by 15%',
        'Optimize checkout process for mobile users',
        'Launch targeted email campaign for mobile users'
      ]
    },
    {
      title: 'Customer Behavior Pattern',
      content: 'Analysis shows that customers who purchase Product A are 3x more likely to return within 30 days.',
      confidence: 87,
      recommendations: [
        'Create bundle offers with Product A',
        'Send follow-up emails to Product A purchasers',
        'Develop loyalty program around Product A'
      ]
    },
    {
      title: 'Seasonal Opportunity',
      content: 'Historical data suggests a 40% increase in demand for your top products in the next 4 weeks.',
      confidence: 78,
      recommendations: [
        'Increase inventory levels by 30%',
        'Prepare seasonal marketing campaign',
        'Train additional customer support staff'
      ]
    }
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
};

// Generate map markers for customer locations
export const generateMapMarkers = (customers: Customer[]) => {
  return customers.map(customer => ({
    id: customer.id,
    position: {
      lat: customer.location.lat,
      lng: customer.location.lng
    },
    info: {
      name: customer.name,
      city: customer.location.city,
      totalSpent: customer.totalSpent,
      status: customer.status
    }
  }));
};

// Mock authentication
export const mockLogin = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation
  if (email === 'demo@splitfinui.com' && password === 'demo123') {
    return {
      success: true,
      user: mockCurrentUser
    };
  }
  
  return {
    success: false,
    error: 'Invalid email or password. Try demo@splitfinui.com / demo123'
  };
};

// Export all mock data generators
export default {
  generateMetricData,
  generateChartData,
  generateMultiSeriesChartData,
  generateTableData,
  generateCustomers,
  generateOrders,
  generateActivities,
  generateAIInsights,
  generateMapMarkers,
  mockLogin,
  mockCurrentUser
};
