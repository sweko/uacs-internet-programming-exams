interface Movie {
    id: number
    title: string
    year: number
    director: string
    genre: string[]
    plot: string
    cast: Actor[]
    oscars: any
    rating: number
}

interface Actor {
    actor: string
    character: string
}


type MovieSorter = (first: Movie, second: Movie) => number;
document.addEventListener('DOMContentLoaded', siteCode);
let movies: Movie[] = [];

const idSorter: MovieSorter = (first, second) => first.id - second.id;
const nameSorter: MovieSorter = (first, second) => first.title.localeCompare(second.title);
const directorSorter: MovieSorter = (first, second) => first.director.localeCompare(second.director);
const yearSorter: MovieSorter = (first, second) => first.year - second.year;
const oscarSorter: MovieSorter = (first, second) => {
    const firstOscars = Object.keys(first.oscars).length;
    const secondOscars = Object.keys(second.oscars).length;

    return secondOscars - firstOscars;
}

async function siteCode() {
    const data = await loadData();
    movies = data;

    fillterGenres(movies);

    displayMovies(movies);


    const idSort = document.getElementById('sort-id') as HTMLElement;
    const nameSort = document.getElementById('sort-name') as HTMLElement;
    const directorSort = document.getElementById('sort-director') as HTMLElement;
    const yearSort = document.getElementById('sort-year') as HTMLElement;
    const oscarSort = document.getElementById('sort-oscar') as HTMLElement;


    idSort.addEventListener('click', () => sortByid(idSort));
    nameSort.addEventListener('click', () => sortByName(nameSort));
    directorSort.addEventListener('click', () => sortByDirector(directorSort));
    yearSort.addEventListener('click', () => sortByYear(yearSort));
    oscarSort.addEventListener('click', () => sortByOscar(oscarSort));

    const applyFilterButton = document.getElementById('apply-filter')!;
    applyFilterButton.addEventListener('click', applyGenreFilter);

    const nameFilter = document.getElementById('name-filter') as HTMLInputElement;
    nameFilter.addEventListener('input', applyNameFilter);

    const actorFilter = document.getElementById('actor-filter') as HTMLInputElement;
    actorFilter.addEventListener('input', applyActorFilter);
}


function updateSortArrow(element: HTMLElement, isAscending: boolean) {
    const arrows = Array.from(element.querySelectorAll('.sort-arrow')) as HTMLElement[];
    for (const arrow of arrows) {
        arrow.style.display = 'none';
    }

    const arrow = isAscending ? element.querySelector('.sort-arrow.up') as HTMLElement : element.querySelector('.sort-arrow.down') as HTMLElement;
    if (arrow) {
        arrow.style.display = 'inline';
        arrow.innerHTML = isAscending ? '&#129153;' : '&#129155;';
        arrow.style.color = isAscending ? 'green' : 'red';
    }
}

const sortByid = (element: HTMLElement) => {
    const isAscending = !element.classList.contains('asc');
    updateSortArrow(element, isAscending);
    element.classList.toggle('asc', isAscending);

    const sortedMovies = movies.toSorted(idSorter);
    if (!isAscending) {
        sortedMovies.reverse();
    }
    displayMovies(sortedMovies);
};

const sortByName = (element: HTMLElement) => {
    const isAscending = !element.classList.contains('asc');
    updateSortArrow(element, isAscending);
    element.classList.toggle('asc', isAscending);

    const sortedMovies = movies.toSorted(nameSorter);
    if (!isAscending) {
        sortedMovies.reverse();
    }
    displayMovies(sortedMovies);
}

const sortByDirector = (element: HTMLElement) => {
    const isAscending = !element.classList.contains('asc');
    updateSortArrow(element, isAscending);
    element.classList.toggle('asc', isAscending);

    const sortedMovies = movies.toSorted(directorSorter);
    if (!isAscending) {
        sortedMovies.reverse();
    }
    displayMovies(sortedMovies);
}

const sortByYear = (element: HTMLElement) => {
    const isAscending = !element.classList.contains('asc');
    updateSortArrow(element, isAscending);
    element.classList.toggle('asc', isAscending);

    const sortedMovies = movies.toSorted(yearSorter);
    if (!isAscending) {
        sortedMovies.reverse();
    }
    displayMovies(sortedMovies);
};


const sortByOscar = (element: HTMLElement) => {
    const isAscending = !element.classList.contains('asc');
    updateSortArrow(element, isAscending);
    element.classList.toggle('asc', isAscending);

    const sortedMovies = movies.toSorted(oscarSorter);
    if (!isAscending) {
        sortedMovies.reverse();
    }
    displayMovies(sortedMovies);
};

const fillterGenres = (movies: Movie[]) => {
    const filter = document.getElementById('genre-filter') as HTMLSelectElement;

    const genres = new Set<string>();
    for (const movie of movies) {
        for (const genre of movie.genre) {
            genres.add(genre);
        }
    }

    for (const genre of genres) {
        const option = document.createElement('option');
        option.value = genre;
        option.innerHTML = genre;
        filter.appendChild(option);
    }
}

const applyGenreFilter = () => {
    const genreElement = document.getElementById('genre-filter') as HTMLSelectElement;
    const selectedGenre = genreElement.value;

    let filteredMovies = movies;



    if (selectedGenre !== "all") {
        filteredMovies = filteredMovies.filter(movie => movie.genre.includes(selectedGenre));
    }

    displayMovies(filteredMovies);
}

const applyNameFilter = () => {
    const nameFilter = document.getElementById('name-filter') as HTMLInputElement;
    const searchQuery = nameFilter.value.toLowerCase();

    let filteredMovies = movies;

    if (searchQuery.trim() !== '') {
        filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery));
    }

    displayMovies(filteredMovies);
}

const applyActorFilter = () => {
    const actorFilter = document.getElementById('actor-filter') as HTMLInputElement;
    const searchQuery = actorFilter.value.toLowerCase();

    let filteredMovies = movies;

    if (searchQuery.trim() !== '') {
        filteredMovies = filteredMovies.filter(movie => movie.cast.some(actor => actor.actor.toLowerCase().includes(searchQuery)));
    }

    displayMovies(filteredMovies);
}

const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = await fetch(dataUri);

    if (!response.ok) {
        throw new Error("The data is not there");
    }

    const data = await response.json();
    return data;
}


function displayMovies(moives: Movie[]) {

    const container = document.getElementById("movie-container")!;
    container.innerHTML = "";
    for (const movie of moives) {
        const movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
    }

}

const generateMovieRow = (movie: Movie) => {
    const row = document.createElement("div");
    row.classList.add("movie-row");

    //id
    const idCell = document.createElement("div");
    idCell.classList.add("movie-data", "movie-id");
    idCell.innerHTML = movie.id.toString();
    row.appendChild(idCell);


    //name
    const nameCell = document.createElement("div");
    nameCell.classList.add("movie-data", "movie-name");
    nameCell.innerHTML = movie.title;
    row.appendChild(nameCell);


    //director
    const directorCell = document.createElement("div");
    directorCell.classList.add("movie-data", "movie-director");
    directorCell.innerHTML = movie.director;
    row.appendChild(directorCell);


    //year
    const relaseCell = document.createElement("div");
    relaseCell.classList.add("movie-data", "movie-relese");
    relaseCell.innerHTML = movie.year.toString();
    row.appendChild(relaseCell);


    //genre
    const genreCell = document.createElement("div");
    genreCell.classList.add("movie-data", "movie-genre");
    genreCell.innerHTML = movie.genre.join(" / ");
    row.appendChild(genreCell);


    //plot
    const plotCell = document.createElement("div");
    plotCell.classList.add("movie-data", "movie-plot");
    const maxCharacters = 50;
    let content = movie.plot;

    if (content.length > maxCharacters) {
        const lastword = content.lastIndexOf(" ", maxCharacters);
        content = content.substring(0, lastword) + "...";
    }
    plotCell.innerHTML = content;

    plotCell.addEventListener("click", () => {
        const modal = document.getElementById("plot-details")!;
        modal.classList.remove("hidden");

        const plotParagraph = document.getElementById("movie-details-plot")!;
        plotParagraph.innerText = movie.plot;
    });

    row.appendChild(plotCell);

    //actors
    const actorsCell = document.createElement("div");
    actorsCell.classList.add("movie-data", "movie-actors");
    const actorList = document.createElement("ul");
    actorList.id = "movie-details-actor-list"
    for (const actor of movie.cast) {
        const actorItem = document.createElement("li");
        actorItem.innerText = `${actor.actor} (${actor.character})`;
        actorList.appendChild(actorItem);
    }
    actorsCell.appendChild(actorList);
    row.appendChild(actorsCell);


    //oscars
    const oscarsCell = document.createElement("div");
    oscarsCell.classList.add("movie-data", "movie-oscars");

    if (movie.oscars) {
        const numOscars = Object.values(movie.oscars).length;
        oscarsCell.innerHTML = numOscars.toString();
    } else {
        oscarsCell.innerHTML = "0";
    }

    row.appendChild(oscarsCell);
    return row;
}

if (document) {
    document.addEventListener('click', (event) => {
        const plotModal = document.getElementById('plot-details');
        if (plotModal && event.target === plotModal) {
            plotModal.classList.add('hidden');
        }
    });
}