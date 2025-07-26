// src/layouts/MasterLayout.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  FaChartLine, FaUsers, FaClipboardList, FaWarehouse, FaShoppingCart, FaCog, 
  FaPowerOff, FaChevronDown, FaChevronRight, FaPlus, FaKey, FaBars, FaTimes,
  FaMap, FaUserPlus, FaEnvelope, FaBell, FaFileInvoice, FaUserTie, FaFileAlt,
  FaUser, FaQuestionCircle, FaPalette, FaHome, FaDatabase, FaShieldAlt,
  FaBoxes, FaBox, FaImages, FaBook, FaFileAlt as FaCatalogue
} from 'react-icons/fa';
import './MasterLayout.css';

type Section = 'Dashboard' | 'Analytics' | 'Components' | 'Forms' | 'Tables' | 'Charts' | 'Pages' | 'Settings';

interface NavLink {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  uid: 'demo-user-123'
};

// Settings Dropdown Component
function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowThemeDropdown(false);
      }
    }

    if (isOpen || showThemeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, showThemeDropdown]);

  const handleThemeClick = () => {
    setShowThemeDropdown(!showThemeDropdown);
    setIsOpen(false);
  };

  return (
    <div className="settings-dropdown-wrapper" ref={dropdownRef}>
      <button 
        className="master-sidebar-action-btn settings-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Settings"
      >
        <FaCog />
      </button>
      
      {isOpen && (
        <div className="settings-dropdown">
          <button onClick={handleThemeClick} className="settings-option">
            <FaPalette /> Theme
          </button>
          <button onClick={() => { navigate('/profile'); setIsOpen(false); }} className="settings-option">
            <FaUser /> Profile
          </button>
          <button onClick={() => { navigate('/help'); setIsOpen(false); }} className="settings-option">
            <FaQuestionCircle /> Help
          </button>
        </div>
      )}
      
      {showThemeDropdown && (
        <div className="theme-dropdown-wrapper">
          <div className="theme-selector">
            <button onClick={() => setShowThemeDropdown(false)}>Light Theme</button>
            <button onClick={() => setShowThemeDropdown(false)}>Dark Theme</button>
            <button onClick={() => setShowThemeDropdown(false)}>Auto</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Breadcrumbs() {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    // Don't show breadcrumbs on dashboard
    if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
      return [];
    }
    
    const breadcrumbNameMap: { [key: string]: string } = {
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      components: 'Components',
      forms: 'Forms',
      tables: 'Tables',
      charts: 'Charts',
      pages: 'Pages',
      settings: 'Settings',
      profile: 'Profile',
      help: 'Help',
      metrics: 'Metrics',
      reports: 'Reports',
      cards: 'Cards',
      buttons: 'Buttons',
      inputs: 'Inputs',
      datatables: 'Data Tables',
      advanced: 'Advanced',
      basic: 'Basic',
      line: 'Line Charts',
      bar: 'Bar Charts',
      pie: 'Pie Charts',
      login: 'Login',
      register: 'Register',
      error: 'Error Pages'
    };
    
    return pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      const name = breadcrumbNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);
      
      return { name, to, isLast };
    });
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length === 0) {
    return null;
  }
  
  return (
    <div className="breadcrumbs">
      <Link to="/dashboard" className="breadcrumb-item">
        <FaHome className="breadcrumb-icon" />
        <span>Home</span>
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.to}>
          <span className="breadcrumb-separator">/</span>
          {breadcrumb.isLast ? (
            <span className="breadcrumb-item active">{breadcrumb.name}</span>
          ) : (
            <Link to={breadcrumb.to} className="breadcrumb-item">
              {breadcrumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function MasterLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useState(mockUser);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  // Auto-open sections when on their respective pages
  useEffect(() => {
    if (location.pathname.startsWith('/settings') && !openSections.has('Settings')) {
      setOpenSections(prev => new Set([...prev, 'Settings']));
    }
    if (location.pathname.startsWith('/dashboard') && !openSections.has('Dashboard')) {
      setOpenSections(prev => new Set([...prev, 'Dashboard']));
    }
    if (location.pathname.startsWith('/components') && !openSections.has('Components')) {
      setOpenSections(prev => new Set([...prev, 'Components']));
    }
  }, [location.pathname, openSections]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getSectionConfig = () => {
    const config: Record<Section, { icon: React.ReactNode; links: NavLink[] }> = {
      Dashboard: {
        icon: <FaChartLine />,
        links: [
          { to: '/dashboard', label: 'Overview', icon: <FaChartLine /> },
          { to: '/dashboard/analytics', label: 'Analytics', icon: <FaChartLine /> },
          { to: '/dashboard/reports', label: 'Reports', icon: <FaFileAlt /> },
        ]
      },
      Analytics: {
        icon: <FaChartLine />,
        links: [
          { to: '/analytics/metrics', label: 'Metrics', icon: <FaChartLine /> },
          { to: '/analytics/reports', label: 'Reports', icon: <FaFileAlt /> },
          { to: '/analytics/insights', label: 'AI Insights', icon: <FaChartLine /> },
        ]
      },
      Components: {
        icon: <FaBox />,
        links: [
          { to: '/components/cards', label: 'Cards', icon: <FaBox /> },
          { to: '/components/buttons', label: 'Buttons', icon: <FaBox /> },
          { to: '/components/modals', label: 'Modals', icon: <FaBox /> },
          { to: '/components/charts', label: 'Charts', icon: <FaChartLine /> },
        ]
      },
      Forms: {
        icon: <FaFileAlt />,
        links: [
          { to: '/forms/basic', label: 'Basic Forms', icon: <FaFileAlt /> },
          { to: '/forms/advanced', label: 'Advanced Forms', icon: <FaFileAlt /> },
          { to: '/forms/validation', label: 'Validation', icon: <FaShieldAlt /> },
        ]
      },
      Tables: {
        icon: <FaClipboardList />,
        links: [
          { to: '/tables/basic', label: 'Basic Tables', icon: <FaClipboardList /> },
          { to: '/tables/datatables', label: 'Data Tables', icon: <FaDatabase /> },
          { to: '/tables/responsive', label: 'Responsive', icon: <FaClipboardList /> },
        ]
      },
      Charts: {
        icon: <FaChartLine />,
        links: [
          { to: '/charts/line', label: 'Line Charts', icon: <FaChartLine /> },
          { to: '/charts/bar', label: 'Bar Charts', icon: <FaChartLine /> },
          { to: '/charts/pie', label: 'Pie Charts', icon: <FaChartLine /> },
        ]
      },
      Pages: {
        icon: <FaFileAlt />,
        links: [
          { to: '/pages/login', label: 'Login', icon: <FaUser /> },
          { to: '/pages/register', label: 'Register', icon: <FaUserPlus /> },
          { to: '/pages/error', label: 'Error Pages', icon: <FaFileAlt /> },
        ]
      },
      Settings: {
        icon: <FaCog />,
        links: [
          { to: '/settings/general', label: 'General', icon: <FaCog /> },
          { to: '/settings/profile', label: 'Profile', icon: <FaUser /> },
          { to: '/settings/notifications', label: 'Notifications', icon: <FaBell /> },
          { to: '/settings/security', label: 'Security', icon: <FaShieldAlt /> }
        ]
      }
    };
    return config;
  };

  const availableSections: Section[] = ['Dashboard', 'Analytics', 'Components', 'Forms', 'Tables', 'Charts', 'Pages', 'Settings'];
  const sectionConfig = getSectionConfig();
  
  const renderNavLinks = () => (
    availableSections.map(section => {
      const config = sectionConfig[section];
      const isOpen = openSections.has(section);
      const hasSubItems = config.links.length > 0;
      
      return (
        <div key={section} className="master-sidebar-nav-section">
          <button 
            className={`master-sidebar-nav-item ${isOpen ? 'active' : ''} ${location.pathname.startsWith(`/${section.toLowerCase()}`) ? 'active' : ''}`} 
            onClick={() => toggleSection(section)}
          >
            <span className="nav-icon">{config.icon}</span>
            <span className="nav-text">{section}</span>
            {hasSubItems && <span className="nav-chevron">{isOpen ? <FaChevronDown /> : <FaChevronRight />}</span>}
          </button>
          {hasSubItems && (
            <div className={`master-sidebar-dropdown ${isOpen ? 'open' : ''}`}>
              {config.links.map(link => (
                <Link key={link.to} to={link.to} className={`master-sidebar-dropdown-item ${location.pathname === link.to ? 'active' : ''}`}>
                  {link.icon && <span className="dropdown-icon">{link.icon}</span>}
                  <span className="dropdown-text">{link.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    })
  );

  return (
    <div className="master-layout-container">
      {/* Desktop Sidebar */}
      <nav className="master-sidebar-nav desktop-only">
        {/* Top Actions Bar */}
        <div className="master-sidebar-top-actions">
          <button 
            className="master-sidebar-action-btn"
            onClick={() => {}}
          >
            <FaBell />
            {notifications > 0 && (
              <span className="action-badge">{notifications}</span>
            )}
          </button>
          <button 
            className="master-sidebar-action-btn messages-btn"
            onClick={() => {}}
          >
            <FaEnvelope />
            <span className="action-badge">5</span>
          </button>
          <button 
            className="master-sidebar-action-btn logout-btn"
            onClick={handleLogout}
          >
            <FaPowerOff />
          </button>
        </div>

        {/* User Section */}
        <div className="master-sidebar-user-section">
          <div className="master-user-avatar"><span>{user.name.charAt(0).toUpperCase()}</span></div>
          <div className="master-user-info">
            <h4>{user.name}</h4>
            <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="master-sidebar-nav-sections">
          {renderNavLinks()}
        </div>

        {/* Logo at Bottom */}
        <div className="master-sidebar-footer">
          <div className="master-sidebar-logo">
            <img src="/splitfin-white.png" alt="Splitfin Logo" className="master-logo-image" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="master-main-content">
        {/* Desktop Header Bar with Breadcrumbs */}
        <div className="master-header-bar desktop-only">
          <div className="master-header-left">
            <Breadcrumbs />
          </div>
        </div>

        {/* Mobile Top Bar */}
        <header className="master-mobile-top-bar mobile-only">
          <div className="master-sidebar-logo">
            <img src="/splitfin-white.png" alt="Splitfin Logo" className="master-mobile-logo" />
          </div>
          <div className="master-mobile-controls">
            <button 
              className="master-sidebar-action-btn"
              onClick={() => {}}
            >
              <FaBell />
              {notifications > 0 && (
                <span className="action-badge">{notifications}</span>
              )}
            </button>
            <button 
              type="button"
              className="master-mobile-menu-toggle" 
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              {isMobileNavOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isMobileNavOpen && (
          <div 
            className="master-mobile-overlay mobile-only"
            onClick={() => setIsMobileNavOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <nav className={`master-mobile-nav mobile-only ${isMobileNavOpen ? 'open' : ''}`}>
          <div className="master-mobile-nav-header">
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="master-mobile-close"
            >
              <FaTimes />
            </button>
          </div>
          <div className="master-mobile-user-section">
            <div className="master-user-avatar"><span>{user.name.charAt(0).toUpperCase()}</span></div>
            <div className="master-user-info">
              <h4>{user.name}</h4>
              <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>
          <div className="master-sidebar-nav-sections">
            {renderNavLinks()}
          </div>
          <div className="master-mobile-nav-footer">
            <button onClick={handleLogout} className="master-logout-btn">
              <FaPowerOff />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <div className="master-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}