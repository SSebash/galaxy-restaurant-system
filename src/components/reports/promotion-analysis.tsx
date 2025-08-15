"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PromotionAnalysisProps {
  data: Array<{
    promotionName: string
    type: string
    discount: number
    salesIncrease: number
    revenueGenerated: number
    cost: number
    roi: number
  }>
  title?: string
  description?: string
}

export function PromotionAnalysis({ data, title = "Análisis de Promociones", description = "Efectividad de campañas promocionales" }: PromotionAnalysisProps) {
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

  const maxRevenue = Math.max(...data.map(d => d.revenueGenerated || 0))
  
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
                  <span className="text-white font-medium">{item.promotionName || 'N/A'}</span>
                  <div className="text-sm text-slate-400">{item.type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.roi > 2 ? 'default' : item.roi > 1 ? 'secondary' : 'destructive'}>
                    ROI: {item.roi || 0}x
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ${(item.revenueGenerated || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.roi > 2 ? 'bg-green-500' : item.roi > 1 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${maxRevenue > 0 ? ((item.revenueGenerated || 0) / maxRevenue) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Descuento: {item.discount || 0}%</span>
                <span>Aumento ventas: {(item.salesIncrease || 0).toFixed(1)}%</span>
                <span>Costo: ${(item.cost || 0).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}