'use client';

import React from 'react';
import styles from './CardTable.module.css';

interface CardTableProps {
  id: string;
  title: string;
  subtitle?: string;
  data: Array<any>;
}

const CardTable: React.FC<CardTableProps> = ({
  id,
  title,
  subtitle,
  data
}) => {
  return (
    <div className={styles.cardTableContainer}>
      <div className={styles.cardTableHeader}>
        <div className={styles.tableHeaderLeft}>
          <h3 className={styles.tableTitle}>{title}</h3>
          {subtitle && <p className={styles.tableSubtitle}>{subtitle}</p>}
        </div>
      </div>
      
      <div className={styles.cardTableContent}>
        <div className={styles.tableContent}>
          {data.map((row, index) => (
            <div key={index} className={styles.tableRow}>
              <span className={styles.rank}>{index + 1}</span>
              <span className={styles.name}>{row.name}</span>
              <span className={styles.value}>£{row.revenue.toLocaleString()}</span>
              {row.orders && <span className={styles.subtext}>{row.orders} orders</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardTable;