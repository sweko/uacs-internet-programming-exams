export interface iIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface IRecipe {
  id: number;
  title: string;
  cuisine: string;
  description: string;
  ingredients: iIngredient[];
  instructions: string;
  time: number;
  servings: number;
}
