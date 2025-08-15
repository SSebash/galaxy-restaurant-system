'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'
import { useRestaurantStore } from '@/store/restaurant-store'

interface TableFormProps {
  table?: any
  onClose: () => void
  onSuccess: () => void
}

export function TableForm({ table, onClose, onSuccess }: TableFormProps) {
  const [formData, setFormData] = useState({
    name: table?.name || '',
    capacity: table?.capacity || 0,
    status: table?.status || 'AVAILABLE',
    location: table?.location || ''
  })

  const { addTable, updateTable, isLoading, error } = useRestaurantStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (table) {
        await updateTable(table.id, formData)
      } else {
        await addTable(formData)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error al guardar mesa:', error)
    }
  }

  const statuses = [
    { value: 'AVAILABLE', label: 'Disponible' },
    { value: 'OCCUPIED', label: 'Ocupada' },
    { value: 'RESERVED', label: 'Reservada' },
    { value: 'MAINTENANCE', label: 'Mantenimiento' }
  ]

  const locations = [
    'Zona Principal',
    'Ventana',
    'Terraza',
    'Bar',
    'Área VIP',
    'Exterior'
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="bg-slate-800/80 backdrop-blur-md rounded-xl p-6 w-full max-w-md border border-purple-500/20 shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {table ? 'Editar Mesa' : 'Agregar Mesa'}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-purple-300 hover:text-white hover:bg-purple-500/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-300">Nombre de la Mesa</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                placeholder="Ej: Mesa 1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-purple-300">Capacidad</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                max="20"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="bg-slate-700/30 border-purple-500/20 text-white"
                placeholder="4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-purple-300">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-slate-700/30 border-purple-500/20 text-white">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value} className="text-white">
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-purple-300">Ubicación</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                <SelectTrigger className="bg-slate-700/30 border-purple-500/20 text-white">
                  <SelectValue placeholder="Seleccionar ubicación" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location} className="text-white">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1 border-purple-500/20 text-purple-300 hover:bg-purple-500/10"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isLoading ? 'Guardando...' : (table ? 'Actualizar' : 'Agregar')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}