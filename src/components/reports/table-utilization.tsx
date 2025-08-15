"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TableUtilizationProps {
  data: Array<{
    name: string
    capacity: number
    utilizationRate: number
    totalRevenue: number
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED'
  }>
  title?: string
  description?: string
}

export function TableUtilization({ data, title = "Utilización de Mesas", description = "Ocupación y rendimiento por mesa" }: TableUtilizationProps) {
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
                  <Badge variant={
                    item.status === 'AVAILABLE' ? 'default' :
                    item.status === 'OCCUPIED' ? 'destructive' :
                    'secondary'
                  }>
                    {item.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${(item.totalRevenue || 0).toLocaleString()}</div>
                  <div className="text-slate-400 text-sm">{item.capacity || 0} personas</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.utilizationRate > 80 ? 'bg-green-500' : item.utilizationRate > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${(item.utilizationRate || 0)}%` }}
                />
              </div>
              <div className="text-xs text-slate-500">
                Utilización: {(item.utilizationRate || 0).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}