'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Star, DollarSign } from 'lucide-react'

interface PopularItemsProps {
  data: Array<{
    name: string
    orders: number
    revenue: number
  }>
}

export function PopularItems({ data }: PopularItemsProps) {
  const sortedData = [...data].sort((a, b) => b.orders - a.orders)
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0)
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-400" />
          Productos Populares
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{totalOrders}</div>
            <p className="text-xs text-slate-400">Pedidos Totales</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-slate-400">Ingresos Totales</p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedData.map((item, index) => {
            const orderPercentage = (item.orders / totalOrders) * 100
            const revenuePercentage = (item.revenue / totalRevenue) * 100
            
            return (
              <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-white">{item.name}</span>
                    {index === 0 && <Badge variant="default">Más Popular</Badge>}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-green-400">${item.revenue.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-slate-400">
                    <span className="text-white">{item.orders}</span> pedidos ({orderPercentage.toFixed(1)}%)
                  </div>
                  <div className="text-slate-400">
                    ${item.revenue.toFixed(2)} ({revenuePercentage.toFixed(1)}%)
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${orderPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <TrendingUp className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de productos populares disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}