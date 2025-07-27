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
import NotificationCenter from '../components/NotificationCenter';

// Types for configuration
export interface NavLink {
  to: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface NavigationSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  links?: NavLink[];
  to?: string; // For direct navigation sections
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials?: string;
}

interface MasterLayoutProps {
  user?: User;
  navigationSections?: NavigationSection[];
  logoSrc?: string;
  logoAlt?: string;
  onLogout?: () => void;
  onMessagesClick?: () => void;
  onNotificationClick?: () => void;
  unreadMessagesCount?: number;
  unreadNotificationsCount?: number;
  showThemeSelector?: boolean;
  enableBreadcrumbs?: boolean;
  customBreadcrumbNames?: Record<string, string>;
  className?: string;
  children?: React.ReactNode;
}

// Default navigation configuration
const defaultNavigationSections: NavigationSection[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <FaChartLine />,
    links: [
      { to: '/dashboard', label: 'Overview', icon: <FaChartLine /> },
      { to: '/dashboard/analytics', label: 'Analytics', icon: <FaChartLine /> },
      { to: '/dashboard/reports', label: 'Reports', icon: <FaFileInvoice /> }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: <FaUsers />,
    links: [
      { to: '/customers/new', label: 'Add New Customer', icon: <FaPlus /> },
      { to: '/customers', label: 'View All Customers', icon: <FaUsers /> },
      { to: '/customers/map', label: 'Customer Map', icon: <FaMap /> }
    ]
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <FaClipboardList />,
    links: [
      { to: '/orders/new', label: 'New Order', icon: <FaPlus /> },
      { to: '/orders', label: 'View All Orders', icon: <FaClipboardList /> },
      { to: '/orders/invoices', label: 'Invoices', icon: <FaFileInvoice /> }
    ]
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <FaBoxes />,
    links: [
      { to: '/inventory/overview', label: 'Overview', icon: <FaChartLine /> },
      { to: '/inventory/products', label: 'Products', icon: <FaBox /> },
      { to: '/inventory/warehouse', label: 'Warehouse', icon: <FaWarehouse /> }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <FaCog />,
    links: [
      { to: '/settings/general', label: 'General', icon: <FaCog /> },
      { to: '/settings/profile', label: 'Profile', icon: <FaUser /> },
      { to: '/settings/notifications', label: 'Notifications', icon: <FaBell /> }
    ]
  }
];

// Settings Dropdown Component
function SettingsDropdown({ 
  onThemeClick, 
  onProfileClick, 
  onHelpClick 
}: { 
  onThemeClick?: () => void;
  onProfileClick?: () => void;
  onHelpClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
          {onThemeClick && (
            <button onClick={() => { onThemeClick(); setIsOpen(false); }} className="settings-option">
              <FaPalette /> Theme
            </button>
          )}
          {onProfileClick && (
            <button onClick={() => { onProfileClick(); setIsOpen(false); }} className="settings-option">
              <FaUser /> Profile
            </button>
          )}
          {onHelpClick && (
            <button onClick={() => { onHelpClick(); setIsOpen(false); }} className="settings-option">
              <FaQuestionCircle /> Help
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Breadcrumbs Component
function Breadcrumbs({ 
  customBreadcrumbNames = {} 
}: { 
  customBreadcrumbNames?: Record<string, string> 
}) {
  const location = useLocation();
  
  const defaultBreadcrumbNames: Record<string, string> = {
    dashboard: 'Dashboard',
    customers: 'Customers',
    new: 'New',
    orders: 'Orders',
    approval: 'Approvals',
    invoices: 'Invoices',
    inventory: 'Inventory',
    products: 'Products',
    images: 'Images',
    items: 'Items',
    edit: 'Edit',
    reports: 'Reports',
    analytics: 'Analytics',
    settings: 'Settings',
    profile: 'Profile',
    help: 'Help',
    map: 'Map',
    management: 'Management',
    overview: 'Overview',
    warehouse: 'Warehouse',
    general: 'General',
    notifications: 'Notifications',
    security: 'Security',
    ...customBreadcrumbNames
  };
  
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    // Don't show breadcrumbs on dashboard root
    if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
      return [];
    }
    
    return pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      const name = defaultBreadcrumbNames[value] || value.charAt(0).toUpperCase() + value.slice(1);
      
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



// Theme Selector Component (placeholder)
function ThemeSelector({ 
  isEmbedded = false, 
  onClose 
}: { 
  isEmbedded?: boolean;
  onClose?: () => void;
}) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'auto'>('dark');

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setCurrentTheme(theme);
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      // Auto theme - use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
      } else {
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme');
      }
    }
    
    // Store preference
    localStorage.setItem('theme-preference', theme);
    
    if (onClose) {
      onClose();
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme-preference') as 'light' | 'dark' | 'auto' | null;
    if (stored) {
      setCurrentTheme(stored);
      handleThemeChange(stored);
    }
  }, []);

  if (isEmbedded) {
    return (
      <div className="theme-selector-embedded">
        <div className="theme-options">
          {(['light', 'dark', 'auto'] as const).map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={`theme-option ${currentTheme === theme ? 'active' : ''}`}
            >
              {theme === 'light' && '☀️'}
              {theme === 'dark' && '🌙'}
              {theme === 'auto' && '🔄'}
              <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="theme-selector-standalone">
      <button 
        className="theme-toggle-btn"
        onClick={() => handleThemeChange(currentTheme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle theme"
      >
        <FaPalette />
        <span>{currentTheme === 'dark' ? 'Dark' : 'Light'}</span>
      </button>
    </div>
  );
}

export default function MasterLayout({
  user,
  navigationSections = defaultNavigationSections,
  logoSrc = '/logos/splitfinrow.png',
  logoAlt = 'Company Logo',
  onLogout,
  onMessagesClick,
  onNotificationClick,
  unreadMessagesCount = 0,
  unreadNotificationsCount = 0,
  showThemeSelector = true,
  enableBreadcrumbs = true,
  customBreadcrumbNames = {},
  className = '',
  children
}: MasterLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Default user if none provided
  const defaultUser: User = {
    id: 'demo-user',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'admin',
    initials: 'DU'
  };

  const currentUser = user || defaultUser;

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  // Auto-open sections based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    navigationSections.forEach(section => {
      if (section.links) {
        const hasActiveLink = section.links.some(link => 
          currentPath.startsWith(link.to) || 
          (section.id === 'dashboard' && currentPath.startsWith('/dashboard')) ||
          (section.id === 'settings' && currentPath.startsWith('/settings'))
        );
        
        if (hasActiveLink && !openSections.has(section.id)) {
          setOpenSections(prev => new Set([...prev, section.id]));
        }
      }
    });
  }, [location.pathname, navigationSections, openSections]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      localStorage.clear();
      navigate('/login');
    }
  };



  const handleSettingsActions = {
    onThemeClick: () => {
      // Theme selector is handled by the ThemeSelector component
    },
    onProfileClick: () => {
      navigate('/settings/profile');
    },
    onHelpClick: () => {
      navigate('/help');
    }
  };

  const getUserInitials = (user: User): string => {
    if (user.initials) return user.initials;
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderNavLinks = () => (
    navigationSections.map(section => {
      const isOpen = openSections.has(section.id);
      const hasSubItems = section.links && section.links.length > 0;
      
      // If section has direct navigation (no sub-links)
      if (section.to && !hasSubItems) {
        return (
          <Link 
            key={section.id} 
            to={section.to} 
            className={`master-sidebar-nav-item ${location.pathname === section.to ? 'active' : ''}`}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-text">{section.label}</span>
          </Link>
        );
      }

      // Section with sub-items
      return (
        <div key={section.id} className="master-sidebar-nav-section">
          <button 
            className={`master-sidebar-nav-item ${isOpen ? 'active' : ''} ${location.pathname.startsWith(`/${section.id}`) ? 'active' : ''}`} 
            onClick={() => toggleSection(section.id)}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-text">{section.label}</span>
            {hasSubItems && (
              <span className="nav-chevron">
                {isOpen ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </button>
          {hasSubItems && (
            <div className={`master-sidebar-dropdown ${isOpen ? 'open' : ''}`}>
              {section.links!.map(link => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`master-sidebar-dropdown-item ${location.pathname === link.to ? 'active' : ''}`}
                >
                  {link.icon && <span className="dropdown-icon">{link.icon}</span>}
                  <span className="dropdown-text">
                    {link.label}
                    {link.badge && <span className="nav-badge">{link.badge}</span>}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    })
  );

  if (!currentUser && !user) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`master-layout-container ${className}`}>
      {/* Desktop Sidebar */}
      <nav className="master-sidebar-nav desktop-only">
        {/* Top Actions Bar */}
        <div className="master-sidebar-top-actions">
          <NotificationCenter 
            onClick={onNotificationClick}
            unreadCount={unreadNotificationsCount}
          />
          <button 
            className="master-sidebar-action-btn messages-btn"
            onClick={onMessagesClick}
          >
            <FaEnvelope />
            {unreadMessagesCount > 0 && (
              <span className="action-badge">{unreadMessagesCount}</span>
            )}
          </button>
          <SettingsDropdown {...handleSettingsActions} />
          <button 
            className="master-sidebar-action-btn logout-btn"
            onClick={handleLogout}
          >
            <FaPowerOff />
          </button>
        </div>

        {/* User Section */}
        <div className="master-sidebar-user-section">
          <div className="master-user-avatar">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} />
            ) : (
              <span>{getUserInitials(currentUser)}</span>
            )}
          </div>
          <div className="master-user-info">
            <h4>{currentUser.name}</h4>
            <p>{currentUser.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 'User'}</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="master-sidebar-nav-sections">
          {renderNavLinks()}
        </div>

        {/* Logo at Bottom */}
        <div className="master-sidebar-footer">
          <div className="master-sidebar-logo">
            <img src={logoSrc} alt={logoAlt} className="master-logo-image" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="master-main-content">
        {/* Desktop Header Bar with Breadcrumbs */}
        {enableBreadcrumbs && (
          <div className="master-header-bar desktop-only">
            <div className="master-header-left">
              <Breadcrumbs customBreadcrumbNames={customBreadcrumbNames} />
            </div>
          </div>
        )}

        {/* Mobile Top Bar */}
        <header className="master-mobile-top-bar mobile-only">
          <div className="master-sidebar-logo">
            <img src={logoSrc} alt={logoAlt} className="master-mobile-logo" />
          </div>
          <div className="master-mobile-controls">
            <NotificationCenter 
              onClick={onNotificationClick}
              unreadCount={unreadNotificationsCount}
            />
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
            <div className="master-user-avatar">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} />
              ) : (
                <span>{getUserInitials(currentUser)}</span>
              )}
            </div>
            <div className="master-user-info">
              <h4>{currentUser.name}</h4>
              <p>{currentUser.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 'User'}</p>
            </div>
          </div>
          <div className="master-sidebar-nav-sections">
            {renderNavLinks()}
          </div>
          <div className="master-mobile-nav-footer">
            {showThemeSelector && <ThemeSelector />}
            <button onClick={handleLogout} className="master-logout-btn">
              <FaPowerOff />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <div className="master-content-area">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}