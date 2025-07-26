// ProgressLoader Component - SplitfinUI Pack
import React, { useEffect, useState } from 'react';
import './ProgressLoader.css';

interface ProgressLoaderProps {
  progress: number; // 0-100
  message?: string;
  messages?: string[];
  submessage?: string;
  size?: number;
  showAnimation?: boolean;
  variant?: 'default' | 'minimal' | 'circular';
  color?: string;
}

export const ProgressLoader: React.FC<ProgressLoaderProps> = ({ 
  progress, 
  message = 'Loading...', 
  messages,
  submessage,
  size = 100,
  showAnimation = true,
  variant = 'default',
  color = '#79d5e9'
}) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!messages || messages.length <= 1) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 1200);
    return () => clearInterval(interval);
  }, [messages]);

  const displayMessage = messages && messages.length > 0 ? messages[msgIndex] : message;

  const renderLoader = () => {
    if (variant === 'circular') {
      const circumference = 2 * Math.PI * 45;
      const strokeDashoffset = circumference - (progress / 100) * circumference;

      return (
        <div className="circular-loader" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox="0 0 100 100">
            <circle
              className="circular-loader-track"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
            />
            <circle
              className="circular-loader-progress"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              stroke={color}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="circular-loader-text">
            <span className="circular-percentage">{Math.round(progress)}%</span>
          </div>
        </div>
      );
    }

    if (variant === 'minimal') {
      return (
        <div className="minimal-loader">
          <div className="minimal-progress-bar">
            <div 
              className="minimal-progress-fill"
              style={{ 
                width: `${Math.min(100, Math.max(0, progress))}%`,
                backgroundColor: color
              }}
            />
          </div>
        </div>
      );
    }

    // Default variant with animation
    return (
      <>
        {showAnimation && (
          <div className="splitfin-loader" style={{ width: size, height: size }}>
            <div className="loader-wave">
              <div className="wave-dot" style={{ backgroundColor: color }}></div>
              <div className="wave-dot" style={{ backgroundColor: color }}></div>
              <div className="wave-dot" style={{ backgroundColor: color }}></div>
              <div className="wave-dot" style={{ backgroundColor: color }}></div>
              <div className="wave-dot" style={{ backgroundColor: color }}></div>
            </div>
          </div>
        )}
        <div className="progress-info">
          <h3 className={`progress-message progress-fade${fade ? ' in' : ' out'}`}>
            {displayMessage}
          </h3>
          {submessage && <p className="progress-submessage">{submessage}</p>}
        </div>
        <div className="progress-loader-bar-container">
          <div className="progress-loader-bar">
            <div 
              className="progress-bar-fill"
              style={{ 
                width: `${Math.min(100, Math.max(0, progress))}%`,
                background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`
              }}
            />
          </div>
          <span className="progress-percentage" style={{ color }}>
            {Math.round(progress)}%
          </span>
        </div>
      </>
    );
  };

  return (
    <div className={`progress-loader-container ${variant}`}>
      <div className="progress-loader-content">
        {renderLoader()}
      </div>
    </div>
  );
};

// Export for simple usage
export default ProgressLoader;
