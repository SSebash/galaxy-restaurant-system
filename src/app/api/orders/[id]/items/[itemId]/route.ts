import { NextRequest, NextResponse } from 'next/server'

// Datos de ejemplo para pedidos
let orders: any[] = [
  {
    id: '1',
    tableId: '2',
    tableName: 'Mesa 2',
    status: 'CONFIRMED',
    items: [
      { id: '1', name: 'Burger Clásica', quantity: 2, price: 15.00, status: 'PREPARING', recipeId: '1' },
      { id: '2', name: 'Papas Fritas', quantity: 1, price: 4.50, status: 'PENDING', recipeId: '3' }
    ],
    total: 37.26,
    subtotal: 32.50,
    tax: 5.20,
    discount: 0,
    createdAt: '2024-01-15 12:30',
    updatedAt: '2024-01-15 12:30',
    waiter: 'Juan',
    notes: 'Sin cebolla en la hamburguesa'
  },
  {
    id: '2',
    tableId: '5',
    tableName: 'Mesa 5',
    status: 'CONFIRMED',
    items: [
      { id: '3', name: 'Ensalada César', quantity: 1, price: 9.50, status: 'PENDING', recipeId: '2' },
      { id: '4', name: 'Burger Clásica', quantity: 1, price: 15.00, status: 'PREPARING', recipeId: '1' }
    ],
    total: 25.38,
    subtotal: 21.90,
    tax: 3.50,
    discount: 0,
    createdAt: '2024-01-15 13:15',
    updatedAt: '2024-01-15 13:15',
    waiter: 'María'
  }
]

interface RouteParams {
  params: {
    id: string
    itemId: string
  }
}

// PATCH /api/orders/[id]/items/[itemId] - Actualizar estado de un item específico
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const orderIndex = orders.findIndex(o => o.id === params.id)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 }
      )
    }

    const order = orders[orderIndex]
    const itemIndex = order.items.findIndex(item => item.id === params.itemId)
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item no encontrado en el pedido' },
        { status: 404 }
      )
    }

    // Validar estado
    if (body.status) {
      const validStatuses = ['PENDING', 'PREPARING', 'READY', 'DELIVERED']
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: 'Estado de item inválido' },
          { status: 400 }
        )
      }
    }

    // Actualizar el item
    const updatedItems = [...order.items]
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      ...body
    }

    // Actualizar el pedido completo
    const updatedOrder = {
      ...order,
      items: updatedItems,
      updatedAt: new Date().toISOString()
    }

    orders[orderIndex] = updatedOrder
    
    return NextResponse.json(updatedOrder)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar item del pedido' },
      { status: 500 }
    )
  }
}