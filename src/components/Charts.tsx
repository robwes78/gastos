import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CATEGORY_COLORS } from '../constants'
import { formatMoney } from '../lib/format'

function formatTooltip(value: unknown): string {
  return formatMoney(typeof value === 'number' ? value : Number(value) || 0)
}

type Props = {
  trend: { label: string; total: number }[]
  byCategory: { category: string; total: number }[]
}

export function Charts({ trend, byCategory }: Props) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Evolución</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trend}>
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} stroke="#a3a3a3" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={48} stroke="#a3a3a3" />
              <Tooltip formatter={formatTooltip} cursor={{ fill: '#f5f5f5' }} />
              <Bar dataKey="total" fill="#171717" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">Por categoría</h2>
        {byCategory.length === 0 ? (
          <p className="py-16 text-center text-sm text-neutral-400">Sin datos en este período</p>
        ) : (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byCategory} dataKey="total" nameKey="category" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {byCategory.map((entry) => (
                    <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] ?? '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip formatter={formatTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
