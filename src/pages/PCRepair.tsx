import React from 'react';
import { Cpu, Wrench, HardDrive, Monitor, Wifi, Shield, CheckCircle2, Clock, MapPin, Phone, Mail, BookOpen, GraduationCap, Headphones } from 'lucide-react';
import Reveal from '@/components/Reveal';
import NavBar from './NavBar';
import { TypewriterHeader } from '@/components/AnimatedHeaders';
import { Plasma } from '@/components/ui/Plasma';
import { Helmet } from 'react-helmet-async';

// SEO Component
const SEOHead: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Split Design PC Repair Services",
    "image": "https://yourwebsite.com/logos/SplitDesign.png",
    "@id": "https://yourwebsite.com/pc-repair",
    "url": "https://yourwebsite.com/pc-repair",
    "telephone": "+44-0000-000000",
    "email": "alastair.blair@splitfin.uk",
    "priceRange": "£50-£150",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Worcester",
      "addressRegion": "Worcestershire",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.1920,
      "longitude": -2.2220
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://facebook.com/yourpage",
      "https://github.com/yourprofile"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Worcester"
      },
      {
        "@type": "City",
        "name": "Hereford"
      },
      {
        "@type": "City",
        "name": "Malvern"
      },
      {
        "@type": "City",
        "name": "Kidderminster"
      },
      {
        "@type": "City",
        "name": "Knightwick"
      },
      {
        "@type": "City",
        "name": "Suckley"
      },
      {
        "@type": "City",
        "name": "Great Witley"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "PC Repair and Computer Support Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hardware Repairs",
            "description": "Component replacements and upgrades for all PC hardware"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Virus Removal",
            "description": "Complete malware and virus removal services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Computer Guidance and Training",
            "description": "Software tutorials, computer training, and ongoing technical support"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>PC Repair Worcester, Malvern, Kidderminster | Computer Repairs & IT Support Worcestershire</title>
      <meta name="title" content="PC Repair Worcester, Malvern, Kidderminster | Computer Repairs & IT Support Worcestershire" />
      <meta name="description" content="Professional PC repair services in Worcester, Malvern, Kidderminster, Knightwick, Suckley & Great Witley. Expert hardware repairs, virus removal, upgrades & computer guidance. Free diagnosis, no fix no fee guarantee." />
      <meta name="keywords" content="PC repair Worcester, computer repair Worcestershire, laptop repair Malvern, virus removal Kidderminster, PC repair Knightwick, computer support Suckley, IT support Great Witley, hardware repair Herefordshire, computer guidance Worcester, software training Worcestershire" />
      <meta name="author" content="Split Design" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href="https://yourwebsite.com/pc-repair" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yourwebsite.com/pc-repair" />
      <meta property="og:title" content="Professional PC Repair Services | Worcestershire & Herefordshire" />
      <meta property="og:description" content="Fast, reliable computer repairs across Worcester, Malvern, Kidderminster & surrounding areas. Hardware fixes, virus removal, upgrades & computer training. Free diagnosis available." />
      <meta property="og:image" content="https://yourwebsite.com/images/pc-repair-og.jpg" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Split Design" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://yourwebsite.com/pc-repair" />
      <meta property="twitter:title" content="Professional PC Repair Services | Worcestershire & Herefordshire" />
      <meta property="twitter:description" content="Fast, reliable computer repairs across Worcester, Malvern, Kidderminster & surrounding areas. Free diagnosis & no fix no fee guarantee." />
      <meta property="twitter:image" content="https://yourwebsite.com/images/pc-repair-twitter.jpg" />

      {/* Geo Tags */}
      <meta name="geo.region" content="GB-WOR" />
      <meta name="geo.placename" content="Worcester" />
      <meta name="geo.position" content="52.1920;-2.2220" />
      <meta name="ICBM" content="52.1920, -2.2220" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1419]">
      <div className="container mx-auto p-6">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <a href="/" className="inline-flex items-center gap-2" aria-label="Split Design Home">
                <img className="h-7 w-auto" src="/logos/SplitDesign.png" alt="Split Design Logo - PC Repair Services Worcestershire" />
              </a>
              <p className="max-w-sm mt-3 text-white/60">
                Professional PC repair, computer support, and IT guidance across Worcestershire and Herefordshire.
              </p>
              <div className="flex mt-6 -mx-2">
                <a href="#" aria-label="Visit our Reddit page" className="mx-2 text-white/60 hover:text-[#79d5e9] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c-.006 5.52-4.48 9.994-10 10zM6.807 10.543a1.2 1.2 0 0 0-.999 1.922c.116.109.248.198.392.264a3.9 3.9 0 0 0 0 .439c0 2.24 2.615 4.062 5.829 4.062s5.83-1.822 5.83-4.062c.012-.146.012-.293 0-.439.607-.295.928-.972.773-1.628a1.37 1.37 0 0 0-1.42-1.13h-.053a1.38 1.38 0 0 0-1.357 1.03 7.73 7.73 0 0 0-3.85-1.23l.65-3.12 2.138.45a1 1 0 1 0 .909-1.85l-3.32-.61a.53.53 0 0 0-.592.41l-.748 3.473a7.69 7.69 0 0 0-3.9 1.17 1.39 1.39 0 0 0-1.017-.41zM12.18 16.524h-.338c-.83-.004-1.636-.275-2.299-.774a.53.53 0 0 1 .058-.881.53.53 0 0 1 .671.04c.56.41 1.237.631 1.933.629h.324c.686.001 1.355-.214 1.913-.614a.5.5 0 0 1 .483.84 3.55 3.55 0 0 1-2.745.764zM14.307 14.08h-.016l.008-.039a1.18 1.18 0 0 0-.865-1.553 1.19 1.19 0 0 0-1.149 1.711 1.16 1.16 0 0 0 1.022.861zM9.67 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                </a>
                <a href="#" aria-label="Visit our Facebook page" className="mx-2 text-white/60 hover:text-[#79d5e9] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.002 12.002c.001 4.919 3.578 9.108 8.436 9.879V14.892H7.902v-2.89h2.54v-2.2c-.113-1.042.243-2.081.972-2.834.729-.753 1.756-1.143 2.802-1.064.75.012 1.499.079 2.24.2v2.459H15.19c-.435-.057-.873.087-1.189.391-.316.304-.477.735-.438 1.173v1.878h2.771l-.443 2.891H13.563v6.989c5.254-.83 8.939-5.628 8.385-10.918C21.393 5.67 16.793 1.74 11.481 2.017 6.168 2.294 2.003 6.682 2.002 12.002z"/></svg>
                </a>
                <a href="#" aria-label="Visit our Github page" className="mx-2 text-white/60 hover:text-[#79d5e9] transition-colors">
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
          <p className="text-center text-white/60">© {new Date().getFullYear()} Split Design — All rights reserved | PC Repair Worcester | Computer Support Worcestershire</p>
        </div>
      </div>
    </footer>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section
      aria-label="PC Repair Services Hero"
      style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '70vh', minHeight: '70svh', maxHeight: '70vh', background: 'transparent' }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-15" aria-hidden="true">
        <Plasma color="#ef4444" speed={0.3} direction="forward" scale={1.3} opacity={0.8} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 'clamp(40px, 8vh, 60px) 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ef4444]/10 px-4 py-2 border border-[#ef4444]/20">
          <Wrench size={18} className="text-[#ef4444]" aria-hidden="true" />
          <span className="text-sm font-medium text-white/90">PC Repair & IT Support</span>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 800, lineHeight: 1.1, color: '#ffffff', marginBottom: '12px' }}>
          Professional PC Repair Services in
        </h1>
        <h2 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
          <span style={{ color: '#ef4444' }}>Worcester, Malvern & Worcestershire</span>
        </h2>

        <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 450, lineHeight: 1.5, color: 'rgba(255, 255, 255, 0.85)', maxWidth: '820px', marginBottom: '30px' }}>
          Expert computer repairs, hardware upgrades, virus removal, and IT guidance across Worcester, Malvern, Kidderminster, Knightwick, Suckley, Great Witley and throughout Worcestershire and Herefordshire. We also provide comprehensive computer guidance and software training for all your IT needs.
        </p>

        <div className="mb-6 flex flex-wrap items-center gap-4 justify-center text-sm text-white/80">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#ef4444]" aria-hidden="true" />
            <span>Serving Worcester, Hereford, Malvern, Kidderminster & surrounding villages</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="tel:+44000000000" aria-label="Call us now for PC repair">
            <button style={{ padding: '14px 28px', fontSize: '18px', fontWeight: 600, background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)' }}>
              Call Now for Free Diagnosis
            </button>
          </a>
          <a href="#contact" aria-label="Book a PC repair appointment">
            <button style={{ padding: '14px 28px', fontSize: '18px', fontWeight: 600, background: 'transparent', color: '#ffffff', border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)' }}>
              Book Computer Repair
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

const PCRepairPage: React.FC = () => {
  const services = [
    {
      Icon: HardDrive,
      title: 'Hardware Repairs & Upgrades',
      color: '#ef4444',
      description: 'Expert component replacements and PC upgrades',
      features: ['Hard drive & SSD replacement', 'RAM upgrades', 'Power supply repairs', 'Screen & keyboard repairs']
    },
    {
      Icon: Shield,
      title: 'Virus & Malware Removal',
      color: '#ef4444',
      description: 'Complete system cleaning and protection',
      features: ['Virus removal', 'Malware cleaning', 'Security software setup', 'System optimization']
    },
    {
      Icon: Cpu,
      title: 'Performance Optimization',
      color: '#ef4444',
      description: 'Speed up slow computers',
      features: ['System tune-ups', 'Startup optimization', 'Software cleanup', 'Driver updates']
    },
    {
      Icon: Monitor,
      title: 'System Builds & Setup',
      color: '#ef4444',
      description: 'Custom PC builds and installations',
      features: ['Custom PC builds', 'Operating system installation', 'Software setup', 'Hardware configuration']
    },
    {
      Icon: Wifi,
      title: 'Network & Connectivity',
      color: '#ef4444',
      description: 'Internet and network troubleshooting',
      features: ['WiFi setup', 'Network diagnostics', 'Router configuration', 'Connection issues']
    },
    {
      Icon: BookOpen,
      title: 'Computer Guidance & Training',
      color: '#ef4444',
      description: 'Software tutorials and ongoing IT support',
      features: ['Windows & Mac training', 'Software tutorials', 'Email & internet guidance', 'One-on-one coaching']
    }
  ];

  const areas = [
    'Worcester',
    'Hereford',
    'Malvern',
    'Kidderminster',
    'Knightwick',
    'Suckley',
    'Great Witley',
    'Evesham',
    'Droitwich',
    'Bromsgrove',
    'Redditch',
    'Pershore',
    'Tenbury Wells',
    'Ledbury',
    'Ross-on-Wye',
    'Stourport'
  ];

  return (
    <div className="w-full bg-[#0f1419] text-white">
      <SEOHead />
      <NavBar />
      <HeroSection />

      {/* Services Section */}
      <section className="w-full bg-[#79d5e908] px-6 py-24" aria-labelledby="services-heading">
        <Reveal className="container mx-auto max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="text-[14px] font-semibold tracking-wider text-[#ef4444] uppercase">Our Services</span>
            <h2 id="services-heading" className="text-3xl md:text-5xl font-bold text-white mt-2">
              Complete PC Repair & IT Support in Worcestershire
            </h2>
            <p className="text-white/75 text-lg mt-4 max-w-[800px] mx-auto">
              From hardware repairs to software guidance, we provide comprehensive computer services across Worcester, Malvern, Kidderminster, and all surrounding areas including Knightwick, Suckley, and Great Witley.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Reveal key={index} delayMs={index * 100}>
                <article className="rounded-xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${service.color}20` }}>
                    <service.Icon size={32} style={{ color: service.color }} aria-hidden="true" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/75 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/85">
                        <CheckCircle2 size={20} className="text-[#ef4444] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Computer Guidance Section - NEW */}
      <section className="w-full bg-[#0f1419] px-6 py-24" aria-labelledby="guidance-heading">
        <Reveal className="container mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <span className="text-[14px] font-semibold tracking-wider text-[#ef4444] uppercase">Training & Support</span>
            <h2 id="guidance-heading" className="text-3xl md:text-5xl font-bold text-white mt-2">
              Computer Guidance & Software Training
            </h2>
            <p className="text-white/75 text-lg mt-4 max-w-[800px] mx-auto">
              Not just repairs—we help you master your computer with personalized training and ongoing support across all software and operating systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delayMs={0}>
              <article className="rounded-xl border border-white/10 bg-white/5 p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-[#ef4444]/10 text-[#ef4444] flex items-center justify-center mx-auto mb-6">
                  <GraduationCap size={40} aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Software Training</h3>
                <p className="text-white/75 mb-4">
                  Learn to use Windows, macOS, Microsoft Office, email programs, web browsers, and any software you need help with.
                </p>
                <ul className="text-left text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>Microsoft Office tutorials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>Email & internet guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>Photo & video software</span>
                  </li>
                </ul>
              </article>
            </Reveal>

            <Reveal delayMs={150}>
              <article className="rounded-xl border border-white/10 bg-white/5 p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-[#ef4444]/10 text-[#ef4444] flex items-center justify-center mx-auto mb-6">
                  <Headphones size={40} aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Ongoing IT Support</h3>
                <p className="text-white/75 mb-4">
                  Get help whenever you need it with our friendly, patient technical support for all your computer questions.
                </p>
                <ul className="text-left text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>Remote assistance available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>Phone & email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>Quick response times</span>
                  </li>
                </ul>
              </article>
            </Reveal>

            <Reveal delayMs={300}>
              <article className="rounded-xl border border-white/10 bg-white/5 p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-[#ef4444]/10 text-[#ef4444] flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={40} aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Custom Tutorials</h3>
                <p className="text-white/75 mb-4">
                  Personalized one-on-one sessions tailored to your specific needs and learning pace. Perfect for seniors and beginners.
                </p>
                <ul className="text-left text-white/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>Patient, friendly instruction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>In-person or remote sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#ef4444] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>All skill levels welcome</span>
                  </li>
                </ul>
              </article>
            </Reveal>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/85 text-lg mb-6">
              Whether you need help setting up your new computer, learning software, or just want to become more confident with technology, we're here to guide you every step of the way.
            </p>
            <a href="#contact" className="inline-block">
              <button className="px-8 py-4 bg-[#ef4444] text-white rounded-lg font-semibold hover:bg-[#dc2626] transition-colors shadow-lg">
                Get Computer Guidance
              </button>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-[#79d5e908] px-6 py-24" aria-labelledby="why-choose-heading">
        <Reveal className="container mx-auto max-w-[1000px]">
          <div className="text-center mb-12">
            <span className="text-[14px] font-semibold tracking-wider text-[#ef4444] uppercase">Why Choose Us</span>
            <h2 id="why-choose-heading" className="text-3xl md:text-4xl font-bold text-white mt-2">
              Local, Trusted PC Repair in Worcestershire
            </h2>
            <p className="text-white/75 text-lg mt-4">
              Fast, reliable service you can depend on
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Clock, title: 'Same-Day Service', desc: 'Quick turnaround on most repairs' },
              { Icon: Shield, title: 'No Fix, No Fee', desc: 'You only pay if we fix the problem' },
              { Icon: MapPin, title: 'Local Service', desc: 'Proudly serving Worcestershire & Herefordshire communities' },
              { Icon: Phone, title: 'Free Diagnosis', desc: 'We assess the issue at no charge' },
            ].map((item, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <article className="rounded-xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#ef4444]/10 text-[#ef4444] flex items-center justify-center mx-auto mb-4">
                    <item.Icon size={32} aria-hidden="true" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/75 text-sm">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Coverage Areas */}
      <section className="w-full bg-[#0f1419] px-6 py-24" aria-labelledby="coverage-heading">
        <Reveal className="container mx-auto max-w-[1000px]">
          <div className="text-center mb-12">
            <span className="text-[14px] font-semibold tracking-wider text-[#ef4444] uppercase">Service Areas</span>
            <h2 id="coverage-heading" className="text-3xl md:text-4xl font-bold text-white mt-2">
              PC Repair Throughout Worcestershire & Herefordshire
            </h2>
            <p className="text-white/75 text-lg mt-4">
              We provide professional computer repair and IT support services across Worcester, Malvern, Kidderminster, Knightwick, Suckley, Great Witley and surrounding areas
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {areas.map((area, i) => (
              <Reveal key={i} delayMs={i * 50}>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-all duration-300">
                  <MapPin size={20} className="text-[#ef4444] mx-auto mb-2" aria-hidden="true" />
                  <span className="text-white/85 text-sm font-medium">{area}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/75">
              Not listed? <a href="#contact" className="text-[#ef4444] hover:underline">Contact us</a> to check if we cover your village or town across Worcestershire and Herefordshire
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pricing */}
      <section className="w-full bg-[#79d5e908] px-6 py-24" aria-labelledby="pricing-heading">
        <Reveal className="container mx-auto max-w-[1000px]">
          <div className="text-center mb-12">
            <span className="text-[14px] font-semibold tracking-wider text-[#ef4444] uppercase">Pricing</span>
            <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-white mt-2">
              Transparent, Fair Pricing for PC Repairs
            </h2>
            <p className="text-white/75 text-lg mt-4">
              No hidden fees—you'll know the cost before we start work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Free Diagnosis', price: 'FREE', desc: 'Full system check and detailed quote' },
              { title: 'Software Repair', price: 'From £50', desc: 'Virus removal, optimization & fixes' },
              { title: 'Hardware Repair', price: 'From £80', desc: 'Component replacement & upgrades' },
            ].map((item, i) => (
              <Reveal key={i} delayMs={i * 150}>
                <article className="rounded-xl border border-white/10 bg-white/5 p-8 text-center hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
                  <div className="text-4xl font-bold text-[#ef4444] my-4">{item.price}</div>
                  <p className="text-white/75 text-sm">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 text-center">
            <p className="text-white/75 text-sm">
              Parts and components charged at cost + labour. All work comes with a 90-day warranty. Computer guidance and training sessions priced on request.
            </p>
          </Reveal>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full bg-[#0f1419] px-6 py-24" aria-labelledby="contact-heading">
        <Reveal className="container mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold text-white mb-6">
              Get Your PC Fixed Today
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-[600px] mx-auto">
              Fast, professional computer repairs and IT support across Worcester, Malvern, Kidderminster, Knightwick, Suckley, Great Witley and all of Worcestershire and Herefordshire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <a href="tel:+44000000000" className="rounded-xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-300 block" aria-label="Call us for PC repair">
              <Phone size={32} className="text-[#ef4444] mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-white font-semibold mb-1">Call Us</h3>
              <p className="text-white/75 text-sm">+44 (0)0000 000000</p>
            </a>
            <a href="mailto:alastair.blair@splitfin.uk" className="rounded-xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition-all duration-300 block" aria-label="Email us about PC repair">
              <Mail size={32} className="text-[#ef4444] mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-white font-semibold mb-1">Email Us</h3>
              <p className="text-white/75 text-sm">alastair.blair@splitfin.uk</p>
            </a>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <Clock size={32} className="text-[#ef4444] mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-white font-semibold mb-1">Opening Hours</h3>
              <p className="text-white/75 text-sm">Mon-Sat: 9am-6pm</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+44000000000" aria-label="Book a PC repair now">
              <button className="px-8 py-4 bg-[#ef4444] text-white rounded-lg font-semibold hover:bg-[#dc2626] transition-colors shadow-lg">
                Book Computer Repair Now
              </button>
            </a>
            <a href="/" aria-label="Return to homepage">
              <button className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Back to Home
              </button>
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
};

export default PCRepairPage;
