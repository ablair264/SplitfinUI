import * as React from 'react'
import { Button } from '@/components/ui/button'

export default function UserMenu() {
  const [signedIn] = React.useState(false)
  return signedIn ? (
    <div className="inline-flex items-center gap-2">
      <div className="size-8 rounded-full bg-muted" aria-hidden />
      <span className="hidden text-sm md:inline">User</span>
    </div>
  ) : (
    <Button variant="outline" size="sm">Sign in</Button>
  )
}

