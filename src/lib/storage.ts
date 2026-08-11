import { STORAGE_KEY } from '../constants'
import type { Expense } from '../types'

function isExpense(value: unknown): value is Expense {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.amount === 'number' &&
    Number.isFinite(candidate.amount) &&
    typeof candidate.category === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.note === 'string'
  )
}

export function parseExpenses(raw: string): Expense[] {
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('El archivo no contiene una lista de gastos')
  const expenses = parsed.filter(isExpense)
  if (expenses.length !== parsed.length) throw new Error('Algunos gastos tienen un formato inválido')
  return expenses
}

export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return parseExpenses(raw)
  } catch {
    return []
  }
}

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}
