# Specification

Build a website that allows the user to view a list of authors and their books.

## Data

The data is provided via an API that provides the data. The url of the API is [https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term/data/authors.json](https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term/data/authors.json).

The format of the data is an array of `author` objects, and each author object is as follows:

````javascript
{
    "id": "number",
    "name": "string",
    "birth_date": "string", // ISO 8601 date format
    "death_date": "string", // optional, ISO 8601 date format
    "nationality": "string",
    "bibliography": [
        {
            "name": "string",
            "year": "number",
            "type": "string" // predefined list of types - "Novel", "Novella", "Non-Fiction", "Collection", "Graphic Novel"
        }
    ]
}
````

## Author List

### Data Format

The author list should show the following information:
- ID: The ID of the author
- Name: The name of the author
- Birth date: The birth date of the author in the format `YYYY-MM-DD`
- Alive: A checkbox indicating whether the author is alive or not
- ***Bonus:*** Age, i.e. the difference in years between the birth date and the current date, or the death date and the birth date if the author is dead
- Nationality: The nationality of the author
- Bibliography (variant 1): A number that indicates the number of books written by the author
- Bibliography (variant 2): A summary of the books written by the author, aggregated by book type, e.g. "3 Novels, 2 Novellas and 1 Collections"
    - ***Bonus*** - The text should take care of singular and plural formats, i.e. "3 Novels, 2 Novellas and 1 Collection"
- ***Bonus*** - The text should be a link that opens a modal with the list of books written by the author in the following format
    - Name: The name of the book
    - Year: The year the book was published
    - Type: The type of the book, one of the following: "Novel", "Novella", "Non-Fiction", "Collection", "Graphic Novel"
    - The books should be orderded by publication year, from newest to oldest
- ***Bonus*** Years active: A string that indicates the years the author was active, in a `<startYear> - <endYear>` format. The start year will be the earliest year of publication of any of the author's books, and the end year will be the latest year of publication of any of the author's books. If the last publication year is the current year, or at most two years away from the current year, the end year should be "present". If the author is dead, the end year should be the year of death. Examples:
    - `1990 - 2015` - for a living author that has not published a book in the last two years
    - `1990 - present` - for a living author that has published a book in the last two years
    - `1990 - 2010` - for a dead author, where the year of death is 2010

### Sorting

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order. The current sort order should be indicated by an arrow next to the column header. The arrow should point up for ascending order and down for descending order. If the column is not sorted, the arrow should not be displayed, or should be greyed out.

Note: The bibliography column should be sorted by the total number of books written by the author.
Note: The years active column should be sorted by the start year, then by the end year.

### Filtering

The list should be filterable by the following fields:

- Name: The name of the author (free entry text box, with partial filtering)
- Nationality: Dropdowm list of nationalities (the list should be populated from the data)
- Alive: Checkbox indicating whether the author is alive or not
- ***Bonus***: Years active: A numeric text box that allows the user to enter a year. The list should be filtered to show only authors that were active in the given year (inclusively).
