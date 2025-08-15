"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MaintenanceAnalysisProps {
  data: Array<{
    equipment: string
    maintenanceCost: number
    downtime: number
    lastMaintenance: string
    nextMaintenance: string
    condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  }>
  title?: string
  description?: string
}

export function MaintenanceAnalysis({ data, title = "Análisis de Mantenimiento", description = "Costos y estado de equipos" }: MaintenanceAnalysisProps) {
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

  const maxCost = Math.max(...data.map(d => d.maintenanceCost || 0))
  
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'EXCELLENT': return 'bg-green-500'
      case 'GOOD': return 'bg-blue-500'
      case 'FAIR': return 'bg-yellow-500'
      case 'POOR': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
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
                <span className="text-white font-medium">{item.equipment || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    item.condition === 'EXCELLENT' ? 'default' :
                    item.condition === 'GOOD' ? 'secondary' :
                    item.condition === 'FAIR' ? 'outline' : 'destructive'
                  }>
                    {item.condition}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ${(item.maintenanceCost || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getConditionColor(item.condition)}`}
                  style={{ width: `${maxCost > 0 ? ((item.maintenanceCost || 0) / maxCost) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Tiempo inactivo: {item.downtime || 0}h</span>
                <span>Último: {new Date(item.lastMaintenance).toLocaleDateString()}</span>
                <span>Próximo: {new Date(item.nextMaintenance).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}