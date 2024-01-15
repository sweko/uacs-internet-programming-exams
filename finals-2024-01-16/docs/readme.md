# Specification

Build a web-application that allows the user to view and manage a list of movies and their details.

## Data

The data is provided via an API that provides the data. The url of the API is [https://localhost:3000](https://localhost:3000).

The api exposes the following endpoints:

- `GET /movies` - Returns a list of movies
- `GET /movies/:id` - Returns a single movie by id
- `POST /movies` - Creates a new movie
- `PUT /movies/:id` - Updates an existing movie
- `DELETE /movies/:id` - Deletes an existing movie

- `GET /genres` - Returns a list of genres

- `GET /actors` - Returns a list of actors
- `GET /actors/:id` - Returns a single actor by id
- `GET /actors?name=<actor-name>` - Returns a single actor by full name

### Movie Data

The format of the `movie` object is as follows:

```jsonc
{
  "id": "number",
  "title": "string",
  "year": "number", // the year the movie was released
  "director": "string", // the name of the director
  "genre": ["string"], // an array of strings, each string is the a distinct genre
  "plot": "string", // a short description of the plot
  "cast": [
    {
      "actor": "string", // the name of the actor
      "character": "string" // the name of the character played by the actor
    }
  ], // an array of cast objects,
  "oscars": {
    "<oscar-type>": "string"
    // ...
    // where <oscar-type> is the type of the oscar won
    // and the value is the recipient of the oscar
  },
  "rating": "number"
}
```

### Genre Data

The format of the `genre` object is a simple string, e.g. `"Drama"`.

### Actor Data

The format of the `actor` object is as follows:

```jsonc
{
  "id": "number",
  "name": "string",
  "birthdate": "string", // a string in the format "Month DD, YYYY"
  "height": "number", // a value in centimeters
  "nationality": "American", // a string
  "notable_works": ["string"] // an array of strings, each string is the title of a movie
}
```

### Notes

- It is not guaranteed that all movies will have all fields populated
- It is not guaranteed that all actors will have all fields populated
- If an actor is in the cast of a movie, it is not guaranteed that the actor will have an entry in the `actors` endpoint
- If a movie is in the notable works of an actor, it is not guaranteed that the movie will have an entry in the `movies` endpoint
- If we need to load a specific actor, we can use the `name` field to identify the actor (the URL of the actor search endpoint is `http://localhost:3000/actors?name=<actor-name>`)

## Application structure

The application should consist of the following pages:

- Movies list page, available at `/movies`
- Movie details page, available at `/movies/:id`
- Movie edit page, available at `/movies/:id/edit`
- Movie create page, available at `/movies/create`
- Actor details page, available at `/actor/:id`
- Statistics page, available at `/statistics`
- About page, available at `/about`
- **_Bonus_**: Cast add page, available at `/movies/:id/cast/add`

Additionally, the application should have the following features:

- The home page should be the movie list page
- The application should have a navigation bar that allows the user to navigate between the pages
- The application should have a footer that displays the current year, the student details (ID and name) and a link to the about page

## Movie List Page

The movie list page should display a list of movies, with the following information:

### Data Format

The list of movies should show the following information:

- ID: The ID of the movie
- Title: The title of the movie
- Year: The year the movie was released
- Director: The name of the director
- Genre: The genres of the movie, separated by dashes ( / )
- Oscars: The number of oscars won by the movie
- Rating: The rating of the movie
- Actions: A list of actions that can be performed on the movie (see below)

### Actions

Every list item should have the following actions:

- View: Navigates to the movie details page
- Edit: Navigates to the movie edit page
- Delete: Deletes the movie from the list
- **_Bonus_**: Add cast: Navigates to the cast create page

The delete action should display a confirmation dialog before deleting the movie.

### Add Movie

The page should have a button that allows the user to add a new movie. Clicking on the button should navigate to the movie create page.

### Sorting (**bonus**)

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order. The current sort order should be indicated by an arrow next to the column header. The arrow should point up for ascending order and down for descending order. If the column is not sorted, the arrow should not be displayed, or should be greyed out.

Note: The genre column should be sorted by the number of genres, then by the first genre, then by the second genre, etc. The sorting should not take into account the order of the genres. (i.e. a movie with the genres `Action, Drama` should be sorted the same as a movie with the genres `Drama, Action`).

### Filtering (**bonus**)

The list should be filterable by the following fields:

- Title: The title of the movie (free entry text box, with partial filtering)
- Year: A numeric entry text box that allows the user to enter a year. The list should be filtered to show only movies released in the given year.
- Genre: Dropdowm list of genres (the list should be populated from the data). The list should be filtered to show only movies that have the selected genre, but not only movies that _only_ have that genre, i.e. if the user selects `Action`, the list should show movies that have the genre `Action`, but also movies that have the genres `Action, Drama`, `Action, Drama, Comedy`, etc.
- Rating: A numeric entry text box that allows the user to enter a rating. The list should be filtered to show only movies with a rating greater than or equal to the entered rating.

### Movie Details Page

The movie details page should display the details of a single movie, with the following information:

#### Data Format

- ID: The ID of the movie
- Title: The title of the movie
- Year: The year the movie was released
- Plot: A short description of the plot
- Director: The name of the director
- Genre: The genres of the movie, in a list format
- **Bonus** Oscars: A list of oscars won by the movie. Each item should be a separate line, and the list should be sorted alphabetically by the type of oscar. The name of the oscar should be a formated version of the propery name, i.e. `bestPicture` should be displayed as `Best Picture`, `bestActor` should be displayed as `Best Actor`, etc.
- Rating: The rating of the movie
- Cast: A list of actors, along with the role they played. Each item should be a separate line, and the list should be sorted alphabetically by the name of the actor. ***Bonus*** If the actor is available in the actors list, the name of the actor should be a link to the actor details page.
- Actions: A list of actions that can be performed on the movie
    - Edit: Navigates to the movie edit page
    - Delete: Deletes the movie from the list
    - **_Bonus_**: Add cast: Navigates to the cast create page
- **_Bonus_**: Similar movies: A list of movies that have the same genre as the current movie. Each item should be a separate line, and the list should be sorted alphabetically by the title of the movie. The title of the movie should be a link to the movie details page.
- **_Bonus_**: Similar directors: A list of movies that have the same director as the current movie. Each item should be a separate line, and the list should be sorted alphabetically by the title of the movie. The title of the movie should be a link to the movie details page.
- **_Bonus_**: Similar actors: A list of movies that have a same actor as the current movie. Each item should be a separate line, and the list should be sorted alphabetically by the title of the movie. The title of the movie should be a link to the movie details page.


### Movie Edit Page

The movie edit page should allow the user to edit the details of a single movie, with the following information:

- ID: The ID of the aumoviethor (read only)
- Title: The title of the movie (required, editable via text box)
- Year: The year the movie was released (required, editable via number input)
- Plot: A short description of the plot (optional, editable via text area)
- Director: The name of the director (required, editable via text box)
- Genre: Editable via dropdown list (the list should be populated from the data). **_Bonus_**: The user should be able to select multiple genres from the list.
- Rating: The rating of the movie (optional, editable via number input)
- **_Bonus_**: Oscars: A list of oscars won by the movie. Each item should be a separate line, and the list should be sorted alphabetically by the type of oscar. The name of the oscar should be a formated version of the propery name, i.e. `bestPicture` should be displayed as `Best Picture`, `bestActor` should be displayed as `Best Actor`, etc. The user should be able to add and remove oscars from the list.

The page should have a save button that saves the movie and navigates back to the movie details page

### Movie Create Page

The movie create page should allow the user to create a new movie, with the following information:

- ID: The ID of the aumoviethor (read only)
- Title: The title of the movie (required, editable via text box)
- Year: The year the movie was released (required, editable via number input)
- Plot: A short description of the plot (optional, editable via text area)
- Director: The name of the director (required, editable via text box)
- Genre: Editable via dropdown list (the list should be populated from the data). **_Bonus_**: The user should be able to select multiple genres from the list.
- Rating: The rating of the movie (optional, editable via number input)
- **_Bonus_**: Oscars: A list of oscars won by the movie. Each item should be a separate line, and the list should be sorted alphabetically by the type of oscar. The name of the oscar should be a formated version of the propery name, i.e. `bestPicture` should be displayed as `Best Picture`, `bestActor` should be displayed as `Best Actor`, etc. The user should be able to add and remove oscars from the list.

The page should have a save button that saves the movei and navigates back to the movie details page

### Actor Details Page (**bonus**)

The actor details page should display the details of a single actor, with the following information:

- ID: The ID of the actor
- Name: The name of the actor
- Birthdate: The birthdate of the actor
- Height: The height of the actor
- Nationality: Nationality of the actor
- Notable works: A list of movies that the actor has played in. Each item should be a separate line, and the list should be sorted alphabetically by the title of the movie. ***Bonus*** The title of the movie should be a link to the movie details page.

### Cast Create Page (**bonus**)

The cast create page should allow the user to add a new actor to the cast of the movie, with the following information:

- Actor: The name of the actor (required, editable via text box)
- Character: The name of the character played by the actor (required, editable via text box)

The page should have a save button that saves the actor and navigates back to the movie details page


### Statistics Page

The statistics page should display the following information:

- Total number of movies
- Total number of actors
- Total number of genres
- Total number of oscars
- A list of oscars per type (tyoe and number of oscars, e.g. `Best Picture: 10`)
- A list of oscars per genre (genre and number of oscars, e.g. `Drama: 10`)
- Number of movies per decade (decade and number of movies, e.g. `2010s: 10`)
- Number of movies per genre (genre and number of movies, e.g. `Drama: 10`)
- Number of actors that do not have their details available
- ***Bonus*** List of actors that do not have their details available
- Number of movies that do not have their details available
- ***Bonus*** List of movies that do not have their details available

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
    - A component for the movie list page
    - A component for the movie details page
    - A component for the movie edit page
    - A component for the movie create page
    - A component for the actor details page (bonus)
    - A component for the statistics page
    - A component for the about page
    - A component for the navigation bar
    - A component for the footer
    - A component for the cast create page (bonus)
- The application should have a (at least one) service that provides access to the API data
- The components should use the service to access the data, and should not access the API directly
- The application should have a routing module that defines the routes for the pages


