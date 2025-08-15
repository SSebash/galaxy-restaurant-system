"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SustainabilityAnalysisProps {
  data: Array<{
    initiative: string
    category: string
    implementationDate: string
    cost: number
    savings: number
    roi: number
    status: 'ACTIVE' | 'PLANNED' | 'COMPLETED' | 'CANCELLED'
  }>
  title?: string
  description?: string
}

export function SustainabilityAnalysis({ data, title = "Análisis de Sostenibilidad", description = "Iniciativas e impacto ambiental" }: SustainabilityAnalysisProps) {
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

  const maxSavings = Math.max(...data.map(d => d.savings || 0))
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500'
      case 'COMPLETED': return 'bg-blue-500'
      case 'PLANNED': return 'bg-yellow-500'
      case 'CANCELLED': return 'bg-red-500'
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
                <div>
                  <span className="text-white font-medium">{item.initiative || 'N/A'}</span>
                  <div className="text-sm text-slate-400">{item.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    item.status === 'ACTIVE' ? 'default' :
                    item.status === 'COMPLETED' ? 'secondary' :
                    item.status === 'PLANNED' ? 'outline' : 'destructive'
                  }>
                    {item.status}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ROI: {item.roi || 0}x
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(item.status)}`}
                  style={{ width: `${maxSavings > 0 ? ((item.savings || 0) / maxSavings) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Costo: ${(item.cost || 0).toLocaleString()}</span>
                <span>Ahorro: ${(item.savings || 0).toLocaleString()}</span>
                <span>Inicio: {new Date(item.implementationDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}