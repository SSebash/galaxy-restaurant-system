"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CategoryChartProps {
  data: Array<{
    name: string
    value: number
    revenue: number
    orders: number
  }>
  title?: string
  description?: string
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

export function CategoryChart({ 
  data, 
  title = "Rendimiento por Categoría", 
  description = "Análisis de ventas por tipo de plato" 
}: CategoryChartProps) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription className="text-slate-400">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <p className="text-slate-400">No hay datos disponibles</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const total = data.reduce((sum, item) => sum + (item.value || 0), 0)
  
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-white font-medium">{item.name || 'N/A'}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${(item.revenue || 0).toLocaleString()}</div>
                  <div className="text-slate-400 text-sm">{(item.orders || 0)} pedidos</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${total > 0 ? ((item.value || 0) / total) * 100 : 0}%`,
                    backgroundColor: COLORS[index % COLORS.length]
                  }}
                />
              </div>
              <div className="text-slate-500 text-xs">
                {total > 0 ? ((item.value || 0) / total * 100).toFixed(1) : '0'}% del total
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}