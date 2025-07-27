import React from 'react';
import './SocialMetricCard.css';

// Platform interface
interface Platform {
  name: string;
  icon: React.ReactElement;
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

  const renderGridView = () => (
    <div className="social-grid-view">
      {platforms.map((platform, index) => {
        const percentage = platform.target > 0 ? (platform.current / platform.target) * 100 : 0;
        
        return (
          <div 
            key={platform.name} 
            className="social-platform-item"
            onClick={() => onPlatformSelect?.(platform.name)}
          >
            <div className="platform-header">
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
            </div>
            
            <div className="platform-metrics">
              <div className="followers-count">
                <span className="current">{platform.current.toLocaleString()}</span>
                <span className="separator">/</span>
                <span className="target">{platform.target.toLocaleString()}</span>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: platform.color
                  }}
                />
              </div>
              
              <div className="platform-stats">
                <span className={`growth ${platform.growth >= 0 ? 'positive' : 'negative'}`}>
                  {platform.growth >= 0 ? '+' : ''}{platform.growth}%
                </span>
                <span className="views">{(platform.views / 1000).toFixed(1)}k views</span>
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

    return (
      <div className="social-focus-view">
        <div className="platform-selector">
          {platforms.map(platform => (
            <button
              key={platform.name}
              className={`platform-button ${selectedPlatform === platform.name ? 'active' : ''}`}
              onClick={() => onPlatformSelect?.(platform.name)}
              style={{ 
                color: selectedPlatform === platform.name ? platform.color : undefined 
              }}
            >
              {platform.icon}
            </button>
          ))}
        </div>
        
        <div className="focus-content">
          <div className="focus-icon" style={{ color: selectedPlatformData.color }}>
            {selectedPlatformData.icon}
          </div>
          
          <h3 className="platform-name">{selectedPlatformData.name}</h3>
          
          <div className="focus-metrics">
            <div className="metric-value">
              <span className="current">{selectedPlatformData.current.toLocaleString()}</span>
              <span className="label">Followers</span>
            </div>
            
            <div className="metric-value">
              <span className="target">{selectedPlatformData.target.toLocaleString()}</span>
              <span className="label">Target</span>
            </div>
          </div>
          
          <div className="circular-progress">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="5"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={selectedPlatformData.color}
                strokeWidth="5"
                strokeDasharray={`${percentage * 2.83} 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="percentage">{Math.round(percentage)}%</div>
          </div>
          
          <div className="focus-stats">
            <div className={`stat growth ${selectedPlatformData.growth >= 0 ? 'positive' : 'negative'}`}>
              <span className="stat-value">
                {selectedPlatformData.growth >= 0 ? '+' : ''}{selectedPlatformData.growth}%
              </span>
              <span className="stat-label">Growth</span>
            </div>
            
            <div className="stat views">
              <span className="stat-value">{(selectedPlatformData.views / 1000).toFixed(1)}k</span>
              <span className="stat-label">Views</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPieView = () => {
    const total = platforms.reduce((sum, p) => sum + p.current, 0);
    
    return (
      <div className="social-pie-view">
        <div className="pie-chart">
          <svg viewBox="0 0 100 100">
            {platforms.reduce((acc, platform, index) => {
              const percentage = (platform.current / total) * 100;
              const startAngle = acc.angle;
              const endAngle = startAngle + (percentage * 3.6);
              
              const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              acc.elements.push(
                <path
                  key={platform.name}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={platform.color}
                  onClick={() => onPlatformSelect?.(platform.name)}
                  className="pie-segment"
                />
              );
              
              acc.angle = endAngle;
              return acc;
            }, { angle: 0, elements: [] as React.ReactElement[] }).elements}
          </svg>
          
          <div className="pie-center">
            <span className="total-followers">{total.toLocaleString()}</span>
            <span className="label">Total</span>
          </div>
        </div>
        
        <div className="pie-legend">
          {platforms.map(platform => (
            <div 
              key={platform.name} 
              className="legend-item"
              onClick={() => onPlatformSelect?.(platform.name)}
            >
              <span 
                className="legend-color" 
                style={{ backgroundColor: platform.color }} 
              />
              <span className="legend-name">{platform.name}</span>
              <span className="legend-value">{platform.current.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`social-metric-card design-${design}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        
        {trend && (
          <div className={`trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            <span className="trend-icon">
              {trend.isPositive ? '↑' : '↓'}
            </span>
            <span className="trend-value">{trend.value}%</span>
          </div>
        )}
        
        <div className="card-actions">
          <select 
            className="design-selector"
            value={design}
            onChange={(e) => onVariantChange?.(e.target.value as 'grid' | 'focus' | 'pie')}
          >
            <option value="grid">Grid View</option>
            <option value="focus">Focus View</option>
            <option value="pie">Pie Chart</option>
          </select>
          
          {onOptionsClick && (
            <button className="options-button" onClick={onOptionsClick}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="2" r="1.5"/>
                <circle cx="8" cy="8" r="1.5"/>
                <circle cx="8" cy="14" r="1.5"/>
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
