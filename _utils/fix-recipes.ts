import { exists, readTextFile, copyDirectory } from './fs-promisify'

type Recipe = {
    id: "number", // the unique identifier of the recipe
    title: "string", // the title of the recipe
    cuisine: "string", // the cuisine of the recipe
    description: "string", // the description of the recipe
    ingredients: {
        "name": "string", // the name of the ingredient, must be a valid ingredient from the ingredients endpoint
        "quantity": "number", // the quantity of the ingredient, in the unit specified
        "unit": "string" // the unit of the ingredient (e.g. grams, cups, etc.). It can also be an empty string.
    }[], // an array of objects, each object is an ingredient
    instructions: "string", // a string that contains the instructions for the recipe
    time: "number", // the time it takes to prepare the recipe, in minutes
    servings: "number", // the number of servings the recipe makes
}

async function getRecipes() {
    const recipes = await readTextFile('./make-up/code/_template/db/recipe-data.json');
    return JSON.parse(recipes);
}

async function getIngredients(recipes: Recipe[]) {
    const ingredients = new Map<string, number>();
    for (const recipe of recipes) {
        for (const ingredient of recipe.ingredients) {
            ingredients.set(ingredient.name, (ingredients.get(ingredient.name) || 0) + 1);
        }
    }
    return Array.from(ingredients).sort((a, b) => a[0].localeCompare(b[0]));
}

async function getCuisines(recipes: Recipe[]) {
    const cuisines = new Map<string, number>();
    for (const recipe of recipes) {
        cuisines.set(recipe.cuisine, (cuisines.get(recipe.cuisine) || 0) + 1);
    }
    return Array.from(cuisines).sort((a, b) => b[1] - a[1]);
}

async function main() {
    const data: {recipes: Recipe[]} = await getRecipes();
    const ingredients = await getIngredients(data.recipes);
    console.log(ingredients.map(([ingredient, _]) => `"${ingredient}"`).join(", "));

    console.log("------");

    const cuisines = await getCuisines(data.recipes);
    console.log(cuisines.map(([cuisine, _]) => `"${cuisine}"`).join(", "));

}

main();