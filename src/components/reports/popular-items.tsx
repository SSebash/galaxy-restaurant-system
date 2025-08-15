"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PopularItemsProps {
  items: Array<{
    name: string
    orders: number
    revenue: number
  }>
}

export function PopularItems({ items }: PopularItemsProps) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Platos Más Populares</CardTitle>
          <CardDescription className="text-slate-400">Los más solicitados hoy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full flex items-center justify-center">
            <p className="text-slate-400">No hay datos de platos populares disponibles</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Platos Más Populares</CardTitle>
        <CardDescription className="text-slate-400">Los más solicitados hoy</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium text-white">{item.name || 'N/A'}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {(item.orders || 0)} pedidos
                </Badge>
                <span className="text-sm text-slate-400">
                  ${(item.revenue || 0).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}