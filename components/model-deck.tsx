import Link from 'next/link'
import { MODEL, COST_ROWS } from '@/lib/deck-data'
import { DeckShell } from '@/components/deck-shell'
import { Slide, Kicker, CostTable } from '@/components/slide'

const sections = [
  { id: 'intro', label: 'The Model' },
  ...MODEL.slides.map((s) => ({ id: s.id, label: s.kicker })),
]

export function ModelDeck() {
  return (
    <DeckShell sections={sections}>
      {/* Hero */}
      <Slide id="intro">
        <div className="max-w-3xl">
          <Kicker>{MODEL.kicker}</Kicker>
          <h1 className="text-balance text-4xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            {MODEL.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {MODEL.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#overview"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Read the case study
            </Link>
            <Link
              href="/"
              className="rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              See it applied to one lot →
            </Link>
          </div>
        </div>
      </Slide>

      {MODEL.slides.map((slide) => (
        <Slide key={slide.id} id={slide.id}>
          <div className={slide.showTable ? '' : 'max-w-3xl'}>
            <Kicker>{slide.kicker}</Kicker>
            <h2 className="text-balance text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              {slide.heading}
            </h2>

            {slide.body && (
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {slide.body}
              </p>
            )}

            {slide.stats && (
              <div className="mt-10 flex flex-wrap gap-4">
                {slide.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-card px-6 py-4 shadow-sm"
                  >
                    <div className="font-display text-3xl font-bold text-primary sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {slide.points && (
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {slide.points.map((p, i) => (
                  <div
                    key={p.title}
                    className="rounded-xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 font-mono text-sm font-semibold text-primary">
                      {i + 1}
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {slide.steps && (
              <ol className="mt-10 flex flex-col gap-3">
                {slide.steps.map((step) => (
                  <li
                    key={step.n}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {slide.showTable && (
              <div className="mt-8">
                <CostTable rows={COST_ROWS} />
                {slide.footnote && (
                  <p className="mt-4 max-w-2xl text-pretty text-sm italic leading-relaxed text-muted-foreground">
                    {slide.footnote}
                  </p>
                )}
              </div>
            )}

            {slide.cta && (
              <div className="mt-10">
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                >
                  {slide.cta.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </div>
        </Slide>
      ))}
    </DeckShell>
  )
}
