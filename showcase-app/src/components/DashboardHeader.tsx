'use client';

import React from 'react';
import styles from './DashboardHeader.module.css';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  isEditMode: boolean;
  onEditModeToggle: () => void;
  onRefresh: () => void;
  metricDisplayMode?: 'full' | 'compact';
  onMetricDisplayModeChange?: (value: 'full' | 'compact') => void;
  barChartColors?: string;
  onBarChartColorsChange?: (value: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  dateRange,
  onDateRangeChange,
  isEditMode,
  onEditModeToggle,
  onRefresh,
  metricDisplayMode = 'full',
  onMetricDisplayModeChange,
  barChartColors = 'primary',
  onBarChartColorsChange
}) => {
  const colorOptions = [
    { value: 'primary', color: '#79d5e9' },
    { value: 'secondary', color: '#799de9' },
    { value: 'tertiary', color: '#79e9c5' },
    { value: 'fourth', color: '#FF9F00' },
    { value: 'fifth', color: '#C96868' },
    { value: 'sixth', color: '#4daeac' },
    { value: 'seventh', color: '#61bc8e' },
    { value: 'eighth', color: '#fbbf24' },
    { value: 'ninth', color: '#dc2626' },
    { value: 'tenth', color: '#8b5cf6' },
    { value: 'eleventh', color: '#ec4899' },
    { value: 'multicolored', color: 'linear-gradient(90deg, #79d5e9, #799de9, #79e9c5)' }
  ];

  return (
    <div className={styles.dashboardHeaderBar}>
      <div className={styles.headerTitleGroup}>
        <h1 className={styles.headerTitle}>{title}</h1>
        {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
      </div>
      
      <div className={styles.headerControls}>
        <div className={styles.dateRangeSelector}>
          <select className={styles.dateSelect} value={dateRange} onChange={(e) => onDateRangeChange(e.target.value)}>
            <option value="7_days">Last 7 Days</option>
            <option value="30_days">Last 30 Days</option>
            <option value="90_days">Last 90 Days</option>
          </select>
        </div>
        
        <button className={`${styles.editModeBtn} ${isEditMode ? styles.active : ''}`} onClick={onEditModeToggle}>
          <span className={styles.icon}>🔧</span>
          <span className={styles.label}>{isEditMode ? 'Done' : 'Edit'}</span>
        </button>
        
        <button className={styles.refreshBtn} onClick={onRefresh}>
          <span className={styles.icon}>🔄</span>
          <span className={styles.label}>Refresh</span>
        </button>
      </div>
      
      {isEditMode && (
        <div className={styles.editOptionsPanel}>
          <div className={styles.editOptionGroup}>
            <label>Display Mode</label>
            <div className={styles.optionButtons}>
              <button 
                className={metricDisplayMode === 'full' ? styles.active : ''} 
                onClick={() => onMetricDisplayModeChange?.('full')}
              >Full</button>
              <button 
                className={metricDisplayMode === 'compact' ? styles.active : ''} 
                onClick={() => onMetricDisplayModeChange?.('compact')}
              >Compact</button>
            </div>
          </div>
          
          <div className={styles.editOptionGroup}>
            <label>Chart Colors</label>
            <div className={styles.colorOptionsGrid}>
              {colorOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.colorOption} ${barChartColors === option.value ? styles.active : ''}`}
                  style={{ background: option.color }}
                  onClick={() => onBarChartColorsChange?.(option.value)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;