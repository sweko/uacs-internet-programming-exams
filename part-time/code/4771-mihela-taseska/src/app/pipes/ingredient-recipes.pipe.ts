import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from './../models/Ingredient';

@Pipe({
  name: 'ingredientRecipes',
})
export class IngredientRecipesPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    debugger;
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter((item) =>
      item.ingredients.filter((x: Ingredient) => {
        x.name = searchTerm;
      })
    );
  }
}
