'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Trash2 } from 'lucide-react'
import { useRestaurantStore } from '@/store/restaurant-store'

interface RecipeIngredient {
  productId: string
  productName: string
  quantity: number
  unit: string
}

interface RecipeFormProps {
  recipe?: any
  onClose: () => void
  onSuccess: () => void
}

export function RecipeForm({ recipe, onClose, onSuccess }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    name: recipe?.name || '',
    category: recipe?.category || '',
    price: recipe?.price || 0,
    description: recipe?.description || '',
    preparationTime: recipe?.preparationTime || 0,
    isActive: recipe?.isActive ?? true
  })

  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    recipe?.ingredients || []
  )

  const { products, addRecipe, updateRecipe, isLoading, error } = useRestaurantStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const recipeData = {
        ...formData,
        ingredients
      }

      if (recipe) {
        await updateRecipe(recipe.id, recipeData)
      } else {
        await addRecipe(recipeData)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error al guardar receta:', error)
    }
  }

  const addIngredient = () => {
    setIngredients([...ingredients, {
      productId: '',
      productName: '',
      quantity: 0,
      unit: ''
    }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (index: number, field: keyof RecipeIngredient, value: any) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value }
    
    // Si se selecciona un producto, actualizar el nombre y unidad
    if (field === 'productId') {
      const product = products.find(p => p.id === value)
      if (product) {
        updatedIngredients[index].productName = product.name
        updatedIngredients[index].unit = product.unit
      }
    }
    
    setIngredients(updatedIngredients)
  }

  const categories = ['MAIN', 'APPETIZER', 'DESSERT', 'BEVERAGE', 'SALAD', 'SOUP']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="bg-slate-800/80 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {recipe ? 'Editar Receta' : 'Agregar Receta'}
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
                <Label htmlFor="name" className="text-purple-300">Nombre de la Receta</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                  placeholder="Ej: Burger Clásica"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-purple-300">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="bg-slate-700/30 border-purple-500/20 text-white"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preparationTime" className="text-purple-300">Tiempo de Preparación (min)</Label>
                <Input
                  id="preparationTime"
                  type="number"
                  value={formData.preparationTime}
                  onChange={(e) => setFormData({ ...formData, preparationTime: Number(e.target.value) })}
                  className="bg-slate-700/30 border-purple-500/20 text-white"
                  placeholder="15"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-purple-300">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700/30 border-purple-500/20 text-white placeholder-purple-400"
                placeholder="Descripción de la receta..."
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-purple-300 font-medium">Ingredientes</Label>
                <Button 
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addIngredient}
                  className="border-purple-500/20 text-purple-300 hover:bg-purple-500/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Ingrediente
                </Button>
              </div>

              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <Card key={index} className="bg-slate-700/30 border-purple-500/10">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-5">
                          <Label className="text-purple-300 text-sm">Producto</Label>
                          <Select 
                            value={ingredient.productId} 
                            onValueChange={(value) => updateIngredient(index, 'productId', value)}
                          >
                            <SelectTrigger className="bg-slate-600/50 border-purple-500/20 text-white">
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

                        <div className="col-span-3">
                          <Label className="text-purple-300 text-sm">Cantidad</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(index, 'quantity', Number(e.target.value))}
                            className="bg-slate-600/50 border-purple-500/20 text-white"
                            placeholder="0.1"
                          />
                        </div>

                        <div className="col-span-3">
                          <Label className="text-purple-300 text-sm">Unidad</Label>
                          <Input
                            value={ingredient.unit}
                            onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                            className="bg-slate-600/50 border-purple-500/20 text-white"
                            placeholder="kg"
                            readOnly
                          />
                        </div>

                        <div className="col-span-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIngredient(index)}
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
                {isLoading ? 'Guardando...' : (recipe ? 'Actualizar' : 'Agregar')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}