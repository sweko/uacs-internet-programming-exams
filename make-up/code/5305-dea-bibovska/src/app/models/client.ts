export interface Recipie {
    id: number;
    title: string;
    cuisine: string;
    description: string;
    instructions: string;
    time: number;
    servings: number;
    ingredients: Ingredients[];
}

export interface Ingredients {
    name?: string;
    quantity?: number;
    unit?: string;
}

export interface Ingredient {
    name: string;
    description?: string; 
}

export interface Cuisine {
    name: string;
    description?: string;
}