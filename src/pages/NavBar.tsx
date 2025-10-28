import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Bell, LineChart, Layers, Shield, Book, LifeBuoy, LayoutDashboard, Wrench, ShoppingCart, Search, Bot, Cpu, Code2, X, Phone, Mail, User, AlertCircle, Home, Layout } from 'lucide-react';

const SlideItem: React.FC<{ label: string; href: string; Icon?: React.ElementType }> = ({ label, href, Icon }) => (
  <Link to={href} className="relative overflow-hidden h-7 group text-white/90 hover:text-white inline-flex items-center gap-1">
    {Icon && <Icon size={14} className="opacity-80" />}
    <span className="block group-hover:-translate-y-full transition-transform duration-300">{label}</span>
    <span className="block absolute top-full left-[calc(1rem+0px)] group-hover:translate-y-[-100%] transition-transform duration-300">
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
    }, 150);
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
      title: 'Website Maintenance',
      desc: 'Updates, security, backups and proactive care',
      Icon: Shield,
      color: 'bg-sky-500/10 text-sky-400',
      href: '/website-maintenance',
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
        className="inline-flex items-center gap-1 h-7 align-middle group cursor-pointer text-white/90 hover:text-white"
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

const PCRepairModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issueType: '',
    urgency: 'normal',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email body
    const subject = encodeURIComponent(`PC Repair Request from ${formData.name}`);
    const body = encodeURIComponent(
      `PC Repair Request Details:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Issue Type: ${formData.issueType}\n` +
      `Urgency: ${formData.urgency}\n\n` +
      `Description:\n${formData.description}`
    );
    
    // Open email client
    window.location.href = `mailto:alastair.blair@splitfin.uk?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        issueType: '',
        urgency: 'normal',
        description: '',
      });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#0f1419] border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#79d5e9]/10 flex items-center justify-center">
              <Wrench size={20} className="text-[#79d5e9]" />
            </div>
            <h2 className="text-2xl font-bold text-white">PC Repair Request</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Request Sent!</h3>
              <p className="text-white/70">We'll be in touch shortly to discuss your PC repair needs.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User size={18} className="text-[#79d5e9]" />
                  Your Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all"
                        placeholder="+44 7405 578 939"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertCircle size={18} className="text-[#79d5e9]" />
                  Issue Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Type of Issue *</label>
                    <select
                      required
                      value={formData.issueType}
                      onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-[#0f1419]">Select issue type</option>
                      <option value="hardware" className="bg-[#0f1419]">Hardware Problem</option>
                      <option value="software" className="bg-[#0f1419]">Software/OS Issue</option>
                      <option value="virus" className="bg-[#0f1419]">Virus/Malware Removal</option>
                      <option value="upgrade" className="bg-[#0f1419]">Upgrade/Installation</option>
                      <option value="data-recovery" className="bg-[#0f1419]">Data Recovery</option>
                      <option value="network" className="bg-[#0f1419]">Network/Connectivity</option>
                      <option value="other" className="bg-[#0f1419]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Urgency Level *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'low', label: 'Low', color: 'border-green-500/50 bg-green-500/5 text-green-400' },
                        { value: 'normal', label: 'Normal', color: 'border-[#79d5e9]/50 bg-[#79d5e9]/5 text-[#79d5e9]' },
                        { value: 'urgent', label: 'Urgent', color: 'border-red-500/50 bg-red-500/5 text-red-400' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: option.value })}
                          className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                            formData.urgency === option.value
                              ? option.color
                              : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Describe the Issue *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#79d5e9] focus:border-transparent transition-all resize-none"
                      placeholder="Please describe what's wrong with your PC, any error messages you've seen, and when the problem started..."
                    />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-[#79d5e9]/10 border border-[#79d5e9]/20 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-[#79d5e9]/20 flex items-center justify-center">
                      <Phone size={16} className="text-[#79d5e9]" />
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-white/90 font-medium mb-1">Need Immediate Help?</p>
                    <p className="text-white/70 mb-2">Call us directly at:</p>
                    <a href="tel:+447405578939" className="text-[#79d5e9] font-semibold hover:underline">
                      +44 7405 578 939
                    </a>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[linear-gradient(135deg,#79d5e9_0%,#6bc7db_100%)] text-[#0f1419] rounded-lg font-semibold shadow-lg hover:shadow-[0_15px_35px_rgba(121,213,233,0.35)] hover:-translate-y-0.5 transition-all"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
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
  const [pcRepairModalOpen, setPcRepairModalOpen] = useState(false);
  const last = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - last.current;
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
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-[linear-gradient(180deg,rgba(15,20,25,0.92),rgba(15,20,25,0.6))] backdrop-blur-xl border-b border-white/10 shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-all duration-300 ${hidden ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'}`}
      >
        <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-white text-[15px]">
          <BrandMark />
          <div className="hidden md:flex gap-6">
            <SlideItem label="Home" href="/" Icon={Home} />
            <FeaturesDropdown />
            <SlideItem label="Web Design" href="/web-design" Icon={Layout} />
            <SlideItem label="E‑Commerce" href="/ecommerce" Icon={ShoppingCart} />
            <SlideItem label="Website Maintenance" href="/website-maintenance" Icon={Shield} />
          </div>
          <div className="hidden md:flex gap-3">
            <a
              href="mailto:alastair.blair@splitfin.uk"
              className="border border-slate-600 bg-transparent px-4 py-2 rounded-[10px] text-white no-underline transition-colors hover:bg-slate-800/80"
            >
              Contact
            </a>
            <button
              onClick={() => setPcRepairModalOpen(true)}
              className="bg-[linear-gradient(135deg,#79d5e9_0%,#6bc7db_100%)] text-[#0f1419] px-4 py-2 rounded-[10px] shadow-[0_8px_25px_rgba(121,213,233,0.15)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(121,213,233,0.35)] inline-flex items-center gap-2"
            >
              <Wrench size={16} /> PC Repair
            </button>
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
        {/* Mobile full-screen overlay menu */}
        <div className={open ? 'md:hidden fixed inset-0 z-[80] flex' : 'hidden'}>
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
          {/* Panel */}
          <div className="relative z-[81] w-full h-full flex items-start justify-center pt-24 px-6">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[rgba(26,31,42,0.95)] shadow-xl p-6 text-white">
              <div className="flex flex-col items-start gap-4">
                <Link className="hover:text-cyan-300 text-base inline-flex items-center gap-3" to="/" onClick={() => setOpen(false)}><Home size={18} /> Home</Link>
                <Link className="hover:text-cyan-300 text-base inline-flex items-center gap-3" to="/web-design" onClick={() => setOpen(false)}><Layout size={18} /> Web Design</Link>
                <Link className="hover:text-cyan-300 text-base inline-flex items-center gap-3" to="/web-development" onClick={() => setOpen(false)}><Code2 size={18} /> Website Development</Link>
                <Link className="hover:text-cyan-300 text-base inline-flex items-center gap-3" to="/ecommerce" onClick={() => setOpen(false)}><ShoppingCart size={18} /> E‑Commerce</Link>
                <Link className="hover:text-cyan-300 text-base inline-flex items-center gap-3" to="/automation" onClick={() => setOpen(false)}><Bot size={18} /> Automation</Link>
                <Link className="hover:text-cyan-300 text-base inline-flex items-center gap-3" to="/website-maintenance" onClick={() => setOpen(false)}><Shield size={18} /> Website Maintenance</Link>

                <a
                  href="mailto:alastair.blair@splitfin.uk"
                  onClick={() => setOpen(false)}
                  className="mt-4 border border-slate-600 bg-transparent px-4 py-2 rounded-[10px] text-white no-underline transition-colors hover:bg-slate-800/80 self-stretch text-center"
                >
                  Contact
                </a>
                <button
                  onClick={() => { setOpen(false); setPcRepairModalOpen(true); }}
                  className="bg-[linear-gradient(135deg,#79d5e9_0%,#6bc7db_100%)] text-[#0f1419] px-4 py-3 rounded-[10px] shadow-[0_8px_25px_rgba(121,213,233,0.15)] inline-flex items-center gap-2 self-stretch justify-center"
                >
                  <Wrench size={16} /> PC Repair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PC Repair Modal */}
      <PCRepairModal isOpen={pcRepairModalOpen} onClose={() => setPcRepairModalOpen(false)} />
    </>
  );
};

export default NavBar;
