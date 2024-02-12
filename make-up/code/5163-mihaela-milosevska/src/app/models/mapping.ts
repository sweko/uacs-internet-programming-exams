import { Recipe, Ingredients} from "./client";
import { RecipeResponse, IngredientsResponse } from "./server";

export const toRecipe = (response: RecipeResponse): Recipe => {
    return {
        id: response.id,
        title: response.title,
        cusine: response.cusine,
        description: response.description,
        ingredients: response.ingredients.map(i => toIngredients(i)),
        instructions: response.instructions,
        time: response.time,
        servings: response.servings
    }
}

export const toIngredients = (response: IngredientsResponse): Ingredients => {
    return {
        name: response.name,
        quantity: response.quantity,
        unit: response.unit
    }
}


const getDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}


export const toRecipeResponse = (recipe: Recipe): RecipeResponse => {
    return {
        id: recipe.id,
        title: recipe.title,
        cusine: recipe.cusine,
        description: recipe.description,
        ingredients: recipe.ingredients.map(i => ({ name: i.name,  quantity: i. quantity, unit: i.unit})),
        instructions: recipe.instructions,
        time: recipe.time,
        servings: recipe.servings
    }
}