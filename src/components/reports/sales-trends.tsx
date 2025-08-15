'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react'

interface SalesTrendsProps {
  data: Array<{
    period: string
    sales: number
    growth: number
  }>
}

export function SalesTrends({ data }: SalesTrendsProps) {
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0)
  const averageGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length
  const positiveGrowthPeriods = data.filter(item => item.growth > 0).length
  const negativeGrowthPeriods = data.filter(item => item.growth < 0).length

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? TrendingUp : TrendingDown
  }

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-400' : 'text-red-400'
  }

  const getGrowthBadge = (growth: number) => {
    return growth > 0 ? 'default' : 'destructive'
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-400" />
          Tendencias de Ventas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">${totalSales.toLocaleString()}</div>
            <p className="text-xs text-slate-400">Ventas Totales</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{averageGrowth.toFixed(1)}%</div>
            <p className="text-xs text-slate-400">Crecimiento Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{positiveGrowthPeriods}/{data.length}</div>
            <p className="text-xs text-slate-400">Periodos Positivos</p>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => {
            const GrowthIcon = getGrowthIcon(item.growth)
            const growthColor = getGrowthColor(item.growth)
            const growthBadge = getGrowthBadge(item.growth)
            
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <GrowthIcon className={`h-4 w-4 ${growthColor}`} />
                  <div>
                    <p className="font-medium text-white">{item.period}</p>
                    <p className="text-sm text-slate-400">
                      Ventas: ${item.sales.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={growthBadge as any}>
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </Badge>
                  <p className="text-xs text-slate-400 mt-1">
                    {item.growth > 0 ? 'Crecimiento' : 'Decrecimiento'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Resumen del Período</span>
            <div className="flex items-center gap-2">
              <Badge variant={averageGrowth > 0 ? 'default' : 'destructive'}>
                {averageGrowth > 0 ? 'Positivo' : 'Negativo'}
              </Badge>
              <span className={`text-sm font-medium ${averageGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {averageGrowth > 0 ? '+' : ''}{averageGrowth.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <Calendar className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de tendencias disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}