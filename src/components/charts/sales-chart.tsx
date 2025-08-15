"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SalesChartProps {
  data: Array<{
    hour: string
    sales: number
    orders: number
  }>
  title?: string
  description?: string
}

export function SalesChart({ data, title = "Ventas por Hora", description = "Distribución de ventas durante el día" }: SalesChartProps) {
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

  const maxSales = Math.max(...data.map(d => d.sales || 0))
  
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{item.hour || 'N/A'}</span>
                <span className="text-white font-medium">${(item.sales || 0).toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${maxSales > 0 ? ((item.sales || 0) / maxSales) * 100 : 0}%` }}
                />
              </div>
              <div className="text-xs text-slate-500">
                {(item.orders || 0)} pedidos
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}