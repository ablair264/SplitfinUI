'use client';

import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import styles from './CardChart.module.css';

interface CardChartProps {
  id: string;
  title: string;
  subtitle?: string;
  data: Array<{ name: string; value: number }>;
  type: 'pie' | 'donut';
  height?: number;
  showLegend?: boolean;
}

const CardChart: React.FC<CardChartProps> = ({
  id,
  title,
  subtitle,
  data,
  type = 'pie',
  height = 300,
  showLegend = false
}) => {
  const colors = ['#79d5e9', '#799de9', '#79e9c5', '#FF9F00', '#C96868', '#4daeac', '#61bc8e'];
  
  return (
    <div className={`${styles.cardChartContainer} ${styles.pieChart}`}>
      <div className={styles.cardChartHeader}>
        <div className={styles.chartHeaderLeft}>
          <h3 className={styles.chartTitle}>{title}</h3>
          {subtitle && <p className={styles.chartSubtitle}>{subtitle}</p>}
        </div>
      </div>
      <div className={styles.chartContent}>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="40%"
              innerRadius={type === 'donut' ? '60%' : 0}
              outerRadius="60%"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1a1f2a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
              }}
            />
            {showLegend && (
              <Legend 
                verticalAlign="bottom" 
                height={80}
                iconType="circle"
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CardChart;