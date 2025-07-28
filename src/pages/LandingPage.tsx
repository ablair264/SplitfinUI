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

  return (
    <div className="landing-page">
      {/* Animated background layers from login */}
      <div className="animated-bg-layer"></div>
      <div className="gradient-overlay"></div>
      <div className="mesh-pattern"></div>
      <div className="floating-accent"></div>
      <div className="floating-accent secondary"></div>
      
      {/* Navigation */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/splitui.png" alt="Split UI" />
          </Link>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#components" className="nav-link">Components</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="/documentation" className="nav-link" target="_blank">Documentation</a>
            <Link to="/demo" className="nav-link demo-link">Live Demo</Link>
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
            
            <h1 className="hero-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              React Based Dashboard Components &
              <span className="title-gradient"> Template</span> with Customer Management Modules.
            </h1>
            
            <p className="hero-subtitle">
              SplitUI is a developer-friendly, ready-to-use Dashboard component collection 
              that's deployment time is as impressive as it's design.
            </p>
            
            <div className="hero-actions">
              <Link to="/demo" className="cta-button primary">
                <span>Explore Live Demo</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a href="#pricing" className="cta-button secondary">
                <span>View Pricing</span>
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
                <span className="stat-value">From £29</span>
                <span className="stat-label">Starting Price</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <img 
              src="/dashboard.png" 
              alt="Split UI Dashboard Preview" 
              className="dashboard-image"
              style={{
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
              }}
            />
            <div className="dashboard-glow"></div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="components" className="components-preview-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Another Dashboard.. <span className="title-gradient">with style</span>
              <span className="section-subtitle">Allow users to pick a different colour, every day of the week</span>
            </h2>
          </div>
          
          {/* Interactive Demo */}
          <div className="interactive-demo-section" style={{ marginBottom: '3rem' }}>
            {/* Color Selector */}
            <div className="demo-controls" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'rgba(20, 28, 38, 0.95)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="dark-theme-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>COLOR THEME</span>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.25rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px'
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
            </div>
            
            {/* MetricCards Demo - Full Display */}
            <ColorProvider 
              barChartColors={selectedColor}
              graphColors={{
                primary: colorMap[selectedColor] || colorMap.primary,
                secondary: '#4daeac',
                tertiary: '#f77d11'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
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
              </div>
              
              {/* MetricCards Demo - Compact Display */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <MetricCard
                  id="demo-compact-sales"
                  title="Sales Growth"
                  value={23.5}
                  trend={{ value: 8, isPositive: true }}
                  format="percentage"
                  displayMode="compact"
                  icon={<MetricIcon name="trending-up" size={24} color={getMetricCardColor(3)} />}
                  color={getMetricCardColor(3)}
                  cardIndex={3}
                />
                
                <MetricCard
                  id="demo-compact-conversion"
                  title="Conversion Rate"
                  value={4.8}
                  trend={{ value: 12, isPositive: true }}
                  format="percentage"
                  displayMode="compact"
                  icon={<MetricIcon name="bar-chart" size={24} color={getMetricCardColor(4)} />}
                  color={getMetricCardColor(4)}
                  cardIndex={4}
                />
                
                <MetricCard
                  id="demo-compact-aov"
                  title="Average Order Value"
                  value={357}
                  trend={{ value: 3, isPositive: false }}
                  format="currency"
                  displayMode="compact"
                  icon={<MetricIcon name="shopping-cart" size={24} color={getMetricCardColor(5)} />}
                  color={getMetricCardColor(5)}
                  cardIndex={5}
                />
              </div>
              
              {/* MetricCardSquare Demo - 5 in a row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '3rem',
                overflowX: 'auto'
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
                  onVariantChange={(variant) => setSquareCardVariants(prev => ({ ...prev, orders: variant }))}
                  color={getMetricCardColor(1)}
                  cardIndex={1}
                />
                
                <MetricCardSquare
                  id="demo-square-customers"
                  title="Customers"
                  value={892}
                  trend={{ value: 8, isPositive: true }}
                  format="number"
                  design={squareCardVariants.customers}
                  onVariantChange={(variant) => setSquareCardVariants(prev => ({ ...prev, customers: variant }))}
                  color={getMetricCardColor(2)}
                  cardIndex={2}
                />

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

                </div>
              </ColorProvider>
              
              {/* Chart Demo Section - Simplified */}
              <div style={{ 
                marginTop: '3rem', 
                marginBottom: '3rem', 
                textAlign: 'center', 
                padding: '2rem',
                background: 'rgba(20, 28, 38, 0.5)',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Interactive Chart Components</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Powerful chart components with multiple visualization options</p>
              </div>
            
            {/* FullGraph Component */}
            <div className="showcase-item" style={{ marginBottom: '4rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>FullGraph Component</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Advanced charting component for comprehensive data visualization</p>
                <div className="component-features" style={{ marginBottom: '2rem' }}>
                  <span className="feature-item">• Multiple chart types (line, area, bar, composed)</span>
                  <span className="feature-item">• Brush tool for data range selection</span>
                  <span className="feature-item">• Synchronized tooltips across data series</span>
                  <span className="feature-item">• Customizable grid and axis</span>
                  <span className="feature-item">• Export to PNG/SVG functionality</span>
                  <span className="feature-item">• Responsive with auto-resize</span>
                </div>
              </div>
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
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>DataTable Component</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Feature-rich table component with advanced functionality</p>
                <div className="component-features" style={{ marginBottom: '2rem' }}>
                  <span className="feature-item">• Sortable columns with multi-sort support</span>
                  <span className="feature-item">• Built-in search and filtering</span>
                  <span className="feature-item">• Pagination with customizable page sizes</span>
                  <span className="feature-item">• Row selection with bulk actions</span>
                  <span className="feature-item">• Column resizing and reordering</span>
                  <span className="feature-item">• Export to CSV/Excel</span>
                  <span className="feature-item">• Mobile responsive design</span>
                </div>
              </div>
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
           
           {/* DataTable with Order Status Badges */}
           <div className="showcase-item" style={{ marginBottom: '4rem' }}>
             <div style={{ marginBottom: '2rem' }}>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Order Status Badges</h3>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>DataTable with styled status badges for order tracking</p>
             </div>
             <div style={{
               background: 'rgba(20, 28, 38, 0.95)',
               borderRadius: '12px',
               padding: '1.5rem',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
             }}>
               <DataTable
                 columns={[
                   { key: 'orderId', header: 'Order ID', width: '15%' },
                   { key: 'customer', header: 'Customer', width: '25%' },
                   { key: 'date', header: 'Date', width: '20%' },
                   { 
                     key: 'total', 
                     header: 'Total', 
                     width: '15%',
                     render: (item: any) => `£${item.total.toFixed(2)}`,
                     className: 'text-right'
                   },
                   { 
                     key: 'status', 
                     header: 'Status', 
                     width: '25%',
                     render: (item: any) => {
                       const statusMap: { [key: string]: string } = {
                         'Partially shipped': 'statusPartiallyShipped',
                         'Confirmed': 'statusConfirmed',
                         'Fulfilled': 'statusFulfilled',
                         'Processing': 'statusProcessing',
                         'Shipped': 'statusShipped',
                         'Cancelled': 'statusCancelled'
                       };
                       const statusClass = statusMap[item.status] || 'statusDefault';
                       return (
                         <span className={`statusBadge ${statusClass}`}>
                           {item.status}
                         </span>
                       );
                     }
                   }
                 ]}
                 data={[
                   { id: '1', orderId: '#ORD-2025-001', customer: 'John Smith', date: '2025-01-28', total: 299.99, status: 'Partially shipped' },
                   { id: '2', orderId: '#ORD-2025-002', customer: 'Emma Johnson', date: '2025-01-28', total: 149.50, status: 'Confirmed' },
                   { id: '3', orderId: '#ORD-2025-003', customer: 'Michael Brown', date: '2025-01-27', total: 89.99, status: 'Partially shipped' },
                   { id: '4', orderId: '#ORD-2025-004', customer: 'Sarah Davis', date: '2025-01-27', total: 199.00, status: 'Partially shipped' },
                   { id: '5', orderId: '#ORD-2025-005', customer: 'David Wilson', date: '2025-01-26', total: 349.99, status: 'Confirmed' },
                   { id: '6', orderId: '#ORD-2025-006', customer: 'Lisa Anderson', date: '2025-01-26', total: 124.50, status: 'Partially shipped' },
                   { id: '7', orderId: '#ORD-2025-007', customer: 'James Taylor', date: '2025-01-25', total: 275.00, status: 'Fulfilled' },
                   { id: '8', orderId: '#ORD-2025-008', customer: 'Patricia Martinez', date: '2025-01-25', total: 99.99, status: 'Confirmed' },
                   { id: '9', orderId: '#ORD-2025-009', customer: 'Robert Garcia', date: '2025-01-24', total: 189.50, status: 'Partially shipped' },
                   { id: '10', orderId: '#ORD-2025-010', customer: 'Jennifer Lopez', date: '2025-01-24', total: 425.00, status: 'Partially shipped' }
                 ]}
                 keyExtractor={(item) => item.id}
                 onRowClick={(row) => console.log('Order clicked:', row)}
               />
             </div>
           </div>
           
           {/* Breadcrumb Component */}
           <div className="showcase-item" style={{ marginBottom: '4rem' }}>
             <div style={{ marginBottom: '2rem' }}>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Breadcrumb Component</h3>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Hierarchical navigation component with automatic path generation</p>
               <div className="component-features" style={{ marginBottom: '2rem' }}>
                 <span className="feature-item">• Auto-generates from React Router paths</span>
                 <span className="feature-item">• Customizable separators and icons</span>
                 <span className="feature-item">• Truncation for long paths</span>
                 <span className="feature-item">• Mobile-responsive collapsing</span>
                 <span className="feature-item">• Custom path name mapping</span>
                 <span className="feature-item">• Accessible navigation structure</span>
               </div>
             </div>
             <div style={{ 
               background: 'rgba(20, 28, 38, 0.95)', 
               padding: '1.5rem', 
               borderRadius: '12px',
               border: '1px solid rgba(255, 255, 255, 0.1)',
               boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
             }}>
               <Breadcrumb
                 title="Analytics"
                 items={[
                   { label: 'Analytics' },
                   { label: 'Revenue Report' }
                 ]}
               />
               <div style={{ marginTop: '1rem' }}>
                 <Breadcrumb
                   title="Products"
                   items={[
                     { label: 'Products' },
                     { label: 'Categories' },
                     { label: 'Electronics' }
                   ]}
                 />
               </div>
             </div>
           </div>

           {/* TableCard Component */}
           <div className="showcase-item" style={{ marginBottom: '4rem' }}>
             <div style={{ marginBottom: '2rem' }}>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>TableCard Component</h3>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Simplified table card for ranking displays</p>
               <div className="component-features" style={{ marginBottom: '2rem' }}>
                 <span className="feature-item">• Automatic ranking numbers</span>
                 <span className="feature-item">• Clean minimal design</span>
                 <span className="feature-item">• Value color customization</span>
                 <span className="feature-item">• Subtext support</span>
                 <span className="feature-item">• Perfect for leaderboards</span>
                 <span className="feature-item">• Mobile optimized</span>
               </div>
             </div>
             <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
               gap: '1.5rem'
             }}>
               <div style={{
                 background: 'rgba(20, 28, 38, 0.95)',
                 borderRadius: '12px',
                 padding: '1.5rem',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                 backdropFilter: 'blur(10px)'
               }}>
                 <TableCard
                   id="top-agents"
                   title="Top Sales Agents"
                   subtitle="By revenue this month"
                   data={[
                     { name: 'Emma Williams', value: '£46,820', subtext: '142 deals closed' },
                     { name: 'Michael Chen', value: '£41,350', subtext: '128 deals closed' },
                     { name: 'Sarah Johnson', value: '£39,720', subtext: '119 deals closed' },
                     { name: 'David Kim', value: '£36,890', subtext: '108 deals closed' },
                     { name: 'Lisa Anderson', value: '£34,560', subtext: '97 deals closed' }
                   ]}
                   columns={[
                     { key: 'name', label: 'Agent' },
                     { key: 'value', label: 'Revenue', align: 'right' }
                   ]}
                   maxRows={5}
                 />
               </div>
               
               <div style={{
                 background: 'rgba(20, 28, 38, 0.95)',
                 borderRadius: '12px',
                 padding: '1.5rem',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                 backdropFilter: 'blur(10px)'
               }}>
                 <TableCard
                   id="popular-products"
                   title="Popular Products"
                   subtitle="Most sold items"
                   data={[
                     { name: 'Dashboard Pro License', value: '247 sales' },
                     { name: 'Analytics Add-on', value: '189 sales' },
                     { name: 'Customer Module', value: '156 sales' },
                     { name: 'Report Builder', value: '134 sales' },
                     { name: 'API Access', value: '98 sales' }
                   ]}
                   columns={[
                     { key: 'name', label: 'Product' },
                     { key: 'value', label: 'Sales', align: 'right' }
                   ]}
                   maxRows={5}
                 />
               </div>
             </div>
           </div>
           
           {/* CardTable Component */}
           <div className="showcase-item" style={{ marginBottom: '4rem' }}>
             <div style={{ marginBottom: '2rem' }}>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>CardTable Component</h3>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Compact table component designed for card layouts</p>
               <div className="component-features" style={{ marginBottom: '2rem' }}>
                 <span className="feature-item">• Optimized for dashboard cards</span>
                 <span className="feature-item">• Automatic row truncation with "View All"</span>
                 <span className="feature-item">• Custom column formatting</span>
                 <span className="feature-item">• Row highlighting on hover</span>
                 <span className="feature-item">• Index column support</span>
                 <span className="feature-item">• Responsive column widths</span>
                 <span className="feature-item">• Click handlers for rows</span>
               </div>
             </div>
             <div style={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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

     {/* Features Section */}
     <section id="features" className="features-section">
       <div className="section-container">
         <div className="section-header">
           <h2 className="section-title">
             Why Choose Split UI?
             <span className="section-subtitle">Built for developers who value quality</span>
           </h2>
         </div>
         
         <div className="features-layout">
           <div className="features-left">
             <div className="feature-item">
               <div className="feature-icon-wrapper">
                 <span className="feature-icon">🚀</span>
               </div>
               <div className="feature-content">
                 <h3>Production Ready</h3>
                 <p>Battle-tested components used in real applications with thousands of users</p>
               </div>
             </div>
             
             <div className="feature-item">
               <div className="feature-icon-wrapper">
                 <span className="feature-icon">🎯</span>
               </div>
               <div className="feature-content">
                 <h3>TypeScript First</h3>
                 <p>Full type safety with comprehensive TypeScript definitions for every component</p>
               </div>
             </div>
             
             <div className="feature-item">
               <div className="feature-icon-wrapper">
                 <span className="feature-icon">📱</span>
               </div>
               <div className="feature-content">
                 <h3>Responsive Design</h3>
                 <p>Mobile-first approach ensures perfect display across all devices</p>
               </div>
             </div>
           </div>
           
           <div className="features-right">
             <div className="feature-item">
               <div className="feature-icon-wrapper">
                 <span className="feature-icon">⚡</span>
               </div>
               <div className="feature-content">
                 <h3>Lightning Fast</h3>
                 <p>Optimized performance with zero external dependencies</p>
               </div>
             </div>
             
             <div className="feature-item">
               <div className="feature-icon-wrapper">
                 <span className="feature-icon">🎨</span>
               </div>
               <div className="feature-content">
                 <h3>Customizable</h3>
                 <p>Easily adapt colors, sizes, and styles to match your brand</p>
               </div>
             </div>
             
             <div className="feature-item">
               <div className="feature-icon-wrapper">
                 <span className="feature-icon">📚</span>
               </div>
               <div className="feature-content">
                 <h3>Well Documented</h3>
                 <p>Comprehensive docs with examples and best practices</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>

     {/* Pricing Section */}
     <section id="pricing" className="pricing-section">
       <div className="section-container">
         <div className="section-header">
           <h2 className="section-title">
             Simple, Transparent Pricing
             <span className="section-subtitle">Choose the package that fits your needs</span>
           </h2>
         </div>
         
         <div className="pricing-cards">
           <div className="pricing-card">
             <div className="price-badge">STARTER</div>
             <h3 className="price-title">Compact Package</h3>
             <div className="price-amount">
               <span className="currency">£</span>
               <span className="amount">19</span>
             </div>
             <p className="price-description">Perfect for small projects and MVPs</p>
             
             <ul className="price-features">
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Login Component
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Dashboard Overview
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Core Components (5+)
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Basic Documentation
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 6 Months Updates
               </li>
             </ul>
             
             <button className="price-button">
               Get Starter Package
             </button>
           </div>
           
           <div className="pricing-card featured">
             <div className="price-badge featured">POPULAR</div>
             <div className="featured-glow"></div>
             <h3 className="price-title">Full Package</h3>
             <div className="price-amount">
               <span className="currency">£</span>
               <span className="amount">39</span>
             </div>
             <p className="price-description">Everything you need for production apps</p>
             
             <ul className="price-features">
               <li className="highlight">
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Everything in Starter
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 All Components (25+)
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Customer Management
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Google Maps Integration
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Full Documentation
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 1 Year Updates
               </li>
               <li>
                 <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
                 Priority Support
               </li>
             </ul>
             
             <button className="price-button featured">
               Get Full Package
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
             <Link to="/demo" className="cta-button primary large">
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
             <Link to="/demo">Live Demo</Link>
           </div>
           <div className="footer-column">
             <h4>Support</h4>
             <a href="/documentation" target="_blank">Documentation</a>
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