export interface Recipe {
  id: number;
  title: string;
  cuisine: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  time: number;
  servings: number;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}