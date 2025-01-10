# Specification

Build a web application that allows the user to view and manage authors and their books.

## Data

The data is provided via an API that provides the data. The base url of the API is [https://localhost:3000]

The api exposes the following endpoints:

- `GET /authors` - returns a list of authors
- `GET /authors/:id` - returns a single author
- `POST /authors` - creates a new author
- `PUT /authors/:id` - updates an existing author
- `DELETE /authors/:id` - deletes an existing author

- `GET /nationalities` - returns a list of nationalities

- `GET /book-types` - returns a list of book types

### Author Data
The format of the `author` object is as follows:

````javascript
{
    "id": "number",
    "name": "string",
    "birth_date": "string", // ISO 8601 date format
    "death_date": "string", // optional, ISO 8601 date format
    "nationality": "string", // one of the nationalities or two of the nationalities separated by a dash
    "bibliography": [
        {
            "name": "string",
            "year": "number",
            "type": "string" // one of the book types
        }
    ]
}
````

### Nationality Data

The format of the `nationality` object is a simple strings, e.g. `"American"`.

### Book Type Data

The format of the `book type` object is as follows:

````javascript
{
    "name": "string",
    "description": "string"
}
````

## Application structure

The application should consist of the following pages:

- Author list page, available at `/authors`
- Author details page, available at `/authors/:id`
- Author edit page, available at `/authors/:id/edit`
- Author create page, available at `/authors/create`
- Statistics page, available at `/statistics`
- About page, available at `/about`
- ***Bonus***: Book create page, available at `/authors/:id/books/create`

Additionally, the application should have the following features:

- The home page should be the author list page
- The application should have a navigation bar that allows the user to navigate between the pages
- The application should have a footer that displays the current year, the student details (ID and name) and a link to the about page

### Author List Page

The author list page should display a list of authors, with the following information:

#### Data Format

- ID: The ID of the author
- Name: The name of the author
- Birth date: The birth date of the author in the format `YYYY-MM-DD`
- Alive: A checkbox indicating whether the author is alive or not
- ***Bonus:*** Age, i.e. the difference in years between the birth date and the current date, or the death date and the birth date if the author is dead
- Nationality: The nationality of the author
- Bibliography: A number that indicates the number of books written by the author
- ***Bonus*** Years active: A string that indicates the years the author was active, in a `<startYear> - <endYear>` format. The start year will be the earliest year of publication of any of the author's books, and the end year will be the latest year of publication of any of the author's books. If the last publication year is the current year, or at most two years away from the current year, the end year should be "present". If the author is dead, the end year should be the year of death. Examples:
    - `1990 - 2015` - for a living author that has not published a book in the last two years
    - `1990 - present` - for a living author that has published a book in the last two years
    - `1990 - 2010` - for a dead author, where the year of death is 2010
- Actions: A list of actions that can be performed on the author, i.e. edit and delete

#### Sorting

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order. The current sort order should be indicated by an arrow next to the column header. The arrow should point up for ascending order and down for descending order. If the column is not sorted, the arrow should not be displayed, or should be greyed out.

Note: The bibliography column should be sorted by the total number of books written by the author.
Note: The years active column should be sorted by the start year, then by the end year.

#### Filtering

The list should be filterable by the following fields:

- Name: The name of the author (free entry text box, with partial filtering)
- Nationality: Dropdowm list of nationalities (the list should be populated from the data)
- Alive: Checkbox indicating whether the author is alive or not
- ***Bonus***: Years active: A numeric text box that allows the user to enter a year. The list should be filtered to show only authors that were active in the given year (inclusively).

#### Actions

The list should have the following actions:
- View: Navigates to the author details page
- Edit: Navigates to the author edit page
- Delete: Deletes the author from the list
- ***Bonus***: Add book: Navigates to the book create page

The delete action should display a confirmation dialog before deleting the author.

#### Add Author

The page should have a button that allows the user to add a new author. Clicking on the button should navigate to the author create page.


### Author Details Page

The author details page should display the details of a single author, with the following information:

#### Data Format

- ID: The ID of the author
- Name: The name of the author
- Birth date: The birth date of the author in the format `YYYY-MM-DD`
- Death date: The death date of the author in the format `YYYY-MM-DD`
- ***Bonus***: Age: The age of the author, i.e. the difference in years between the birth date and the current date, or the death date and the birth date if the author is dead
- Nationality: The nationality of the author
- Bibliography: A list of books written by the author, with the following information:
    - Name: The name of the book
    - Year: The year of publication of the book
    - Type: The type of the book
- Actions: A list of actions that can be performed on the author, i.e. edit and delete
- ***Bonus***: Book count by type: A list of book types written by the author, with the following information:
    - Name: The name of the book type
    - Description: The description of the book type
    - Count: The number of books written by the author of the given type
- ***Bonus***: Book count by decade: A list of decades, with the following information:
    - Decade: The decade
    - Count: The number of books written by the author in the given decade

#### Data display

- The bibliography should be displayed in a table. The table should have a header row with the column names, and a row for each book. The book count by type and book count by decade should be displayed in a similar manner.
- The birth date and death date should be displayed in the format `YYYY-MM-DD`. If the death date is not specified, it should be displayed as `present`.
- The delete action should display a confirmation dialog before deleting the author.

### Author Edit Page

The author edit page should allow the user to edit the details of a single author, with the following information:

- ID: The ID of the author (read only)
- Name: The name of the author (required, editable via text box)
- Birth date: The birth date of the author in the format `YYYY-MM-DD` (required, editable via date input)
- Death date: The death date of the author in the format `YYYY-MM-DD` (optional, editable via date input)
- Nationality: Editable via dropdown list (the list should be populated from the data)
- ***Bonus***: Implement double nationality, i.e. the user can select up to two nationalities from the list, or have two nationality dropdown lists, where the second one is only enabled if the first one is selected, and it's usage is optional. 
- Bibliography: A list of books written by the author, with the following information:
    - Name: The name of the book (required, editable via text box)
    - Year: The year of publication of the book (required, editable via number input)
    - Type: The type of the book (required, editable via dropdown list, populated from the data)
    - Remove: A button that removes the book from the list

Considerations

- Implement the validation rules for the birth date and death date as follows:
    - Birth date: The birth date should be in the past
    - Death date: The death date should be in the past, and should be after the birth date
- The page should have a save button that saves the author and navigates back to the author details page

### Author Create Page

The author create page should allow the user to create a new author, with the following information:

- Name: The name of the author (required, editable via text box)
- Birth date: The birth date of the author in the format `YYYY-MM-DD` (required, editable via date input)
- Death date: The death date of the author in the format `YYYY-MM-DD` (optional, editable via date input)
- Nationality: Editable via dropdown list (the list should be populated from the data)
- ***Bonus***: Implement double nationality, i.e. the user can select up to two nationalities from the list, or have two nationality dropdown lists, where the second one is only enabled if the first one is selected, and it's usage is optional. 
- Bibliography: A list of books written by the author, with the following information:
    - Name: The name of the book (required, editable via text box)
    - Year: The year of publication of the book (required, editable via number input)
    - Type: The type of the book (required, editable via dropdown list, populated from the data)
    - Remove: A button that removes the book from the list

Considerations

- Implement the validation rules for the birth date and death date as follows:
    - Birth date: The birth date should be in the past
    - Death date: The death date should be in the past, and should be after the birth date
- The page should have a save button that saves the author and navigates back to the author details page

### Statistics Page

The statistics page should display the following information:

- Total number of authors
- Total number of books
- Average number of books per author
- Total number of nationalities
- Total number of books per nationality
- Total number of book types
- ***Bonus***: Total number of books by type
- ***Bonus***: Total number of books by decade
- ***Bonus***: Average age of all authors

### About Page

The about page should display the following information:

- The name of the student
- The ID of the student
- The current year
- A link to the github repository of the project
- Any other information that the student wishes to display

## Technical Requirements

- The application should be implemented using Angular, based on the provided scaffolding
- The application should be responsive, and should work on mobile devices
- The application should be implemented using the following components (at least):
    - A component for the author list page
    - A component for the author details page
    - A component for the author edit page
    - A component for the author create page
    - A component for the statistics page
    - A component for the about page
    - A component for the navigation bar
    - A component for the footer
    - A component for the book create page (bonus)
- The application should have a (at least one) service that provides access to the API data
- The components should use the service to access the data, and should not access the API directly
- The application should have a routing that defines the routes for the pages





