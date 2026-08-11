export type Expense = {
  id: string
  amount: number
  category: string
  date: string
  note: string
}

export type Period = 'day' | 'week' | 'month'
