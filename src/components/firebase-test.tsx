'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRestaurantStore } from '@/store/restaurant-store'
import { testFirebaseConnection, initializeSampleData } from '@/lib/firebase-init'

export function FirebaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [error, setError] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)
  
  const { 
    products, 
    recipes, 
    orders, 
    tables, 
    inventoryMovements,
    isLoading, 
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
    setError(null)
    
    try {
      const isConnected = await testFirebaseConnection()
      setConnectionStatus(isConnected ? 'connected' : 'error')
      
      if (isConnected) {
        // Load data
        await Promise.all([
          fetchProducts(),
          fetchRecipes(),
          fetchOrders(),
          fetchTables(),
          fetchInventoryMovements()
        ])
      }
    } catch (err) {
      setConnectionStatus('error')
      setError(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  const handleInitializeData = async () => {
    setIsInitializing(true)
    setError(null)
    
    try {
      await initializeSampleData()
      // Reload data
      await Promise.all([
        fetchProducts(),
        fetchRecipes(),
        fetchOrders(),
        fetchTables(),
        fetchInventoryMovements()
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al inicializar datos')
    } finally {
      setIsInitializing(false)
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Estado de Firebase
            {getStatusBadge()}
          </CardTitle>
          <CardDescription>
            Verifica la conexión con Firebase y gestiona los datos de ejemplo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex gap-2">
            <Button onClick={testConnection} disabled={connectionStatus === 'testing'}>
              Probar Conexión
            </Button>
            <Button 
              onClick={handleInitializeData} 
              disabled={isInitializing || connectionStatus !== 'connected'}
              variant="outline"
            >
              {isInitializing ? 'Inicializando...' : 'Inicializar Datos de Ejemplo'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recetas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Mesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tables.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Movimientos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryMovements.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Firebase</CardTitle>
          <CardDescription>
            Sigue estos pasos para configurar Firebase con tus credenciales reales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Crea un proyecto en Firebase Console</li>
            <li>Habilita Firestore Database en modo de prueba</li>
            <li>Copia las credenciales de configuración</li>
            <li>Crea un archivo .env.local con tus credenciales</li>
            <li>Reinicia el servidor de desarrollo</li>
            <li>Usa este componente para probar la conexión</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm">
            <strong>Nota:</strong> Actualmente el sistema usa credenciales de demostración. 
            Para usar datos reales, configura tus propias credenciales de Firebase.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}