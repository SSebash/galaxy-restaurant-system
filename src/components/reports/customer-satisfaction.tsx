"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CustomerSatisfactionProps {
  data: Array<{
    category: string
    rating: number
    totalReviews: number
    positive: number
    negative: number
    neutral: number
  }>
  title?: string
  description?: string
}

export function CustomerSatisfaction({ data, title = "Satisfacción del Cliente", description = "Calificaciones y reseñas por categoría" }: CustomerSatisfactionProps) {
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

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-400'
    if (rating >= 3.5) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getRatingBadge = (rating: number) => {
    if (rating >= 4.5) return 'default'
    if (rating >= 3.5) return 'secondary'
    return 'destructive'
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
                  <Badge variant={getRatingBadge(item.rating)}>
                    {item.rating || 0}/5
                  </Badge>
                  <span className="text-sm text-slate-400">
                    {item.totalReviews || 0} reseñas
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.rating >= 4.5 ? 'bg-green-500' : item.rating >= 3.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${(item.rating || 0) * 20}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span className="text-green-400">+{item.positive || 0}</span>
                <span className="text-yellow-400">{item.neutral || 0}</span>
                <span className="text-red-400">-{item.negative || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}