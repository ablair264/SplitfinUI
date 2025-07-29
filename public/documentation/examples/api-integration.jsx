// API Integration Example
// Shows how to integrate SplitfinUI with your backend API

import { useState, useEffect, useCallback } from 'react';

// API Configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'https://api.yourdomain.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Version': '1.0.0'
  }
};

// API Service Class
class ApiService {
  constructor(config = API_CONFIG) {
    this.config = config;
    this.token = localStorage.getItem('authToken');
  }

  // Set auth token
  setAuthToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Base request method
  async request(endpoint, options = {}) {
    const url = `${this.config.baseURL}${endpoint}`;
    
    const config = {
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers,
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      }
    };

    try {
      const response = await fetch(url, config);
      
      // Handle errors
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new ApiError(
          error.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          error
        );
      }
      
      // Return response
      const data = await response.json();
      return data;
      
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error', 0, error);
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
}

// Custom Error Class
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Create API instance
const api = new ApiService();

// Dashboard API Endpoints
export const dashboardApi = {
  // Get dashboard data
  async getDashboardData(params = {}) {
    const { userId, dateRange = '30_days', metrics = [] } = params;
    
    return api.post('/api/dashboard/data', {
      userId,
      dateRange,
      requestedMetrics: metrics
    });
  },

  // Get real-time metrics
  async getRealtimeMetrics(userId) {
    return api.get(`/api/dashboard/realtime/${userId}`);
  },

  // Export dashboard data
  async exportDashboard(format = 'csv', params = {}) {
    const response = await api.post('/api/dashboard/export', {
      format,
      ...params
    });
    
    // Handle file download
    if (response.downloadUrl) {
      window.open(response.downloadUrl, '_blank');
    }
    
    return response;
  }
};

// Customer API Endpoints
export const customerApi = {
  // Get customers list
  async getCustomers(params = {}) {
    const {
      page = 1,
      limit = 20,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      filters = {}
    } = params;

    return api.get('/api/customers', {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      ...filters
    });
  },

  // Get single customer
  async getCustomer(customerId) {
    return api.get(`/api/customers/${customerId}`);
  },

  // Create customer
  async createCustomer(customerData) {
    return api.post('/api/customers', customerData);
  },

  // Update customer
  async updateCustomer(customerId, updates) {
    return api.patch(`/api/customers/${customerId}`, updates);
  },

  // Delete customer
  async deleteCustomer(customerId) {
    return api.delete(`/api/customers/${customerId}`);
  },

  // Get customer analytics
  async getCustomerAnalytics(customerId, dateRange = '30_days') {
    return api.get(`/api/customers/${customerId}/analytics`, { dateRange });
  }
};

// Order API Endpoints
export const orderApi = {
  // Get orders
  async getOrders(params = {}) {
    return api.get('/api/orders', params);
  },

  // Create order
  async createOrder(orderData) {
    return api.post('/api/orders', orderData);
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    return api.patch(`/api/orders/${orderId}/status`, { status });
  },

  // Get order details
  async getOrderDetails(orderId) {
    return api.get(`/api/orders/${orderId}`);
  }
};

// WebSocket Connection for Real-time Updates
export class RealtimeConnection {
  constructor(userId) {
    this.userId = userId;
    this.ws = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  connect() {
    const wsUrl = `${API_CONFIG.baseURL.replace('http', 'ws')}/ws?userId=${this.userId}`;
    
    try {
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.authenticate();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect();
      };
      
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
    }
  }

  authenticate() {
    const token = localStorage.getItem('authToken');
    if (token && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'auth',
        token
      }));
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`Attempting reconnect ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
    }
  }

  handleMessage(data) {
    const { type, payload } = data;
    
    // Notify all listeners for this event type
    const listeners = this.listeners.get(type) || [];
    listeners.forEach(callback => {
      try {
        callback(payload);
      } catch (error) {
        console.error(`Error in WebSocket listener for ${type}:`, error);
      }
    });
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(eventType) || [];
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  send(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Custom Hook for Dashboard Data with API
export function useApiDashboard(options = {}) {
  const {
    userId,
    dateRange = '30_days',
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
    enableRealtime = true
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch dashboard data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await dashboardApi.getDashboardData({
        userId,
        dateRange
      });
      
      // Transform API response to match component format
      const transformedData = transformApiResponse(response);
      
      setData(transformedData);
      setLastUpdated(new Date());
      
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [userId, dateRange]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchData]);

  // Real-time updates
  useEffect(() => {
    if (!enableRealtime || !userId) return;

    const realtime = new RealtimeConnection(userId);
    realtime.connect();

    // Subscribe to relevant events
    const unsubscribers = [
      realtime.subscribe('dashboard.update', (update) => {
        setData(prev => ({
          ...prev,
          ...update
        }));
      }),
      
      realtime.subscribe('order.new', (order) => {
        setData(prev => ({
          ...prev,
          orders: [order, ...(prev?.orders || [])],
          metrics: {
            ...prev?.metrics,
            totalOrders: (prev?.metrics?.totalOrders || 0) + 1,
            totalRevenue: (prev?.metrics?.totalRevenue || 0) + order.total
          }
        }));
      }),
      
      realtime.subscribe('customer.new', (customer) => {
        setData(prev => ({
          ...prev,
          customers: [customer, ...(prev?.customers || [])],
          metrics: {
            ...prev?.metrics,
            totalCustomers: (prev?.metrics?.totalCustomers || 0) + 1
          }
        }));
      })
    ];

    return () => {
      unsubscribers.forEach(unsub => unsub());
      realtime.disconnect();
    };
  }, [enableRealtime, userId]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    lastUpdated,
    isStale: lastUpdated && (Date.now() - lastUpdated.getTime()) > 60000
  };
}

// Transform API Response to Component Format
function transformApiResponse(apiData) {
  return {
    metrics: {
      totalRevenue: apiData.revenue?.total || 0,
      totalOrders: apiData.orders?.count || 0,
      totalCustomers: apiData.customers?.active || 0,
      averageOrderValue: apiData.revenue?.average || 0,
      outstandingInvoices: apiData.invoices?.outstanding?.amount || 0,
      marketplaceOrders: apiData.orders?.marketplace || 0
    },
    orders: (apiData.recentOrders || []).map(order => ({
      id: order.orderId,
      customerId: order.customer?.id,
      customerName: order.customer?.name,
      date: order.createdAt,
      total: order.amount,
      status: order.status,
      is_marketplace_order: order.source === 'marketplace',
      invoice_status: order.invoice?.status,
      line_items: order.items?.map(item => ({
        item_id: item.id,
        name: item.name,
        brand: item.brand,
        quantity: item.quantity,
        total: item.amount
      }))
    })),
    customers: (apiData.topCustomers || []).map(customer => ({
      id: customer.customerId,
      name: customer.name,
      email: customer.email,
      totalOrders: customer.orderCount,
      totalSpent: customer.totalSpent,
      lastOrderDate: customer.lastOrder?.date
    })),
    invoices: (apiData.invoices?.list || []).map(invoice => ({
      id: invoice.invoiceId,
      customerName: invoice.customer?.name,
      amount: invoice.amount,
      dueDate: invoice.dueDate,
      status: invoice.status,
      daysPastDue: invoice.daysPastDue
    })),
    agentPerformance: (apiData.agents || []).map(agent => ({
      id: agent.agentId,
      name: agent.name,
      totalSales: agent.sales?.total || 0,
      orderCount: agent.sales?.count || 0,
      conversionRate: agent.metrics?.conversionRate || 0
    })),
    brands: (apiData.brands || []).map(brand => ({
      name: brand.name,
      revenue: brand.revenue || 0,
      quantity: brand.unitsSold || 0,
      orderCount: brand.orderCount || 0
    })),
    topItems: (apiData.products?.top || []).map(item => ({
      id: item.productId,
      name: item.name,
      brand: item.brand,
      quantity: item.unitsSold || 0,
      revenue: item.revenue || 0,
      sku: item.sku
    }))
  };
}

// Usage Example
export function DashboardWithAPI() {
  const { data, loading, error, refresh } = useApiDashboard({
    userId: 'current-user-id',
    dateRange: '30_days',
    autoRefresh: true,
    enableRealtime: true
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={refresh}
      />
    );
  }

  return (
    <Dashboard
      data={data}
      onRefresh={refresh}
      enableAIInsights={true}
      theme="dark"
    />
  );
}