import { useEffect, useState } from 'react'
import { CATEGORIES } from '../constants'
import { toISODate } from '../lib/date'
import type { Expense } from '../types'

type Props = {
  editing: Expense | null
  onSubmit: (expense: Omit<Expense, 'id'>) => void
  onCancelEdit: () => void
}

const emptyForm = () => ({
  amount: '',
  category: CATEGORIES[0] as string,
  date: toISODate(new Date()),
  note: '',
})

export function ExpenseForm({ editing, onSubmit, onCancelEdit }: Props) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editing) {
      setForm({
        amount: String(editing.amount),
        category: editing.category,
        date: editing.date,
        note: editing.note,
      })
      setError('')
    } else {
      setForm(emptyForm())
    }
  }, [editing])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const amount = Number(form.amount.replace(',', '.'))
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Introduce un importe mayor que 0')
      return
    }
    if (!form.date) {
      setError('Selecciona una fecha')
      return
    }
    setError('')
    onSubmit({ amount: Math.round(amount * 100) / 100, category: form.category, date: form.date, note: form.note.trim() })
    setForm(emptyForm())
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-900'

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        {editing ? 'Editar gasto' : 'Nuevo gasto'}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-xs text-neutral-500">Importe</span>
          <input
            className={inputClass}
            inputMode="decimal"
            placeholder="0,00"
            aria-label="Importe"
            value={form.amount}
            onChange={(event) => setForm({ ...form, amount: event.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-neutral-500">Categoría</span>
          <select
            className={inputClass}
            aria-label="Categoría"
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-neutral-500">Fecha</span>
          <input
            type="date"
            className={inputClass}
            aria-label="Fecha"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-neutral-500">Nota</span>
          <input
            className={inputClass}
            placeholder="Opcional"
            aria-label="Nota"
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
          />
        </label>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          {editing ? 'Guardar cambios' : 'Añadir gasto'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
