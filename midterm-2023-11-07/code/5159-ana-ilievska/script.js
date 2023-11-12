"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
async function siteCode() {
    const data = await loadData();
    console.log(data);
    const displayMovies = (data);
}
async function loadData() {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("Failed to fetch data.");
    }
    const data = await response.json();
    // console.log(data);
    return data;
}
// const displayMovies = (movies: Movie []) => {
//   console.log("Displaying movies");
// }
const displayMovies = (movies) => {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";
    // Loops all the movies
    for (const movie of movies) {
        const movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
    }
};
const generateMovieRow = (movie) => {
    const row = document.createElement("div");
    row.classList.add("movie-table");
    //id cell
    const idCell = document.createElement("div");
    idCell.classList.add("movie-data", "movie-id");
    idCell.innerHTML = movie.id.toString();
    row.appendChild(idCell);
    //title cell
    const titleCell = document.createElement("div");
    titleCell.classList.add("movie-data", "movie-title");
    titleCell.innerHTML = movie.title;
    row.appendChild(titleCell);
    //director cell
    const directorCell = document.createElement("div");
    directorCell.classList.add("movie-data", "movie-director");
    directorCell.innerHTML = movie.director;
    row.appendChild(directorCell);
    //year cell
    const yearCell = document.createElement("div");
    yearCell.classList.add("movie-data", "movie-year");
    yearCell.innerHTML = "---";
    row.appendChild(yearCell);
    //genre cell
    const genreCell = document.createElement("div");
    genreCell.classList.add("movie-data", "movie-genre");
    genreCell.innerHTML = movie.genre.toString();
    row.appendChild(genreCell);
    //plot cell
    const plotCell = document.createElement("div");
    plotCell.classList.add("movie-data", "movie-title");
    plotCell.innerHTML = movie.title;
    row.appendChild(plotCell);
    //rating cell
    const ratingCell = document.createElement("div");
    ratingCell.classList.add("movie-data", "movie-year");
    ratingCell.innerHTML = "---";
    row.appendChild(ratingCell);
    return row;
};
//# sourceMappingURL=script.js.map