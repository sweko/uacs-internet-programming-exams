export interface Recipe {
    id: number;
    title: string;
    cusine: string;
    description: string;
    ingredients: Ingredients[]; 
    instructions: string;
    time: number;
    servings: number;
}

export interface Ingredients {
    name: string;
    quantity: number;
    unit: string;
}

