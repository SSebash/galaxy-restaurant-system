"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface InventoryTurnoverProps {
  data: Array<{
    productName: string
    category: string
    turnoverRate: number
    daysOfSupply: number
    currentStock: number
    annualUsage: number
  }>
  title?: string
  description?: string
}

export function InventoryTurnover({ data, title = "Rotación de Inventario", description = "Eficiencia en el uso del inventario" }: InventoryTurnoverProps) {
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

  const maxTurnover = Math.max(...data.map(d => d.turnoverRate || 0))
  
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
                <div>
                  <span className="text-white font-medium">{item.productName || 'N/A'}</span>
                  <div className="text-sm text-slate-400">{item.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.turnoverRate > 12 ? 'default' : item.turnoverRate > 6 ? 'secondary' : 'destructive'}>
                    {item.turnoverRate || 0}x
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {item.daysOfSupply || 0}d
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.turnoverRate > 12 ? 'bg-green-500' : item.turnoverRate > 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${maxTurnover > 0 ? ((item.turnoverRate || 0) / maxTurnover) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Stock: {item.currentStock || 0}</span>
                <span>Uso anual: {item.annualUsage || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}