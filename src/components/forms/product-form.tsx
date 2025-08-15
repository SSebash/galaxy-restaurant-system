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

interface ProductFormProps {
  product?: any
  onClose: () => void
  onSuccess: () => void
}

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    stock: product?.stock || 0,
    unit: product?.unit || '',
    cost: product?.cost || 0,
    category: product?.category || '',
    minStock: product?.minStock || 0,
    maxStock: product?.maxStock || 0
  })

  const { addProduct, updateProduct, isLoading, error } = useRestaurantStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (product) {
        await updateProduct(product.id, formData)
      } else {
        await addProduct(formData)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error al guardar producto:', error)
    }
  }

  const categories = [
    'Vegetales', 'Frutas', 'Carnes', 'Lácteos', 'Panadería',
    'Bebidas', 'Especias', 'Enlatados', 'Congelados', 'Otros'
  ]

  const units = ['kg', 'g', 'L', 'ml', 'unidades', 'paquetes', 'botellas']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="bg-slate-800/80 backdrop-blur-md rounded-xl p-6 w-full max-w-md border border-purple-500/20 shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {product ? 'Editar Producto' : 'Agregar Producto'}
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
              <Label htmlFor="name" className="text-purple-300">Nombre del Producto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                placeholder="Ej: Tomates"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-purple-300">Stock Actual</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="bg-slate-700/30 border-purple-500/20 text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-purple-300">Unidad</Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger className="bg-slate-700/30 border-purple-500/20 text-white">
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit} className="text-white">
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost" className="text-purple-300">Costo Unitario</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                className="bg-slate-700/30 border-purple-500/20 text-white"
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-purple-300">Categoría</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-slate-700/30 border-purple-500/20 text-white">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minStock" className="text-purple-300">Stock Mínimo</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
                  className="bg-slate-700/30 border-purple-500/20 text-white"
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxStock" className="text-purple-300">Stock Máximo</Label>
                <Input
                  id="maxStock"
                  type="number"
                  value={formData.maxStock}
                  onChange={(e) => setFormData({ ...formData, maxStock: Number(e.target.value) })}
                  className="bg-slate-700/30 border-purple-500/20 text-white"
                  placeholder="0"
                />
              </div>
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
                {isLoading ? 'Guardando...' : (product ? 'Actualizar' : 'Agregar')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}