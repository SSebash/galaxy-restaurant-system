import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

// GET /api/orders - Obtener todos los pedidos
export async function GET() {
  try {
    const orders = await firebaseService.getOrders()
    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error getting orders:', error)
    return NextResponse.json(
      { error: 'Error al obtener pedidos' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Crear un nuevo pedido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validación básica
    if (!body.tableId || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: tableId y items' },
        { status: 400 }
      )
    }

    // Validar items
    for (const item of body.items) {
      if (!item.productId || !item.quantity || !item.price) {
        return NextResponse.json(
          { error: 'Los items deben tener productId, quantity y price' },
          { status: 400 }
        )
      }
    }

    const taxRate = 0.16 // 16% IVA
    
    // Calcular totales
    const subtotal = body.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * taxRate
    const total = subtotal + tax - (body.discount || 0)

    const newOrder = {
      tableId: body.tableId,
      status: body.status || 'PENDING',
      items: body.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        notes: item.notes || ''
      })),
      totalAmount: total,
      customerName: body.customerName || '',
      specialInstructions: body.specialInstructions || ''
    }

    const id = await firebaseService.createOrder(newOrder)
    const createdOrder = await firebaseService.getOrder(id)
    
    return NextResponse.json(createdOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Error al crear pedido' },
      { status: 500 }
    )
  }
}