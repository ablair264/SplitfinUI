import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import MetricCard from '../components/Dashboard/shared/MetricCard';
import CardChart from '../components/Dashboard/shared/CardChart';
import { ColorProvider } from '../components/Dashboard/shared/ColorProvider';
import FullGraph from '../components/Dashboard/shared/FullGraph';
import DataTable from '../components/Dashboard/shared/DataTable';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import CardTable from '../components/Dashboard/shared/CardTable';
import TableCard from '../components/Dashboard/shared/TableCard';
import MetricCardSquare from '../components/Dashboard/shared/MetricCardSquare';
import MetricIcon from '../components/Dashboard/shared/MetricIcon';
import '../components/Dashboard/shared/MetricCard.module.css';
import '../components/Dashboard/shared/CardChart.module.css';
import '../components/Dashboard/shared/FullGraph.module.css';
import '../components/Dashboard/shared/DataTable.module.css';
import '../components/Dashboard/shared/CardTable.module.css';
import '../components/Dashboard/shared/MetricCardSquare.module.css';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // State for interactive demo components
  const [selectedColor, setSelectedColor] = useState<'primary' | 'secondary' | 'tertiary' | 'fourth' | 'fifth' | 'sixth' | 'seventh' | 'eighth' | 'ninth' | 'tenth' | 'eleventh' | 'multicolored'>('primary');
  const [metricVariants, setMetricVariants] = useState({
    revenue: 'variant1' as 'variant1' | 'variant2' | 'variant3',
    orders: 'variant2' as 'variant1' | 'variant2' | 'variant3',
    customers: 'variant3' as 'variant1' | 'variant2' | 'variant3'
  });
  const [squareCardVariants, setSquareCardVariants] = useState({
    orders: 'variant1' as 'variant1' | 'variant2' | 'variant3',
    revenue: 'variant2' as 'variant1' | 'variant2' | 'variant3',
    customers: 'variant3' as 'variant1' | 'variant2' | 'variant3'
  });
  const [chartType, setChartType] = useState<'table' | 'bar' | 'horizontal-bars' | 'pie-with-legend'>('table');
  const [metricDisplayMode, setMetricDisplayMode] = useState<'full' | 'compact' | 'square' | 'all'>('all');
  const [showHoverTable, setShowHoverTable] = useState(true);
  
  // Color palette mapping
  const colorMap = {
    primary: '#79d5e9',
    secondary: '#799de9',
    tertiary: '#79e9c5',
    fourth: '#FF9F00',
    fifth: '#C96868',
    sixth: '#4daeac',
    seventh: '#61bc8e',
    eighth: '#fbbf24',
    ninth: '#dc2626',
    tenth: '#8b5cf6',
    eleventh: '#ec4899'
  };
  
  const getMetricCardColor = (index: number = 0) => {
    if (selectedColor === 'multicolored') {
      const colors = Object.values(colorMap);
      return colors[index % colors.length];
    }
    return colorMap[selectedColor] || colorMap.primary;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && !(e.target as HTMLElement).closest('.nav-menu') && 
          !(e.target as HTMLElement).closest('.nav-toggle')) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="landing-page">
      {/* Animated background layers from login - enhanced for landing page */}
      <div className="gradient-overlay"></div>
      <div className="floating-accent"></div>
      
      {/* Navigation */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/splitui.png" alt="Split UI" />
          </Link>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#components" className="nav-link" onClick={() => setIsMenuOpen(false)}>Components</a>
            <a href="#features" className="nav-link" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" className="nav-link" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <Link to="/documentation" className="nav-link" onClick={() => setIsMenuOpen(false)}>Documentation</Link>
            {isMobile && (
              <>
                <Link to="/login-demo" className="nav-button-mobile" onClick={() => setIsMenuOpen(false)}>
                  <MetricIcon name="eye" size={20} color="var(--accent-primary)" />
                  <span>Live Demo</span>
                </Link>
                <a href="#pricing" className="nav-button-mobile secondary" onClick={() => setIsMenuOpen(false)}>
                  <MetricIcon name="dollar-sign" size={20} color="var(--text-primary)" />
                  <span>View Pricing</span>
                </a>
              </>
            )}
          </div>
          
          <button 
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <MetricIcon name="zap" size={18} color="var(--accent-primary)" />
              <span className="badge-text">Premium React UI Kit</span>
            </div>
            
            <h1 className="hero-title">
              React Based Dashboard Components &
              <span className="title-gradient"> Template</span> with Customer Management Modules.
            </h1>
            
            <p className="hero-subtitle">
              SplitUI is a developer-friendly, ready-to-use Dashboard component collection 
              that's deployment time is as impressive as it's design.
            </p>
            
            <div className="hero-actions">
              {/* Navigation buttons styled like MetricCard compact variant */}
              <Link to="/login-demo" className="hero-button-compact">
                <div className="hero-button-icon">
                  <span style={{ fontSize: '20px', fontWeight: 700 }}>D</span>
                </div>
                <div className="hero-button-content">
                  <span className="hero-button-text">Live Demo</span>
                </div>
                <svg className="hero-button-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              
              <a href="#pricing" className="hero-button-compact">
                <div className="hero-button-icon">
                  <span style={{ fontSize: '20px', fontWeight: 700 }}>£</span>
                </div>
                <div className="hero-button-content">
                  <span className="hero-button-text">View Pricing</span>
                </div>
                <svg className="hero-button-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">100%</span>
                <span className="stat-label">TypeScript</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">Plug &</span>
                <span className="stat-label">Play</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">From £10</span>
                <span className="stat-label">Starting Price</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <img 
              src="/splitui.png" 
              alt="Split UI Logo" 
              className="hero-logo"
              style={{
                width: '100%',
                maxWidth: isMobile ? '300px' : '400px',
                height: 'auto',
                filter: 'brightness(1.1) drop-shadow(0 25px 50px rgba(121, 213, 233, 0.3))',
                animation: isMobile ? 'none' : 'gentleFloat 20s ease-in-out infinite'
              }}
            />
            <div className="dashboard-glow"></div>
          </div>
        </div>
      </section>

      {/* Components Section with new title */}
      <section id="components" className="components-preview-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Components built for <span className="title-gradient">real data and engagement</span>
              <span className="section-subtitle">Professional dashboard components that adapt to your design needs</span>
            </h2>
          </div>
          
          {/* Interactive Demo */}
          <div className="interactive-demo-section" style={{ marginBottom: '3rem' }}>
            {/* Color Selector and Display Mode Selector */}
            <div className="demo-controls" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? '1rem' : '2rem',
              marginBottom: '2rem',
              padding: isMobile ? '1rem' : '1.5rem',
              background: 'rgba(20, 28, 38, 0.95)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              flexWrap: 'wrap',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              {/* Color Theme Selector */}
              <div className="dark-theme-wrapper" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                width: isMobile ? '100%' : 'auto',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <span style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  marginBottom: isMobile ? '0.5rem' : '0'
                }}>COLOR THEME</span>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.25rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px',
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  justifyContent: 'center',
                  maxWidth: isMobile ? '100%' : 'none'
                }}>
                  {Object.entries(colorMap).map(([key, color]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedColor(key as any)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        backgroundColor: color,
                        border: selectedColor === key ? '2px solid white' : '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title={key}
                    />
                  ))}
                  <button
                    onClick={() => setSelectedColor('multicolored')}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #79d5e9 0%, #FF9F00 50%, #ec4899 100%)',
                      border: selectedColor === 'multicolored' ? '2px solid white' : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title="Multicolored"
                  />
                </div>
              </div>
              
              {/* Display Mode Selector */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                width: isMobile ? '100%' : 'auto',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <span style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  marginBottom: isMobile ? '0.5rem' : '0'
                }}>DISPLAY MODE</span>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.25rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px'
                }}>
                  {['Full', 'Compact', 'Square', 'All'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setMetricDisplayMode(mode.toLowerCase() as any)}
                      style={{
                        padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
                        borderRadius: '6px',
                        background: metricDisplayMode === mode.toLowerCase() ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        border: 'none',
                        color: metricDisplayMode === mode.toLowerCase() ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: isMobile ? '0.75rem' : '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Hover Table Toggle - Only show when Square mode is selected */}
              {metricDisplayMode === 'square' && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  width: isMobile ? '100%' : 'auto',
                  flexDirection: isMobile ? 'column' : 'row'
                }}>
                  <span style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.875rem', 
                    fontWeight: '500',
                    marginBottom: isMobile ? '0.5rem' : '0'
                  }}>HOVER TABLE</span>
                  <button
                    onClick={() => setShowHoverTable(!showHoverTable)}
                    style={{
                      position: 'relative',
                      width: '50px',
                      height: '26px',
                      borderRadius: '13px',
                      background: showHoverTable ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '3px',
                        left: showHoverTable ? '27px' : '3px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'white',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </button>
                </div>
              )}
            </div>
            
            {/* MetricCards Display based on selection */}
            <ColorProvider 
              barChartColors={selectedColor}
              graphColors={{
                primary: colorMap[selectedColor] || colorMap.primary,
                secondary: '#4daeac',
                tertiary: '#f77d11'
              }}
            >
              {/* Full Display Mode */}
              {(metricDisplayMode === 'full' || metricDisplayMode === 'all') && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: metricDisplayMode === 'all' ? '2rem' : '0'
                }}>
                  <MetricCard
                    id="demo-revenue"
                    title="Total Revenue"
                    value={10720}
                    subtitle="All channels combined"
                    trend={{ value: 14, isPositive: true }}
                    format="currency"
                    design={metricVariants.revenue}
                    onVariantChange={(variant) => setMetricVariants(prev => ({ ...prev, revenue: variant }))}
                    color={getMetricCardColor(0)}
                    cardIndex={0}
                  />
                  
                  <MetricCard
                    id="demo-orders"
                    title="Total Orders"
                    value={30}
                    subtitle="Processed orders"
                    trend={{ value: 9, isPositive: true }}
                    format="number"
                    design={metricVariants.orders}
                    onVariantChange={(variant) => setMetricVariants(prev => ({ ...prev, orders: variant }))}
                    color={getMetricCardColor(1)}
                    cardIndex={1}
                  />
                  
                  <MetricCard
                    id="demo-customers"
                    title="Active Customers"
                    value={28}
                    subtitle="Unique buyers"
                    trend={{ value: 5, isPositive: true }}
                    format="number"
                    design={metricVariants.customers}
                    onVariantChange={(variant) => setMetricVariants(prev => ({ ...prev, customers: variant }))}
                    color={getMetricCardColor(2)}
                    cardIndex={2}
                  />
                  
                  {metricDisplayMode === 'full' && (
                    <>
                      <MetricCard
                        id="demo-revenue-2"
                        title="Monthly Revenue"
                        value={45860}
                        subtitle="Current month performance"
                        trend={{ value: 12, isPositive: true }}
                        format="currency"
                        design="variant1"
                        color={getMetricCardColor(3)}
                        cardIndex={3}
                      />
                      
                      <MetricCard
                        id="demo-conversion"
                        title="Conversion Rate"
                        value={4.8}
                        subtitle="Visitor to customer"
                        trend={{ value: 8, isPositive: true }}
                        format="percentage"
                        design="variant2"
                        color={getMetricCardColor(4)}
                        cardIndex={4}
                      />
                      
                      <MetricCard
                        id="demo-sessions"
                        title="Active Sessions"
                        value={1247}
                        subtitle="Current users online"
                        trend={{ value: 15, isPositive: true }}
                        format="number"
                        design="variant3"
                        color={getMetricCardColor(5)}
                        cardIndex={5}
                      />
                    </>
                  )}
                </div>
              )}
              
              {/* Compact Display Mode */}
              {(metricDisplayMode === 'compact' || metricDisplayMode === 'all') && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1rem',
                  marginBottom: metricDisplayMode === 'all' ? '2rem' : '0'
                }}>
                  <MetricCard
                    id="demo-compact-sales"
                    title="Sales Growth"
                    value={23.5}
                    trend={{ value: 8, isPositive: true }}
                    format="percentage"
                    displayMode="compact"
                    icon={<MetricIcon name="trending-up" size={24} color={getMetricCardColor(0)} />}
                    color={getMetricCardColor(0)}
                    cardIndex={0}
                  />
                  
                  <MetricCard
                    id="demo-compact-conversion"
                    title="Conversion Rate"
                    value={4.8}
                    trend={{ value: 12, isPositive: true }}
                    format="percentage"
                    displayMode="compact"
                    icon={<MetricIcon name="bar-chart" size={24} color={getMetricCardColor(1)} />}
                    color={getMetricCardColor(1)}
                    cardIndex={1}
                  />
                  
                  <MetricCard
                    id="demo-compact-aov"
                    title="Average Order Value"
                    value={357}
                    trend={{ value: 3, isPositive: false }}
                    format="currency"
                    displayMode="compact"
                    icon={<MetricIcon name="shopping-cart" size={24} color={getMetricCardColor(2)} />}
                    color={getMetricCardColor(2)}
                    cardIndex={2}
                  />
                  
                  {metricDisplayMode === 'compact' && (
                    <>
                      <MetricCard
                        id="demo-compact-retention"
                        title="Customer Retention"
                        value={78.5}
                        trend={{ value: 5, isPositive: true }}
                        format="percentage"
                        displayMode="compact"
                        icon={<MetricIcon name="users" size={24} color={getMetricCardColor(3)} />}
                        color={getMetricCardColor(3)}
                        cardIndex={3}
                      />
                      
                      <MetricCard
                        id="demo-compact-bounce"
                        title="Bounce Rate"
                        value={32.4}
                        trend={{ value: 7, isPositive: false }}
                        format="percentage"
                        displayMode="compact"
                        icon={<MetricIcon name="activity" size={24} color={getMetricCardColor(4)} />}
                        color={getMetricCardColor(4)}
                        cardIndex={4}
                      />
                      
                      <MetricCard
                        id="demo-compact-pageviews"
                        title="Page Views"
                        value={18420}
                        trend={{ value: 22, isPositive: true }}
                        format="number"
                        displayMode="compact"
                        icon={<MetricIcon name="eye" size={24} color={getMetricCardColor(5)} />}
                        color={getMetricCardColor(5)}
                        cardIndex={5}
                      />
                    </>
                  )}
                </div>
              )}
              
              {/* Square Display Mode */}
              {(metricDisplayMode === 'square' || metricDisplayMode === 'all') && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                  gap: isMobile ? '0.75rem' : '1rem',
                  marginBottom: '3rem',
                  overflowX: 'auto',
                  paddingBottom: isMobile ? '0.5rem' : '0'
                }}>
                  <MetricCardSquare
                    id="demo-square-revenue"
                    title="Revenue"
                    value={45860}
                    trend={{ value: 14, isPositive: true }}
                    format="currency"
                    design={squareCardVariants.revenue}
                    onVariantChange={(variant) => setSquareCardVariants(prev => ({ ...prev, revenue: variant }))}
                    color={getMetricCardColor(0)}
                    cardIndex={0}
                  />
                  
                  <MetricCardSquare
                    id="demo-square-orders"
                    title="Orders"
                    value={1247}
                    trend={{ value: 5, isPositive: true }}
                    format="number"
                    design={squareCardVariants.orders}
                    color={getMetricCardColor(1)}
                    cardIndex={1}
                    showHoverTable={showHoverTable}
                  />
                  
                  <MetricCardSquare
                    id="demo-square-customers"
                    title="Customers"
                    value={892}
                    trend={{ value: 8, isPositive: true }}
                    format="number"
                    design={squareCardVariants.customers}
                    color={getMetricCardColor(2)}
                    cardIndex={2}
                    showHoverTable={showHoverTable}
                  />
                  
                  <MetricCardSquare
                    id="demo-square-aov"
                    title="Avg Order"
                    value={36.78}
                    trend={{ value: 3, isPositive: false }}
                    format="currency"
                    design="variant1"
                    color={getMetricCardColor(3)}
                    cardIndex={3}
                    showHoverTable={showHoverTable}
                  />
                </div>
              )}
            </ColorProvider>
            
            {/* Feature Boxes */}
            <div className="features-grid features-4-col" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
              <div className="feature-box">
                <div className="feature-box-icon">
                  <MetricIcon name="trending-up" size={24} color="#79d5e9" />
                </div>
                <h3>Real-time updates</h3>
                <p>Live data visualization with smooth animations and automatic refresh intervals</p>
              </div>
              
              <div className="feature-box">
                <div className="feature-box-icon">
                  <MetricIcon name="bar-chart" size={24} color="#799de9" />
                </div>
                <h3>Multiple chart types</h3>
                <p>Area, line, and bar charts with variant selectors for different visualization styles</p>
              </div>
              
              <div className="feature-box">
                <div className="feature-box-icon">
                  <MetricIcon name="settings" size={24} color="#79e9c5" />
                </div>
                <h3>Fully customizable</h3>
                <p>Change colors, formats, and layouts to match your brand perfectly</p>
              </div>
              
              <div className="feature-box">
                <div className="feature-box-icon">
                  <MetricIcon name="users" size={24} color="#FF9F00" />
                </div>
                <h3>Responsive design</h3>
                <p>Optimized for all screen sizes with intelligent layout adjustments</p>
              </div>
            </div>
            
            {/* Chart Demo Section with CardChart */}
            <div style={{ marginTop: '3rem' }}>
              <div className="section-header" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Interactive Chart Components</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Powerful visualization tools with multiple display options</p>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: isMobile ? '0.5rem' : '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '0.25rem' : '0.5rem',
                  padding: isMobile ? '0.25rem' : '0.5rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: 'center'
                }}>
                  <button
                    onClick={() => setChartType('table')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      background: chartType === 'table' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      border: 'none',
                      color: chartType === 'table' ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      background: chartType === 'bar' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      border: 'none',
                      color: chartType === 'bar' ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Bar Vertical
                  </button>
                  <button
                    onClick={() => setChartType('horizontal-bars')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      background: chartType === 'horizontal-bars' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      border: 'none',
                      color: chartType === 'horizontal-bars' ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Bar Horizontal
                  </button>
                  <button
                    onClick={() => setChartType('pie-with-legend')}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      background: chartType === 'pie-with-legend' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      border: 'none',
                      color: chartType === 'pie-with-legend' ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Pie Chart
                  </button>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '1.5rem',
                maxWidth: '900px',
                margin: '0 auto',
                padding: isMobile ? '0 1rem' : '0'
              }}>
                {chartType === 'table' ? (
                  <div style={{
                    background: 'rgba(20, 28, 38, 0.95)',
                    borderRadius: '12px',
                    padding: isMobile ? '1rem' : '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}>
                    <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Sales Team Performance</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Top 5 agents by revenue</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '0.75rem 0', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>#</th>
                          <th style={{ padding: '0.75rem 0', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>AGENT</th>
                          <th style={{ padding: '0.75rem 0', textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>REVENUE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Emma Williams', revenue: 45697 },
                          { name: 'Lisa Thompson', revenue: 41254 },
                          { name: 'David Kim', revenue: 39853 },
                          { name: 'Tom Anderson', revenue: 35963 },
                          { name: 'Rachel Green', revenue: 34151 }
                        ].map((agent, index) => (
                          <tr key={index} style={{ borderBottom: index < 4 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>
                            <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{index + 1}</td>
                            <td style={{ padding: '1rem 0', fontSize: '0.875rem' }}>{agent.name}</td>
                            <td style={{ padding: '1rem 0', textAlign: 'right', fontSize: '0.875rem', fontWeight: '500', color: getMetricCardColor(index) }}>
                              £{agent.revenue.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <ColorProvider 
                    barChartColors={selectedColor}
                    graphColors={{
                      primary: colorMap[selectedColor] || colorMap.primary,
                      secondary: '#4daeac',
                      tertiary: '#f77d11'
                    }}
                  >
                    <CardChart
                      id="demo-chart"
                      title="Sales Team Performance"
                      subtitle="Top 5 agents by revenue"
                      data={[
                        { name: 'Emma Williams', value: 45697 },
                        { name: 'Lisa Thompson', value: 41254 },
                        { name: 'David Kim', value: 39853 },
                        { name: 'Tom Anderson', value: 35963 },
                        { name: 'Rachel Green', value: 34151 }
                      ]}
                      type={chartType === 'horizontal-bars' ? 'bar' : chartType === 'pie-with-legend' ? 'pie' : 'bar'}
                      dataKey="value"
                      colors={selectedColor === 'multicolored' ? Object.values(colorMap) : [getMetricCardColor(0)]}
                      design={chartType === 'bar' ? 'default' : (chartType as 'horizontal-bars' | 'pie-with-legend')}
                      height={280}
                      showLegend={chartType === 'pie-with-legend'}
                    />
                  </ColorProvider>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Components Section */}
      <section className="other-components-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Other Components
              <span className="section-subtitle">Advanced data visualization and management tools</span>
            </h2>
          </div>
          
          {/* Feature boxes for other components */}
          <div className="features-grid features-4-col" style={{ marginBottom: '3rem' }}>
            <div className="feature-box">
              <div className="feature-box-icon">
                <MetricIcon name="activity" size={24} color="#79d5e9" />
              </div>
              <h3>Advanced Charts</h3>
              <p>Line, area, bar, and composed charts with brush tools for data range selection</p>
            </div>
            
            <div className="feature-box">
              <div className="feature-box-icon">
                <MetricIcon name="bar-chart" size={24} color="#799de9" />
              </div>
              <h3>Data Tables</h3>
              <p>Sortable, searchable tables with pagination and bulk actions</p>
            </div>
            
            <div className="feature-box">
              <div className="feature-box-icon">
                <MetricIcon name="package" size={24} color="#79e9c5" />
              </div>
              <h3>Card Tables</h3>
              <p>Compact tables designed for dashboard cards with automatic truncation</p>
            </div>
            
            <div className="feature-box">
              <div className="feature-box-icon">
                <MetricIcon name="area-chart" size={24} color="#FF9F00" />
              </div>
              <h3>Export Ready</h3>
              <p>Export to PNG, SVG, CSV, and Excel with built-in functionality</p>
            </div>
          </div>
          
          {/* Components Display */}
          <div className="component-showcase">
            {/* FullGraph Component */}
            <div className="showcase-item" style={{ marginBottom: '4rem' }}>
              <ColorProvider 
                barChartColors={selectedColor}
                graphColors={{
                  primary: colorMap[selectedColor] || colorMap.primary,
                  secondary: '#4daeac',
                  tertiary: '#f77d11'
                }}
              >
                <FullGraph
                  id="demo-fullgraph"
                  title="Revenue & Order Trends"
                  subtitle="Track your business performance over time"
                  data={[
                    { date: '2025-01-01', revenue: 12000, orders: 45 },
                    { date: '2025-01-02', revenue: 15000, orders: 52 },
                    { date: '2025-01-03', revenue: 13500, orders: 48 },
                    { date: '2025-01-04', revenue: 16800, orders: 61 },
                    { date: '2025-01-05', revenue: 14200, orders: 55 },
                    { date: '2025-01-06', revenue: 17500, orders: 68 },
                    { date: '2025-01-07', revenue: 19200, orders: 72 }
                  ]}
                  type="composed"
                  lines={[
                    { dataKey: 'revenue', color: getMetricCardColor(0), name: 'Revenue', type: 'area' },
                    { dataKey: 'orders', color: getMetricCardColor(1), name: 'Orders', type: 'line' }
                  ]}
                  showBrush={true}
                  showGrid={true}
                  showLegend={true}
                  height={350}
                />
              </ColorProvider>
            </div>
            
            {/* DataTable Component */}
            <div className="showcase-item" style={{ marginBottom: '4rem' }}>
              <div style={{
                background: 'rgba(20, 28, 38, 0.95)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}>
                <DataTable
                  columns={[
                    { key: 'name', header: 'Product Name', width: '30%' },
                    { key: 'category', header: 'Category', width: '20%' },
                    { 
                      key: 'price', 
                      header: 'Price', 
                      width: '15%',
                      render: (item: any) => `£${item.price.toFixed(2)}`,
                      className: 'text-right'
                    },
                    { 
                      key: 'stock', 
                      header: 'Stock', 
                      width: '15%',
                      className: 'text-right'
                    },
                    { 
                      key: 'status', 
                      header: 'Status', 
                      width: '20%',
                      render: (item: any) => {
                        const statusClass = 
                          item.status === 'In Stock' ? 'statusActive' :
                          item.status === 'Low Stock' ? 'statusPending' :
                          item.status === 'Out of Stock' ? 'statusInactive' :
                          'statusDefault';
                        return (
                          <span className={`statusBadge ${statusClass}`} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            ...(item.status === 'In Stock' ? {
                              background: '#d1fae5',
                              color: '#065f46'
                            } : item.status === 'Low Stock' ? {
                              background: '#fef3c7',
                              color: '#92400e'
                            } : item.status === 'Out of Stock' ? {
                              background: '#fee2e2',
                              color: '#991b1b'
                            } : {})
                          }}>
                            {item.status}
                          </span>
                        );
                      }
                    }
                  ]}
                  data={[
                    { id: '1', name: 'Premium Dashboard Kit', category: 'UI Components', price: 129.99, stock: 15, status: 'In Stock' },
                    { id: '2', name: 'Analytics Module Pro', category: 'Analytics', price: 89.99, stock: 23, status: 'In Stock' },
                    { id: '3', name: 'Customer Manager', category: 'CRM', price: 149.99, stock: 8, status: 'Low Stock' },
                    { id: '4', name: 'Chart Builder Pro', category: 'Visualization', price: 79.99, stock: 0, status: 'Out of Stock' },
                    { id: '5', name: 'Report Generator', category: 'Reporting', price: 99.99, stock: 12, status: 'In Stock' }
                  ]}
                  keyExtractor={(item) => item.id}
                  onRowClick={(row) => console.log('Row clicked:', row)}
                />
              </div>
            </div>
            
            {/* CardTable Component */}
            <div className="showcase-item" style={{ marginBottom: '4rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '1.5rem'
              }}>
                <CardTable
                  id="top-customers"
                  title="Top Customers"
                  subtitle="By total purchase value"
                  columns={[
                    { key: 'name', label: 'Customer', width: '50%' },
                    { key: 'orders', label: 'Orders', align: 'center' },
                    { key: 'value', label: 'Total', align: 'right', format: (value) => `£${value.toLocaleString()}` }
                  ]}
                  data={[
                    { name: 'Acme Corporation', orders: 45, value: 125430 },
                    { name: 'TechStart Inc', orders: 38, value: 98750 },
                    { name: 'Global Ventures', orders: 52, value: 87320 },
                    { name: 'Innovation Labs', orders: 31, value: 76890 },
                    { name: 'Digital Solutions', orders: 29, value: 65420 }
                  ]}
                  maxRows={5}
                  showIndex={true}
                  highlightRows={true}
                  onViewAll={() => console.log('View all customers')}
                />
                
                <CardTable
                  id="recent-activities"
                  title="Recent Activities"
                  subtitle="Latest system events"
                  columns={[
                    { key: 'action', label: 'Action', width: '60%' },
                    { key: 'user', label: 'User' },
                    { key: 'time', label: 'Time', align: 'right' }
                  ]}
                  data={[
                    { action: 'New order placed', user: 'John D.', time: '2 min ago' },
                    { action: 'Customer registered', user: 'System', time: '5 min ago' },
                    { action: 'Payment received', user: 'Sarah M.', time: '12 min ago' },
                    { action: 'Product updated', user: 'Admin', time: '1 hour ago' },
                    { action: 'Report generated', user: 'System', time: '2 hours ago' }
                  ]}
                  maxRows={5}
                  onRowClick={(row) => console.log('Activity clicked:', row)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Updated */}
      <section id="pricing" className="pricing-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Complete UI Kit Package
              <span className="section-subtitle">Everything you need to build professional dashboards</span>
            </h2>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div className="pricing-card featured" style={{ maxWidth: '800px', width: '100%' }}>
              <div className="featured-glow"></div>
              <h3 className="price-title">All Components</h3>
              <div className="price-amount">
                <span className="currency">£</span>
                <span className="amount">20</span>
              </div>
              <p className="price-description">Complete React UI kit with all components, templates, and features</p>
              
              <ul className="price-features" style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                gap: '1rem',
                alignItems: 'start'
              }}>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Metric Card (Full, Compact & Square)
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Card Chart
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Table Card & Data Table
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dashboard Template
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Customer Management Module
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Login Page
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Full Comprehensive Documentation
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lifetime Updates
                </li>
                <li>
                  <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Commercial License
                </li>
              </ul>
              
              <button className="price-button featured">
                Get Complete Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Build Amazing Dashboards?</h2>
            <p>Join hundreds of developers using Split UI</p>
            <div className="cta-actions">
              <Link to="/login-demo" className="cta-button primary large">
                Try Live Demo
              </Link>
              <a href="#pricing" className="cta-button secondary large">
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/splitui.png" alt="Split UI" className="footer-logo" />
            <p>Professional React UI Kit for Analytics Dashboards</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#components">Components</a>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <Link to="/login-demo">Live Demo</Link>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <Link to="/documentation">Documentation</Link>
              <a href="#">Support Center</a>
              <a href="#">License</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Split UI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;