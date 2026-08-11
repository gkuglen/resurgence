import { CALCULATOR_URL, CALCULATOR_ALLOW_IFRAME } from '@/lib/deck-data'

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
          Per-unit cost model — all-electric mechanical
        </span>
      </div>
      {children}
    </div>
  )
}

export function CalculatorEmbed() {
  if (!CALCULATOR_URL) {
    return (
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/50 p-8 text-center">
        <p className="max-w-sm text-pretty text-sm text-muted-foreground">
          The live cost calculator embeds here. Add its Vercel URL to{' '}
          <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs text-foreground">
            CALCULATOR_URL
          </code>{' '}
          in{' '}
          <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs text-foreground">
            lib/deck-data.ts
          </code>
          .
        </p>
      </div>
    )
  }

  // True iframe embed — only when the target is public + framable.
  if (CALCULATOR_ALLOW_IFRAME) {
    return (
      <BrowserChrome>
        <iframe
          src={CALCULATOR_URL}
          title="Per-unit cost calculator"
          className="aspect-[16/10] w-full"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </BrowserChrome>
    )
  }

  // Fallback: a static preview with an expand affordance that opens the
  // full calculator (its own multi-tab, scrolling UI) in a new tab, rather
  // than nesting it inside the deck's own scroll-snap slides.
  return (
    <BrowserChrome>
      <a
        href={CALCULATOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the interactive calculator in a new tab"
        className="group relative block aspect-[16/10] w-full overflow-hidden"
      >
        <img
          src="/calculator-preview.png"
          alt="Preview of the interactive per-unit cost calculator"
          className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm ring-1 ring-border backdrop-blur transition-transform duration-200 group-hover:scale-110">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </span>
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 p-4 text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Open the interactive calculator
        </span>
      </a>
    </BrowserChrome>
  )
}
