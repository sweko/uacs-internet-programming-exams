import { Recipie, Ingredients, Ingredient, Cuisine } from "./client";
import { RecipieResponse, IngredientsResponse, IngredientResponse, CuisineResponse } from "./server";

export const toRecipie = (response:RecipieResponse): Recipie => {
    return {
        id: response.id,
        title: response.title,
        cuisine: response.cuisine,
        description: response.description,
        instructions: response.instructions,
        time: response.time,
        servings: response.servings,
        ingredients: response.ingredients
    }
}

export const toIngredients = (response: IngredientsResponse): Ingredients => {
    return {
        name: response.name,
        quantity: response.quantity,
        unit: response.unit,
    }
}

export const toIngredient = (response: IngredientResponse): Ingredient => {
    return {
        name: response.name,
        description: response.description,
    }
}    

export const toCusine = (response: CuisineResponse): Cuisine => {
    return {
        name: response.name,
        description: response.description,
    }
}  

export const toRecipieResponse = (recipie: Recipie): RecipieResponse => {
    return {
        id: recipie.id,
        title: recipie.title,
        cuisine: recipie.cuisine,
        description: recipie.description,
        ingredients: recipie.ingredients.map(ingredient => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit
        })),
        instructions: recipie.instructions,
        time: recipie.time, 
        servings: recipie.servings, 
    }
}