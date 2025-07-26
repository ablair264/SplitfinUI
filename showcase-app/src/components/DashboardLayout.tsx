'use client';

import React from 'react';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar Navigation */}
      <aside className={styles.dashboardSidebar}>
        <div className={styles.sidebarHeader}>
          <a href="/" className={styles.sidebarBrand}>
            <div className={styles.brandLogo}>S</div>
            <span className={styles.brandName}>Splitfin</span>
          </a>
        </div>

        <div className={styles.sidebarUser}>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>M</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Matt Langford</div>
              <div className={styles.userRole}>Brand Manager</div>
            </div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Dashboard</div>
            <a href="#overview" className={`${styles.navItem} ${styles.active}`}>
              <svg className={styles.navIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Overview
            </a>
            <a href="#orders" className={styles.navItem}>
              <svg className={styles.navIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 012-2h1a2 2 0 112 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h.01a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h.01a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h.01a1 1 0 110 2H8a1 1 0 01-1-1zm3-6a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm0 3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm0 3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Orders
            </a>
            <a href="#revenue" className={styles.navItem}>
              <svg className={styles.navIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Revenue
            </a>
          </div>
        </nav>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button className={styles.quickActionBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            View Live Demo
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.dashboardMain}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;