export interface IIngredient {
  name: string;
  unit: string;
  quantity: number;
}

export interface IRecipe {
  id: number;
  title: string;
  cuisine: string;
  description: string;
  ingredients: IIngredient[];
  instructions: string;
  time: number;
  servings: number;
}
