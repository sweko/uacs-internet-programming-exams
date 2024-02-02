# Make-Up Exam Take-Home Project

## Description

Create a web-application that will show the current temperature for some cities. 

- The list of cities will should be available to the application as data that is loaded on application startup.
- The user should be able to see the current temperature for each city  
    - **Bonus** The user should be able to see the current weather conditions for each city (e.g. sunny, cloudy, etc.)
- The user should be able to add new cities to the list. 
- The user should also be able to remove cities from the list. 
    - **Bonus** The user should be asked for confirmation before removing a city from the list.
- The user should be able to see the current temperature in Celsius or Fahrenheit (the user should be able to switch between the two units)
- Each city should be clickable, and when clicked, the user should be taken to a page that shows more detailed information about the city. 
    - **Bonus** The detailed information should include a 5-day forecast for the city.

## Data 
The location of the data is [here](https://github.com/sweko/uacs-internet-programming-exams/blob/main/make-up/project/places.json), and the application should load that data when it starts. The data is a JSON array of objects, each object representing a city. The objects have the following properties:

- `name` - the name of the city
- `country` - the country of the city

Also provided is a list of countries, which should be used to populate the country select box when adding a new city.

## Functionality

In order to get the current temperature for a city, you should use the [Open Meteo API](https://open-meteo.com/) or the [OpenWeatherMap API](https://openweathermap.org/current) service. The first service is free for up to 10000 requests per day, and does not require an API key. The second service is free for up to 60 requests per minute, and requires an API key.

However, both services only use the latitude and longitude of the city to get the weather data. You will have to use a service like [OpenCage API](https://opencagedata.com/) or [Geocode.xyz](https://geocode.xyz/) to get the latitude and longitude of the city. The first service is free, but requires an API key, while the second service is free for up to 1000 requests per day, and does not require an API key.

You do **not** have to have any code that reduces the number of requests, but it will be a bonus if you do.

## Submission

The project should be submitted as a git repository. The repository should contain a README.md file that explains how to run the project, and how to use it. The repository should also contain a .gitignore file that ignores the node_modules folder. Since you will be using API keys, you should create the GitHub repository as a private one, and add me as a collaborator. You should send me the link to the repository by the initial deadline, via email (swekster@gmail.com or vekoslav.stefanovski@uacs.edu.mk) or on Discord. Please make sure that I acknowledge the receipt of the link.

## Hints

You can load the data by directly accessing the raw JSON link, or you could use the [json-server](https://www.npmjs.com/package/json-server) library to work as a makeshift backend. An example of using json-server is provided in the dry run of the final exam, as well as in the exams templates.

In my opinion, it should be the easiest to implement the project using Angular, with some (not much) routing and some components and services. However, you can use whatever framework you want, or no framework at all - that is up to you, but please choose whatever you're most comfortable with.