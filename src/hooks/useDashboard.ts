// useDashboard Hook - Mock Data Implementation
import { useState, useEffect, useCallback, useMemo } from 'react';
import { DashboardData } from '../components/Dashboard/Dashboard';
import { getMockDataForDateRange } from '../utils/MOCKDATA';

interface UseDashboardOptions {
  userId?: string;
  dateRange?: string;
  autoRefresh?: boolean;
  apiEndpoint?: string;
  enableCaching?: boolean;
}

interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  isStale: boolean;
  isCached: boolean;
  lastUpdated: Date | null;
}

// Simulate cache with localStorage
const CACHE_KEY = 'splitfin_dashboard_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (userId: string, dateRange: string): { data: DashboardData | null; timestamp: number | null } => {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${userId}_${dateRange}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        data: parsed.data,
        timestamp: parsed.timestamp
      };
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return { data: null, timestamp: null };
};

const setCachedData = (userId: string, dateRange: string, data: DashboardData) => {
  try {
    localStorage.setItem(`${CACHE_KEY}_${userId}_${dateRange}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export const useDashboard = ({
  userId = 'demo-user',
  dateRange = '30_days',
  autoRefresh = false,
  apiEndpoint,
  enableCaching = true
}: UseDashboardOptions = {}): UseDashboardReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isCached, setIsCached] = useState(false);

  // Check if data is stale
  const isStale = useMemo(() => {
    if (!lastUpdated) return false;
    const staleTime = 10 * 60 * 1000; // 10 minutes
    return Date.now() - lastUpdated.getTime() > staleTime;
  }, [lastUpdated]);

  // Fetch data function
  const fetchData = useCallback(async (useCache = true) => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first if enabled
      if (enableCaching && useCache) {
        const { data: cachedData, timestamp } = getCachedData(userId, dateRange);
        if (cachedData && timestamp && (Date.now() - timestamp < CACHE_DURATION)) {
          setData(cachedData);
          setIsCached(true);
          setLastUpdated(new Date(timestamp));
          setLoading(false);
          return;
        }
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

      // Get mock data based on date range
      const mockData = getMockDataForDateRange(dateRange);
      
      // Add some random variation to make it feel more real
      const dataWithVariation = {
        ...mockData,
        metrics: {
          ...mockData.metrics,
          totalRevenue: mockData.metrics.totalRevenue + Math.floor((Math.random() - 0.5) * 1000),
          totalOrders: mockData.metrics.totalOrders + Math.floor((Math.random() - 0.5) * 5),
          totalCustomers: mockData.metrics.totalCustomers + Math.floor((Math.random() - 0.5) * 3),
        }
      };

      setData(dataWithVariation);
      setIsCached(false);
      setLastUpdated(new Date());
      
      // Cache the data if caching is enabled
      if (enableCaching) {
        setCachedData(userId, dateRange, dataWithVariation);
      }
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [userId, dateRange, enableCaching]);

  // Refresh function
  const refresh = useCallback(() => {
    fetchData(false); // Bypass cache on manual refresh
  }, [fetchData]);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && !loading && !error) {
      const interval = setInterval(() => {
        fetchData();
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh, loading, error, fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    isStale,
    isCached,
    lastUpdated
  };
};

// Export a hook to clear all cache
export const useClearDashboardCache = () => {
  const clearCache = useCallback(() => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_KEY)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  return clearCache;
};