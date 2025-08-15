"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Filter, Download } from 'lucide-react'

interface ReportsFilterProps {
  onFilterChange: (filters: {
    startDate: string
    endDate: string
    reportType: string
    category?: string
  }) => void
  onExport: () => void
}

export function ReportsFilter({ onFilterChange, onExport }: ReportsFilterProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reportType, setReportType] = useState('sales')
  const [category, setCategory] = useState('')

  const handleApplyFilter = () => {
    onFilterChange({
      startDate,
      endDate,
      reportType,
      category: category || undefined
    })
  }

  const handleResetFilter = () => {
    setStartDate('')
    setEndDate('')
    setReportType('sales')
    setCategory('')
    onFilterChange({
      startDate: '',
      endDate: '',
      reportType: 'sales',
      category: undefined
    })
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Filter className="h-5 w-5" />
          Filtros de Reporte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-slate-300">Fecha Inicio</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-slate-300">Fecha Fin</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportType" className="text-slate-300">Tipo de Reporte</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Ventas</SelectItem>
                <SelectItem value="inventory">Inventario</SelectItem>
                <SelectItem value="products">Productos</SelectItem>
                <SelectItem value="orders">Pedidos</SelectItem>
                <SelectItem value="financial">Financiero</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-300">Categoría (Opcional)</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las categorías</SelectItem>
                <SelectItem value="platos-principales">Platos Principales</SelectItem>
                <SelectItem value="entradas">Entradas</SelectItem>
                <SelectItem value="bebidas">Bebidas</SelectItem>
                <SelectItem value="postres">Postres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={handleApplyFilter} className="bg-purple-600 hover:bg-purple-700">
            <Filter className="h-4 w-4 mr-2" />
            Aplicar Filtros
          </Button>
          <Button variant="outline" onClick={handleResetFilter}>
            Limpiar Filtros
          </Button>
          <Button variant="outline" onClick={onExport} className="ml-auto">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}