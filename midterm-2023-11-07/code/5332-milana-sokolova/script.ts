interface Cast {
    actor:string;
    character:string;
}

interface Oscars {
    [key: string]: string;
}

interface Movie {
    id: number;
    title: string;
    director: string;
    year: number;
    genre: string;
    plot: string;
    cast: string[];
    oscars: number;
}

document.addEventListener("DOMContentLoaded", siteCode);

let movies: Movie[] = [];

async function siteCode() {
    const data = await loadData();
    movies = data;

    displayMovies(movies);
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

function displayMovies(movies: Movie[]) {
    const container = document.getElementById("movie-container")!;
    container.innerHTML = "";

    for (const movie of movies) {
        const movieTable = generateMovieTable(movie);
        container.appendChild(movieTable);
    }
}

function generateMovieTable(movie: Movie) {
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
    const sortedActors = cast.slice().sort();

    const castCell = document.createElement("div");
    castCell.classList.add("movie-data", "movie-cast");

    for (let i = 0; i < Math.min(5, sortedActors.length); i++) {
        castCell.innerHTML += sortedActors[i];
        if (i < 4) {
            castCell.innerHTML += ', ';
        }
    }

    if (sortedActors.length > 5) {
        castCell.innerHTML += '... & ' + sortedActors[sortedActors.length - 1];
    }

    return castCell;
}


function generateCastListVariant2(cast: string[]) {
    const sortedCast = cast.slice().sort();

    const castCell = document.createElement("div");
    castCell.classList.add("movie-data", "movie-cast");

    for (const actor of sortedCast) {
        castCell.innerHTML += actor + '<br>';
    }

    return castCell;
}

function generateOscarsCount(oscars: number) {
    const oscarsCell = document.createElement("div");
    oscarsCell.classList.add("movie-data", "movie-oscars");
    oscarsCell.innerHTML = oscars.toString();
    return oscarsCell;
}
