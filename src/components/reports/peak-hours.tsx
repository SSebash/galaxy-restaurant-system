"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PeakHoursProps {
  data: Array<{
    hour: string
    sales: number
    orders: number
    customers: number
    isPeak: boolean
  }>
  title?: string
  description?: string
}

export function PeakHours({ data, title = "Análisis de Horas Pico", description = "Identificación de horarios de mayor demanda" }: PeakHoursProps) {
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
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{item.hour || 'N/A'}</span>
                  {item.isPeak && (
                    <Badge variant="destructive">
                      PICO
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${(item.sales || 0).toLocaleString()}</div>
                  <div className="text-slate-400 text-sm">{item.customers || 0} clientes</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${item.isPeak ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ width: `${maxSales > 0 ? ((item.sales || 0) / maxSales) * 100 : 0}%` }}
                />
              </div>
              <div className="text-xs text-slate-500">
                Pedidos: {item.orders || 0} • Promedio: ${(item.sales && item.customers ? (item.sales / item.customers) : 0).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}