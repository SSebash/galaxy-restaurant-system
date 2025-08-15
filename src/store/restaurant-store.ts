import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { firebaseService } from '@/lib/firebase'

// Interfaces para los tipos de datos (compatibles con Firebase)
export interface Product {
  id?: string
  name: string
  description: string
  price: number
  stock: number
  minStock: number
  unit: string
  category: string
  isActive: boolean
  createdAt?: any
  updatedAt?: any
}

export interface Recipe {
  id?: string
  name: string
  description: string
  instructions: string
  preparationTime: number
  servings: number
  difficulty: 'FÁCIL' | 'MEDIO' | 'DIFÍCIL'
  isActive: boolean
  ingredients: Array<{
    productId: string
    quantity: number
    unit: string
  }>
  createdAt?: any
  updatedAt?: any
}

export interface Order {
  id?: string
  tableId: string
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
  items: Array<{
    productId: string
    quantity: number
    price: number
    notes?: string
  }>
  totalAmount: number
  customerName?: string
  specialInstructions?: string
  createdAt?: any
  updatedAt?: any
}

export interface Table {
  id?: string
  name: string
  capacity: number
  location: string
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE'
  currentOrderId?: string
  createdAt?: any
  updatedAt?: any
}

export interface InventoryMovement {
  id?: string
  productId: string
  type: 'IN' | 'OUT'
  quantity: number
  reason: string
  referenceType?: 'PURCHASE' | 'RECIPE' | 'WASTE' | 'ADJUSTMENT'
  referenceId?: string
  notes?: string
  userId: string
  createdAt?: any
}

// Estado de la aplicación
interface RestaurantState {
  // Datos
  products: Product[]
  recipes: Recipe[]
  orders: Order[]
  tables: Table[]
  inventoryMovements: InventoryMovement[]
  
  // Estados de UI
  isLoading: boolean
  error: string | null
  selectedTable: string | null
  activeOrder: Order | null
  
  // Acciones - Productos
  fetchProducts: () => Promise<void>
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  
  // Acciones - Recetas
  fetchRecipes: () => Promise<void>
  addRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<void>
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<void>
  deleteRecipe: (id: string) => Promise<void>
  
  // Acciones - Pedidos
  fetchOrders: () => Promise<void>
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>
  deleteOrder: (id: string) => Promise<void>
  updateOrderItemStatus: (orderId: string, itemId: string, status: any) => Promise<void>
  
  // Acciones - Mesas
  fetchTables: () => Promise<void>
  addTable: (table: Omit<Table, 'id'>) => Promise<void>
  updateTable: (tableId: string, table: Partial<Table>) => Promise<void>
  deleteTable: (tableId: string) => Promise<void>
  updateTableStatus: (tableId: string, status: Table['status']) => Promise<void>
  
  // Acciones - Inventario
  fetchInventoryMovements: () => Promise<void>
  addInventoryMovement: (movement: Omit<InventoryMovement, 'id' | 'createdAt'>) => Promise<void>
  
  // Acciones de UI
  setSelectedTable: (tableId: string | null) => void
  setActiveOrder: (order: Order | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

// Store de Zustand
export const useRestaurantStore = create<RestaurantState>()(
  devtools(
    (set, get) => ({
      // Estado inicial
      products: [],
      recipes: [],
      orders: [],
      tables: [],
      inventoryMovements: [],
      isLoading: false,
      error: null,
      selectedTable: null,
      activeOrder: null,

      // Acciones - Productos
      fetchProducts: async () => {
        console.log('fetchProducts: Iniciando llamada a Firebase...')
        set({ isLoading: true, error: null })
        try {
          const products = await firebaseService.getProducts()
          console.log('fetchProducts: Datos recibidos:', products)
          set({ products, isLoading: false })
        } catch (error) {
          console.error('fetchProducts: Error:', error)
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      addProduct: async (product) => {
        set({ isLoading: true, error: null })
        try {
          const id = await firebaseService.createProduct(product)
          const newProduct = await firebaseService.getProduct(id)
          set(state => ({ 
            products: [...state.products, newProduct!], 
            isLoading: false 
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      updateProduct: async (id, product) => {
        set({ isLoading: true, error: null })
        try {
          await firebaseService.updateProduct(id, product)
          const updatedProduct = await firebaseService.getProduct(id)
          set(state => ({
            products: state.products.map(p => p.id === id ? updatedProduct! : p),
            isLoading: false
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      deleteProduct: async (id) => {
        set({ isLoading: true, error: null })
        try {
          await firebaseService.deleteProduct(id)
          set(state => ({
            products: state.products.filter(p => p.id !== id),
            isLoading: false
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      // Acciones - Recetas
      fetchRecipes: async () => {
        set({ isLoading: true, error: null })
        try {
          const recipes = await firebaseService.getRecipes()
          set({ recipes, isLoading: false })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      addRecipe: async (recipe) => {
        set({ isLoading: true, error: null })
        try {
          const id = await firebaseService.createRecipe(recipe)
          const newRecipe = await firebaseService.getRecipe(id)
          set(state => ({ 
            recipes: [...state.recipes, newRecipe!], 
            isLoading: false 
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      updateRecipe: async (id, recipe) => {
        set({ isLoading: true, error: null })
        try {
          await firebaseService.updateRecipe(id, recipe)
          const updatedRecipe = await firebaseService.getRecipe(id)
          set(state => ({
            recipes: state.recipes.map(r => r.id === id ? updatedRecipe! : r),
            isLoading: false
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      deleteRecipe: async (id) => {
        set({ isLoading: true, error: null })
        try {
          await firebaseService.deleteRecipe(id)
          set(state => ({
            recipes: state.recipes.filter(r => r.id !== id),
            isLoading: false
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      // Acciones - Pedidos
      fetchOrders: async () => {
        set({ isLoading: true, error: null })
        try {
          const orders = await firebaseService.getOrders()
          set({ orders, isLoading: false })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      addOrder: async (order) => {
        set({ isLoading: true, error: null })
        try {
          const id = await firebaseService.createOrder(order)
          const newOrder = await firebaseService.getOrder(id)
          set(state => ({ 
            orders: [...state.orders, newOrder!], 
            isLoading: false 
          }))
            
          // Actualizar estado de la mesa
          get().updateTableStatus(order.tableId, 'OCCUPIED')
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      updateOrder: async (id, order) => {
        set({ isLoading: true, error: null })
        try {
          await firebaseService.updateOrder(id, order)
          const updatedOrder = await firebaseService.getOrder(id)
          set(state => ({
            orders: state.orders.map(o => o.id === id ? updatedOrder! : o),
            isLoading: false
          }))
            
          // Si el pedido se cancela o entrega, liberar la mesa
          if (order.status === 'CANCELLED' || order.status === 'DELIVERED') {
            get().updateTableStatus(updatedOrder!.tableId, 'AVAILABLE')
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      deleteOrder: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const order = get().orders.find(o => o.id === id)
          await firebaseService.deleteOrder(id)
          set(state => ({
            orders: state.orders.filter(o => o.id !== id),
            isLoading: false
          }))
            
          // Liberar la mesa
          if (order) {
            get().updateTableStatus(order.tableId, 'AVAILABLE')
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      updateOrderItemStatus: async (orderId, itemId, status) => {
        set({ isLoading: true, error: null })
        try {
          // Esta funcionalidad necesitaría una implementación específica en Firebase
          // Por ahora, actualizamos el pedido completo
          const order = get().orders.find(o => o.id === orderId)
          if (order) {
            // Nota: Esta es una implementación simplificada
            // En una implementación real, necesitarías actualizar items específicos
            await firebaseService.updateOrder(orderId, order)
          }
          set({ isLoading: false })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      // Acciones - Mesas
      fetchTables: async () => {
        set({ isLoading: true, error: null })
        try {
          const tables = await firebaseService.getTables()
          set({ tables, isLoading: false })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      addTable: async (table) => {
        set({ isLoading: true, error: null })
        try {
          const id = await firebaseService.createTable(table)
          const newTable = await firebaseService.getTable(id)
          set(state => ({ 
            tables: [...state.tables, newTable!], 
            isLoading: false 
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      updateTable: async (tableId, table) => {
        set({ isLoading: true, error: null })
        try {
          await firebaseService.updateTable(tableId, table)
          const updatedTable = await firebaseService.getTable(tableId)
          set(state => ({
            tables: state.tables.map(t => t.id === tableId ? updatedTable! : t),
            isLoading: false
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      deleteTable: async (tableId) => {
        set({ isLoading: true, error: null })
        try {
          await firebaseService.deleteTable(tableId)
          set(state => ({
            tables: state.tables.filter(t => t.id !== tableId),
            isLoading: false
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      updateTableStatus: async (tableId, status) => {
        set({ isLoading: true, error: null })
        try {
          await firebaseService.updateTable(tableId, { status })
          set(state => ({
            tables: state.tables.map(t => t.id === tableId ? { ...t, status } : t),
            isLoading: false
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      // Acciones - Inventario
      fetchInventoryMovements: async () => {
        set({ isLoading: true, error: null })
        try {
          const movements = await firebaseService.getInventoryMovements()
          set({ inventoryMovements: movements, isLoading: false })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      addInventoryMovement: async (movement) => {
        set({ isLoading: true, error: null })
        try {
          const id = await firebaseService.createInventoryMovement(movement)
          const newMovement = { id, ...movement, createdAt: new Date() }
          set(state => ({ 
            inventoryMovements: [newMovement, ...state.inventoryMovements], 
            isLoading: false 
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false })
        }
      },

      // Acciones de UI
      setSelectedTable: (tableId) => set({ selectedTable: tableId }),
      setActiveOrder: (order) => set({ activeOrder: order }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null })
    }),
    {
      name: 'restaurant-store'
    }
  )
)