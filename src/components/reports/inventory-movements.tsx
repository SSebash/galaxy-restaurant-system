'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, TrendingUp, TrendingDown, Calendar } from 'lucide-react'

interface InventoryMovementsProps {
  movements: Array<{
    id: string
    productId: string
    type: string
    quantity: number
    date: string
    userId?: string
    referenceType?: string
  }>
}

export function InventoryMovements({ movements }: InventoryMovementsProps) {
  // Transformar los datos de movimientos al formato esperado
  const data = movements.map(movement => ({
    productName: `Producto ${movement.productId}`, // Esto debería ser el nombre real del producto
    type: movement.type as 'IN' | 'OUT',
    quantity: movement.quantity,
    date: new Date(movement.date).toLocaleDateString(),
    user: `Usuario ${movement.userId || 'Sistema'}`,
    referenceType: movement.referenceType
  }))

  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const totalIn = data.filter(item => item.type === 'IN').length
  const totalOut = data.filter(item => item.type === 'OUT').length
  const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0)

  const getTypeColor = (type: string) => {
    return type === 'IN' ? 'text-green-400' : 'text-red-400'
  }

  const getTypeBadge = (type: string) => {
    return type === 'IN' ? 'default' : 'destructive'
  }

  const getTypeText = (type: string) => {
    return type === 'IN' ? 'Entrada' : 'Salida'
  }

  const getTypeIcon = (type: string) => {
    return type === 'IN' ? TrendingUp : TrendingDown
  }

  const getReferenceText = (referenceType?: string) => {
    switch (referenceType) {
      case 'PURCHASE':
        return 'Compra'
      case 'RECIPE':
        return 'Receta'
      case 'WASTE':
        return 'Desperdicio'
      case 'ADJUSTMENT':
        return 'Ajuste'
      default:
        return referenceType || 'Otro'
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-400" />
          Movimientos de Inventario
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{totalIn}</div>
            <p className="text-xs text-slate-400">Entradas Totales</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{totalOut}</div>
            <p className="text-xs text-slate-400">Salidas Totales</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{totalQuantity}</div>
            <p className="text-xs text-slate-400">Cantidad Total</p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedData.map((item, index) => {
            const typeColor = getTypeColor(item.type)
            const typeBadge = getTypeBadge(item.type)
            const typeText = getTypeText(item.type)
            const TypeIcon = getTypeIcon(item.type)
            const referenceText = getReferenceText(item.referenceType)
            
            return (
              <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TypeIcon className={`h-4 w-4 ${typeColor}`} />
                    <span className="font-medium text-white">{item.productName}</span>
                    {index === 0 && <Badge variant="default">Más Reciente</Badge>}
                  </div>
                  <Badge variant={typeBadge as any}>
                    {typeText}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-sm mb-2">
                  <div className="text-slate-400">
                    <span className={`font-medium ${typeColor}`}>
                      {typeText}
                    </span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-white">{item.quantity}</span> unidades
                  </div>
                  <div className="text-slate-400">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    <span className="text-white">{item.date}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-white">{item.user}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-400">
                    Referencia: {referenceText}
                  </div>
                  <div className="text-slate-400">
                    {typeText === 'IN' ? 'Entrada' : 'Salida'} de inventario
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className={`${typeColor === 'text-green-400' ? 'bg-green-400' : 'bg-red-400'} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${Math.min(item.quantity * 2, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Resumen de Movimientos</span>
            <div className="flex items-center gap-2">
              <Badge variant={totalIn > totalOut ? 'default' : 'secondary'}>
                {totalIn > totalOut ? 'Más Entradas' : 'Más Salidas'}
              </Badge>
              <span className={`text-sm font-medium ${totalIn > totalOut ? 'text-green-400' : 'text-red-400'}`}>
                {totalIn} vs {totalOut}
              </span>
            </div>
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <Package className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de movimientos disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}