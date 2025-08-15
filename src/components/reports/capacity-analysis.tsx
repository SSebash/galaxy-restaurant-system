"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CapacityAnalysisProps {
  data: Array<{
    area: string
    currentCapacity: number
    maximumCapacity: number
    utilizationRate: number
    expansionNeeded: boolean
    estimatedCost: number
  }>
  title?: string
  description?: string
}

export function CapacityAnalysis({ data, title = "Análisis de Capacidad", description = "Evaluación de capacidad operativa" }: CapacityAnalysisProps) {
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
        <div className="h-[300px] w-full space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{item.area || 'N/A'}</span>
                  {item.expansionNeeded && (
                    <Badge variant="destructive">
                      REQUIERE EXPANSIÓN
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.utilizationRate > 90 ? 'destructive' : item.utilizationRate > 75 ? 'secondary' : 'default'}>
                    {(item.utilizationRate || 0).toFixed(1)}%
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {item.currentCapacity || 0}/{item.maximumCapacity || 0}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${item.utilizationRate > 90 ? 'bg-red-500' : item.utilizationRate > 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${(item.utilizationRate || 0)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Capacidad actual: {item.currentCapacity || 0}</span>
                <span>Capacidad máxima: {item.maximumCapacity || 0}</span>
                {item.expansionNeeded && (
                  <span className="text-red-400">Costo estimado: ${(item.estimatedCost || 0).toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}