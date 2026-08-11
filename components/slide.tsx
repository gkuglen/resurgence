import Image from 'next/image'
import { cn } from '@/lib/utils'

export function PlanFigure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="relative w-full bg-white p-4 sm:p-6">
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          width={1600}
          height={1000}
          className="h-auto w-full object-contain"
        />
      </div>
      {caption && (
        <figcaption className="border-t border-border bg-muted/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground sm:px-6">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function Slide({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      data-slide
      className={cn(
        'relative flex min-h-[100dvh] w-full snap-start items-center justify-center px-5 py-24 sm:px-8',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  )
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
      <span aria-hidden className="h-px w-6 bg-primary/50" />
      {children}
    </p>
  )
}

export function CostTable({
  rows,
}: {
  rows: {
    system: string
    projectTotal: string
    perUnit: string
    emphasis?: boolean
  }[]
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-5">
              System
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-5">
              Project total
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-5">
              Per-unit avg.
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.system}
              className={cn(
                'border-b border-border last:border-0',
                row.emphasis && 'bg-primary/5',
              )}
            >
              <td
                className={cn(
                  'px-4 py-3.5 text-sm sm:px-5',
                  row.emphasis
                    ? 'font-display font-semibold text-foreground'
                    : 'text-foreground',
                )}
              >
                {row.system}
              </td>
              <td className="px-4 py-3.5 text-right font-mono text-sm text-muted-foreground sm:px-5">
                {row.projectTotal}
              </td>
              <td
                className={cn(
                  'px-4 py-3.5 text-right font-mono text-sm sm:px-5',
                  row.emphasis
                    ? 'font-semibold text-primary'
                    : 'text-foreground',
                )}
              >
                {row.perUnit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
