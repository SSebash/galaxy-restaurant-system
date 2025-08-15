'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Trash2, Calculator } from 'lucide-react'
import { useRestaurantStore } from '@/store/restaurant-store'

interface OrderItem {
  id: string
  recipeId: string
  name: string
  quantity: number
  price: number
  status: 'PENDING'
  notes?: string
}

interface OrderFormProps {
  order?: any
  onClose: () => void
  onSuccess: () => void
}

export function OrderForm({ order, onClose, onSuccess }: OrderFormProps) {
  const [formData, setFormData] = useState({
    tableId: order?.tableId || '',
    waiter: order?.waiter || '',
    notes: order?.notes || '',
    discount: order?.discount || 0
  })

  const [items, setItems] = useState<OrderItem[]>(order?.items || [])
  const [taxRate] = useState(0.16) // 16% IVA

  const { tables, recipes, addOrder, updateOrder, isLoading, error } = useRestaurantStore()

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * taxRate
  const total = subtotal + tax - formData.discount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (items.length === 0) {
      alert('Debe agregar al menos un item al pedido')
      return
    }

    try {
      const orderData = {
        ...formData,
        items,
        subtotal,
        tax,
        total,
        tableName: tables.find(t => t.id === formData.tableId)?.name || '',
        status: 'PENDING' as const
      }

      if (order) {
        await updateOrder(order.id, orderData)
      } else {
        await addOrder(orderData)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error al guardar pedido:', error)
    }
  }

  const addItem = () => {
    setItems([...items, {
      id: Date.now().toString(),
      recipeId: '',
      name: '',
      quantity: 1,
      price: 0,
      status: 'PENDING'
    }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof OrderItem, value: any) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    
    // Si se selecciona una receta, actualizar el nombre y precio
    if (field === 'recipeId') {
      const recipe = recipes.find(r => r.id === value)
      if (recipe) {
        updatedItems[index].name = recipe.name
        updatedItems[index].price = recipe.price
      }
    }
    
    setItems(updatedItems)
  }

  const availableTables = tables.filter(t => t.status === 'AVAILABLE' || t.id === formData.tableId)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="bg-slate-800/80 backdrop-blur-md rounded-xl p-6 w-full max-w-3xl border border-purple-500/20 shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {order ? 'Editar Pedido' : 'Nuevo Pedido'}
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tableId" className="text-purple-300">Mesa</Label>
                <Select value={formData.tableId} onValueChange={(value) => setFormData({ ...formData, tableId: value })}>
                  <SelectTrigger className="bg-slate-700/30 border-purple-500/20 text-white">
                    <SelectValue placeholder="Seleccionar mesa" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTables.map((table) => (
                      <SelectItem key={table.id} value={table.id} className="text-white">
                        {table.name} ({table.capacity} personas)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waiter" className="text-purple-300">Mesero</Label>
                <Input
                  id="waiter"
                  value={formData.waiter}
                  onChange={(e) => setFormData({ ...formData, waiter: e.target.value })}
                  className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                  placeholder="Nombre del mesero"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-purple-300">Notas del Pedido</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                placeholder="Notas especiales..."
                rows={2}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-purple-300 font-medium">Items del Pedido</Label>
                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                  className="border-purple-500/20 text-purple-300 hover:bg-purple-500/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Item
                </Button>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <Card key={item.id} className="bg-slate-700/30 border-purple-500/10">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-5">
                          <Label className="text-purple-300 text-sm">Receta</Label>
                          <Select 
                            value={item.recipeId} 
                            onValueChange={(value) => updateItem(index, 'recipeId', value)}
                          >
                            <SelectTrigger className="bg-slate-600/50 border-purple-500/20 text-white">
                              <SelectValue placeholder="Seleccionar receta" />
                            </SelectTrigger>
                            <SelectContent>
                              {recipes.map((recipe) => (
                                <SelectItem key={recipe.id} value={recipe.id} className="text-white">
                                  {recipe.name} - ${recipe.price.toFixed(2)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="col-span-2">
                          <Label className="text-purple-300 text-sm">Cantidad</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                            className="bg-slate-600/50 border-purple-500/20 text-white"
                          />
                        </div>

                        <div className="col-span-3">
                          <Label className="text-purple-300 text-sm">Precio Unit.</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                            className="bg-slate-600/50 border-purple-500/20 text-white"
                            readOnly
                          />
                        </div>

                        <div className="col-span-1">
                          <Label className="text-purple-300 text-sm">Total</Label>
                          <div className="text-white font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        <div className="col-span-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount" className="text-purple-300">Descuento</Label>
              <Input
                id="discount"
                type="number"
                step="0.01"
                min="0"
                max={subtotal}
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                className="bg-slate-700/30 border-purple-500/20 text-white"
                placeholder="0.00"
              />
            </div>

            {/* Resumen del pedido */}
            <Card className="bg-slate-700/30 border-purple-500/10">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Subtotal:</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">IVA (16%):</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Descuento:</span>
                    <span className="text-white">-${formData.discount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-purple-500/20 pt-2">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">Total:</span>
                      <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                disabled={isLoading || items.length === 0}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isLoading ? 'Guardando...' : (order ? 'Actualizar' : 'Crear Pedido')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}