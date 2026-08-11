import { CATEGORY_COLORS } from '../constants'
import { parseISODate } from '../lib/date'
import { formatMoney } from '../lib/format'
import type { Expense } from '../types'

type Props = {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

export function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">Movimientos</h2>
      {expenses.length === 0 ? (
        <p className="py-10 text-center text-sm text-neutral-500">Todavía no hay gastos en este período</p>
      ) : (
        <ul className="divide-y divide-neutral-800">
          {expenses.map((expense) => (
            <li key={expense.id} className="group flex items-center gap-3 py-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[expense.category] ?? '#94a3b8' }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-50">
                  {expense.category}
                  {expense.note && <span className="font-normal text-neutral-400"> - {expense.note}</span>}
                </p>
                <p className="text-xs text-neutral-500">
                  {parseISODate(expense.date).toLocaleDateString('es-ES', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
              </div>
              <span className="text-sm font-semibold text-neutral-50">{formatMoney(expense.amount)}</span>
              <div className="flex gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                <button
                  aria-label={`Editar gasto de ${expense.category}`}
                  onClick={() => onEdit(expense)}
                  className="rounded-md px-2 py-1 text-xs text-neutral-400 hover:bg-neutral-800"
                >
                  Editar
                </button>
                <button
                  aria-label={`Eliminar gasto de ${expense.category}`}
                  onClick={() => onDelete(expense.id)}
                  className="rounded-md px-2 py-1 text-xs text-red-400 hover:bg-red-950/40"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
