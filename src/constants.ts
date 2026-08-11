export const CATEGORIES = [
  'Comida',
  'Transporte',
  'Hogar',
  'Salud',
  'Ocio',
  'Compras',
  'Servicios',
  'Otros',
] as const

export const CATEGORY_COLORS: Record<string, string> = {
  Comida: '#f97316',
  Transporte: '#0ea5e9',
  Hogar: '#8b5cf6',
  Salud: '#ef4444',
  Ocio: '#ec4899',
  Compras: '#14b8a6',
  Servicios: '#eab308',
  Otros: '#94a3b8',
}

export const STORAGE_KEY = 'gastos:expenses:v1'
