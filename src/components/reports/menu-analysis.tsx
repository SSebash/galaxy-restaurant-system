"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MenuAnalysisProps {
  data: Array<{
    name: string
    category: string
    price: number
    cost: number
    popularity: number
    profitMargin: number
    classification: 'STAR' | 'PUZZLE' | 'PLOWHORSE' | 'DOG'
  }>
  title?: string
  description?: string
}

export function MenuAnalysis({ data, title = "Análisis de Menú", description = "Clasificación de platos por rentabilidad y popularidad" }: MenuAnalysisProps) {
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

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'STAR': return 'bg-green-500'
      case 'PUZZLE': return 'bg-yellow-500'
      case 'PLOWHORSE': return 'bg-blue-500'
      case 'DOG': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getClassificationBadge = (classification: string) => {
    switch (classification) {
      case 'STAR': return 'default'
      case 'PUZZLE': return 'secondary'
      case 'PLOWHORSE': return 'outline'
      case 'DOG': return 'destructive'
      default: return 'secondary'
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
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{item.name || 'N/A'}</span>
                  <Badge variant={getClassificationBadge(item.classification)}>
                    {item.classification}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${(item.price || 0).toLocaleString()}</div>
                  <div className="text-slate-400 text-sm">{item.category}</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getClassificationColor(item.classification)}`}
                  style={{ width: `${(item.popularity || 0)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Popularidad: {(item.popularity || 0).toFixed(1)}%</span>
                <span>Margen: {(item.profitMargin || 0).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}