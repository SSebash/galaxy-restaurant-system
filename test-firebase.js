const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp } = require('firebase/firestore');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "galaxy-restaurant-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "galaxy-restaurant-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "galaxy-restaurant-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funciones de prueba
async function testFirebaseConnection() {
  try {
    console.log('🔥 Probando conexión a Firebase...');
    
    // Intentar obtener productos
    const productsRef = collection(db, 'products');
    const productsQuery = query(productsRef, orderBy('createdAt', 'desc'), limit(5));
    const productsSnapshot = await getDocs(productsQuery);
    
    console.log(`✅ Conexión exitosa. Encontrados ${productsSnapshot.size} productos`);
    
    // Mostrar algunos productos
    if (productsSnapshot.size > 0) {
      console.log('\n📦 Productos encontrados:');
      productsSnapshot.forEach(doc => {
        const product = doc.data();
        console.log(`  - ${product.name}: ${product.stock} ${product.unit} (${product.category})`);
      });
    }
    
    // Intentar obtener mesas
    const tablesRef = collection(db, 'tables');
    const tablesQuery = query(tablesRef, orderBy('createdAt', 'desc'), limit(5));
    const tablesSnapshot = await getDocs(tablesQuery);
    
    console.log(`\n🪑 Encontradas ${tablesSnapshot.size} mesas`);
    
    // Mostrar algunas mesas
    if (tablesSnapshot.size > 0) {
      console.log('\n📋 Mesas encontradas:');
      tablesSnapshot.forEach(doc => {
        const table = doc.data();
        console.log(`  - ${table.name}: Capacidad ${table.capacity}, Ubicación ${table.location} (${table.status})`);
      });
    }
    
    // Intentar obtener pedidos
    const ordersRef = collection(db, 'orders');
    const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'), limit(5));
    const ordersSnapshot = await getDocs(ordersRef);
    
    console.log(`\n🛒 Encontrados ${ordersSnapshot.size} pedidos`);
    
    // Mostrar algunos pedidos
    if (ordersSnapshot.size > 0) {
      console.log('\n📋 Pedidos encontrados:');
      ordersSnapshot.forEach(doc => {
        const order = doc.data();
        console.log(`  - Pedido ${order.id}: Mesa ${order.tableId}, Estado ${order.status}, Total $${order.totalAmount}`);
      });
    }
    
    // Intentar obtener recetas
    const recipesRef = collection(db, 'recipes');
    const recipesQuery = query(recipesRef, orderBy('createdAt', 'desc'), limit(5));
    const recipesSnapshot = await getDocs(recipesQuery);
    
    console.log(`\n👨‍🍳 Encontradas ${recipesSnapshot.size} recetas`);
    
    // Mostrar algunas recetas
    if (recipesSnapshot.size > 0) {
      console.log('\n📋 Recetas encontradas:');
      recipesSnapshot.forEach(doc => {
        const recipe = doc.data();
        console.log(`  - ${recipe.name}: Dificultad ${recipe.difficulty}, Tiempo ${recipe.preparationTime}min (${recipe.status})`);
      });
    }
    
    // Intentar obtener movimientos de inventario
    const movementsRef = collection(db, 'inventoryMovements');
    const movementsQuery = query(movementsRef, orderBy('createdAt', 'desc'), limit(5));
    const movementsSnapshot = await getDocs(movementsQuery);
    
    console.log(`\n📦 Encontrados ${movementsSnapshot.size} movimientos de inventario`);
    
    // Mostrar algunos movimientos
    if (movementsSnapshot.size > 0) {
      console.log('\n📋 Movimientos encontrados:');
      movementsSnapshot.forEach(doc => {
        const movement = doc.data();
        console.log(`  - ${movement.type}: ${movement.quantity} ${movement.reason} (${movement.referenceType})`);
      });
    }
    
    console.log('\n✅ Todas las pruebas completadas exitosamente!');
    
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a Firebase:', error);
    return false;
  }
}

// Función para crear datos de prueba
async function createTestData() {
  try {
    console.log('🔥 Creando datos de prueba en Firebase...');
    
    // Crear un producto de prueba
    const productRef = doc(collection(db, 'products'));
    const newProduct = {
      name: 'Producto de Prueba',
      description: 'Producto creado para probar Firebase',
      price: 10.50,
      stock: 25,
      minStock: 5,
      unit: 'unidades',
      category: 'Prueba',
      isActive: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(productRef, newProduct);
    console.log(`✅ Producto creado: ${newProduct.name}`);
    
    // Crear una mesa de prueba
    const tableRef = doc(collection(db, 'tables'));
    const newTable = {
      name: 'Mesa de Prueba',
      capacity: 4,
      location: 'Zona de Prueba',
      status: 'AVAILABLE',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(tableRef, newTable);
    console.log(`✅ Mesa creada: ${newTable.name}`);
    
    // Crear una receta de prueba
    const recipeRef = doc(collection(db, 'recipes'));
    const newRecipe = {
      name: 'Receta de Prueba',
      description: 'Receta creada para probar Firebase',
      instructions: '1. Preparar ingredientes\n2. Cocinar\n3. Servir',
      preparationTime: 20,
      servings: 2,
      difficulty: 'MEDIO',
      isActive: true,
      ingredients: [
        { productId: 'Producto de Prueba', quantity: 2, unit: 'unidades' }
      ],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(recipeRef, newRecipe);
    console.log(`✅ Receta creada: ${newRecipe.name}`);
    
    // Crear un pedido de prueba
    const orderRef = doc(collection(db, 'orders'));
    const newOrder = {
      tableId: 'Mesa de Prueba',
      status: 'PENDING',
      items: [
        { productId: 'Producto de Prueba', quantity: 2, price: 10.50 }
      ],
      totalAmount: 21.00,
      customerName: 'Cliente de Prueba',
      specialInstructions: 'Ninguna',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(orderRef, newOrder);
    console.log(`✅ Pedido creado: ${newOrder.customerName}`);
    
    // Crear un movimiento de inventario de prueba
    const movementRef = doc(collection(db, 'inventoryMovements'));
    const newMovement = {
      productId: 'Producto de Prueba',
      type: 'IN',
      quantity: 10,
      reason: 'Prueba de entrada',
      referenceType: 'PURCHASE',
      userId: 'usuario-prueba',
      createdAt: Timestamp.now()
    };
    
    await setDoc(movementRef, newMovement);
    console.log(`✅ Movimiento de inventario creado: ${newMovement.type}`);
    
    console.log('\n✅ Todos los datos de prueba creados exitosamente!');
    
    return true;
  } catch (error) {
    console.error('❌ Error creando datos de prueba:', error);
    return false;
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando pruebas de Firebase...\n');
  
  // Probar conexión
  const isConnected = await testFirebaseConnection();
  
  if (!isConnected) {
    console.log('\n❌ No se pudo conectar a Firebase. Verifica tu configuración.');
    return;
  }
  
  console.log('\n🔥 Conexión exitosa! Ahora crearemos datos de prueba...\n');
  
  // Crear datos de prueba
  const testDataCreated = await createTestData();
  
  if (!testDataCreated) {
    console.log('\n❌ No se pudieron crear los datos de prueba.');
    return;
  }
  
  console.log('\n🔥 Datos de prueba creados! Ahora verificaremos los datos...\n');
  
  // Volver a probar conexión para ver los nuevos datos
  await testFirebaseConnection();
  
  console.log('\n🎉 Pruebas completadas exitosamente!');
  console.log('📋 Puedes ver los datos en tu consola de Firebase o en la aplicación web.');
}

// Ejecutar pruebas
main().catch(error => {
  console.error('Error en las pruebas:', error);
  process.exit(1);
});