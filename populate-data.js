const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp } = require('firebase/firestore');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA6i5exwtalitbeiik6oWg5Li5HKnXR3nQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "galaxy-restaurant-system.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "galaxy-restaurant-system",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "galaxy-restaurant-system.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "387514687170",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:387514687170:web:2e7b6b26a9d34dc067655b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Productos a crear
const products = [
  { name: "Hamburguesa Clásica", description: "Hamburguesa de carne con lechuga y tomate", price: 12.50, stock: 50, minStock: 10, unit: "unidades", category: "Platos Principales", isActive: true },
  { name: "Pizza Margarita", description: "Pizza con mozzarella y tomate", price: 15.00, stock: 30, minStock: 5, unit: "unidades", category: "Platos Principales", isActive: true },
  { name: "Ensalada César", description: "Ensalada con pollo y aderezo César", price: 10.00, stock: 25, minStock: 5, unit: "unidades", category: "Entradas", isActive: true },
  { name: "Papas Fritas", description: "Papas fritas crujientes", price: 5.00, stock: 100, minStock: 20, unit: "unidades", category: "Acompañamientos", isActive: true },
  { name: "Coca-Cola", description: "Refresco de cola", price: 3.00, stock: 80, minStock: 15, unit: "unidades", category: "Bebidas", isActive: true },
  { name: "Agua Mineral", description: "Agua embotellada", price: 2.00, stock: 120, minStock: 20, unit: "unidades", category: "Bebidas", isActive: true },
  { name: "Tiramisú", description: "Postre italiano con café", price: 8.00, stock: 20, minStock: 5, unit: "unidades", category: "Postres", isActive: true },
  { name: "Helado de Vainilla", description: "Helado cremoso de vainilla", price: 6.00, stock: 40, minStock: 10, unit: "unidades", category: "Postres", isActive: true },
  { name: "Café Americano", description: "Café recién hecho", price: 4.00, stock: 60, minStock: 10, unit: "unidades", category: "Bebidas", isActive: true },
  { name: "Vino Tinto", description: "Vino tinto de buena calidad", price: 25.00, stock: 30, minStock: 5, unit: "botellas", category: "Bebidas", isActive: true },
  { name: "Pollo Asado", description: "Pollo asado con hierbas", price: 18.00, stock: 35, minStock: 8, unit: "unidades", category: "Platos Principales", isActive: true },
  { name: "Sopa de Tomate", description: "Sopa cremosa de tomate", price: 7.00, stock: 40, minStock: 10, unit: "unidades", category: "Entradas", isActive: true },
  { name: "Pan de Ajo", description: "Pan con mantequilla de ajo", price: 4.50, stock: 60, minStock: 15, unit: "unidades", category: "Acompañamientos", isActive: true },
  { name: "Brownie de Chocolate", description: "Brownie con nueces", price: 7.50, stock: 25, minStock: 5, unit: "unidades", category: "Postres", isActive: true },
  { name: "Limonada Natural", description: "Limonada recién hecha", price: 5.50, stock: 70, minStock: 15, unit: "unidades", category: "Bebidas", isActive: true }
];

// Recetas a crear
const recipes = [
  {
    name: "Hamburguesa Completa",
    description: "Hamburguesa con todos los ingredientes",
    instructions: "1. Cocinar la carne a la parrilla\n2. Tostar el pan\n3. Montar la hamburguesa con lechuga, tomate y queso\n4. Servir caliente",
    preparationTime: 15,
    servings: 1,
    difficulty: "MEDIO",
    isActive: true,
    ingredients: [
      { productId: "Hamburguesa Clásica", quantity: 1, unit: "unidades" },
      { productId: "Papas Fritas", quantity: 1, unit: "unidades" }
    ]
  },
  {
    name: "Pizza Familiar",
    description: "Pizza grande para compartir",
    instructions: "1. Preparar la masa\n2. Añadir salsa de tomate\n3. Colocar mozzarella\n4. Hornear por 15 minutos\n5. Servir caliente",
    preparationTime: 30,
    servings: 4,
    difficulty: "MEDIO",
    isActive: true,
    ingredients: [
      { productId: "Pizza Margarita", quantity: 2, unit: "unidades" },
      { productId: "Coca-Cola", quantity: 4, unit: "unidades" }
    ]
  },
  {
    name: "Ensalada Completa",
    description: "Ensalada con todos los ingredientes frescos",
    instructions: "1. Lavar y cortar los vegetales\n2. Añadir el pollo cocido\n3. Preparar el aderezo César\n4. Mezclar todo y servir",
    preparationTime: 20,
    servings: 2,
    difficulty: "FÁCIL",
    isActive: true,
    ingredients: [
      { productId: "Ensalada César", quantity: 1, unit: "unidades" },
      { productId: "Pan de Ajo", quantity: 2, unit: "unidades" }
    ]
  },
  {
    name: "Pollo con Papas",
    description: "Pollo asado acompañado de papas fritas",
    instructions: "1. Sazonar el pollo con hierbas\n2. Asar el pollo por 25 minutos\n3. Preparar las papas fritas\n4. Servir juntos",
    preparationTime: 35,
    servings: 2,
    difficulty: "MEDIO",
    isActive: true,
    ingredients: [
      { productId: "Pollo Asado", quantity: 1, unit: "unidades" },
      { productId: "Papas Fritas", quantity: 2, unit: "unidades" }
    ]
  },
  {
    name: "Sopa con Pan",
    description: "Sopa de tomate con pan de ajo",
    instructions: "1. Preparar la sopa de tomate\n2. Tostar el pan de ajo\n3. Servir juntos",
    preparationTime: 15,
    servings: 2,
    difficulty: "FÁCIL",
    isActive: true,
    ingredients: [
      { productId: "Sopa de Tomate", quantity: 1, unit: "unidades" },
      { productId: "Pan de Ajo", quantity: 3, unit: "unidades" }
    ]
  },
  {
    name: "Menú Infantil",
    description: "Hamburguesa con papas y refresco",
    instructions: "1. Preparar la hamburguesa\n2. Acompañar con papas fritas\n3. Servir con Coca-Cola",
    preparationTime: 20,
    servings: 1,
    difficulty: "FÁCIL",
    isActive: true,
    ingredients: [
      { productId: "Hamburguesa Clásica", quantity: 1, unit: "unidades" },
      { productId: "Papas Fritas", quantity: 1, unit: "unidades" },
      { productId: "Coca-Cola", quantity: 1, unit: "unidades" }
    ]
  },
  {
    name: "Cena Romántica",
    description: "Pollo asado con vino tinto",
    instructions: "1. Preparar el pollo asado\n2. Decantar el vino\n3. Servir juntos",
    preparationTime: 40,
    servings: 2,
    difficulty: "DIFÍCIL",
    isActive: true,
    ingredients: [
      { productId: "Pollo Asado", quantity: 2, unit: "unidades" },
      { productId: "Vino Tinto", quantity: 1, unit: "botellas" }
    ]
  },
  {
    name: "Almuerzo Ligero",
    description: "Ensalada con agua mineral",
    instructions: "1. Preparar la ensalada César\n2. Servir con agua mineral",
    preparationTime: 15,
    servings: 1,
    difficulty: "FÁCIL",
    isActive: true,
    ingredients: [
      { productId: "Ensalada César", quantity: 1, unit: "unidades" },
      { productId: "Agua Mineral", quantity: 1, unit: "unidades" }
    ]
  },
  {
    name: "Postre Completo",
    description: "Tiramisú con café",
    instructions: "1. Preparar el tiramisú\n2. Hacer el café\n3. Servir juntos",
    preparationTime: 10,
    servings: 2,
    difficulty: "FÁCIL",
    isActive: true,
    ingredients: [
      { productId: "Tiramisú", quantity: 2, unit: "unidades" },
      { productId: "Café Americano", quantity: 2, unit: "unidades" }
    ]
  },
  {
    name: "Merienda Refrescante",
    description: "Helado con limonada",
    instructions: "1. Servir el helado\n2. Preparar la limonada\n3. Servir juntos",
    preparationTime: 5,
    servings: 1,
    difficulty: "FÁCIL",
    isActive: true,
    ingredients: [
      { productId: "Helado de Vainilla", quantity: 1, unit: "unidades" },
      { productId: "Limonada Natural", quantity: 1, unit: "unidades" }
    ]
  }
];

// Mesas a crear
const tables = [
  { name: "Mesa 1 - Ventana", capacity: 4, location: "Zona Ventana", status: "AVAILABLE" },
  { name: "Mesa 2 - Centro", capacity: 6, location: "Zona Centro", status: "AVAILABLE" },
  { name: "Mesa 3 - Terraza", capacity: 4, location: "Terraza", status: "AVAILABLE" },
  { name: "Mesa 4 - Barra", capacity: 2, location: "Zona Barra", status: "AVAILABLE" },
  { name: "Mesa 5 - Privada", capacity: 8, location: "Zona Privada", status: "AVAILABLE" },
  { name: "Mesa 6 - Esquina", capacity: 4, location: "Zona Esquina", status: "AVAILABLE" },
  { name: "Mesa 7 - Pasillo", capacity: 3, location: "Zona Pasillo", status: "AVAILABLE" },
  { name: "Mesa 8 - Jardín", capacity: 5, location: "Zona Jardín", status: "AVAILABLE" }
];

// Pedidos a crear
const orders = [
  {
    tableId: "Mesa 1 - Ventana",
    status: "DELIVERED",
    items: [
      { productId: "Hamburguesa Clásica", quantity: 2, price: 12.50 },
      { productId: "Papas Fritas", quantity: 2, price: 5.00 },
      { productId: "Coca-Cola", quantity: 2, price: 3.00 }
    ],
    totalAmount: 37.00,
    customerName: "Juan Pérez",
    specialInstructions: "Sin cebolla en las hamburguesas"
  },
  {
    tableId: "Mesa 2 - Centro",
    status: "PREPARING",
    items: [
      { productId: "Pizza Margarita", quantity: 1, price: 15.00 },
      { productId: "Vino Tinto", quantity: 1, price: 25.00 }
    ],
    totalAmount: 40.00,
    customerName: "María García",
    specialInstructions: "Pizza bien cocida"
  },
  {
    tableId: "Mesa 3 - Terraza",
    status: "CONFIRMED",
    items: [
      { productId: "Ensalada César", quantity: 2, price: 10.00 },
      { productId: "Agua Mineral", quantity: 2, price: 2.00 }
    ],
    totalAmount: 24.00,
    customerName: "Carlos López",
    specialInstructions: "Aderezo aparte"
  },
  {
    tableId: "Mesa 4 - Barra",
    status: "READY",
    items: [
      { productId: "Café Americano", quantity: 2, price: 4.00 },
      { productId: "Tiramisú", quantity: 1, price: 8.00 }
    ],
    totalAmount: 16.00,
    customerName: "Ana Martínez",
    specialInstructions: "Café con leche"
  },
  {
    tableId: "Mesa 5 - Privada",
    status: "PENDING",
    items: [
      { productId: "Pollo Asado", quantity: 3, price: 18.00 },
      { productId: "Vino Tinto", quantity: 1, price: 25.00 },
      { productId: "Pan de Ajo", quantity: 4, price: 4.50 }
    ],
    totalAmount: 84.50,
    customerName: "Roberto Sánchez",
    specialInstructions: "Pollo bien cocido"
  },
  {
    tableId: "Mesa 6 - Esquina",
    status: "DELIVERED",
    items: [
      { productId: "Sopa de Tomate", quantity: 2, price: 7.00 },
      { productId: "Pan de Ajo", quantity: 2, price: 4.50 }
    ],
    totalAmount: 23.00,
    customerName: "Laura Díaz",
    specialInstructions: "Sopa caliente"
  },
  {
    tableId: "Mesa 7 - Pasillo",
    status: "PREPARING",
    items: [
      { productId: "Hamburguesa Clásica", quantity: 1, price: 12.50 },
      { productId: "Papas Fritas", quantity: 1, price: 5.00 },
      { productId: "Limonada Natural", quantity: 1, price: 5.50 }
    ],
    totalAmount: 23.00,
    customerName: "Miguel Torres",
    specialInstructions: "Sin tomate en la hamburguesa"
  },
  {
    tableId: "Mesa 8 - Jardín",
    status: "CONFIRMED",
    items: [
      { productId: "Helado de Vainilla", quantity: 2, price: 6.00 },
      { productId: "Brownie de Chocolate", quantity: 1, price: 7.50 }
    ],
    totalAmount: 19.50,
    customerName: "Sofía Ramírez",
    specialInstructions: "Helado con chocolate extra"
  }
];

// Movimientos de inventario a crear
const inventoryMovements = [
  { productId: "Hamburguesa Clásica", type: "IN", quantity: 50, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Pizza Margarita", type: "IN", quantity: 30, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Ensalada César", type: "IN", quantity: 25, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Papas Fritas", type: "IN", quantity: 100, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Coca-Cola", type: "IN", quantity: 80, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Agua Mineral", type: "IN", quantity: 120, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Tiramisú", type: "IN", quantity: 20, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Helado de Vainilla", type: "IN", quantity: 40, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Café Americano", type: "IN", quantity: 60, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Vino Tinto", type: "IN", quantity: 30, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Pollo Asado", type: "IN", quantity: 35, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Sopa de Tomate", type: "IN", quantity: 40, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Pan de Ajo", type: "IN", quantity: 60, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Brownie de Chocolate", type: "IN", quantity: 25, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Limonada Natural", type: "IN", quantity: 70, reason: "Compra inicial", referenceType: "PURCHASE" },
  { productId: "Hamburguesa Clásica", type: "OUT", quantity: 3, reason: "Ventas del día", referenceType: "RECIPE" },
  { productId: "Pizza Margarita", type: "OUT", quantity: 1, reason: "Ventas del día", referenceType: "RECIPE" },
  { productId: "Ensalada César", type: "OUT", quantity: 2, reason: "Ventas del día", referenceType: "RECIPE" },
  { productId: "Papas Fritas", type: "OUT", quantity: 5, reason: "Ventas del día", referenceType: "RECIPE" },
  { productId: "Coca-Cola", type: "OUT", quantity: 4, reason: "Ventas del día", referenceType: "RECIPE" }
];

// Función para crear productos
async function createProducts() {
  console.log('📦 Creando productos...');
  const createdProducts = [];
  
  for (const product of products) {
    const docRef = doc(collection(db, 'products'));
    const newProduct = {
      ...product,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    await setDoc(docRef, newProduct);
    createdProducts.push(newProduct);
    console.log(`✅ Producto creado: ${product.name}`);
  }
  
  return createdProducts;
}

// Función para crear recetas
async function createRecipes() {
  console.log('👨‍🍳 Creando recetas...');
  const createdRecipes = [];
  
  for (const recipe of recipes) {
    const docRef = doc(collection(db, 'recipes'));
    const newRecipe = {
      ...recipe,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    await setDoc(docRef, newRecipe);
    createdRecipes.push(newRecipe);
    console.log(`✅ Receta creada: ${recipe.name}`);
  }
  
  return createdRecipes;
}

// Función para crear mesas
async function createTables() {
  console.log('🪑 Creando mesas...');
  const createdTables = [];
  
  for (const table of tables) {
    const docRef = doc(collection(db, 'tables'));
    const newTable = {
      ...table,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    await setDoc(docRef, newTable);
    createdTables.push(newTable);
    console.log(`✅ Mesa creada: ${table.name}`);
  }
  
  return createdTables;
}

// Función para crear pedidos
async function createOrders() {
  console.log('🛒 Creando pedidos...');
  const createdOrders = [];
  
  for (const order of orders) {
    const docRef = doc(collection(db, 'orders'));
    const newOrder = {
      ...order,
      id: docRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    await setDoc(docRef, newOrder);
    createdOrders.push(newOrder);
    console.log(`✅ Pedido creado: ${order.customerName} - ${order.tableId}`);
  }
  
  return createdOrders;
}

// Función para crear movimientos de inventario
async function createInventoryMovements() {
  console.log('📦 Creando movimientos de inventario...');
  const createdMovements = [];
  
  for (const movement of inventoryMovements) {
    const docRef = doc(collection(db, 'inventoryMovements'));
    const newMovement = {
      ...movement,
      id: docRef.id,
      userId: 'sistema',
      createdAt: Timestamp.now()
    };
    await setDoc(docRef, newMovement);
    createdMovements.push(newMovement);
    console.log(`✅ Movimiento creado: ${movement.type} - ${movement.productId}`);
  }
  
  return createdMovements;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando población de datos para Galaxy Restaurant System...\n');
  
  try {
    // Limpiar datos existentes (opcional)
    console.log('🧹 Limpiando datos existentes...');
    const collections = ['products', 'recipes', 'tables', 'orders', 'inventoryMovements'];
    
    for (const collectionName of collections) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const batch = [];
      querySnapshot.forEach(doc => {
        batch.push(deleteDoc(doc.ref));
      });
      await Promise.all(batch);
      console.log(`🧹 Colección ${collectionName} limpiada`);
    }
    
    console.log('\n✅ Datos existentes eliminados\n');
    
    // Crear todos los datos
    const createdProducts = await createProducts();
    console.log(`\n📦 ${createdProducts.length} productos creados\n`);
    
    const createdRecipes = await createRecipes();
    console.log(`\n👨‍🍳 ${createdRecipes.length} recetas creadas\n`);
    
    const createdTables = await createTables();
    console.log(`\n🪑 ${createdTables.length} mesas creadas\n`);
    
    const createdOrders = await createOrders();
    console.log(`\n🛒 ${createdOrders.length} pedidos creados\n`);
    
    const createdMovements = await createInventoryMovements();
    console.log(`\n📦 ${createdMovements.length} movimientos de inventario creados\n`);
    
    // Actualizar estado de algunas mesas a ocupadas
    console.log('\n🔄 Actualizando estado de mesas...');
    const occupiedTables = createdTables.slice(0, 3);
    for (const table of occupiedTables) {
      const tableRef = doc(db, 'tables', table.id);
      await updateDoc(tableRef, {
        status: 'OCCUPIED',
        currentOrderId: createdOrders.find(o => o.tableId === table.name)?.id || null,
        updatedAt: Timestamp.now()
      });
      console.log(`✅ Mesa ${table.name} actualizada a OCUPIED`);
    }
    
    console.log('\n🎉 Todos los datos han sido creados exitosamente!');
    console.log('\n📊 Resumen:');
    console.log(`   📦 Productos: ${createdProducts.length}`);
    console.log(`   👨‍🍳 Recetas: ${createdRecipes.length}`);
    console.log(`   🪑 Mesas: ${createdTables.length}`);
    console.log(`   🛒 Pedidos: ${createdOrders.length}`);
    console.log(`   📦 Movimientos de inventario: ${createdMovements.length}`);
    
    console.log('\n🔥 El sistema está listo para usar con datos de prueba!');
    console.log('📋 Puedes acceder a la aplicación web para ver todos los datos.');
    
  } catch (error) {
    console.error('❌ Error creando datos:', error);
    process.exit(1);
  }
}

// Ejecutar la población de datos
main().catch(error => {
  console.error('Error en la población de datos:', error);
  process.exit(1);
});