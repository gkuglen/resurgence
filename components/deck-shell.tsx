'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Section = { id: string; label: string }

export function DeckShell({
  sections,
  children,
}: {
  sections: Section[]
  children: React.ReactNode
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { root, threshold: [0.5, 0.6, 0.75] },
    )

    root.querySelectorAll('[data-slide]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  const goTo = (id: string) => {
    scrollRef.current
      ?.querySelector(`#${id}`)
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === active),
  )

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-background">
      {/* Progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{
            width: `${((activeIndex + 1) / sections.length) * 100}%`,
          }}
        />
      </div>

      {/* Right-side dot navigation */}
      <nav
        aria-label="Slide navigation"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex"
      >
        {sections.map((s) => {
          const isActive = s.id === active
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(s.id)}
              className="group relative flex items-center"
              aria-label={`Go to ${s.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                {s.label}
              </span>
              <span
                className={cn(
                  'block rounded-full transition-all duration-300',
                  isActive
                    ? 'h-2.5 w-2.5 bg-primary ring-2 ring-primary/25 ring-offset-2 ring-offset-background'
                    : 'h-2 w-2 bg-border group-hover:bg-muted-foreground',
                )}
              />
            </button>
          )
        })}
      </nav>

      <div
        ref={scrollRef}
        className="deck-scroll h-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
      >
        {children}
      </div>
    </div>
  )
}
