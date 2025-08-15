import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

// GET /api/products - Obtener todos los productos
export async function GET() {
  try {
    const products = await firebaseService.getProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error getting products:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}

// POST /api/products - Crear un nuevo producto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validación básica
    if (!body.name || !body.unit || !body.price || !body.category) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, unit, price, category' },
        { status: 400 }
      )
    }

    const newProduct = {
      name: body.name,
      description: body.description || '',
      price: Number(body.price),
      stock: Number(body.stock) || 0,
      minStock: Number(body.minStock) || 0,
      unit: body.unit,
      category: body.category,
      isActive: body.isActive !== false
    }

    const id = await firebaseService.createProduct(newProduct)
    const createdProduct = await firebaseService.getProduct(id)
    
    return NextResponse.json(createdProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    )
  }
}