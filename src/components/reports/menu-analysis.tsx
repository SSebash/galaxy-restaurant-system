'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, TrendingUp, DollarSign, ChefHat } from 'lucide-react'

interface MenuAnalysisProps {
  recipes: Array<{
    id: string
    name: string
    category: string
    price: number
    isActive: boolean
  }>
  orders: Array<{
    id: string
    items: Array<{
      recipeId: string
      quantity: number
      price: number
    }>
  }>
}

export function MenuAnalysis({ recipes, orders }: MenuAnalysisProps) {
  // Transformar los datos de recetas y pedidos al formato esperado
  const data = recipes.map(recipe => {
    const recipeOrders = orders.filter(order => 
      order.items.some(item => item.recipeId === recipe.id)
    )
    
    const totalOrders = recipeOrders.length
    const popularity = recipes.length > 0 ? Math.min(100, (totalOrders / Math.max(1, orders.length)) * 100) : 0
    const cost = recipe.price * 0.4 // Estimado: 40% del precio es costo
    const profitMargin = recipe.price > 0 ? ((recipe.price - cost) / recipe.price) * 100 : 0
    
    // Clasificación basada en popularidad y margen
    let classification: 'STAR' | 'PUZZLE' | 'PLOWHORSE' | 'DOG' = 'DOG'
    if (popularity >= 70 && profitMargin >= 50) classification = 'STAR'
    else if (popularity < 30 && profitMargin >= 50) classification = 'PUZZLE'
    else if (popularity >= 70 && profitMargin < 30) classification = 'PLOWHORSE'
    
    return {
      name: recipe.name,
      category: recipe.category,
      price: recipe.price,
      cost,
      popularity,
      profitMargin,
      classification
    }
  })

  const totalRevenue = data.reduce((sum, item) => sum + item.price, 0)
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0)
  const averageMargin = data.length > 0 ? data.reduce((sum, item) => sum + item.profitMargin, 0) / data.length : 0
  const averagePopularity = data.length > 0 ? data.reduce((sum, item) => sum + item.popularity, 0) / data.length : 0

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'STAR':
        return 'default'
      case 'PUZZLE':
        return 'secondary'
      case 'PLOWHORSE':
        return 'outline'
      case 'DOG':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getClassificationText = (classification: string) => {
    switch (classification) {
      case 'STAR':
        return 'Estrella'
      case 'PUZZLE':
        return 'Rompecabezas'
      case 'PLOWHORSE':
        return 'Caballo de Labor'
      case 'DOG':
        return 'Perro'
      default:
        return 'Desconocido'
    }
  }

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'STAR':
        return Star
      case 'PUZZLE':
        return TrendingUp
      case 'PLOWHORSE':
        return ChefHat
      case 'DOG':
        return DollarSign
      default:
        return Star
    }
  }

  const getClassificationDescription = (classification: string) => {
    switch (classification) {
      case 'STAR':
        return 'Alta popularidad y alto margen'
      case 'PUZZLE':
        return 'Baja popularidad y alto margen'
      case 'PLOWHORSE':
        return 'Alta popularidad y bajo margen'
      case 'DOG':
        return 'Baja popularidad y bajo margen'
      default:
        return 'Clasificación desconocida'
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-purple-400" />
          Análisis de Menú
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-slate-400">Precio Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{averageMargin.toFixed(1)}%</div>
            <p className="text-xs text-slate-400">Margen Promedio</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{averagePopularity.toFixed(1)}</div>
            <p className="text-xs text-slate-400">Popularidad Promedio</p>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => {
            const ClassificationIcon = getClassificationIcon(item.classification)
            const classificationColor = getClassificationColor(item.classification)
            const classificationText = getClassificationText(item.classification)
            
            return (
              <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ClassificationIcon className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium text-white">{item.name}</span>
                    <Badge variant={classificationColor as any}>
                      {classificationText}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-sm mb-2">
                  <div className="text-slate-400">
                    <DollarSign className="inline h-3 w-3 mr-1" />
                    <span className="text-white">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="text-slate-400">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    <span className="text-white">{item.popularity}%</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-white">${item.cost.toFixed(2)}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-white">{item.profitMargin}%</span>
                  </div>
                </div>
                
                <div className="text-xs text-slate-400 mb-2">
                  {getClassificationDescription(item.classification)}
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.popularity}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Resumen del Menú</span>
            <div className="flex items-center gap-2">
              <Badge variant={averageMargin >= 50 ? 'default' : 'secondary'}>
                {averageMargin >= 50 ? 'Buen Rendimiento' : 'Rendimiento Regular'}
              </Badge>
              <span className={`text-sm font-medium ${averageMargin >= 50 ? 'text-green-400' : 'text-yellow-400'}`}>
                {averageMargin.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-4">
            <ChefHat className="h-12 w-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400">No hay datos de análisis disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}