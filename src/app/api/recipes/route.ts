import { NextRequest, NextResponse } from 'next/server'
import { firebaseService } from '@/lib/firebase'

// GET /api/recipes - Obtener todas las recetas
export async function GET() {
  try {
    const recipes = await firebaseService.getRecipes()
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error getting recipes:', error)
    return NextResponse.json(
      { error: 'Error al obtener recetas' },
      { status: 500 }
    )
  }
}

// POST /api/recipes - Crear una nueva receta
export async function POST(request: NextRequest) {
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

    const newRecipe = {
      name: body.name,
      description: body.description || '',
      instructions: body.instructions,
      preparationTime: Number(body.preparationTime) || 0,
      servings: Number(body.servings) || 1,
      difficulty: body.difficulty || 'MEDIO',
      isActive: body.isActive !== false,
      ingredients: body.ingredients
    }

    const id = await firebaseService.createRecipe(newRecipe)
    const createdRecipe = await firebaseService.getRecipe(id)
    
    return NextResponse.json(createdRecipe, { status: 201 })
  } catch (error) {
    console.error('Error creating recipe:', error)
    return NextResponse.json(
      { error: 'Error al crear receta' },
      { status: 500 }
    )
  }
}