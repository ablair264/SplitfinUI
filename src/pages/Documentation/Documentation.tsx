import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Documentation.css';

// Optional: Uncomment these imports to enable syntax highlighting
// import Prism from 'prismjs';
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-jsx';
// import 'prismjs/components/prism-tsx';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-bash';
// import 'prismjs/components/prism-json';

// Note: To enable syntax highlighting:
// 1. Install prismjs: npm install prismjs @types/prismjs
// 2. Uncomment the imports above
// 3. Uncomment the Prism.highlightAll() call in the useEffect below

interface NavSection {
  id: string;
  label: string;
  icon: string;
  items: NavItem[];
}

interface NavItem {
  href: string;
  label: string;
}

const Documentation: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Apply theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${savedTheme}-theme`);
  }, []);

  useEffect(() => {
    // Highlight code blocks using Prism (if enabled)
    // Prism?.highlightAll();
  }, [activeSection]);

  useEffect(() => {
    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${newTheme}-theme`);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigationSections: NavSection[] = [
    {
      id: 'getting-started',
      label: 'Getting Started',
      icon: '🚀',
      items: [
        { href: '#overview', label: 'Overview' },
        { href: '#installation', label: 'Installation' },
        { href: '#project-structure', label: 'Project Structure' },
        { href: '#quick-start', label: 'Quick Start' },
      ],
    },
    {
      id: 'components',
      label: 'Components',
      icon: '🧩',
      items: [
        { href: '#master-layout', label: 'MasterLayout' },
        { href: '#dashboard', label: 'Dashboard' },
        { href: '#login', label: 'Login' },
        { href: '#metric-card', label: 'MetricCard' },
        { href: '#card-chart', label: 'CardChart' },
        { href: '#card-table', label: 'CardTable' },
        { href: '#customer-map', label: 'CustomerMap' },
      ],
    },
    {
      id: 'customisation',
      label: 'Customisation',
      icon: '🎨',
      items: [
        { href: '#theming', label: 'Theming' },
        { href: '#colours', label: 'Colours' },
        { href: '#typography', label: 'Typography' },
        { href: '#css-variables', label: 'CSS Variables' },
      ],
    },
    {
      id: 'data-hooks',
      label: 'Data & Hooks',
      icon: '📊',
      items: [
        { href: '#mock-data', label: 'Mock Data' },
        { href: '#use-dashboard', label: 'useDashboard Hook' },
        { href: '#data-integration', label: 'Data Integration' },
      ],
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      icon: '📘',
      items: [
        { href: '#type-definitions', label: 'Type Definitions' },
        { href: '#interfaces', label: 'Interfaces' },
        { href: '#generics', label: 'Using Generics' },
      ],
    },
    {
      id: 'deployment',
      label: 'Deployment',
      icon: '🚀',
      items: [
        { href: '#vercel', label: 'Vercel' },
        { href: '#netlify', label: 'Netlify' },
        { href: '#environment-vars', label: 'Environment Variables' },
      ],
    },
    {
      id: 'examples',
      label: 'Examples',
      icon: '📝',
      items: [
        { href: '#basic-setup', label: 'Basic Setup' },
        { href: '#custom-theme', label: 'Custom Theme' },
        { href: '#integration', label: 'API Integration' },
      ],
    },
  ];

  return (
    <div className="doc-layout-container">
      {/* Sidebar Navigation */}
      <nav className="doc-sidebar-nav">
        {/* Top Actions Bar */}
        <div className="doc-sidebar-top-actions">
          <button className="doc-action-btn theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <svg className="theme-icon-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg className="theme-icon-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <button 
            className="doc-action-btn" 
            onClick={() => window.open('https://github.com/splitfin/ui', '_blank')} 
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </button>
          <button 
            className="doc-action-btn" 
            onClick={() => navigate('/')} 
            aria-label="Back to website"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        </div>

        {/* Logo Section */}
        <div className="doc-sidebar-header">
          <img src="/logos/splitfinrow.png" alt="SplitfinUI" className="doc-logo-image" />
          <h2 className="doc-title">Documentation</h2>
        </div>

        {/* Navigation Sections */}
        <div className="doc-sidebar-nav-sections">
          {navigationSections.map((section) => (
            <div key={section.id} className="doc-sidebar-nav-section">
              <button
                className={`doc-sidebar-nav-item ${expandedSections.includes(section.id) ? 'active' : ''}`}
                onClick={() => toggleSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-text">{section.label}</span>
                <span className="nav-chevron">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div className={`doc-sidebar-dropdown ${expandedSections.includes(section.id) ? 'open' : ''}`}>
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`doc-sidebar-dropdown-item ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(item.href.slice(1));
                      window.location.hash = item.href;
                    }}
                  >
                    <span className="dropdown-text">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="doc-sidebar-footer">
          <p className="version-info">Version 1.0.0</p>
          <p className="copyright">© 2025 Splitfin</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="doc-main-content">
        <section id={activeSection} className="doc-section">
          {activeSection === 'overview' && (
            <>
              <h1>SplitfinUI Documentation</h1>
              <p className="section-intro">Welcome to the comprehensive documentation for SplitfinUI - a premium React dashboard template with 25+ beautifully designed components.</p>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <div className="feature-icon">🎨</div>
                  <h3>Modern Design</h3>
                  <p>Glassmorphism effects, smooth animations, and a contemporary aesthetic that works beautifully in both light and dark modes.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">⚡</div>
                  <h3>Zero Dependencies</h3>
                  <p>Built with only React as a dependency. No bloated libraries or unnecessary packages - just clean, efficient code.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📱</div>
                  <h3>Fully Responsive</h3>
                  <p>Mobile-first design approach ensuring your dashboard looks perfect on all devices and screen sizes.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🔧</div>
                  <h3>TypeScript Support</h3>
                  <p>Complete TypeScript definitions for all components, providing excellent developer experience and type safety.</p>
                </div>
              </div>

              <h2>Package Options</h2>
              <div className="package-comparison">
                <div className="package-card compact">
                  <h3>Compact Package</h3>
                  <div className="price">£19</div>
                  <ul>
                    <li>✓ Login Component</li>
                    <li>✓ MasterLayout</li>
                    <li>✓ Dashboard with Overview</li>
                    <li>✓ Essential Components</li>
                    <li>✓ Mock Data System</li>
                    <li>✓ Basic Support</li>
                  </ul>
                </div>
                <div className="package-card full">
                  <h3>Full Package</h3>
                  <div className="price">£39</div>
                  <ul>
                    <li>✓ Everything in Compact</li>
                    <li>✓ All Dashboard Views</li>
                    <li>✓ Customer Management</li>
                    <li>✓ Advanced Components</li>
                    <li>✓ Google Maps Integration</li>
                    <li>✓ Premium Support</li>
                    <li>✓ 1 Year Updates</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeSection === 'installation' && (
            <>
              <h1>Installation</h1>
              <p className="section-intro">Get started with SplitfinUI in just a few minutes. Follow these simple steps to set up your development environment.</p>

              <h2>Prerequisites</h2>
              <ul className="requirement-list">
                <li>Node.js 16.0 or higher</li>
                <li>npm or yarn package manager</li>
                <li>React 18.0 or higher</li>
                <li>A code editor (VS Code recommended)</li>
              </ul>

              <h2>Step 1: Install Dependencies</h2>
              <div className="code-block">
                <pre><code className="language-bash">{`# Using npm
npm install

# Using yarn
yarn install`}</code></pre>
              </div>

              <h2>Step 2: Environment Setup</h2>
              <p>Copy the example environment file and add your configuration:</p>
              <div className="code-block">
                <pre><code className="language-bash">{`# Copy the example file
cp .env.example .env`}</code></pre>
              </div>

              <h2>Step 3: Start Development Server</h2>
              <div className="code-block">
                <pre><code className="language-bash">{`# Start the development server
npm run dev

# The application will be available at:
# http://localhost:5173`}</code></pre>
              </div>
            </>
          )}

          {/* Add more sections as needed */}
          {activeSection !== 'overview' && activeSection !== 'installation' && (
            <>
              <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/-/g, ' ')}</h1>
              <p className="section-intro">Documentation for this section is coming soon.</p>
              <div className="info-box">
                <h4>Under Construction</h4>
                <p>We're working on completing this documentation. Check back soon for updates!</p>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Documentation;
