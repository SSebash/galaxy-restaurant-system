"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProductPerformanceProps {
  data: Array<{
    name: string
    revenue: number
    cost: number
    profit: number
    margin: number
  }>
  title?: string
  description?: string
}

export function ProductPerformance({ data, title = "Rendimiento de Productos", description = "Análisis de rentabilidad por producto" }: ProductPerformanceProps) {
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

  const maxRevenue = Math.max(...data.map(d => d.revenue || 0))
  
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{item.name || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={item.margin > 30 ? 'default' : item.margin > 15 ? 'secondary' : 'destructive'}>
                    {item.margin || 0}%
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ${(item.profit || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.margin > 30 ? 'bg-green-500' : item.margin > 15 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${maxRevenue > 0 ? ((item.revenue || 0) / maxRevenue) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Ingresos: ${(item.revenue || 0).toLocaleString()}</span>
                <span>Costo: ${(item.cost || 0).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}