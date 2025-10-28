import * as React from 'react'
import { cn } from '@/lib/utils'

type PopoverContextValue = {
  open: boolean
  setOpen: (v: boolean) => void
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  )
}

type TriggerProps = {
  asChild?: boolean
  children: React.ReactElement
}

export function PopoverTrigger({ asChild, children }: TriggerProps) {
  const ctx = React.useContext(PopoverContext)
  if (!ctx) return children
  const { open, setOpen } = ctx
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(!open)
  }
  React.useEffect(() => {
    const onDoc = () => setOpen(false)
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [setOpen])
  if (asChild) {
    return React.cloneElement(children, {
      onClick,
      'aria-expanded': open ? 'true' : 'false',
    })
  }
  return (
    <button onClick={onClick} aria-expanded={open ? 'true' : 'false'}>
      {children}
    </button>
  )
}

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'center' | 'end'
}

export const PopoverContent = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ className, align = 'center', style, ...props }, ref) => {
    const ctx = React.useContext(PopoverContext)
    if (!ctx) return null
    const { open } = ctx
    if (!open) return null
    const alignment =
      align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2'
    return (
      <div
        ref={ref}
        className={cn(
          'absolute z-50 mt-2 min-w-[12rem] rounded-md border bg-background p-2 shadow-md',
          alignment,
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)
PopoverContent.displayName = 'PopoverContent'

