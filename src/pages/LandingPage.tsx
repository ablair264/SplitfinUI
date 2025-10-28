import React, { useEffect, useRef, useState } from 'react';
import { Paintbrush, Plus, Layout, Code2, ShoppingCart, TrendingUp, Zap, Monitor, MessageSquare, PenTool, CheckCircle2, Rocket, Check, ArrowRight, Users, Award, Clock, HeartHandshake, Star, Phone, Mail, MapPin, Wrench } from 'lucide-react'
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
                <a href="/website-maintenance" className="block mt-2 text-sm text-white/60 hover:underline">Website Maintenance</a>
                <a href="/automation" className="block mt-2 text-sm text-white/60 hover:underline">Automation</a>
              </div>
              <div>
                <h3 className="text-white uppercase">Services</h3>
                <a href="/pc-repair" className="block mt-2 text-sm text-white/60 hover:underline">PC Repair</a>
                <a href="/website-maintenance" className="block mt-2 text-sm text-white/60 hover:underline">Website Maintenance</a>
                <a href="/automation" className="block mt-2 text-sm text-white/60 hover:underline">Automation</a>
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
    {
      Icon: Layout,
      title: 'Web Design',
      color: '#0ea5e9',
      copy: 'Bespoke, conversion‑focused designs for your brand.',
      longCopy: 'Bespoke, conversion‑focused designs crafted around your brand and goals. Every page is responsive, accessible, and built to convert.',
      details: ['Custom UI/UX tailored to audience','Mobile‑first responsive layouts','Brand‑aligned visuals and typography','Clear calls‑to‑action that convert'],
      href: '/web-design'
    },
    {
      Icon: Code2,
      title: 'Web Development',
      color: '#22c55e',
      copy: 'High‑performance builds with modern stacks.',
      longCopy: 'Robust builds using modern stacks. We prioritise speed, maintainability and scalability so your site grows with your business.',
      details: ['React/Next.js + TypeScript','WordPress custom themes/plugins','API integrations and automations','Performance and accessibility baked in'],
      href: '/web-development'
    },
    {
      Icon: ShoppingCart,
      title: 'E‑Commerce',
      color: '#f59e0b',
      copy: 'Shopify, WooCommerce and custom storefronts.',
      longCopy: 'Sell with confidence on Shopify, WooCommerce, or a custom storefront. Seamless checkout and optimised product pages included.',
      details: ['Payments + shipping setup','Product/catalog management','Optimised PDP/PLP templates','Secure checkout and analytics'],
      href: '/ecommerce'
    },
    {
      Icon: Wrench,
      title: 'Website Maintenance',
      color: '#06b6d4',
      copy: 'Updates, security, backups and proactive care.',
      longCopy: 'Proactive care to keep your site fast, secure and up‑to‑date. We handle updates, security, backups and fixes before they become issues.',
      details: ['Core/plugin/theme updates','Daily backups + quick restores','Security monitoring + patches','Performance checks and fixes'],
      href: '/website-maintenance'
    },
    {
      Icon: Zap,
      title: 'Automation',
      color: '#a855f7',
      copy: 'Workflows and integrations that save time.',
      longCopy: 'Connect tools and automate workflows to save time. From marketing automation to internal processes — less manual work, more results.',
      details: ['CRM/email automation flows','No‑code/low‑code integrations','Back‑office process automation','Zapier/Make/API connectors'],
      href: '/automation'
    },
    {
      Icon: Monitor,
      title: 'PC Repair',
      color: '#ef4444',
      copy: 'Diagnostics, upgrades and maintenance.',
      longCopy: 'Diagnostics, upgrades and repairs for home and office setups. Get your devices running fast and reliably again.',
      details: ['Hardware diagnostics + upgrades','OS cleanups and reinstalls','Network/Wi‑Fi troubleshooting','Data transfer and backups'],
      href: '/pc-repair'
    },
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
                      <div className="rounded-[15px] p-7 md:p-8 flex flex-col justify-between h-full gap-3" style={{ width: '100%', height: '180px', color: '#fff' }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color, color: '#0f1419' }}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-white text-base font-semibold">{title}</h3>
                        </div>
                        <a href={serviceCards[i].href} className="pt-1 inline-flex items-center gap-2 text-xs text-white/90 hover:text-white">
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
                      <p className="text-white/80 text-sm mb-4">{(serviceCards[previewService] as any).longCopy || serviceCards[previewService].copy}</p>
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
      
       {/* Why Choose Us Section */}
      <section id="why-choose" className="w-full flex flex-col items-center bg-[#79d5e908] px-6 py-24">
        <Reveal className="w-full max-w-[1280px] flex flex-col items-center gap-4 mb-12">
          <span className="text-[14px] font-semibold tracking-wider text-[#79d5e9] uppercase">Why Choose Us</span>
          <h2 className="w-full max-w-[768px] text-[36px] md:text-[48px] font-bold leading-tight text-white text-center -tracking-[0.035em]">Your Trusted Web Partner</h2>
          <p className="w-full max-w-[576px] text-[18px] leading-[26px] text-white/75 text-center">Over 15 years of experience delivering exceptional web solutions to businesses across the UK</p>
        </Reveal>

        <div className="w-full max-w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: '15+ Years Experience', desc: 'Proven track record of successful projects', color: '#79d5e9' },
            { icon: Users, title: '100+ Happy Clients', desc: 'Businesses trust us with their online presence', color: '#22c55e' },
            { icon: Clock, title: 'Fast Turnaround', desc: 'Launch your website in weeks, not months', color: '#f59e0b' },
            { icon: HeartHandshake, title: 'Ongoing Support', desc: '7 days a week support and maintenance', color: '#8b5cf6' },
          ].map((item, i) => (
            <Reveal key={i} delayMs={i * 100}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `${item.color}33`, color: item.color }}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-white/75 text-sm">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

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

  {/* Process Section - Journey Style */}
      <section className="w-full bg-[#79d5e90d] px-6 py-24 overflow-hidden">
        <div className="container mx-auto max-w-[1280px]">
          <Reveal className="text-center mb-16">
            <span className="text-[14px] font-semibold tracking-wider text-[#3b82f6] uppercase">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">From Vision to Reality</h2>
            <p className="text-white/75 text-lg mt-4 max-w-[700px] mx-auto">
              A proven design process that delivers exceptional results
            </p>
          </Reveal>

          {/* Desktop Journey Layout */}
          <div className="hidden lg:block relative">
            {/* Flowing Line SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <path
                d="M 80 50 Q 280 20, 480 50 T 880 50 Q 1080 20, 1280 50"
                fill="none"
                stroke="url(#processGradient)"
                strokeWidth="2"
                strokeDasharray="8 8"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Process Steps */}
            <div className="relative flex justify-between items-center">
              {[
                { num: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and requirements', Icon: MessageSquare, offset: 'translate-y-0' },
                { num: '02', title: 'Design', desc: 'Creating stunning mockups and interactive prototypes', Icon: PenTool, offset: '-translate-y-12' },
                { num: '03', title: 'Development', desc: 'Building with clean, efficient, optimized code', Icon: Code2, offset: 'translate-y-0' },
                { num: '04', title: 'Testing', desc: 'Rigorous QA across devices and browsers', Icon: CheckCircle2, offset: '-translate-y-12' },
                { num: '05', title: 'Launch', desc: 'Deployment and ongoing support for your success', Icon: Rocket, offset: 'translate-y-0' },
              ].map((step, i) => (
                <Reveal key={i} delayMs={i * 150}>
                  <div className={`relative w-[220px] ${step.offset} transition-all duration-500`}>
                    {/* Connection Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-[#0f1419] shadow-lg shadow-[#3b82f6]/50 z-10" />
                    
                    {/* Card */}
                    <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 hover:border-[#3b82f6]/50 hover:shadow-xl hover:shadow-[#3b82f6]/10 transition-all duration-300 backdrop-blur-sm">
                      {/* Number Badge */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#3b82f6]/30 group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                      
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center mb-4 mt-2 group-hover:bg-[#3b82f6]/20 group-hover:scale-110 transition-all">
                        <step.Icon size={28} />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Layout */}
          <div className="lg:hidden space-y-8">
            {[
              { num: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and requirements', Icon: MessageSquare },
              { num: '02', title: 'Design', desc: 'Creating stunning mockups and interactive prototypes', Icon: PenTool },
              { num: '03', title: 'Development', desc: 'Building with clean, efficient, optimized code', Icon: Code2 },
              { num: '04', title: 'Testing', desc: 'Rigorous QA across devices and browsers', Icon: CheckCircle2 },
              { num: '05', title: 'Launch', desc: 'Deployment and ongoing support for your success', Icon: Rocket },
            ].map((step, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="relative">
                  {/* Vertical Line */}
                  {i < 4 && (
                    <div className="absolute left-6 top-full w-0.5 h-8 bg-gradient-to-b from-[#3b82f6]/50 to-transparent" />
                  )}
                  
                  {/* Card */}
                  <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 hover:border-[#3b82f6]/50 transition-all duration-300">
                    {/* Number Badge */}
                    <div className="absolute -top-3 -left-3 w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#3b82f6]/30">
                      {step.num}
                    </div>
                    
                    <div className="flex gap-4 items-start mt-2">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center">
                        <step.Icon size={28} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-white text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

     {/* Pricing Section - Improved */}
      <section id="pricing" className="w-full flex flex-col items-center bg-[#79d5e908] px-6 py-24">
        <Reveal className="w-full max-w-[1280px] flex flex-col items-center gap-4">
          <span className="text-[14px] font-semibold tracking-wider text-[#79d5e9] uppercase">Pricing</span>
          <h2 className="w-full max-w-[768px] text-[36px] md:text-[48px] font-bold leading-tight text-white text-center -tracking-[0.035em]">
            Flexible Plans for Every Budget
          </h2>
          <p className="w-full max-w-[576px] text-[18px] leading-[26px] text-white/75 text-center">
            Choose a package that fits your needs or contact us for a custom quote.
          </p>
        </Reveal>

        {/* Enhanced Pricing Mode Toggle */}
        <div className="mt-12 relative">
          <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-2 backdrop-blur-sm">
            <button 
              onClick={() => setPricingMode('oneoff')} 
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                pricingMode === 'oneoff' 
                  ? 'bg-gradient-to-br from-[#79d5e9] to-[#6bc7db] text-[#0f1419] shadow-lg shadow-[#79d5e9]/30 scale-105' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="text-left">
                  <div className="text-sm font-semibold">One-Off Payment</div>
                  <div className={`text-xs ${pricingMode === 'oneoff' ? 'opacity-80' : 'opacity-50'}`}>
                    Pay once, own forever
                  </div>
                </div>
              </div>
            </button>

            <button 
              onClick={() => setPricingMode('subscription')} 
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                pricingMode === 'subscription' 
                  ? 'bg-gradient-to-br from-[#79d5e9] to-[#6bc7db] text-[#0f1419] shadow-lg shadow-[#79d5e9]/30 scale-105' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div className="text-left">
                  <div className="text-sm font-semibold">Monthly Subscription</div>
                  <div className={`text-xs ${pricingMode === 'subscription' ? 'opacity-80' : 'opacity-50'}`}>
                    Ongoing support & updates
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Info Badge below toggle */}
          <div className="mt-4 text-center">
            {pricingMode === 'oneoff' ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                <svg className="w-4 h-4 text-[#79d5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Full ownership with optional support packages available
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                <svg className="w-4 h-4 text-[#79d5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Includes hosting, maintenance, and unlimited updates
              </div>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="w-full max-w-[1280px] mt-12">
          {pricingMode === 'oneoff' ? (
            // One-Off Pricing
            <div className="flex flex-wrap gap-8 items-stretch justify-center">
              {[
                { 
                  title: 'Starter', 
                  price: '£499', 
                  desc: 'Perfect for small businesses and startups', 
                  features: [
                    '5-page website',
                    'Responsive design',
                    'Basic SEO setup',
                    'Contact form integration',
                    '30 days post-launch support',
                    '7 days a week support'
                  ],
                  highlight: false,
                  color: '#22c55e'
                },
                { 
                  title: 'Professional', 
                  price: '£999', 
                  desc: 'For growing businesses with advanced needs', 
                  features: [
                    '15-page website',
                    'Custom design & animations',
                    'Advanced SEO optimization',
                    'CMS integration',
                    '90 days post-launch support',
                    '7 days a week support'
                  ],
                  highlight: false,
                  color: '#3b82f6'
                },
                { 
                  title: 'E-Commerce', 
                  price: '£1,399', 
                  desc: 'For online retailers and marketplaces', 
                  features: [
                    'E-Commerce ready (any platform)',
                    '15-page website',
                    'Custom design & animations',
                    'Advanced SEO optimization',
                    'CMS integration',
                    '90 days post-launch support',
                    '7 days a week support'
                  ],
                  highlight: false,
                  color: '#8b5cf6'
                },
              ].map((plan, i) => (
                <Reveal key={i} delayMs={i * 100}>
                  <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20 max-w-[384px] flex flex-col p-8 grow transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-sm">
                    {/* Colored accent line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${plan.color}, transparent)` }}
                    />
                    
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white text-2xl font-bold">{plan.title}</h3>
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-white text-5xl font-bold">{plan.price}</span>
                        <span className="text-white/40 text-sm">one-time</span>
                      </div>
                      
                      <p className="text-white/70 text-sm leading-relaxed">{plan.desc}</p>
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-3 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/85 text-sm">
                          <svg 
                            className="w-5 h-5 flex-shrink-0 mt-0.5" 
                            style={{ color: plan.color }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a 
                      href="mailto:alastair.blair@splitfin.uk?subject=One-Off%20Website%20Package%20Enquiry" 
                      className="w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                    >
                      Get Started
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            // Subscription Pricing
            <div className="flex flex-wrap gap-8 items-stretch justify-center">
              {[
                { 
                  title: 'Starter', 
                  price: '£39', 
                  desc: 'Perfect for small businesses and startups', 
                  features: [
                    '5-page website',
                    'Responsive design',
                    'Ongoing SEO support',
                    'Regular webpage updates',
                    'Image changes & optimization',
                    'Contact form management',
                    '7 days a week support'
                  ],
                  savings: 'Save £460 in year 1',
                  color: '#22c55e'
                },
                { 
                  title: 'Professional', 
                  price: '£49', 
                  desc: 'For growing businesses with advanced needs', 
                  features: [
                    '15-page website',
                    'Priority support & updates',
                    'Regular website updates',
                    'Image & graphic changes',
                    'Content updates & edits',
                    'Ongoing SEO optimization',
                    '7 days a week support'
                  ],
                  savings: 'Save £411 in year 1',
                  color: '#3b82f6'
                },
                { 
                  title: 'E-Commerce', 
                  price: '£59', 
                  desc: 'For online retailers and marketplaces', 
                  features: [
                    'E-Commerce ready (any platform)',
                    '15-page website',
                    'Priority support & updates',
                    'Product changes & uploads',
                    'Image & content updates',
                    'Inventory management support',
                    'Ongoing SEO optimization',
                    '7 days a week support'
                  ],
                  savings: 'Save £691 in year 1',
                  color: '#8b5cf6'
                },
              ].map((plan, i) => (
                <Reveal key={i} delayMs={i * 100}>
                  <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-[#79d5e9]/30 max-w-[384px] flex flex-col p-8 grow transition-all duration-300 hover:shadow-2xl hover:shadow-[#79d5e9]/10 hover:-translate-y-1 backdrop-blur-sm">
                    {/* Colored accent line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${plan.color}, transparent)` }}
                    />
                    
                    {/* Savings Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white text-xs font-semibold shadow-lg whitespace-nowrap">
                      {plan.savings}
                    </div>

                    {/* Header */}
                    <div className="mb-6 mt-2">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white text-2xl font-bold">{plan.title}</h3>
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-white text-5xl font-bold">{plan.price}</span>
                        <span className="text-white/40 text-sm">/month</span>
                      </div>
                      
                      <p className="text-white/70 text-sm leading-relaxed">{plan.desc}</p>
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-3 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/85 text-sm">
                          <svg 
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: plan.color }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a 
                      href="mailto:alastair.blair@splitfin.uk?subject=Monthly%20Subscription%20Package%20Enquiry" 
                      className="w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 bg-gradient-to-r from-[#79d5e9] to-[#6bc7db] text-[#0f1419] hover:shadow-lg hover:shadow-[#79d5e9]/30"
                    >
                      Subscribe Now
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* Additional Info */}
        <Reveal className="mt-16 text-center max-w-[800px]">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
            <h3 className="text-white text-xl font-semibold mb-3">Need a Custom Solution?</h3>
            <p className="text-white/70 mb-4">
              Every project is unique. Contact us for a tailored quote that perfectly matches your requirements and budget.
            </p>
            <a 
              href="mailto:alastair.blair@splitfin.uk?subject=Custom%20Website%20Quote%20Request" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#79d5e9]/30 text-[#79d5e9] font-semibold hover:bg-[#79d5e9]/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get Custom Quote
            </a>
          </div>
        </Reveal>
      </section>
      {/* Technologies */}
      <section id="technologies" className="w-full flex flex-col items-center bg-[#79d5e90d] px-6 py-24">
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
      
            {/* Contact */}
      <section id="contact" className="w-full flex flex-col items-center bg-[#79d5e908] px-6 py-24">
        <Reveal className="w-full max-w-[1280px] flex flex-col items-center gap-4 mb-12">
          <span className="text-[14px] font-semibold tracking-wider text-[#79d5e9] uppercase">Get In Touch</span>
          <h2 className="w-full max-w-[768px] text-[36px] md:text-[48px] font-bold leading-tight text-white text-center -tracking-[0.035em]">Ready to Start Your Project?</h2>
          <p className="w-full max-w-[576px] text-[18px] leading-[26px] text-white/75 text-center">Get in touch today for a free consultation and quote</p>
        </Reveal>

        <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Phone, title: 'Call Us', value: '+44 7405 578 939', href: 'tel:+447405578939' },
            { icon: Mail, title: 'Email Us', value: 'alastair.blair@splitfin.uk', href: 'mailto:alastair.blair@splitfin.uk' },
            { icon: MapPin, title: 'Location', value: 'Kidderminster, UK', href: '#' },
          ].map((contact, i) => (
            <Reveal key={i} delayMs={i * 100}>
              <a 
                href={contact.href}
                className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#79d5e9]/10 text-[#79d5e9] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <contact.icon size={24} />
                </div>
                <div className="text-sm text-white/60 mb-1">{contact.title}</div>
                <div className="text-white font-medium">{contact.value}</div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="w-full max-w-[700px]">
          <form 
            className="rounded-xl border border-white/10 bg-white/5 p-8"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget as HTMLFormElement);
              const name = data.get('name');
              const email = data.get('email');
              const phone = data.get('phone');
              const message = data.get('message');
              const subject = encodeURIComponent(`Website enquiry from ${name}`);
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
              window.location.href = `mailto:alastair.blair@splitfin.uk?subject=${subject}&body=${body}`;
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  name="name" 
                  placeholder="Your name" 
                  className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all" 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email address" 
                  className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all" 
                  required 
                />
              </div>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone number (optional)" 
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all" 
              />
              <textarea 
                name="message" 
                placeholder="Tell us about your project..." 
                rows={5} 
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all resize-none" 
                required 
              />
              <button 
                type="submit" 
                className="w-full rounded-lg px-6 py-3 bg-[#79d5e9] text-[#0f1419] font-semibold hover:bg-[#6bc7db] transition-colors shadow-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </Reveal>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
