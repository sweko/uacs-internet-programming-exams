interface Movies {
    id: number;
    title: string;
    director: string;
    year: number;
    genre: string;
    plot: string;
    cast: string[];
    oscars: number;
}
type MoviesSorter = (first: Movies, second: Movies) => number;

document.addEventListener("DOMContentLoaded", siteCode);

let movies: Movies[] = [];

async function siteCode() {
        const data = await loadData();
        movies = data;

    displayMovies(movies);

    const titleSort = document.getElementById("sort-title")!;
    titleSort.addEventListener("click", sortByTitle);

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById);

    const applyFilterButton = document.getElementById("apply-filter")!;
    applyFilterButton.addEventListener("click", applyFilter)

    const modal = document.getElementById("biblio-details")!;
    modal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

}

const titleSorter: MoviesSorter = (first, second) => first.title.localeCompare(second.title);
const idSorter: MoviesSorter = (first, second) => first.id - second.id;

const sortByTitle = () => {
    const sortedMovies = movies.toSorted(titleSorter);
    displayMovies(sortedMovies);
}

const sortById = () => {
    const sortedMovies = movies.toSorted(idSorter);
    displayMovies(sortedMovies);
}

const applyFilter = () => {
    const titleElement = document.getElementById("title-filter") as HTMLSelectElement;
    const title = titleElement.value;

    const directorElement = document.getElementById("director-filter") as HTMLSelectElement;
    const director = directorElement.value;

    let filteredMovies = movies;
    if (title !== "all") {
        filteredMovies = filteredMovies.filter(movies => movies.title === title);
    }
    if (director !== "all") {
        filteredMovies = filteredMovies.filter(movies => {
            if (director === "yes") {
                return movies.director === undefined;
            }
            return !!movies.director;
        })
    }
    displayMovies(filteredMovies);

}

   
async function loadData() {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = await fetch(dataUri);

    if (!response.ok) {
        throw new Error("The data is not available.");
    }

    const data = await response.json();
    return data;
}

function displayMovies(movies: Movies[]) {
    const container = document.getElementById("movie-container")!;
    container.innerHTML = "";

    for (const movie of movies) {
        const movieTable = generateMovieTable(movie);
        container.appendChild(movieTable);
    }
}

function generateMovieTable(movie: Movies) {
    const table = document.createElement("div");
    table.classList.add("movie-table");

    const movieData = [
        movie.id,
        movie.title,
        movie.director,
        movie.year,
        movie.genre,
        movie.plot,
        generateCastList(movie.cast),
        movie.oscars
    ];

    for (const data of movieData) {
        const movieDataElement = document.createElement("div");
        movieDataElement.classList.add("movie-data");
        movieDataElement.innerHTML = data.toString();
        table.appendChild(movieDataElement);
    }

    return table;
}

function generateCastList(cast: string[]) {
    const ul = document.createElement("ul");

    for (const actor of cast) {
        const li = document.createElement("li");
        li.innerHTML = actor;
        ul.appendChild(li);
    }

    return ul;
}




