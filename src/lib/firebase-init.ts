import { firebaseService } from './firebase'

// Función para inicializar datos de ejemplo en Firebase
export async function initializeSampleData() {
  try {
    console.log('Inicializando datos de ejemplo en Firebase...')
    
    // Crear productos de ejemplo
    const sampleProducts = [
      {
        name: 'Tomates',
        description: 'Tomates frescos',
        price: 2.50,
        stock: 15,
        minStock: 5,
        unit: 'kg',
        category: 'Vegetales',
        isActive: true
      },
      {
        name: 'Cebollas',
        description: 'Cebollas blancas',
        price: 1.80,
        stock: 8,
        minStock: 3,
        unit: 'kg',
        category: 'Vegetales',
        isActive: true
      },
      {
        name: 'Queso',
        description: 'Queso cheddar',
        price: 8.00,
        stock: 4,
        minStock: 2,
        unit: 'kg',
        category: 'Lácteos',
        isActive: true
      },
      {
        name: 'Pan de Hamburguesa',
        description: 'Pan para hamburguesas',
        price: 0.50,
        stock: 25,
        minStock: 10,
        unit: 'unidades',
        category: 'Panadería',
        isActive: true
      },
      {
        name: 'Carne de Res',
        description: 'Carne de res premium',
        price: 12.00,
        stock: 10,
        minStock: 3,
        unit: 'kg',
        category: 'Carnes',
        isActive: true
      },
      {
        name: 'Lechuga',
        description: 'Lechuga fresca',
        price: 1.50,
        stock: 6,
        minStock: 2,
        unit: 'kg',
        category: 'Vegetales',
        isActive: true
      }
    ]

    // Crear productos
    for (const product of sampleProducts) {
      try {
        await firebaseService.createProduct(product)
        console.log(`Producto creado: ${product.name}`)
      } catch (error) {
        console.log(`Producto ya existe o error al crear: ${product.name}`, error)
      }
    }

    // Crear mesas de ejemplo
    const sampleTables = [
      { name: 'Mesa 1', capacity: 4, location: 'Zona Principal', status: 'AVAILABLE' as const },
      { name: 'Mesa 2', capacity: 4, location: 'Zona Principal', status: 'AVAILABLE' as const },
      { name: 'Mesa 3', capacity: 2, location: 'Ventana', status: 'AVAILABLE' as const },
      { name: 'Mesa 4', capacity: 6, location: 'Zona Principal', status: 'AVAILABLE' as const },
      { name: 'Mesa 5', capacity: 4, location: 'Terraza', status: 'AVAILABLE' as const },
      { name: 'Mesa 6', capacity: 8, location: 'Terraza', status: 'AVAILABLE' as const },
      { name: 'Mesa 7', capacity: 4, location: 'Ventana', status: 'AVAILABLE' as const },
      { name: 'Mesa 8', capacity: 6, location: 'Zona Principal', status: 'AVAILABLE' as const }
    ]

    // Crear mesas
    for (const table of sampleTables) {
      try {
        await firebaseService.createTable(table)
        console.log(`Mesa creada: ${table.name}`)
      } catch (error) {
        console.log(`Mesa ya existe o error al crear: ${table.name}`, error)
      }
    }

    // Crear recetas de ejemplo
    const sampleRecipes = [
      {
        name: 'Hamburguesa Clásica',
        description: 'Hamburguesa clásica con carne de res',
        instructions: '1. Cocinar la carne a la parrilla\n2. Tostar el pan\n3. Montar la hamburguesa con lechuga y tomate',
        preparationTime: 15,
        servings: 1,
        difficulty: 'MEDIO' as const,
        isActive: true,
        ingredients: [
          { productId: 'Carne de Res', quantity: 0.2, unit: 'kg' },
          { productId: 'Pan de Hamburguesa', quantity: 1, unit: 'unidades' },
          { productId: 'Lechuga', quantity: 0.1, unit: 'kg' },
          { productId: 'Tomates', quantity: 0.1, unit: 'kg' }
        ]
      },
      {
        name: 'Ensalada César',
        description: 'Ensalada César fresca',
        instructions: '1. Lavar y cortar la lechuga\n2. Añadir queso rallado\n3. Mezclar con aderezo César',
        preparationTime: 10,
        servings: 1,
        difficulty: 'FÁCIL' as const,
        isActive: true,
        ingredients: [
          { productId: 'Lechuga', quantity: 0.2, unit: 'kg' },
          { productId: 'Queso', quantity: 0.05, unit: 'kg' }
        ]
      }
    ]

    // Crear recetas
    for (const recipe of sampleRecipes) {
      try {
        await firebaseService.createRecipe(recipe)
        console.log(`Receta creada: ${recipe.name}`)
      } catch (error) {
        console.log(`Receta ya existe o error al crear: ${recipe.name}`, error)
      }
    }

    console.log('Datos de ejemplo inicializados correctamente')
  } catch (error) {
    console.error('Error al inicializar datos de ejemplo:', error)
  }
}

// Función para verificar la conexión a Firebase
export async function testFirebaseConnection() {
  try {
    console.log('Probando conexión a Firebase...')
    
    // Intentar obtener productos
    const products = await firebaseService.getProducts()
    console.log(`Conexión exitosa. Encontrados ${products.length} productos`)
    
    // Intentar obtener mesas
    const tables = await firebaseService.getTables()
    console.log(`Encontradas ${tables.length} mesas`)
    
    return true
  } catch (error) {
    console.error('Error de conexión a Firebase:', error)
    return false
  }
}