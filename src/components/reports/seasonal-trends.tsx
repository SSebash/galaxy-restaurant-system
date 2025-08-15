"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SeasonalTrendsProps {
  data: Array<{
    month: string
    sales: number
    orders: number
    averageTicket: number
    growth: number
    season: string
  }>
  title?: string
  description?: string
}

export function SeasonalTrends({ data, title = "Tendencias Estacionales", description = "Análisis de ventas por temporada" }: SeasonalTrendsProps) {
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

  const maxSales = Math.max(...data.map(d => d.sales || 0))
  
  const getSeasonColor = (season: string) => {
    switch (season.toLowerCase()) {
      case 'verano': return 'bg-yellow-500'
      case 'invierno': return 'bg-blue-500'
      case 'primavera': return 'bg-green-500'
      case 'otoño': return 'bg-orange-500'
      default: return 'bg-purple-500'
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
                  <span className="text-white font-medium">{item.month || 'N/A'}</span>
                  <Badge variant="outline">
                    {item.season}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${item.growth > 0 ? 'text-green-400' : item.growth < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth || 0}%
                  </span>
                  <span className="text-sm text-slate-400">
                    ${(item.sales || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getSeasonColor(item.season)}`}
                  style={{ width: `${maxSales > 0 ? ((item.sales || 0) / maxSales) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Pedidos: {item.orders || 0}</span>
                <span>Ticket prom: ${(item.averageTicket || 0).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}