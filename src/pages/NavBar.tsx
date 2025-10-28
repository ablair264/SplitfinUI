import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Bell, LineChart, Layers, Shield, Book, LifeBuoy, LayoutDashboard, Wrench, ShoppingCart, Search, Bot, Cpu, Code2 } from 'lucide-react';

const SlideItem: React.FC<{ label: string; href: string }> = ({ label, href }) => (
  <Link to={href} className="relative overflow-hidden h-7 group text-white/90 hover:text-white">
    <span className="block group-hover:-translate-y-full transition-transform duration-300">{label}</span>
    <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
      {label}
    </span>
  </Link>
);

const DropdownItem: React.FC<{ label: string; href: string; onClick?: () => void }> = ({ label, href, onClick }) => (
  <Link 
    to={href} 
    className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
    onClick={onClick}
  >
    {label}
  </Link>
);

const FeaturesDropdown: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Small delay to prevent flickering
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const featureItems = [
    {
      title: 'Web Design',
      desc: 'Modern, responsive sites tailored to your brand',
      Icon: LayoutDashboard,
      color: 'bg-cyan-500/10 text-cyan-400',
      href: '/web-design',
    },
    {
      title: 'E-Commerce',
      desc: 'Shopify, WooCommerce and custom storefronts',
      Icon: ShoppingCart,
      color: 'bg-emerald-500/10 text-emerald-400',
      href: '/ecommerce',
    },
    {
      title: 'SEO',
      desc: 'Technical, on-page and content optimisation',
      Icon: Search,
      color: 'bg-indigo-500/10 text-indigo-400',
      href: '/seo',
    },
  ];

  const serviceItems = [
    {
      title: 'Website Development',
      desc: 'Frontend, backend and integrations',
      Icon: Code2,
      color: 'bg-emerald-500/10 text-emerald-400',
      href: '/web-development',
    },
    {
      title: 'Automation',
      desc: 'Workflows and integrations to save time',
      Icon: Bot,
      color: 'bg-purple-500/10 text-purple-400',
      href: '/automation',
    },
    {
      title: 'PC Repair',
      desc: 'Diagnostics, upgrades and repairs',
      Icon: Cpu,
      color: 'bg-rose-500/10 text-rose-400',
      href: '/pc-repair',
    },
  ];

  const Item = ({ title, desc, Icon, color, href, badge, badgeColor }: any) => (
    <Link to={href} className="px-3 py-4 hover:bg-white/5 hover:rounded-xl flex items-center transition-all duration-300">
      <div className={`rounded-lg w-12 h-12 flex items-center justify-center ${color}`}>
        <Icon size={22} />
      </div>
      <div className="ml-4 w-4/5">
        <h5 className="text-white text-base mb-1.5 font-semibold flex items-center gap-2">
          {title}
          {badge && (
            <span className={`${badgeColor} text-xs font-medium px-2.5 py-1 rounded-full h-5`}>{badge}</span>
          )}
        </h5>
        <p className="text-xs font-medium text-white/60">{desc}</p>
      </div>
    </Link>
  );

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className="flex items-center gap-1 h-6 group cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="transition-transform duration-300">Services</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="z-50 absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-lg border border-white/10 bg-[#0f1419]/95 backdrop-blur-md shadow-[0px_15px_30px_0px_rgba(16,24,40,0.25)] xl:p-8 lg:p-6 p-4 lg:min-w-[800px] md:min-w-[520px] min-w-[90vw]">
          <div className="lg:flex justify-between gap-6">
            <ul className="text-sm text-white/70 lg:w-1/2">
              {featureItems.map((it, idx) => (
                <li key={idx}>
                  <Item {...it} />
                </li>
              ))}
            </ul>
            <ul className="text-sm text-white/70 lg:w-1/2 mt-4 lg:mt-0">
              {serviceItems.map((it, idx) => (
                <li key={idx}>
                  <Item {...it} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const BrandMark = () => (
  <Link to="/" aria-label="Home" className="inline-flex items-center">
    <img
      src="/logos/split.png"
      alt="Splitfin"
      className="h-[28px] md:h-[28px] w-auto object-contain drop-shadow-[0_4px_8px_rgba(121,213,233,0.15)]"
    />
  </Link>
);

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - last.current;
      // Hide when scrolling down past 80px, show when scrolling up
      if (!open) {
        if (delta > 4 && y > 80) setHidden(true);
        else if (delta < -4) setHidden(false);
      }
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  React.useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-[linear-gradient(180deg,rgba(15,20,25,0.92),rgba(15,20,25,0.6))] backdrop-blur-xl border-b border-white/10 shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-all duration-300 ${hidden ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'}`}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-white text-[15px]">
        <BrandMark />
        <div className="hidden md:flex gap-6">
          <FeaturesDropdown />
          <SlideItem label="Portfolio" href="#features" />
          <SlideItem label="Contact" href="#contact" />
          <SlideItem label="About" href="#about" />
        </div>
        <div className="hidden md:flex gap-3">
          <a
            href="mailto:alastair.blair@splitfin.uk"
            className="border border-slate-600 bg-transparent px-4 py-2 rounded-[10px] text-white no-underline transition-colors hover:bg-slate-800/80"
          >
            Contact
          </a>
          <Link
            to="/pc-repair"
            className="bg-[linear-gradient(135deg,#79d5e9_0%,#6bc7db_100%)] text-[#0f1419] px-4 py-2 rounded-[10px] no-underline shadow-[0_8px_25px_rgba(121,213,233,0.15)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(121,213,233,0.35)] inline-flex items-center gap-2"
          >
            <Wrench size={16} /> PC Repair
          </Link>
        </div>
        <button
          aria-label="Open menu"
          className="md:hidden text-white/70"
          onClick={() => setOpen((s) => !s)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {/* Mobile */}
      <div className={'md:hidden w-full px-4 ' + (open ? 'flex' : 'hidden') + ' flex-col items-center gap-4 text-white text-base'}>
        <div className="w-full border-t border-white/10 bg-[rgba(26,31,42,0.95)] backdrop-blur-md p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <Link className="hover:text-cyan-300 text-sm" to="#features" onClick={() => setOpen(false)}>Portfolio</Link>
              <a className="hover:text-cyan-300 text-sm" href="mailto:alastair.blair@splitfin.uk" onClick={() => setOpen(false)}>Contact</a>
              <Link className="hover:text-cyan-300 text-sm" to="#about" onClick={() => setOpen(false)}>About</Link>
            </div>
            <a
              href="mailto:alastair.blair@splitfin.uk"
              onClick={() => setOpen(false)}
              className="border border-slate-600 bg-transparent px-4 py-2 rounded-[10px] text-white no-underline transition-colors hover:bg-slate-800/80"
            >
              Contact
            </a>
            <Link
              to="/pc-repair"
              onClick={() => setOpen(false)}
              className="bg-[linear-gradient(135deg,#79d5e9_0%,#6bc7db_100%)] text-[#0f1419] px-4 py-2 rounded-[10px] no-underline shadow-[0_8px_25px_rgba(121,213,233,0.15)] inline-flex items-center gap-2"
            >
              <Wrench size={16} /> PC Repair	
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
