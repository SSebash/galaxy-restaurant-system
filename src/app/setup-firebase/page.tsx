'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Database, Activity, Settings, Play } from 'lucide-react'
import { useRestaurantStore } from '@/store/restaurant-store'
import { FirebaseSetupWizard } from '@/components/firebase-setup-wizard'

export default function SetupFirebasePage() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [lastTest, setLastTest] = useState<string>('')
  const [testResults, setTestResults] = useState<any>({})
  const [isInitializing, setIsInitializing] = useState(false)
  
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
    fetchInventoryMovements
  } = useRestaurantStore()

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setConnectionStatus('testing')
    setLastTest(new Date().toLocaleString())
    
    try {
      // Simular prueba de conexión
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Cargar datos reales del store
      await Promise.all([
        fetchProducts(),
        fetchRecipes(),
        fetchOrders(),
        fetchTables(),
        fetchInventoryMovements()
      ])
      
      setConnectionStatus('connected')
      
      // Establecer resultados de prueba
      setTestResults({
        products: { count: products.length, status: 'success' },
        recipes: { count: recipes.length, status: 'success' },
        orders: { count: orders.length, status: 'success' },
        tables: { count: tables.length, status: 'success' },
        inventoryMovements: { count: inventoryMovements.length, status: 'success' },
        timestamp: new Date().toISOString()
      })
      
    } catch (err) {
      setConnectionStatus('error')
      console.error('Error en prueba de conexión:', err)
    }
  }

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'testing':
        return <Badge variant="secondary">Probando conexión...</Badge>
      case 'connected':
        return <Badge variant="default" className="bg-green-500">Conectado</Badge>
      case 'error':
        return <Badge variant="destructive">Error de conexión</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Configuración de Firebase</h1>
        <p className="text-slate-400">Configura tu conexión a Firebase con tus credenciales reales</p>
        {error && (
          <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded">
            <p className="text-red-400 text-sm">Error: {error}</p>
          </div>
        )}
      </header>

      <div className="space-y-6">
        <FirebaseSetupWizard />
      </div>
    </div>
  )
}