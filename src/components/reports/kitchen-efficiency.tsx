'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChefHat, Clock, TrendingUp, CheckCircle } from 'lucide-react'

interface KitchenEfficiencyProps {
  data: Array<{
    period: string
    ordersCompleted: number
    averageTime: number
    efficiency: number
  }>
}

export function KitchenEfficiency({ data }: KitchenEfficiencyProps) {
  const sortedData = [...data].sort((a, b) => b.efficiency - a.efficiency)
  const totalOrders = data.reduce((sum, item) => sum + item.ordersCompleted, 0)
  const averageTime = data.reduce((sum, item) => sum + item.averageTime, 0) / data.length
  const averageEfficiency = data.reduce((sum, item) => sum + item.efficiency, 0) / data.length

  const getEfficiencyRating = (efficiency: number) => {
    if (efficiency >= 90) return { rating: 'Excelente', color: 'default', icon: CheckCircle }
    if (efficiency >= 80) return { rating: 'Bueno', color: 'secondary', icon: TrendingUp }
    if (efficiency >= 70) return { rating: 'Regular', color: 'outline', icon: ChefHat }
    return { rating: 'Bajo', color: 'destructive', icon: ChefHat }
  }

  const getTimeRating = (time: number) => {
    if (time <= 15) return { rating: 'Excelente', color: 'default' }
    if (time <= 20) return { rating: 'Bueno', color: 'secondary' }
    if (time <= 25) return { rating: 'Regular', color: 'outline' }
    return { rating: 'Lento', color: 'destructive' }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-purple-400" />
          Eficiencia de Cocina
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{averageEfficiency.toFixed(1)}%</div>
            <p className="text-xs text-slate-400">Eficiencia Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{totalOrders}</div>
            <p className="text-xs text-slate-400">Pedidos Completados</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{averageTime.toFixed(1)} min</div>
            <p className="text-xs text-slate-400">Tiempo Promedio</p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedData.map((item, index) => {
            const efficiency = getEfficiencyRating(item.efficiency)
            const timeRating = getTimeRating(item.averageTime)
            const EfficiencyIcon = efficiency.icon
            const ordersPercentage = (item.ordersCompleted / totalOrders) * 100
            
            return (
              <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <EfficiencyIcon className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-white">{item.period}</span>
                    {index === 0 && <Badge variant="default">Más Eficiente</Badge>}
                  </div>
                  <Badge variant={efficiency.color as any}>
                    {efficiency.rating}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                  <div className="text-slate-400">
                    <CheckCircle className="inline h-3 w-3 mr-1" />
                    <span className="text-white">{item.ordersCompleted}</span> pedidos
                  </div>
                  <div className="text-slate-400">
                    <Clock className="inline h-3 w-3 mr-1" />
                    <span className="text-white">{item.averageTime} min</span>
                  </div>
                  <div className="text-slate-400">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    <span className="text-white">{item.efficiency}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-400">
                    Tiempo: {timeRating.rating}
                  </div>
                  <Badge variant={timeRating.color as any}>
                    {timeRating.rating}
                  </Badge>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.efficiency}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Resumen de Eficiencia</span>
            <div className="flex items-center gap-2">
              <Badge variant={averageEfficiency >= 80 ? 'default' : 'secondary'}>
                {averageEfficiency >= 80 ? 'Buena Eficiencia' : 'Eficiencia Regular'}
              </Badge>
              <span className={`text-sm font-medium ${averageEfficiency >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                {averageEfficiency.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <ChefHat className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de eficiencia disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}