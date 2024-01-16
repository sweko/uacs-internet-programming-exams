# Specification

Build a web-application that allows the user to view and manage a list of bands and their details.

## Data

The data is provided via an API that provides the data. The url of the API is [https://localhost:3000](https://localhost:3000).

The api exposes the following endpoints:

- `GET /bands` - Returns a list of bands
- `GET /bands/:id` - Returns a single band by id
- `POST /bands` - Creates a new band
- `PUT /bands/:id` - Updates an existing band
- `DELETE /bands/:id` - Deletes an existing band

- `GET /genres` - Returns a list of genres

- `GET /places` - Returns a list of places
- `GET /places/:id` - Returns places for a single country by id
- `GET /places?country=<country-name>` - Returns places for a single county by full name

### Band Data

The format of the `band` object is as follows:

```jsonc
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
```

### Genre Data

The format of the `genre` object is a simple string, e.g. `"Death Metal"`.

### Place Data

The format of the `place` object is as follows:

```jsonc
{
  "id": "number",
  "country": "string",
  "cities": ["string"] // an array of strings, each string is the name of a city
}
```

### Notes

- It is not guaranteed that all bands will have all fields populated
- If an band is for a city and a country, it is guaranteed that that country and city will an entry in the `actors` endpoint
- If a city has an entry in the `places` endpoint, it is not guaranteed that that city will have an entry in the `bands` endpoint
- If we need to load a specific country, we can use the `country` field to identify the country (the URL of the actor search endpoint is `http://localhost:3000/places?country=<country-name>`)

## Application structure

The application should consist of the following pages:

- Bands list page, available at `/bands`
- Band details page, available at `/bands/:id`
- Band edit page, available at `/bands/:id/edit`
- Band create page, available at `/bands/create`
- Country details page, available at `/country/:id`
- Statistics page, available at `/statistics`
- About page, available at `/about`
- **_Bonus_**: Member add page, available at `/bands/:id/members/add`

Additionally, the application should have the following features:

- The home page should be the band list page
- The application should have a navigation bar that allows the user to navigate between the pages
- The application should have a footer that displays the current year, the student details (ID and name) and a link to the about page

## Band List Page

The band list page should display a list of bands, with the following information:

### Data Format

The list of bands should show the following information:

- ID: The ID of the band
- Name: The name of the band
- Formed: The year the band was formed
- Location: The location of the band
- **Bonus** Country: The country the band is from, extracted from the location
- Genre: The genre of the band
- Members: The number of members in the band.
- Albums: The number of albums released by the band
- **Bonus** First Album: The name of the first album released by the band, along with the year of release
- **Bonus** Last Album: The name of the last album released by the band, along with the year of release

### Actions

Every list item should have the following actions:

- View: Navigates to the band details page
- Edit: Navigates to the band edit page
- Delete: Deletes the band from the list
- **_Bonus_**: Add member: Navigates to the member create page

The delete action should display a confirmation dialog before deleting the band.

### Add band

The page should have a button that allows the user to add a new band. Clicking on the button should navigate to the band create page.

### Sorting (**bonus**)

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order. The current sort order should be indicated by an arrow next to the column header. The arrow should point up for ascending order and down for descending order. If the column is not sorted, the arrow should not be displayed, or should be greyed out.

Note: The members column should be sorted by the number of members
Note: The first and last album columns should be sorted by the year of release, then by the name of the album.

### Filtering (**bonus**)

The list should be filterable by the following fields:

- Name: The name of the band (free entry text box, with partial filtering)
- Country: Dropdowm list of countries (the list should be populated from the data in the `places` endpoint)
- Genre: Dropdowm list of Genres (the list should be populated from the data in the `genres` endpoint)

### Band Details Page

The band details page should display the details of a single band, with the following information:

#### Data Format

The list of bands should show the following information:
- ID: The ID of the band
- Name: The name of the band
- Formed: The year the band was formed
- Location: The location of the band
- Country: The country the band is from, extracted from the location **Bonus**  The name of the country should be a link to the country details page.
- Genre: The genre of the band
- Members: A list of the members of the band. Each member should be on a separate line. The names of the band members should be sorted alphabetically.
- Albums: A list of the albums of the band. The albums should be sorted by the year of release, then by the name of the album. Each album should be on a separate line, and should be displayed as `<name> (<year>)`, e.g. `Master of Puppets (1986)`.
- **Bonus** Years active: A string that indicates the years the band was active, in a `<startYear> - <endYear>` format. The start year will be the year the band was formed, and the end year will be the latest year of publication of any of the band's albums. If the last publication year is the current year, or at most two years away from the current year, the end year should be "present". Examples:
    - `1990 - 2015` - for a band that has not published an album in the last two years
    - `1990 - present` - for a band that has published an album in the last two years
- Actions: A list of actions that can be performed on the band
    - Edit: Navigates to the band edit page
    - Delete: Deletes the band from the list
    - **_Bonus_**: Add member: Navigates to the member add page
- **_Bonus_**: Similar bands: A list of bands that have the same genre as the current band. Each item should be a separate line, and the list should be sorted alphabetically by the name of the band. The name of the band should be a link to the band details page.

### Band Edit Page

The band edit page should allow the user to edit the details of a single band, with the following information:

- ID: The ID of the band (read only)
- Name: The name of the band (required, editable via text box)
- Formed: The year the band was formed (required, editable via number input)
- Country: The country of the band (required, editable via dropdown list, the list should be populated from the data in the `places` endpoint)
- City: The city of the band (required, editable via dropdown list, the list should be populated from the data in the `places` endpoint)
- Genre: The genre of the band

The page should have a save button that saves the band and navigates back to the band details page

### Band Create Page

The band create page should allow the user to create a new band, with the following information:

- Name: The name of the band (required, editable via text box)
- Formed: The year the band was formed (required, editable via number input)
- Country: The country of the band (required, editable via dropdown list, the list should be populated from the data in the `places` endpoint)
- City: The city of the band (required, editable via dropdown list, the list should be populated from the data in the `places` endpoint)
- Genre: The genre of the band

The page should have a save button that saves the movei and navigates back to the band details page

### Country Details Page (**bonus**)

The country details page page should display the details of a single country, with the following information:

- ID: The ID of the country
- Name: The name of the country
- Cities: A list of cities that are in the county. Each item should be a separate line, and the list should be sorted alphabetically by the city name. ***Bonus*** Next to each city, display the number of bands that are from that city.

### Member Add Page (**bonus**)

The member add page should allow the user to add a new actor to the cast of the band, with the following information:

- Name: The name of the member (required, editable via text box)

The page should have a save button that saves the member and navigates back to the band details page


### Statistics Page

The statistics page should display the following information:

- Total number of bands
- Total number of band members
- Total number of genres
- Total number of albums
- A list of bands per genre (type and number of bands, e.g. `Doom Metal: 4`)
- A list of albums per genre (type and number of albums, e.g. `Doom Metal: 12`)
- A list of albums per decade (decade and number of oscars, e.g. `2010s: 10`)
- Number of cities that do not have any bands
- ***Bonus*** List of cities that do not have any bands

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
    - A component for the band list page
    - A component for the band details page
    - A component for the band edit page
    - A component for the band create page
    - A component for the country details page (bonus)
    - A component for the statistics page
    - A component for the about page
    - A component for the navigation bar
    - A component for the footer
    - A component for the member add page (bonus)
- The application should have a (at least one) service that provides access to the API data
- The components should use the service to access the data, and should not access the API directly
- The application should have a routing module that defines the routes for the pages


