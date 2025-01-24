import { recipes, ingredients, recipesType } from "./client";
import { recipesResponse, ingredientsResponse, recipesTypeResponse } from "./server";

export const toRecipes = (response: recipesResponse): recipes => {
    return {
        id: response.id,
        title: response.title,
        cuisine: response.cuisine,
        description: response.description,
        instructions: response.instructions,
        time: response.time,
        servings: response.servings,
        ingredients: response.ingredientsResponse.map(b => toIngredient(b))
    }
}

export const toIngredient = (response: ingredientsResponse): ingredients => {
    return {
        name: response.name,
        quantity: response.quantity,
        unit: response.unit
    }
}

export const toRecipesType = (response: recipesTypeResponse): recipesType => {
    return {
        name: response.name,
        description: response.description
    }
}

export const toRecipesResponse = (recipes: recipes): recipesResponse => {
    return {
        id: recipes.id,
        title: recipes.title,
        cuisine: recipes.cuisine,
        description: recipes.description,
        instructions: recipes.instructions,
        time: recipes.time,
        servings: recipes.servings,
        ingredientsResponse: recipes.ingredients.map((b: ingredients) => toIngredientsResponse(b))
    }
}

export const toIngredientsResponse = (recipes: ingredients): ingredientsResponse => {
    return {
        name: recipes.name,
        quantity: recipes.quantity,
        unit: recipes.unit
    }
}

// --This is code--

// export interface recipes {
//     id: number;
//     title: string;
//     cuisine: string;
//     description: string;
//     instructions: string;
//     time: number;
//     servings: number;
//     IngredientsResponse: ingredients[];
// }

// export interface ingredients {
//     name: string;
//     quantity: number;
//     unit: string;
// }

// export interface recipesType {
//     name: string;
//     description: string;
// }

// --This is the end of code--




// -- Not important --

// const getDateString = (date: Date): string => {
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();

//     return `${year}-${month}-${day}`;
// }