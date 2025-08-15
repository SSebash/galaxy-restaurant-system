'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, AlertTriangle, CheckCircle } from 'lucide-react'

interface InventoryStatusProps {
  products: Array<{
    id: string
    name: string
    stock: number
    minStock?: number
    unit: string
  }>
  inventoryMovements: Array<{
    id: string
    productId: string
    type: string
    quantity: number
    date: string
  }>
}

export function InventoryStatus({ products, inventoryMovements }: InventoryStatusProps) {
  const getStatus = (current: number, minimum: number) => {
    if (current <= minimum * 0.5) return { type: 'critical', color: 'destructive', icon: AlertTriangle }
    if (current <= minimum) return { type: 'warning', color: 'secondary', icon: AlertTriangle }
    return { type: 'good', color: 'default', icon: CheckCircle }
  }

  // Transformar los datos de productos al formato esperado
  const data = products.map(product => ({
    name: product.name,
    currentStock: product.stock,
    minStock: product.minStock || 0,
    unit: product.unit
  }))

  const totalItems = data.length
  const criticalItems = data.filter(item => item.currentStock <= item.minStock * 0.5).length
  const warningItems = data.filter(item => item.currentStock <= item.minStock && item.currentStock > item.minStock * 0.5).length
  const goodItems = data.filter(item => item.currentStock > item.minStock).length

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-400" />
          Estado de Inventario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{criticalItems}</div>
            <p className="text-xs text-slate-400">Crítico</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{warningItems}</div>
            <p className="text-xs text-slate-400">Advertencia</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{goodItems}</div>
            <p className="text-xs text-slate-400">Bueno</p>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => {
            const status = getStatus(item.currentStock, item.minStock)
            const Icon = status.icon
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">
                      {item.currentStock} {item.unit} / {item.minStock} {item.unit}
                    </p>
                  </div>
                </div>
                <Badge variant={status.color as any}>
                  {status.type === 'critical' ? 'Crítico' : status.type === 'warning' ? 'Advertencia' : 'Bueno'}
                </Badge>
              </div>
            )
          })}
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <Package className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de inventario disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}