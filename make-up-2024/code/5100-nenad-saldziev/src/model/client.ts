// this is what we work with in the app

export interface recipes {
    id: number;
    title: string;
    cuisine: string;
    description: string;
    instructions: string;
    time: number;
    servings: number;
    ingredients: ingredients[];
}

export interface ingredients {
    name: string;
    quantity: number;
    unit: string;
}

export interface recipesType {
    name: string;
    description: string;
}

