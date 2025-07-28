// Custom Theme Configuration Example
// Shows how to create a custom theme for your brand

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define your brand colours
const BRAND_COLOURS = {
  // Primary palette
  primary: '#FF6B6B',        // Coral Red
  secondary: '#4ECDC4',      // Turquoise
  tertiary: '#45B7D1',       // Sky Blue
  
  // Accent colours
  accent: '#FFE66D',         // Sunshine Yellow
  accentDark: '#F7B731',     // Golden Yellow
  
  // Neutral colours
  dark: '#2C3E50',           // Dark Blue Grey
  light: '#ECF0F1',          // Light Grey
  white: '#FFFFFF',
  black: '#000000',
  
  // Status colours
  success: '#26DE81',        // Green
  warning: '#FED330',        // Yellow
  error: '#FC5C65',          // Red
  info: '#45AAF2',           // Blue
  
  // Chart colours (for data visualisation)
  chart: [
    '#FF6B6B',  // Coral Red
    '#4ECDC4',  // Turquoise
    '#45B7D1',  // Sky Blue
    '#FFE66D',  // Sunshine Yellow
    '#A8E6CF',  // Mint Green
    '#DDA0DD',  // Plum
    '#98D8C8',  // Seafoam
    '#F7DC6F',  // Light Yellow
    '#BB8FCE',  // Lavender
    '#85C1E2'   // Light Blue
  ]
};

// Theme configurations
const THEMES = {
  light: {
    // Backgrounds
    bgPrimary: BRAND_COLOURS.white,
    bgSecondary: BRAND_COLOURS.light,
    bgTertiary: '#F5F6FA',
    
    // Text
    textPrimary: BRAND_COLOURS.dark,
    textSecondary: 'rgba(44, 62, 80, 0.7)',
    textMuted: 'rgba(44, 62, 80, 0.5)',
    
    // Borders
    border: 'rgba(44, 62, 80, 0.1)',
    borderHover: 'rgba(44, 62, 80, 0.2)',
    
    // Shadows
    shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    shadowHover: '0 8px 24px rgba(0, 0, 0, 0.12)',
    
    // Components
    cardBg: BRAND_COLOURS.white,
    sidebarBg: BRAND_COLOURS.white,
    inputBg: BRAND_COLOURS.light,
    
    // States
    hoverBg: 'rgba(44, 62, 80, 0.05)',
    activeBg: `${BRAND_COLOURS.primary}20`,
    
    // Accents
    accent: BRAND_COLOURS.primary,
    accentHover: '#FF5252'
  },
  
  dark: {
    // Backgrounds
    bgPrimary: '#1A1D29',
    bgSecondary: '#242837',
    bgTertiary: '#2E3348',
    
    // Text
    textPrimary: BRAND_COLOURS.white,
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    
    // Borders
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.15)',
    
    // Shadows
    shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    shadowHover: '0 8px 24px rgba(0, 0, 0, 0.4)',
    
    // Components
    cardBg: '#242837',
    sidebarBg: '#1A1D29',
    inputBg: 'rgba(255, 255, 255, 0.05)',
    
    // States
    hoverBg: 'rgba(255, 255, 255, 0.05)',
    activeBg: `${BRAND_COLOURS.primary}20`,
    
    // Accents
    accent: BRAND_COLOURS.primary,
    accentHover: '#FF5252'
  },
  
  // Custom brand theme
  brand: {
    // Gradient backgrounds
    bgPrimary: `linear-gradient(135deg, ${BRAND_COLOURS.primary} 0%, ${BRAND_COLOURS.secondary} 100%)`,
    bgSecondary: BRAND_COLOURS.secondary,
    bgTertiary: BRAND_COLOURS.tertiary,
    
    // Text
    textPrimary: BRAND_COLOURS.white,
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    textMuted: 'rgba(255, 255, 255, 0.7)',
    
    // Borders
    border: 'rgba(255, 255, 255, 0.2)',
    borderHover: 'rgba(255, 255, 255, 0.3)',
    
    // Shadows
    shadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    shadowHover: '0 12px 48px rgba(0, 0, 0, 0.3)',
    
    // Components
    cardBg: 'rgba(255, 255, 255, 0.1)',
    sidebarBg: 'rgba(0, 0, 0, 0.2)',
    inputBg: 'rgba(255, 255, 255, 0.1)',
    
    // States
    hoverBg: 'rgba(255, 255, 255, 0.1)',
    activeBg: 'rgba(255, 255, 255, 0.2)',
    
    // Accents
    accent: BRAND_COLOURS.accent,
    accentHover: BRAND_COLOURS.accentDark
  }
};

// Theme Context
const ThemeContext = createContext(null);

export function ThemeProvider({ children, defaultTheme = 'dark' }) {
  const [theme, setTheme] = useState(defaultTheme);
  const [customColors, setCustomColors] = useState({});

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    const savedColors = localStorage.getItem('app-custom-colors');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColors) setCustomColors(JSON.parse(savedColors));
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const themeConfig = { ...THEMES[theme], ...customColors };
    
    // Apply all theme variables
    Object.entries(themeConfig).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });
    
    // Apply chart colours
    BRAND_COLOURS.chart.forEach((color, index) => {
      root.style.setProperty(`--chart-color-${index + 1}`, color);
    });
    
    // Save theme preference
    localStorage.setItem('app-theme', theme);
    if (Object.keys(customColors).length > 0) {
      localStorage.setItem('app-custom-colors', JSON.stringify(customColors));
    }
  }, [theme, customColors]);

  // Theme switcher function
  const switchTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Custom colour setter
  const setCustomColor = (colorKey, colorValue) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: colorValue
    }));
  };

  // Reset to defaults
  const resetTheme = () => {
    setCustomColors({});
    localStorage.removeItem('app-custom-colors');
  };

  const value = {
    theme,
    themes: THEMES,
    colors: BRAND_COLOURS,
    switchTheme,
    setCustomColor,
    resetTheme,
    currentColors: { ...THEMES[theme], ...customColors }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Theme Switcher Component
export function ThemeSwitcher() {
  const { theme, themes, switchTheme, colors, setCustomColor } = useTheme();

  return (
    <div className="theme-switcher">
      <h3>Theme Settings</h3>
      
      {/* Theme Mode */}
      <div className="theme-mode-selector">
        <label>Theme Mode</label>
        <div className="theme-options">
          {Object.keys(themes).map(themeName => (
            <button
              key={themeName}
              className={`theme-option ${theme === themeName ? 'active' : ''}`}
              onClick={() => switchTheme(themeName)}
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Colour Customisation */}
      <div className="colour-customiser">
        <label>Customise Colours</label>
        
        <div className="colour-grid">
          <div className="colour-input">
            <span>Primary</span>
            <input
              type="color"
              defaultValue={colors.primary}
              onChange={(e) => setCustomColor('accent', e.target.value)}
            />
          </div>
          
          <div className="colour-input">
            <span>Secondary</span>
            <input
              type="color"
              defaultValue={colors.secondary}
              onChange={(e) => setCustomColor('bgSecondary', e.target.value)}
            />
          </div>
          
          <div className="colour-input">
            <span>Background</span>
            <input
              type="color"
              defaultValue="#1A1D29"
              onChange={(e) => setCustomColor('bgPrimary', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Chart Colours Preview */}
      <div className="chart-colours-preview">
        <label>Chart Colours</label>
        <div className="colour-swatches">
          {colors.chart.map((color, index) => (
            <div
              key={index}
              className="colour-swatch"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Usage in your App
export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <YourAppContent />
    </ThemeProvider>
  );
}

// CSS for theme variables
const themeStyles = `
/* Use theme variables throughout your app */
.my-component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.my-component:hover {
  background: var(--hover-bg);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-hover);
}

.primary-button {
  background: var(--accent);
  color: white;
}

.primary-button:hover {
  background: var(--accent-hover);
}

/* Chart colours */
.chart-series-1 { color: var(--chart-color-1); }
.chart-series-2 { color: var(--chart-color-2); }
.chart-series-3 { color: var(--chart-color-3); }
/* ... and so on */
`;