// MetricCard Component - SplitfinUI Pack
import React, { useEffect, useState } from 'react';
import './MetricCard.css';

export interface MetricCardProps {
  id?: string;
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  chartData?: Array<{ name: string; value: number }>;
  format?: 'currency' | 'number' | 'percentage';
  displayMode?: 'full' | 'compact';
  design?: 'variant1' | 'variant2' | 'variant3';
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
  onOptionsClick?: () => void;
  onVariantChange?: (variant: 'variant1' | 'variant2' | 'variant3') => void;
  cardIndex?: number;
}

// Default colors for metric cards
const defaultColors = [
  '#79d5e9', // Primary cyan
  '#61bc8e', // Success green
  '#f59e0b', // Warning orange
  '#8b5cf6', // Purple
  '#4daeac', // Secondary teal
  '#ef4444', // Error red
];

const MetricCard: React.FC<MetricCardProps> = ({
  id = 'metric-card',
  title,
  value,
  subtitle,
  trend,
  chartData = [],
  format = 'number',
  displayMode = 'full',
  design = 'variant1',
  icon,
  color: propColor,
  onClick,
  onOptionsClick,
  onVariantChange,
  cardIndex = 0
}) => {
  const [animatedValue, setAnimatedValue] = useState<number>(0);
  const color = propColor || defaultColors[cardIndex % defaultColors.length];

  // Simple count-up animation
  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(current);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [value]);

  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('en-GB').format(val);
    }
  };

  const renderVariantSelector = () => {
    if (!onVariantChange) return null;
    
    return (
      <div className="variant-selector">
        <button
          className={`variant-button ${design === 'variant1' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onVariantChange('variant1');
          }}
          title="Area Chart"
        >
          1
        </button>
        <button
          className={`variant-button ${design === 'variant2' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onVariantChange('variant2');
          }}
          title="Line Chart"
        >
          2
        </button>
        <button
          className={`variant-button ${design === 'variant3' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onVariantChange('variant3');
          }}
          title="Bar Chart"
        >
          3
        </button>
      </div>
    );
  };

  const renderMiniChart = () => {
    if (!chartData || chartData.length === 0) return null;

    const maxValue = Math.max(...chartData.map(d => d.value));
    const chartHeight = 60;

    // Simple SVG chart rendering
    const points = chartData.map((d, i) => {
      const x = (i / (chartData.length - 1)) * 100;
      const y = ((maxValue - d.value) / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    const areaPoints = `0,${chartHeight} ${points} 100,${chartHeight}`;

    return (
      <div className="card-chart">
        <svg viewBox={`0 0 100 ${chartHeight}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity="0.3"/>
              <stop offset="95%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {design === 'variant3' ? (
            // Bar chart
            chartData.map((d, i) => {
              const barWidth = 80 / chartData.length;
              const barHeight = (d.value / maxValue) * chartHeight;
              const x = (i * 100) / chartData.length + 10;
              const y = chartHeight - barHeight;
              
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  opacity="0.8"
                  rx="2"
                />
              );
            })
          ) : design === 'variant2' ? (
            // Line chart
            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
          ) : (
            // Area chart
            <>
              <polygon
                points={areaPoints}
                fill={`url(#gradient-${id})`}
              />
              <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
              />
            </>
          )}
        </svg>
      </div>
    );
  };

  if (displayMode === 'compact') {
    return (
      <div 
        className="metric-card-compact" 
        onClick={onClick} 
        style={{ 
          borderLeftColor: color,
          borderLeftWidth: '3px'
        }}
      >
        {icon && (
          <div className="compact-icon" style={{ backgroundColor: `${color}15` }}>
            {icon}
          </div>
        )}
        <div className="compact-content">
          <div className="compact-value" style={{ color }}>
            {formatValue(typeof value === 'number' ? animatedValue : value)}
          </div>
          <div className="compact-title">{title}</div>
        </div>
        {trend && (
          <div className={`compact-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            <span className="trend-icon">{trend.isPositive ? '↑' : '↓'}</span>
            <span className="trend-value">{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`metric-card-full metric-card-${design}`} 
      onClick={onClick} 
      style={{ 
        borderTopColor: design === 'variant3' ? color : undefined,
        borderLeftColor: design === 'variant2' ? color : undefined,
        borderColor: design === 'variant1' ? color : undefined,
        background: design === 'variant1' ? `linear-gradient(135deg, var(--card-background) 0%, ${color}15 100%)` : undefined
      }}
    >
      <div className="card-header">
        <div className="header-left">
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="header-right">
          {trend && (
            <div className={`trend-indicator ${trend.isPositive ? 'positive' : 'negative'}`}>
              <span className="trend-icon">{trend.isPositive ? '↑' : '↓'}</span>
              <span className="trend-value">{Math.abs(trend.value)}%</span>
            </div>
          )}
          {renderVariantSelector()}
          {onOptionsClick && (
            <button className="options-button" onClick={(e) => {
              e.stopPropagation();
              onOptionsClick();
            }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="10" cy="4" r="1.5" />
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="10" cy="16" r="1.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="card-value">
        {formatValue(typeof value === 'number' ? animatedValue : value)}
      </div>
      
      {subtitle && <div className="card-subtitle">{subtitle}</div>}
      
      {renderMiniChart()}
      
      {chartData && chartData.length > 0 && (
        <div className="card-date-range">
          <span>{chartData[0]?.name}</span>
          <span>{chartData[chartData.length - 1]?.name}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
