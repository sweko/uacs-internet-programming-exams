interface Oscars {
    award: string;
}

interface Cast {
    actor: string;
    character: string;
}

interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[];
    plot: string;
    cast: Cast[];
    oscars: Oscars[];
    rating: number;
}

type MovieSorter = (first: Movie, second: Movie) => number;


document.addEventListener("DOMContentLoaded", moviesCode)

let movies: Movie[] = [];

async function moviesCode() {
    const data = await loadData();
    movies = data;

    fillGenres(movies);
    displayMovies(movies);

    const titleSort = document.getElementById("sort-title")!;
    titleSort.addEventListener("click", sortByTitle);

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById);

    const yearSort = document.getElementById("sort-year")!;
    yearSort.addEventListener("click", sortByYear);

    const directorSort = document.getElementById("sort-director")!;
    directorSort.addEventListener("click", sortByDirector);


    const applyFilterButton = document.getElementById("apply-filter")!;
    applyFilterButton.addEventListener("click", applyFilter);
}

const titleSorter: MovieSorter = (first, second) => first.title.localeCompare(second.title);
const idSorter: MovieSorter = (first, second) => first.id - second.id;
const directorSorter: MovieSorter = (first, second) => first.director.localeCompare(second.director);
const yearSorter: MovieSorter = (first, second) => first.year - second.year;


const sortByTitle = () => {
    const sortedMovies = movies.toSorted(titleSorter);
    displayMovies(sortedMovies);
}

const sortById = () => {
    const sortedMovies = movies.toSorted(idSorter);
    displayMovies(sortedMovies);
}

const sortByDirector = () => {
    const sortedMovies = movies.toSorted(directorSorter);
    displayMovies(sortedMovies);
}

const sortByYear = () => {
    const sortedMovies = movies.toSorted(yearSorter);
    displayMovies(sortedMovies);
}


const fillGenres = (movies: Movie[]) => {
    const filter = document.getElementById("genre-filter")!
    const genres = new Set<string>();

    for (const movie of movies) {
        const movieGenres = movie.genre;
        for (const genre of movieGenres) {
            genres.add(genre);
        }
    }

    for (const genre of genres) {
        const option = document.createElement("option");
        option.value = genre;
        option.innerHTML = genre;
        filter.appendChild(option);
    }
}


const applyFilter = () => {

    const titleElement = document.getElementById("title-filter") as HTMLSelectElement;
    const title = titleElement.value.toLowerCase().trim();

    const genreElement = document.getElementById("genre-filter") as HTMLSelectElement;
    const genre = genreElement.value;

    const yearElement = document.getElementById("year-filter") as HTMLSelectElement;
    const year = yearElement.value;

    const directorElement = document.getElementById("director-filter") as HTMLSelectElement;
    const director = directorElement.value.toLowerCase().trim();

    let filteredMovies = movies;
    if (genre !== "all") {
        filteredMovies = filteredMovies.filter(movie => movie.genre.join().toLowerCase().includes(genre.toLowerCase()));
    }

    if (title !== "") {
        filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(title));
    }

    if (year !== "") {
        filteredMovies = filteredMovies.filter(movie => movie.year.toString() === year);
    }

    if (director !== "") {
        filteredMovies = filteredMovies.filter(movie => movie.director.toLowerCase().includes(director));
    }

    displayMovies(filteredMovies);
}


const loadData = async () => {
    const url = 'https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Response Not OK")
    }

    const data = await response.json();
    return data;
}

const displayMovies = (movies: Movie[]) => {

    const container = document.getElementById('movie-container')!;
    container.innerHTML = "";
    for (const movie of movies) {
        const movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
    }
}


const generateMovieRow = (movie: Movie) => {
    const row = document.createElement('div');
    row.classList.add("movie-row")

    const idCell = document.createElement('div');
    idCell.classList.add('movie-data', 'movie-id');
    idCell.innerHTML = movie.id.toString();
    row.appendChild(idCell);

    const titleCell = document.createElement('div');
    titleCell.classList.add('movie-data', 'movie-title');
    titleCell.innerHTML = movie.title;
    row.appendChild(titleCell);

    const yearCell = document.createElement('div');
    yearCell.classList.add('movie-data', 'movie-year');
    yearCell.innerHTML = movie.year.toString();
    row.appendChild(yearCell);

    const directorCell = document.createElement('div');
    directorCell.classList.add('movie-data', 'movie-director');
    directorCell.innerHTML = movie.director;
    row.appendChild(directorCell);

    const genreCell = document.createElement('div');
    genreCell.classList.add('movie-data', 'movie-genre');
    genreCell.innerHTML = movie.genre.join(' / ');
    row.appendChild(genreCell);

    const plotCell = document.createElement('div');
    plotCell.classList.add('movie-data', 'movie-plot');

    let cutPlot = movie.plot.substring(0, 50);

    if (cutPlot.length === 50 && cutPlot.charAt(49) !== ' ') {
        const lastSpaceIndex = cutPlot.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
            cutPlot = cutPlot.substring(0, lastSpaceIndex);
        }
    }

    if (cutPlot.endsWith(',')) {
        cutPlot = cutPlot.slice(0, -1);
    }
    if (cutPlot.endsWith(' ')) {
        cutPlot = cutPlot.slice(0, -1);
    }

    plotCell.innerHTML = cutPlot + "...";
    row.appendChild(plotCell);

    const castCell = document.createElement('div');
    castCell.classList.add('movie-data', 'movie-cast');
    const castInfo = movie.cast.map(actorInfo => `${actorInfo.actor} as ${actorInfo.character}`).join(", ");
    castCell.innerHTML = castInfo;
    row.appendChild(castCell);

    const oscarCell = document.createElement('div');
    oscarCell.classList.add('movie-data', 'movie-oscars');

    for (const category in movie.oscars) {
        oscarCell.innerHTML += `${category} -  ${movie.oscars[category]}, <br>`;
    }
    oscarCell.innerHTML = oscarCell.innerHTML.slice(0, -1);
    row.appendChild(oscarCell);
    

    return row;
}