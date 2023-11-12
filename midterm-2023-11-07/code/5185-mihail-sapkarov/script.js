"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
async function siteCode() {
    const data = await loadData();
    displayMovies(data);
}
const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }
    const data = await response.json();
    return data;
};
const displayMovies = (movies) => {
    const container = document.getElementById("movie-container");
    for (const movie of movies) {
        const movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
    }
};
const generateMovieRow = (movie) => {
    const row = document.createElement("div");
    row.classList.add("movie-table");
    const idCell = document.createElement("div");
    idCell.classList.add("movie-data", "movie-id");
    idCell.innerHTML = movie.id.toString();
    row.appendChild(idCell);
    const titleCell = document.createElement("div");
    titleCell.classList.add("movie-data", "movie-name");
    titleCell.innerHTML = movie.title;
    row.appendChild(titleCell);
    const directorCell = document.createElement("div");
    directorCell.classList.add("movie-data", "movie-director");
    directorCell.innerHTML = movie.director;
    row.appendChild(directorCell);
    const yearCell = document.createElement("div");
    yearCell.classList.add("movie-data", "movie-year");
    yearCell.innerHTML = movie.year.toString();
    row.appendChild(yearCell);
    const genreCell = document.createElement("div");
    genreCell.classList.add("movie-data", "movie-genre");
    genreCell.innerHTML = movie.genre.join("/");
    row.appendChild(genreCell);
    const plotCell = document.createElement("div");
    plotCell.classList.add("movie-data", "movie-plot");
    plotCell.innerHTML = movie.plot;
    row.appendChild(plotCell);
    const castCell = document.createElement("div");
    castCell.classList.add("movie-data", "movie-cast");
    const actors = movie.cast.map((actor) => actor.actor);
    if (actors.length > 5) {
        const firstFive = actors.slice(0, 5).join(', ');
        const remainingCount = actors.length - 5;
        const remainingText = remainingCount === 1 ? '1 actor' : `${remainingCount} actors`;
        castCell.textContent = `${firstFive}... & ${remainingText}`;
    }
    else {
        castCell.textContent = actors.join(' , ');
    }
    row.appendChild(castCell);
    const oscarsCell = document.createElement("div");
    oscarsCell.classList.add("movie-data", "movie-oscars");
    const oscarCount = Object.keys(movie.oscars).length;
    oscarsCell.textContent = `${oscarCount} Oscars`;
    const formattedOscars = Object.keys(movie.oscars)
        .sort()
        .map((oscarType) => {
        const formattedOscarType = oscarType
            .split(/(?=[A-Z])/)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
        return `${formattedOscarType}: ${movie.oscars[oscarType]}`;
    });
    oscarsCell.innerHTML = formattedOscars.join("<br>");
    row.appendChild(oscarsCell);
    return row;
};
document.addEventListener("DOMContentLoaded", function () {
    const movieContainer = document.getElementById("movie-container");
    const headers = document.querySelectorAll(".movie-header");
    let currentSortColumn = null;
    let isAscending = true;
    headers.forEach((header, index) => {
        header.addEventListener("click", () => {
            const column = index;
            if (currentSortColumn !== column) {
                isAscending = true;
                currentSortColumn = column;
            }
            else {
                isAscending = !isAscending;
            }
            headers.forEach(h => h.classList.remove("sorted-asc", "sorted-desc"));
            header.classList.add(isAscending ? "sorted-asc" : "sorted-desc");
            sortMovies(column, isAscending);
        });
    });
    function sortMovies(column, ascending) {
        const movies = Array.from(movieContainer.querySelectorAll(".movie-table"));
        movies.sort((a, b) => {
            const valueA = a.children[column].textContent;
            const valueB = b.children[column].textContent;
            if (ascending) {
                return valueA.localeCompare(valueB);
            }
            else {
                return valueB.localeCompare(valueA);
            }
        });
        movieContainer.innerHTML = "";
        movies.forEach(movie => movieContainer.appendChild(movie));
    }
});
//# sourceMappingURL=script.js.map