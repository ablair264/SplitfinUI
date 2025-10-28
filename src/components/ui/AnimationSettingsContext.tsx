import React, { createContext, useContext, useMemo } from 'react';

export type AnimationSettings = {
  forceFallback?: boolean;
  fallbackStatic?: boolean;
  disableMotion?: boolean;
};

const defaultSettings = (): AnimationSettings => {
  let prefersReduced = false;
  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    try {
      prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}
  }

  let winOverrides: AnimationSettings = {};
  if (typeof window !== 'undefined') {
    winOverrides = (window as any).SPLITFIN_ANIMATIONS || {};
  }

  return {
    forceFallback: winOverrides.forceFallback ?? false,
    fallbackStatic: winOverrides.fallbackStatic ?? prefersReduced,
    disableMotion: winOverrides.disableMotion ?? prefersReduced,
  };
};

const AnimationSettingsContext = createContext<AnimationSettings>(defaultSettings());

export const useAnimationSettings = () => useContext(AnimationSettingsContext);

export const AnimationSettingsProvider: React.FC<{
  value?: AnimationSettings;
  children: React.ReactNode;
}> = ({ value, children }) => {
  const merged = useMemo(() => {
    const base = defaultSettings();
    return { ...base, ...value } as AnimationSettings;
  }, [value]);

  return (
    <AnimationSettingsContext.Provider value={merged}>
      {children}
    </AnimationSettingsContext.Provider>
  );
};

export default AnimationSettingsContext;

