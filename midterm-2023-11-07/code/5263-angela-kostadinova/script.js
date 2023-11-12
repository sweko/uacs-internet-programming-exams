"use strict";
async function LoadingTheData() {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("Ooops...Sorry, I cannot take requested data!");
    }
    const data = await response.json();
    return data;
}
document.addEventListener("DOMContentLoaded", siteCode);
function CastListGenerate(cast) {
    const ul = document.createElement("ul");
    for (const actor of cast) {
        const li = document.createElement("li");
        li.innerHTML = actor;
        ul.appendChild(li);
    }
    return ul;
}
function DisplayAllMovies(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";
    for (const movie of movies) {
        const movieTable = generateMovieTable(movie);
        container.appendChild(movieTable);
    }
}
function generateMovieTable(movie) {
    const table = document.createElement("div");
    table.classList.add("movie-table");
    const movieData = [
        movie.id,
        movie.title,
        movie.director,
        movie.year,
        movie.genre,
        movie.plot,
        CastListGenerate(movie.cast),
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
let movies = [];
async function siteCode() {
    const data = await LoadingTheData();
    movies = data;
    DisplayAllMovies(movies);
}
const applyFilter = () => {
    const directorElement = document.getElementById("director-filter");
    const director = directorElement.value;
    const yearElement = document.getElementById("year-filter");
    const year = yearElement.value;
    let filteredMovies = movies;
    if (director !== "all") {
        filteredMovies = filteredMovies.filter(movie => movie.director === director);
    }
    if (year) {
        filteredMovies = filteredMovies.filter(movie => movie.year.toString() === year);
    }
    DisplayAllMovies(filteredMovies);
};
const titleSort = document.getElementById("title-sort");
titleSort.addEventListener("click", titleSort);
const titleSorter = (title) => title.localeCompare(title);
const sortByTitle = () => {
    const Movie = titleSort.toSorted(sortByTitle);
    DisplayAllMovies(movies);
};
//# sourceMappingURL=script.js.map