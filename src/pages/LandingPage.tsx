import React, { useEffect, useRef, useState } from 'react';
import { Paintbrush, Plus, Layout, Code2, ShoppingCart, TrendingUp, Zap, Monitor, MessageSquare, PenTool, CheckCircle2, Rocket, Check, ArrowRight } from 'lucide-react'
import TiltedCard from '@/components/ui/TiltedCard'
import Reveal from '@/components/Reveal'
import BentoDemo from '@/components/BentoDemo'
import NavBar from './NavBar'


const HoverReveal: React.FC = () => {
  const revealImgRef = useRef<HTMLImageElement | null>(null);

  return (
    <div
      id="home"
      style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '70vh', minHeight: '70svh', maxHeight: '70vh', background: 'transparent' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        const el = revealImgRef.current; if (el) { el.style.setProperty('--mx', `${x}px`); el.style.setProperty('--my', `${y + rect.height * 0.1}px`); }
      }}
      onMouseLeave={() => { const el = revealImgRef.current; if (el) { el.style.setProperty('--mx', '-9999px'); el.style.setProperty('--my', '-9999px'); } }}
    >
      <img
        ref={revealImgRef}
        src="/bg1.webp"
        alt="Reveal effect"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, mixBlendMode: 'lighten', opacity: 0.35, pointerEvents: 'none', '--mx': '-9999px', '--my': '-9999px', WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)', maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' } as React.CSSProperties as any}
      />
      
      

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 'clamp(40px, 8vh, 60px) 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
              <img
          src="/logos/split.png"
          alt="Splitfin logo"
          onError={(e) => {
            const t = e.currentTarget;
            // Fallbacks if PNG isn't found
            const tried = t.getAttribute('data-tried') || '';
            const attempts = tried.split(',').filter(Boolean);
            const candidates = ['/splitfin.png', '/logos/splitfin-white.png', '/splitfin-white.png', '/logos/splitfin-logo.svg', '/splitfin.svg'];
            const next = candidates.find((c) => !attempts.includes(c));
            if (next) {
              t.setAttribute('data-tried', [...attempts, next].join(','));
              t.src = next;
            }
          }}
          style={{
            height: '100px',
            width: 'auto',
            marginBottom: '16px',
            filter:
              'drop-shadow(0 6px 18px rgba(121, 213, 233, 0.15)) drop-shadow(0 0 12px rgba(121, 213, 233, 0.08))',
            opacity: 0.95,
          }}
        />

        <h1 style={{ fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: 800, lineHeight: 1.1, color: '#ffffff', marginBottom: '12px' }}>
          Web Design. Any Platform. </h1>  <h1 style={{ fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: 800, lineHeight: 1.1, color: '#ffffff', marginBottom: '12px' }}><span style={{ color: '#75d0e5' }}>Perfectly Executed.</span>
        </h1>

        {/* Technologies row replacing Sales/Inventory */}
        <div style={{ marginTop: '12px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '18px' }}>
            <Paintbrush size={20} color="#79D5E9" /> Bespoke Designs
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)' }}>
            <img src="/logos/wordpress-color.svg" alt="Wordpress" style={{ height: 24, width: 'auto' }} /> Wordpress
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)' }}>
            <img src="/logos/shopify-logo.svg" alt="Shopify" style={{ height: 24, width: 'auto' }} /> Shopify
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)' }}>
            <img src="/logos/woocommerce-logo.svg" alt="Woocommerce" style={{ height: 24, width: 'auto' }} /> Woocommerce
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)' }}>
            <img src="/logos/react.png" alt="React" style={{ height: 24, width: 'auto' }} /> React
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)' }}>
            <Plus size={18} /> And more
          </div>
        </div>

        <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 450, lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.85)', maxWidth: '820px', marginBottom: '30px' }}>
          Get in touch today and learn how Split Design can help transform your online presence.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#contact">
            <button style={{ padding: '14px 28px', fontSize: '18px', fontWeight: 600, background: 'linear-gradient(135deg, #075e54 0%, #25d366 100%)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)' }}>WhatsApp</button>
          </a>
          <a href="#contact">
            <button style={{ padding: '14px 28px', fontSize: '18px', fontWeight: 600, background: 'transparent', color: '#ffffff', border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)' }}>Message Us</button>
          </a>
        </div>

        {/* Scroll indicator removed as requested */}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1419]">
      <div className="container mx-auto p-6">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <a href="#home" className="inline-flex items-center gap-2">
                <img className="h-7 w-auto" src="/logos/SplitDesign.png" alt="Split Design" />
              </a>
              <p className="max-w-sm mt-3 text-white/60">
                High-performance websites and apps tailored to your business.
              </p>
              <div className="flex mt-6 -mx-2">
                <a href="#" aria-label="Reddit" className="mx-2 text-white/60 hover:text-[#79d5e9] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c-.006 5.52-4.48 9.994-10 10zM6.807 10.543a1.2 1.2 0 0 0-.999 1.922c.116.109.248.198.392.264a3.9 3.9 0 0 0 0 .439c0 2.24 2.615 4.062 5.829 4.062s5.83-1.822 5.83-4.062c.012-.146.012-.293 0-.439.607-.295.928-.972.773-1.628a1.37 1.37 0 0 0-1.42-1.13h-.053a1.38 1.38 0 0 0-1.357 1.03 7.73 7.73 0 0 0-3.85-1.23l.65-3.12 2.138.45a1 1 0 1 0 .909-1.85l-3.32-.61a.53.53 0 0 0-.592.41l-.748 3.473a7.69 7.69 0 0 0-3.9 1.17 1.39 1.39 0 0 0-1.017-.41zM12.18 16.524h-.338c-.83-.004-1.636-.275-2.299-.774a.53.53 0 0 1 .058-.881.53.53 0 0 1 .671.04c.56.41 1.237.631 1.933.629h.324c.686.001 1.355-.214 1.913-.614a.5.5 0 0 1 .483.84 3.55 3.55 0 0 1-2.745.764zM14.307 14.08h-.016l.008-.039a1.18 1.18 0 0 0-.865-1.553 1.19 1.19 0 0 0-1.149 1.711 1.16 1.16 0 0 0 1.022.861zM9.67 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="mx-2 text-white/60 hover:text-[#79d5e9] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.002 12.002c.001 4.919 3.578 9.108 8.436 9.879V14.892H7.902v-2.89h2.54v-2.2c-.113-1.042.243-2.081.972-2.834.729-.753 1.756-1.143 2.802-1.064.75.012 1.499.079 2.24.2v2.459H15.19c-.435-.057-.873.087-1.189.391-.316.304-.477.735-.438 1.173v1.878h2.771l-.443 2.891H13.563v6.989c5.254-.83 8.939-5.628 8.385-10.918C21.393 5.67 16.793 1.74 11.481 2.017 6.168 2.294 2.003 6.682 2.002 12.002z"/></svg>
                </a>
                <a href="#" aria-label="Github" className="mx-2 text-white/60 hover:text-[#79d5e9] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.026 2C7.133 2 2.962 5.548 2.178 10.378c-.783 4.83 2.053 9.515 6.695 11.061.5.09.679-.217.679-.481 0-.237-.008-.865-.011-1.7-2.775.6-3.361-1.338-3.361-1.338-.183-.603-.575-1.121-1.107-1.459-.9-.619.069-.633.069-.633.64.088 1.204.468 1.527 1.029.273.496.733.863 1.278 1.019.545.156 1.129.088 1.623-.189.046-.506.271-.979.635-1.334-2.214-.251-4.542-1.107-4.542-4.93-.012-.989.355-1.945 1.027-2.671-.303-.861-.267-1.805.101-2.64 0 0 .837-.269 2.742 1.021 1.634-.448 3.358-.448 4.992 0 1.906-1.29 2.742-1.021 2.742-1.021.368.835.404 1.779.101 2.64.672.726 1.039 1.682 1.027 2.671 0 3.823-2.328 4.679-4.551 4.93.6.582.919 1.393.88 2.22 0 .812-.011 1.469-.011 1.672 0 .267.179.575.686.477 4.64-1.548 7.472-6.233 6.688-11.063C21.089 5.546 16.918 1.999 12.026 2z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-white uppercase">About</h3>
                <a href="#about" className="block mt-2 text-sm text-white/60 hover:underline">Company</a>
                <a href="#features" className="block mt-2 text-sm text-white/60 hover:underline">Portfolio</a>
                <a href="#process" className="block mt-2 text-sm text-white/60 hover:underline">Process</a>
              </div>
              <div>
                <h3 className="text-white uppercase">Services</h3>
                <a href="/web-design" className="block mt-2 text-sm text-white/60 hover:underline">Web Design</a>
                <a href="/web-development" className="block mt-2 text-sm text-white/60 hover:underline">Web Development</a>
                <a href="/ecommerce" className="block mt-2 text-sm text-white/60 hover:underline">E‑Commerce</a>
                <a href="/seo" className="block mt-2 text-sm text-white/60 hover:underline">SEO</a>
                <a href="/automation" className="block mt-2 text-sm text-white/60 hover:underline">Automation</a>
              </div>
              <div>
                <h3 className="text-white uppercase">Products</h3>
                <a href="#" className="block mt-2 text-sm text-white/60 hover:underline">Split UI</a>
                <a href="#" className="block mt-2 text-sm text-white/60 hover:underline">Components</a>
                <a href="#" className="block mt-2 text-sm text-white/60 hover:underline">Templates</a>
              </div>
              <div>
                <h3 className="text-white uppercase">Contact</h3>
                <span id="contact" className="block mt-2 text-sm text-white/60">alastair.blair@splitfin.uk</span>
                <span className="block mt-2 text-sm text-white/60">+44 (0)0000 000000</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-white/10 border-none" />

        <div>
          <p className="text-center text-white/60">© {new Date().getFullYear()} Split Design — All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

const LandingPage: React.FC = () => {
  const [pricingMode, setPricingMode] = useState<'oneoff' | 'subscription'>('oneoff');
  const [activeService, setActiveService] = useState<number | null>(null);
  const [previewService, setPreviewService] = useState<number | null>(null);
  const hoverTimer = React.useRef<number | null>(null);
  const serviceCards = [
    { Icon: Layout, title: 'Web Design', color: '#0ea5e9', copy: 'Bespoke, conversion‑focused designs for your brand.', details: ['Custom UI/UX design','Responsive layouts','Brand integration'], href: '/web-design' },
    { Icon: Code2, title: 'Web Development', color: '#22c55e', copy: 'High‑performance builds with modern stacks.', details: ['React / Next.js','WordPress / PHP','API integration'], href: '/web-development' },
    { Icon: ShoppingCart, title: 'E‑Commerce', color: '#f59e0b', copy: 'Shopify, WooCommerce and custom storefronts.', details: ['Payment integration','Inventory management','Secure checkout'], href: '/ecommerce' },
    { Icon: TrendingUp, title: 'SEO Services', color: '#6366f1', copy: 'Technical, on‑page and content optimisation.', details: ['Keyword research','On‑page optimisation','Performance tracking'], href: '/seo' },
    { Icon: Zap, title: 'Automation', color: '#a855f7', copy: 'Workflows and integrations that save time.', details: ['Process automation','Email marketing','Workflow integration'], href: '/automation' },
    { Icon: Monitor, title: 'PC Repair', color: '#ef4444', copy: 'Diagnostics, upgrades and maintenance.', details: ['Hardware diagnostics','Software updates','Network setup'], href: '/pc-repair' },
  ];
  return (
    <div className="landing-page">
	         <NavBar />

      {/* Hero */}
      <HoverReveal />

      {/* Services - two-column layout with TiltedCards */}
      <section id="services" className="w-full bg-[#0f1419]">
        <Reveal className="container mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Everything You Need to Succeed Online</h2>
          <div className="mt-2">
            <span className="inline-block w-40 h-1 bg-[#79d5e9] rounded-full"></span>
            <span className="inline-block w-3 h-1 ml-1 bg-[#79d5e9] rounded-full"></span>
            <span className="inline-block w-1 h-1 ml-1 bg-[#79d5e9] rounded-full"></span>
          </div>
          <div className="mt-10 xl:mt-12 lg:flex lg:items-center lg:gap-12">
            <div className="grid w-full grid-cols-2 gap-x-6 gap-y-12 lg:w-1/2 xl:gap-x-8 xl:gap-y-20">
              {serviceCards.map(({ Icon, title, color, copy }, i) => (
                <Reveal key={i} delayMs={i * 100}>
                <div
                  key={i}
                  onMouseEnter={() => {
                    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                    setActiveService(i);
                    hoverTimer.current = window.setTimeout(() => setPreviewService(i), 150);
                  }}
                  onMouseLeave={() => {
                    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                    setActiveService(null);
                    hoverTimer.current = window.setTimeout(() => setPreviewService(null), 180);
                  }}
                  onClick={() => {
                    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
                    const next = previewService === i ? null : i;
                    // Small delay to avoid flicker while tapping quickly
                    hoverTimer.current = window.setTimeout(() => setPreviewService(next), 120);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <TiltedCard
                    bgColor={`${color}33`}
                    displayOverlayContent
                    showTooltip={false}
                    containerWidth="100%"
                    containerHeight="180px"
                    imageWidth="100%"
                    imageHeight="180px"
                    overlayContent={
                      <div className="rounded-[15px] p-7 md:p-8 flex flex-col h-full gap-4" style={{ width: '100%', height: '180px', color: '#fff' }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color, color: '#0f1419' }}>
                          <Icon size={20} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-white text-base font-semibold">{title}</h3>
                          <p className="text-white/80 text-xs leading-snug">{copy}</p>
                        </div>
                        <a href={serviceCards[i].href} className="mt-auto pt-2 inline-flex items-center gap-2 text-xs text-white/90 hover:text-white">
                          Learn More <ArrowRight size={14} />
                        </a>
                      </div>
                    }
                  />
                </div>
                </Reveal>
              ))}
            </div>
            {/* No special mobile preview; cards link to detail pages */}

            {/* Desktop preview on the right */}
            <Reveal className="hidden lg:flex lg:w-1/2 lg:justify-center mt-10 lg:mt-0">
              <div className="relative w-[28rem] h-[20rem] xl:w-[34rem] xl:h-[24rem]">
                {/* Image layer */}
                <img
                  src="/stock.jpg"
                  alt="Services preview"
                  className={`absolute inset-0 w-full h-full object-cover rounded-2xl border border-white/10 shadow-lg transition-opacity duration-300 ${previewService === null ? 'opacity-100' : 'opacity-0'}`}
                />
                {/* Details layer */}
                <div
                  className={`absolute inset-0 rounded-2xl border border-white/10 bg-[#272c30] p-6 text-white/90 transition-opacity duration-300 ${previewService !== null ? 'opacity-100' : 'opacity-0'}`}
                >
                  {previewService !== null && (
                    <div className="h-full w-full">
                      <h3 className="text-white text-2xl font-semibold mb-2">{serviceCards[previewService].title}</h3>
                      <p className="text-white/80 text-sm mb-4">{serviceCards[previewService].copy}</p>
                      <ul className="text-white/85 text-sm space-y-2">
                        {serviceCards[previewService].details.map((d, idx) => (
                          <li key={idx} className="flex items-start gap-2"><Check size={16} className="text-[#79d5e9] mt-0.5" /><span>{d}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* Portfolio (Bento) */}
      <Reveal><BentoDemo /></Reveal>

      {/* Final CTA */}
      <section id="cta" className="w-full flex flex-col items-center bg-[#79d5e90d] px-6 py-24">
        <Reveal className="w-full max-w-[768px] flex flex-col items-center gap-6">
          <h2 className="w-full text-[36px] md:text-[48px] font-bold leading-tight text-white text-center -tracking-[0.035em]">Ready to Transform Your Online Presence?</h2>
          <p className="w-full max-w-[576px] text-[20px] leading-[28px] text-white/75 text-center">Get in touch today for a free consultation and let's discuss how we can help grow your business.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:alastair.blair@splitfin.uk" className="rounded-[10px] px-4 py-2 bg-[#79d5e9] text-[#0f1419] hover:opacity-95">Start Your Project</a>
            <a href="#contact" className="rounded-[10px] px-4 py-2 border border-white/20 hover:bg-white/10">Schedule a Call</a>
          </div>
        </Reveal>
      </section>

      {/* Bespoke Philosophy */}
      <section id="results" className="w-full flex flex-col items-center bg-[#0f1419] px-6 py-24">
        <Reveal className="w-full max-w-[1280px] flex flex-col items-center gap-4">
          <span className="text-[14px] font-semibold tracking-wider text-[#79d5e9] uppercase">Our Philosophy</span>
          <h2 className="w-full max-w-[900px] text-[32px] md:text-[44px] font-bold leading-tight text-white text-center -tracking-[0.035em]">Authentic, Bespoke Websites — No Templates</h2>
          <p className="w-full max-w-[720px] text-[18px] leading-[26px] text-white/75 text-center">Every build is crafted around your brand, audience and goals. We don’t reskin marketplace themes — we design, prototype and hand‑code sites that are uniquely yours.</p>
        </Reveal>
        <div className="w-full max-w-[1280px] mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#79d5e9] text-[#0f1419] flex items-center justify-center"><PenTool size={18} /></div>
            <h3 className="text-white text-[18px] font-semibold">Bespoke Design</h3>
            <p className="text-white/75 text-[14px]">Brand‑first UI/UX created for your objectives — never a stock theme.</p>
            <ul className="mt-2 text-[14px] text-white/85 flex flex-col gap-2">
              <li className="flex items-center gap-2"><Check size={16} className="text-[#79d5e9]" />Workshops, wireframes and prototypes</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#79d5e9]" />Design systems for consistency</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#79d5e9] text-[#0f1419] flex items-center justify-center"><Code2 size={18} /></div>
            <h3 className="text-white text-[18px] font-semibold">Hand‑Coded Builds</h3>
            <p className="text-white/75 text-[14px]">Clean, maintainable code optimised for speed, accessibility and SEO.</p>
            <ul className="mt-2 text-[14px] text-white/85 flex flex-col gap-2">
              <li className="flex items-center gap-2"><Check size={16} className="text-[#79d5e9]" />Performance budget + best practices</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#79d5e9]" />Accessible by default (a11y)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#79d5e9] text-[#0f1419] flex items-center justify-center"><CheckCircle2 size={18} /></div>
            <h3 className="text-white text-[18px] font-semibold">Authentic Partnership</h3>
            <p className="text-white/75 text-[14px]">We collaborate closely and continue improving post‑launch as your needs evolve.</p>
            <ul className="mt-2 text-[14px] text-white/85 flex flex-col gap-2">
              <li className="flex items-center gap-2"><Check size={16} className="text-[#79d5e9]" />Retainer or ad‑hoc support</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#79d5e9]" />Analytics‑driven enhancements</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="w-full flex flex-col items-center bg-[#79d5e908] px-6 py-24">
        <div className="w-full max-w-[1280px] flex flex-col items-center gap-4">
          <span className="text-[14px] font-semibold tracking-wider text-[#79d5e9] uppercase">Our Process</span>
          <h2 className="w-full max-w-[768px] text-[36px] md:text-[48px] font-bold leading-tight text-white text-center -tracking-[0.035em]">From Concept to Launch</h2>
          <p className="w-full max-w-[576px] text-[18px] leading-[26px] text-white/75 text-center">Our proven workflow ensures your project is delivered on time and exceeds expectations.</p>
        </div>
        <div className="w-full max-w-[768px] mt-10 flex flex-col gap-8">
          {[
            { icon: MessageSquare, t: '1. Discovery & Planning', d: 'We start by understanding your goals, target audience, and requirements. Together we create a detailed project plan and timeline.' },
            { icon: PenTool, t: '2. Design & Prototype', d: 'We create stunning mockups and interactive prototypes that bring your vision to life before any code is written.' },
            { icon: Code2, t: '3. Development', d: 'Our developers build your site with clean, efficient code optimized for performance and scalability.' },
            { icon: CheckCircle2, t: '4. Testing & QA', d: 'Rigorous testing across devices and browsers ensures everything works flawlessly before launch.' },
            { icon: Rocket, t: '5. Launch & Support', d: 'We handle deployment and provide ongoing support to keep your site running smoothly.' },
          ].map(({ icon: Icon, t, d }, i, arr) => (
            <Reveal key={i} delayMs={i * 120}>
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#79d5e9] text-[#0f1419] flex items-center justify-center"><Icon size={22} /></div>
                  {i < arr.length - 1 && <div className="h-24 w-px bg-[#79d5e94d]" />}
                </div>
                <div className="pt-2">
                  <h3 className="text-white text-[22px] md:text-[24px] font-bold -tracking-[0.025em]">{t}</h3>
                  <p className="text-white/75 text-[16px] leading-6 mt-2">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full flex flex-col items-center bg-[#0f1419] px-6 py-24">
        <Reveal className="w-full max-w-[1280px] flex flex-col items-center gap-4">
          <span className="text-[14px] font-semibold tracking-wider text-[#79d5e9] uppercase">Pricing</span>
          <h2 className="w-full max-w-[768px] text-[36px] md:text-[48px] font-bold leading-tight text-white text-center -tracking-[0.035em]">Flexible Plans for Every Budget</h2>
          <p className="w-full max-w-[576px] text-[18px] leading-[26px] text-white/75 text-center">Choose a package that fits your needs or contact us for a custom quote.</p>
          <p className="w-full max-w-[768px] text-[16px] leading-[24px] text-white/70 text-center mt-2">Need ongoing maintenance, updates and support? Try our subscription model. From £39 a month.</p>
        </Reveal>

        {/* Pricing mode toggle */}
        <div className="mt-8 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
          <button onClick={() => setPricingMode('oneoff')} className={`${pricingMode === 'oneoff' ? 'bg-[#79d5e9] text-[#0f1419]' : 'text-white'} px-4 py-2 rounded-md text-sm font-semibold transition`}>One‑Off Cost</button>
          <button onClick={() => setPricingMode('subscription')} className={`${pricingMode === 'subscription' ? 'bg-[#79d5e9] text-[#0f1419]' : 'text-white'} px-4 py-2 rounded-md text-sm font-semibold transition`}>Subscription</button>
        </div>

        {/* Plans */}
        {pricingMode === 'oneoff' ? (
          <div className="w-full max-w-[1280px] mt-10 flex flex-wrap gap-8 items-stretch justify-center">
            {[
              { title: 'Starter', price: '£499', note: 'starting', desc: 'Perfect for small businesses and startups', features: ['5‑page website','Responsive design','Basic SEO setup','Contact form','30 days support','7 days a week support'], highlight: false, badge: undefined },
              { title: 'Professional', price: '£999', note: 'starting', desc: 'For growing businesses with advanced needs', features: ['15‑page website','Custom design & animations','Advanced SEO','CMS integration','90 days support','7 days a week support'], highlight: true, badge: undefined },
              { title: 'E‑Commerce', price: '£1399', note: 'starting', desc: 'For online retailers and marketplaces', features: ['E‑Commerce Ready (Any Platform)','15‑page website','Custom design & animations','Advanced SEO','CMS integration','90 days support','7 days a week support'], highlight: false, badge: undefined },
            ].map((p, i) => (
              <div key={i} className={`${p.highlight ? 'border-2 border-[#79d5e9] bg-[#79d5e914]' : 'border border-white/10 bg-white/10'} rounded-xl max-w-[384px] flex flex-col gap-8 p-10 grow` }>
                {p.badge && (
                  <div className="inline-flex items-center gap-2 rounded-md bg-[#79d5e9] px-3 py-1 w-min text-[#0f1419] text-[12px] font-semibold tracking-wider uppercase">{p.badge}</div>
                )}
                <div>
                  <h3 className="text-white text-[20px] font-bold -tracking-[0.02em]">{p.title}</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-white text-[40px] md:text-[48px] font-bold -tracking-[0.035em] leading-none">{p.price}</span>
                    {p.note && <span className="text-white/60 pb-1">{p.note}</span>}
                  </div>
                  <p className="text-white/75 mt-2">{p.desc}</p>
                </div>
                <ul className="flex flex-col gap-3 text-[15px]">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/90"><Check size={16} className="text-[#79d5e9]" />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <a href="mailto:alastair.blair@splitfin.uk" className={`${p.highlight ? 'bg-[#79d5e9] text-[#0f1419]' : 'bg-transparent text-white border border-white/20'} rounded-[10px] px-4 py-2 inline-flex items-center justify-center w-full hover:opacity-95`}>Get Started</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-[1280px] mt-10 flex flex-wrap gap-8 items-stretch justify-center">
            {[
              { title: 'Starter', price: '£39', note: 'a month', desc: 'Perfect for small businesses and startups', features: ['5‑page website','Responsive design','Ongoing SEO support','Webpage updates','Image changes','Contact form','7 days a week support'], highlight: false, badge: 'From £39/mo' },
              { title: 'Professional', price: '£49', note: 'a month', desc: 'For growing businesses with advanced needs', features: ['15‑page website','Ongoing support','Website updates','Image changes','Content changes','Ongoing SEO support','7 days a week support'], highlight: false, badge: undefined },
              { title: 'E‑Commerce', price: '£59', note: 'a month', desc: 'For online retailers and marketplaces', features: ['E‑Commerce ready (any platform)','15‑page website','Ongoing support','Website updates','Image changes','Content changes','Product changes & uploads','Ongoing SEO support','7 days a week support'], highlight: false, badge: undefined },
            ].map((p, i) => (
              <div key={i} className={`${p.highlight ? 'border-2 border-[#79d5e9] bg-[#79d5e914]' : 'border border-white/10 bg-white/10'} rounded-xl max-w-[384px] flex flex-col gap-8 p-10 grow` }>
                {p.badge && (
                  <div className="inline-flex items-center gap-2 rounded-md bg-[#79d5e9] px-3 py-1 w-min text-[#0f1419] text-[12px] font-semibold tracking-wider uppercase">{p.badge}</div>
                )}
                <div>
                  <h3 className="text-white text-[20px] font-bold -tracking-[0.02em]">{p.title}</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-white text-[40px] md:text-[48px] font-bold -tracking-[0.035em] leading-none">{p.price}</span>
                    <span className="text-white/60 pb-1">{p.note}</span>
                  </div>
                  <p className="text-white/75 mt-2">{p.desc}</p>
                </div>
                <ul className="flex flex-col gap-3 text-[15px]">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/90"><Check size={16} className="text-[#79d5e9]" />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <a href="mailto:alastair.blair@splitfin.uk" className={`${p.highlight ? 'bg-[#79d5e9] text-[#0f1419]' : 'bg-transparent text-white border border-white/20'} rounded-[10px] px-4 py-2 inline-flex items-center justify-center w-full hover:opacity-95`}>Subscribe</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Technologies */}
      <section id="technologies" className="w-full flex flex-col items-center bg-[#79d5e908] px-6 py-24">
        <Reveal className="w-full max-w-[1280px] flex flex-col items-center gap-4">
          <span className="text-[14px] font-semibold tracking-wider text-[#79d5e9] uppercase">Technologies</span>
          <h2 className="w-full max-w-[768px] text-[36px] md:text-[48px] font-bold leading-tight text-white text-center -tracking-[0.035em]">Built With Industry‑Leading Tools</h2>
          <p className="w-full max-w-[576px] text-[18px] leading-[26px] text-white/75 text-center">We use the best technologies and platforms to deliver exceptional results.</p>
        </Reveal>
        <div className="w-full max-w-[1024px] mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {[
            { name: 'React', img: '/logos/react.png' },
            { name: 'WordPress', img: '/logos/wordpress-color.svg' },
            { name: 'Shopify', img: '/logos/shopify-logo.svg' },
            { name: 'Node.js', img: '/logos/node-js.svg' },
            { name: 'Tailwind', img: '/logos/tailwind.png' },
            { name: 'Stripe', img: '/logos/stripe.svg' },
            { name: 'AWS', img: '/logos/AWS.webp' },
            { name: 'Figma', img: '/logos/figma.png' },
          ].map((t, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <img src={t.img} alt={t.name} className="h-20 w-20 rounded-lg object-cover" />
              <span className="text-[14px] font-medium text-white/85">{t.name}</span>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
