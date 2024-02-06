export interface RecipieResponse {
    id: number;
    title: string;
    cuisine: string;
    description: string;
    instructions: string;
    time: number;
    servings: number;
    ingredients: IngredientsResponse[];
}

export interface IngredientsResponse {
    name?: string;
    quantity?: number;
    unit?: string;
}

export interface IngredientResponse {
    name: string;
    description?: string; 
}

export interface CuisineResponse {
    name: string;
    description?: string;
}