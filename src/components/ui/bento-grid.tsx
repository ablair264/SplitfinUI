import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { createContext, useContext, useState } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"

const BentoHoverContext = createContext<{
  hoveredCard: string | null;
  setHoveredCard: (cardName: string | null) => void;
}>({ hoveredCard: null, setHoveredCard: () => {} });

export const useBentoHover = () => useContext(BentoHoverContext);

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon?: React.ElementType
  description: string
  href: string
  cta: string
  accentColor?: string
  techLogos?: string[]
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  return (
    <BentoHoverContext.Provider value={{ hoveredCard, setHoveredCard }}>
      <div
        className={cn(
          "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-4 gap-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </BentoHoverContext.Provider>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  accentColor = '#75d0e5',
  techLogos = [],
  ...props
}: BentoCardProps) => {
  const { hoveredCard, setHoveredCard } = useBentoHover();
  const isHovered = hoveredCard === name;
  const isOtherHovered = hoveredCard && hoveredCard !== name;
  const isClickable = Boolean(href && href !== '#');
  
  return (
  <div
    key={name}
    className={cn(
      // Base card styling strictly via Tailwind for consistency
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl transition-all duration-300",
      "transform-gpu bg-[#0f1419]/75 [box-shadow:0_0_0_1px_rgba(255,255,255,.06)] [border:1px_solid_rgba(255,255,255,.12)] backdrop-blur-[2px]",
      isOtherHovered && "blur-[1px] opacity-80",
      className
    )}
    onMouseEnter={() => setHoveredCard(name)}
    onMouseLeave={() => setHoveredCard(null)}
    {...props}
  >
    <ShineBorder
      borderWidth={1}
      duration={14}
      shineColor={[accentColor, `${accentColor}66`, `${accentColor}22`]}
      className="opacity-40 group-hover:opacity-70 transition-opacity"
    />
    <div>{background}</div>
    <div className={cn(
      "absolute inset-0 flex flex-col",
      className?.includes('services-list') ? "justify-center items-center text-center" : 
      className?.includes('text-center') ? "justify-center items-center text-center" : "justify-end"
    )} style={{ padding: '32px' }}>
      <div className={cn(
        "pointer-events-none z-10 flex transform-gpu flex-col gap-3 transition-all duration-300 lg:group-hover:-translate-y-10",
        (className?.includes('text-center') || className?.includes('services-list')) && "items-center text-center"
      )}>
        {Icon && <Icon className="h-12 w-12 origin-left transform-gpu text-white/70 transition-all duration-300 ease-in-out group-hover:scale-75" />}
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className={cn(
            "text-2xl font-semibold text-[#79D5E9]",
            className?.includes('services-list') && "text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          )} style={{ lineHeight: '1.2' }}>
            {name}
          </h3>
          {techLogos.length > 0 && !className?.includes('services-list') && (
            <div className="flex gap-2">
              {techLogos.map((logo, index) => (
                <img 
                  key={index} 
                  src={logo} 
                  alt="Technology logo" 
                  className="w-6 h-6 object-contain opacity-80" 
                />
              ))}
            </div>
          )}
        </div>
        
        {className?.includes('services-list') ? (
          <div className="flex flex-col gap-4 max-w-none w-full">
            <p className="text-xl md:text-2xl lg:text-3xl text-[#94a3b8] font-medium mb-6">
              {description}
            </p>
            <div className="flex flex-col gap-4 items-start max-w-md mx-auto">
              {[
                'Bespoke Web Design',
                'Integrations with Existing Systems', 
                'Backend Development (Admin / Customer portals)',
                'e-Commerce (Shopify, Woocommerce, Magento etc)',
                'Graphic Design',
                'Computer Repair'
              ].map((service, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90 w-full">
                  <div className="w-2 h-2 bg-[#79D5E9] rounded-full flex-shrink-0"></div>
                  <span className="text-base md:text-lg font-medium text-left">{service}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className={cn(
            "max-w-lg text-[#94a3b8]",
            className?.includes('text-center') && "text-2xl md:text-3xl lg:text-4xl max-w-none font-medium"
          )} style={{ 
            fontSize: className?.includes('text-center') ? '24px' : '16px', 
            lineHeight: '1.5' 
          }}>{description}</p>
        )}
      </div>

    {cta && href && href !== '#' && !isClickable && (
      <div className={cn("pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden")} style={{ marginTop: '24px' }}> 
        <a href={href} className="pointer-events-auto p-0 inline-flex items-center text-white/90 hover:text-white/100 text-sm">
          {cta}
          <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </div>
    )}
    </div>

    {cta && href && href !== '#' && !isClickable && (
      <div className={cn("pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex")} style={{ padding: '32px' }}> 
        <a href={href} className="pointer-events-auto p-0 inline-flex items-center text-white/90 hover:text-white/100 text-sm">
          {cta}
          <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </div>
    )}

    {/* Gradient overlay that darkens on hover for better text readability */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 bg-gradient-to-t from-black/40 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/10" />

    {/* Make whole card clickable when there's a real link */}
    {isClickable && (
      <a href={href} aria-label={name} className="absolute inset-0 z-20" />
    )}
  </div>
  )
}

export { BentoCard, BentoGrid }
