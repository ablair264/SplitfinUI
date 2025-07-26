// Mock data generator for dashboard
export const generateMockDashboardData = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  // Generate mock orders
  const orders = Array.from({ length: 150 }, (_, i) => {
    const date = new Date(thirtyDaysAgo.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    const total = Math.floor(Math.random() * 5000) + 500;
    return {
      id: `ORD-${1000 + i}`,
      date: date.toISOString(),
      total,
      customerId: `CUST-${Math.floor(Math.random() * 50) + 1}`,
      customerName: `Customer ${Math.floor(Math.random() * 50) + 1}`,
      status: Math.random() > 0.8 ? 'pending' : 'completed',
      agentId: `AGENT-${Math.floor(Math.random() * 5) + 1}`,
      agentName: `Agent ${Math.floor(Math.random() * 5) + 1}`,
      brandId: `BRAND-${Math.floor(Math.random() * 6) + 1}`,
      brandName: ['TechCorp', 'StyleBrand', 'HomeGoods', 'SportZone', 'FoodMart', 'AutoParts'][Math.floor(Math.random() * 6)],
      invoice_status: Math.random() > 0.7 ? 'unpaid' : 'paid',
      line_items: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
        id: `ITEM-${j}`,
        product_id: `PROD-${Math.floor(Math.random() * 20) + 1}`,
        product_name: `Product ${Math.floor(Math.random() * 20) + 1}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        price: Math.floor(Math.random() * 200) + 20,
        brand: ['TechCorp', 'StyleBrand', 'HomeGoods', 'SportZone', 'FoodMart', 'AutoParts'][Math.floor(Math.random() * 6)]
      }))
    };
  });

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const uniqueCustomers = new Set(orders.map(o => o.customerId)).size;
  const averageOrderValue = totalRevenue / totalOrders;
  const unpaidInvoices = orders.filter(o => o.invoice_status === 'unpaid');
  const marketplaceOrders = Math.floor(totalOrders * 0.3);

  // Generate trend data (last 30 days)
  const trendData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
    const dayOrders = orders.filter(o => {
      const orderDate = new Date(o.date);
      return orderDate.toDateString() === date.toDateString();
    });
    
    return {
      date: date.toISOString().split('T')[0],
      revenue: dayOrders.reduce((sum, o) => sum + o.total, 0),
      orders: dayOrders.length,
      customers: new Set(dayOrders.map(o => o.customerId)).size,
      averageOrderValue: dayOrders.length > 0 ? dayOrders.reduce((sum, o) => sum + o.total, 0) / dayOrders.length : 0
    };
  });

  // Agent performance
  const agents = ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4', 'Agent 5'].map((name, i) => ({
    id: `AGENT-${i + 1}`,
    name,
    totalRevenue: Math.floor(Math.random() * 50000) + 10000,
    totalOrders: Math.floor(Math.random() * 50) + 10,
    averageOrderValue: Math.floor(Math.random() * 500) + 200,
    conversionRate: Math.random() * 0.3 + 0.1
  }));

  // Brand performance
  const brands = ['TechCorp', 'StyleBrand', 'HomeGoods', 'SportZone', 'FoodMart', 'AutoParts'].map((name, i) => ({
    id: `BRAND-${i + 1}`,
    name,
    totalRevenue: Math.floor(Math.random() * 80000) + 20000,
    totalOrders: Math.floor(Math.random() * 80) + 20,
    growth: (Math.random() * 40) - 20 // -20% to +20% growth
  }));

  // Top items
  const topItems = Array.from({ length: 10 }, (_, i) => ({
    id: `PROD-${i + 1}`,
    name: `Product ${i + 1}`,
    sku: `SKU-${1000 + i}`,
    totalRevenue: Math.floor(Math.random() * 20000) + 5000,
    totalQuantity: Math.floor(Math.random() * 200) + 50,
    brand: brands[Math.floor(Math.random() * brands.length)].name
  })).sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Recent customers
  const recentCustomers = Array.from({ length: 10 }, (_, i) => ({
    id: `CUST-${i + 1}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    lastOrderDate: new Date(today.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalSpent: Math.floor(Math.random() * 10000) + 1000,
    orderCount: Math.floor(Math.random() * 20) + 1
  }));

  // Invoices
  const invoices = unpaidInvoices.map((order, i) => ({
    id: `INV-${1000 + i}`,
    orderId: order.id,
    customerName: order.customerName,
    amount: order.total,
    dueDate: new Date(today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'unpaid' as const,
    daysOverdue: Math.floor(Math.random() * 30)
  }));

  return {
    orders,
    metrics: {
      totalRevenue,
      totalOrders,
      totalCustomers: uniqueCustomers,
      averageOrderValue,
      previousPeriodRevenue: totalRevenue * 0.85,
      previousPeriodOrders: Math.floor(totalOrders * 0.9),
      previousPeriodCustomers: Math.floor(uniqueCustomers * 0.95),
      previousPeriodAvgOrderValue: averageOrderValue * 0.92,
      outstandingInvoices: unpaidInvoices.length,
      outstandingAmount: unpaidInvoices.reduce((sum, o) => sum + o.total, 0),
      marketplaceOrders,
      marketplaceRevenue: marketplaceOrders * averageOrderValue * 1.1
    },
    trendData,
    agents,
    brands,
    topItems,
    recentCustomers,
    invoices,
    dateRange: '30_days',
    lastUpdated: new Date().toISOString()
  };
};

// Generate mock AI insights
export const generateMockAIInsight = (cardTitle: string) => {
  const insights = {
    'Total Revenue': {
      summary: 'Revenue is trending upward with strong performance in the tech category.',
      keyPoints: [
        'Tech products account for 45% of total revenue',
        'Weekend sales are 30% higher than weekdays',
        'Average transaction value increased by 12%'
      ],
      recommendations: [
        'Focus marketing efforts on tech products',
        'Launch weekend promotions to capitalize on higher traffic',
        'Bundle complementary products to increase order values'
      ],
      trend: 'positive' as const
    },
    'Total Orders': {
      summary: 'Order volume shows consistent growth with peak activity during lunch hours.',
      keyPoints: [
        'Order count increased by 15% this month',
        '60% of orders come from repeat customers',
        'Mobile orders represent 70% of total volume'
      ],
      recommendations: [
        'Optimize mobile checkout experience',
        'Implement loyalty program for repeat customers',
        'Add express checkout options for lunch rush'
      ],
      trend: 'positive' as const
    },
    'Active Customers': {
      summary: 'Customer base is expanding with improved retention rates.',
      keyPoints: [
        'New customer acquisition up 20%',
        'Customer retention rate at 85%',
        'Average customer lifetime value increased'
      ],
      recommendations: [
        'Launch referral program to boost acquisition',
        'Personalize email campaigns for better engagement',
        'Create VIP tier for high-value customers'
      ],
      trend: 'positive' as const
    },
    'default': {
      summary: 'This metric shows positive trends with opportunities for optimization.',
      keyPoints: [
        'Performance exceeded targets by 10%',
        'Consistent growth pattern observed',
        'Strong correlation with marketing campaigns'
      ],
      recommendations: [
        'Maintain current strategies',
        'Test new channels for growth',
        'Monitor competitive landscape'
      ],
      trend: 'neutral' as const
    }
  };

  return insights[cardTitle] || insights.default;
};