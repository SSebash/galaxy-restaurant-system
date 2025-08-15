'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, DollarSign, Package, Star } from 'lucide-react'

interface ProductPerformanceProps {
  data: Array<{
    name: string
    revenue: number
    cost: number
    profit: number
    margin: number
  }>
}

export function ProductPerformance({ data }: ProductPerformanceProps) {
  const sortedData = [...data].sort((a, b) => b.profit - a.profit)
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0)
  const averageMargin = data.reduce((sum, item) => sum + item.margin, 0) / data.length

  const getPerformanceRating = (margin: number) => {
    if (margin >= 60) return { rating: 'Excelente', color: 'default', icon: Star }
    if (margin >= 50) return { rating: 'Bueno', color: 'secondary', icon: TrendingUp }
    if (margin >= 40) return { rating: 'Regular', color: 'outline', icon: Package }
    return { rating: 'Bajo', color: 'destructive', icon: Package }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-400" />
          Rendimiento de Productos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-400">Ingresos Totales</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">${totalProfit.toLocaleString()}</div>
            <p className="text-xs text-slate-400">Beneficios Totales</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{averageMargin.toFixed(1)}%</div>
            <p className="text-xs text-slate-400">Margen Promedio</p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedData.map((item, index) => {
            const performance = getPerformanceRating(item.margin)
            const PerformanceIcon = performance.icon
            const revenuePercentage = (item.revenue / totalRevenue) * 100
            const profitPercentage = (item.profit / totalProfit) * 100
            
            return (
              <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <PerformanceIcon className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-white">{item.name}</span>
                    {index === 0 && <Badge variant="default">Más Rentable</Badge>}
                  </div>
                  <Badge variant={performance.color as any}>
                    {performance.rating}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                  <div className="text-slate-400">
                    <DollarSign className="inline h-3 w-3 mr-1" />
                    <span className="text-white">${item.revenue.toLocaleString()}</span> ({revenuePercentage.toFixed(1)}%)
                  </div>
                  <div className="text-slate-400">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    <span className="text-white">${item.profit.toLocaleString()}</span> ({profitPercentage.toFixed(1)}%)
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-400">
                    Costo: ${item.cost.toLocaleString()}
                  </div>
                  <div className="text-slate-400">
                    Margen: {item.margin}%
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.margin}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Resumen de Rendimiento</span>
            <div className="flex items-center gap-2">
              <Badge variant={averageMargin >= 50 ? 'default' : 'secondary'}>
                {averageMargin >= 50 ? 'Buen Rendimiento' : 'Rendimiento Regular'}
              </Badge>
              <span className={`text-sm font-medium ${averageMargin >= 50 ? 'text-green-400' : 'text-yellow-400'}`}>
                {averageMargin.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <TrendingUp className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de rendimiento disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}