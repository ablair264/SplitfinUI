import React from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delayMs?: number
  once?: boolean
  blur?: boolean
}

export default function Reveal({ children, className, delayMs = 0, once = true, blur = true }: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={
        `transition-all duration-700 ease-out will-change-transform ${
          visible ? 'opacity-100 translate-y-0' : `opacity-0 translate-y-6 ${blur ? 'blur-sm' : ''}`
        } ${className ?? ''}`
      }
    >
      {children}
    </div>
  )
}
