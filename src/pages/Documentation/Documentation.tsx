import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Documentation.module.css';

interface NavSection {
  id: string;
  label: string;
  icon: string;
  items: Array<{
    href: string;
    label: string;
  }>;
}

const Documentation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set(['getting-started']));
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const contentRef = useRef<HTMLDivElement>(null);

  const navSections: NavSection[] = [
    {
      id: 'getting-started',
      label: 'Getting Started',
      icon: '🚀',
      items: [
        { href: '#overview', label: 'Overview' },
        { href: '#installation', label: 'Installation' },
        { href: '#project-structure', label: 'Project Structure' },
        { href: '#quick-start', label: 'Quick Start' }
      ]
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
      ]
    },
    {
      id: 'customisation',
      label: 'Customisation',
      icon: '🎨',
      items: [
        { href: '#theming', label: 'Theming' },
        { href: '#colours', label: 'Colours' },
        { href: '#typography', label: 'Typography' },
        { href: '#css-variables', label: 'CSS Variables' }
      ]
    },
    {
      id: 'data-hooks',
      label: 'Data & Hooks',
      icon: '📊',
      items: [
        { href: '#mock-data', label: 'Mock Data' },
        { href: '#use-dashboard', label: 'useDashboard Hook' },
        { href: '#data-integration', label: 'Data Integration' }
      ]
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      icon: '📘',
      items: [
        { href: '#type-definitions', label: 'Type Definitions' },
        { href: '#interfaces', label: 'Interfaces' },
        { href: '#generics', label: 'Using Generics' }
      ]
    },
    {
      id: 'deployment',
      label: 'Deployment',
      icon: '🚀',
      items: [
        { href: '#vercel', label: 'Vercel' },
        { href: '#netlify', label: 'Netlify' },
        { href: '#environment-vars', label: 'Environment Variables' }
      ]
    },
    {
      id: 'examples',
      label: 'Examples',
      icon: '📝',
      items: [
        { href: '#basic-setup', label: 'Basic Setup' },
        { href: '#custom-theme', label: 'Custom Theme' },
        { href: '#integration', label: 'API Integration' }
      ]
    }
  ];

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${savedTheme}-theme`);

    // Load Prism for syntax highlighting
    const loadPrism = async () => {
      if (!(window as any).Prism) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-tsx.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-toml.min.js');
      }
      
      // Highlight code blocks
      if ((window as any).Prism) {
        (window as any).Prism.highlightAll();
      }
    };

    loadPrism();
  }, []);

  useEffect(() => {
    // Handle hash navigation
    const hash = location.hash.slice(1) || 'overview';
    setActiveSection(hash);
    
    // Scroll to section
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Highlight code when section changes
    if ((window as any).Prism) {
      setTimeout(() => {
        (window as any).Prism.highlightAll();
      }, 100);
    }
  }, [location.hash]);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${newTheme}-theme`);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSection = (sectionId: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleNavClick = (href: string) => {
    const sectionId = href.slice(1);
    setActiveSection(sectionId);
    navigate(href);
  };

  return (
    <div className={`${styles.docuLayoutContainer} ${theme === 'light' ? styles.lightTheme : ''}`}>
      {/* Sidebar Navigation */}
      <nav className={styles.docSidebarNav}>
        {/* Top Actions Bar */}
        <div className={styles.docSidebarTopActions}>
          <button className={`${styles.docActionBtn} ${styles.themeBtn}`} onClick={toggleTheme} aria-label="Toggle theme">
            <svg className={styles.themeIconLight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <svg className={styles.themeIconDark} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <button 
            className={styles.docActionBtn} 
            onClick={() => window.open('https://github.com/splitfin/ui', '_blank')} 
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </button>
          <button 
            className={styles.docActionBtn} 
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
        <div className={styles.docSidebarHeader}>
          <img src="/splitui.png" alt="SplitfinUI" className={styles.docLogoImage} />
          <h2 className={styles.docTitle}>Documentation</h2>
        </div>

        {/* Navigation Sections */}
        <div className={styles.docSidebarNavSections}>
          {navSections.map(section => (
            <div key={section.id} className={styles.docSidebarNavSection}>
              <button 
                className={`${styles.docSidebarNavItem} ${openDropdowns.has(section.id) ? styles.active : ''}`}
                onClick={() => toggleSection(section.id)}
              >
                <span className={styles.navIcon}>{section.icon}</span>
                <span className={styles.navText}>{section.label}</span>
                <span className={styles.navChevron}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div className={`${styles.docSidebarDropdown} ${openDropdowns.has(section.id) ? styles.open : ''}`}>
                {section.items.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`${styles.docSidebarDropdownItem} ${styles.active ? styles.active : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.docSidebarFooter}>
          <p className={styles.versionInfo}>Version 1.0.0</p>
          <p className={styles.copyright}>© 2025 Splitfin</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className={styles.docMainContent} ref={contentRef}>
        <div className={styles.docContentWrapper}>
        {/* Overview Section */}
        <section id="overview" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>SplitfinUI Documentation</h1>
          <p className={styles.sectionIntro}>Welcome to the comprehensive documentation for SplitfinUI - a premium React dashboard template with 25+ beautifully designed components.</p>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3>Modern Design</h3>
              <p>Glassmorphism effects, smooth animations, and a contemporary aesthetic that works beautifully in both light and dark modes.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Zero Dependencies</h3>
              <p>Built with only React as a dependency. No bloated libraries or unnecessary packages - just clean, efficient code.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Fully Responsive</h3>
              <p>Mobile-first design approach ensuring your dashboard looks perfect on all devices and screen sizes.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔧</div>
              <h3>TypeScript Support</h3>
              <p>Complete TypeScript definitions for all components, providing excellent developer experience and type safety.</p>
            </div>
          </div>

          <h2>Package Options</h2>
          <div className={styles.packageComparison}>
            <div className={`${styles.packageCard} compact`}>
              <h3>Compact Package</h3>
              <div className={styles.price}>£19</div>
              <ul>
                <li>✓ Login Component</li>
                <li>✓ MasterLayout</li>
                <li>✓ Dashboard with Overview</li>
                <li>✓ Essential Components</li>
                <li>✓ Mock Data System</li>
                <li>✓ Basic Support</li>
              </ul>
            </div>
            <div className={`${styles.packageCard} ${styles.full}`}>
              <h3>Full Package</h3>
              <div className={styles.price}>£39</div>
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
        </section>

        {/* Installation Section */}
        <section id="installation" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Installation</h1>
          <p className={styles.sectionIntro}>Get started with SplitfinUI in just a few minutes. Follow these simple steps to set up your development environment.</p>

          <h2>Prerequisites</h2>
          <ul className={styles.requirementList}>
            <li>Node.js 16.0 or higher</li>
            <li>npm or yarn package manager</li>
            <li>React 18.0 or higher</li>
            <li>A code editor (VS Code recommended)</li>
          </ul>

          <h2>Step 1: Install Dependencies</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-bash">{`# Using npm
npm install

# Using yarn
yarn install`}</code></pre>
          </div>

          <h2>Step 2: Environment Setup</h2>
          <p>Copy the example environment file and add your configuration:</p>
          <div className={styles.codeBlock}>
            <pre><code className="language-bash">{`# Copy the example file
cp .env.example .env`}</code></pre>
          </div>

          <p>Edit the <code>.env</code> file with your settings:</p>
          <div className={styles.codeBlock}>
            <pre><code className="language-bash">{`# Required for CustomerMap component
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Optional: API endpoints if using external data
VITE_API_ENDPOINT=https://your-api.com`}</code></pre>
          </div>

          <h2>Step 3: Start Development Server</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-bash">{`# Start the development server
npm run dev

# The application will be available at:
# http://localhost:5173`}</code></pre>
          </div>

          <h2>Build for Production</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-bash">{`# Create production build
npm run build

# Preview production build
npm run preview`}</code></pre>
          </div>
        </section>

        {/* Project Structure Section */}
        <section id="project-structure" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Project Structure</h1>
          <p className={styles.sectionIntro}>Understanding the project structure will help you navigate and customise SplitfinUI effectively.</p>

          <div className={styles.codeBlock}>
            <pre><code className="language-text">{`src/
├── components/           # All React components
│   ├── Dashboard/       # Dashboard and sub-components
│   │   ├── Dashboard.tsx
│   │   ├── shared/      # Shared dashboard components
│   │   └── views/       # Dashboard view pages
│   ├── Login/           # Login component
│   └── CustomersManagement/
├── hooks/               # Custom React hooks
│   └── useDashboard.ts  # Dashboard data hook
├── layouts/             # Layout components
│   └── MasterLayout.tsx # Main layout wrapper
├── pages/               # Page components
│   ├── LandingPage.tsx  # Marketing page
│   └── DemoPage.tsx     # Component demos
├── styles/              # Global styles
├── types/               # TypeScript definitions
└── utils/               # Utility functions
    └── MOCKDATA.ts      # Mock data generator`}</code></pre>
          </div>

          <h2>Key Files</h2>
          <div className={styles.infoBox}>
            <h4>App.tsx</h4>
            <p>Main application entry point with routing configuration.</p>
          </div>
          <div className={styles.infoBox}>
            <h4>main.tsx</h4>
            <p>React DOM render point and app initialisation.</p>
          </div>
          <div className={styles.infoBox}>
            <h4>vite.config.ts</h4>
            <p>Vite configuration for development and build settings.</p>
          </div>
        </section>

        {/* Quick Start Section */}
        <section id="quick-start" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Quick Start Guide</h1>
          <p className={styles.sectionIntro}>Get up and running with a basic dashboard in minutes using these examples.</p>

          <h2>Basic Dashboard Setup</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = async (email, password) => {
    // Your authentication logic here
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;`}</code></pre>
          </div>

          <h2>Customising the Navigation</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`const customNavigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <ChartIcon />,
    links: [
      { to: '/dashboard', label: 'Overview' },
      { to: '/dashboard/analytics', label: 'Analytics' }
    ]
  },
  {
    id: 'products',
    label: 'Products',
    icon: <ProductIcon />,
    to: '/products' // Direct navigation
  }
];

<MasterLayout navigationSections={customNavigation}>
  {/* Your content */}
</MasterLayout>`}</code></pre>
          </div>

          <h2>Using Mock Data</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`import { useDashboard } from './hooks/useDashboard';

function MyDashboard() {
  const { data, loading, error, refresh } = useDashboard({
    userId: 'user-123',
    dateRange: '30_days',
    enableCaching: true
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Dashboard 
      data={data}
      onRefresh={refresh}
    />
  );
}`}</code></pre>
          </div>
        </section>

        {/* MasterLayout Section */}
        <section id="master-layout" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>MasterLayout Component</h1>
          <p className={styles.sectionIntro}>The MasterLayout component provides the main application structure with responsive sidebar navigation, header, and content area.</p>

          <h2>Basic Usage</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`import MasterLayout from './layouts/MasterLayout';

function App() {
  return (
    <MasterLayout
      user={{
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin'
      }}
    >
      {/* Your content here */}
    </MasterLayout>
  );
}`}</code></pre>
          </div>

          <h2>Props</h2>
          <div className={styles.propsTable}>
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>user</code></td>
                  <td><code>User</code></td>
                  <td><code>undefined</code></td>
                  <td>User object with id, name, email, role, and optional avatar</td>
                </tr>
                <tr>
                  <td><code>navigationSections</code></td>
                  <td><code>NavigationSection[]</code></td>
                  <td><code>defaultNavigation</code></td>
                  <td>Array of navigation sections for the sidebar</td>
                </tr>
                <tr>
                  <td><code>logoSrc</code></td>
                  <td><code>string</code></td>
                  <td><code>'/logos/splitfinrow.png'</code></td>
                  <td>Path to the logo image</td>
                </tr>
                <tr>
                  <td><code>onLogout</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Callback function for logout action</td>
                </tr>
                <tr>
                  <td><code>showThemeSelector</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show/hide theme selector</td>
                </tr>
                <tr>
                  <td><code>enableBreadcrumbs</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Enable/disable breadcrumb navigation</td>
                </tr>
                <tr>
                  <td><code>unreadMessagesCount</code></td>
                  <td><code>number</code></td>
                  <td><code>0</code></td>
                  <td>Number of unread messages to display</td>
                </tr>
                <tr>
                  <td><code>unreadNotificationsCount</code></td>
                  <td><code>number</code></td>
                  <td><code>0</code></td>
                  <td>Number of unread notifications</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Navigation Structure</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`interface NavigationSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  links?: NavLink[];  // Sub-navigation items
  to?: string;        // Direct navigation (no sub-items)
}

interface NavLink {
  to: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}`}</code></pre>
          </div>

          <h2>Advanced Example</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`const navigation = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    links: [
      { 
        to: '/analytics/overview', 
        label: 'Overview',
        badge: 'New' 
      },
      { 
        to: '/analytics/reports', 
        label: 'Reports',
        icon: <ReportIcon />
      }
    ]
  }
];

<MasterLayout
  user={currentUser}
  navigationSections={navigation}
  logoSrc="/custom-logo.png"
  onLogout={handleLogout}
  onMessagesClick={() => setMessagesOpen(true)}
  unreadMessagesCount={5}
  customBreadcrumbNames={{
    'analytics': 'Business Analytics',
    'reports': 'Custom Reports'
  }}
/>`}</code></pre>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Dashboard Component</h1>
          <p className={styles.sectionIntro}>The Dashboard component is a comprehensive analytics interface with multiple views, real-time data visualisation, and AI-powered insights.</p>

          <h2>Basic Usage</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Dashboard
      userId="user-123"
      theme="dark"
      enableAIInsights={true}
    />
  );
}`}</code></pre>
          </div>

          <h2>Props</h2>
          <div className={styles.propsTable}>
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>userId</code></td>
                  <td><code>string</code></td>
                  <td><code>'demo-user'</code></td>
                  <td>User identifier for data filtering</td>
                </tr>
                <tr>
                  <td><code>apiEndpoint</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>API endpoint for data fetching</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td><code>'dark' | 'light'</code></td>
                  <td><code>'dark'</code></td>
                  <td>Dashboard theme</td>
                </tr>
                <tr>
                  <td><code>enableAIInsights</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Enable AI-powered insights</td>
                </tr>
                <tr>
                  <td><code>enableCaching</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Enable data caching</td>
                </tr>
                <tr>
                  <td><code>autoRefresh</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Auto-refresh data</td>
                </tr>
                <tr>
                  <td><code>refreshInterval</code></td>
                  <td><code>number</code></td>
                  <td><code>300000</code></td>
                  <td>Refresh interval in milliseconds</td>
                </tr>
                <tr>
                  <td><code>onDataLoad</code></td>
                  <td><code>(data: DashboardData) =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Callback when data loads</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Dashboard Views</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h4>Overview View</h4>
              <p>Main dashboard with key metrics, charts, and recent activity.</p>
            </div>
            <div className={styles.featureCard}>
              <h4>Revenue View</h4>
              <p>Detailed revenue analytics with trend analysis and forecasting.</p>
            </div>
            <div className={styles.featureCard}>
              <h4>Orders View</h4>
              <p>Order management with filtering, sorting, and status tracking.</p>
            </div>
            <div className={styles.featureCard}>
              <h4>Invoices View</h4>
              <p>Invoice tracking with payment status and reminders.</p>
            </div>
          </div>

          <h2>Data Integration</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// Using with external API
<Dashboard
  userId={currentUser.id}
  apiEndpoint="https://api.yourdomain.com"
  onDataLoad={(data) => {
    console.log('Dashboard data loaded:', data);
    // Process or store data
  }}
  onError={(error) => {
    console.error('Dashboard error:', error);
    // Handle errors
  }}
/>

// Using with mock data (default)
<Dashboard
  enableCaching={true}
  defaultDateRange="30_days"
/>`}</code></pre>
          </div>

          <h2>Custom Metrics</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`const customMetrics = {
  conversionRate: 3.5,
  customerLifetimeValue: 1250,
  netPromoterScore: 72
};

<Dashboard
  customMetrics={customMetrics}
  // Custom metrics will be displayed alongside default metrics
/>`}</code></pre>
          </div>
        </section>

        {/* Login Section */}
        <section id="login" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Login Component</h1>
          <p className={styles.sectionIntro}>A beautiful, animated login component with social authentication support and complete customisation options.</p>

          <h2>Basic Usage</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`import Login from './components/Login/Login';

function App() {
  const handleLogin = async (email, password) => {
    // Your authentication logic
    const response = await authenticateUser(email, password);
    if (response.success) {
      // Redirect to dashboard
    }
  };

  return <Login onLogin={handleLogin} />;
}`}</code></pre>
          </div>

          <h2>Props</h2>
          <div className={styles.propsTable}>
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>onLogin</code></td>
                  <td><code>(email: string, password: string) =&gt; Promise&lt;void&gt;</code></td>
                  <td><code>undefined</code></td>
                  <td>Login handler function</td>
                </tr>
                <tr>
                  <td><code>onSocialLogin</code></td>
                  <td><code>(provider: 'google' | 'github' | 'apple') =&gt; Promise&lt;void&gt;</code></td>
                  <td><code>undefined</code></td>
                  <td>Social login handler</td>
                </tr>
                <tr>
                  <td><code>logoSrc</code></td>
                  <td><code>string</code></td>
                  <td><code>'/logos/splitfinrow.png'</code></td>
                  <td>Logo image path</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Login form title</td>
                </tr>
                <tr>
                  <td><code>subtitle</code></td>
                  <td><code>string</code></td>
                  <td><code>'Access your dashboard'</code></td>
                  <td>Login form subtitle</td>
                </tr>
                <tr>
                  <td><code>showSocialLogin</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show social login buttons</td>
                </tr>
                <tr>
                  <td><code>showDemoHint</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show demo credentials</td>
                </tr>
                <tr>
                  <td><code>demoCredentials</code></td>
                  <td><code>{`{ email: string, password: string }`}</code></td>
                  <td><code>{`{ email: 'demo@example.com', password: 'demo123' }`}</code></td>
                  <td>Demo login credentials</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Social Authentication</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`const handleSocialLogin = async (provider) => {
  switch (provider) {
    case 'google':
      await signInWithGoogle();
      break;
    case 'github':
      await signInWithGitHub();
      break;
    case 'apple':
      await signInWithApple();
      break;
  }
};

<Login
  onSocialLogin={handleSocialLogin}
  showSocialLogin={true}
/>`}</code></pre>
          </div>

          <h2>Custom Styling</h2>
          <p>The login component includes beautiful animations and glassmorphism effects. You can customise the appearance using CSS variables:</p>
          <div className={styles.codeBlock}>
            <pre><code className="language-css">{`:root {
  --login-bg-primary: #1a1f2a;
  --login-bg-secondary: #2c3e50;
  --login-accent: #79d5e9;
  --login-text-primary: #ffffff;
  --login-border: rgba(255, 255, 255, 0.1);
}`}</code></pre>
          </div>
        </section>

        {/* MetricCard Section */}
        <section id="metric-card" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>MetricCard Component</h1>
          <p className={styles.sectionIntro}>Display key metrics with optional charts, trends, and interactive features.</p>

          <h2>Basic Usage</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`import MetricCard from './components/Dashboard/shared/MetricCard';

<MetricCard
  title="Total Revenue"
  value={125000}
  format="currency"
  trend={{ value: 12, isPositive: true }}
  chartData={revenueData}
/>`}</code></pre>
          </div>

          <h2>Props</h2>
          <div className={styles.propsTable}>
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Card title</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>number</code></td>
                  <td>-</td>
                  <td>Metric value</td>
                </tr>
                <tr>
                  <td><code>format</code></td>
                  <td><code>'number' | 'currency' | 'percentage'</code></td>
                  <td><code>'number'</code></td>
                  <td>Value format</td>
                </tr>
                <tr>
                  <td><code>trend</code></td>
                  <td><code>{`{ value: number, isPositive: boolean }`}</code></td>
                  <td><code>undefined</code></td>
                  <td>Trend indicator</td>
                </tr>
                <tr>
                  <td><code>chartData</code></td>
                  <td><code>{`Array<{ name: string, value: number }>`}</code></td>
                  <td><code>undefined</code></td>
                  <td>Chart data points</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'variant1' | 'variant2' | 'variant3'</code></td>
                  <td><code>'variant1'</code></td>
                  <td>Visual variant</td>
                </tr>
                <tr>
                  <td><code>onAIInsight</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>AI insight handler</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Variants</h2>
          <div className={styles.variantExamples}>
            <div className={styles.variantCard}>
              <h4>Variant 1</h4>
              <p>Clean design with subtle shadows and smooth animations.</p>
            </div>
            <div className={styles.variantCard}>
              <h4>Variant 2</h4>
              <p>Bold design with gradient backgrounds and stronger visual impact.</p>
            </div>
            <div className={styles.variantCard}>
              <h4>Variant 3</h4>
              <p>Minimal design focusing on content with light borders.</p>
            </div>
          </div>
        </section>

        {/* CardChart Section */}
        <section id="card-chart" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>CardChart Component</h1>
          <p className={styles.sectionIntro}>Flexible charting component supporting multiple chart types and customisation options.</p>

          <h2>Chart Types</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// Bar Chart
<CardChart
  title="Monthly Sales"
  data={salesData}
  type="bar"
  color="#79d5e9"
/>

// Line Chart
<CardChart
  title="Revenue Trend"
  data={revenueData}
  type="line"
  showGrid={true}
/>

// Pie Chart
<CardChart
  title="Category Distribution"
  data={categoryData}
  type="pie"
  showLegend={true}
/>`}</code></pre>
          </div>

          <h2>Props</h2>
          <div className={styles.propsTable}>
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Chart title</td>
                </tr>
                <tr>
                  <td><code>data</code></td>
                  <td><code>Array&lt;object&gt;</code></td>
                  <td>-</td>
                  <td>Chart data</td>
                </tr>
                <tr>
                  <td><code>type</code></td>
                  <td><code>'bar' | 'line' | 'pie' | 'area'</code></td>
                  <td><code>'bar'</code></td>
                  <td>Chart type</td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td><code>string | string[]</code></td>
                  <td><code>'#79d5e9'</code></td>
                  <td>Chart color(s)</td>
                </tr>
                <tr>
                  <td><code>height</code></td>
                  <td><code>number</code></td>
                  <td><code>300</code></td>
                  <td>Chart height in pixels</td>
                </tr>
                <tr>
                  <td><code>showGrid</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show grid lines</td>
                </tr>
                <tr>
                  <td><code>showLegend</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show legend</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CardTable Section */}
        <section id="card-table" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>CardTable Component</h1>
          <p className={styles.sectionIntro}>A versatile table component with sorting, filtering, and responsive design.</p>

          <h2>Basic Usage</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`import CardTable from './components/Dashboard/shared/CardTable';

const columns = [
  { key: 'name', label: 'Customer Name' },
  { key: 'orders', label: 'Orders', sortable: true },
  { key: 'revenue', label: 'Revenue', format: 'currency' }
];

<CardTable
  title="Top Customers"
  columns={columns}
  data={customerData}
  onRowClick={(row) => console.log('Clicked:', row)}
/>`}</code></pre>
          </div>

          <h2>Column Configuration</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  format?: 'text' | 'number' | 'currency' | 'date' | 'percentage';
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}`}</code></pre>
          </div>

          <h2>Advanced Features</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// With custom rendering
const columns = [
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className={\`status-badge \${value}\`}>
        {value}
      </span>
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <button onClick={() => handleEdit(row.id)}>
        Edit
      </button>
    )
  }
];

// With pagination
<CardTable
  columns={columns}
  data={data}
  pageSize={10}
  showPagination={true}
  onPageChange={(page) => fetchPage(page)}
/>`}</code></pre>
          </div>
        </section>

        {/* Theming Section */}
        <section id="theming" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Theming</h1>
          <p className={styles.sectionIntro}>SplitfinUI includes a comprehensive theming system with light and dark modes, customisable colours, and CSS variables.</p>

          <h2>Theme Toggle</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`// Toggle between light and dark themes
function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains('dark-theme')) {
    html.classList.remove('dark-theme');
    html.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.remove('light-theme');
    html.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}`}</code></pre>
          </div>

          <h2>Applying Themes</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// In your App component
useEffect(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.add(\`\${savedTheme}-theme\`);
}, []);`}</code></pre>
          </div>

          <h2>Theme Structure</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-css">{`/* Dark Theme (Default) */
:root {
  --bg-primary: #1a1f2a;
  --bg-secondary: #2c3e50;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --accent: #79d5e9;
  --border: rgba(255, 255, 255, 0.1);
}

/* Light Theme */
.light-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: rgba(30, 41, 59, 0.7);
  --accent: #6366f1;
  --border: rgba(30, 41, 59, 0.1);
}`}</code></pre>
          </div>
        </section>

        {/* Colours Section */}
        <section id="colours" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Colour System</h1>
          <p className={styles.sectionIntro}>A carefully crafted colour palette designed for modern dashboards with excellent contrast and accessibility.</p>

          <h2>Primary Colours</h2>
          <div className={styles.colourGrid}>
            <div className={styles.colourCard}>
              <div className={styles.colourSwatch} style={{ background: '#79d5e9' }}></div>
              <h4>Ocean Blue</h4>
              <code>#79d5e9</code>
              <p>Primary brand colour</p>
            </div>
            <div className={styles.colourCard}>
              <div className={styles.colourSwatch} style={{ background: '#799de9' }}></div>
              <h4>Sky Blue</h4>
              <code>#799de9</code>
              <p>Secondary colour</p>
            </div>
            <div className={styles.colourCard}>
              <div className={styles.colourSwatch} style={{ background: '#79e9c5' }}></div>
              <h4>Mint Green</h4>
              <code>#79e9c5</code>
              <p>Success states</p>
            </div>
            <div className={styles.colourCard}>
              <div className={styles.colourSwatch} style={{ background: '#FF9F00' }}></div>
              <h4>Sunset Orange</h4>
              <code>#FF9F00</code>
              <p>Warnings & accents</p>
            </div>
          </div>

          <h2>Chart Colours</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`const CHART_COLORS = [
  '#79d5e9',  // Ocean Blue
  '#799de9',  // Sky Blue
  '#79e9c5',  // Mint Green
  '#FF9F00',  // Sunset Orange
  '#C96868',  // Rose
  '#4daeac',  // Teal
  '#61bc8e',  // Emerald
  '#fbbf24',  // Amber
  '#dc2626',  // Red
  '#8b5cf6',  // Purple
  '#ec4899'   // Pink
];`}</code></pre>
          </div>

          <h2>Status Colours</h2>
          <div className={styles.colourGrid}>
            <div className={styles.colourCard}>
              <div className={styles.colourSwatch} style={{ background: '#10b981' }}></div>
              <h4>Success</h4>
              <code>#10b981</code>
            </div>
            <div className={styles.colourCard}>
              <div className={styles.colourSwatch} style={{ background: '#f59e0b' }}></div>
              <h4>Warning</h4>
              <code>#f59e0b</code>
            </div>
            <div className={styles.colourCard}>
              <div className={styles.colourSwatch} style={{ background: '#ef4444' }}></div>
              <h4>Error</h4>
              <code>#ef4444</code>
            </div>
            <div className={styles.colourCard}>
              <div className={styles.colourSwatch} style={{ background: '#3b82f6' }}></div>
              <h4>Info</h4>
              <code>#3b82f6</code>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Typography</h1>
          <p className={styles.sectionIntro}>Clean, modern typography system optimised for readability across all devices.</p>

          <h2>Font Stack</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-css">{`body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Inter', sans-serif;
}`}</code></pre>
          </div>

          <h2>Type Scale</h2>
          <div className={styles.typeExamples}>
            <div className={styles.typeExample}>
              <h1 style={{ margin: 0 }}>Heading 1</h1>
              <code>font-size: 2.5rem; font-weight: 700;</code>
            </div>
            <div className={styles.typeExample}>
              <h2 style={{ margin: 0 }}>Heading 2</h2>
              <code>font-size: 2rem; font-weight: 600;</code>
            </div>
            <div className={styles.typeExample}>
              <h3 style={{ margin: 0 }}>Heading 3</h3>
              <code>font-size: 1.5rem; font-weight: 600;</code>
            </div>
            <div className={styles.typeExample}>
              <p style={{ margin: 0 }}>Body Text</p>
              <code>font-size: 1rem; font-weight: 400;</code>
            </div>
            <div className={styles.typeExample}>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Small Text</p>
              <code>font-size: 0.875rem; font-weight: 400;</code>
            </div>
          </div>

          <h2>Text Utilities</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-css">{`/* Text colours */
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-muted); }
.text-accent { color: var(--accent); }

/* Text alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Font weights */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }`}</code></pre>
          </div>
        </section>

        {/* CSS Variables Section */}
        <section id="css-variables" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>CSS Variables</h1>
          <p className={styles.sectionIntro}>Complete reference of all CSS variables available for customisation.</p>

          <h2>Layout Variables</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-css">{`:root {
  /* Backgrounds */
  --layout-bg-primary: #1a1f2a;
  --layout-bg-secondary: #2c3e50;
  --layout-bg-tertiary: #34495e;
  --layout-sidebar-bg: #1a1f2a;
  
  /* Text */
  --layout-text-primary: #ffffff;
  --layout-text-secondary: rgba(255, 255, 255, 0.7);
  --layout-text-muted: rgba(255, 255, 255, 0.5);
  
  /* Borders */
  --layout-border: rgba(255, 255, 255, 0.05);
  --layout-border-hover: rgba(255, 255, 255, 0.1);
  
  /* Accents */
  --layout-accent: #6366f1;
  --layout-accent-hover: #5856eb;
  
  /* Shadows */
  --layout-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}`}</code></pre>
          </div>

          <h2>Component Variables</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-css">{`:root {
  /* Cards */
  --card-bg: var(--layout-bg-secondary);
  --card-border: var(--layout-border);
  --card-shadow: var(--layout-shadow);
  --card-radius: 12px;
  
  /* Buttons */
  --btn-primary-bg: var(--layout-accent);
  --btn-primary-text: #ffffff;
  --btn-radius: 8px;
  
  /* Inputs */
  --input-bg: rgba(255, 255, 255, 0.05);
  --input-border: var(--layout-border);
  --input-focus: var(--layout-accent);
  
  /* Charts */
  --chart-grid: rgba(255, 255, 255, 0.1);
  --chart-text: var(--layout-text-secondary);
}`}</code></pre>
          </div>

          <h2>Custom Properties Example</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-css">{`/* Override in your global CSS */
:root {
  /* Custom brand colours */
  --brand-primary: #your-color;
  --brand-secondary: #your-color;
  
  /* Custom spacing */
  --sidebar-width: 300px;
  --header-height: 60px;
  
  /* Custom animations */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}`}</code></pre>
          </div>
        </section>

        {/* Mock Data Section */}
        <section id="mock-data" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Mock Data System</h1>
          <p className={styles.sectionIntro}>SplitfinUI includes a comprehensive mock data generator for development and demos.</p>

          <h2>Data Structure</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`interface MockData {
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    averageOrderValue: number;
    outstandingInvoices: number;
    marketplaceOrders: number;
  };
  orders: Order[];
  customers: Customer[];
  invoices: Invoice[];
  agents: Agent[];
  brands: Brand[];
  items: Item[];
}`}</code></pre>
          </div>

          <h2>Generating Mock Data</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`import { generateMockData } from './utils/mockData';

// Generate data for specific date range
const data = generateMockData({
  dateRange: '30_days',
  orderCount: 100,
  customerCount: 50
});

// Access generated data
console.log(data.metrics.totalRevenue);
console.log(data.orders.length);`}</code></pre>
          </div>

          <h2>Customising Mock Data</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`// Custom data patterns
const customData = generateMockData({
  dateRange: '90_days',
  revenueRange: { min: 1000, max: 5000 },
  orderStatusDistribution: {
    completed: 0.7,
    pending: 0.2,
    cancelled: 0.1
  },
  brands: ['Brand A', 'Brand B', 'Brand C']
});`}</code></pre>
          </div>
        </section>

        {/* useDashboard Hook Section */}
        <section id="use-dashboard" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>useDashboard Hook</h1>
          <p className={styles.sectionIntro}>A powerful React hook for managing dashboard data with caching, refresh, and real-time updates.</p>

          <h2>Basic Usage</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`import { useDashboard } from './hooks/useDashboard';

function MyDashboard() {
  const {
    data,
    loading,
    error,
    refresh,
    isStale,
    isCached,
    lastUpdated
  } = useDashboard({
    userId: 'user-123',
    dateRange: '30_days'
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <DashboardContent data={data} />;
}`}</code></pre>
          </div>

          <h2>Hook Options</h2>
          <div className={styles.propsTable}>
            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>userId</code></td>
                  <td><code>string</code></td>
                  <td><code>'demo-user'</code></td>
                  <td>User identifier</td>
                </tr>
                <tr>
                  <td><code>dateRange</code></td>
                  <td><code>string</code></td>
                  <td><code>'30_days'</code></td>
                  <td>Data date range</td>
                </tr>
                <tr>
                  <td><code>autoRefresh</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Enable auto-refresh</td>
                </tr>
                <tr>
                  <td><code>apiEndpoint</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>API endpoint URL</td>
                </tr>
                <tr>
                  <td><code>enableCaching</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Enable data caching</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Caching Strategy</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STALE_DURATION = 60 * 1000; // 1 minute

// Data is considered:
// - Fresh: Less than STALE_DURATION old
// - Stale: Between STALE_DURATION and CACHE_DURATION
// - Expired: Older than CACHE_DURATION`}</code></pre>
          </div>
        </section>

        {/* Data Integration Section */}
        <section id="data-integration" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Data Integration</h1>
          <p className={styles.sectionIntro}>Integrate SplitfinUI with your existing backend or API services.</p>

          <h2>API Integration</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`// Configure API endpoint
const API_ENDPOINT = 'https://api.yourdomain.com';

// Custom data fetcher
async function fetchDashboardData(userId, dateRange) {
  const response = await fetch(\`\${API_ENDPOINT}/dashboard\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${getAuthToken()}\`
    },
    body: JSON.stringify({ userId, dateRange })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}`}</code></pre>
          </div>

          <h2>Using with useDashboard</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// Pass custom API endpoint
<Dashboard
  userId={currentUser.id}
  apiEndpoint="https://api.yourdomain.com"
  onDataLoad={(data) => {
    // Process loaded data
    analytics.track('Dashboard Loaded', {
      userId: currentUser.id,
      metrics: data.metrics
    });
  }}
/>`}</code></pre>
          </div>

          <h2>Data Transformation</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`// Transform API response to match component format
function transformApiData(apiResponse) {
  return {
    metrics: {
      totalRevenue: apiResponse.revenue.total,
      totalOrders: apiResponse.orders.count,
      totalCustomers: apiResponse.customers.active,
      averageOrderValue: apiResponse.revenue.average,
      outstandingInvoices: apiResponse.invoices.outstanding,
      marketplaceOrders: apiResponse.orders.marketplace
    },
    orders: apiResponse.orderList.map(order => ({
      id: order.orderId,
      customerId: order.customer.id,
      customerName: order.customer.name,
      date: order.createdAt,
      total: order.amount,
      status: order.status
    })),
    // ... transform other data
  };
}`}</code></pre>
          </div>
        </section>

        {/* Type Definitions Section */}
        <section id="type-definitions" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>TypeScript Type Definitions</h1>
          <p className={styles.sectionIntro}>Complete TypeScript support with comprehensive type definitions for all components.</p>

          <h2>Core Types</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials?: string;
}

// Navigation types
export interface NavigationSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  links?: NavLink[];
  to?: string;
}

export interface NavLink {
  to: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}`}</code></pre>
          </div>

          <h2>Dashboard Types</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`export interface DashboardData {
  metrics: DashboardMetrics;
  orders: DashboardOrder[];
  customers: DashboardCustomer[];
  invoices: DashboardInvoice[];
  agentPerformance?: DashboardAgentPerformance[];
  brands: DashboardBrand[];
  topItems: DashboardTopItem[];
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  outstandingInvoices: number;
  marketplaceOrders: number;
  [key: string]: number; // Allow custom metrics
}`}</code></pre>
          </div>

          <h2>Component Props Types</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// Generic component props
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Extending base props
export interface MetricCardProps extends BaseComponentProps {
  title: string;
  value: number;
  format?: 'number' | 'currency' | 'percentage';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'variant1' | 'variant2' | 'variant3';
  chartData?: ChartDataPoint[];
  onAIInsight?: () => void;
}`}</code></pre>
          </div>
        </section>

        {/* Interfaces Section */}
        <section id="interfaces" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>TypeScript Interfaces</h1>
          <p className={styles.sectionIntro}>Detailed interface definitions for working with SplitfinUI components.</p>

          <h2>Data Interfaces</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// Order interface
export interface DashboardOrder {
  id: string;
  customerId: string;
  customerName?: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  is_marketplace_order?: boolean;
  invoice_status?: 'paid' | 'outstanding' | 'overdue';
  line_items?: LineItem[];
}

// Line item interface
export interface LineItem {
  item_id?: string;
  product_id?: string;
  variant_id?: string;
  sku?: string;
  name?: string;
  brand?: string;
  quantity: number;
  total?: number;
}

// Customer interface
export interface DashboardCustomer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}`}</code></pre>
          </div>

          <h2>Hook Interfaces</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// useDashboard hook return type
export interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  isStale: boolean;
  isCached: boolean;
  lastUpdated: Date | null;
}

// Hook options
export interface UseDashboardOptions {
  userId?: string;
  dateRange?: string;
  autoRefresh?: boolean;
  apiEndpoint?: string;
  enableCaching?: boolean;
  onError?: (error: Error) => void;
  onSuccess?: (data: DashboardData) => void;
}`}</code></pre>
          </div>

          <h2>Event Handler Types</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// Common event handlers
export type ClickHandler<T = void> = (
  event: React.MouseEvent<HTMLElement>
) => T;

export type ChangeHandler<T = void> = (
  event: React.ChangeEvent<HTMLInputElement>
) => T;

// Component-specific handlers
export type LoginHandler = (
  email: string, 
  password: string
) => Promise<void>;

export type SocialLoginHandler = (
  provider: 'google' | 'github' | 'apple'
) => Promise<void>;

export type DataLoadHandler = (
  data: DashboardData
) => void;`}</code></pre>
          </div>
        </section>

        {/* Generics Section */}
        <section id="generics" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Using TypeScript Generics</h1>
          <p className={styles.sectionIntro}>Advanced TypeScript patterns for creating flexible, reusable components.</p>

          <h2>Generic Table Component</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// Generic table props
interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  keyExtractor: (item: T) => string;
}

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

// Using the generic table
function CustomerTable() {
  const columns: TableColumn<Customer>[] = [
    { key: 'name', label: 'Name' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    }
  ];

  return (
    <Table
      data={customers}
      columns={columns}
      keyExtractor={(customer) => customer.id}
    />
  );
}`}</code></pre>
          </div>

          <h2>Generic Hook Pattern</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// Generic data fetching hook
function useData<T>(
  fetcher: () => Promise<T>,
  deps: any[] = []
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, loading, error, refetch: fetchData };
}`}</code></pre>
          </div>

          <h2>Type Guards</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// Type guard functions
function isCustomer(obj: any): obj is Customer {
  return obj && 
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string';
}

function isOrder(obj: any): obj is Order {
  return obj && 
    typeof obj.id === 'string' &&
    typeof obj.total === 'number' &&
    obj.date instanceof Date;
}

// Using type guards
function processData(data: unknown) {
  if (isCustomer(data)) {
    // TypeScript knows data is Customer here
    console.log(data.email);
  } else if (isOrder(data)) {
    // TypeScript knows data is Order here
    console.log(data.total);
  }
}`}</code></pre>
          </div>
        </section>

        {/* Vercel Section */}
        <section id="vercel" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Deploying to Vercel</h1>
          <p className={styles.sectionIntro}>Deploy your SplitfinUI application to Vercel with these simple steps.</p>

          <h2>Prerequisites</h2>
          <ul className={styles.requirementList}>
            <li>A Vercel account (free tier available)</li>
            <li>Git repository (GitHub, GitLab, or Bitbucket)</li>
            <li>Production-ready build</li>
          </ul>

          <h2>Step 1: Connect Repository</h2>
          <ol className={styles.numberedList}>
            <li>Log in to your Vercel dashboard</li>
            <li>Click "New Project"</li>
            <li>Import your Git repository</li>
            <li>Select the branch to deploy (usually main or master)</li>
          </ol>

          <h2>Step 2: Configure Build Settings</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-json">{`{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}`}</code></pre>
          </div>

          <h2>Step 3: Environment Variables</h2>
          <p>Add your environment variables in the Vercel dashboard:</p>
          <div className={styles.codeBlock}>
            <pre><code className="language-bash">{`# In Vercel Dashboard > Settings > Environment Variables
VITE_GOOGLE_MAPS_API_KEY=your_production_key
VITE_API_ENDPOINT=https://api.yourdomain.com`}</code></pre>
          </div>

          <h2>Vercel Configuration File</h2>
          <p>Create a <code>vercel.json</code> file in your project root:</p>
          <div className={styles.codeBlock}>
            <pre><code className="language-json">{`{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}`}</code></pre>
          </div>
        </section>

        {/* Netlify Section */}
        <section id="netlify" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Deploying to Netlify</h1>
          <p className={styles.sectionIntro}>Deploy your SplitfinUI application to Netlify with continuous deployment.</p>

          <h2>Step 1: Connect to Git</h2>
          <ol className={styles.numberedList}>
            <li>Log in to Netlify</li>
            <li>Click "New site from Git"</li>
            <li>Choose your Git provider</li>
            <li>Select your repository</li>
          </ol>

          <h2>Step 2: Build Settings</h2>
          <div className={styles.infoBox}>
            <p><strong>Build command:</strong> <code>npm run build</code></p>
            <p><strong>Publish directory:</strong> <code>dist</code></p>
          </div>

          <h2>Step 3: Redirects</h2>
          <p>Create a <code>_redirects</code> file in your <code>public</code> directory:</p>
          <div className={styles.codeBlock}>
            <pre><code className="language-text">{`/* /index.html 200`}</code></pre>
          </div>

          <h2>Netlify Configuration</h2>
          <p>Create a <code>netlify.toml</code> file:</p>
          <div className={styles.codeBlock}>
            <pre><code className="language-toml">{`[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"`}</code></pre>
          </div>
        </section>

        {/* Environment Variables Section */}
        <section id="environment-vars" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Environment Variables</h1>
          <p className={styles.sectionIntro}>Configure environment variables for different deployment environments.</p>

          <h2>Variable Naming</h2>
          <div className={`${styles.infoBox} ${styles.warning}`}>
            <p><strong>Important:</strong> In Vite, all environment variables that should be accessible in the browser must be prefixed with <code>VITE_</code></p>
          </div>

          <h2>Local Development</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-bash">{`# .env.local (for local development)
VITE_GOOGLE_MAPS_API_KEY=your_dev_api_key
VITE_API_ENDPOINT=http://localhost:3000
VITE_ENABLE_ANALYTICS=false
VITE_DEBUG_MODE=true`}</code></pre>
          </div>

          <h2>Production Environment</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-bash">{`# .env.production
VITE_GOOGLE_MAPS_API_KEY=your_production_api_key
VITE_API_ENDPOINT=https://api.yourdomain.com
VITE_ENABLE_ANALYTICS=true
VITE_DEBUG_MODE=false`}</code></pre>
          </div>

          <h2>Accessing Variables</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-javascript">{`// In your React components
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const isDebug = import.meta.env.VITE_DEBUG_MODE === 'true';

// Type-safe environment variables
interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_DEBUG_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}`}</code></pre>
          </div>

          <h2>Security Best Practices</h2>
          <ul className={styles.requirementList}>
            <li>Never commit <code>.env</code> files to version control</li>
            <li>Use different API keys for development and production</li>
            <li>Restrict API keys by domain in production</li>
            <li>Rotate keys regularly</li>
            <li>Use environment-specific configuration files</li>
          </ul>
        </section>

        {/* Basic Setup Example Section */}
        <section id="basic-setup" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Basic Setup Example</h1>
          <p className={styles.sectionIntro}>A complete example of setting up a basic dashboard application with SplitfinUI.</p>

          <h2>Project Structure</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-text">{`my-dashboard/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes/
│   │   ├── Dashboard.tsx
│   │   ├── Customers.tsx
│   │   └── Settings.tsx
│   └── components/
│       └── (copy SplitfinUI components here)
├── .env.example
├── package.json
└── vite.config.ts`}</code></pre>
          </div>

          <h2>App.tsx</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MasterLayout from './components/layouts/MasterLayout';
import Login from './components/Login/Login';
import Dashboard from './routes/Dashboard';
import Customers from './routes/Customers';
import Settings from './routes/Settings';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      // Your authentication logic
      const response = await authenticate(email, password);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <MasterLayout 
              user={user} 
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="customers/*" element={<Customers />} />
          <Route path="settings/*" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;`}</code></pre>
          </div>

          <h2>Dashboard Route</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// routes/Dashboard.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import { useDashboard } from '../hooks/useDashboard';

export default function DashboardRoute() {
  const { data, loading, error, refresh } = useDashboard({
    dateRange: '30_days',
    enableCaching: true
  });

  return (
    <Routes>
      <Route 
        path="/*" 
        element={
          <Dashboard
            data={data}
            loading={loading}
            error={error}
            onRefresh={refresh}
            enableAIInsights={true}
          />
        } 
      />
    </Routes>
  );
}`}</code></pre>
          </div>
        </section>

        {/* Custom Theme Example Section */}
        <section id="custom-theme" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>Custom Theme Example</h1>
          <p className={styles.sectionIntro}>Create a custom theme for your SplitfinUI application with your brand colours.</p>

          <h2>Step 1: Define Theme Variables</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-css">{`/* styles/theme.css */
:root {
  /* Brand colours */
  --brand-primary: #FF6B6B;
  --brand-secondary: #4ECDC4;
  --brand-accent: #FFE66D;
  
  /* Override SplitfinUI variables */
  --layout-accent: var(--brand-primary);
  --layout-accent-hover: #FF5252;
  
  /* Custom gradients */
  --gradient-primary: linear-gradient(
    135deg, 
    var(--brand-primary) 0%, 
    var(--brand-secondary) 100%
  );
}

/* Light theme overrides */
.light-theme {
  --layout-bg-primary: #FAFAFA;
  --layout-text-primary: #2D3436;
  --layout-accent: var(--brand-primary);
}`}</code></pre>
          </div>

          <h2>Step 2: Create Theme Context</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'custom';
  setTheme: (theme: 'light' | 'dark' | 'custom') => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'custom'>('dark');
  const [primaryColor, setPrimaryColor] = useState('#79d5e9');

  useEffect(() => {
    // Apply theme class
    document.documentElement.className = \`\${theme}-theme\`;
    
    // Apply custom primary color
    document.documentElement.style.setProperty(
      '--layout-accent', 
      primaryColor
    );
  }, [theme, primaryColor]);

  return (
    <ThemeContext.Provider 
      value={{ theme, setTheme, primaryColor, setPrimaryColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};`}</code></pre>
          </div>

          <h2>Step 3: Theme Customiser Component</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// components/ThemeCustomizer.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const presetColors = [
  { name: 'Ocean Blue', value: '#79d5e9' },
  { name: 'Sunset Orange', value: '#FF9F00' },
  { name: 'Forest Green', value: '#10b981' },
  { name: 'Royal Purple', value: '#8b5cf6' },
  { name: 'Cherry Red', value: '#ef4444' }
];

export function ThemeCustomizer() {
  const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme();

  return (
    <div className={styles.themeCustomizer}>
      <h3>Customise Theme</h3>
      
      <div className={styles.themeSelector}>
        <label>Theme Mode</label>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value as any)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className={styles.colorPicker}>
        <label>Primary Colour</label>
        <div className={styles.colorPresets}>
          {presetColors.map(color => (
            <button
              key={color.value}
              className={\`color-preset \${
                primaryColor === color.value ? styles.active : ''
              }\`}
              style={{ backgroundColor: color.value }}
              onClick={() => setPrimaryColor(color.value)}
              title={color.name}
            />
          ))}
        </div>
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </div>
    </div>
  );
}`}</code></pre>
          </div>
        </section>

        {/* API Integration Example Section */}
        <section id="integration" className={`${styles.docSection} ${styles.active ? styles.active : ''}`}>
          <h1>API Integration Example</h1>
          <p className={styles.sectionIntro}>Connect SplitfinUI to your backend API for real-time data.</p>

          <h2>API Service Layer</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// services/api.ts
class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': \`Bearer \${this.token}\` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(\`API Error: \${response.statusText}\`);
    }

    return response.json();
  }

  // Dashboard endpoints
  async getDashboardData(params: {
    userId: string;
    dateRange: string;
  }): Promise<DashboardData> {
    return this.request('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Customer endpoints
  async getCustomers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ customers: Customer[]; total: number }> {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request(\`/api/customers?\${queryString}\`);
  }

  async getCustomer(id: string): Promise<Customer> {
    return this.request(\`/api/customers/\${id}\`);
  }

  async updateCustomer(
    id: string, 
    data: Partial<Customer>
  ): Promise<Customer> {
    return this.request(\`/api/customers/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService(
  import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000'
);`}</code></pre>
          </div>

          <h2>Custom Hook with API</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// hooks/useApiDashboard.ts
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useApiDashboard(options: {
  userId: string;
  dateRange: string;
}) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getDashboardData({
        userId: options.userId,
        dateRange: options.dateRange,
      });
      
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [options.userId, options.dateRange]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
}`}</code></pre>
          </div>

          <h2>Real-time Updates</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-typescript">{`// hooks/useRealtimeData.ts
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export function useRealtimeUpdates(
  userId: string,
  onUpdate: (data: any) => void
) {
  useEffect(() => {
    // Connect to WebSocket
    const socket: Socket = io(import.meta.env.VITE_WS_ENDPOINT, {
      auth: { userId },
    });

    // Listen for updates
    socket.on('dashboard:update', onUpdate);
    socket.on('order:new', (order) => {
      onUpdate({ type: 'new_order', data: order });
    });
    socket.on('customer:update', (customer) => {
      onUpdate({ type: 'customer_update', data: customer });
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, [userId, onUpdate]);
}`}</code></pre>
          </div>

          <h2>Error Handling</h2>
          <div className={styles.codeBlock}>
            <pre><code className="language-jsx">{`// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Send to error tracking service
    if (import.meta.env.PROD) {
      // trackError(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className={styles.errorBoundary}>
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}`}</code></pre>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;