import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp } from 'firebase/firestore'

// Configuración de Firebase - Configuración actualizada
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA6i5exwtalitbeiik6oWg5Li5HKnXR3nQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "galaxy-restaurant-system.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "galaxy-restaurant-system",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "galaxy-restaurant-system.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "387514687170",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:387514687170:web:2e7b6b26a9d34dc067655b"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Interfaces para los datos
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
  createdAt: Timestamp
  updatedAt: Timestamp
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
  createdAt: Timestamp
  updatedAt: Timestamp
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
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Table {
  id?: string
  name: string
  capacity: number
  location: string
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE'
  currentOrderId?: string
  createdAt: Timestamp
  updatedAt: Timestamp
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
  createdAt: Timestamp
}

// Funciones de utilidad para Firestore
export const firebaseService = {
  // Productos
  async getProducts(): Promise<Product[]> {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product))
  },

  async getProduct(id: string): Promise<Product | null> {
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Product : null
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(db, 'products'))
    const newProduct: Product = {
      ...product,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    await setDoc(docRef, newProduct)
    return docRef.id
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const docRef = doc(db, 'products', id)
    await updateDoc(docRef, {
      ...product,
      updatedAt: Timestamp.now()
    })
  },

  async deleteProduct(id: string): Promise<void> {
    await deleteDoc(doc(db, 'products', id))
  },

  // Recetas
  async getRecipes(): Promise<Recipe[]> {
    const q = query(collection(db, 'recipes'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Recipe))
  },

  async getRecipe(id: string): Promise<Recipe | null> {
    const docRef = doc(db, 'recipes', id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Recipe : null
  },

  async createRecipe(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(db, 'recipes'))
    const newRecipe: Recipe = {
      ...recipe,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    await setDoc(docRef, newRecipe)
    return docRef.id
  },

  async updateRecipe(id: string, recipe: Partial<Recipe>): Promise<void> {
    const docRef = doc(db, 'recipes', id)
    await updateDoc(docRef, {
      ...recipe,
      updatedAt: Timestamp.now()
    })
  },

  async deleteRecipe(id: string): Promise<void> {
    await deleteDoc(doc(db, 'recipes', id))
  },

  // Pedidos
  async getOrders(): Promise<Order[]> {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Order))
  },

  async getOrder(id: string): Promise<Order | null> {
    const docRef = doc(db, 'orders', id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Order : null
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(db, 'orders'))
    const newOrder: Order = {
      ...order,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    await setDoc(docRef, newOrder)
    return docRef.id
  },

  async updateOrder(id: string, order: Partial<Order>): Promise<void> {
    const docRef = doc(db, 'orders', id)
    await updateDoc(docRef, {
      ...order,
      updatedAt: Timestamp.now()
    })
  },

  async deleteOrder(id: string): Promise<void> {
    await deleteDoc(doc(db, 'orders', id))
  },

  // Mesas
  async getTables(): Promise<Table[]> {
    const q = query(collection(db, 'tables'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Table))
  },

  async getTable(id: string): Promise<Table | null> {
    const docRef = doc(db, 'tables', id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Table : null
  },

  async createTable(table: Omit<Table, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = doc(collection(db, 'tables'))
    const newTable: Table = {
      ...table,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    await setDoc(docRef, newTable)
    return docRef.id
  },

  async updateTable(id: string, table: Partial<Table>): Promise<void> {
    const docRef = doc(db, 'tables', id)
    await updateDoc(docRef, {
      ...table,
      updatedAt: Timestamp.now()
    })
  },

  async deleteTable(id: string): Promise<void> {
    await deleteDoc(doc(db, 'tables', id))
  },

  // Movimientos de Inventario
  async getInventoryMovements(): Promise<InventoryMovement[]> {
    const q = query(collection(db, 'inventoryMovements'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as InventoryMovement))
  },

  async createInventoryMovement(movement: Omit<InventoryMovement, 'id' | 'createdAt'>): Promise<string> {
    const docRef = doc(collection(db, 'inventoryMovements'))
    const newMovement: InventoryMovement = {
      ...movement,
      id: docRef.id,
      createdAt: Timestamp.now()
    }
    await setDoc(docRef, newMovement)
    return docRef.id
  },

  async deleteInventoryMovement(id: string): Promise<void> {
    await deleteDoc(doc(db, 'inventoryMovements', id))
  }
}

export { db, app }