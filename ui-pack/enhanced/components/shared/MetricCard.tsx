import React from 'react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';
import CountUp from 'react-countup';
import { useColors } from './ColorProvider';
import styles from './MetricCard.module.css';

export interface MetricCardProps {
  id?: string;
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  previousValue?: number;
  chartData?: Array<{ name: string; value: number }>;
  format?: 'currency' | 'number' | 'percentage';
  displayMode?: 'full' | 'compact';
  design?: 'variant1' | 'variant2' | 'variant3';
  icon?: React.ReactNode | string;
  color?: string;
  onClick?: () => void;
  onAIInsight?: () => void;
  onVariantChange?: (variant: 'variant1' | 'variant2' | 'variant3') => void;
  showVariantSelector?: boolean;
  cardIndex?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  id = 'metric-card',
  title,
  value,
  subtitle,
  trend,
  previousValue,
  chartData = [],
  format = 'number',
  displayMode = 'full',
  design = 'variant1',
  icon,
  color: propColor,
  onClick,
  onAIInsight,
  onVariantChange,
  showVariantSelector = false,
  cardIndex = 0
}) => {
  const { getMetricCardColor } = useColors();
  
  // Use context color if no specific color is provided
  const color = propColor || getMetricCardColor(cardIndex);
  
  // Calculate trend from previous value if not provided
  const calculatedTrend = React.useMemo(() => {
    if (trend) return trend;
    if (previousValue && typeof value === 'number') {
      const percentageChange = ((value - previousValue) / previousValue) * 100;
      return {
        value: Math.abs(Math.round(percentageChange)),
        isPositive: percentageChange > 0
      };
    }
    return null;
  }, [trend, previousValue, value]);

  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const chartConfig = {
    margin: { top: 5, right: 10, bottom: 5, left: 10 },
    strokeWidth: 2,
  };

  const renderVariantSelector = () => {
    if (!onVariantChange || !showVariantSelector) return null;
    
    return (
      <div className={styles.variantSelector}>
        <button
          className={`${styles.variantButton} ${design === 'variant1' ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onVariantChange('variant1');
          }}
          title="Area Chart"
        >
          1
        </button>
        <button
          className={`${styles.variantButton} ${design === 'variant2' ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onVariantChange('variant2');
          }}
          title="Line Chart"
        >
          2
        </button>
        <button
          className={`${styles.variantButton} ${design === 'variant3' ? styles.active : ''}`}
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

  const renderChart = () => {
    if (!chartData || chartData.length === 0) return null;

    const ChartComponent = design === 'variant3' ? BarChart : design === 'variant2' ? LineChart : AreaChart;
    const DataComponent = design === 'variant3' ? Bar : design === 'variant2' ? Line : Area;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={chartData} {...chartConfig}>
          <defs>
            <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              background: '#1a1f2a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              fontSize: '12px',
              padding: '8px'
            }}
            labelStyle={{ color: '#a0a0a0' }}
            formatter={(value: number) => [
              format === 'currency' ? `$${Math.round(value).toLocaleString()}` :
              format === 'percentage' ? `${Math.round(value)}%` :
              Math.round(value).toLocaleString(),
              ''
            ]}
          />
          {design === 'variant3' ? (
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          ) : design === 'variant2' ? (
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          ) : (
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#gradient-${id})`}
              strokeWidth={2}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  if (displayMode === 'compact') {
    return (
      <div 
        className={styles.metricCardCompact} 
        onClick={onClick} 
        style={{ 
          borderLeftColor: color,
          borderLeftWidth: '3px'
        }}
      >
        {icon && (
          <div className={styles.compactIcon} style={{ backgroundColor: `${color}15` }}>
            {typeof icon === 'string' ? <span>{icon}</span> : icon}
          </div>
        )}
        <div className={styles.compactContent}>
          <div className={styles.compactValue} style={{ color }}>
            {typeof value === 'number' ? (
              <CountUp
                end={value}
                duration={1.5}
                separator=","
                prefix={format === 'currency' ? '$' : ''}
                suffix={format === 'percentage' ? '%' : ''}
                decimals={format === 'percentage' ? 1 : 0}
              />
            ) : (
              value
            )}
          </div>
          <div className={styles.compactTitle}>{title}</div>
        </div>
        {calculatedTrend && (
          <div className={`${styles.compactTrend} ${calculatedTrend.isPositive ? styles.positive : styles.negative}`}>
            <span className={styles.trendIcon}>{calculatedTrend.isPositive ? '↑' : '↓'}</span>
            <span className={styles.trendValue}>{Math.abs(calculatedTrend.value)}%</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`${styles.metricCardFull} ${styles[`metricCard${design.charAt(0).toUpperCase() + design.slice(1)}`]}`} 
      onClick={onClick} 
      style={{ 
        borderTopColor: design === 'variant3' ? color : undefined,
        borderLeftColor: design === 'variant2' ? color : undefined,
        borderColor: design === 'variant1' ? color : undefined,
        background: design === 'variant1' ? `linear-gradient(135deg, var(--background-white) 0%, ${color}15 100%)` : undefined
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
        <div className={styles.headerRight}>
          {calculatedTrend && (
            <div className={`${styles.trendIndicator} ${calculatedTrend.isPositive ? styles.positive : styles.negative}`}>
              <span className={styles.trendIcon}>{calculatedTrend.isPositive ? '↑' : '↓'}</span>
              <span className={styles.trendValue}>{Math.abs(calculatedTrend.value)}%</span>
            </div>
          )}
          {renderVariantSelector()}
          {onAIInsight && (
            <button 
              className={styles.aiButton} 
              onClick={(e) => {
                e.stopPropagation();
                onAIInsight();
              }}
              title="AI Insights"
            >
              🤖
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.cardValue}>
        {typeof value === 'number' ? (
          <CountUp
            end={value}
            duration={1.5}
            separator=","
            prefix={format === 'currency' ? '$' : ''}
            suffix={format === 'percentage' ? '%' : ''}
            decimals={format === 'percentage' ? 1 : 0}
          />
        ) : (
          value
        )}
      </div>
      
      {subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
      
      {chartData && chartData.length > 0 && (
        <div className={styles.cardChart}>
          {renderChart()}
        </div>
      )}
      
      {chartData && chartData.length > 0 && (
        <div className={styles.cardDateRange}>
          <span>{chartData[0]?.name}</span>
          <span>{chartData[chartData.length - 1]?.name}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;