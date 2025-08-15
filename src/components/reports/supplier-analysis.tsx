"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SupplierAnalysisProps {
  data: Array<{
    name: string
    totalOrders: number
    totalAmount: number
    averageDeliveryTime: number
    qualityRating: number
    onTimeDelivery: number
  }>
  title?: string
  description?: string
}

export function SupplierAnalysis({ data, title = "Análisis de Proveedores", description = "Evaluación de desempeño de proveedores" }: SupplierAnalysisProps) {
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

  const maxAmount = Math.max(...data.map(d => d.totalAmount || 0))
  
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
                  <Badge variant={item.qualityRating > 4 ? 'default' : item.qualityRating > 3 ? 'secondary' : 'destructive'}>
                    {item.qualityRating || 0}/5
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ${(item.totalAmount || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.qualityRating > 4 ? 'bg-green-500' : item.qualityRating > 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${maxAmount > 0 ? ((item.totalAmount || 0) / maxAmount) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Pedidos: {item.totalOrders || 0}</span>
                <span>Entrega: {item.averageDeliveryTime || 0}d</span>
                <span>Puntualidad: {(item.onTimeDelivery || 0).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}