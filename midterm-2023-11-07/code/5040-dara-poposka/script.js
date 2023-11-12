"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let movies = [];
async function siteCode() {
    const data = await loadData();
    movies = data;
    displayMovies(movies);
    const titleSort = document.getElementById("sort-title");
    titleSort.addEventListener("click", sortByTitle);
    const yearSort = document.getElementById("sort-year");
    yearSort.addEventListener("click", sortByYear);
    const genreFilter = document.getElementById("genre-filter");
    genreFilter.addEventListener("change", applyGenreFilter);
}
const titleSorter = (first, second) => first.title.localeCompare(second.title);
const yearSorter = (first, second) => first.year - second.year;
const sortByTitle = () => {
    const sortedMovies = movies.slice().sort(titleSorter);
    displayMovies(sortedMovies);
};
const sortByYear = () => {
    const sortedMovies = movies.slice().sort(yearSorter);
    displayMovies(sortedMovies);
};
const applyGenreFilter = () => {
    const genreFilter = document.getElementById("genre-filter");
    const selectedGenre = genreFilter.value;
    let filteredMovies = movies;
    if (selectedGenre !== "all") {
        filteredMovies = movies.filter(movie => movie.genre.includes(selectedGenre));
    }
    displayMovies(filteredMovies);
};
const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("Failed to fetch movie data");
    }
    const data = await response.json();
    return data;
};
const displayMovies = (movies) => {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";
    const table = document.createElement("table");
    table.classList.add("movie-table");
    const tableHeader = document.createElement("tr");
    const titleHeader = document.createElement("th");
    titleHeader.innerText = "Title";
    tableHeader.appendChild(titleHeader);
    const yearHeader = document.createElement("th");
    yearHeader.innerText = "Year";
    tableHeader.appendChild(yearHeader);
    const genreHeader = document.createElement("th");
    genreHeader.innerText = "Genre";
    tableHeader.appendChild(genreHeader);
    table.appendChild(tableHeader);
    for (const movie of movies) {
        const movieRow = document.createElement("tr");
        const titleCell = document.createElement("td");
        titleCell.innerText = movie.title;
        movieRow.appendChild(titleCell);
        const yearCell = document.createElement("td");
        yearCell.innerText = movie.year.toString();
        movieRow.appendChild(yearCell);
        const genreCell = document.createElement("td");
        genreCell.innerText = movie.genre.join(", ");
        movieRow.appendChild(genreCell);
        table.appendChild(movieRow);
    }
    container.appendChild(table);
};
//# sourceMappingURL=script.js.map