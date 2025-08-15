"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PaymentMethodsProps {
  data: Array<{
    method: string
    transactions: number
    totalAmount: number
    averageAmount: number
    percentage: number
    fees: number
  }>
  title?: string
  description?: string
}

export function PaymentMethods({ data, title = "Métodos de Pago", description = "Análisis de formas de pago utilizadas" }: PaymentMethodsProps) {
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
                <span className="text-white font-medium">{item.method || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={item.percentage > 30 ? 'default' : item.percentage > 15 ? 'secondary' : 'outline'}>
                    {(item.percentage || 0).toFixed(1)}%
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ${(item.totalAmount || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.percentage > 30 ? 'bg-green-500' : item.percentage > 15 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                  style={{ width: `${(item.percentage || 0)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Transacciones: {item.transactions || 0}</span>
                <span>Promedio: ${(item.averageAmount || 0).toLocaleString()}</span>
                <span>Comisiones: ${(item.fees || 0).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}