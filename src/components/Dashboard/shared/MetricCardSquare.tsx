import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import CountUp from 'react-countup';
import { useColors } from './ColorProvider';
import styles from './MetricCardSquare.module.css';

export interface MetricCardSquareProps {
  id: string;
  title: string;
  value: number | string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  chartData?: Array<{ name: string; value: number; percentage?: number }>;
  format?: 'currency' | 'number' | 'percentage';
  design?: 'variant1' | 'variant2' | 'variant3';
  color?: string;
  onClick?: () => void;
  onVariantChange?: (variant: 'variant1' | 'variant2' | 'variant3') => void;
  cardIndex?: number;
}

const MetricCardSquare: React.FC<MetricCardSquareProps> = ({
  id,
  title,
  value,
  trend,
  chartData = [],
  format = 'number',
  design = 'variant1',
  color: propColor,
  onClick,
  onVariantChange,
  cardIndex = 0
}) => {
  const { getMetricCardColor } = useColors();
  const [isChartReady, setIsChartReady] = useState(false);
  
  // Use context color if no specific color is provided
  const color = propColor || getMetricCardColor(cardIndex) || '#79d5e9';
  
  // Ensure chart renders after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChartReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Generate more varied data for better chart visibility
  const displayChartData = React.useMemo(() => {
    if (chartData && chartData.length > 0) {
      return chartData;
    }
    
    // Generate demo data for display if no real data
    const baseValue = typeof value === 'number' ? value : 1000;
    
    // For line and area charts, generate more data points with variation
    if (design === 'variant1' || design === 'variant2') {
      // Ensure we have valid numeric values
      return [
        { name: 'Mon', value: Math.max(1, Math.floor(baseValue * 0.7)) },
        { name: 'Tue', value: Math.max(1, Math.floor(baseValue * 0.85)) },
        { name: 'Wed', value: Math.max(1, Math.floor(baseValue * 1.1)) },
        { name: 'Thu', value: Math.max(1, Math.floor(baseValue * 0.95)) },
        { name: 'Fri', value: Math.max(1, Math.floor(baseValue * 1.2)) },
        { name: 'Sat', value: Math.max(1, Math.floor(baseValue * 0.8)) },
        { name: 'Sun', value: Math.max(1, Math.floor(baseValue * 0.9)) }
      ];
    }
    
    // For table view (bar chart)
    return [
      { name: 'Martin Cape', value: 1500, percentage: 5 },
      { name: 'Jodie Smith', value: 400, percentage: 10 },
      { name: 'Alex Jones', value: 400, percentage: 4 },
      { name: 'Peter File', value: 700, percentage: 10 }
    ];
  }, [chartData, value, design]);

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

  const chartConfig = {
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    strokeWidth: 2,
  };

  const renderVariantSelector = () => {
    if (!onVariantChange) return null;
    
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
    const dataToUse = displayChartData;
    
    // Ensure we have valid data
    if (!dataToUse || dataToUse.length === 0) {
      return (
        <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '12px'
        }}>
          No chart data
        </div>
      );
    }

    // For bar chart (variant3), render custom vertical bars like in the mockup
    if (design === 'variant3') {
      // Create colorful bar data that matches the mockup
      const colors = ['#4daeac', '#79d5e9', '#F97D17', '#79d5e9', '#4daeac', '#79d5e9', '#F97D17', '#79d5e9'];
      const heights = [70, 85, 95, 65, 75, 80, 90, 70];
      
      return (
        <div style={{
          width: '100%',
          height: '120px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          padding: '0 15px',
          position: 'relative',
          boxSizing: 'border-box'
        }}>
          {heights.map((height, index) => (
            <div
              key={index}
              style={{
                width: '22px',
                height: `${height}%`,
                backgroundColor: colors[index],
                borderRadius: '10px 10px 0 0',
                transition: 'height 0.5s ease-out',
                animation: `growBar 0.5s ease-out ${index * 0.05}s backwards`
              }}
            />
          ))}
        </div>
      );
    }

    const ChartComponent = design === 'variant2' ? LineChart : AreaChart;

    return (
      <div style={{ width: '100%', height: '120px', position: 'relative', display: 'block' }}>
        <ResponsiveContainer width="100%" height={120}>
          <ChartComponent 
            data={dataToUse} 
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            key={`${id}-${design}-${color}`}
          >
            <defs>
              <linearGradient id={`gradient-${id}-${design}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide={true} />
            <YAxis hide={true} />
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
                format === 'currency' ? `£${Math.round(value).toLocaleString()}` :
                format === 'percentage' ? `${Math.round(value)}%` :
                Math.round(value).toLocaleString(),
                ''
              ]}
            />
            {design === 'variant2' ? (
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={false}
                animationDuration={1000}
                animationBegin={100}
                isAnimationActive={true}
              />
            ) : (
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fill={`url(#gradient-${id}-${design})`}
                strokeWidth={2}
                animationDuration={1000}
                animationBegin={100}
                isAnimationActive={true}
              />
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderTable = () => {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.tableSubHeader}>
          <span className={styles.tableHeaderName}>Name</span>
          <span className={styles.tableHeaderTotal}>Total</span>
        </div>
        <div className={styles.tableBody}>
          {displayChartData.map((item, index) => (
            <div key={index} className={styles.tableRow}>
              <span className={styles.tableName}>{item.name}</span>
              <div className={styles.tableTotal}>
                <span className={styles.tableValue}>
                  {formatValue(item.value)}
                </span>
                {item.percentage && (
                  <span className={`${styles.tablePercentage} ${item.percentage > 0 ? styles.positive : styles.negative}`}>
                    ↑ {item.percentage}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Convert hex to RGB for gradient
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '121, 213, 233';
  };

  return (
    <div 
      className={`${styles.metricCardSquare} ${styles[design]}`} 
      onClick={onClick}
      style={{ 
        '--card-color': color,
        '--card-color-rgb': hexToRgb(color)
      } as React.CSSProperties}
    >
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {trend && (
            <div className={`${styles.trendIndicator} ${trend.isPositive ? styles.positive : styles.negative}`}>
              <span className={styles.trendIcon}>{trend.isPositive ? '↑' : '↓'}</span>
              <span className={styles.trendValue}>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={styles.headerRight}>
          {renderVariantSelector()}
        </div>
      </div>
      
      <div className={styles.cardValue}>
        {typeof value === 'number' ? (
          <CountUp
            end={value}
            duration={1.5}
            separator=","
            prefix={format === 'currency' ? '£' : ''}
            suffix={format === 'percentage' ? '%' : ''}
            decimals={format === 'percentage' ? 1 : 0}
          />
        ) : (
          value
        )}
      </div>
      
      <div className={styles.cardContent}>
        {isChartReady && displayChartData && displayChartData.length > 0 ? renderChart() : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.3)',
            fontSize: '12px'
          }}>
            {!isChartReady ? 'Loading...' : 'No data'}
          </div>
        )}
      </div>
      
      <div className={styles.tableView}>
        {renderTable()}
      </div>
    </div>
  );
};

export default MetricCardSquare;