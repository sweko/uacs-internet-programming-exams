# Specification

Build a web-application that allows the user to view and manage a list of recipes and their details.

## Data

The data is provided via an API that provides the data. The url of the API is [https://localhost:3000](https://localhost:3000).

The api exposes the following endpoints:

- `GET /recipes` - Returns a list of recipes
- `GET /recipes/:id` - Returns a single recipe by ID
- `POST /recipes` - Creates a new recipe
- `PUT /recipes/:id` - Updates an existing recipe
- `DELETE /recipes/:id` - Deletes an existing recipe

- `GET /ingredients` - Returns a list of ingredients

- `GET /cuisines` - Returns a list of cuisines

### Recipe Data

The format of the `recipe` object is as follows:

```jsonc
{
    "id": "number", // the unique identifier of the recipe
    "title": "string", // the title of the recipe
    "cuisine": "string", // the cuisine of the recipe
    "description": "string", // the description of the recipe
    "ingredients": [{
        "name": "string", // the name of the ingredient, must be a valid ingredient from the ingredients endpoint
        "quantity": "number", // the quantity of the ingredient, in the unit specified
        "unit": "string" // the unit of the ingredient (e.g. grams, cups, etc.). It can also be an empty string.
    }], // an array of objects, each object is an ingredient
    "instructions": "string", // a string that contains the instructions for the recipe
    "time": "number", // the time it takes to prepare the recipe, in minutes
    "servings": "number", // the number of servings the recipe makes
}
```

### Ingredients Data

The format of the `ingredient` object is a simple string, e.g. `"Eggs"`.

### Cuisines Data

The format of the `cuisine` object is a simple string, e.g. `"Italian"`.

### Notes

- It is not guaranteed that all recipes will have all fields populated
- The `cuisine` field of the recipe object is a string that represents the cuisine of the recipe. It is guaranteed that the cuisine will have an entry in the `cuisines` endpoint
- The `ingredients` field of the recipe object is an array of objects, each object represents an ingredient in the recipe. It is guaranteed that the `name` field of each ingredient will have an entry in the `ingredients` endpoint
- Not all possible ingredients will be used in a every recipe
- Not all cuisines will be used in a recipe

## Application structure

The application should consist of the following pages:

- Recipe list page, available at `/recipes`
- Recipe details page, available at `/recipes/:id`
- Recipe edit page, available at `/recipes/:id/edit`
- Recipe create page, available at `/recipes/create`
- Ingredients list page, available at `/ingredients`
- **_Bonus:_** Ingredients details page, available at `/ingredients/:id`
- Cuisine list page, available at `/cuisine`
- **_Bonus:_** Cuisine details page, available at `/cuisine/:id`
- About page, available at `/about`
- Statistics page, available at `/statistics`

Additionally, the application should have the following features:

- The home page should be the recipe list page
- The application should have a navigation bar that allows the user to navigate between the pages
- The application should have a footer that displays the current year, the student details (ID and name) and a link to the about page

## Recipe List Page

The recipe list page should display a list of recipes, with the following information:

### Data Format

The list of recipes should show the following information:

- ID: The ID of the recipe
- Title: The name of the recipe
- Cuisine: The cuisine of the recipe
- Description: The description of the recipe
- **_Bonus:_** Ingredients: A list of the ingredients of the recipe. Each ingredient should be on a separate line, and should be displayed as `<name> - <quantity> <unit>`, e.g. `Flour - 2 cups`
- Instructions: The instructions for the recipe
- Time: The time it takes to prepare the recipe, in the format `X hours Y minutes`
    - **_Bonus:_** If the time is less than 60 minutes, display only the minutes, e.g. `45 minutes`
    - **_Bonus:_** If the time is more than 60 minutes, display the hours and minutes, e.g. `1 hour 30 minutes` for 90 minutes
- Servings: The number of servings the recipe makes

The description and instructions fields should be truncated to 100 characters, and should have an ellipsis at the end if they are truncated.  
**_Bonus:_** Make sure that the truncation does not cut off words in the middle.  
**_Bonus:_** The description and instructions should be displayed in a tooltip when the user hovers over the text.

### Actions

Every list item should have the following actions:

- View: Navigates to the recipe details page
- Edit: Navigates to the recipe edit page
- Delete: Deletes the recipe from the list
- **_Bonus:_** Ingredients: Navigates to the ingredients details page
- **_Bonus:_** Cuisine: Navigates to the cuisine details page

The delete action should display a confirmation dialog before deleting the recipe.

### Add recipe

The page should have a button that allows the user to add a new recipe. Clicking on the button should navigate to the recipe create page.

### Sorting (**bonus**)

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order. The current sort order should be indicated by an arrow next to the column header. The arrow should point up for ascending order and down for descending order. If the column is not sorted, the arrow should not be displayed, or should be greyed out.

Note: The ingredients column should be sorted by the first ingredient in the list, then by the second ingredient, etc. 
Note: The time column should be sorted by the time in minutes.

### Filtering (**bonus**)

The list should be filterable by the following fields:

- Title: The name of the recipe (free entry text box, with partial filtering)
- Cuisine: Dropdowm list of cuisines (the list should be populated from the data in the `cuisines` endpoint)
- Ingredient: Dropdowm list of ingredients (the list should be populated from the data in the `ingredients` endpoint)

### Recipe Details Page

The recipe details page should display the details of a single recipe, with the following information:

#### Data Format

The list of recipes should show the following information:
- ID: The ID of the recipe
- Title: The name of the recipe
- Cuisine: The cuisine of the recipe
- Description: The description of the recipe
- Ingredients: A number of the ingredients of the recipe.
- **_Bonus (Alternative):_** Ingredients: A list of the ingredients of the recipe. Each ingredient should be on a separate line, and should be displayed as `<name> - <quantity> <unit>`, e.g. `Flour - 2 cups`
- Instructions: The instructions for the recipe
- Time: The time it takes to prepare the recipe, in the format `X hours Y minutes`
    - **_Bonus:_** If the time is less than 60 minutes, display only the minutes, e.g. `45 minutes`
    - **_Bonus:_** If the time is more than 60 minutes, display the hours and minutes, e.g. `1 hour 30 minutes` for 90 minutes
- Servings: The number of servings the recipe makes
- Actions: A list of actions that can be performed on the recipe
    - Edit: Navigates to the recipe edit page
    - Delete: Deletes the recipe from the list
- **_Bonus_**: Similar recipes: A list of recipes that have at least three same ingredients as the current recipe. Each item should be a separate line, and the list should be sorted alphabetically by the name of the recipe. The name of the recipe should be a link to the recipe details page.

### Recipe Edit Page

The recipe edit page should allow the user to edit the details of a single recipe, with the following information:

- ID: The ID of the recipe (read only)
- Title: The name of the recipe (required, editable via text box)
- Cuisine: The cuisine of the recipe (required, editable via dropdown list, the list should be populated from the data in the `cuisines` endpoint)
- Description: The description of the recipe (optional, editable via text area)
- Instructions: The instructions for the recipe  (required, editable via text area)
- Time: The time it takes to prepare the recipe (required, editable via number input)
- Servings: The number of servings the recipe makes (optional, editable via number input)

The page should have a save button that saves the recipe and navigates back to the recipe details page

Note that the ingredients are not editable from this page.

### Recipe Create Page

The recipe create page should allow the user to create a new recipe, with the following information:

- Title: The name of the recipe (required, editable via text box)
- Cuisine: The cuisine of the recipe (required, editable via dropdown list, the list should be populated from the data in the `cuisines` endpoint)
- Description: The description of the recipe (optional, editable via text area)
- Instructions: The instructions for the recipe  (required, editable via text area)
- Time: The time it takes to prepare the recipe (required, editable via number input)
- Servings: The number of servings the recipe makes (optional, editable via number input)

The page should have a save button that saves the recipe and navigates back to the recipe details page

Note that the ingredients are not editable from this page.

### Ingredients List Page

The ingredients list page should display a list of ingredients, with the following information:

- Name: The name of the ingredient
- **_Bonus:_** Recipes: A list of recipes that use the ingredient. Each item should be a separate line, and the list should be sorted alphabetically by the name of the recipe. The name of the recipe should be a link to the recipe details page.

### Cuisine List Page

The cuisine list page should display a list of cuisines, with the following information:

- Name: The name of the cuisine
- **_Bonus:_** Recipes: A list of recipes that are of the cuisine. Each item should be a separate line, and the list should be sorted alphabetically by the name of the recipe. The name of the recipe should be a link to the recipe details page.

### Ingredients Details Page (**bonus**)

The ingredients details page should display the details of a single ingredient, with the following information:

- Name: The name of the ingredient
- Number of recipes: The number of recipes that use the ingredient
- **_Bonus:_** Recipes: A list of recipes that use the ingredient. Each item should be a separate line, and the list should be sorted alphabetically by the name of the recipe. The name of the recipe should be a link to the recipe details page. Next to each recipe, display the details of that ingredient in the recipe (quantity and unit).

### Cuisine Details Page (**bonus**)

The cuisine details page should display the details of a single cuisine, with the following information:

- Name: The name of the cuisine
- Number of recipes: The number of recipes that are of the cuisine
- **_Bonus:_** Recipes: A list of recipes that are of the cuisine. Each item should be a separate line, and the list should be sorted alphabetically by the name of the recipe. The name of the recipe should be a link to the recipe details page.

### Statistics Page

The statistics page should display the following information:

- Total number of recipes
- Total number of cuisines
- Total number of ingredients
- **_Bonus:_** Total number of recipes per cuisine
- **_Bonus:_** Total number of recipes per ingredient
- **_Bonus:_** Total number of recipes per time range (e.g. 0-30 minutes, 30-60 minutes, 60-90 minutes, etc.)
- **_Bonus:_** Total number of recipes per servings range (e.g. 0-2 servings, 2-4 servings, 4-6 servings, etc.)

### About Page

The about page should display the following information:

- The name of the student
- The ID of the student
- The current year
- A link to the github repository of the project
- Any other information that the student wishes to display

## Technical Requirements

- The application should be implemented using Angular, based on the provided scaffolding
- The application should be implemented using the following components (at least):
    - A component for the recipe list page
    - A component for the recipe details page
    - A component for the recipe edit page
    - A component for the recipe create page
    - A component for the ingredients list page
    - A component for the cuisine list page
    - A component for the ingredients details page (bonus)
    - A component for the cuisine details page (bonus)
    - A component for the statistics page
    - A component for the about page
    - A component for the navigation bar
    - A component for the footer
- The application should have a (at least one) service that provides access to the API data
- The components should use the service to access the data, and should not access the API directly
- The application should have a routing module that defines the routes for the pages