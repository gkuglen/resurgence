import type { Metadata } from 'next'
import { CalculatorApp } from '@/components/calculator/calculator-app'

export const metadata: Metadata = {
  title: 'Partnership Deal Calculator',
  description:
    'Real estate development partnership calculator — construction financing, seller-financed notes, traditional vs. prefab comparison.',
}

export default function CalculatorPage() {
  return <CalculatorApp />
}
