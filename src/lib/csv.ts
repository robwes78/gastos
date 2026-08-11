import type { Expense } from '../types'

function escapeCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

export function toCSV(expenses: Expense[]): string {
  const header = ['fecha', 'categoria', 'importe', 'nota'].join(',')
  const rows = expenses.map((expense) =>
    [
      escapeCell(expense.date),
      escapeCell(expense.category),
      expense.amount.toFixed(2),
      escapeCell(expense.note),
    ].join(','),
  )
  return [header, ...rows].join('\n')
}

export function download(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
