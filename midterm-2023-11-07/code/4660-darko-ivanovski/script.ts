document.addEventListener("DOMContentLoaded", listOfMovies);

interface Cast
{
    actor: string;
    character: string;
}

interface Oscars
{
    bestPicture: string;
    bestDirector: string;
    bestActor: string;
    bestAdaptedScreenplay: string; 
}

interface Movie
{
    id: number;
    title: string;
    year: number;
    director: string;
    genre: [];
    plot: string;
    cast: Cast[];
    oscars: Oscars[];
}

type MovieSorter = (first: Movie, second: Movie) => number;

let movies: Movie[] = [];

async function listOfMovies()
{
    const movieData = await loadData();
    movies = movieData;
    displayData(movies);

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById);

    const titleSort = document.getElementById("sort-title")!;
    titleSort.addEventListener("click",sortByTitle)

    const directorSort = document.getElementById("sort-director")!;
    directorSort.addEventListener("click",sortByDirector)

    const yearSort = document.getElementById("sort-year")!;
    yearSort.addEventListener("click",sortByYear)
}

const idSorter: MovieSorter = (first, second) => first.id - second.id;
const titleSorter: MovieSorter = (first, second) => first.title.localeCompare(second.title);
const directorSorter: MovieSorter = (first, second) => first.director.localeCompare(second.director);
const yearSorter: MovieSorter = (first, second) => first.year - second.year;

function sortById()
{
    const sortedMovies = movies.toSorted(idSorter);
    displayData(sortedMovies);
}

function sortByTitle()
{
    const sortedMovies = movies.toSorted(titleSorter);
    displayData(sortedMovies);
}

function sortByDirector()
{
    const sortedMovies = movies.toSorted(directorSorter);
    displayData(sortedMovies);
}

function sortByYear()
{
    const sortedMovies = movies.toSorted(yearSorter);
    displayData(sortedMovies);
}

async function loadData()
{
    const dataURL = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const responseData = await fetch(dataURL);

    if(!responseData.ok)
    {
        throw new Error("Missing Data");
    }

    const fetchData = responseData.json();
    console.log(fetchData);
    return fetchData;
}

function displayData(movies: Movie[])
{
    const container = document.getElementById("movie-container")!;
    container.innerHTML = "";

    for(const movie of movies)
    {
        const movieRow = generateNewRow(movie);
        container.appendChild(movieRow);
    }
}

function generateNewRow(movie: Movie)
{
    const row = document.createElement("div");
    row.classList.add("movie-table");

    const idCollumn = document.createElement("div");
    idCollumn.classList.add("movie-data", "movie-id");
    idCollumn.innerHTML = movie.id.toString();
    row.appendChild(idCollumn);

    const titleCollumn = document.createElement("div");
    titleCollumn.classList.add("movie-data", "movie-title");
    titleCollumn.innerHTML = movie.title;
    row.appendChild(titleCollumn);

    const directorCollumn = document.createElement("div");
    directorCollumn.classList.add("movie-data", "movie-director");
    directorCollumn.innerHTML = movie.director;
    row.appendChild(directorCollumn);

    const yearCollumn = document.createElement("div");
    yearCollumn.classList.add("movie-data", "movie-year");
    yearCollumn.innerHTML = movie.year.toString();
    row.appendChild(yearCollumn);
    
    const genreCollumn = document.createElement("div");
    genreCollumn.classList.add("movie-data", "movie-genre");
    genreCollumn.innerHTML = movie.genre.toString();
    row.appendChild(genreCollumn);

    const plotCollumn = document.createElement("div");
    plotCollumn.classList.add("movie-data", "movie-plot");
    plotCollumn.innerHTML = movie.plot.slice(0,50);
    row.appendChild(plotCollumn);

    const castCollumn = document.createElement("div");
    castCollumn.classList.add("movie-data", "movie-cast");
    castCollumn.innerHTML = "-------"
    row.appendChild(castCollumn);

    const oscarsCollumn = document.createElement("div");
    oscarsCollumn.classList.add("movie-data", "movie-oscars");
    oscarsCollumn.innerHTML = `The movie has ${movie.oscars.length} oscars`;
    row.appendChild(oscarsCollumn);

    return row;
}