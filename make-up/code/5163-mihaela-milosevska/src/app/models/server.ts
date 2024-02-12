export interface RecipeResponse {
    id: number;
    title: string;
    cusine: string;
    description: string;
    ingredients: IngredientsResponse[]; 
    instructions: string;
    time: number;
    servings: number;
}

export interface IngredientsResponse {
    name: string;
    quantity: number;
    unit: string;
}

