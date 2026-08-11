import { useRef } from 'react'
import { download, toCSV } from '../lib/csv'
import { parseExpenses } from '../lib/storage'
import type { Expense } from '../types'

type Props = {
  expenses: Expense[]
  onImport: (expenses: Expense[]) => void
  onError: (message: string) => void
}

export function DataMenu({ expenses, onImport, onError }: Props) {
  const fileInput = useRef<HTMLInputElement>(null)

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      onImport(parseExpenses(await file.text()))
      onError('')
    } catch (error) {
      const detail = error instanceof SyntaxError ? '' : error instanceof Error ? `: ${error.message}` : ''
      onError(`No se pudo importar el archivo${detail}`)
    }
  }

  const buttonClass =
    'rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:bg-neutral-800'

  return (
    <div className="flex gap-2">
      <button className={buttonClass} onClick={() => download('gastos.json', JSON.stringify(expenses, null, 2), 'application/json')}>
        Exportar JSON
      </button>
      <button className={buttonClass} onClick={() => download('gastos.csv', toCSV(expenses), 'text/csv')}>
        Exportar CSV
      </button>
      <button className={buttonClass} onClick={() => fileInput.current?.click()}>
        Importar JSON
      </button>
      <input ref={fileInput} type="file" accept="application/json" className="hidden" onChange={handleFile} />
    </div>
  )
}
