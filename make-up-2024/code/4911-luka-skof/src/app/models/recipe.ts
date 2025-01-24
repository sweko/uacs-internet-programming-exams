export interface Recipes {
    id: number;
    title: string;
    cuisine: string;
    description: string;
    ingredients: [{
        name: string;
        quantity: number;
        unit: string;
    }];
    instructions: string;
    time: number;
    servings: number;
}