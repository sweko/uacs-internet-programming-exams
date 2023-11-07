"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", siteCode);
let movies = [];
function siteCode() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield loadData();
            movies = data;
            displayMovies(movies);
            const titleSort = document.getElementById("sort-title");
            titleSort.addEventListener("click", sortByTitle);
            const idSort = document.getElementById("sort-id");
            idSort.addEventListener("click", sortById);
            const yearSort = document.getElementById("sort-year");
            yearSort.addEventListener("click", sortByYear);
            const ratingSort = document.getElementById("sort-rating");
            ratingSort.addEventListener("click", sortByRating);
            const genreFilter = document.getElementById("genre-filter-select");
            genreFilter.addEventListener("change", () => {
                const selectedGenre = genreFilter.value;
                filterMoviesByGenre(selectedGenre);
            });
            const oscarsSort = document.getElementById("sort-oscars");
            oscarsSort.addEventListener("click", (() => {
                const sortedOscars = movies.slice().sort((a, b) => oscarsSorter(a, b));
                displayMovies(sortedOscars);
            }));
            const actorFilterInput = document.getElementById("actor-filter-input");
            actorFilterInput.addEventListener("input", () => {
                const actorName = actorFilterInput.value.trim();
                filterMoviesByActor(actorName);
            });
        }
        catch (error) {
            console.error("Error loading movie data:", error);
        }
    });
}
const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = yield fetch(dataUri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }
    const data = yield response.json();
    return data;
});
const titleSorter = (first, second) => first.title.localeCompare(second.title);
const idSorter = (first, second) => first.id - second.id;
const directorSorter = (first, second) => first.director.localeCompare(second.director);
const oscarsSorter = (first, second) => {
    return Object.keys(first.oscars).length - Object.keys(second.oscars).length;
};
function sortByTitle() {
    const sortedMovies = movies.slice().sort((a, b) => titleSorter(a, b));
    displayMovies(sortedMovies);
}
const sortById = () => {
    const sortedIds = movies.slice().sort((a, b) => idSorter(a, b));
    displayMovies(sortedIds);
};
const sortByYear = () => {
    const sortedYears = movies.slice().sort((a, b) => a.year - b.year);
    displayMovies(sortedYears);
};
const sortByRating = () => {
    const sortedRatings = movies.slice().sort((a, b) => a.rating - b.rating);
    displayMovies(sortedRatings);
};
function sortByDirector() {
    const sortedDirectors = movies.slice().sort((a, b) => directorSorter(a, b));
    displayMovies(sortedDirectors);
}
const displayMovies = (movies) => {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";
    const oscarsSort = document.getElementById("sort-oscars");
    oscarsSort.addEventListener("click", (() => {
        const sortedOscars = movies.slice().sort((a, b) => oscarsSorter(a, b));
        displayMovies(sortedOscars);
    }));
    for (const movie of movies) {
        const movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
    }
};
const generateMovieRow = (movie) => {
    const row = document.createElement("div");
    row.classList.add("movie-table");
    const idCell = createMovieCell("ID", movie.id);
    const titleCell = createMovieCell("Title", movie.title);
    const directorCell = createMovieCell("Director", movie.director);
    const yearCell = createMovieCell("Year", movie.year);
    const genreCell = createMovieCell("Genre", movie.genre.join(", "));
    const plotCell = createMovieCell("Plot", movie.plot);
    const castArray = movie.cast.map((castMember) => `${castMember.actor} as ${castMember.character}`);
    const castCell = createMovieCell("Cast", castArray.join(", "));
    const oscarsCell = createMovieCell("Oscars", movie.oscars);
    const ratingCell = createMovieCell("Rating", movie.rating);
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(directorCell);
    row.appendChild(yearCell);
    row.appendChild(genreCell);
    row.appendChild(plotCell);
    row.appendChild(castCell);
    row.appendChild(oscarsCell);
    row.appendChild(ratingCell);
    return row;
};
const createMovieCell = (header, content) => {
    const cell = document.createElement("div");
    cell.classList.add("movie-data", `movie-${header.toLowerCase()}`);
    let formattedContent = '';
    if (typeof content === 'object') {
        const oscars = content;
        formattedContent = Object.keys(oscars).map((oscarType) => `${oscarType}: ${oscars[oscarType]}`).join(', ');
    }
    else {
        formattedContent = String(content);
    }
    cell.innerHTML = `<strong>${header}:</strong> ${formattedContent}`;
    return cell;
};
function filterMoviesByGenre(selectedGenre) {
    if (selectedGenre === "") {
        displayMovies(movies);
    }
    else {
        const filteredMovies = movies.filter((movie) => {
            return movie.genre.includes(selectedGenre);
        });
        displayMovies(filteredMovies);
    }
}
function filterMoviesByActor(actorName) {
    const filteredMovies = movies.filter((movie) => {
        const lowerActorName = actorName.toLowerCase();
        return movie.cast.some((castMember) => {
            const actor = castMember.actor.toLowerCase();
            const character = castMember.character.toLowerCase();
            return actor.includes(lowerActorName) || character.includes(lowerActorName);
        });
    });
    displayMovies(filteredMovies);
}
function filterMoviesByTitle(title) {
    const filteredMovies = movies.filter((movie) => {
        const lowerTitle = title.toLowerCase();
        return movie.title.toLowerCase().includes(lowerTitle);
    });
    displayMovies(filteredMovies);
}
const titleFilterInput = document.getElementById("title-filter-input");
titleFilterInput.addEventListener("input", () => {
    const title = titleFilterInput.value.trim();
    filterMoviesByTitle(title);
});
const sortByOscars = () => {
    const sortedOscars = movies.slice().sort((a, b) => oscarsSorter(a, b));
    displayMovies(sortedOscars);
};
//# sourceMappingURL=script.js.map