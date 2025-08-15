"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface FrequentCustomersProps {
  data: Array<{
    customerName: string
    visits: number
    totalSpent: number
    averageTicket: number
    lastVisit: string
    favoriteCategory: string
  }>
  title?: string
  description?: string
}

export function FrequentCustomers({ data, title = "Clientes Frecuentes", description = "Análisis de clientes leales" }: FrequentCustomersProps) {
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

  const maxSpent = Math.max(...data.map(d => d.totalSpent || 0))
  
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
                  <span className="text-white font-medium">{item.customerName || 'N/A'}</span>
                  <div className="text-sm text-slate-400">{item.favoriteCategory}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.visits > 10 ? 'default' : item.visits > 5 ? 'secondary' : 'outline'}>
                    {item.visits || 0} visitas
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ${(item.totalSpent || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item.visits > 10 ? 'bg-green-500' : item.visits > 5 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                  style={{ width: `${maxSpent > 0 ? ((item.totalSpent || 0) / maxSpent) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Ticket prom: ${(item.averageTicket || 0).toLocaleString()}</span>
                <span>Última visita: {new Date(item.lastVisit).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}