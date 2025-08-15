import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await firebaseService.getOrder(params.id)
    
    if (!order) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error getting order:', error)
    return NextResponse.json(
      { error: 'Error al obtener pedido' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updateData = {
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

    await firebaseService.updateOrder(params.id, updateData)
    const updatedOrder = await firebaseService.getOrder(params.id)
    
    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Error al actualizar pedido' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await firebaseService.deleteOrder(params.id)
    return NextResponse.json({ message: 'Pedido eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'Error al eliminar pedido' },
      { status: 500 }
    )
  }
}