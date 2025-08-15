'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Package, ChefHat, ShoppingCart, Table, Edit, Trash2, Settings, TrendingUp, BarChart3, FileText } from 'lucide-react'
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
import { EmployeePerformance } from '@/components/reports/employee-performance'
import { CostAnalysis } from '@/components/reports/cost-analysis'
import { SeasonalTrends } from '@/components/reports/seasonal-trends'
import { PeakHours } from '@/components/reports/peak-hours'
import { TableProfitability } from '@/components/reports/table-profitability'
import { SupplierAnalysis } from '@/components/reports/supplier-analysis'
import { PaymentMethods } from '@/components/reports/payment-methods'
import { WasteAnalysis } from '@/components/reports/waste-analysis'
import { InventoryTurnover } from '@/components/reports/inventory-turnover'
import { FrequentCustomers } from '@/components/reports/frequent-customers'
import { PromotionAnalysis } from '@/components/reports/promotion-analysis'
import { CompetitorAnalysis } from '@/components/reports/competitor-analysis'
import { LaborAnalysis } from '@/components/reports/labor-analysis'
import { EnergyAnalysis } from '@/components/reports/energy-analysis'
import { MaintenanceAnalysis } from '@/components/reports/maintenance-analysis'
import { RiskAnalysis } from '@/components/reports/risk-analysis'
import { CapacityAnalysis } from '@/components/reports/capacity-analysis'
import { QualityAnalysis } from '@/components/reports/quality-analysis'
import { SustainabilityAnalysis } from '@/components/reports/sustainability-analysis'
import { InnovationAnalysis } from '@/components/reports/innovation-analysis'
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
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${(occupiedTables.length / tables.length) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-blue-400">
                    {occupiedTables.length}/{tables.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-purple-400" />
                  Eficiencia Operativa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">94%</div>
                <p className="text-sm text-slate-400">Tiempo promedio servicio: 22min</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <span className="text-xs text-purple-400">+3%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* KPIs Adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-yellow-400" />
                  Ticket Promedio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">$54.24</div>
                <p className="text-sm text-slate-400">+8.3% vs mes anterior</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-xs text-yellow-400">+8.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-400" />
                  Costo de Alimentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">28.5%</div>
                <p className="text-sm text-slate-400">Meta: 30% o menos</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: '28.5%' }}></div>
                  </div>
                  <span className="text-xs text-green-400">Bueno</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5 text-cyan-400" />
                  Tiempo Promedio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-400">45min</div>
                <p className="text-sm text-slate-400">Por mesa ocupada</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-xs text-cyan-400">Óptimo</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actividad Reciente */}
          <Card className="bg-slate-800 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Actividad Reciente del Sistema</CardTitle>
              <CardDescription className="text-slate-400">Últimas acciones y movimientos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Nuevo pedido creado</h4>
                    <p className="text-sm text-slate-400">Mesa 3 • 3 items • $67.95</p>
                  </div>
                  <div className="text-xs text-slate-500">Hace 5 min</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Entrada de inventario</h4>
                    <p className="text-sm text-slate-400">Tomate • +20kg • Proveedor A</p>
                  </div>
                  <div className="text-xs text-slate-500">Hace 15 min</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Mesa liberada</h4>
                    <p className="text-sm text-slate-400">Mesa 1 • Pedido completado • $89.50</p>
                  </div>
                  <div className="text-xs text-slate-500">Hace 30 min</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Gestión de Productos</h2>
            <Button onClick={() => setShowProductForm(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{product.name}</CardTitle>
                  <CardDescription className="text-slate-400">{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Stock:</span>
                      <span className={`font-medium ${product.stock <= (product.minStock || 0) ? 'text-red-400' : 'text-green-400'}`}>
                        {product.stock} {product.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Costo:</span>
                      <span className="font-medium text-white">${product.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mínimo:</span>
                      <span className="font-medium text-white">{product.minStock || 0} {product.unit}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete('producto', product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Gestión de Recetas</h2>
            <Button onClick={() => setShowRecipeForm(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Receta
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{recipe.name}</CardTitle>
                  <CardDescription className="text-slate-400">{recipe.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Precio:</span>
                      <span className="font-medium text-white">${recipe.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ingredientes:</span>
                      <span className="font-medium text-white">{recipe.ingredients.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estado:</span>
                      <Badge variant={recipe.isActive ? 'default' : 'secondary'}>
                        {recipe.isActive ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingRecipe(recipe)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete('receta', recipe.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Gestión de Pedidos</h2>
            <Button onClick={() => setShowOrderForm(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Pedido
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <Card key={order.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{order.tableName}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estado:</span>
                      <Badge variant={
                        order.status === 'DELIVERED' ? 'default' :
                        order.status === 'PREPARING' ? 'secondary' :
                        order.status === 'READY' ? 'outline' : 'destructive'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Items:</span>
                      <span className="font-medium text-white">{order.items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total:</span>
                      <span className="font-medium text-white">${order.total}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingOrder(order)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete('pedido', order.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tables" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Gestión de Mesas</h2>
            <Button onClick={() => setShowTableForm(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Mesa
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <Card key={table.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{table.name}</CardTitle>
                  <CardDescription className="text-slate-400">{table.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Capacidad:</span>
                      <span className="font-medium text-white">{table.capacity} personas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estado:</span>
                      <Badge variant={
                        table.status === 'AVAILABLE' ? 'default' :
                        table.status === 'OCCUPIED' ? 'destructive' :
                        table.status === 'RESERVED' ? 'secondary' : 'outline'
                      }>
                        {table.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTable(table)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete('mesa', table.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Gestión de Inventario</h2>
            <Button onClick={() => setShowInventoryForm(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Movimiento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventoryMovements.map((movement) => (
              <Card key={movement.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{movement.productName}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {new Date(movement.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tipo:</span>
                      <Badge variant={movement.type === 'IN' ? 'default' : 'destructive'}>
                        {movement.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cantidad:</span>
                      <span className="font-medium text-white">{movement.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Usuario:</span>
                      <span className="font-medium text-white">{movement.user}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingInventory(movement)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Filtros */}
          <ReportsFilter 
            onFilterChange={handleFilterChange}
            onExport={handleExport}
          />
          
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Reportes y Estadísticas</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                fetchReportsData().catch(error => {
                  console.error('Error fetching reports data:', error)
                  setReportsData(null)
                })
              }}>
                <BarChart3 className="h-4 w-4 mr-2" />
                {reportsData ? 'Actualizar Datos' : 'Cargar Datos'}
              </Button>
            </div>
          </div>

          {/* Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Ventas del Día"
              value="$1,247.50"
              subtitle="23 pedidos"
              trend={{ value: "+12.5%", type: "positive" }}
              icon={TrendingUp}
              iconColor="text-green-400"
            />

            <MetricsCard
              title="Productos Críticos"
              value="3"
              subtitle="Bajo stock mínimo"
              trend={{ value: "Requieren reposición", type: "negative" }}
              icon={Package}
              iconColor="text-red-400"
            />

            <MetricsCard
              title="Ocupación Mesas"
              value="75%"
              subtitle="6 de 8 mesas ocupadas"
              trend={{ value: "Horario pico", type: "neutral" }}
              icon={BarChart3}
              iconColor="text-blue-400"
            />

            <MetricsCard
              title="Eficiencia Cocina"
              value="92%"
              subtitle="Tiempo promedio 18min"
              trend={{ value: "+5% vs semana anterior", type: "positive" }}
              icon={ChefHat}
              iconColor="text-purple-400"
            />
          </div>

          {/* Reportes Detallados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Gráfico de Ventas por Hora */}
            <SalesChart 
              data={[
                { hour: '12:00', sales: 340, orders: 8 },
                { hour: '13:00', sales: 380, orders: 9 },
                { hour: '14:00', sales: 280, orders: 6 },
                { hour: '19:00', sales: 360, orders: 8 },
                { hour: '20:00', sales: 300, orders: 7 },
                { hour: '21:00', sales: 250, orders: 5 },
              ]}
            />

            {/* Gráfico de Categorías */}
            <CategoryChart 
              data={[
                { name: 'Platos Principales', value: 54, revenue: 680, orders: 18 },
                { name: 'Entradas', value: 26, revenue: 320, orders: 12 },
                { name: 'Bebidas', value: 14, revenue: 180, orders: 15 },
                { name: 'Postres', value: 6, revenue: 67.50, orders: 6 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Estado del Inventario */}
            <InventoryStatus 
              items={[
                { name: 'Harina', currentStock: 5, minStock: 10, unit: 'kg' },
                { name: 'Lechuga', currentStock: 8, minStock: 5, unit: 'kg' },
                { name: 'Tomate', currentStock: 50, minStock: 10, unit: 'kg' },
                { name: 'Pollo', currentStock: 15, minStock: 8, unit: 'kg' },
              ]}
            />

            {/* Platos Más Populares */}
            <PopularItems 
              items={[
                { name: 'Hamburguesa Clásica', orders: 15, revenue: 225.00 },
                { name: 'Ensalada César', orders: 8, revenue: 76.00 },
                { name: 'Papas Fritas', orders: 12, revenue: 54.00 },
                { name: 'Pollo Frito', orders: 6, revenue: 78.00 },
              ]}
            />
          </div>

          {/* Reportes Adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <MetricsCard
              title="Ticket Promedio"
              value="$54.24"
              subtitle="+8.3% vs mes anterior"
              icon={TrendingUp}
              iconColor="text-yellow-400"
            />

            <MetricsCard
              title="Costo de Alimentos"
              value="28.5%"
              subtitle="Meta: 30% o menos"
              icon={Package}
              iconColor="text-orange-400"
            />

            <MetricsCard
              title="Tiempo Promedio"
              value="45min"
              subtitle="Por mesa ocupada"
              icon={Table}
              iconColor="text-cyan-400"
            />
          </div>

          {/* Más Reportes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Tendencias de Ventas */}
            <SalesTrends 
              data={[
                { period: 'Enero', sales: 15000, growth: 5.2 },
                { period: 'Febrero', sales: 16200, growth: 8.0 },
                { period: 'Marzo', sales: 15800, growth: -2.5 },
                { period: 'Abril', sales: 17500, growth: 10.8 },
              ]}
            />

            {/* Rendimiento de Productos */}
            <ProductPerformance 
              data={[
                { name: 'Hamburguesa', revenue: 2250, cost: 900, profit: 1350, margin: 60 },
                { name: 'Ensalada', revenue: 760, cost: 380, profit: 380, margin: 50 },
                { name: 'Papas Fritas', revenue: 540, cost: 270, profit: 270, margin: 50 },
                { name: 'Pollo Frito', revenue: 780, cost: 390, profit: 390, margin: 50 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Utilización de Mesas */}
            <TableUtilization 
              data={[
                { name: 'Mesa 1', capacity: 4, utilizationRate: 85, totalRevenue: 1250, status: 'OCCUPIED' },
                { name: 'Mesa 2', capacity: 2, utilizationRate: 60, totalRevenue: 680, status: 'AVAILABLE' },
                { name: 'Mesa 3', capacity: 6, utilizationRate: 95, totalRevenue: 1890, status: 'OCCUPIED' },
                { name: 'Mesa 4', capacity: 4, utilizationRate: 45, totalRevenue: 450, status: 'AVAILABLE' },
              ]}
            />

            {/* Eficiencia de Cocina */}
            <KitchenEfficiency 
              data={[
                { period: 'Mañana', ordersCompleted: 25, averageTime: 18, efficiency: 92 },
                { period: 'Tarde', ordersCompleted: 35, averageTime: 22, efficiency: 88 },
                { period: 'Noche', ordersCompleted: 45, averageTime: 25, efficiency: 85 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Menú */}
            <MenuAnalysis 
              data={[
                { name: 'Hamburguesa Clásica', category: 'Platos Principales', price: 15.99, cost: 6.40, popularity: 85, profitMargin: 60, classification: 'STAR' },
                { name: 'Ensalada César', category: 'Entradas', price: 8.99, cost: 4.50, popularity: 45, profitMargin: 50, classification: 'PUZZLE' },
                { name: 'Papas Fritas', category: 'Acompañamientos', price: 4.99, cost: 2.50, popularity: 70, profitMargin: 50, classification: 'PLOWHORSE' },
                { name: 'Sopa del Día', category: 'Entradas', price: 6.99, cost: 4.20, popularity: 25, profitMargin: 40, classification: 'DOG' },
              ]}
            />

            {/* Satisfacción del Cliente */}
            <CustomerSatisfaction 
              data={[
                { category: 'Comida', rating: 4.5, totalReviews: 120, positive: 95, negative: 15, neutral: 10 },
                { category: 'Servicio', rating: 4.2, totalReviews: 115, positive: 88, negative: 20, neutral: 7 },
                { category: 'Ambiente', rating: 4.0, totalReviews: 110, positive: 82, negative: 22, neutral: 6 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Movimientos de Inventario */}
            <InventoryMovements 
              data={[
                { productName: 'Tomate', type: 'IN', quantity: 20, date: '2024-01-15', user: 'Juan', referenceType: 'PURCHASE' },
                { productName: 'Pollo', type: 'OUT', quantity: 5, date: '2024-01-15', user: 'María', referenceType: 'RECIPE' },
                { productName: 'Harina', type: 'IN', quantity: 50, date: '2024-01-14', user: 'Juan', referenceType: 'PURCHASE' },
                { productName: 'Lechuga', type: 'OUT', quantity: 3, date: '2024-01-14', user: 'Ana', referenceType: 'RECIPE' },
              ]}
            />

            {/* Rendimiento de Empleados */}
            <EmployeePerformance 
              data={[
                { name: 'Juan Pérez', role: 'Mesero', ordersServed: 45, totalSales: 2250, averageTicket: 50, efficiency: 92 },
                { name: 'María García', role: 'Mesera', ordersServed: 38, totalSales: 1950, averageTicket: 51, efficiency: 88 },
                { name: 'Ana López', role: 'Cocinera', ordersServed: 52, totalSales: 2850, averageTicket: 55, efficiency: 95 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Costos */}
            <CostAnalysis 
              data={[
                { category: 'Alimentos', totalCost: 8500, budget: 8000, variance: 500, variancePercentage: 6.25 },
                { category: 'Personal', totalCost: 12000, budget: 12500, variance: -500, variancePercentage: -4.0 },
                { category: 'Servicios', totalCost: 3500, budget: 3000, variance: 500, variancePercentage: 16.67 },
              ]}
            />

            {/* Tendencias Estacionales */}
            <SeasonalTrends 
              data={[
                { month: 'Enero', sales: 15000, orders: 320, averageTicket: 46.88, growth: 5.2, season: 'Invierno' },
                { month: 'Febrero', sales: 16200, orders: 340, averageTicket: 47.65, growth: 8.0, season: 'Invierno' },
                { month: 'Marzo', sales: 15800, orders: 335, averageTicket: 47.16, growth: -2.5, season: 'Primavera' },
                { month: 'Abril', sales: 17500, orders: 365, averageTicket: 47.95, growth: 10.8, season: 'Primavera' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Horas Pico */}
            <PeakHours 
              data={[
                { hour: '12:00-13:00', sales: 850, orders: 18, customers: 72, isPeak: true },
                { hour: '13:00-14:00', sales: 920, orders: 20, customers: 80, isPeak: true },
                { hour: '19:00-20:00', sales: 1100, orders: 24, customers: 96, isPeak: true },
                { hour: '20:00-21:00', sales: 980, orders: 21, customers: 84, isPeak: true },
                { hour: '15:00-16:00', sales: 320, orders: 7, customers: 28, isPeak: false },
              ]}
            />

            {/* Rentabilidad por Mesa */}
            <TableProfitability 
              data={[
                { tableName: 'Mesa 1', totalRevenue: 2850, totalCosts: 1140, profit: 1710, profitMargin: 60, turnoverRate: 3.2 },
                { tableName: 'Mesa 2', totalRevenue: 1950, totalCosts: 875, profit: 1075, profitMargin: 55, turnoverRate: 2.8 },
                { tableName: 'Mesa 3', totalRevenue: 3250, totalCosts: 1300, profit: 1950, profitMargin: 60, turnoverRate: 3.5 },
                { tableName: 'Mesa 4', totalRevenue: 1650, totalCosts: 825, profit: 825, profitMargin: 50, turnoverRate: 2.2 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Proveedores */}
            <SupplierAnalysis 
              data={[
                { name: 'Proveedor A', totalOrders: 15, totalAmount: 8500, averageDeliveryTime: 2, qualityRating: 4.5, onTimeDelivery: 95 },
                { name: 'Proveedor B', totalOrders: 12, totalAmount: 6200, averageDeliveryTime: 3, qualityRating: 4.2, onTimeDelivery: 88 },
                { name: 'Proveedor C', totalOrders: 8, totalAmount: 3800, averageDeliveryTime: 4, qualityRating: 3.8, onTimeDelivery: 75 },
              ]}
            />

            {/* Métodos de Pago */}
            <PaymentMethods 
              data={[
                { method: 'Efectivo', transactions: 145, totalAmount: 7250, averageAmount: 50, percentage: 45, fees: 0 },
                { method: 'Tarjeta Crédito', transactions: 98, totalAmount: 5880, averageAmount: 60, percentage: 36, fees: 176 },
                { method: 'Tarjeta Débito', transactions: 67, totalAmount: 3350, averageAmount: 50, percentage: 21, fees: 67 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Desperdicio */}
            <WasteAnalysis 
              data={[
                { productName: 'Tomate', wasteAmount: 5, wasteCost: 12.50, wastePercentage: 8.5, reason: 'Caducidad', date: '2024-01-15' },
                { productName: 'Lechuga', wasteAmount: 3, wasteCost: 4.50, wastePercentage: 6.2, reason: 'Daño', date: '2024-01-14' },
                { productName: 'Pan', wasteAmount: 8, wasteCost: 8.00, wastePercentage: 12.3, reason: 'Sobrante', date: '2024-01-13' },
              ]}
            />

            {/* Rotación de Inventario */}
            <InventoryTurnover 
              data={[
                { productName: 'Tomate', category: 'Vegetales', turnoverRate: 24, daysOfSupply: 15, currentStock: 50, annualUsage: 1200 },
                { productName: 'Pollo', category: 'Carnes', turnoverRate: 18, daysOfSupply: 20, currentStock: 15, annualUsage: 270 },
                { productName: 'Harina', category: 'Granos', turnoverRate: 8, daysOfSupply: 45, currentStock: 100, annualUsage: 800 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Clientes Frecuentes */}
            <FrequentCustomers 
              data={[
                { customerName: 'Carlos Ruiz', visits: 12, totalSpent: 680, averageTicket: 56.67, lastVisit: '2024-01-15', favoriteCategory: 'Platos Principales' },
                { customerName: 'Ana Martínez', visits: 8, totalSpent: 420, averageTicket: 52.50, lastVisit: '2024-01-14', favoriteCategory: 'Bebidas' },
                { customerName: 'Luis García', visits: 15, totalSpent: 890, averageTicket: 59.33, lastVisit: '2024-01-13', favoriteCategory: 'Postres' },
              ]}
            />

            {/* Análisis de Promociones */}
            <PromotionAnalysis 
              data={[
                { promotionName: '2x1 Hamburguesas', type: 'Descuento', discount: 50, salesIncrease: 25, revenueGenerated: 3200, cost: 800, roi: 3.0 },
                { promotionName: 'Happy Hour', type: 'Descuento', discount: 30, salesIncrease: 40, revenueGenerated: 2850, cost: 855, roi: 2.3 },
                { promotionName: 'Menú del Día', type: 'Combo', discount: 20, salesIncrease: 15, revenueGenerated: 1950, cost: 390, roi: 4.0 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Competencia */}
            <CompetitorAnalysis 
              data={[
                { competitorName: 'Restaurant A', distance: 0.5, priceLevel: 3, qualityRating: 4.2, marketShare: 25, strengths: ['Ubicación', 'Precio'], weaknesses: ['Servicio'] },
                { competitorName: 'Restaurant B', distance: 1.2, priceLevel: 4, qualityRating: 4.5, marketShare: 20, strengths: ['Calidad', 'Ambiente'], weaknesses: ['Precio'] },
                { competitorName: 'Restaurant C', distance: 2.0, priceLevel: 2, qualityRating: 3.8, marketShare: 15, strengths: ['Precio'], weaknesses: ['Calidad'] },
              ]}
            />

            {/* Análisis de Horas Laborales */}
            <LaborAnalysis 
              data={[
                { period: 'Enero', laborCost: 12000, laborCostPercentage: 28, revenue: 42857, productivity: 95, overtimeHours: 45 },
                { period: 'Febrero', laborCost: 12500, laborCostPercentage: 30, revenue: 41667, productivity: 92, overtimeHours: 52 },
                { period: 'Marzo', laborCost: 11800, laborCostPercentage: 26, revenue: 45385, productivity: 98, overtimeHours: 38 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Energía */}
            <EnergyAnalysis 
              data={[
                { equipment: 'Refrigerador', energyConsumption: 450, cost: 135, efficiency: 92, usageHours: 720, status: 'GOOD' },
                { equipment: 'Horno', energyConsumption: 280, cost: 84, efficiency: 88, usageHours: 240, status: 'EXCELLENT' },
                { equipment: 'Aire Acondicionado', energyConsumption: 680, cost: 204, efficiency: 78, usageHours: 480, status: 'FAIR' },
              ]}
            />

            {/* Análisis de Mantenimiento */}
            <MaintenanceAnalysis 
              data={[
                { equipment: 'Refrigerador', maintenanceCost: 250, downtime: 4, lastMaintenance: '2024-01-10', nextMaintenance: '2024-04-10', condition: 'GOOD' },
                { equipment: 'Horno', maintenanceCost: 180, downtime: 2, lastMaintenance: '2024-01-05', nextMaintenance: '2024-04-05', condition: 'EXCELLENT' },
                { equipment: 'Lavavajillas', maintenanceCost: 320, downtime: 8, lastMaintenance: '2023-12-20', nextMaintenance: '2024-03-20', condition: 'FAIR' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Riesgos */}
            <RiskAnalysis 
              data={[
                { riskCategory: 'Falla de Equipo', riskLevel: 7, probability: 25, impact: 40, mitigation: 'Mantenimiento preventivo', status: 'MONITORED' },
                { riskCategory: 'Falta de Personal', riskLevel: 6, probability: 30, impact: 35, mitigation: 'Contratación temporal', status: 'ACCEPTED' },
                { riskCategory: 'Aumento de Costos', riskLevel: 8, probability: 40, impact: 50, mitigation: 'Diversificación proveedores', status: 'MITIGATED' },
              ]}
            />

            {/* Análisis de Capacidad */}
            <CapacityAnalysis 
              data={[
                { area: 'Restaurante', currentCapacity: 80, maximumCapacity: 100, utilizationRate: 80, expansionNeeded: false, estimatedCost: 0 },
                { area: 'Cocina', currentCapacity: 45, maximumCapacity: 50, utilizationRate: 90, expansionNeeded: true, estimatedCost: 25000 },
                { area: 'Estacionamiento', currentCapacity: 25, maximumCapacity: 40, utilizationRate: 62.5, expansionNeeded: false, estimatedCost: 0 },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Análisis de Calidad */}
            <QualityAnalysis 
              data={[
                { category: 'Comida', qualityScore: 92, inspections: 15, issues: 2, lastInspection: '2024-01-15', trend: 'IMPROVING' },
                { category: 'Servicio', qualityScore: 88, inspections: 12, issues: 3, lastInspection: '2024-01-14', trend: 'STABLE' },
                { category: 'Limpieza', qualityScore: 95, inspections: 18, issues: 1, lastInspection: '2024-01-13', trend: 'IMPROVING' },
              ]}
            />

            {/* Análisis de Sostenibilidad */}
            <SustainabilityAnalysis 
              data={[
                { initiative: 'Panel Solar', category: 'Energía', implementationDate: '2024-01-01', cost: 15000, savings: 3000, roi: 0.2, status: 'ACTIVE' },
                { initiative: 'Reciclaje', category: 'Residuos', implementationDate: '2023-12-01', cost: 2500, savings: 800, roi: 0.32, status: 'ACTIVE' },
                { initiative: 'Riego Eficiente', category: 'Agua', implementationDate: '2024-02-01', cost: 5000, savings: 1200, roi: 0.24, status: 'PLANNED' },
              ]}
            />
          </div>

          {/* Análisis de Innovación */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <InnovationAnalysis 
              data={[
                { innovation: 'App de Pedidos', category: 'Tecnología', developmentStage: 'Beta', investment: 25000, expectedReturn: 50000, riskLevel: 6, status: 'TESTING' },
                { innovation: 'Menú Digital', category: 'Tecnología', developmentStage: 'Diseño', investment: 15000, expectedReturn: 30000, riskLevel: 4, status: 'DEVELOPMENT' },
                { innovation: 'Delivery Propio', category: 'Servicio', developmentStage: 'Investigación', investment: 40000, expectedReturn: 80000, riskLevel: 8, status: 'RESEARCH' },
              ]}
            />
          </div>
        </TabsContent>

        {(showProductForm || editingProduct) && (
          <ProductForm 
            product={editingProduct}
            onClose={() => {
              setShowProductForm(false)
              setEditingProduct(null)
            }}
            onSuccess={handleFormSuccess}
          />
        )}

        {(showRecipeForm || editingRecipe) && (
          <RecipeForm 
            recipe={editingRecipe}
            onClose={() => {
              setShowRecipeForm(false)
              setEditingRecipe(null)
            }}
            onSuccess={handleFormSuccess}
          />
        )}

        {(showOrderForm || editingOrder) && (
          <OrderForm 
            order={editingOrder}
            onClose={() => {
              setShowOrderForm(false)
              setEditingOrder(null)
            }}
            onSuccess={handleFormSuccess}
          />
        )}

        {(showTableForm || editingTable) && (
          <TableForm 
            table={editingTable}
            onClose={() => {
              setShowTableForm(false)
              setEditingTable(null)
            }}
            onSuccess={handleFormSuccess}
          />
        )}

        {(showInventoryForm || editingInventory) && (
          <InventoryMovementForm 
            movement={editingInventory}
            onClose={() => {
              setShowInventoryForm(false)
              setEditingInventory(null)
            }}
            onSuccess={handleFormSuccess}
          />
        )}
      </Tabs>
    </div>
  )
}