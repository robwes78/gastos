import { formatRange } from '../lib/date'
import type { Period } from '../types'

type Props = {
  period: Period
  anchor: Date
  onPeriodChange: (period: Period) => void
  onShift: (amount: number) => void
  onToday: () => void
}

const LABELS: Record<Period, string> = { day: 'Diario', week: 'Semanal', month: 'Mensual' }

export function PeriodNav({ period, anchor, onPeriodChange, onShift, onToday }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex rounded-xl border border-neutral-800 bg-neutral-900 p-1">
        {(Object.keys(LABELS) as Period[]).map((key) => (
          <button
            key={key}
            onClick={() => onPeriodChange(key)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
              period === key ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            {LABELS[key]}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label="Período anterior"
          onClick={() => onShift(-1)}
          className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-300 transition hover:bg-neutral-800"
        >
          &larr;
        </button>
        <span className="min-w-[12rem] text-center text-sm font-medium capitalize text-neutral-200">
          {formatRange(anchor, period)}
        </span>
        <button
          aria-label="Período siguiente"
          onClick={() => onShift(1)}
          className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-300 transition hover:bg-neutral-800"
        >
          &rarr;
        </button>
        <button
          onClick={onToday}
          className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-300 transition hover:bg-neutral-800"
        >
          Hoy
        </button>
      </div>
    </div>
  )
}
