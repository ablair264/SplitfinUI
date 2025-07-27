import React from 'react';
import styles from './DashboardHeader.module.css';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onRefresh: () => void;
  isEditMode: boolean;
  onEditModeToggle: () => void;
  metricDisplayMode?: 'full' | 'compact';
  onMetricDisplayModeChange?: (value: 'full' | 'compact') => void;
  barChartColors?: 'primary' | 'secondary' | 'tertiary' | 'fourth' | 'fifth' | 'sixth' | 'seventh' | 'eighth' | 'ninth' | 'tenth' | 'eleventh' | 'multicolored';
  onBarChartColorsChange?: (value: 'primary' | 'secondary' | 'tertiary' | 'fourth' | 'fifth' | 'sixth' | 'seventh' | 'eighth' | 'ninth' | 'tenth' | 'eleventh' | 'multicolored') => void;
  chartDesign?: 'default' | 'horizontal-bars' | 'pie-with-legend' | 'table';
  onChartDesignChange?: (value: 'default' | 'horizontal-bars' | 'pie-with-legend' | 'table') => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  dateRange,
  onDateRangeChange,
  onRefresh,
  isEditMode,
  onEditModeToggle,
  metricDisplayMode = 'full',
  onMetricDisplayModeChange,
  barChartColors = 'primary',
  onBarChartColorsChange,
  chartDesign = 'default',
  onChartDesignChange
}) => {
  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.headerMain}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>{title}</h1>
          {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
        </div>

        <div className={styles.headerRight}>
          {/* Date Range Selector */}
          <select 
            value={dateRange} 
            onChange={(e) => onDateRangeChange(e.target.value)}
            className={styles.dateSelect}
          >
            <option value="7_days">Last 7 Days</option>
            <option value="30_days">Last 30 Days</option>
            <option value="90_days">Last 90 Days</option>
            <option value="this_year">This Year</option>
            <option value="all_time">All Time</option>
          </select>

        </div>
      </div>

      <div className={styles.customizationPanel}>
        <div className={styles.instructionBox}>
          <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Customize your dashboard appearance - Choose colors for metric cards and chart styles</span>
        </div>

        <div className={styles.customizationOptions}>
          <div className={styles.editOption}>
            <span className={styles.editLabel}>Card Style</span>
            <div className={styles.toggleGroup}>
              <button 
                className={`${styles.toggleButton} ${metricDisplayMode === 'full' ? styles.active : ''}`}
                onClick={() => onMetricDisplayModeChange?.('full')}
              >
                Full
              </button>
              <button 
                className={`${styles.toggleButton} ${metricDisplayMode === 'compact' ? styles.active : ''}`}
                onClick={() => onMetricDisplayModeChange?.('compact')}
              >
                Compact
              </button>
            </div>
          </div>

          <div className={styles.editOption}>
            <span className={styles.editLabel}>Chart Type</span>
            <div className={styles.toggleGroup}>
              <button 
                className={`${styles.toggleButton} ${chartDesign === 'table' ? styles.active : ''}`}
                onClick={() => {
                  onChartDesignChange?.('table');
                  // Scroll to card charts section
                  setTimeout(() => {
                    const cardChartsSection = document.querySelector('#card-charts-section');
                    if (cardChartsSection) {
                      cardChartsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 100);
                }}
                title="Table View"
              >
                Table
              </button>
              <button 
                className={`${styles.toggleButton} ${chartDesign === 'default' ? styles.active : ''}`}
                onClick={() => {
                  onChartDesignChange?.('default');
                  // Scroll to card charts section
                  setTimeout(() => {
                    const cardChartsSection = document.querySelector('#card-charts-section');
                    if (cardChartsSection) {
                      cardChartsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 100);
                }}
                title="Bar Chart"
              >
                Bar
              </button>
              <button 
                className={`${styles.toggleButton} ${chartDesign === 'horizontal-bars' ? styles.active : ''}`}
                onClick={() => {
                  onChartDesignChange?.('horizontal-bars');
                  // Scroll to card charts section
                  setTimeout(() => {
                    const cardChartsSection = document.querySelector('#card-charts-section');
                    if (cardChartsSection) {
                      cardChartsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 100);
                }}
                title="Horizontal Bars"
              >
                Horizontal
              </button>
              <button 
                className={`${styles.toggleButton} ${chartDesign === 'pie-with-legend' ? styles.active : ''}`}
                onClick={() => {
                  onChartDesignChange?.('pie-with-legend');
                  // Scroll to card charts section
                  setTimeout(() => {
                    const cardChartsSection = document.querySelector('#card-charts-section');
                    if (cardChartsSection) {
                      cardChartsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 100);
                }}
                title="Pie Chart"
              >
                Pie
              </button>
            </div>
          </div>

          <div className={styles.editOption}>
            <span className={styles.editLabel}>Color Theme</span>
            <div className={styles.colorPicker}>
              {[
                { value: 'primary', color: '#79d5e9', label: 'Ocean Blue' },
                { value: 'secondary', color: '#799de9', label: 'Sky Purple' },
                { value: 'tertiary', color: '#79e9c5', label: 'Mint Green' },
                { value: 'fourth', color: '#FF9F00', label: 'Sunset Orange' },
                { value: 'fifth', color: '#C96868', label: 'Rose Pink' },
                { value: 'multicolored', gradient: 'linear-gradient(to right, #79d5e9, #799de9, #79e9c5, #FF9F00)', label: 'Rainbow Mix' }
              ].map((option) => (
                <button
                  key={option.value}
                  className={`${styles.colorOption} ${barChartColors === option.value ? styles.active : ''}`}
                  onClick={() => onBarChartColorsChange?.(option.value as any)}
                >
                  <span
                    className={styles.colorDot}
                    style={{ 
                      background: option.gradient || option.color,
                    }}
                  />
                  <span className={styles.colorLabel}>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;