'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, TrendingUp, Users, ThumbsUp } from 'lucide-react'

interface CustomerSatisfactionProps {
  data: Array<{
    category: string
    rating: number
    totalReviews: number
    positive: number
    negative: number
    neutral: number
  }>
}

export function CustomerSatisfaction({ data }: CustomerSatisfactionProps) {
  const sortedData = [...data].sort((a, b) => b.rating - a.rating)
  const totalReviews = data.reduce((sum, item) => sum + item.totalReviews, 0)
  const averageRating = data.reduce((sum, item) => sum + item.rating, 0) / data.length
  const totalPositive = data.reduce((sum, item) => sum + item.positive, 0)
  const totalNegative = data.reduce((sum, item) => sum + item.negative, 0)
  const totalNeutral = data.reduce((sum, item) => sum + item.neutral, 0)

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-400'
    if (rating >= 4.0) return 'text-yellow-400'
    if (rating >= 3.5) return 'text-orange-400'
    return 'text-red-400'
  }

  const getRatingBadge = (rating: number) => {
    if (rating >= 4.5) return 'default'
    if (rating >= 4.0) return 'secondary'
    if (rating >= 3.5) return 'outline'
    return 'destructive'
  }

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return 'Excelente'
    if (rating >= 4.0) return 'Bueno'
    if (rating >= 3.5) return 'Regular'
    return 'Pobre'
  }

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    
    let stars = ''
    for (let i = 0; i < fullStars; i++) {
      stars += '⭐'
    }
    if (hasHalfStar) {
      stars += '⭐'
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆'
    }
    return stars
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-purple-400" />
          Satisfacción de Clientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-slate-400">Calificación Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{totalReviews}</div>
            <p className="text-xs text-slate-400">Reseñas Totales</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{totalPositive}</div>
            <p className="text-xs text-slate-400">Reseñas Positivas</p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedData.map((item, index) => {
            const ratingColor = getRatingColor(item.rating)
            const ratingBadge = getRatingBadge(item.rating)
            const ratingText = getRatingText(item.rating)
            const stars = getRatingStars(item.rating)
            const positivePercentage = (item.positive / item.totalReviews) * 100
            const negativePercentage = (item.negative / item.totalReviews) * 100
            const neutralPercentage = (item.neutral / item.totalReviews) * 100
            
            return (
              <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-white">{item.category}</span>
                    {index === 0 && <Badge variant="default">Mejor Calificado</Badge>}
                  </div>
                  <Badge variant={ratingBadge as any}>
                    {ratingText}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-sm mb-2">
                  <div className="text-slate-400">
                    <span className={`font-medium ${ratingColor}`}>
                      {item.rating.toFixed(1)}
                    </span>
                    <span className="text-white ml-1">{stars}</span>
                  </div>
                  <div className="text-slate-400">
                    <Users className="inline h-3 w-3 mr-1" />
                    <span className="text-white">{item.totalReviews}</span> reseñas
                  </div>
                  <div className="text-slate-400">
                    <ThumbsUp className="inline h-3 w-3 mr-1" />
                    <span className="text-green-400">{item.positive}</span> positivas
                  </div>
                  <div className="text-slate-400">
                    <span className="text-red-400">{item.negative}</span> negativas
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="text-slate-400">
                    Neutral: <span className="text-white">{item.neutral}</span>
                  </div>
                  <div className="text-slate-400">
                    Positivas: <span className="text-green-400">{positivePercentage.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.rating * 20}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Resumen de Satisfacción</span>
            <div className="flex items-center gap-2">
              <Badge variant={averageRating >= 4.0 ? 'default' : 'secondary'}>
                {averageRating >= 4.0 ? 'Buena Satisfacción' : 'Satisfacción Regular'}
              </Badge>
              <span className={`text-sm font-medium ${averageRating >= 4.0 ? 'text-green-400' : 'text-yellow-400'}`}>
                {averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <Star className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de satisfacción disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}