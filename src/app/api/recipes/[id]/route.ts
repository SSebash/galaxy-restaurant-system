import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const recipe = await firebaseService.getRecipe(params.id)
    
    if (!recipe) {
      return NextResponse.json(
        { error: 'Receta no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Error getting recipe:', error)
    return NextResponse.json(
      { error: 'Error al obtener receta' },
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
    if (!body.name || !body.instructions || !body.ingredients) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, instructions, ingredients' },
        { status: 400 }
      )
    }

    // Validar que los ingredientes tengan los campos necesarios
    for (const ingredient of body.ingredients) {
      if (!ingredient.productId || !ingredient.quantity || !ingredient.unit) {
        return NextResponse.json(
          { error: 'Los ingredientes deben tener productId, quantity y unit' },
          { status: 400 }
        )
      }
    }

    const updateData = {
      name: body.name,
      description: body.description || '',
      instructions: body.instructions,
      preparationTime: Number(body.preparationTime) || 0,
      servings: Number(body.servings) || 1,
      difficulty: body.difficulty || 'MEDIO',
      isActive: body.isActive !== false,
      ingredients: body.ingredients
    }

    await firebaseService.updateRecipe(params.id, updateData)
    const updatedRecipe = await firebaseService.getRecipe(params.id)
    
    return NextResponse.json(updatedRecipe)
  } catch (error) {
    console.error('Error updating recipe:', error)
    return NextResponse.json(
      { error: 'Error al actualizar receta' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await firebaseService.deleteRecipe(params.id)
    return NextResponse.json({ message: 'Receta eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting recipe:', error)
    return NextResponse.json(
      { error: 'Error al eliminar receta' },
      { status: 500 }
    )
  }
}