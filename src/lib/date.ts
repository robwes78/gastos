import type { Period } from '../types'

export function toISODate(date: Date): string {
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function startOfWeek(date: Date): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const weekday = (result.getDay() + 6) % 7
  result.setDate(result.getDate() - weekday)
  return result
}

export function addPeriods(date: Date, period: Period, amount: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  if (period === 'day') result.setDate(result.getDate() + amount)
  if (period === 'week') result.setDate(result.getDate() + amount * 7)
  if (period === 'month') result.setMonth(result.getMonth() + amount)
  return result
}

export function periodRange(anchor: Date, period: Period): { start: Date; end: Date } {
  if (period === 'day') {
    const start = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate())
    return { start, end: start }
  }
  if (period === 'week') {
    const start = startOfWeek(anchor)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    return { start, end }
  }
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0)
  return { start, end }
}

export function eachDay(start: Date, end: Date): Date[] {
  const days: Date[] = []
  const cursor = new Date(start)
  while (cursor <= end) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

export function formatRange(anchor: Date, period: Period): string {
  const { start, end } = periodRange(anchor, period)
  if (period === 'day') {
    return start.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }
  if (period === 'month') {
    return start.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  }
  const startLabel = start.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  const endLabel = end.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
  return `${startLabel} - ${endLabel}`
}
