"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SalesTrendsProps {
  data: Array<{
    period: string
    sales: number
    growth: number
  }>
  title?: string
  description?: string
}

export function SalesTrends({ data, title = "Tendencias de Ventas", description = "Análisis de crecimiento de ventas" }: SalesTrendsProps) {
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
        <div className="h-[300px] w-full space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{item.period || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">${(item.sales || 0).toLocaleString()}</span>
                  <span className={`text-xs ${item.growth > 0 ? 'text-green-400' : item.growth < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth || 0}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${item.growth > 0 ? 'bg-green-500' : item.growth < 0 ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ width: `${maxSales > 0 ? ((item.sales || 0) / maxSales) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}