'use client';

import React from 'react';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import styles from './FullGraph.module.css';

interface FullGraphProps {
  id: string;
  title: string;
  subtitle?: string;
  data: Array<any>;
  type?: 'area' | 'line' | 'bar' | 'composed';
  lines?: Array<{
    dataKey: string;
    color: string;
    name: string;
    format?: 'currency' | 'number' | 'percentage';
  }>;
  height?: number;
}

const FullGraph: React.FC<FullGraphProps> = ({
  id,
  title,
  subtitle,
  data,
  type = 'area',
  lines = [{ dataKey: 'value', color: '#79d5e9', name: 'Value' }],
  height = 400,
}) => {
  const formatValue = (value: number, format: string = 'currency') => {
    if (format === 'currency') {
      if (value >= 1000000) {
        return `£${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `£${(value / 1000).toFixed(1)}K`;
      }
      return `£${value.toFixed(0)}`;
    }
    return value.toFixed(0);
  };

  return (
    <div className={styles.fullGraphContainer}>
      <div className={styles.fullGraphHeader}>
        <div className={styles.graphHeaderLeft}>
          <h2 className={styles.graphTitle}>{title}</h2>
          {subtitle && <p className={styles.graphSubtitle}>{subtitle}</p>}
        </div>
      </div>
      <div className={styles.fullGraphContent} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#79d5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#79d5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => formatValue(value)} />
            <Tooltip
              contentStyle={{
                background: '#1a1f2a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => formatValue(value)}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#79d5e9"
              fill="url(#gradient-revenue-orders)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FullGraph;