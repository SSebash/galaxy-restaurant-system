'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, Users, DollarSign, TrendingUp } from 'lucide-react'

interface TableUtilizationProps {
  tables: Array<{
    id: string
    name: string
    capacity: number
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED'
  }>
  orders: Array<{
    id: string
    tableId: string
    total: number
    status: string
  }>
}

export function TableUtilization({ tables, orders }: TableUtilizationProps) {
  // Transformar los datos de mesas y pedidos al formato esperado
  const data = tables.map(table => {
    const tableOrders = orders.filter(order => order.tableId === table.id)
    const totalRevenue = tableOrders.reduce((sum, order) => sum + order.total, 0)
    const utilizationRate = tableOrders.length > 0 ? Math.min(100, (tableOrders.length / 10) * 100) : 0
    
    return {
      name: table.name,
      capacity: table.capacity,
      utilizationRate,
      totalRevenue,
      status: table.status
    }
  })

  const sortedData = [...data].sort((a, b) => b.utilizationRate - a.utilizationRate)
  const totalRevenue = data.reduce((sum, item) => sum + item.totalRevenue, 0)
  const averageUtilization = data.length > 0 ? data.reduce((sum, item) => sum + item.utilizationRate, 0) / data.length : 0
  const occupiedTables = data.filter(item => item.status === 'OCCUPIED').length
  const availableTables = data.filter(item => item.status === 'AVAILABLE').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OCCUPIED':
        return 'destructive'
      case 'AVAILABLE':
        return 'default'
      case 'RESERVED':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'OCCUPIED':
        return 'Ocupada'
      case 'AVAILABLE':
        return 'Disponible'
      case 'RESERVED':
        return 'Reservada'
      default:
        return 'Desconocido'
    }
  }

  const getUtilizationRating = (rate: number) => {
    if (rate >= 80) return { rating: 'Excelente', color: 'default' }
    if (rate >= 60) return { rating: 'Bueno', color: 'secondary' }
    if (rate >= 40) return { rating: 'Regular', color: 'outline' }
    return { rating: 'Bajo', color: 'destructive' }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Table className="h-5 w-5 text-purple-400" />
          Utilización de Mesas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{averageUtilization.toFixed(1)}%</div>
            <p className="text-xs text-slate-400">Utilización Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-400">Ingresos Totales</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{occupiedTables}/{data.length}</div>
            <p className="text-xs text-slate-400">Mesas Ocupadas</p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedData.map((item, index) => {
            const utilization = getUtilizationRating(item.utilizationRate)
            const revenuePercentage = (item.totalRevenue / totalRevenue) * 100
            
            return (
              <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Table className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-white">{item.name}</span>
                    {index === 0 && <Badge variant="default">Más Utilizada</Badge>}
                  </div>
                  <Badge variant={getStatusColor(item.status)}>
                    {getStatusText(item.status)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                  <div className="text-slate-400">
                    <Users className="inline h-3 w-3 mr-1" />
                    <span className="text-white">{item.capacity}</span> personas
                  </div>
                  <div className="text-slate-400">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    <span className="text-white">{item.utilizationRate}%</span>
                  </div>
                  <div className="text-slate-400">
                    <DollarSign className="inline h-3 w-3 mr-1" />
                    <span className="text-white">${item.totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-400">
                    Calificación: {utilization.rating}
                  </div>
                  <Badge variant={utilization.color as any}>
                    {utilization.rating}
                  </Badge>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.utilizationRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Resumen de Utilización</span>
            <div className="flex items-center gap-2">
              <Badge variant={averageUtilization >= 60 ? 'default' : 'secondary'}>
                {averageUtilization >= 60 ? 'Buena Utilización' : 'Utilización Regular'}
              </Badge>
              <span className={`text-sm font-medium ${averageUtilization >= 60 ? 'text-green-400' : 'text-yellow-400'}`}>
                {averageUtilization.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <Table className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de utilización disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}