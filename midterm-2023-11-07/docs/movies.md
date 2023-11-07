# Specification

Build a website that allows the user to view a list of movies and their details.

## Data

The data is provided via an API that provides the data. The url of the API is [https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json](https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json).

The format of the data is an array of `movie` objects, and each movie object is as follows:

```jsonc
{
    "id": "number",
    "title": "string",
    "year": "number", // the year the movie was released
    "director": "string", // the name of the director
    "genre": [ "string" ], // an array of strings, each string is the a distinct genre
    "plot": "string", // a short description of the plot
    "cast": [
        {
            "actor": "string", // the name of the actor
            "character": "string" // the name of the character played by the actor
        }
    ], // an array of cast objects,
    "oscars" : {
        "<oscar-type>" : "string" 
        // ...
        // where <oscar-type> is the type of the oscar won
        // and the value is the recipient of the oscar
    },
    "rating": "number
}
```

## List of Movies

### Data Format

The list of movies should show the following information:
- ID: The ID of the movie
- Title: The yitle of the movie
- Year: The year the movie was released
- Director: The name of the director
- Genre: The genres of the movie, separated by dashes ( / )
- Plot: A short description of the plot
    - **Bonus** - The plot should be truncated to 50 characters, and should be followed by an ellipsis (...). Additionally, make sure that you do not cut a word in half
- Cast: (Variant 1) The cast of the movie, separated by commas.If the list is longer than 5 actors, only the first 5 should be displayed, followed by an ellipsis (`...`). The last actor should be preceded by an `&` instead of a comma. The names of the actors should be sorted alphabetically.
- **Bonus** Cast: (Variant 2): A list of actors, along with the role they played. Each item should be a separate line, and the list should be sorted alphabetically by the name of the actor.
- Oscars: (Variant 1) The number of oscars won by the movie
- **Bonus** Oscars: (Variant 2) A list of oscars won by the movie. Each item should be a separate line, and the list should be sorted alphabetically by the type of oscar. The name of the oscar should be a formated version of the propery name, i.e. `bestPicture` should be displayed as `Best Picture`, `bestActor` should be displayed as `Best Actor`, etc.

### Sorting

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order. The current sort order should be indicated by an arrow next to the column header. The arrow should point up for ascending order and down for descending order. If the column is not sorted, the arrow should not be displayed, or should be greyed out.

Note: The genre column should be sorted by the number of genres, then by the first genre, then by the second genre, etc. The sorting should not take into account the order of the genres. (i.e. a movie with the genres `Action, Drama` should be sorted the same as a movie with the genres `Drama, Action`).  
Note: The cast column should be sorted by the number of actors, then by the first actor, then by the second actor, etc.


### Filtering

The list should be filterable by the following fields:

- Title: The title of the movie (free entry text box, with partial filtering)
- Year: A numeric entry text box that allows the user to enter a year. The list should be filtered to show only movies released in the given year.
- Genre: Dropdowm list of genres (the list should be populated from the data). The list should be filtered to show only movies that have the selected genre, but not only movies that *only* have that genre, i.e. if the user selects `Action`, the list should show movies that have the genre `Action`, but also movies that have the genres `Action, Drama`, `Action, Drama, Comedy`, etc.
- ***Bonus***: Oscar: A dropdown list of oscars (the list should be populated from the data). The name of the oscar should be a formated version of the propery name, i.e. `bestPicture` should be displayed as `Best Picture`, `bestActor` should be displayed as `Best Actor`, etc.
