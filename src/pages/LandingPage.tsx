import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
              <span className="badge-icon">✨</span>
              <span className="badge-text">Premium React UI Kit</span>
            </div>
            
            <h1 className="hero-title">
              Build Beautiful Analytics
              <span className="title-gradient"> Dashboards</span>
            </h1>
            
            <p className="hero-subtitle">
              Professional React components for modern data visualization. 
              TypeScript-ready, fully customizable, and production-tested.
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
                <span className="stat-value">25+</span>
                <span className="stat-label">Components</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">100%</span>
                <span className="stat-label">TypeScript</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-value">Zero</span>
                <span className="stat-label">Dependencies</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="dashboard-preview">
              <img 
                src="/dashboard.png" 
                alt="Split UI Dashboard Preview" 
                className="dashboard-image"
              />
              <div className="dashboard-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Preview Section */}
      <section id="components" className="components-preview-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Powerful Components
              <span className="section-subtitle">Everything you need for professional dashboards</span>
            </h2>
          </div>
          
          <div className="components-grid">
            <div className="component-card featured">
              <div className="component-icon">📊</div>
              <h3>Dashboard Views</h3>
              <p>Complete dashboard with multiple views including Overview, Revenue, Orders, and Forecasting. Each view is optimized for data visualization with smooth transitions.</p>
              <div className="component-features">
                <span className="feature-item">• Real-time data updates</span>
                <span className="feature-item">• Responsive grid layouts</span>
                <span className="feature-item">• Customizable date ranges</span>
                <span className="feature-item">• Export functionality</span>
              </div>
              <div className="component-tags">
                <span className="tag">OverviewView</span>
                <span className="tag">RevenueView</span>
                <span className="tag">OrdersView</span>
                <span className="tag">ForecastingView</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📈</div>
              <h3>Metric Cards</h3>
              <p>Display key performance indicators with beautiful animations. Features include trend indicators, mini charts, percentage changes, and multiple display variants.</p>
              <div className="component-features">
                <span className="feature-item">• 3 card variants</span>
                <span className="feature-item">• Animated sparklines</span>
                <span className="feature-item">• Trend indicators</span>
                <span className="feature-item">• Currency formatting</span>
              </div>
              <div className="component-tags">
                <span className="tag">MetricCard</span>
                <span className="tag">StatCard</span>
                <span className="tag">KPICard</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📋</div>
              <h3>Data Tables</h3>
              <p>Advanced tables with built-in sorting, filtering, and pagination. Supports row actions, bulk operations, and responsive mobile views.</p>
              <div className="component-features">
                <span className="feature-item">• Column sorting</span>
                <span className="feature-item">• Search filtering</span>
                <span className="feature-item">• Pagination controls</span>
                <span className="feature-item">• Row selection</span>
              </div>
              <div className="component-tags">
                <span className="tag">DataTable</span>
                <span className="tag">CardTable</span>
                <span className="tag">TableCard</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🗺️</div>
              <h3>Customer Map</h3>
              <p>Interactive Google Maps integration showing customer locations with clustering, filters, and detailed info windows. Perfect for geographic analytics.</p>
              <div className="component-features">
                <span className="feature-item">• Marker clustering</span>
                <span className="feature-item">• Region filtering</span>
                <span className="feature-item">• Custom info windows</span>
                <span className="feature-item">• Direction support</span>
              </div>
              <div className="component-tags">
                <span className="tag">CustomerMapGoogle</span>
                <span className="tag">MapCluster</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">👥</div>
              <h3>Customer Management</h3>
              <p>Complete customer management system with list views, detailed profiles, and quick actions. Includes search, filters, and bulk operations.</p>
              <div className="component-features">
                <span className="feature-item">• Customer profiles</span>
                <span className="feature-item">• Contact management</span>
                <span className="feature-item">• Activity tracking</span>
                <span className="feature-item">• Financial overview</span>
              </div>
              <div className="component-tags">
                <span className="tag">CustomersManagement</span>
                <span className="tag">CustomerDetail</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">📊</div>
              <h3>Chart Components</h3>
              <p>Beautiful, animated charts powered by Recharts. Includes line charts, bar charts, area charts, and pie charts with customizable colors.</p>
              <div className="component-features">
                <span className="feature-item">• Multiple chart types</span>
                <span className="feature-item">• Smooth animations</span>
                <span className="feature-item">• Responsive design</span>
                <span className="feature-item">• Custom tooltips</span>
              </div>
              <div className="component-tags">
                <span className="tag">CardChart</span>
                <span className="tag">FullGraph</span>
                <span className="tag">PieChart</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🔐</div>
              <h3>Authentication</h3>
              <p>Stunning login component with social authentication support, form validation, and beautiful animations. Includes remember me and password recovery.</p>
              <div className="component-features">
                <span className="feature-item">• Social logins</span>
                <span className="feature-item">• Form validation</span>
                <span className="feature-item">• Password recovery</span>
                <span className="feature-item">• Animated background</span>
              </div>
              <div className="component-tags">
                <span className="tag">Login</span>
                <span className="tag">AuthForm</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🎨</div>
              <h3>Theming System</h3>
              <p>Comprehensive theming with ColorProvider supporting 11 color schemes. Easy theme switching with CSS variables and dark mode support.</p>
              <div className="component-features">
                <span className="feature-item">• 11 color themes</span>
                <span className="feature-item">• Dark mode ready</span>
                <span className="feature-item">• CSS variables</span>
                <span className="feature-item">• Theme persistence</span>
              </div>
              <div className="component-tags">
                <span className="tag">ColorProvider</span>
                <span className="tag">ThemeContext</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">🏗️</div>
              <h3>Layout System</h3>
              <p>Master layout with collapsible sidebar, breadcrumbs, and mobile responsiveness. Includes notification center and user profile management.</p>
              <div className="component-features">
                <span className="feature-item">• Collapsible sidebar</span>
                <span className="feature-item">• Breadcrumb navigation</span>
                <span className="feature-item">• Mobile menu</span>
                <span className="feature-item">• Notification center</span>
              </div>
              <div className="component-tags">
                <span className="tag">MasterLayout</span>
                <span className="tag">Sidebar</span>
              </div>
            </div>
            
            <div className="component-card">
              <div className="component-icon">⚡</div>
              <h3>Utility Components</h3>
              <p>Essential utilities including loading states, progress indicators, modals, and AI-powered insights. All with smooth animations.</p>
              <div className="component-features">
                <span className="feature-item">• Loading animations</span>
                <span className="feature-item">• Progress bars</span>
                <span className="feature-item">• Modal dialogs</span>
                <span className="feature-item">• Toast notifications</span>
              </div>
              <div className="component-tags">
                <span className="tag">ProgressLoader</span>
                <span className="tag">AIInsightModal</span>
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
              <a href="#">Documentation</a>
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