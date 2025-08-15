"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EnergyAnalysisProps {
  data: Array<{
    equipment: string
    energyConsumption: number
    cost: number
    efficiency: number
    usageHours: number
    status: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  }>
  title?: string
  description?: string
}

export function EnergyAnalysis({ data, title = "Análisis de Consumo de Energía", description = "Monitoreo de eficiencia energética" }: EnergyAnalysisProps) {
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

  const maxConsumption = Math.max(...data.map(d => d.energyConsumption || 0))
  
  const getStatusColor = (status: string) => {
    switch (status) {
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
                    item.status === 'EXCELLENT' ? 'default' :
                    item.status === 'GOOD' ? 'secondary' :
                    item.status === 'FAIR' ? 'outline' : 'destructive'
                  }>
                    {item.status}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ${(item.cost || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(item.status)}`}
                  style={{ width: `${maxConsumption > 0 ? ((item.energyConsumption || 0) / maxConsumption) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Consumo: {item.energyConsumption || 0} kWh</span>
                <span>Eficiencia: {(item.efficiency || 0).toFixed(1)}%</span>
                <span>Uso: {item.usageHours || 0}h</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}