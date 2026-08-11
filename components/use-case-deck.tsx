import Link from 'next/link'
import Image from 'next/image'
import { USE_CASE } from '@/lib/deck-data'
import { DeckShell } from '@/components/deck-shell'
import { Slide, Kicker, CostTable, PlanFigure } from '@/components/slide'
import { CalculatorEmbed } from '@/components/calculator-embed'
import { COST_ROWS } from '@/lib/deck-data'

const sections = [
  { id: 'intro', label: 'Overview' },
  ...USE_CASE.slides.map((s) => ({
    id: s.id,
    label: s.kicker.replace(/^\d+\s*—\s*/, ''),
  })),
]

export function UseCaseDeck() {
  return (
    <DeckShell sections={sections}>
      {/* Hero */}
      <Slide id="intro">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Kicker>{USE_CASE.kicker}</Kicker>
            <h1 className="text-balance text-4xl font-bold leading-[1.05] text-foreground sm:text-6xl">
              {USE_CASE.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {USE_CASE.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="#lot"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Start the walkthrough
              </Link>
              <span className="font-mono text-xs text-muted-foreground">
                {USE_CASE.slides.length} steps · scroll or use the dots
              </span>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl border border-border bg-white shadow-sm md:mx-0 md:ml-auto">
            <Image
              src="/plans/front-elevation-render.png"
              alt="Perspective line-drawing render of the proposed four-story building: two balconied windows per floor beneath an ornate cornice, with a ground-floor garage and a car parked under, set between neighboring homes."
              width={1024}
              height={1024}
              priority
              className="h-auto w-full object-contain"
            />
          </figure>
        </div>
      </Slide>

      {USE_CASE.slides.map((slide) => (
        <Slide key={slide.id} id={slide.id}>
          {slide.isCalculator ? (
            <div>
              <Kicker>{slide.kicker}</Kicker>
              <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {slide.heading}
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {slide.body}
              </p>
              <div className="mt-8">
                <CalculatorEmbed />
              </div>
            </div>
          ) : slide.systems ? (
            <div>
              <Kicker>{slide.kicker}</Kicker>
              <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {slide.heading}
              </h2>
              <p className="mb-8 mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {slide.body}
              </p>
              {slide.unitTypes && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {slide.unitTypes.map((unit) => (
                    <div
                      key={unit.name}
                      className="flex flex-col rounded-xl border border-primary/30 bg-card p-5 shadow-sm"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {unit.name}
                        </h3>
                        <span className="font-mono text-xs text-primary">
                          {unit.size}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                        {unit.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {slide.systems.map((sys) => (
                  <div
                    key={sys.label}
                    className="border-t border-border pt-3"
                  >
                    <dt className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
                      {sys.label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {sys.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : slide.features ? (
            <div>
              <Kicker>{slide.kicker}</Kicker>
              <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {slide.heading}
              </h2>
              <p className="mb-8 mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {slide.body}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {slide.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
                  >
                    <h3 className="font-display text-base font-semibold leading-snug text-foreground text-balance">
                      {feature.title}
                    </h3>
                    {feature.pattern && (
                      <span className="mt-1.5 inline-flex w-fit rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[11px] font-medium text-secondary-foreground">
                        {feature.pattern}
                      </span>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {feature.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                Design principles from Christopher Alexander · A Pattern Language
              </p>
            </div>
          ) : slide.images ? (
            <div>
              <Kicker>{slide.kicker}</Kicker>
              <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {slide.heading}
              </h2>
              <p className="mb-8 mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {slide.body}
              </p>
              <div className="grid grid-cols-1 gap-6">
                {slide.images.map((fig) => (
                  <PlanFigure
                    key={fig.src}
                    src={fig.src}
                    alt={fig.alt}
                    caption={fig.caption}
                  />
                ))}
              </div>
            </div>
          ) : slide.showTable ? (
            <div>
              <Kicker>{slide.kicker}</Kicker>
              <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {slide.heading}
              </h2>
              <p className="mb-8 mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {slide.body}
              </p>
              <CostTable rows={COST_ROWS} />
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                6-unit example · California · 2025–26 pricing
              </p>
            </div>
          ) : (
            <div className="max-w-3xl">
              <Kicker>{slide.kicker}</Kicker>
              <h2 className="text-balance text-3xl font-bold leading-tight text-foreground sm:text-5xl">
                {slide.heading}
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {slide.body}
              </p>

              {slide.pull && (
                <blockquote className="mt-8 border-l-2 border-primary pl-5 font-display text-xl font-medium leading-snug text-foreground text-pretty sm:text-2xl">
                  {slide.pull}
                </blockquote>
              )}

              {slide.stats && (
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {slide.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border bg-card p-5 shadow-sm"
                    >
                      <div className="font-display text-2xl font-bold text-primary sm:text-3xl">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
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
          )}
        </Slide>
      ))}
    </DeckShell>
  )
}
