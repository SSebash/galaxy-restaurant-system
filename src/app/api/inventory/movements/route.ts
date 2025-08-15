import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

// GET /api/inventory/movements - Obtener todos los movimientos
export async function GET() {
  try {
    const movements = await firebaseService.getInventoryMovements()
    return NextResponse.json(movements)
  } catch (error) {
    console.error('Error getting inventory movements:', error)
    return NextResponse.json(
      { error: 'Error al obtener movimientos de inventario' },
      { status: 500 }
    )
  }
}

// POST /api/inventory/movements - Crear un nuevo movimiento
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validación básica
    if (!body.productId || !body.type || !body.quantity || !body.reason || !body.userId) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: productId, type, quantity, reason, userId' },
        { status: 400 }
      )
    }

    // Validar tipo de movimiento
    if (body.type !== 'IN' && body.type !== 'OUT') {
      return NextResponse.json(
        { error: 'El tipo de movimiento debe ser IN o OUT' },
        { status: 400 }
      )
    }

    // Validar cantidad positiva
    if (body.quantity <= 0) {
      return NextResponse.json(
        { error: 'La cantidad debe ser mayor que 0' },
        { status: 400 }
      )
    }

    // Validar tipo de referencia si se proporciona
    const validReferenceTypes = ['PURCHASE', 'RECIPE', 'WASTE', 'ADJUSTMENT']
    if (body.referenceType && !validReferenceTypes.includes(body.referenceType)) {
      return NextResponse.json(
        { error: 'Tipo de referencia inválido' },
        { status: 400 }
      )
    }

    const newMovement = {
      productId: body.productId,
      type: body.type,
      quantity: Number(body.quantity),
      reason: body.reason,
      referenceType: body.referenceType,
      referenceId: body.referenceId,
      notes: body.notes || '',
      userId: body.userId
    }

    const id = await firebaseService.createInventoryMovement(newMovement)
    
    return NextResponse.json({ id, message: 'Movimiento de inventario creado correctamente' }, { status: 201 })
  } catch (error) {
    console.error('Error creating inventory movement:', error)
    return NextResponse.json(
      { error: 'Error al crear movimiento de inventario' },
      { status: 500 }
    )
  }
}