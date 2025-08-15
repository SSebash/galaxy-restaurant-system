"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CompetitorAnalysisProps {
  data: Array<{
    competitorName: string
    distance: number
    priceLevel: number
    qualityRating: number
    marketShare: number
    strengths: string[]
    weaknesses: string[]
  }>
  title?: string
  description?: string
}

export function CompetitorAnalysis({ data, title = "Análisis de Competencia", description = "Evaluación de competidores locales" }: CompetitorAnalysisProps) {
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

  const maxShare = Math.max(...data.map(d => d.marketShare || 0))
  
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
                  <span className="text-white font-medium">{item.competitorName || 'N/A'}</span>
                  <div className="text-sm text-slate-400">{item.distance}km</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.qualityRating > 4 ? 'default' : item.qualityRating > 3 ? 'secondary' : 'destructive'}>
                    {item.qualityRating || 0}/5
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {(item.marketShare || 0).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.qualityRating > 4 ? 'bg-green-500' : item.qualityRating > 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${maxShare > 0 ? ((item.marketShare || 0) / maxShare) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Nivel precio: ${item.priceLevel || 0}</span>
                <span>Fuerzas: {item.strengths?.length || 0}</span>
                <span>Debilidades: {item.weaknesses?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}