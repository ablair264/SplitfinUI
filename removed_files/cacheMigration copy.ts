export const mockUser = {
  id: 'demo-user-123',
  name: 'Alex Johnson',
  email: 'alex@splitfinui.com',
  role: 'admin',
  avatar: '/avatars/demo-user.jpg'
}

export const mockNavigationSections = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    links: [
      { to: '/demo/dashboard', label: 'Overview', icon: '📈' },
      { to: '/demo/analytics', label: 'Analytics', icon: '📊' },
      { to: '/demo/reports', label: 'Reports', icon: '📋' }
    ]
  },
  {
    id: 'users',
    label: 'Users',
    icon: '👥',
    links: [
      { to: '/demo/users', label: 'All Users', icon: '👥' },
      { to: '/demo/users/new', label: 'Add User', icon: '➕' },
      { to: '/demo/users/roles', label: 'Roles', icon: '🔐' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    to: '/demo/settings'
  }
]

export const mockDashboardData = {
  metrics: {
    totalRevenue: 124500,
    totalOrders: 1234,
    totalCustomers: 567,
    averageOrderValue: 89.50,
    outstandingInvoices: 12,
    marketplaceOrders: 234,
    conversionRate: 3.4,
    monthlyGrowth: 12.5
  },
  orders: [
    {
      id: 'ORD-001',
      customerId: 'cust-1',
      customerName: 'Acme Corporation',
      date: '2024-01-15T10:30:00Z',
      total: 1250,
      status: 'shipped',
      is_marketplace_order: false,
      line_items: [
        {
          item_id: 'item-1',
          name: 'Professional Dashboard Template',
          brand: 'SplitFin UI',
          quantity: 1,
          total: 1250
        }
      ]
    },
    {
      id: 'ORD-002',
      customerId: 'cust-2',
      customerName: 'TechStart Inc',
      date: '2024-01-14T14:20:00Z',
      total: 890,
      status: 'pending',
      is_marketplace_order: true,
      line_items: [
        {
          item_id: 'item-2',
          name: 'UI Component Library',
          brand: 'SplitFin UI',
          quantity: 1,
          total: 890
        }
      ]
    },
    // Add more mock orders as needed...
  ],
  customers: [
    {
      id: 'cust-1',
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      totalOrders: 15,
      totalSpent: 12450,
      lastOrderDate: '2024-01-15'
    },
    {
      id: 'cust-2',
      name: 'TechStart Inc',
      email: 'hello@techstart.com',
      totalOrders: 12,
      totalSpent: 9870,
      lastOrderDate: '2024-01-14'
    },
    // Add more mock customers...
  ],
  invoices: [
    {
      id: 'INV-001',
      customerName: 'Acme Corporation',
      amount: 1250,
      dueDate: '2024-02-15',
      status: 'paid',
      daysPastDue: 0
    },
    {
      id: 'INV-002',
      customerName: 'TechStart Inc',
      amount: 890,
      dueDate: '2024-02-10',
      status: 'pending',
      daysPastDue: 5
    },
    // Add more mock invoices...
  ],
  brands: [
    {
      name: 'SplitFin UI',
      revenue: 45000,
      quantity: 234,
      orderCount: 123
    },
    {
      name: 'Component Pro',
      revenue: 23000,
      quantity: 156,
      orderCount: 78
    },
    // Add more mock brands...
  ],
  topItems: [
    {
      id: 'item-1',
      name: 'Dashboard Template Pro',
      brand: 'SplitFin UI',
      quantity: 45,
      revenue: 12500,
      sku: 'DASH-PRO-001'
    },
    {
      id: 'item-2',
      name: 'UI Component Library',
      brand: 'SplitFin UI',
      quantity: 32,
      revenue: 8900,
      sku: 'UI-LIB-002'
    },
    // Add more mock items...
  ]
}