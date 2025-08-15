'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Package, ChefHat, ShoppingCart, Table, Edit, Trash2, Settings, FileText } from 'lucide-react'
import { ProductForm } from '@/components/forms/product-form'
import { RecipeForm } from '@/components/forms/recipe-form'
import { OrderForm } from '@/components/forms/order-form'
import { TableForm } from '@/components/forms/table-form'
import { InventoryMovementForm } from '@/components/forms/inventory-movement-form'
// Importar componentes de reportes
import { MetricsCard } from '@/components/reports/metrics-card'
import { SalesChart } from '@/components/charts/sales-chart'
import { CategoryChart } from '@/components/charts/category-chart'
import { InventoryStatus } from '@/components/reports/inventory-status'
import { PopularItems } from '@/components/reports/popular-items'
import { ReportsFilter } from '@/components/reports/reports-filter'
import { SalesTrends } from '@/components/reports/sales-trends'
import { ProductPerformance } from '@/components/reports/product-performance'
import { TableUtilization } from '@/components/reports/table-utilization'
import { KitchenEfficiency } from '@/components/reports/kitchen-efficiency'
import { MenuAnalysis } from '@/components/reports/menu-analysis'
import { CustomerSatisfaction } from '@/components/reports/customer-satisfaction'
import { InventoryMovements } from '@/components/reports/inventory-movements'
import { useRestaurantStore } from '@/store/restaurant-store'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showProductForm, setShowProductForm] = useState(false)
  const [showRecipeForm, setShowRecipeForm] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showTableForm, setShowTableForm] = useState(false)
  const [showInventoryForm, setShowInventoryForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [editingRecipe, setEditingRecipe] = useState<any>(null)
  const [editingOrder, setEditingOrder] = useState<any>(null)
  const [editingTable, setEditingTable] = useState<any>(null)
  const [editingInventory, setEditingInventory] = useState<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [reportsData, setReportsData] = useState<any>(null)
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    reportType: 'sales',
    category: ''
  })

  const { 
    products, 
    recipes, 
    orders, 
    tables, 
    inventoryMovements,
    isLoading, 
    error,
    fetchProducts, 
    fetchRecipes, 
    fetchOrders, 
    fetchTables,
    fetchInventoryMovements,
    deleteProduct,
    deleteRecipe,
    deleteOrder,
    deleteTable
  } = useRestaurantStore()

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchProducts(),
          fetchRecipes(),
          fetchOrders(),
          fetchTables(),
          fetchInventoryMovements()
        ])
        setIsInitialized(true)
      } catch (error) {
        console.error('Error loading data:', error)
        setIsInitialized(true) // Still mark as initialized to prevent loading state
      }
    }

    loadData().catch(error => {
      console.error('Error in initial data load:', error)
      setIsInitialized(true) // Ensure initialization even on error
    })
  }, [fetchProducts, fetchRecipes, fetchOrders, fetchTables, fetchInventoryMovements])

  // Fetch reports data when reports tab is active or filters change
  useEffect(() => {
    if (activeTab === 'reports') {
      const timer = setTimeout(() => {
        fetchReportsData().catch(error => {
          console.error('Error in reports data fetch:', error)
          setReportsData(null)
        })
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [activeTab, filters])

  const handleFormSuccess = () => {
    // Refresh data after form submission
    fetchProducts()
    fetchRecipes()
    fetchOrders()
    fetchTables()
    fetchInventoryMovements()
    // Reset editing states
    setEditingProduct(null)
    setEditingRecipe(null)
    setEditingOrder(null)
    setEditingTable(null)
    setEditingInventory(null)
  }

  const fetchReportsData = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)
      if (filters.reportType) params.append('type', filters.reportType)
      if (filters.category) params.append('category', filters.category)
      
      const response = await fetch(`/api/reports?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setReportsData(data)
      } else {
        console.error('Error response from reports API:', response.status)
        setReportsData(null)
      }
    } catch (error) {
      console.error('Error fetching reports data:', error)
      setReportsData(null)
    }
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const handleExport = () => {
    alert('Función de exportación será implementada próximamente')
  }

  const availableTables = tables.filter(table => table.status === 'AVAILABLE')
  const occupiedTables = tables.filter(table => table.status === 'OCCUPIED')
  const pendingOrders = orders.filter(order => order.status === 'PENDING' || order.status === 'CONFIRMED')

  const handleDelete = async (type: string, id: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar este ${type}?`)) return

    try {
      switch (type) {
        case 'producto':
          await deleteProduct(id)
          break
        case 'receta':
          await deleteRecipe(id)
          break
        case 'pedido':
          await deleteOrder(id)
          break
        case 'mesa':
          await deleteTable(id)
          break
      }
      handleFormSuccess()
    } catch (error) {
      console.error(`Error deleting ${type}:`, error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Galaxy Restaurant System</h1>
        <p className="text-slate-400">Sistema de gestión para restaurante</p>
        {error && (
          <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded">
            <p className="text-red-400 text-sm">Error: {error}</p>
          </div>
        )}
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Productos
          </TabsTrigger>
          <TabsTrigger value="recipes" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            Recetas
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="tables" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            Mesas
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventario
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reportes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="mb-4">
            <p className="text-lg">
              Estado: {' '}
              {isLoading ? (
                <Badge variant="secondary">Cargando...</Badge>
              ) : (
                <Badge variant="secondary">Listo</Badge>
              )}
            </p>
          </div>

          {/* Métricas Principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">{products.length}</div>
                <p className="text-xs text-muted-foreground">Total en inventario</p>
                <p className="text-xs text-red-400">
                  {products.filter(p => p.stock <= (p.minStock || 0)).length} con bajo stock
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recetas</CardTitle>
                <ChefHat className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">{recipes.length}</div>
                <p className="text-xs text-muted-foreground">Recetas disponibles</p>
                <p className="text-xs text-green-400">
                  {recipes.filter(r => r.isActive).length} activas
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">{pendingOrders.length}</div>
                <p className="text-xs text-muted-foreground">Pedidos activos</p>
                <p className="text-xs text-blue-400">
                  {orders.filter(o => o.status === 'PREPARING').length} en preparación
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mesas</CardTitle>
                <Table className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">{tables.length}</div>
                <p className="text-xs text-muted-foreground">
                  {availableTables.length} disponibles
                </p>
                <p className="text-xs text-orange-400">
                  {occupiedTables.length} ocupadas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Indicadores de Rendimiento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-400" />
                  Ingresos del Día
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">$1,247.50</div>
                <p className="text-sm text-slate-400">23 pedidos completados</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-xs text-green-400">+12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-red-400" />
                  Alertas de Inventario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">
                  {products.filter(p => p.stock <= (p.minStock || 0)).length}
                </div>
                <p className="text-sm text-slate-400">Productos necesitan reposición</p>
                <div className="mt-2 space-y-1">
                  {products.filter(p => p.stock <= (p.minStock || 0)).slice(0, 2).map(product => (
                    <div key={product.id} className="text-xs text-red-400">
                      • {product.name}: {product.stock} {product.unit}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5 text-blue-400" />
                  Ocupación en Tiempo Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round((occupiedTables.length / tables.length) * 100)}%
                </div>
                <p className="text-sm text-slate-400">
                  {occupiedTables.length} de {tables.length} mesas ocupadas
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full" 
                      style={{ width: `${(occupiedTables.length / tables.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-blue-400">
                    {Math.round((occupiedTables.length / tables.length) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-yellow-400" />
                  Eficiencia de Cocina
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">92%</div>
                <p className="text-sm text-slate-400">Tiempo promedio: 18 min</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-xs text-yellow-400">+5%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pedidos Recientes */}
          <Card className="bg-slate-800 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-purple-400" />
                Pedidos Recientes
              </CardTitle>
              <CardDescription className="text-slate-400">
                Últimos pedidos registrados en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="font-medium">Pedido #{order.id?.slice(-6)}</p>
                        <p className="text-sm text-slate-400">
                          Mesa: {tables.find(t => t.id === order.tableId)?.name || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                      <Badge 
                        variant={
                          order.status === 'PENDING' ? 'destructive' :
                          order.status === 'PREPARING' ? 'default' :
                          order.status === 'READY' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <p className="text-center text-slate-400 py-4">No hay pedidos recientes</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestión de Productos</h2>
            <Button 
              onClick={() => {
                setEditingProduct(null)
                setShowProductForm(true)
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <Card key={product.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {product.category} • {product.unit}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingProduct(product)
                          setShowProductForm(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete('producto', product.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Precio:</span>
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Stock:</span>
                      <span className={`font-medium ${
                        product.stock <= (product.minStock || 0) ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {product.stock} {product.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Mínimo:</span>
                      <span className="font-medium">{product.minStock} {product.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Estado:</span>
                      <Badge variant={product.isActive ? 'default' : 'secondary'}>
                        {product.isActive ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {products.length === 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">No hay productos registrados</p>
                <Button 
                  onClick={() => {
                    setEditingProduct(null)
                    setShowProductForm(true)
                  }}
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primer producto
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestión de Recetas</h2>
            <Button 
              onClick={() => {
                setEditingRecipe(null)
                setShowRecipeForm(true)
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Receta
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map(recipe => (
              <Card key={recipe.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{recipe.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {recipe.difficulty} • {recipe.preparationTime} min
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRecipe(recipe)
                          setShowRecipeForm(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete('receta', recipe.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Porciones:</span>
                      <span className="font-medium">{recipe.servings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Estado:</span>
                      <Badge variant={recipe.isActive ? 'default' : 'secondary'}>
                        {recipe.isActive ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">{recipe.description}</p>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-slate-300 mb-1">Ingredientes:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient.quantity} {ingredient.unit}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{recipe.ingredients.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {recipes.length === 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="text-center py-8">
                <ChefHat className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">No hay recetas registradas</p>
                <Button 
                  onClick={() => {
                    setEditingRecipe(null)
                    setShowRecipeForm(true)
                  }}
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primera receta
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
            <Button 
              onClick={() => {
                setEditingOrder(null)
                setShowOrderForm(true)
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Pedido
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map(order => (
              <Card key={order.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Pedido #{order.id?.slice(-6)}</CardTitle>
                      <CardDescription className="text-slate-400">
                        Mesa: {tables.find(t => t.id === order.tableId)?.name || 'N/A'}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingOrder(order)
                          setShowOrderForm(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete('pedido', order.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Estado:</span>
                      <Badge 
                        variant={
                          order.status === 'PENDING' ? 'destructive' :
                          order.status === 'PREPARING' ? 'default' :
                          order.status === 'READY' ? 'secondary' : 'outline'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Total:</span>
                      <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Items:</span>
                      <span className="font-medium">{order.items.length}</span>
                    </div>
                  </div>
                  {order.customerName && (
                    <p className="text-sm text-slate-400 mt-2">
                      Cliente: {order.customerName}
                    </p>
                  )}
                  {order.specialInstructions && (
                    <p className="text-sm text-slate-400 mt-2">
                      Notas: {order.specialInstructions}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {orders.length === 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">No hay pedidos registrados</p>
                <Button 
                  onClick={() => {
                    setEditingOrder(null)
                    setShowOrderForm(true)
                  }}
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primer pedido
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tables" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestión de Mesas</h2>
            <Button 
              onClick={() => {
                setEditingTable(null)
                setShowTableForm(true)
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Mesa
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map(table => (
              <Card key={table.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{table.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {table.location} • Capacidad: {table.capacity}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingTable(table)
                          setShowTableForm(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete('mesa', table.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Estado:</span>
                      <Badge 
                        variant={
                          table.status === 'AVAILABLE' ? 'default' :
                          table.status === 'OCCUPIED' ? 'destructive' :
                          table.status === 'RESERVED' ? 'secondary' : 'outline'
                        }
                      >
                        {table.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Capacidad:</span>
                      <span className="font-medium">{table.capacity} personas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Ubicación:</span>
                      <span className="font-medium">{table.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {tables.length === 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="text-center py-8">
                <Table className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">No hay mesas registradas</p>
                <Button 
                  onClick={() => {
                    setEditingTable(null)
                    setShowTableForm(true)
                  }}
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear primera mesa
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestión de Inventario</h2>
            <Button 
              onClick={() => {
                setEditingInventory(null)
                setShowInventoryForm(true)
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Movimiento
            </Button>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Movimientos Recientes</CardTitle>
              <CardDescription>Últimos movimientos de inventario registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventoryMovements.slice(0, 10).map(movement => {
                  const product = products.find(p => p.id === movement.productId)
                  return (
                    <div key={movement.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          movement.type === 'IN' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        <div>
                          <p className="font-medium">{product?.name || 'Producto desconocido'}</p>
                          <p className="text-sm text-slate-400">
                            {movement.type === 'IN' ? 'Entrada' : 'Salida'} • {movement.reason}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          movement.type === 'IN' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                        </p>
                        <p className="text-xs text-slate-400">
                          {new Date(movement.createdAt?.toDate?.() || movement.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
                {inventoryMovements.length === 0 && (
                  <p className="text-center text-slate-400 py-4">No hay movimientos de inventario</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Filtros de Reportes */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Reportes y Análisis</h2>
              <p className="text-slate-400">Análisis detallado del rendimiento del restaurante</p>
            </div>
            <div className="flex gap-2">
              <ReportsFilter 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
              <Button 
                onClick={handleExport}
                variant="outline"
                className="bg-slate-800 border-slate-700 hover:bg-slate-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Ventas del Período"
              value={reportsData?.sales?.total || 0}
              change={reportsData?.sales?.change || 0}
              icon={<Package className="h-5 w-5 text-green-400" />}
              format="currency"
            />
            <MetricsCard
              title="Pedidos Procesados"
              value={reportsData?.orders?.total || 0}
              change={reportsData?.orders?.change || 0}
              icon={<ShoppingCart className="h-5 w-5 text-blue-400" />}
              format="number"
            />
            <MetricsCard
              title="Ticket Promedio"
              value={reportsData?.averageTicket || 0}
              change={reportsData?.averageTicketChange || 0}
              icon={<Table className="h-5 w-5 text-purple-400" />}
              format="currency"
            />
            <MetricsCard
              title="Productos con Bajo Stock"
              value={products.filter(p => p.stock <= (p.minStock || 0)).length}
              change={0}
              icon={<Package className="h-5 w-5 text-red-400" />}
              format="number"
            />
          </div>

          {/* Gráficos de Ventas y Categorías */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-400" />
                  Tendencias de Ventas
                </CardTitle>
                <CardDescription>
                  Evolución de las ventas en el período seleccionado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart data={reportsData?.salesTrends || []} />
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-blue-400" />
                  Ventas por Categoría
                </CardTitle>
                <CardDescription>
                  Distribución de ventas por categoría de productos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryChart data={reportsData?.categorySales || []} />
              </CardContent>
            </Card>
          </div>

          {/* Análisis Adicionales */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-yellow-400" />
                  Productos Más Populares
                </CardTitle>
                <CardDescription>
                  Top 5 productos más vendidos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PopularItems data={reportsData?.popularItems || []} />
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5 text-purple-400" />
                  Estado de Inventario
                </CardTitle>
                <CardDescription>
                  Resumen del estado actual del inventario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryStatus 
                  products={products}
                  inventoryMovements={inventoryMovements}
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-orange-400" />
                  Eficiencia de Cocina
                </CardTitle>
                <CardDescription>
                  Tiempos promedio de preparación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KitchenEfficiency data={reportsData?.kitchenEfficiency || []} />
              </CardContent>
            </Card>
          </div>

          {/* Análisis Detallado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5 text-blue-400" />
                  Utilización de Mesas
                </CardTitle>
                <CardDescription>
                  Ocupación y rotación de mesas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TableUtilization 
                  tables={tables}
                  orders={orders}
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-400" />
                  Rendimiento de Productos
                </CardTitle>
                <CardDescription>
                  Análisis de rentabilidad por producto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductPerformance data={reportsData?.productPerformance || []} />
              </CardContent>
            </Card>
          </div>

          {/* Análisis de Menú y Movimientos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-purple-400" />
                  Análisis de Menú
                </CardTitle>
                <CardDescription>
                  Popularidad y rentabilidad del menú
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MenuAnalysis 
                  recipes={recipes}
                  orders={orders}
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-red-400" />
                  Movimientos de Inventario
                </CardTitle>
                <CardDescription>
                  Registro de movimientos recientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryMovements 
                  movements={inventoryMovements.slice(0, 10)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Satisfacción del Cliente */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Table className="h-5 w-5 text-yellow-400" />
                Satisfacción del Cliente
              </CardTitle>
              <CardDescription>
                Métricas de satisfacción y feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerSatisfaction data={reportsData?.customerSatisfaction || []} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Forms */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSuccess={() => {
            handleFormSuccess()
            setShowProductForm(false)
          }}
          onCancel={() => setShowProductForm(false)}
        />
      )}

      {showRecipeForm && (
        <RecipeForm
          recipe={editingRecipe}
          products={products}
          onSuccess={() => {
            handleFormSuccess()
            setShowRecipeForm(false)
          }}
          onCancel={() => setShowRecipeForm(false)}
        />
      )}

      {showOrderForm && (
        <OrderForm
          order={editingOrder}
          tables={tables.filter(t => t.status === 'AVAILABLE')}
          products={products}
          onSuccess={() => {
            handleFormSuccess()
            setShowOrderForm(false)
          }}
          onCancel={() => setShowOrderForm(false)}
        />
      )}

      {showTableForm && (
        <TableForm
          table={editingTable}
          onSuccess={() => {
            handleFormSuccess()
            setShowTableForm(false)
          }}
          onCancel={() => setShowTableForm(false)}
        />
      )}

      {showInventoryForm && (
        <InventoryMovementForm
          movement={editingInventory}
          products={products}
          onSuccess={() => {
            handleFormSuccess()
            setShowInventoryForm(false)
          }}
          onCancel={() => setShowInventoryForm(false)}
        />
      )}
    </div>
  )
}