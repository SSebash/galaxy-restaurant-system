import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

// GET /api/tables - Obtener todas las mesas
export async function GET() {
  try {
    const tables = await firebaseService.getTables()
    return NextResponse.json(tables)
  } catch (error) {
    console.error('Error getting tables:', error)
    return NextResponse.json(
      { error: 'Error al obtener mesas' },
      { status: 500 }
    )
  }
}

// POST /api/tables - Crear una nueva mesa
export async function POST(request: NextRequest) {
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

    const newTable = {
      name: body.name,
      capacity: Number(body.capacity),
      location: body.location || '',
      status: body.status
    }

    const id = await firebaseService.createTable(newTable)
    const createdTable = await firebaseService.getTable(id)
    
    return NextResponse.json(createdTable, { status: 201 })
  } catch (error) {
    console.error('Error creating table:', error)
    return NextResponse.json(
      { error: 'Error al crear mesa' },
      { status: 500 }
    )
  }
}