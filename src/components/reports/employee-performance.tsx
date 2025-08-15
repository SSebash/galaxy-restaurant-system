"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EmployeePerformanceProps {
  data: Array<{
    name: string
    role: string
    ordersServed: number
    totalSales: number
    averageTicket: number
    efficiency: number
  }>
  title?: string
  description?: string
}

export function EmployeePerformance({ data, title = "Rendimiento de Empleados", description = "Productividad y ventas por empleado" }: EmployeePerformanceProps) {
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

  const maxSales = Math.max(...data.map(d => d.totalSales || 0))
  
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
                <div>
                  <span className="text-white font-medium">{item.name || 'N/A'}</span>
                  <div className="text-sm text-slate-400">{item.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.efficiency > 90 ? 'default' : item.efficiency > 70 ? 'secondary' : 'destructive'}>
                    {item.efficiency || 0}%
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ${(item.totalSales || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.efficiency > 90 ? 'bg-green-500' : item.efficiency > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${maxSales > 0 ? ((item.totalSales || 0) / maxSales) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Pedidos: {item.ordersServed || 0}</span>
                <span>Ticket prom: ${(item.averageTicket || 0).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}