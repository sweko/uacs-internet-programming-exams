interface recipe {
  id: number; // the unique identifier of the recipe
  title: string; // the title of the recipe
  cuisine: string; // the cuisine of the recipe
  description: string; // the description of the recipe
  ingredients: [
    {
      name: string; // the name of the ingredient, must be a valid ingredient from the ingredients endpoint
      quantity: number; // the quantity of the ingredient, in the unit specified
      unit: string; // the unit of the ingredient (e.g. grams, cups, etc.). It can also be an empty string.
    }
  ]; // an array of objects, each object is an ingredient
  instructions: string; // a string that contains the instructions for the recipe
  time: number; // the time it takes to prepare the recipe, in minutes
  servings: number; // the number of servings the recipe makes
}
