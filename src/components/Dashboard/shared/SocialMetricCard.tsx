import React, { useMemo } from 'react';
import './SocialMetricCard.css';

// Platform interface
interface Platform {
  name: string;
  icon: React.ReactElement | string;
  current: number;
  target: number;
  color: string;
  growth: number;
  views: number;
}

// Props interface
interface SocialMetricCardProps {
  id: string;
  title: string;
  platforms: Platform[];
  trend?: {
    value: number;
    isPositive: boolean;
  };
  design?: 'grid' | 'focus' | 'pie';
  selectedPlatform?: string;
  onVariantChange?: (variant: 'grid' | 'focus' | 'pie') => void;
  onPlatformSelect?: (platform: string) => void;
  onOptionsClick?: () => void;
  cardIndex?: number;
}

const SocialMetricCard: React.FC<SocialMetricCardProps> = ({
  id,
  title,
  platforms,
  trend,
  design = 'grid',
  selectedPlatform,
  onVariantChange,
  onPlatformSelect,
  onOptionsClick,
  cardIndex = 0
}) => {
  const selectedPlatformData = platforms.find(p => p.name === selectedPlatform) || platforms[0];
  
  // Helper function to render platform icons
  const renderPlatformIcon = (platform: Platform) => {
    if (platform.name === 'Instagram') {
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="8" y="8" width="64" height="64" rx="20" stroke="currentColor" strokeWidth="6"/>
          <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="6"/>
          <circle cx="58" cy="22" r="5" fill="currentColor"/>
        </svg>
      );
    } else if (platform.name === 'Facebook') {
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
          <path d="M80 40.227c0-22.09-17.91-40-40-40s-40 17.91-40 40c0 19.967 14.627 36.513 33.75 39.513V51.95H23.593v-11.723h10.157V31.43c0-10.023 5.973-15.563 15.11-15.563 4.373 0 8.953.783 8.953.783v9.843h-5.043c-4.97 0-6.52 3.083-6.52 6.247v7.5h11.093l-1.773 11.723h-9.32v27.79C65.373 76.74 80 60.193 80 40.227z"/>
        </svg>
      );
    } else if (platform.name === 'TikTok') {
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
          <path d="M41.75.067c4.367-.067 8.7-.033 13.033-.067.267 5.1 2.1 10.3 5.834 13.9 3.733 3.7 9 5.4 14.133 5.967v13.433c-4.8-.167-9.633-1.167-14-3.233-1.9-.867-3.667-1.967-5.4-3.1-.033 9.733.033 19.467-.067 29.167-.266 4.666-1.8 9.3-4.5 13.133-4.366 6.4-11.933 10.567-19.7 10.7-4.766.267-9.533-1.033-13.6-3.433-6.733-3.967-11.466-11.234-12.166-19.034-.067-1.666-.1-3.333-.034-4.966.6-6.334 3.734-12.4 8.6-16.534 5.534-4.8 13.267-7.1 20.5-5.733.067 4.933-.133 9.867-.133 14.8-3.3-1.067-7.167-.767-10.067 1.233-2.1 1.367-3.7 3.467-4.533 5.834-.7 1.7-.5 3.566-.467 5.366.8 5.467 6.067 10.067 11.667 9.567 3.733-.033 7.3-2.2 9.233-5.367.634-1.1 1.334-2.233 1.367-3.533.333-5.967.2-11.9.233-17.867.034-13.433-.033-26.833.067-40.233z"/>
        </svg>
      );
    } else if (platform.name === 'YouTube') {
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
          <path d="M78.327 20.62a10.053 10.053 0 0 0-7.073-7.12C64.95 11.817 40 11.817 40 11.817s-24.95 0-31.256 1.683a10.057 10.057 0 0 0-7.074 7.12C0 26.9 0 40 0 40s0 13.1 1.673 19.38a10.053 10.053 0 0 0 7.074 7.12c6.303 1.683 31.253 1.683 31.253 1.683s24.95 0 31.257-1.683a10.05 10.05 0 0 0 7.073-7.12C80 53.1 80 40 80 40s0-13.1-1.673-19.38zM31.817 51.893V28.107L52.727 40 31.817 51.893z"/>
        </svg>
      );
    }
    // Fallback to emoji or provided icon
    return typeof platform.icon === 'string' ? 
      <span style={{ fontSize: '24px' }}>{platform.icon}</span> : 
      platform.icon;
  };
  
  // Generate mock chart data for focus view
  const chartData = useMemo(() => {
    const points = 30;
    const data = [];
    const baseValue = selectedPlatformData.current * 0.85;
    const growthRate = selectedPlatformData.current / baseValue;
    
    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1);
      const noise = (Math.random() - 0.5) * selectedPlatformData.current * 0.05;
      const trend = baseValue + (selectedPlatformData.current - baseValue) * Math.pow(progress, 0.8);
      data.push({
        x: i,
        y: Math.max(0, trend + noise)
      });
    }
    return data;
  }, [selectedPlatformData]);

  const renderGridView = () => (
    <div className="social-grid-view">
      {platforms.map((platform, index) => {
        const percentage = platform.target > 0 ? (platform.current / platform.target) * 100 : 0;
        const isPositive = platform.growth >= 0;
        
        return (
          <div 
            key={platform.name} 
            className="social-platform-item"
            onClick={() => onPlatformSelect?.(platform.name)}
          >
            <div className="platform-percentage">
              <span className={`percentage-arrow ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '↑' : '↓'}
              </span>
              <span className="percentage-value">{Math.round(percentage)}%</span>
            </div>
            
            <div className="platform-icon-container">
              <div className="icon-background">
                {renderPlatformIcon(platform)}
              </div>
              <div 
                className="icon-fill"
                style={{ 
                  height: `${Math.min(percentage, 100)}%`,
                  backgroundColor: platform.name === 'Instagram' ? '#5ec6cc' : platform.color
                }}
              >
                <div className="icon-fill-content">
                  {renderPlatformIcon(platform)}
                </div>
              </div>
            </div>
            
            <div className="platform-info">
              <div className="platform-name">{platform.name}</div>
              <div className="platform-stats">
                <span className="current">{platform.current}</span>
                <span className="separator">/</span>
                <span className="target">{platform.target}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderFocusView = () => {
    const percentage = selectedPlatformData.target > 0 
      ? (selectedPlatformData.current / selectedPlatformData.target) * 100 
      : 0;
    const chartColor = selectedPlatformData.name === 'Instagram' ? '#5ec6cc' : selectedPlatformData.color;

    return (
      <div className="social-focus-view">
        <div className="focus-header-info">
          <div className="timestamp-card">
            <div className="timestamp">19/07 16:09</div>
            <div className="stats-row">
              <span className="views-count">{(selectedPlatformData.views / 1000).toFixed(0)} Views</span>
              <span className="interactions-count">{Math.round(selectedPlatformData.views * 0.05)} Interactions</span>
            </div>
            <div className="platform-icon-badge">
              {renderPlatformIcon(selectedPlatformData)}
            </div>
          </div>
        </div>
        
        <div className="focus-chart-container">
          <svg viewBox="0 0 400 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: chartColor, stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: chartColor, stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            
            {/* Vertical post/story markers */}
            <line x1="100" y1="0" x2="100" y2="150" stroke="rgba(94, 198, 204, 0.3)" strokeWidth="1" />
            <line x1="250" y1="0" x2="250" y2="150" stroke="rgba(94, 198, 204, 0.3)" strokeWidth="1" />
            <line x1="350" y1="0" x2="350" y2="150" stroke="rgba(94, 198, 204, 0.3)" strokeWidth="1" />
            
            {/* Grid lines */}
            <g className="chart-grid">
              {[0, 50, 100].map(y => (
                <line key={y} x1="0" y1={150 - y * 1.5} x2="400" y2={150 - y * 1.5} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
            </g>
            
            {/* Area under curve */}
            <path
              d={`M 0,150 ${chartData.map((point, i) => 
                `L ${(i / (chartData.length - 1)) * 400},${150 - (point.y / selectedPlatformData.current) * 120}`
              ).join(' ')} L 400,150 Z`}
              fill={`url(#gradient-${id})`}
            />
            
            {/* Line */}
            <path
              d={`M ${chartData.map((point, i) => 
                `${(i / (chartData.length - 1)) * 400},${150 - (point.y / selectedPlatformData.current) * 120}`
              ).join(' L ')}`}
              fill="none"
              stroke={chartColor}
              strokeWidth="2"
            />
          </svg>
          
          {/* Post/Story labels */}
          <div className="chart-markers">
            <span className="marker" style={{ left: '25%' }}>Post</span>
            <span className="marker" style={{ left: '62.5%' }}>Story</span>
            <span className="marker" style={{ left: '87.5%', opacity: 0.5 }}>Story</span>
          </div>
          
          <div className="chart-labels">
            <span>19/07</span>
            <span>26/07</span>
          </div>
        </div>
        
        <div className="focus-metric-display">
          <span className="metric-current">{selectedPlatformData.current}</span>
          <span className="metric-separator">/</span>
          <span className="metric-target">{selectedPlatformData.target}</span>
        </div>
      </div>
    );
  };

  const renderPieView = () => {
    const total = platforms.reduce((sum, p) => sum + p.current, 0);
    const totalTarget = platforms.reduce((sum, p) => sum + p.target, 0);
    const totalViews = platforms.reduce((sum, p) => sum + p.views, 0);
    
    // Sort platforms by percentage for the legend
    const sortedPlatforms = [...platforms].sort((a, b) => b.current - a.current);
    
    return (
      <div className="social-pie-view">
        <div className="pie-chart-section">
          <svg viewBox="0 0 200 200" className="pie-chart">
            {platforms.reduce((acc, platform, index) => {
              const percentage = (platform.current / total) * 100;
              const startAngle = acc.angle;
              const endAngle = startAngle + (percentage * 3.6);
              
              const x1 = 100 + 75 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 100 + 75 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 100 + 75 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 100 + 75 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              // Use custom colors for Instagram
              const fillColor = platform.name === 'Instagram' ? '#5ec6cc' : platform.color;
              
              acc.elements.push(
                <path
                  key={platform.name}
                  d={`M 100 100 L ${x1} ${y1} A 75 75 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={fillColor}
                  onClick={() => onPlatformSelect?.(platform.name)}
                  className="pie-segment"
                  stroke="#1a1f2a"
                  strokeWidth="3"
                />
              );
              
              acc.angle = endAngle;
              return acc;
            }, { angle: 0, elements: [] as React.ReactElement[] }).elements}
            
            {/* Inner circle for donut effect */}
            <circle cx="100" cy="100" r="55" fill="#1a1f2a" />
          </svg>
        </div>
        
        <div className="pie-legend">
          {sortedPlatforms.map(platform => {
            const percentage = (platform.current / total) * 100;
            return (
              <div 
                key={platform.name} 
                className="legend-item"
                onClick={() => onPlatformSelect?.(platform.name)}
              >
                <div 
                  className="legend-color" 
                  style={{ 
                    backgroundColor: platform.name === 'Instagram' ? '#5ec6cc' : platform.color 
                  }} 
                />
                <span className="legend-name">{platform.name}</span>
                <span className="legend-percentage">{Math.round(percentage)}%</span>
                <span className="legend-views">↑ {(platform.views / 1000).toFixed(0).replace('.', ',')} Views</span>
              </div>
            );
          })}
        </div>
        
        <div className="pie-footer">
          <div className="footer-row">
            <div className="footer-label">Total vs Target</div>
            <div className="footer-label">vs Last Period</div>
          </div>
          <div className="footer-row">
            <div className="footer-value">
              <span className="current">{total}</span>
              <span className="separator">/</span>
              <span className="target">{totalTarget}</span>
            </div>
            <div className="footer-value negative">-400 Views</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`social-metric-card design-${design}`}>
      <div className="card-header">
        <div className="header-left">
          <h3 className="card-title">{title}</h3>
          {design === 'focus' && (
            <span className="card-subtitle">{selectedPlatformData.name}</span>
          )}
        </div>
        
        <div className="header-right">
          {trend && (
            <div className={`trend-indicator ${trend.isPositive ? 'positive' : 'negative'}`}>
              <span className="trend-icon">
                {trend.isPositive ? '↑' : '↓'}
              </span>
              <span className="trend-value">{trend.value}%</span>
            </div>
          )}
          
          {onOptionsClick && (
            <button className="options-button" onClick={onOptionsClick}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="10" cy="3" r="1.5"/>
                <circle cx="10" cy="10" r="1.5"/>
                <circle cx="10" cy="17" r="1.5"/>
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="card-content">
        {design === 'grid' && renderGridView()}
        {design === 'focus' && renderFocusView()}
        {design === 'pie' && renderPieView()}
      </div>
    </div>
  );
};

export default SocialMetricCard;
