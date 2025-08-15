'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ReportsFilterProps {
  filters: any
  onFilterChange: (filters: any) => void
}

export function ReportsFilter({ filters, onFilterChange }: ReportsFilterProps) {
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    onFilterChange(newFilters)
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-purple-400" />
          Filtros de Reportes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-sm text-slate-300">
              Fecha Inicio
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-sm text-slate-300">
              Fecha Fin
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportType" className="text-sm text-slate-300">
              Tipo de Reporte
            </Label>
            <Select value={filters.reportType} onValueChange={(value) => handleFilterChange('reportType', value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-white">
                <SelectItem value="sales">Ventas por Hora</SelectItem>
                <SelectItem value="categories">Ventas por Categoría</SelectItem>
                <SelectItem value="inventory">Estado de Inventario</SelectItem>
                <SelectItem value="popular">Productos Populares</SelectItem>
                <SelectItem value="trends">Tendencias de Ventas</SelectItem>
                <SelectItem value="products">Rendimiento de Productos</SelectItem>
                <SelectItem value="tables">Utilización de Mesas</SelectItem>
                <SelectItem value="kitchen">Eficiencia de Cocina</SelectItem>
                <SelectItem value="menu">Análisis de Menú</SelectItem>
                <SelectItem value="satisfaction">Satisfacción de Clientes</SelectItem>
                <SelectItem value="movements">Movimientos de Inventario</SelectItem>
                <SelectItem value="employees">Rendimiento de Empleados</SelectItem>
                <SelectItem value="costs">Análisis de Costos</SelectItem>
                <SelectItem value="seasonal">Tendencias Estacionales</SelectItem>
                <SelectItem value="peak">Horas Pico</SelectItem>
                <SelectItem value="table-profit">Rentabilidad de Mesas</SelectItem>
                <SelectItem value="suppliers">Análisis de Proveedores</SelectItem>
                <SelectItem value="payments">Métodos de Pago</SelectItem>
                <SelectItem value="waste">Análisis de Desperdicio</SelectItem>
                <SelectItem value="turnover">Rotación de Inventario</SelectItem>
                <SelectItem value="customers">Clientes Frecuentes</SelectItem>
                <SelectItem value="promotions">Análisis de Promociones</SelectItem>
                <SelectItem value="competitors">Análisis de Competencia</SelectItem>
                <SelectItem value="labor">Análisis de Mano de Obra</SelectItem>
                <SelectItem value="energy">Análisis Energético</SelectItem>
                <SelectItem value="maintenance">Análisis de Mantenimiento</SelectItem>
                <SelectItem value="risk">Análisis de Riesgos</SelectItem>
                <SelectItem value="capacity">Análisis de Capacidad</SelectItem>
                <SelectItem value="quality">Análisis de Calidad</SelectItem>
                <SelectItem value="sustainability">Análisis de Sostenibilidad</SelectItem>
                <SelectItem value="innovation">Análisis de Innovación</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm text-slate-300">
              Categoría (Opcional)
            </Label>
            <Input
              id="category"
              placeholder="Filtrar por categoría"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}