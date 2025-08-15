import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const table = await firebaseService.getTable(params.id)
    
    if (!table) {
      return NextResponse.json(
        { error: 'Mesa no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(table)
  } catch (error) {
    console.error('Error getting table:', error)
    return NextResponse.json(
      { error: 'Error al obtener mesa' },
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
    if (!body.name || !body.capacity || !body.status) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, capacity, status' },
        { status: 400 }
      )
    }

    const validStatuses = ['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE']
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Estado de mesa inválido' },
        { status: 400 }
      )
    }

    const updateData = {
      name: body.name,
      capacity: Number(body.capacity),
      location: body.location || '',
      status: body.status,
      currentOrderId: body.currentOrderId
    }

    await firebaseService.updateTable(params.id, updateData)
    const updatedTable = await firebaseService.getTable(params.id)
    
    return NextResponse.json(updatedTable)
  } catch (error) {
    console.error('Error updating table:', error)
    return NextResponse.json(
      { error: 'Error al actualizar mesa' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await firebaseService.deleteTable(params.id)
    return NextResponse.json({ message: 'Mesa eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting table:', error)
    return NextResponse.json(
      { error: 'Error al eliminar mesa' },
      { status: 500 }
    )
  }
}