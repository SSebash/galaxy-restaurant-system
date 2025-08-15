'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Package } from 'lucide-react'
import { useRestaurantStore } from '@/store/restaurant-store'

interface InventoryMovementFormProps {
  movement?: any
  onClose: () => void
  onSuccess: () => void
}

export function InventoryMovementForm({ movement, onClose, onSuccess }: InventoryMovementFormProps) {
  const [formData, setFormData] = useState({
    productId: movement?.productId || '',
    type: movement?.type || 'IN',
    quantity: movement?.quantity || 0,
    notes: movement?.notes || '',
    user: movement?.user || '',
    referenceType: movement?.referenceType || '',
    referenceId: movement?.referenceId || ''
  })

  const { products, addInventoryMovement, isLoading, error } = useRestaurantStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await addInventoryMovement(formData)
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error al guardar movimiento:', error)
    }
  }

  const movementTypes = [
    { value: 'IN', label: 'Entrada' },
    { value: 'OUT', label: 'Salida' }
  ]

  const referenceTypes = [
    { value: 'PURCHASE', label: 'Compra' },
    { value: 'RECIPE', label: 'Receta' },
    { value: 'ADJUSTMENT', label: 'Ajuste' },
    { value: 'WASTE', label: 'Desperdicio' }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="bg-slate-800/80 backdrop-blur-md rounded-xl p-6 w-full max-w-md border border-purple-500/20 shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {movement ? 'Editar Movimiento' : 'Registrar Movimiento'}
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
              <Label htmlFor="productId" className="text-purple-300">Producto</Label>
              <Select value={formData.productId} onValueChange={(value) => setFormData({ ...formData, productId: value })}>
                <SelectTrigger className="bg-slate-700/30 border-purple-500/20 text-white">
                  <SelectValue placeholder="Seleccionar producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id} className="text-white">
                      {product.name} ({product.stock} {product.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-purple-300">Tipo</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-slate-700/30 border-purple-500/20 text-white">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {movementTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-white">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-purple-300">Cantidad</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="bg-slate-700/30 border-purple-500/20 text-white"
                  placeholder="0.1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user" className="text-purple-300">Usuario</Label>
              <Input
                id="user"
                value={formData.user}
                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                placeholder="Nombre del usuario"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referenceType" className="text-purple-300">Referencia</Label>
                <Select value={formData.referenceType} onValueChange={(value) => setFormData({ ...formData, referenceType: value })}>
                  <SelectTrigger className="bg-slate-700/30 border-purple-500/20 text-white">
                    <SelectValue placeholder="Tipo de referencia" />
                  </SelectTrigger>
                  <SelectContent>
                    {referenceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-white">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenceId" className="text-purple-300">ID Referencia</Label>
                <Input
                  id="referenceId"
                  value={formData.referenceId}
                  onChange={(e) => setFormData({ ...formData, referenceId: e.target.value })}
                  className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                  placeholder="ID de referencia"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-purple-300">Notas</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                placeholder="Notas sobre el movimiento..."
                rows={3}
              />
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
                {isLoading ? 'Guardando...' : (movement ? 'Actualizar' : 'Registrar')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}