"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface QualityAnalysisProps {
  data: Array<{
    category: string
    qualityScore: number
    inspections: number
    issues: number
    lastInspection: string
    trend: 'IMPROVING' | 'STABLE' | 'DECLINING'
  }>
  title?: string
  description?: string
}

export function QualityAnalysis({ data, title = "Análisis de Calidad", description = "Evaluación de estándares de calidad" }: QualityAnalysisProps) {
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
                <span className="text-white font-medium">{item.category || 'N/A'}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    item.trend === 'IMPROVING' ? 'default' :
                    item.trend === 'STABLE' ? 'secondary' :
                    'destructive'
                  }>
                    {item.trend}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {item.qualityScore || 0}/100
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${item.qualityScore > 90 ? 'bg-green-500' : item.qualityScore > 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${(item.qualityScore || 0)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Inspecciones: {item.inspections || 0}</span>
                <span>Problemas: {item.issues || 0}</span>
                <span>Última: {new Date(item.lastInspection).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}