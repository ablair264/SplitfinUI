// Export both Google Maps and Fallback versions
export { default as CustomerMapGoogle } from './CustomerMapGoogle';
export { default as CustomerMapFallback } from './CustomerMapFallback';

// Export the Google Maps version as default for backward compatibility
export { default } from './CustomerMapGoogle';

// Export types
export type { MapCustomer, RegionConfig, CustomerMapProps } from './CustomerMapGoogle';
export type { FallbackMapProps } from './CustomerMapFallback';
