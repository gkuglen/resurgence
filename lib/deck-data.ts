// ─────────────────────────────────────────────────────────────
// Single source of truth for all deck content.
// Swap the calculator URL and use-case specifics here.
// ─────────────────────────────────────────────────────────────

// The calculator now lives in this app at /calculator (ported from the
// standalone propdev-28 Vite project), so it's always same-origin — no
// cross-deployment auth/framing issues to work around.
export const CALCULATOR_URL = '/calculator'

// The calculator is its own multi-tab, scrolling experience — deliberately
// not iframed inline. The deck shows a static preview (see calculator-embed.tsx,
// public/calculator-preview.png) with an expand affordance that opens it in a
// new tab instead.
export const CALCULATOR_ALLOW_IFRAME = false

export const PROJECT = {
  wordmark: 'Single-Family → Six-Unit',
  tagline: 'Rebuilding the Boomer wealth transfer as attainable housing',
}

export const NAV = [
  { href: '/model', label: 'The Model' },
  { href: '/', label: 'The Use Case' },
]

  // ── The mechanical cost table (from the 6-unit California example) ──
export const COST_ROWS = [
  {
    system: 'Ducted heat pump HVAC',
    projectTotal: '$74,500 – $174,000',
    perUnit: '~$12,400 – $29,000',
  },
  {
    system: 'Heat pump water heaters',
    projectTotal: '$18,300 – $44,400',
    perUnit: '~$3,050 – $7,400',
  },
  {
    system: 'Net after incentives',
    projectTotal: '~$86,000 – $201,000',
    perUnit: '~$14,300 – $33,500',
    emphasis: true,
  },
]

type Stat = { value: string; label: string }
type Cta = { label: string; href: string }
type Figure = { src: string; alt: string; caption?: string }
type Feature = { title: string; pattern?: string; body: string }
type UnitType = { name: string; size: string; body: string }
type SystemSpec = { label: string; body: string }

type UseCaseSlide = {
  id: string
  kicker: string
  heading: string
  body: string
  pull?: string
  stats?: Stat[]
  images?: Figure[]
  features?: Feature[]
  unitTypes?: UnitType[]
  systems?: SystemSpec[]
  isCalculator?: boolean
  showTable?: boolean
  cta?: Cta
}

type ModelSlide = {
  id: string
  kicker: string
  heading: string
  body?: string
  stats?: Stat[]
  points?: { title: string; body: string }[]
  steps?: { n: string; title: string; body: string }[]
  showTable?: boolean
  footnote?: string
  cta?: Cta
}

// ── USE CASE: the linear, one-scenario story ──
// A concrete owner + lot, walking the model through a single system.
// Numbers are grounded in the California 6-unit mechanical example.
export const USE_CASE: {
  kicker: string
  title: string
  subtitle: string
  slides: UseCaseSlide[]
} = {
  kicker: 'A use case',
  title: 'One California lot, six all-electric homes',
  subtitle:
    'Following a single aging single-family lot through the model — and pricing one system, mechanical, from the bottom up.',
  slides: [
    {
      id: 'lot',
      kicker: '01 — The lot',
      heading: 'A quiet street, one aging owner, one house',
      body: 'A long-time owner holds a single-family home on a strong California lot. Most of their net worth is the equity in that house, and a transfer — sale or inheritance — is coming within the decade. The location is exactly where housing is least affordable.',
      pull: 'Predictable by design: age, location, and asset data are largely knowable in advance.',
    },
    {
      id: 'decision',
      kicker: '02 — The decision',
      heading: 'A traditional sale leaves value on the table',
      body: 'About 70% of the time, heirs sell an inherited home rather than keep it — they want the value, not the property. So instead of one estate sale, the owner is offered a better outcome: partner before the transfer and let the lot become something worth more, collectively, than a single sale.',
      pull: '~70% of heirs sell the house anyway. Meet the transfer before it happens.',
    },
    {
      id: 'plan',
      kicker: '03 — The plan',
      heading: 'Tear down one home, rebuild six',
      body: 'The land that supports one home today can support 6–10 smaller, efficient, all-electric units instead. Each is priced well below the neighborhood’s single-family price — but together they’re worth more than one traditional sale, with margin left to fund the next lot.',
      stats: [
        { value: '1 → 6', label: 'homes on the lot' },
        { value: 'All-electric', label: 'efficient, modular units' },
        { value: 'Below market', label: 'per-unit sale price' },
      ],
    },
    {
      id: 'concept',
      kicker: '04 — The concept',
      heading: 'Same footprint, a very different building',
      body: 'The existing single-family home is replaced by a compact, four-story building on the identical lot, stacking five to six efficient homes where one stood before. The massing stays in character with the block.',
      images: [
        {
          src: '/plans/concept-sketch.png',
          alt: 'Side-by-side line drawings: the current single-family house on the left, the proposed four-story six-unit building on the right, both on the same lot.',
          caption: 'Current single-family home vs. the proposed six-unit concept — same 25′ × 100′ lot.',
        },
      ],
    },
    {
      id: 'build',
      kicker: '05 — The build',
      heading: 'Six homes, two efficient layouts',
      body: 'The building stacks two repeatable unit types — a ~450 sq ft one-bed and a ~900 sq ft two-bed — around a shared elevator and stair core, with shared wet walls to keep plumbing and electrical runs short. A ground-floor utility level carries the heat pumps and water heaters.',
      images: [
        {
          src: '/plans/elevations.png',
          alt: 'Architectural elevations of the proposed building: the front (street) elevation at left and the east elevation at right, with height and width dimensions.',
          caption: 'Front and east elevations — roughly 40′ tall on a 25′-wide frontage.',
        },
        {
          src: '/plans/floor-plans.png',
          alt: 'Floor plans for the ground floor plus three upper floors, each upper floor holding a one-bedroom and a two-bedroom unit around a central stair and elevator core, with a top-floor deck/garden.',
          caption: 'Ground floor plus three residential floors — a 1-bed and a 2-bed per level, topped by a deck/garden.',
        },
      ],
    },
    {
      id: 'why-bottom-up',
      kicker: '06 — Why it has to be exact',
      heading: 'At six units, small swings compound fast',
      body: 'You can’t price this per square foot. At 6–10 units per lot, a small per-unit cost swing multiplies across every home and decides whether the affordable price even pencils. So pricing is built bottom-up — system by system — starting with one: all-electric mechanical, HVAC plus hot water.',
      pull: 'Estimate per square foot and you guess. Build it system by system and you can defend it.',
    },
    {
      id: 'features',
      kicker: '07 — The product',
      heading: 'What makes a starter condo worth buying',
      body: 'Drawing on Christopher Alexander’s A Pattern Language, the modular layout is designed around a handful of livability principles — the same features that become the selling points for first-time buyers.',
      features: [
        {
          title: 'Human-scaled massing',
          pattern: 'Patterns 21 & 95',
          body: 'A modest four-story height, organized as a cluster of related units rather than a monolithic block, so the complex feels approachable and residential in scale.',
        },
        {
          title: 'Light on two sides of every room',
          pattern: 'Pattern 159',
          body: 'Every major room gets daylight from at least two exposures — reducing glare, improving mood, and making even compact units feel open.',
        },
        {
          title: 'Ground-floor mechanical strategy',
          pattern: 'Pattern 46',
          body: 'HVAC and water heating sit on the ground floor, optimizing energy efficiency and keeping the upper floors free for living space.',
        },
        {
          title: 'Two-bed, open-concept, two full baths',
          body: 'A flexible layout suited to young families, roommates, or a home office — with the convenience of two full bathrooms.',
        },
        {
          title: 'A generous farmhouse kitchen',
          pattern: 'Pattern 139',
          body: 'As large a kitchen as the unit allows, built around a central table that doubles as workspace and gathering place — the social heart of the home, not an isolated galley.',
        },
        {
          title: 'Dual-aspect light with a glass atrium core',
          body: 'Light enters each unit from both sides while a glazed atrium brings daylight down through the shared stair and elevator, keeping circulation bright and welcoming.',
        },
        {
          title: 'Energy-efficient ground-floor utilities',
          body: 'Centralizing mechanical systems at grade improves heat-pump performance year-round and simplifies maintenance access.',
        },
      ],
    },
    {
      id: 'systems',
      kicker: '08 — Unit types & building systems',
      heading: 'Two unit types, one all-electric building',
      body: 'The building repeats two floor plans across its residential levels, sharing a single set of ground-floor-anchored, solar-powered systems that serve all six homes.',
      unitTypes: [
        {
          name: 'One bedroom',
          size: '~450 sq ft · 1 bath',
          body: 'A straightforward layout with a shared wet wall for efficient plumbing and electrical, plus a washer/dryer hookup. Pantry and storage still to be finalized.',
        },
        {
          name: 'Two bedroom',
          size: '~900 sq ft · 2 ensuite baths',
          body: 'Open-concept with two ensuite bathrooms and a farmhouse-style kitchen (no island) with dedicated table space. Shared wet wall and washer/dryer hookup. Pantry and storage still to be finalized.',
        },
      ],
      systems: [
        {
          label: 'Solar',
          body: '~2,000 sq ft flat roof (25′ × 80′); usable area after the 3′ fire setback is 19′ × 74′ (1,406 sq ft). Fits ~68–72 commercial panels (430W–450W each) for a 29–32 kW DC system — covering up to 100% of production for all 6 units.',
        },
        {
          label: 'Electrical',
          body: 'Virtual Net Metering under consideration; the alternative is individually metered units with a dedicated solar allocation.',
        },
        {
          label: 'Elevator',
          body: 'Centrally located in the breezeway between buildings, ensuring all 6 units across 4 floors meet ADA / Universal Design standards.',
        },
        {
          label: 'HVAC',
          body: 'Split system with indoor air handlers in-unit and 6 exterior compressors on the ground floor. Each unit has its own heat pump.',
        },
        {
          label: 'Appliances',
          body: 'Induction ranges considered over electric coil (5–10% additional savings; ~$300–$400/unit added cost, ~$1,800–$2,400 total). All appliances electric to run on solar.',
        },
        {
          label: 'Water heating',
          body: 'Heat pump water heaters, ~150 kWh/month/unit, likely ground-floor placement to minimize electrical load and pair with solar.',
        },
      ],
    },
    {
      id: 'calculator',
      kicker: '09 — The tool',
      heading: 'Price the mechanical system, line by line',
      body: 'This is the live model for one system on the 6-unit building: equipment, distribution, electrical, and labor — with rebates and tax credits layered in to reach a true net cost. Change an input and the per-unit number moves with it.',
      isCalculator: true,
    },
    {
      id: 'numbers',
      kicker: '10 — The numbers',
      heading: 'What mechanical costs, per unit',
      body: 'For the 6-unit example at 2025–26 California pricing, the mechanical scope resolves to a defensible range once incentives are applied.',
      showTable: true,
    },
    {
      id: 'outcome',
      kicker: '11 — The outcome',
      heading: 'A price the next generation can actually buy',
      body: 'The same bottom-up approach extends to structure, sitework, and soft costs. With every line defensible, “replace one house with six” becomes a repeatable product: illiquid home equity turned into homes the next generation can buy — with enough margin to fund the next lot.',
      cta: { label: 'See the higher-level model', href: '/model' },
    },
  ],
}

// ── THE MODEL: the higher-level product study ──
export const MODEL: {
  kicker: string
  title: string
  subtitle: string
  slides: ModelSlide[]
} = {
  kicker: 'The model',
  title: 'From Single-Family to Six-Unit',
  subtitle:
    'A case study in turning a $70–90T generational asset transfer into a scalable infill housing model.',
  slides: [
    {
      id: 'overview',
      kicker: 'Overview',
      heading: 'The wealth is real — and it’s stuck in real estate',
      body: 'Over the next decade, Baby Boomers will pass on an estimated $70–90 trillion in assets, much of it locked inside single-family homes. At the same time, younger generations are largely priced out of buying in those same markets.',
      stats: [
        { value: '$70–90T', label: 'generational asset transfer' },
        { value: '~10 yrs', label: 'the window it lands in' },
      ],
    },
    {
      id: 'problem',
      kicker: 'The problem',
      heading: 'A predictable wave, with nothing connecting the two sides',
      points: [
        {
          title: 'The wealth is stuck',
          body: 'Most Boomer net worth sits in home equity, about to change hands over the next ~10 years.',
        },
        {
          title: 'Heirs don’t want the house',
          body: 'About 70% of the time, heirs sell an inherited home rather than keep it — they want the value, not the property.',
        },
        {
          title: 'The next generation can’t buy in',
          body: 'Those same homes are unaffordable at their single-family price point, in the same neighborhoods.',
        },
      ],
    },
    {
      id: 'insight',
      kicker: 'Key insight',
      heading: 'The value isn’t in the house — it’s in the land, and what it’s allowed to become',
      body: 'One lot that supports a single home today can support 6–10 smaller units instead — priced well below the original home, but worth more collectively than one traditional sale. Because the eventual sale or inheritance is predictable, owners can be approached proactively, before the estate sale even happens.',
    },
    {
      id: 'approach',
      kicker: 'Approach',
      heading: 'Five steps, repeatable per lot',
      steps: [
        { n: '1', title: 'Identify target properties', body: 'Aging owners, strong land value, favorable zoning.' },
        { n: '2', title: 'Partner pre-transfer', body: 'Offer the owner a better outcome than a traditional sale.' },
        { n: '3', title: 'Raise project-level capital', body: 'Sized off a detailed, defensible per-unit cost model.' },
        { n: '4', title: 'Rebuild at higher density', body: 'Smaller, efficient, all-electric units — 6–10 per lot.' },
        { n: '5', title: 'Sell into the affordability gap', body: 'Priced below prevailing single-family prices nearby.' },
      ],
    },
    {
      id: 'how',
      kicker: 'How the model works',
      heading: 'Priced bottom-up, system by system',
      body: 'At 6–10 units per lot, small per-unit cost swings compound fast — so pricing is built bottom-up, not estimated per square foot. The tool shows that approach applied to one system: all-electric mechanical for a 6-unit building, with rebates and tax credits layered in for a true net cost.',
      showTable: true,
      footnote:
        'Mechanical systems only. Acquisition, structure/shell, and capital-stack breakdowns extend the same method to the full per-unit price.',
    },
    {
      id: 'why',
      kicker: 'Why it matters',
      heading: 'Unit-level precision turns an idea into a product',
      body: 'Without it, “replace one house with six” is just an idea. With it, it’s repeatable: a way to turn illiquid Boomer home equity into housing the next generation can actually buy — with enough margin to fund the next lot. By standardizing our approach to the region’s typical lot size (approx. 25′ × 100′) and permit process, we reduce variability project to project — which means faster approvals, more predictable costs, and a repeatable model that scales.',
      cta: { label: 'Walk through a single lot', href: '/' },
    },
  ],
}
