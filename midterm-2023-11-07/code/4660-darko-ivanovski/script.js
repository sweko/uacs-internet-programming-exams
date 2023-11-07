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
document.addEventListener("DOMContentLoaded", listOfMovies);
let movies = [];
function listOfMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const movieData = yield loadData();
        movies = movieData;
        displayData(movies);
        const idSort = document.getElementById("sort-id");
        idSort.addEventListener("click", sortById);
        const titleSort = document.getElementById("sort-title");
        titleSort.addEventListener("click", sortByTitle);
        const directorSort = document.getElementById("sort-director");
        directorSort.addEventListener("click", sortByDirector);
        const yearSort = document.getElementById("sort-year");
        yearSort.addEventListener("click", sortByYear);
    });
}
const idSorter = (first, second) => first.id - second.id;
const titleSorter = (first, second) => first.title.localeCompare(second.title);
const directorSorter = (first, second) => first.director.localeCompare(second.director);
const yearSorter = (first, second) => first.year - second.year;
function sortById() {
    const sortedMovies = movies.toSorted(idSorter);
    displayData(sortedMovies);
}
function sortByTitle() {
    const sortedMovies = movies.toSorted(titleSorter);
    displayData(sortedMovies);
}
function sortByDirector() {
    const sortedMovies = movies.toSorted(directorSorter);
    displayData(sortedMovies);
}
function sortByYear() {
    const sortedMovies = movies.toSorted(yearSorter);
    displayData(sortedMovies);
}
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataURL = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
        const responseData = yield fetch(dataURL);
        if (!responseData.ok) {
            throw new Error("Missing Data");
        }
        const fetchData = responseData.json();
        console.log(fetchData);
        return fetchData;
    });
}
function displayData(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";
    for (const movie of movies) {
        const movieRow = generateNewRow(movie);
        container.appendChild(movieRow);
    }
}
function generateNewRow(movie) {
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
    plotCollumn.innerHTML = movie.plot.slice(0, 50);
    row.appendChild(plotCollumn);
    const castCollumn = document.createElement("div");
    castCollumn.classList.add("movie-data", "movie-cast");
    castCollumn.innerHTML = "-------";
    row.appendChild(castCollumn);
    const oscarsCollumn = document.createElement("div");
    oscarsCollumn.classList.add("movie-data", "movie-oscars");
    oscarsCollumn.innerHTML = `The movie has ${movie.oscars.length} oscars`;
    row.appendChild(oscarsCollumn);
    return row;
}
