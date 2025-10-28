import React, { useState, useEffect } from 'react';
import styles from './AnimatedHeaders.module.css';

// TypeScript interfaces
export interface BaseHeaderProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export interface TypewriterProps extends BaseHeaderProps {
  speed?: number;
  showCursor?: boolean;
  cursorChar?: string;
}

export interface GlitchProps extends BaseHeaderProps {
  intensity?: 'low' | 'medium' | 'high';
}

export interface GradientProps extends BaseHeaderProps {
  colors?: string[];
}

// 1. Typewriter Effect Component
export const TypewriterHeader: React.FC<TypewriterProps> = ({
  children,
  className = '',
  speed = 50,
  showCursor = true,
  cursorChar = '|',
  delay = 0
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <h1 className={`${styles.typewriter} ${className}`}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className={styles.cursor}>{cursorChar}</span>
      )}
    </h1>
  );
};

// 2. Fade In Slide Up Component
export const FadeInSlideHeader: React.FC<BaseHeaderProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <h1
      className={`${styles.fadeSlide} ${isVisible ? styles.fadeSlideVisible : ''} ${className}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </h1>
  );
};

// 3. Glitch Effect Component
export const GlitchHeader: React.FC<GlitchProps> = ({
  children,
  className = '',
  intensity = 'medium',
  delay = 0
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <h1
      className={`${styles.glitch} ${styles[`glitch-${intensity}`]} ${isActive ? styles.glitchActive : ''} ${className}`}
      data-text={children}
    >
      {children}
    </h1>
  );
};

// 4. Gradient Text Animation Component
export const GradientHeader: React.FC<GradientProps> = ({
  children,
  className = '',
  colors = ['#8b5cf6', '#06b6d4', '#10b981'],
  delay = 0,
  duration = 3000
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const gradientStyle = {
    background: `linear-gradient(45deg, ${colors.join(', ')})`,
    animationDuration: `${duration}ms`,
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    color: 'transparent',
    display: 'inline-block'
  };

  return (
    <h1
      className={`${styles.gradient} ${isActive ? styles.gradientActive : ''} ${className}`}
      style={gradientStyle}
    >
      {children}
    </h1>
  );
};

// 5. Split Text Animation Component
export const SplitTextHeader: React.FC<BaseHeaderProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 800
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <h1 className={`${styles.splitText} ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`${styles.splitChar} ${isVisible ? styles.splitCharVisible : ''}`}
          style={{
            animationDelay: `${index * 50}ms`,
            animationDuration: `${duration}ms`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
};

// 6. Bounce In Component
export const BounceHeader: React.FC<BaseHeaderProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1200
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <h1
      className={`${styles.bounce} ${isVisible ? styles.bounceVisible : ''} ${className}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </h1>
  );
};

// 7. Scale Up Component
export const ScaleHeader: React.FC<BaseHeaderProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <h1
      className={`${styles.scale} ${isVisible ? styles.scaleVisible : ''} ${className}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </h1>
  );
};

// 8. Neon Glow Component
export const NeonHeader: React.FC<BaseHeaderProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <h1
      className={`${styles.neon} ${isActive ? styles.neonActive : ''} ${className}`}
    >
      {children}
    </h1>
  );
};

// 9. Blur In Component
export interface BlurInProps extends BaseHeaderProps {
  variant?: 'blurIn' | 'blurInUp' | 'blurInDown';
  splitBy?: 'word' | 'character' | 'line';
  staggerDelay?: number;
}

export const BlurInHeader: React.FC<BlurInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1000,
  variant = 'blurIn',
  splitBy = 'word',
  staggerDelay = 50
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Extract text content from children
  const getText = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (React.isValidElement(children) && children.props.children) {
      return getText(children.props.children);
    }
    if (Array.isArray(children)) {
      return children.map(child => getText(child)).join('');
    }
    return '';
  };
  
  const text = getText(children);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const splitText = () => {
    switch (splitBy) {
      case 'character':
        return text.split('').map((char, index) => ({
          content: char === ' ' ? '\u00A0' : char,
          index
        }));
      case 'word':
        return text.split(' ').map((word, index) => ({
          content: word,
          index
        }));
      case 'line':
        return text.split('\n').map((line, index) => ({
          content: line,
          index
        }));
      default:
        return [{ content: text, index: 0 }];
    }
  };

  const textParts = splitText();

  // If children is a JSX element, clone it and apply the animation to the text inside
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: `${children.props.className || ''} ${styles.blurIn} ${className}`,
      children: textParts.map((part, index) => (
        <React.Fragment key={index}>
          <span
            className={`${styles.blurInPart} ${styles[`blurIn-${variant}`]} ${isVisible ? styles.blurInVisible : ''}`}
            style={{
              animationDelay: `${index * staggerDelay}ms`,
              animationDuration: `${duration}ms`
            }}
          >
            {part.content}
          </span>
          {splitBy === 'word' && index < textParts.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))
    });
  }

  // Default behavior for string children
  return (
    <h1 className={`${styles.blurIn} ${className}`}>
      {textParts.map((part, index) => (
        <React.Fragment key={index}>
          <span
            className={`${styles.blurInPart} ${styles[`blurIn-${variant}`]} ${isVisible ? styles.blurInVisible : ''}`}
            style={{
              animationDelay: `${index * staggerDelay}ms`,
              animationDuration: `${duration}ms`
            }}
          >
            {part.content}
          </span>
          {splitBy === 'word' && index < textParts.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </h1>
  );
};