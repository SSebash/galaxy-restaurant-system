import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await firebaseService.deleteInventoryMovement(params.id)
    return NextResponse.json({ message: 'Movimiento de inventario eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting inventory movement:', error)
    return NextResponse.json(
      { error: 'Error al eliminar movimiento de inventario' },
      { status: 500 }
    )
  }
}