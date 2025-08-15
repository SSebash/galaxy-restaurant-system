"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface KitchenEfficiencyProps {
  data: Array<{
    period: string
    ordersCompleted: number
    averageTime: number
    efficiency: number
  }>
  title?: string
  description?: string
}

export function KitchenEfficiency({ data, title = "Eficiencia de Cocina", description = "Tiempo de preparación y rendimiento" }: KitchenEfficiencyProps) {
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

  const maxOrders = Math.max(...data.map(d => d.ordersCompleted || 0))
  
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
                <span className="text-white font-medium">{item.period || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={item.efficiency > 90 ? 'default' : item.efficiency > 70 ? 'secondary' : 'destructive'}>
                    {item.efficiency || 0}%
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {item.averageTime || 0}min
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.efficiency > 90 ? 'bg-green-500' : item.efficiency > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${maxOrders > 0 ? ((item.ordersCompleted || 0) / maxOrders) * 100 : 0}%` }}
                />
              </div>
              <div className="text-xs text-slate-500">
                Pedidos completados: {item.ordersCompleted || 0}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}