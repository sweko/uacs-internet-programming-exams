/// this is what we get from the API

export interface recipesResponse {
    id: number;
    title: string;
    cuisine: string;
    description: string;
    instructions: string;
    time: number;
    servings: number;
    ingredientsResponse: ingredientsResponse[];
}

export interface ingredientsResponse {
    name: string;
    quantity: number;
    unit: string;
}

export interface recipesTypeResponse {
    name: string;
    description: string;
}