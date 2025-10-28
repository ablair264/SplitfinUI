import React, { useState, useEffect, useRef } from 'react';
import { GradientHeader, GradientProps } from './AnimatedHeaders';

interface ScrollAwareGradientHeaderProps extends Omit<GradientProps, 'delay'> {
  threshold?: number; // Percentage of element visible before triggering (0-1)
  rootMargin?: string; // Root margin for intersection observer
}

export const ScrollAwareGradientHeader: React.FC<ScrollAwareGradientHeaderProps> = ({
  children,
  className = '',
  colors = ['#8b5cf6', '#06b6d4', '#10b981'],
  duration = 3000,
  threshold = 0.3,
  rootMargin = '0px 0px -20% 0px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible, threshold, rootMargin]);

  return (
    <div ref={elementRef}>
      {isVisible && (
        <GradientHeader
          className={className}
          colors={colors}
          duration={duration}
          delay={0}
        >
          {children}
        </GradientHeader>
      )}
      {!isVisible && (
        <h1 className={className} style={{ 
          background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          display: 'inline-block'
        }}>
          {children}
        </h1>
      )}
    </div>
  );
};

export default ScrollAwareGradientHeader;