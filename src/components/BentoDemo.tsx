import React from 'react';
import { BentoCard, BentoGrid, useBentoHover } from '@/components/ui/bento-grid';
import { Plasma } from '@/components/ui/Plasma';

function StaticImageBackground({ src }: { src: string }) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className="absolute inset-0" style={{ zIndex: 0, pointerEvents: 'none' }}>
      <img
        src={src}
        alt="Background"
        onError={() => setHasError(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.8) saturate(1.1)',
        }}
      />
      {hasError && (
        <div className="absolute inset-0 grid place-items-center text-white/70 text-sm" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.4))' }}>
          Image placeholder ({src})
        </div>
      )}
    </div>
  );
}

function VideoBackground({ cardName, src, poster }: { cardName: string; src: string; poster?: string }) {
  const { hoveredCard } = useBentoHover();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = React.useState(false);
  const active = hoveredCard === cardName;

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  return (
    <div className="absolute inset-0 hidden lg:block" style={{ zIndex: 1, pointerEvents: 'none' }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="metadata"
        onError={() => setHasError(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: active && !hasError ? 1 : 0,
          transition: 'opacity 300ms ease',
          filter: 'brightness(0.9) saturate(1.05)',
        }}
      />
      {active && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
}

export default function BentoDemo() {
  const [tIndex, setTIndex] = React.useState(0);
  const testimonials = [
    {
      name: 'David Wilkins',
      role: 'Director',
      company: 'Shire Fuels',
      quote:
        'We approached Alastair at the start of launching our business and he made the entire process really simple for us. We were able to spend the time concentrating on other areas whilst he took care of our online presence. A quick, reliable and personable service. Highly recommended.',
    },
    {
      name: 'Matthew Langford',
      role: '',
      company: 'Haus & Harmony',
      quote:
        'Split Design created exactly what we asked for and even implemented solutions to vastly improve the way we approach adding products to our Shopify store',
    },
    {
      name: 'Juri S',
      role: '',
      company: 'Seastone Driveways & Patios',
      quote:
        "The Split Design subscription model means I can ask for updates whenever they're needed as my business continues to have larger and more complex projects to complete",
    },
  ];

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setTIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [testimonials.length]);

  const features = [
    {
      name: 'Our Clients',
      description: 'A selection of recent projects delivered across ecommerce, services and local trades.',
      href: '#',
      cta: 'Get Started →',
      className: 'col-span-1 md:col-span-2 md:row-span-1 text-center',
      background: (
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(135deg, #79D5E9 0%, #5ababe 25%, #3a8a9e 50%, #2a6b7a 75%, #1a4c5a 100%)',
              zIndex: 0
            }}
          />
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ zIndex: 1 }}
          >
            <Plasma color="#79D5E9" speed={0.6} direction="forward" scale={1.1} opacity={0.9} mouseInteractive={true} />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t"
            style={{
              zIndex: 2,
              backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0) 60%)'
            }}
          />
        </div>
      ),
    },
    // Keep two single cards on the right of row 1
    {
      name: 'Haus & Harmony',
      description: 'Haus & Harmony provide Luxury Home & Gift products across the UK.',
      href: 'https://hausandharmony.co.uk',
      cta: 'Visit Site',
      className: 'col-span-1 md:col-span-1',
      techLogos: ['/logos/shopify-logo.svg'],
      background: (
        <div className="absolute inset-0">
          <StaticImageBackground src="/images/cover5.webp" />
          <VideoBackground cardName="Haus & Harmony" src="/videos/5.mp4" />
        </div>
      ),
    },
    {
      name: '3 Counties Appliances',
      description: '3C Appliances repair and install domestic appliances.',
      href: 'https://3countiesappliances.com/',
      cta: 'Visit Site',
      className: 'col-span-1 md:col-span-1',
      techLogos: ['/logos/react.png', '/logos/supabase.png'],
      background: (
        <div className="absolute inset-0">
          <StaticImageBackground src="/images/cover2.webp" />
          <VideoBackground cardName="3 Counties Appliances" src="/videos/1.mp4" />
        </div>
      ),
    },
    // Testimonials card under Our Clients (row 2, span 2 columns)
    {
      name: '',
      description: '',
      href: '#',
      cta: '',
      className: 'col-span-1 md:col-span-2 md:row-span-1',
      background: (
        <div className="absolute inset-0 flex items-center justify-center p-6" style={{ zIndex: 3 }}>
          <div className="w-full h-full rounded-xl border border-white/10 bg-white/5 p-6 text-white/90 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[#eab308]">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} viewBox="0 0 20 20" className="w-4 h-4 fill-[#eab308]"><path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.954L10 0l2.947 5.956 6.562.954-4.755 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <p className="mt-3 text-white/90 text-base leading-relaxed">“{testimonials[tIndex].quote}”</p>
            <div className="mt-4 text-sm text-white/70 font-medium">{testimonials[tIndex].name}{testimonials[tIndex].role ? ` — ${testimonials[tIndex].role}` : ''}{testimonials[tIndex].company ? ` — ${testimonials[tIndex].company}` : ''}</div>
          </div>
        </div>
      ),
    },
    // Row 2 right side single cards
    {
      name: 'Shire Fuels',
      description: 'A fuel delivery company operating in Gloucestershire and Worcestershire',
      href: 'https://shirefuels.co.uk',
      cta: 'Visit site',
      className: 'col-span-1 md:col-span-1',
      techLogos: ['/logos/wordpress-color.svg'],
      background: (
        <div className="absolute inset-0 overflow-hidden">
          <StaticImageBackground src="/images/cover1.webp" />
          <VideoBackground cardName="Shire Fuels" src="/videos/3.mp4" />
        </div>
      ),
    },
    {
      name: 'Seastone Driveways',
      description: 'Seastone install driveways, patios, and landscaping in Worcestershire.',
      className: 'col-span-1 md:col-span-1',
      href: 'https://seastonedrivewaysandpatios.co.uk/',
      cta: 'Visit Site',
      techLogos: ['/logos/react.png'],
      background: (
        <div className="absolute inset-0">
          <StaticImageBackground src="/images/cover3.webp" />
          <VideoBackground cardName="Seastone Driveways" src="/videos/4.mp4" />
        </div>
      ),
    },
  ];

  return (
    <section id="features" style={{
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(121, 213, 233, 0.05) 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, rgba(247, 125, 17, 0.05) 1px, transparent 1px),
          radial-gradient(circle at 40% 40%, rgba(97, 188, 142, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px, 90px 90px, 120px 120px',
        pointerEvents: 'none'
      }} />
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        maxWidth: '1600px', 
        margin: '0 auto',
        padding: '0 12px'
      }}>
        <BentoGrid className="gap-8">
          {features.map((feature, idx) => (
            <BentoCard
              key={idx}
              {...(feature as any)}
              accentColor={[
                '#5ababe',
                '#79D5E9',
                '#75d0e5',
                '#f77d11',
                '#96bf47',
                '#9b59b6'
              ][idx % 6]}
            />
          ))}
        </BentoGrid>

        {/* End grid container */}
      </div>
    </section>
  );
}
