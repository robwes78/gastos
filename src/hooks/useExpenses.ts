import { useCallback, useEffect, useState } from 'react'
import { loadExpenses, saveExpenses } from '../lib/storage'
import type { Expense } from '../types'

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses())

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    setExpenses((current) => [{ ...expense, id: crypto.randomUUID() }, ...current])
  }, [])

  const updateExpense = useCallback((id: string, expense: Omit<Expense, 'id'>) => {
    setExpenses((current) => current.map((item) => (item.id === id ? { ...expense, id } : item)))
  }, [])

  const removeExpense = useCallback((id: string) => {
    setExpenses((current) => current.filter((item) => item.id !== id))
  }, [])

  const replaceExpenses = useCallback((next: Expense[]) => {
    setExpenses(next)
  }, [])

  return { expenses, addExpense, updateExpense, removeExpense, replaceExpenses }
}
