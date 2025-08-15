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

// Datos adicionales para pedidos históricos
const historicalOrders = [
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
    specialInstructions: "Sin cebolla en las hamburguesas",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Hace 7 días
  },
  {
    tableId: "Mesa 2 - Centro",
    status: "DELIVERED",
    items: [
      { productId: "Pizza Margarita", quantity: 1, price: 15.00 },
      { productId: "Vino Tinto", quantity: 1, price: 25.00 }
    ],
    totalAmount: 40.00,
    customerName: "María García",
    specialInstructions: "Pizza bien cocida",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // Hace 6 días
  },
  {
    tableId: "Mesa 3 - Terraza",
    status: "DELIVERED",
    items: [
      { productId: "Ensalada César", quantity: 2, price: 10.00 },
      { productId: "Agua Mineral", quantity: 2, price: 2.00 }
    ],
    totalAmount: 24.00,
    customerName: "Carlos López",
    specialInstructions: "Aderezo aparte",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // Hace 5 días
  },
  {
    tableId: "Mesa 4 - Barra",
    status: "DELIVERED",
    items: [
      { productId: "Café Americano", quantity: 2, price: 4.00 },
      { productId: "Tiramisú", quantity: 1, price: 8.00 }
    ],
    totalAmount: 16.00,
    customerName: "Ana Martínez",
    specialInstructions: "Café con leche",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // Hace 4 días
  },
  {
    tableId: "Mesa 5 - Privada",
    status: "DELIVERED",
    items: [
      { productId: "Pollo Asado", quantity: 3, price: 18.00 },
      { productId: "Vino Tinto", quantity: 1, price: 25.00 },
      { productId: "Pan de Ajo", quantity: 4, price: 4.50 }
    ],
    totalAmount: 84.50,
    customerName: "Roberto Sánchez",
    specialInstructions: "Pollo bien cocido",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // Hace 3 días
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
    specialInstructions: "Sopa caliente",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // Hace 2 días
  },
  {
    tableId: "Mesa 7 - Pasillo",
    status: "DELIVERED",
    items: [
      { productId: "Hamburguesa Clásica", quantity: 1, price: 12.50 },
      { productId: "Papas Fritas", quantity: 1, price: 5.00 },
      { productId: "Limonada Natural", quantity: 1, price: 5.50 }
    ],
    totalAmount: 23.00,
    customerName: "Miguel Torres",
    specialInstructions: "Sin tomate en la hamburguesa",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // Hace 1 día
  },
  {
    tableId: "Mesa 8 - Jardín",
    status: "DELIVERED",
    items: [
      { productId: "Helado de Vainilla", quantity: 2, price: 6.00 },
      { productId: "Brownie de Chocolate", quantity: 1, price: 7.50 }
    ],
    totalAmount: 19.50,
    customerName: "Sofía Ramírez",
    specialInstructions: "Helado con chocolate extra",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // Hace 12 horas
  }
];

// Movimientos de inventario adicionales para reportes
const additionalInventoryMovements = [
  { productId: "Hamburguesa Clásica", type: "OUT", quantity: 5, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Pizza Margarita", type: "OUT", quantity: 3, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Ensalada César", type: "OUT", quantity: 4, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Coca-Cola", type: "OUT", quantity: 10, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Vino Tinto", type: "OUT", quantity: 2, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Pollo Asado", type: "OUT", quantity: 6, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Tiramisú", type: "OUT", quantity: 3, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Hamburguesa Clásica", type: "IN", quantity: 20, reason: "Reposición de inventario", referenceType: "PURCHASE" },
  { productId: "Pizza Margarita", type: "IN", quantity: 15, reason: "Reposición de inventario", referenceType: "PURCHASE" },
  { productId: "Coca-Cola", type: "IN", quantity: 30, reason: "Reposición de inventario", referenceType: "PURCHASE" },
  { productId: "Agua Mineral", type: "OUT", quantity: 15, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Papas Fritas", type: "OUT", quantity: 8, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Café Americano", type: "OUT", quantity: 12, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Helado de Vainilla", type: "OUT", quantity: 6, reason: "Ventas del fin de semana", referenceType: "RECIPE" },
  { productId: "Brownie de Chocolate", type: "OUT", quantity: 4, reason: "Ventas del fin de semana", referenceType: "RECIPE" }
];

// Función para crear pedidos históricos
async function createHistoricalOrders() {
  console.log('📈 Creando pedidos históricos para reportes...');
  const createdOrders = [];
  
  for (const order of historicalOrders) {
    const docRef = doc(collection(db, 'orders'));
    const newOrder = {
      ...order,
      id: docRef.id,
      createdAt: Timestamp.fromDate(order.createdAt),
      updatedAt: Timestamp.fromDate(order.createdAt)
    };
    await setDoc(docRef, newOrder);
    createdOrders.push(newOrder);
    console.log(`✅ Pedido histórico creado: ${order.customerName} - ${order.tableId}`);
  }
  
  return createdOrders;
}

// Función para crear movimientos de inventario adicionales
async function createAdditionalInventoryMovements() {
  console.log('📦 Creando movimientos de inventario adicionales...');
  const createdMovements = [];
  
  for (const movement of additionalInventoryMovements) {
    const docRef = doc(collection(db, 'inventoryMovements'));
    const newMovement = {
      ...movement,
      id: docRef.id,
      userId: 'sistema',
      createdAt: Timestamp.fromDate(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)) // Fechas aleatorias en los últimos 7 días
    };
    await setDoc(docRef, newMovement);
    createdMovements.push(newMovement);
    console.log(`✅ Movimiento adicional creado: ${movement.type} - ${movement.productId}`);
  }
  
  return createdMovements;
}

// Función para crear datos de rendimiento
async function createPerformanceData() {
  console.log('📊 Creando datos de rendimiento...');
  
  // Crear algunos pedidos adicionales con diferentes estados y fechas
  const performanceOrders = [
    {
      tableId: "Mesa 1 - Ventana",
      status: "CANCELLED",
      items: [
        { productId: "Hamburguesa Clásica", quantity: 1, price: 12.50 },
        { productId: "Coca-Cola", quantity: 1, price: 3.00 }
      ],
      totalAmount: 15.50,
      customerName: "Cliente Cancelado",
      specialInstructions: "Pedido cancelado por cliente",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // Hace 6 horas
    },
    {
      tableId: "Mesa 2 - Centro",
      status: "DELIVERED",
      items: [
        { productId: "Pizza Margarita", quantity: 2, price: 15.00 },
        { productId: "Vino Tinto", quantity: 1, price: 25.00 }
      ],
      totalAmount: 55.00,
      customerName: "Cliente VIP",
      specialInstructions: "Atención especial",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) // Hace 8 horas
    }
  ];
  
  const createdOrders = [];
  for (const order of performanceOrders) {
    const docRef = doc(collection(db, 'orders'));
    const newOrder = {
      ...order,
      id: docRef.id,
      createdAt: Timestamp.fromDate(order.createdAt),
      updatedAt: Timestamp.fromDate(order.createdAt)
    };
    await setDoc(docRef, newOrder);
    createdOrders.push(newOrder);
    console.log(`✅ Pedido de rendimiento creado: ${order.customerName}`);
  }
  
  return createdOrders;
}

// Función principal
async function main() {
  console.log('🚀 Iniciando creación de datos para reportes y analytics...\n');
  
  try {
    // Crear pedidos históricos
    const historicalOrders = await createHistoricalOrders();
    console.log(`\n📈 ${historicalOrders.length} pedidos históricos creados\n`);
    
    // Crear movimientos de inventario adicionales
    const additionalMovements = await createAdditionalInventoryMovements();
    console.log(`\n📦 ${additionalMovements.length} movimientos de inventario adicionales creados\n`);
    
    // Crear datos de rendimiento
    const performanceOrders = await createPerformanceData();
    console.log(`\n📊 ${performanceOrders.length} pedidos de rendimiento creados\n`);
    
    console.log('🎉 Datos para reportes y analytics creados exitosamente!');
    console.log('\n📊 Resumen de datos creados:');
    console.log(`   📈 Pedidos históricos: ${historicalOrders.length}`);
    console.log(`   📦 Movimientos de inventario adicionales: ${additionalMovements.length}`);
    console.log(`   📊 Pedidos de rendimiento: ${performanceOrders.length}`);
    
    console.log('\n🔥 Los reportes ahora tendrán datos completos para analizar!');
    console.log('📋 Puedes acceder a la sección de reportes en la aplicación web.');
    
  } catch (error) {
    console.error('❌ Error creando datos para reportes:', error);
    process.exit(1);
  }
}

// Ejecutar la creación de datos para reportes
main().catch(error => {
  console.error('Error en la creación de datos para reportes:', error);
  process.exit(1);
});