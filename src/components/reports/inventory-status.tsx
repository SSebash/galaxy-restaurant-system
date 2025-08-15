"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface InventoryStatusProps {
  items: Array<{
    name: string
    currentStock: number
    minStock: number
    unit: string
  }>
}

export function InventoryStatus({ items }: InventoryStatusProps) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Estado del Inventario</CardTitle>
          <CardDescription className="text-slate-400">Control de stock y alertas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full flex items-center justify-center">
            <p className="text-slate-400">No hay datos de inventario disponibles</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStatus = (current: number, min: number) => {
    if (current <= min * 0.5) return { type: 'destructive', text: 'CRÍTICO' }
    if (current <= min) return { type: 'destructive', text: 'BAJO STOCK' }
    return { type: 'secondary', text: 'OK' }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Estado del Inventario</CardTitle>
        <CardDescription className="text-slate-400">Control de stock y alertas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => {
            const status = getStatus(item.currentStock || 0, item.minStock || 0)
            return (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium text-white">{item.name || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={status.type as any}>
                    {status.text}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {(item.currentStock || 0)}{item.unit || ''} (min: {(item.minStock || 0)}{item.unit || ''})
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}