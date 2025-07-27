// Comprehensive Mock Data for Splitfin UI Kit Demo
import { DashboardData } from '../components/Dashboard/Dashboard';

// Helper function to generate dates
const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Helper function to generate random values with variance
const randomVariance = (base: number, variance: number = 0.2): number => {
  const min = base * (1 - variance);
  const max = base * (1 + variance);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Brand names for variety
const brands = ['TechFlow', 'DataSync Pro', 'CloudVault', 'MetricsMaster', 'AnalyticsHub', 'DashboardPro', 'UIKit Plus'];
const productCategories = ['Dashboard Templates', 'UI Components', 'Admin Panels', 'Analytics Tools', 'Data Widgets'];

// Generate orders with realistic patterns
const generateOrders = (count: number = 90) => {
  const orders = [];
  const customers = generateCustomers(30);
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor((i / count) * 90); // Spread over 90 days
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const numItems = Math.floor(Math.random() * 4) + 1;
    const line_items = [];
    let orderTotal = 0;
    
    for (let j = 0; j < numItems; j++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const category = productCategories[Math.floor(Math.random() * productCategories.length)];
      const price = [19, 39, 59, 99, 149][Math.floor(Math.random() * 5)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const itemTotal = price * quantity;
      orderTotal += itemTotal;
      
      line_items.push({
        item_id: `item-${i}-${j}`,
        product_id: `prod-${Math.floor(Math.random() * 20)}`,
        name: `${brand} ${category}`,
        brand: brand,
        brand_normalized: brand.toLowerCase().replace(/\s+/g, '-'),
        quantity: quantity,
        total: itemTotal,
        item_total: itemTotal,
        sku: `${brand.toUpperCase().substring(0, 3)}-${category.toUpperCase().substring(0, 3)}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
      });
    }
    
    const isMarketplace = Math.random() > 0.7;
    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'completed'];
    const invoiceStatuses = ['paid', 'outstanding', 'overdue', 'pending'];
    
    orders.push({
      id: `order-${String(i + 1).padStart(5, '0')}`,
      customerId: customer.id,
      customerName: customer.name,
      date: generateDate(daysAgo),
      total: orderTotal,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      is_marketplace_order: isMarketplace,
      invoice_status: invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)],
      line_items: line_items
    });
  }
  
  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate customers
export const generateCustomers = (count: number = 30) => {
  const companies = [
    'Acme Corporation', 'TechStart Inc', 'Digital Solutions Ltd', 'CloudFirst Systems',
    'DataDrive Analytics', 'Innovation Hub', 'Smart Systems Co', 'Future Tech Labs',
    'Quantum Computing Inc', 'AI Solutions Group', 'WebScale Enterprises', 'Mobile First Ltd',
    'Enterprise Solutions', 'Global Tech Partners', 'Software Dynamics', 'Platform Builders',
    'Integration Experts', 'Cloud Native Co', 'DevOps Masters', 'Agile Systems',
    'Digital Transform Co', 'Tech Innovators', 'Solution Architects', 'Code Crafters',
    'System Integrators', 'Data Scientists Inc', 'ML Experts Ltd', 'Automation Pro',
    'Tech Enablers', 'Digital Pioneers'
  ];
  
  return companies.slice(0, count).map((company, index) => {
    const totalOrders = randomVariance(15, 0.8);
    const avgOrderValue = randomVariance(250, 0.5);
    
    return {
      id: `cust-${String(index + 1).padStart(4, '0')}`,
      name: company,
      email: `contact@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      totalOrders: totalOrders,
      totalSpent: totalOrders * avgOrderValue,
      lastOrderDate: generateDate(Math.floor(Math.random() * 30)),
      location: {
        lat: 51.5074 + (Math.random() - 0.5) * 0.5,
        lng: -0.1278 + (Math.random() - 0.5) * 0.5,
        city: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'][Math.floor(Math.random() * 5)],
        country: 'UK'
      }
    };
  });
};

// Generate invoices
const generateInvoices = (orders: any[]) => {
  return orders
    .filter(order => ['outstanding', 'overdue', 'pending'].includes(order.invoice_status))
    .map((order, index) => {
      const dueDate = new Date(order.date);
      dueDate.setDate(dueDate.getDate() + 30);
      const daysPastDue = order.invoice_status === 'overdue' 
        ? Math.floor(Math.random() * 30) + 1 
        : 0;
      
      return {
        id: `inv-${String(index + 1).padStart(5, '0')}`,
        customerName: order.customerName,
        amount: order.total,
        dueDate: dueDate.toISOString().split('T')[0],
        status: order.invoice_status,
        daysPastDue: daysPastDue
      };
    });
};

// Generate agent performance data
const generateAgentPerformance = () => {
  const agents = [
    'Sarah Johnson', 'Michael Chen', 'Emma Williams', 'James Rodriguez',
    'Lisa Thompson', 'David Kim', 'Rachel Green', 'Tom Anderson'
  ];
  
  return agents.map((name, index) => ({
    id: `agent-${index + 1}`,
    name: name,
    agentName: name, // Add agentName field for compatibility
    totalSales: randomVariance(45000, 0.5),
    totalRevenue: randomVariance(45000, 0.5), // Add totalRevenue field
    orderCount: randomVariance(120, 0.4),
    totalOrders: randomVariance(120, 0.4), // Add totalOrders field
    conversionRate: 15 + Math.random() * 25 // 15-40% conversion
  }));
};

// Generate complete mock data
export const generateMockDashboardData = (): DashboardData => {
  const orders = generateOrders(90);
  const customers = generateCustomers(30);
  const invoices = generateInvoices(orders);
  const agentPerformance = generateAgentPerformance();
  
  // Calculate metrics from orders
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const averageOrderValue = totalRevenue / totalOrders;
  const outstandingInvoices = invoices.filter(inv => inv.status === 'outstanding').length;
  const marketplaceOrders = orders.filter(order => order.is_marketplace_order).length;
  
  // Calculate brand performance from orders
  const brandMap = new Map();
  orders.forEach(order => {
    order.line_items.forEach(item => {
      if (!brandMap.has(item.brand)) {
        brandMap.set(item.brand, {
          name: item.brand,
          revenue: 0,
          quantity: 0,
          orderCount: 0
        });
      }
      const brand = brandMap.get(item.brand);
      brand.revenue += item.total;
      brand.quantity += item.quantity;
      brand.orderCount += 1;
    });
  });
  
  const brandPerformance = Array.from(brandMap.values())
    .sort((a, b) => b.revenue - a.revenue);
  
  // Calculate top items
  const itemMap = new Map();
  orders.forEach(order => {
    order.line_items.forEach(item => {
      const key = item.product_id;
      if (!itemMap.has(key)) {
        itemMap.set(key, {
          id: item.product_id,
          name: item.name,
          brand: item.brand,
          quantity: 0,
          revenue: 0,
          sku: item.sku
        });
      }
      const product = itemMap.get(key);
      product.quantity += item.quantity;
      product.revenue += item.total;
    });
  });
  
  const topItems = Array.from(itemMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
  
  return {
    metrics: {
      totalRevenue: Math.round(totalRevenue),
      totalOrders,
      totalCustomers,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      outstandingInvoices,
      marketplaceOrders
    },
    orders,
    customers,
    invoices,
    agentPerformance,
    agents: agentPerformance,
    salesAgents: agentPerformance,
    brands: brandPerformance,
    brandPerformance,
    topItems,
    items: topItems,
    products: topItems
  };
};

// Static instance for consistent demo data
export const mockDashboardData = generateMockDashboardData();

// Function to get filtered data based on date range
export const getMockDataForDateRange = (dateRange: string): DashboardData => {
  const data = generateMockDashboardData();
  const now = new Date();
  let daysToFilter = 30;
  
  switch (dateRange) {
    case '7_days':
      daysToFilter = 7;
      break;
    case '30_days':
      daysToFilter = 30;
      break;
    case '90_days':
      daysToFilter = 90;
      break;
    case 'all_time':
      daysToFilter = 365;
      break;
  }
  
  const cutoffDate = new Date(now.getTime() - daysToFilter * 24 * 60 * 60 * 1000);
  
  // Filter orders by date
  const filteredOrders = data.orders.filter(order => 
    new Date(order.date) >= cutoffDate
  );
  
  // Recalculate metrics based on filtered orders
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = filteredOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const outstandingInvoices = data.invoices.filter(inv => 
    inv.status === 'outstanding' && new Date(inv.dueDate) >= cutoffDate
  ).length;
  const marketplaceOrders = filteredOrders.filter(order => order.is_marketplace_order).length;
  
  return {
    ...data,
    metrics: {
      ...data.metrics,
      totalRevenue: Math.round(totalRevenue),
      totalOrders,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      outstandingInvoices,
      marketplaceOrders
    },
    orders: filteredOrders
  };
};