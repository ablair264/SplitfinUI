import React, { useEffect, useRef } from 'react';
import { useAnimationSettings } from './AnimationSettingsContext';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  paused?: boolean;
  resumeOnHover?: boolean;
  forceFallback?: boolean;
  fallbackStatic?: boolean;
  maxDpr?: number; // cap devicePixelRatio to reduce GPU cost
  pauseWhenHidden?: boolean; // pause when tab hidden
  pauseWhenOffscreen?: boolean; // pause when element not intersecting
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float base = max(length(rgb), 0.35);
  float alpha = clamp(base * uOpacity, 0.0, 1.0);
  fragColor = vec4(finalColor, alpha);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#ffffff',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
  paused = false,
  resumeOnHover = true,
  forceFallback = false,
  fallbackStatic = false,
  maxDpr = 1.5,
  pauseWhenHidden = true,
  pauseWhenOffscreen = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const globalAnim = useAnimationSettings();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

    let cleanupFns: Array<() => void> = [];

    const startCanvasFallback = (staticOnly: boolean) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      container.appendChild(canvas);
      cleanupFns.push(() => { try { container.removeChild(canvas); } catch {} });

      const setSize = () => {
        const rect = container.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(rect.width));
        canvas.height = Math.max(1, Math.floor(rect.height));
      };
      const ro = new ResizeObserver(setSize);
      ro.observe(container);
      cleanupFns.push(() => ro.disconnect());
      setSize();

      let raf = 0;
      let t0 = performance.now();

      const draw = (t: number) => {
        const w = canvas.width, h = canvas.height;
        if (!staticOnly) {
          const time = (t - t0) * 0.001 * speed;
          const gradient = ctx.createRadialGradient(w/2 + Math.sin(time)*w*0.1, h/2 + Math.cos(time)*h*0.1, 0, w/2, h/2, Math.max(w,h)/1.2);
          const [r,g,b] = customColorRgb;
          gradient.addColorStop(0, `rgba(${Math.floor(r*255)}, ${Math.floor(g*255)}, ${Math.floor(b*255)}, ${0.5*opacity})`);
          gradient.addColorStop(1, `rgba(0,0,0,0)`);
          ctx.fillStyle = gradient;
          ctx.clearRect(0,0,w,h);
          ctx.fillRect(0,0,w,h);
          raf = requestAnimationFrame(draw);
        } else {
          const [r,g,b] = customColorRgb;
          const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w,h)/1.2);
          gradient.addColorStop(0, `rgba(${Math.floor(r*255)}, ${Math.floor(g*255)}, ${Math.floor(b*255)}, ${0.5*opacity})`);
          gradient.addColorStop(1, `rgba(0,0,0,0)`);
          ctx.fillStyle = gradient;
          ctx.clearRect(0,0,w,h);
          ctx.fillRect(0,0,w,h);
        }
      };
      draw(performance.now());
      cleanupFns.push(() => cancelAnimationFrame(raf));
    };

    try {
      // Respect user preferences and data-saver for accessibility/performance
      const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const saveData = (navigator as any)?.connection?.saveData === true;
      if (prefersReduced || saveData) {
        startCanvasFallback(true);
        return () => { for (const fn of cleanupFns) { try { fn(); } catch {} } };
      }
      const finalForceFallback = forceFallback ?? globalAnim.forceFallback;
      const finalFallbackStatic = fallbackStatic ?? globalAnim.fallbackStatic;
      if (finalForceFallback) {
        startCanvasFallback(finalFallbackStatic);
        return () => { for (const fn of cleanupFns) { try { fn(); } catch {} } };
      }
      let renderer: Renderer | null = null;
      try {
        renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr: Math.min((window.devicePixelRatio || 1), maxDpr) });
      } catch (e) {
        renderer = new Renderer({ webgl: 1, alpha: true, antialias: false, dpr: Math.min((window.devicePixelRatio || 1), maxDpr) });
      }

      const gl = (renderer as any).gl as WebGLRenderingContext | WebGL2RenderingContext | null;
      if (!renderer || !gl) throw new Error('Unable to create WebGL context');

      const canvas = (gl as any).canvas as HTMLCanvasElement;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      container.appendChild(canvas);
      cleanupFns.push(() => { try { container.removeChild(canvas); } catch {} });

      const geometry = new Triangle(gl as any);
      const program = new Program(gl as any, {
        vertex: vertex,
        fragment: fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uCustomColor: { value: new Float32Array(customColorRgb) },
          uUseCustomColor: { value: useCustomColor },
          uSpeed: { value: speed * 0.4 },
          uDirection: { value: directionMultiplier },
          uScale: { value: scale },
          uOpacity: { value: opacity },
          uMouse: { value: new Float32Array([0, 0]) },
          uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }
        }
      });
      const mesh = new Mesh(gl as any, { geometry, program });

      const handleMouseMove = (e: MouseEvent) => {
        if (!mouseInteractive) return;
        const rect = container.getBoundingClientRect();
        mousePos.current.x = e.clientX - rect.left;
        mousePos.current.y = e.clientY - rect.top;
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = mousePos.current.x;
        mouseUniform[1] = mousePos.current.y;
      };
      if (mouseInteractive) {
        container.addEventListener('mousemove', handleMouseMove);
        cleanupFns.push(() => container.removeEventListener('mousemove', handleMouseMove));
      }

      const setSize = () => {
        const rect = container.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        (renderer as any).setSize(width, height);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        const res = program.uniforms.iResolution.value as Float32Array;
        res[0] = (gl as any).drawingBufferWidth;
        res[1] = (gl as any).drawingBufferHeight;
      };

      const ro = new ResizeObserver(setSize);
      ro.observe(container);
      cleanupFns.push(() => ro.disconnect());
      setSize();

      let raf = 0;
      let running = !paused;
      const t0 = performance.now();
      const loop = (t: number) => {
        const timeValue = (t - t0) * 0.001;
        if (direction === 'pingpong') {
          const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;
          (program.uniforms.uDirection as any).value = cycle;
        }
        (program.uniforms.iTime as any).value = timeValue;
        (renderer as any).render({ scene: mesh });
        raf = requestAnimationFrame(loop);
      };
      const start = () => { if (!running) { running = true; raf = requestAnimationFrame(loop); } };
      const stop = () => { if (running) { running = false; cancelAnimationFrame(raf); } };
      if (running) raf = requestAnimationFrame(loop);
      cleanupFns.push(() => cancelAnimationFrame(raf));

      if (resumeOnHover) {
        const onEnter = () => { if (resumeOnHover) start(); };
        const onLeave = () => { if (resumeOnHover && paused) stop(); };
        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => container.removeEventListener('mouseenter', onEnter));
        cleanupFns.push(() => container.removeEventListener('mouseleave', onLeave));
      }

      // Pause when tab is hidden
      if (pauseWhenHidden) {
        const onVis = () => { document.hidden ? stop() : start(); };
        document.addEventListener('visibilitychange', onVis);
        cleanupFns.push(() => document.removeEventListener('visibilitychange', onVis));
      }

      // Pause when element is off-screen
      if (pauseWhenOffscreen && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) start(); else stop();
          }
        }, { threshold: 0.15 });
        io.observe(container);
        cleanupFns.push(() => io.disconnect());
      }
    } catch (err) {
      console.warn('Plasma: falling back to 2D canvas due to WebGL error:', err);
      const finalFallbackStatic = fallbackStatic ?? globalAnim.fallbackStatic;
      startCanvasFallback(finalFallbackStatic);
    }

    return () => {
      for (const fn of cleanupFns) { try { fn(); } catch {} }
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive, paused, resumeOnHover, maxDpr, pauseWhenHidden, pauseWhenOffscreen]);

  return <div ref={containerRef} className="w-full h-full relative overflow-hidden" />;
};

export default Plasma;
