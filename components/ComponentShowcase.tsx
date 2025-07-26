import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Star, Code, Palette, Smartphone, Users, BarChart, Map, Search, Bell, MessageCircle, Settings } from 'lucide-react';
import { MetricCard, CardChart, CardTable, FullGraph, TableCard, DataTable } from './shared';
import MetricIcon from './shared/MetricIcon';
import { ProgressLoader } from './ProgressLoader';
import { ColorProvider } from './shared/ColorProvider';
import AIInsightModal from './AIInsightModal';
import { generateMockDashboardData, generateMockAIInsight } from '../utils/mockData';
import './ComponentShowcase.css';

interface ComponentSection {
  id: string;
  title: string;
  description: string;
  category: 'compact' | 'enhanced';
  components: React.ReactNode;
}

const ComponentShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<'compact' | 'enhanced'>('enhanced');
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Generate sample data
  const mockData = generateMockDashboardData();
  
  const chartData = mockData.trendData.slice(0, 7).map(item => ({
    name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.revenue,
    orders: item.orders
  }));

  const tableData = mockData.recentCustomers.slice(0, 5).map(customer => ({
    name: customer.name,
    email: customer.email,
    orders: customer.orderCount,
    value: customer.totalSpent
  }));

  const brandData = mockData.brands.slice(0, 5).map(brand => ({
    name: brand.name,
    revenue: brand.totalRevenue,
    growth: brand.growth
  }));

  // Component sections
  const sections: ComponentSection[] = [
    {
      id: 'metric-cards',
      title: 'Metric Cards',
      description: 'Beautiful, animated metric cards with integrated charts and AI insights',
      category: 'compact',
      components: (
        <div className="showcase-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <MetricCard
            title="Total Revenue"
            value={mockData.metrics.totalRevenue}
            previousValue={mockData.metrics.previousPeriodRevenue}
            format="currency"
            trendData={chartData.map(d => ({ value: d.value }))}
            variant="variant1"
            onAIClick={() => setShowAIModal(true)}
          />
          <MetricCard
            title="Active Users"
            value={mockData.metrics.totalCustomers}
            previousValue={mockData.metrics.previousPeriodCustomers}
            format="number"
            trendData={chartData.map(d => ({ value: d.orders }))}
            variant="variant2"
            icon={<MetricIcon type="customers" />}
          />
          <MetricCard
            title="Growth Rate"
            value={23.5}
            format="percentage"
            variant="variant3"
            icon={<MetricIcon type="growth" />}
          />
        </div>
      )
    },
    {
      id: 'charts',
      title: 'Chart Components',
      description: 'Responsive charts with multiple visualization options and color themes',
      category: 'compact',
      components: (
        <div className="showcase-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
          <CardChart
            title="Revenue Trends"
            data={chartData}
            dataKey="value"
            nameKey="name"
            chartType="default"
            colors="primary"
          />
          <CardChart
            title="Brand Performance"
            data={brandData}
            dataKey="revenue"
            nameKey="name"
            chartType="horizontal-bars"
            colors="multicolored"
          />
        </div>
      )
    },
    {
      id: 'tables',
      title: 'Data Tables',
      description: 'Flexible table components with sorting, search, and responsive design',
      category: 'compact',
      components: (
        <div className="showcase-grid" style={{ gridTemplateColumns: '1fr' }}>
          <CardTable
            title="Recent Customers"
            data={tableData}
            columns={[
              { key: 'name', label: 'Customer' },
              { key: 'email', label: 'Email' },
              { key: 'orders', label: 'Orders' },
              { key: 'value', label: 'Total Value', format: 'currency' }
            ]}
          />
          <TableCard
            title="Top Performers"
            data={brandData}
            columns={[
              { key: 'name', label: 'Brand' },
              { key: 'revenue', label: 'Revenue', format: 'currency' },
              { key: 'growth', label: 'Growth', format: 'percentage' }
            ]}
          />
        </div>
      )
    },
    {
      id: 'full-graph',
      title: 'Full Graph',
      description: 'Large-scale graph component perfect for main dashboard displays',
      category: 'compact',
      components: (
        <div className="showcase-single">
          <FullGraph
            title="Revenue Over Time"
            data={chartData}
            dataKey="value"
            color="#79d5e9"
          />
        </div>
      )
    },
    {
      id: 'progress-loader',
      title: 'Progress Loader',
      description: 'Elegant loading states with smooth animations',
      category: 'compact',
      components: (
        <div className="showcase-single">
          <div style={{ height: '200px', position: 'relative', background: 'var(--card-background)', borderRadius: '12px' }}>
            {showLoader ? (
              <ProgressLoader />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <button 
                  onClick={() => {
                    setShowLoader(true);
                    setTimeout(() => setShowLoader(false), 3000);
                  }}
                  style={{
                    background: 'var(--primary-color)',
                    color: 'var(--background-dark)',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Demo Loading Animation
                </button>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'dashboard',
      title: 'Complete Dashboard',
      description: 'Full dashboard layout with all components integrated',
      category: 'enhanced',
      components: (
        <div className="showcase-dashboard-preview">
          <div className="dashboard-mockup">
            <div className="dashboard-header">
              <h3>Analytics Dashboard</h3>
              <div className="dashboard-controls">
                <button><Bell size={16} /></button>
                <button><MessageCircle size={16} /></button>
                <button><Settings size={16} /></button>
              </div>
            </div>
            <div className="dashboard-content">
              <div className="dashboard-metrics">
                {[
                  { title: 'Revenue', value: '$124K', change: '+12%' },
                  { title: 'Users', value: '2.4K', change: '+8%' },
                  { title: 'Orders', value: '1.2K', change: '+15%' },
                  { title: 'Growth', value: '23%', change: '+5%' }
                ].map((metric, i) => (
                  <div key={i} className="dashboard-metric-mini">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-title">{metric.title}</div>
                    <div className="metric-change positive">{metric.change}</div>
                  </div>
                ))}
              </div>
              <div className="dashboard-chart-area">
                <div className="chart-placeholder">
                  <BarChart size={48} />
                  <span>Interactive Charts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'customer-management',
      title: 'Customer Management',
      description: 'Complete customer management interface with search and filtering',
      category: 'enhanced',
      components: (
        <div className="showcase-feature-preview">
          <div className="feature-mockup">
            <div className="feature-header">
              <div>
                <Users size={20} />
                <span>Customer Management</span>
              </div>
              <button className="add-button">Add Customer</button>
            </div>
            <div className="feature-controls">
              <div className="search-box">
                <Search size={16} />
                <span>Search customers...</span>
              </div>
              <select>
                <option>Sort by Name</option>
              </select>
            </div>
            <div className="feature-table">
              {mockData.recentCustomers.slice(0, 3).map((customer, i) => (
                <div key={i} className="table-row">
                  <div className="customer-info">
                    <div className="avatar">{customer.name.charAt(0)}</div>
                    <div>
                      <div className="name">{customer.name}</div>
                      <div className="email">{customer.email}</div>
                    </div>
                  </div>
                  <div className="customer-stats">
                    <span>${customer.totalSpent.toLocaleString()}</span>
                    <span>{customer.orderCount} orders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'maps',
      title: 'Customer Maps',
      description: 'Interactive Google Maps integration with customer locations',
      category: 'enhanced',
      components: (
        <div className="showcase-feature-preview">
          <div className="map-mockup">
            <div className="map-sidebar">
              <h4>Regions</h4>
              <div className="region-list">
                {['London', 'Scotland', 'Wales', 'North East'].map((region, i) => (
                  <div key={i} className="region-item">
                    <span>{region}</span>
                    <span className="region-count">{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="map-area">
              <Map size={64} />
              <span>Interactive Google Maps</span>
              <div className="map-markers">
                {[1, 2, 3, 4, 5].map(i => (
                  <div 
                    key={i} 
                    className="map-marker" 
                    style={{ 
                      left: `${20 + i * 15}%`, 
                      top: `${30 + (i % 2) * 20}%` 
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-insights',
      title: 'AI Insights Modal',
      description: 'Advanced AI-powered insights and recommendations',
      category: 'enhanced',
      components: (
        <div className="showcase-single">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <button 
              onClick={() => setShowAIModal(true)}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              <Star size={20} />
              Open AI Insights Demo
            </button>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
              Experience AI-powered analytics and recommendations
            </p>
          </div>
        </div>
      )
    }
  ];

  const filteredSections = sections.filter(section => 
    selectedPackage === 'enhanced' || section.category === 'compact'
  );

  const nextSection = () => {
    setActiveSection((prev) => (prev + 1) % filteredSections.length);
  };

  const prevSection = () => {
    setActiveSection((prev) => (prev - 1 + filteredSections.length) % filteredSections.length);
  };

  const currentSection = filteredSections[activeSection];

  return (
    <ColorProvider>
      <div className="component-showcase">
        {/* Header */}
        <div className="showcase-header">
          <div className="showcase-header-content">
            <div className="showcase-title">
              <img src="/splitfin-white.png" alt="Splitfin" className="showcase-logo" />
              <div>
                <h1>SplitfinUI Component Library</h1>
                <p>Professional React dashboard components with stunning design</p>
              </div>
            </div>
            
            <div className="showcase-actions">
              <Link to="/login" className="action-button secondary">
                <Code size={16} />
                Try Live Demo
              </Link>
              <a 
                href="mailto:sales@example.com?subject=SplitfinUI%20Purchase%20Inquiry" 
                className="action-button primary"
              >
                <Download size={16} />
                Purchase License
              </a>
            </div>
          </div>
        </div>

        {/* Package Selection */}
        <div className="package-selector">
          <div className="package-tabs">
            <button 
              className={`package-tab ${selectedPackage === 'compact' ? 'active' : ''}`}
              onClick={() => setSelectedPackage('compact')}
            >
              <span>Compact Package</span>
              <span className="package-price">£29</span>
            </button>
            <button 
              className={`package-tab ${selectedPackage === 'enhanced' ? 'active' : ''}`}
              onClick={() => setSelectedPackage('enhanced')}
            >
              <span>Enhanced Package</span>
              <span className="package-price">£49</span>
            </button>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="section-navigation">
          <button onClick={prevSection} className="nav-button">
            <ChevronLeft size={20} />
          </button>
          
          <div className="section-info">
            <div className="section-dots">
              {filteredSections.map((_, index) => (
                <button
                  key={index}
                  className={`section-dot ${index === activeSection ? 'active' : ''}`}
                  onClick={() => setActiveSection(index)}
                />
              ))}
            </div>
            <div className="section-title">
              <h2>{currentSection.title}</h2>
              <p>{currentSection.description}</p>
            </div>
          </div>
          
          <button onClick={nextSection} className="nav-button">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Component Display */}
        <div className="component-display">
          <div className="component-container" key={currentSection.id}>
            {currentSection.components}
          </div>
        </div>

        {/* Features List */}
        <div className="features-list">
          <h3>What's Included</h3>
          <div className="features-grid">
            <div className="feature-item">
              <Palette size={20} />
              <span>Customizable Color Themes</span>
            </div>
            <div className="feature-item">
              <Smartphone size={20} />
              <span>Fully Responsive Design</span>
            </div>
            <div className="feature-item">
              <Code size={20} />
              <span>TypeScript Support</span>
            </div>
            <div className="feature-item">
              <BarChart size={20} />
              <span>Rich Data Visualizations</span>
            </div>
          </div>
        </div>

        {/* AI Modal */}
        <AIInsightModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          insight={generateMockAIInsight('Total Revenue')}
          cardTitle="Revenue Analysis"
          isLoading={false}
        />
      </div>
    </ColorProvider>
  );
};

export default ComponentShowcase;