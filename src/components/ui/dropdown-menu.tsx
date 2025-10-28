import * as React from 'react'
import { cn } from '@/lib/utils'

type Ctx = { open: boolean; setOpen: (v: boolean) => void }
const DropdownCtx = React.createContext<Ctx | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownCtx.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownCtx.Provider>
  )
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) {
  const ctx = React.useContext(DropdownCtx)
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
  return asChild
    ? React.cloneElement(children, { onClick, 'aria-expanded': open ? 'true' : 'false' })
    : (
      <button onClick={onClick} aria-expanded={open ? 'true' : 'false'}>{children}</button>
    )
}

type ContentProps = React.HTMLAttributes<HTMLDivElement> & { align?: 'start' | 'center' | 'end' }
export const DropdownMenuContent = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ className, align = 'end', ...props }, ref) => {
    const ctx = React.useContext(DropdownCtx)
    if (!ctx || !ctx.open) return null
    const alignment = align === 'start' ? 'left-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-0'
    return (
      <div
        ref={ref}
        className={cn('absolute z-50 mt-2 min-w-[10rem] rounded-md border bg-background p-1 shadow-md', alignment, className)}
        {...props}
      />
    )
  }
)
DropdownMenuContent.displayName = 'DropdownMenuContent'

export function DropdownMenuLabel(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <div className={cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', className)} {...rest} />
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-border" />
}

export function DropdownMenuGroup(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <div className={cn('px-0 py-0', className)} {...rest} />
}

export function DropdownMenuItem(
  props: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
) {
  const { className, inset, ...rest } = props
  return (
    <div
      role="menuitem"
      className={cn(
        'flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-muted',
        inset && 'pl-8',
        className
      )}
      {...rest}
    />
  )
}

