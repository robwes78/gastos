import { useMemo, useState } from 'react'
import { Charts } from './components/Charts'
import { DataMenu } from './components/DataMenu'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { PeriodNav } from './components/PeriodNav'
import { SummaryCards } from './components/SummaryCards'
import { useExpenses } from './hooks/useExpenses'
import { addPeriods, eachDay, parseISODate, periodRange, toISODate } from './lib/date'
import type { Expense, Period } from './types'

const AVERAGE_LABELS: Record<Period, string> = {
  day: 'Media por gasto',
  week: 'Media diaria',
  month: 'Media diaria',
}

export default function App() {
  const { expenses, addExpense, updateExpense, removeExpense, replaceExpenses } = useExpenses()
  const [period, setPeriod] = useState<Period>('week')
  const [anchor, setAnchor] = useState(() => new Date())
  const [editing, setEditing] = useState<Expense | null>(null)
  const [notice, setNotice] = useState('')

  const { start, end } = useMemo(() => periodRange(anchor, period), [anchor, period])

  const visible = useMemo(() => {
    const from = toISODate(start)
    const to = toISODate(end)
    return expenses
      .filter((expense) => expense.date >= from && expense.date <= to)
      .sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1))
  }, [expenses, start, end])

  const total = useMemo(() => visible.reduce((sum, expense) => sum + expense.amount, 0), [visible])

  const trend = useMemo(() => {
    if (period === 'month' || period === 'week') {
      return eachDay(start, end).map((day) => {
        const iso = toISODate(day)
        return {
          label: day.toLocaleDateString('es-ES', period === 'week' ? { weekday: 'short' } : { day: 'numeric' }),
          total: visible.filter((expense) => expense.date === iso).reduce((sum, expense) => sum + expense.amount, 0),
        }
      })
    }
    return visible
      .slice()
      .reverse()
      .map((expense) => ({ label: expense.category, total: expense.amount }))
  }, [visible, start, end, period])

  const byCategory = useMemo(() => {
    const totals = new Map<string, number>()
    for (const expense of visible) {
      totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount)
    }
    return [...totals.entries()]
      .map(([category, categoryTotal]) => ({ category, total: categoryTotal }))
      .sort((a, b) => b.total - a.total)
  }, [visible])

  const average = useMemo(() => {
    if (visible.length === 0) return 0
    if (period === 'day') return total / visible.length
    return total / eachDay(start, end).length
  }, [visible.length, total, period, start, end])

  function handleSubmit(expense: Omit<Expense, 'id'>) {
    if (editing) {
      updateExpense(editing.id, expense)
      setEditing(null)
    } else {
      addExpense(expense)
    }
    setAnchor(parseISODate(expense.date))
    setNotice('')
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-5 px-4 py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-50">Mis Gastos</h1>
          <p className="text-sm text-neutral-400">Registro diario, semanal y mensual. Todo se guarda en tu navegador.</p>
        </div>
        <DataMenu expenses={expenses} onImport={replaceExpenses} onError={setNotice} />
      </header>

      {notice && <p className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-400">{notice}</p>}

      <ExpenseForm editing={editing} onSubmit={handleSubmit} onCancelEdit={() => setEditing(null)} />

      <PeriodNav
        period={period}
        anchor={anchor}
        onPeriodChange={setPeriod}
        onShift={(amount) => setAnchor((current) => addPeriods(current, period, amount))}
        onToday={() => setAnchor(new Date())}
      />

      <SummaryCards
        total={total}
        count={visible.length}
        average={average}
        averageLabel={AVERAGE_LABELS[period]}
      />

      <Charts trend={trend} byCategory={byCategory} />

      <ExpenseList expenses={visible} onEdit={setEditing} onDelete={removeExpense} />
    </div>
  )
}
