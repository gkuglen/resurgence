import { DeckNav } from '@/components/deck-nav'
import { ModelDeck } from '@/components/model-deck'

export default function ModelPage() {
  return (
    <main className="theme-model bg-background">
      <DeckNav />
      <ModelDeck />
    </main>
  )
}
