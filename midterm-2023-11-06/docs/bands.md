# Specification

Build a website that allows the user to view a list of bands and their albums.

## Data

The data is provided via an API that provides the data. The url of the API is [https://raw.githubusercontent.com/sweko/internet-programming-a98db973kwl8xp1lz94kjf0bma5pez8c/refs/heads/main/data/doctor-who-episodes.json](https://raw.githubusercontent.com/sweko/internet-programming-a98db973kwl8xp1lz94kjf0bma5pez8c/refs/heads/main/data/doctor-who-episodes.json).

The format of the data is an object, that has a single property `metalBands`, which is an array of `band` objects, and each band object is as follows:

````javascript
{
    "id": "number",
    "name": "string",
    "genre": "string",
    "formed": "number", // the year the band was formed
    "location" : "string", // the city and country where the band was formed
    "members": [ "string" ], // an array of strings, each string is the name of a band member
    "albums": [ 
        {
            "name": "string", // the name of the album
            "year": "number", // the year the album was released
        }
    ] // an array of album objects
}
````

## List of Bands

### Data Format

The list of bands should show the following information:
- ID: The ID of the band
- Name: The name of the band
- Formed: The year the band was formed
- Location: The location of the band
- **Bonus** Country: The country the band is from, extracted from the location
- Genre: The genre of the band
- Members: A comma separated list of the members of the band. If the list is longer than 5 members, only the first 5 should be displayed, followed by an ellipsis (`...`). If the list is shorter than 3 members, the list should be displayed as is. The last member should be followed by an `&` instead of a comma. The names of the band members should be sorted alphabetically.
- Albums: The number of albums released by the band
- **Bonus** First Album: The name of the first album released by the band, along with the year of release
- **Bonus** Last Album: The name of the last album released by the band, along with the year of release
- **Bonus** Years active: A string that indicates the years the band was active, in a `<startYear> - <endYear>` format. The start year will be the year the band was formed, and the end year will be the latest year of publication of any of the band's albums. If the last publication year is the current year, or at most two years away from the current year, the end year should be "present". Examples:
    - `1990 - 2015` - for a band that has not published an album in the last two years
    - `1990 - present` - for a band that has published an album in the last two years

### Sorting

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order. The current sort order should be indicated by an arrow next to the column header. The arrow should point up for ascending order and down for descending order. If the column is not sorted, the arrow should not be displayed, or should be greyed out.

Note: The members column should be sorted by the number of members, then by the first member, then by the second member, etc.
Note: The first and last album columns should be sorted by the year of release, then by the name of the album.
Note: The years active column should be sorted by the start year, then by the end year.

### Filtering

The list should be filterable by the following fields:

- Name: The name of the band (free entry text box, with partial filtering)
- Country: Dropdowm list of countries (the list should be populated from the data)
- Genre: Dropdowm list of Genres (the list should be populated from the data)
- ***Bonus***: Years active: A numeric text box that allows the user to enter a year. The list should be filtered to show only authors that were active in the given year (inclusively).
