# Animated Header Components

A collection of beautiful, performant animated text header components for React applications. Perfect for landing pages, hero sections, and creating engaging user experiences.

## Features

- 🎭 **8 Different Animation Styles** - Typewriter, Fade, Glitch, Gradient, Split Text, Bounce, Scale, and Neon
- ⚡ **High Performance** - CSS-based animations with `will-change` optimizations
- 📱 **Fully Responsive** - Adapts to different screen sizes automatically
- 🎨 **Customizable** - Easy to style with custom CSS classes and inline styles
- 🔧 **TypeScript Support** - Full type definitions included
- 🌙 **Dark Theme Ready** - Designed to work with your existing dark theme
- ♿ **Accessible** - Respects user motion preferences

## Installation

The components are already included in your project. Import them from:

```tsx
import { 
  TypewriterHeader,
  FadeInSlideHeader,
  GlitchHeader,
  GradientHeader,
  SplitTextHeader,
  BounceHeader,
  ScaleHeader,
  NeonHeader 
} from '@/components/AnimatedHeaders';
```

## Components

### 1. TypewriterHeader

Creates a typewriter effect with optional cursor.

```tsx
<TypewriterHeader 
  speed={50}           // Speed in milliseconds per character
  showCursor={true}    // Show blinking cursor
  cursorChar="|"       // Cursor character
  delay={0}            // Delay before animation starts
>
  Welcome to Splitfin
</TypewriterHeader>
```

**Props:**
- `speed?: number` - Typing speed in ms (default: 50)
- `showCursor?: boolean` - Show cursor (default: true)
- `cursorChar?: string` - Cursor character (default: "|")

### 2. FadeInSlideHeader

Fades in while sliding up from below.

```tsx
<FadeInSlideHeader 
  duration={1000}      // Animation duration in ms
  delay={0}            // Delay before animation starts
>
  Streamline Your Business
</FadeInSlideHeader>
```

### 3. GlitchHeader

Creates a digital glitch effect.

```tsx
<GlitchHeader 
  intensity="medium"   // "low" | "medium" | "high"
  delay={0}
>
  Digital Innovation
</GlitchHeader>
```

**Props:**
- `intensity?: "low" | "medium" | "high"` - Glitch intensity (default: "medium")

### 4. GradientHeader

Animated gradient text with color shifting.

```tsx
<GradientHeader 
  colors={['#8b5cf6', '#06b6d4', '#10b981']}  // Array of colors
  duration={3000}      // Color shift duration
  delay={0}
>
  Powerful Analytics
</GradientHeader>
```

**Props:**
- `colors?: string[]` - Array of gradient colors (default: ['#8b5cf6', '#06b6d4', '#10b981'])

### 5. SplitTextHeader

Animates each character individually.

```tsx
<SplitTextHeader 
  duration={800}       // Duration per character
  delay={0}
>
  Transform Ideas
</SplitTextHeader>
```

### 6. BounceHeader

Bouncy scale animation with elastic easing.

```tsx
<BounceHeader 
  duration={1200}
  delay={0}
>
  Get Started Today
</BounceHeader>
```

### 7. ScaleHeader

Simple scale-up animation.

```tsx
<ScaleHeader 
  duration={1000}
  delay={0}
>
  Scale Your Success
</ScaleHeader>
```

### 8. NeonHeader

Glowing neon text effect.

```tsx
<NeonHeader delay={0}>
  Future Ready
</NeonHeader>
```

## Common Props

All components share these base props:

- `children: React.ReactNode` - The text content
- `className?: string` - Additional CSS classes
- `delay?: number` - Delay before animation starts (ms)
- `duration?: number` - Animation duration (ms) - not applicable to all components

## Utility Classes

Add these classes to customize appearance:

### Size Classes
```tsx
<TypewriterHeader className="headerLarge">Large Text</TypewriterHeader>
<TypewriterHeader className="headerMedium">Medium Text</TypewriterHeader>
<TypewriterHeader className="headerSmall">Small Text</TypewriterHeader>
```

### Color Classes
```tsx
<FadeInSlideHeader className="headerPrimary">Primary Color</FadeInSlideHeader>
<FadeInSlideHeader className="headerSecondary">Secondary Color</FadeInSlideHeader>
<FadeInSlideHeader className="headerSuccess">Success Color</FadeInSlideHeader>
<FadeInSlideHeader className="headerWarning">Warning Color</FadeInSlideHeader>
<FadeInSlideHeader className="headerDanger">Danger Color</FadeInSlideHeader>
```

## Examples

### Landing Page Hero

```tsx
import { TypewriterHeader, FadeInSlideHeader } from '@/components/AnimatedHeaders';

export const HeroSection = () => (
  <section className="hero">
    <TypewriterHeader 
      speed={80} 
      className="text-6xl font-bold mb-4"
    >
      Welcome to the Future
    </TypewriterHeader>
    
    <FadeInSlideHeader 
      delay={3000} 
      className="text-xl text-gray-400"
    >
      Streamline your business operations
    </FadeInSlideHeader>
  </section>
);
```

### Feature Sections

```tsx
import { GradientHeader, SplitTextHeader } from '@/components/AnimatedHeaders';

export const FeaturesSection = () => (
  <section className="features">
    <GradientHeader 
      colors={['#667eea', '#764ba2']}
      className="text-4xl mb-8"
    >
      Powerful Features
    </GradientHeader>
    
    {features.map((feature, index) => (
      <SplitTextHeader 
        key={feature.id}
        delay={index * 500}
        className="text-2xl mb-4"
      >
        {feature.title}
      </SplitTextHeader>
    ))}
  </section>
);
```

### Call-to-Action

```tsx
import { BounceHeader, NeonHeader } from '@/components/AnimatedHeaders';

export const CTASection = () => (
  <section className="cta">
    <BounceHeader className="text-3xl mb-4">
      Ready to Get Started?
    </BounceHeader>
    
    <NeonHeader delay={1000} className="text-lg">
      Join thousands of satisfied customers
    </NeonHeader>
  </section>
);
```

## Custom Styling

You can easily customize the components with CSS:

```css
/* Custom typewriter style */
.custom-typewriter {
  font-family: 'Courier New', monospace;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
}

/* Custom gradient colors */
.custom-gradient {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  background-size: 400% 400%;
}

/* Custom glitch colors */
.custom-glitch::before {
  color: #ff0080 !important;
}

.custom-glitch::after {
  color: #0080ff !important;
}
```

## Performance Notes

- All animations use CSS transforms and opacity for optimal performance
- Components include `will-change` property for GPU acceleration
- Animations respect `prefers-reduced-motion` settings
- Minimal JavaScript overhead - most animations are pure CSS

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (requires -webkit- prefix for some features)
- IE11: Partial support (no gradient text)

## Accessibility

The components are designed with accessibility in mind:

- Respects `prefers-reduced-motion` user setting
- Maintains proper heading semantics
- Text remains selectable during animations
- High contrast ratios maintained

## Migration from Other Libraries

If you're migrating from other animation libraries:

```tsx
// From Framer Motion
<motion.h1 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
>
  Text
</motion.h1>

// To our component
<FadeInSlideHeader>
  Text
</FadeInSlideHeader>
```

## Troubleshooting

### Animation not starting
- Check that the component is mounted
- Verify delay prop if used
- Ensure parent container has proper dimensions

### Performance issues
- Limit number of simultaneous animations
- Use delay props to stagger animations
- Consider reducing animation complexity on mobile

### Styling conflicts
- Use specific CSS selectors
- Check CSS specificity
- Use `!important` sparingly

## Contributing

To add new animation types:

1. Create the component in `AnimatedHeaders.tsx`
2. Add corresponding CSS in `AnimatedHeaders.module.css`
3. Export from `index.ts`
4. Add example to demo page
5. Update this README

## License

These components are part of the Splitfin project and follow the same license terms.