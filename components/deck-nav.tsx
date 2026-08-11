'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV, PROJECT } from '@/lib/deck-data'
import { cn } from '@/lib/utils'

export function DeckNav() {
  const pathname = usePathname()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-6">
      <Link
        href="/"
        className="pointer-events-auto flex items-center gap-2 rounded-full bg-card/80 px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm ring-1 ring-border backdrop-blur"
      >
        <img src="/resurgence.svg" alt="" aria-hidden className="h-5 w-5" />
        <span className="font-display tracking-tight">{PROJECT.wordmark}</span>
      </Link>

      <nav
        aria-label="Deck sections"
        className="pointer-events-auto flex items-center gap-1 rounded-full bg-card/80 p-1 shadow-sm ring-1 ring-border backdrop-blur"
      >
        {NAV.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
