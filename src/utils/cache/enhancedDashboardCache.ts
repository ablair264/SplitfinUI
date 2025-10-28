// Enhanced Dashboard Cache Implementation
// Provides caching functionality for dashboard data with compression and expiration

interface CacheStats {
  size: number;
  oldestEntry: number | null;
  newestEntry: number | null;
  storageInfo: {
    used: number;
    quota: number;
    usage: number;
  };
  cacheType: string;
}

interface CacheEntry {
  data: any;
  timestamp: number;
  compressed?: boolean;
}

class EnhancedDashboardCache {
  private readonly CACHE_PREFIX = 'dashboard_cache_';
  private readonly CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
  
  constructor() {
    // Initialize cache
    this.cleanupExpiredEntries();
  }

  private getCacheKey(key: string): string {
    return `${this.CACHE_PREFIX}${key}`;
  }

  async set(key: string, data: any): Promise<void> {
    try {
      const entry: CacheEntry = {
        data,
        timestamp: Date.now(),
        compressed: false
      };

      const serialized = JSON.stringify(entry);
      
      // Try to store in localStorage
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(this.getCacheKey(key), serialized);
      } else {
        // Fallback to sessionStorage
        sessionStorage.setItem(this.getCacheKey(key), serialized);
      }
    } catch (error) {
      console.error('Failed to cache data:', error);
      // If quota exceeded, clean up old entries
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        await this.cleanupOldEntries();
        // Retry once after cleanup
        try {
          const entry: CacheEntry = {
            data,
            timestamp: Date.now(),
            compressed: false
          };
          const serialized = JSON.stringify(entry);
          if (this.isLocalStorageAvailable()) {
            localStorage.setItem(this.getCacheKey(key), serialized);
          } else {
            sessionStorage.setItem(this.getCacheKey(key), serialized);
          }
        } catch (retryError) {
          console.error('Failed to cache data after cleanup:', retryError);
        }
      }
    }
  }

  async get(key: string): Promise<any | null> {
    try {
      const storage = this.isLocalStorageAvailable() ? localStorage : sessionStorage;
      const item = storage.getItem(this.getCacheKey(key));
      
      if (!item) return null;

      const entry: CacheEntry = JSON.parse(item);
      
      // Check if entry is expired
      if (Date.now() - entry.timestamp > this.CACHE_EXPIRY) {
        storage.removeItem(this.getCacheKey(key));
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Failed to retrieve cached data:', error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const storage = this.isLocalStorageAvailable() ? localStorage : sessionStorage;
      storage.removeItem(this.getCacheKey(key));
    } catch (error) {
      console.error('Failed to remove cached data:', error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      const storage = this.isLocalStorageAvailable() ? localStorage : sessionStorage;
      const keys = Object.keys(storage);
      
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          storage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  async getStats(): Promise<CacheStats> {
    try {
      const storage = this.isLocalStorageAvailable() ? localStorage : sessionStorage;
      const keys = Object.keys(storage);
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
      
      let oldestEntry: number | null = null;
      let newestEntry: number | null = null;
      let totalSize = 0;

      cacheKeys.forEach(key => {
        const item = storage.getItem(key);
        if (item) {
          totalSize += item.length;
          try {
            const entry: CacheEntry = JSON.parse(item);
            if (!oldestEntry || entry.timestamp < oldestEntry) {
              oldestEntry = entry.timestamp;
            }
            if (!newestEntry || entry.timestamp > newestEntry) {
              newestEntry = entry.timestamp;
            }
          } catch (e) {
            // Skip invalid entries
          }
        }
      });

      // Estimate storage quota and usage
      const quota = this.MAX_CACHE_SIZE;
      const usage = (totalSize / quota) * 100;

      return {
        size: cacheKeys.length,
        oldestEntry,
        newestEntry,
        storageInfo: {
          used: totalSize,
          quota,
          usage
        },
        cacheType: this.isLocalStorageAvailable() ? 'localStorage' : 'sessionStorage'
      };
    } catch (error) {
      console.error('Failed to get cache stats:', error);
      return {
        size: 0,
        oldestEntry: null,
        newestEntry: null,
        storageInfo: {
          used: 0,
          quota: this.MAX_CACHE_SIZE,
          usage: 0
        },
        cacheType: 'unknown'
      };
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private cleanupExpiredEntries(): void {
    try {
      const storage = this.isLocalStorageAvailable() ? localStorage : sessionStorage;
      const keys = Object.keys(storage);
      const now = Date.now();

      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          try {
            const item = storage.getItem(key);
            if (item) {
              const entry: CacheEntry = JSON.parse(item);
              if (now - entry.timestamp > this.CACHE_EXPIRY) {
                storage.removeItem(key);
              }
            }
          } catch (e) {
            // Remove invalid entries
            storage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Failed to cleanup expired entries:', error);
    }
  }

  private async cleanupOldEntries(): Promise<void> {
    try {
      const storage = this.isLocalStorageAvailable() ? localStorage : sessionStorage;
      const keys = Object.keys(storage);
      const cacheEntries: Array<{ key: string; timestamp: number }> = [];

      keys.forEach(key => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          try {
            const item = storage.getItem(key);
            if (item) {
              const entry: CacheEntry = JSON.parse(item);
              cacheEntries.push({ key, timestamp: entry.timestamp });
            }
          } catch (e) {
            // Remove invalid entries
            storage.removeItem(key);
          }
        }
      });

      // Sort by timestamp (oldest first)
      cacheEntries.sort((a, b) => a.timestamp - b.timestamp);

      // Remove oldest 25% of entries
      const entriesToRemove = Math.ceil(cacheEntries.length * 0.25);
      for (let i = 0; i < entriesToRemove; i++) {
        storage.removeItem(cacheEntries[i].key);
      }
    } catch (error) {
      console.error('Failed to cleanup old entries:', error);
    }
  }
}

// Export singleton instance
export const enhancedDashboardCache = new EnhancedDashboardCache();
export default enhancedDashboardCache;
