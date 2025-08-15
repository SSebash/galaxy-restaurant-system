"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface InventoryMovementsProps {
  data: Array<{
    productName: string
    type: 'IN' | 'OUT'
    quantity: number
    date: string
    user: string
    referenceType?: string
  }>
  title?: string
  description?: string
}

export function InventoryMovements({ data, title = "Movimientos de Inventario", description = "Registro de entradas y salidas" }: InventoryMovementsProps) {
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

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full space-y-3 overflow-y-auto">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{item.productName || 'N/A'}</span>
                  <Badge variant={item.type === 'IN' ? 'default' : 'destructive'}>
                    {item.type}
                  </Badge>
                </div>
                <div className="text-sm text-slate-400">
                  {item.user || 'N/A'} • {new Date(item.date).toLocaleDateString()}
                </div>
                {item.referenceType && (
                  <div className="text-xs text-slate-500">
                    Referencia: {item.referenceType}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${item.type === 'IN' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.type === 'IN' ? '+' : '-'}{item.quantity || 0}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}