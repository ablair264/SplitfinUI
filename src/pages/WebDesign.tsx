import React, { useRef } from 'react';
import { Paintbrush, Plus, Layout, Code2, Smartphone, Sparkles, Eye, Palette, ShoppingCart, TrendingUp, Zap, Monitor, MessageSquare, PenTool, CheckCircle2, Rocket, Check, ArrowRight, Users, Award, Clock, HeartHandshake, Star, Phone, Mail, MapPin } from 'lucide-react'
import Reveal from '@/components/Reveal';
import NavBar from './NavBar';
import { GradientHeader } from '@/components/AnimatedHeaders';
import TiltedCard from '@/components/ui/TiltedCard';
import { Plasma } from '@/components/ui/Plasma';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1419]">
      <div className="container mx-auto p-6">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <a href="/" className="inline-flex items-center gap-2">
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
                <a href="/#about" className="block mt-2 text-sm text-white/60 hover:underline">Company</a>
                <a href="/#features" className="block mt-2 text-sm text-white/60 hover:underline">Portfolio</a>
                <a href="/#process" className="block mt-2 text-sm text-white/60 hover:underline">Process</a>
              </div>
              <div>
                <h3 className="text-white uppercase">Services</h3>
                <a href="/web-design" className="block mt-2 text-sm text-white/60 hover:underline">Web Design</a>
                <a href="/ecommerce" className="block mt-2 text-sm text-white/60 hover:underline">E‑Commerce</a>
                <a href="/website-maintenance" className="block mt-2 text-sm text-white/60 hover:underline">Website Maintenance</a>
              </div>
              <div>
                <h3 className="text-white uppercase">Services</h3>
                <a href="/web-development" className="block mt-2 text-sm text-white/60 hover:underline">Web Development</a>
                <a href="/automation" className="block mt-2 text-sm text-white/60 hover:underline">Automation</a>
                <a href="/pc-repair" className="block mt-2 text-sm text-white/60 hover:underline">PC Repair</a>
              </div>
              <div>
                <h3 className="text-white uppercase">Contact</h3>
                <span className="block mt-2 text-sm text-white/60">alastair.blair@splitfin.uk</span>
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

const HeroSection: React.FC = () => {
  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '70vh', minHeight: '70svh', maxHeight: '70vh', background: 'transparent' }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <Plasma color="#3b82f6" speed={0.5} direction="forward" scale={1.1} opacity={0.9} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 'clamp(40px, 8vh, 60px) 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#3b82f6]/10 px-4 py-2 border border-[#3b82f6]/20">
          <Palette size={18} className="text-[#3b82f6]" />
          <span className="text-sm font-medium text-white/90">Web Design</span>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#ffffff', marginBottom: '12px' }}>
          Beautiful Web Design
        </h1>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
          <span style={{ color: '#3b82f6' }}>That Converts Visitors</span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 450, lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.85)', maxWidth: '820px', marginBottom: '30px' }}>
          Bespoke web designs crafted with over 15 years of experience. We create stunning, user-focused websites that drive results and grow your business.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#contact">
            <button style={{ padding: '14px 28px', fontSize: '18px', fontWeight: 600, background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)' }}>
              Get Started
            </button>
          </a>
          <a href="#services">
            <button style={{ padding: '14px 28px', fontSize: '18px', fontWeight: 600, background: 'transparent', color: '#ffffff', border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)' }}>
              View Services
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const WebDesignPage: React.FC = () => {
  const services = [
    {
      Icon: Layout,
      title: 'UI/UX Design',
      color: '#3b82f6',
      description: 'Intuitive interfaces that prioritize user experience and conversion',
      features: ['User research', 'Wireframing', 'Interactive prototypes', 'Usability testing']
    },
    {
      Icon: Smartphone,
      title: 'Responsive Design',
      color: '#8b5cf6',
      description: 'Designs that look perfect on every device and screen size',
      features: ['Mobile-first approach', 'Cross-browser compatibility', 'Flexible layouts', 'Touch-friendly interfaces']
    },
    {
      Icon: Sparkles,
      title: 'Brand Identity',
      color: '#ec4899',
      description: 'Cohesive visual identity that reflects your brand values',
      features: ['Logo design', 'Colour schemes', 'Typography selection', 'Style guides']
    },
    {
      Icon: Eye,
      title: 'Visual Design',
      color: '#f59e0b',
      description: 'Stunning visuals that capture attention and communicate effectively',
      features: ['Custom graphics', 'Icon design', 'Image selection', 'Visual hierarchy']
    },
    {
      Icon: Zap,
      title: 'Animations & Interactions',
      color: '#10b981',
      description: 'Engaging micro-interactions that bring your site to life',
      features: ['Smooth transitions', 'Hover effects', 'Loading animations', 'Scroll animations']
    },
    {
      Icon: Palette,
      title: 'Design Systems',
      color: '#06b6d4',
      description: 'Scalable design systems for consistency across your platform',
      features: ['Component libraries', 'Design tokens', 'Documentation', 'Version control']
    },
  ];

  return (
    <div className="web-design-page">
      <NavBar />
      <HeroSection />

      {/* Services Section */}
      <section id="services" className="w-full bg-[#0f1419] px-6 py-24">
        <Reveal className="container mx-auto max-w-[1280px]">
          <div className="text-center mb-12">
            <span className="text-[14px] font-semibold tracking-wider text-[#3b82f6] uppercase">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Comprehensive Design Solutions</h2>
            <p className="text-white/75 text-lg mt-4 max-w-[700px] mx-auto">
              From concept to completion, we handle every aspect of your web design project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ background: `${service.color}33`, color: service.color }}>
                    <service.Icon size={28} />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-white/75 text-sm mb-4 flex-grow">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-white/85">
                        <CheckCircle2 size={16} className="text-[#3b82f6]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

  {/* Process Section - Journey Style */}
      <section className="w-full bg-[#79d5e908] px-6 py-24 overflow-hidden">
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

      {/* Pricing Section */}
      <section className="w-full bg-[#0f1419] px-6 py-24">
        <div className="container mx-auto max-w-[1280px]">
          <Reveal className="text-center mb-12">
            <span className="text-[14px] font-semibold tracking-wider text-[#3b82f6] uppercase">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Flexible Pricing Options</h2>
            <p className="text-white/75 text-lg mt-4 max-w-[700px] mx-auto">
              Choose a package that fits your needs or contact us for a custom quote
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {[
              { 
                title: 'Starter', 
                price: '£499', 
                note: 'starting', 
                desc: 'Perfect for small businesses and startups', 
                features: ['5-page website', 'Responsive design', 'Basic SEO setup', 'Contact form', '30 days support', '7 days a week support'] 
              },
              { 
                title: 'Professional', 
                price: '£999', 
                note: 'starting', 
                desc: 'For growing businesses with advanced needs', 
                features: ['15-page website', 'Custom design & animations', 'Advanced SEO', 'CMS integration', '90 days support', '7 days a week support'],
                featured: true
              },
              { 
                title: 'E-Commerce', 
                price: '£1399', 
                note: 'starting', 
                desc: 'For online retailers and marketplaces', 
                features: ['E-Commerce Ready (Any Platform)', '15-page website', 'Custom design & animations', 'Advanced SEO', 'CMS integration', '90 days support', '7 days a week support'] 
              },
            ].map((plan, i) => (
              <Reveal key={i} delayMs={i * 120}>
                <div className={`rounded-xl border ${plan.featured ? 'border-[#3b82f6] bg-[#3b82f6]/5' : 'border-white/10 bg-white/5'} p-8 hover:bg-white/10 transition-all duration-300 h-full flex flex-col`}>
                  {plan.featured && (
                    <div className="text-[#3b82f6] text-sm font-semibold mb-4">MOST POPULAR</div>
                  )}
                  <h3 className="text-white text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-white text-5xl font-bold">{plan.price}</span>
                    <span className="text-white/60 pb-2">{plan.note}</span>
                  </div>
                  <p className="text-white/75 mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-white/85">
                        <CheckCircle2 size={16} className="text-[#3b82f6] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="mailto:alastair.blair@splitfin.uk">
                    <button className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${plan.featured ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                      Get Started
                    </button>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
            {/* Testimonials */}
      <section id="testimonials" className="w-full flex flex-col items-center bg-[#0f1419] px-6 py-24">
        <Reveal className="w-full max-w-[1280px] flex flex-col items-center gap-4 mb-12">
          <span className="text-[14px] font-semibold tracking-wider text-[#79d5e9] uppercase">Testimonials</span>
          <h2 className="w-full max-w-[768px] text-[36px] md:text-[48px] font-bold leading-tight text-white text-center -tracking-[0.035em]">What Our Clients Say</h2>
          <p className="w-full max-w-[576px] text-[18px] leading-[26px] text-white/75 text-center">Don't just take our word for it</p>
        </Reveal>

        <div className="w-full max-w-[1280px] grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah Thompson',
              company: 'Thompson & Co Accountants',
              text: 'Split Design transformed our outdated website into a modern, professional platform. Our client enquiries have increased by 40% since launch!',
              rating: 5
            },
            {
              name: 'James Mitchell',
              company: 'Mitchell Motors',
              text: 'The e-commerce site they built for us has completely streamlined our parts ordering process. Excellent communication throughout the project.',
              rating: 5
            },
            {
              name: 'Emma Roberts',
              company: 'Roberts Dental Practice',
              text: 'Professional, reliable, and always available when we need support. They truly understand what small businesses need online.',
              rating: 5
            },
          ].map((testimonial, i) => (
            <Reveal key={i} delayMs={i * 100}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-white/85 mb-6 flex-grow italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/60">{testimonial.company}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="w-full bg-[#3b82f6]/10 px-6 py-24">
        <Reveal className="container mx-auto max-w-[800px] text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-[600px] mx-auto">
            Let's discuss your project and create a stunning website that drives results
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:alastair.blair@splitfin.uk">
              <button className="px-8 py-4 bg-[#3b82f6] text-white rounded-lg font-semibold hover:bg-[#2563eb] transition-colors shadow-lg">
                Start Your Project
              </button>
            </a>
            <a href="/">
              <button className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View Portfolio
              </button>
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
};

export default WebDesignPage;
