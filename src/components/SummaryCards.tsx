import { formatMoney } from '../lib/format'

type Props = {
  total: number
  count: number
  average: number
  averageLabel: string
}

export function SummaryCards({ total, count, average, averageLabel }: Props) {
  const cards = [
    { label: 'Total del período', value: formatMoney(total) },
    { label: 'Gastos registrados', value: String(count) },
    { label: averageLabel, value: formatMoney(average) },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-neutral-500">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
