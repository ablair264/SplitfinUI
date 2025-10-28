import React, { useState } from 'react';
import {
  TypewriterHeader,
  FadeInSlideHeader,
  GlitchHeader,
  GradientHeader,
  SplitTextHeader,
  BounceHeader,
  ScaleHeader,
  NeonHeader
} from './AnimatedHeaders';
import styles from './AnimatedHeadersDemo.module.css';

const AnimatedHeadersDemo: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);

  const resetAnimations = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Animated Header Components</h1>
        <p className={styles.subtitle}>
          A collection of beautiful animated text headers for your landing pages
        </p>
        <button onClick={resetAnimations} className={styles.resetButton}>
          Reset Animations
        </button>
      </div>

      <div className={styles.grid} key={resetKey}>
        {/* Typewriter Effect */}
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3>Typewriter Effect</h3>
            <div className={styles.codeSnippet}>
              {`<TypewriterHeader speed={50} showCursor={true}>
  Welcome to Splitfin
</TypewriterHeader>`}
            </div>
          </div>
          <div className={styles.cardContent}>
            <TypewriterHeader speed={50} showCursor={true} delay={500}>
              Welcome to Splitfin
            </TypewriterHeader>
          </div>
        </div>

        {/* Fade In Slide */}
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3>Fade In Slide Up</h3>
            <div className={styles.codeSnippet}>
              {`<FadeInSlideHeader duration={1000}>
  Streamline Your Business
</FadeInSlideHeader>`}
            </div>
          </div>
          <div className={styles.cardContent}>
            <FadeInSlideHeader duration={1000} delay={800}>
              Streamline Your Business
            </FadeInSlideHeader>
          </div>
        </div>

        {/* Glitch Effect */}
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3>Glitch Effect</h3>
            <div className={styles.codeSnippet}>
              {`<GlitchHeader intensity="medium">
  Digital Innovation
</GlitchHeader>`}
            </div>
          </div>
          <div className={styles.cardContent}>
            <GlitchHeader intensity="medium" delay={1200}>
              Digital Innovation
            </GlitchHeader>
          </div>
        </div>

        {/* Gradient Animation */}
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3>Gradient Animation</h3>
            <div className={styles.codeSnippet}>
              {`<GradientHeader 
  colors={['#8b5cf6', '#06b6d4', '#10b981']}
>
  Powerful Analytics
</GradientHeader>`}
            </div>
          </div>
          <div className={styles.cardContent}>
            <GradientHeader 
              colors={['#8b5cf6', '#06b6d4', '#10b981']}
              delay={1600}
            >
              Powerful Analytics
            </GradientHeader>
          </div>
        </div>

        {/* Split Text */}
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3>Split Text Animation</h3>
            <div className={styles.codeSnippet}>
              {`<SplitTextHeader duration={800}>
  Transform Ideas
</SplitTextHeader>`}
            </div>
          </div>
          <div className={styles.cardContent}>
            <SplitTextHeader duration={800} delay={2000}>
              Transform Ideas
            </SplitTextHeader>
          </div>
        </div>

        {/* Bounce Effect */}
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3>Bounce Effect</h3>
            <div className={styles.codeSnippet}>
              {`<BounceHeader duration={1200}>
  Get Started Today
</BounceHeader>`}
            </div>
          </div>
          <div className={styles.cardContent}>
            <BounceHeader duration={1200} delay={2400}>
              Get Started Today
            </BounceHeader>
          </div>
        </div>

        {/* Scale Animation */}
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3>Scale Animation</h3>
            <div className={styles.codeSnippet}>
              {`<ScaleHeader duration={1000}>
  Scale Your Success
</ScaleHeader>`}
            </div>
          </div>
          <div className={styles.cardContent}>
            <ScaleHeader duration={1000} delay={2800}>
              Scale Your Success
            </ScaleHeader>
          </div>
        </div>

        {/* Neon Glow */}
        <div className={styles.demoCard}>
          <div className={styles.cardHeader}>
            <h3>Neon Glow Effect</h3>
            <div className={styles.codeSnippet}>
              {`<NeonHeader>
  Future Ready
</NeonHeader>`}
            </div>
          </div>
          <div className={styles.cardContent}>
            <NeonHeader delay={3200}>
              Future Ready
            </NeonHeader>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className={styles.usageSection}>
        <h2>Usage Examples</h2>
        
        <div className={styles.exampleCard}>
          <h3>Landing Page Hero</h3>
          <div className={styles.codeBlock}>
            {`import { TypewriterHeader, FadeInSlideHeader } from '@/components/AnimatedHeaders';

export const HeroSection = () => (
  <section className="hero">
    <TypewriterHeader speed={80} className="hero-title">
      Welcome to the Future of Business
    </TypewriterHeader>
    <FadeInSlideHeader delay={2000} className="hero-subtitle">
      Streamline operations with AI-powered insights
    </FadeInSlideHeader>
  </section>
);`}
          </div>
        </div>

        <div className={styles.exampleCard}>
          <h3>Feature Section</h3>
          <div className={styles.codeBlock}>
            {`import { GradientHeader, SplitTextHeader } from '@/components/AnimatedHeaders';

export const FeaturesSection = () => (
  <section className="features">
    <GradientHeader 
      colors={['#667eea', '#764ba2']}
      className="section-title"
    >
      Powerful Features
    </GradientHeader>
    <SplitTextHeader delay={1000} className="feature-highlight">
      Built for Performance
    </SplitTextHeader>
  </section>
);`}
          </div>
        </div>

        <div className={styles.exampleCard}>
          <h3>Custom Styling</h3>
          <div className={styles.codeBlock}>
            {`// Add custom CSS classes
<GlitchHeader 
  intensity="high"
  className="custom-glitch-header"
  delay={500}
>
  Your Custom Text
</GlitchHeader>

// Or use utility classes
<NeonHeader className="headerLarge headerPrimary">
  Large Primary Header
</NeonHeader>`}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>
          These components are designed to work seamlessly with your existing dark theme
          and provide smooth, performant animations for an enhanced user experience.
        </p>
      </div>
    </div>
  );
};

export default AnimatedHeadersDemo;