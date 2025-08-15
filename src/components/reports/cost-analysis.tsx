"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CostAnalysisProps {
  data: Array<{
    category: string
    totalCost: number
    budget: number
    variance: number
    variancePercentage: number
  }>
  title?: string
  description?: string
}

export function CostAnalysis({ data, title = "Análisis de Costos", description = "Comparación de costos vs presupuesto" }: CostAnalysisProps) {
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

  const maxCost = Math.max(...data.map(d => Math.max(d.totalCost || 0, d.budget || 0)))
  
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
                <span className="text-white font-medium">{item.category || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={item.variance <= 0 ? 'default' : 'destructive'}>
                    {item.variance <= 0 ? 'Bajo presupuesto' : 'Sobre presupuesto'}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {item.variancePercentage >= 0 ? '+' : ''}{item.variancePercentage || 0}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${maxCost > 0 ? ((item.budget || 0) / maxCost) * 100 : 0}%` }}
                />
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${item.variance <= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${maxCost > 0 ? ((item.totalCost || 0) / maxCost) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Presupuesto: ${(item.budget || 0).toLocaleString()}</span>
                <span>Real: ${(item.totalCost || 0).toLocaleString()}</span>
                <span className={item.variance <= 0 ? 'text-green-400' : 'text-red-400'}>
                  {item.variance >= 0 ? '+' : ''}${item.variance.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}