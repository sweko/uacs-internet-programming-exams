import { Cuisine } from './Cuisine';
import { Ingredient } from './Ingredient';

export interface Recipe {
  id: number;
  title?: string;
  cuisine?: Cuisine;
  description?: string;
  ingredients?: Ingredient[];
  instructions?: string;
  time?: number;
  servings?: number;
}
