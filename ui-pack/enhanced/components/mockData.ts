// Mock Data Generator Utilities

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  lastActive: Date;
}

export interface MetricData {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon?: string;
  color?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: Date;
  category?: string;
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'pending';
  revenue: number;
  lastOrder: Date;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    country: string;
  };
  orders: number;
  satisfaction: number;
}

// Helper functions
const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat = (min: number, max: number, decimals: number = 2): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Mock data generators
export const generateMetricData = (): MetricData[] => {
  return [
    {
      label: 'Total Revenue',
      value: `$${randomBetween(50000, 200000).toLocaleString()}`,
      change: randomFloat(-20, 30),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      icon: '💰',
      color: '#79d5e9'
    },
    {
      label: 'Active Users',
      value: randomBetween(1000, 5000).toLocaleString(),
      change: randomFloat(-10, 20),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      icon: '👥',
      color: '#61bc8e'
    },
    {
      label: 'Conversion Rate',
      value: `${randomFloat(2, 8, 1)}%`,
      change: randomFloat(-5, 10),
      trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
      icon: '📈',
      color: '#f59e0b'
    },
    {
      label: 'Avg Order Value',
      value: `$${randomBetween(50, 500)}`,
      change: randomFloat(-15, 25),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      icon: '🛒',
      color: '#8b5cf6'
    }
  ];
};

export const generateChartData = (points: number = 7): ChartDataPoint[] => {
  const categories = ['Sales', 'Marketing', 'Support', 'Development'];
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      value: randomBetween(1000, 5000),
      date: date,
      category: randomFromArray(categories)
    });
  }
  
  return data;
};

export const generateTableData = (rows: number = 10): TableRow[] => {
  const statuses = ['completed', 'pending', 'processing', 'failed'];
  const products = ['Premium Plan', 'Basic Plan', 'Enterprise', 'Starter', 'Pro Plan'];
  
  return Array.from({ length: rows }, (_, i) => ({
    id: `ROW-${1000 + i}`,
    customer: `Customer ${i + 1}`,
    product: randomFromArray(products),
    amount: `$${randomBetween(100, 5000)}`,
    status: randomFromArray(statuses),
    date: randomDate(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      new Date()
    ).toLocaleDateString(),
    progress: randomBetween(0, 100)
  }));
};

export const generateCustomerData = (count: number = 20): CustomerData[] => {
  const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'Chris', 'Lisa', 'Tom', 'Amy'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Martinez'];
  const companies = ['Tech Corp', 'Global Industries', 'Digital Solutions', 'Innovation Labs', 'Future Systems'];
  const cities = [
    { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060 },
    { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
    { name: 'Toronto', country: 'Canada', lat: 43.651070, lng: -79.347015 },
    { name: 'Berlin', country: 'Germany', lat: 52.520008, lng: 13.404954 },
    { name: 'Singapore', country: 'Singapore', lat: 1.352083, lng: 103.819839 }
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = randomFromArray(firstNames);
    const lastName = randomFromArray(lastNames);
    const city = randomFromArray(cities);
    
    return {
      id: `CUST-${1000 + i}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 555-${randomBetween(100, 999)}-${randomBetween(1000, 9999)}`,
      company: randomFromArray(companies),
      status: randomFromArray(['active', 'inactive', 'pending'] as const),
      revenue: randomBetween(5000, 50000),
      lastOrder: randomDate(
        new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        new Date()
      ),
      location: {
        lat: city.lat + randomFloat(-0.1, 0.1, 4),
        lng: city.lng + randomFloat(-0.1, 0.1, 4),
        address: `${randomBetween(1, 999)} Main Street`,
        city: city.name,
        country: city.country
      },
      orders: randomBetween(5, 100),
      satisfaction: randomFloat(3.5, 5.0, 1)
    };
  });
};

export const generateLineChartData = (series: number = 3, points: number = 12): any => {
  const seriesNames = ['Revenue', 'Costs', 'Profit', 'Users', 'Sessions'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const categories = months.slice(0, points);
  const seriesData = [];
  
  for (let i = 0; i < Math.min(series, seriesNames.length); i++) {
    const data = categories.map(() => randomBetween(1000, 10000));
    seriesData.push({
      name: seriesNames[i],
      data: data
    });
  }
  
  return {
    categories,
    series: seriesData
  };
};

export const generateActivityData = (count: number = 10): any[] => {
  const activities = [
    'New order received',
    'Customer registered',
    'Payment processed',
    'Product shipped',
    'Review submitted',
    'Support ticket opened',
    'Inventory updated',
    'Campaign launched'
  ];
  
  const users = ['Admin', 'John Doe', 'Jane Smith', 'System', 'Mike Johnson'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `ACT-${1000 + i}`,
    message: randomFromArray(activities),
    user: randomFromArray(users),
    timestamp: randomDate(
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date()
    ),
    type: randomFromArray(['info', 'success', 'warning', 'error'])
  }));
};

// AI Insights mock data
export const generateAIInsights = (): any => {
  return {
    summary: "Based on current data trends, your business is showing strong growth patterns with some areas for optimization.",
    insights: [
      {
        title: "Revenue Growth Opportunity",
        description: "Your conversion rate has increased by 15% this month. Consider increasing marketing spend by 20% to capitalize on this trend.",
        impact: "High",
        confidence: 85
      },
      {
        title: "Customer Retention",
        description: "Customer satisfaction scores are above industry average at 4.6/5. Implement a loyalty program to further improve retention.",
        impact: "Medium",
        confidence: 78
      },
      {
        title: "Operational Efficiency",
        description: "Order processing time has decreased by 23%. This efficiency gain could support a 10-15% increase in order volume.",
        impact: "Medium",
        confidence: 92
      }
    ],
    recommendations: [
      "Increase marketing budget allocation to high-performing channels",
      "Launch customer loyalty program in Q2",
      "Expand product catalog to meet growing demand",
      "Hire 2 additional customer support representatives"
    ],
    predictedGrowth: {
      revenue: 18,
      customers: 12,
      efficiency: 8
    }
  };
};

// Map marker data for customer locations
export const generateMapMarkers = (customers: CustomerData[]): any[] => {
  return customers.map(customer => ({
    position: {
      lat: customer.location.lat,
      lng: customer.location.lng
    },
    title: customer.name,
    info: {
      company: customer.company,
      revenue: `$${customer.revenue.toLocaleString()}`,
      orders: customer.orders,
      status: customer.status
    }
  }));
};

// Dashboard summary data
export const generateDashboardSummary = (): any => {
  return {
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    greeting: getGreeting(),
    notifications: randomBetween(0, 10),
    tasks: randomBetween(2, 8),
    performance: {
      today: randomFloat(-5, 15),
      week: randomFloat(-10, 25),
      month: randomFloat(-15, 35)
    }
  };
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

// Export all generators
export default {
  generateMetricData,
  generateChartData,
  generateTableData,
  generateCustomerData,
  generateLineChartData,
  generateActivityData,
  generateAIInsights,
  generateMapMarkers,
  generateDashboardSummary
};