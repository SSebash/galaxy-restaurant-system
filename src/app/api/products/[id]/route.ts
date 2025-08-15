import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await firebaseService.getProduct(params.id)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error getting product:', error)
    return NextResponse.json(
      { error: 'Error al obtener producto' },
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
    if (!body.name || !body.unit || !body.price || !body.category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, unit, price, category' },
        { status: 400 }
      )
    }

    const updateData = {
      name: body.name,
      description: body.description || '',
      price: Number(body.price),
      stock: Number(body.stock) || 0,
      minStock: Number(body.minStock) || 0,
      unit: body.unit,
      category: body.category,
      isActive: body.isActive !== false
    }

    await firebaseService.updateProduct(params.id, updateData)
    const updatedProduct = await firebaseService.getProduct(params.id)
    
    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await firebaseService.deleteProduct(params.id)
    return NextResponse.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    )
  }
}