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
    createCell(row, "movie-id", movie.id.toString());
    createCell(row, "movie-name", movie.title);
    createCell(row, "movie-director", movie.director);
    createCell(row, "movie-year", movie.year.toString());
    createCell(row, "movie-genre", movie.genre.join(", "));
    const plotContent = movie.plot.length > 50 ? movie.plot.substr(0, 50).split(' ').slice(0, -1).join(' ') + '...' : movie.plot;
    createCell(row, "movie-plot", plotContent);
    const castCell = document.createElement("div");
    castCell.classList.add("movie-data", "movie-cast");
    const sortedCast = movie.cast.sort((a, b) => a.actor.localeCompare(b.actor));
    for (const actorData of sortedCast) {
        const actorRole = `${actorData.actor} - ${actorData.character}`;
        castCell.innerHTML += actorRole + "<br>";
    }
    row.appendChild(castCell);
    const oscarsCell = document.createElement("div");
    oscarsCell.classList.add("movie-data", "movie-oscars");
    const sortedOscars = Object.keys(movie.oscars).sort();
    for (const oscarType of sortedOscars) {
        const formattedOscarType = formatOscarType(oscarType);
        const oscarValue = movie.oscars[oscarType];
        const oscarLine = `${formattedOscarType}: ${oscarValue}`;
        oscarsCell.innerHTML += oscarLine + "<br>";
    }
    row.appendChild(oscarsCell);
    return row;
};
function formatOscarType(oscarType) {
    const formattedOscarType = oscarType.replace(/([A-Z])/g, ' $1').trim();
    return formattedOscarType.charAt(0).toUpperCase() + formattedOscarType.slice(1);
}
function createCell(row, className, content) {
    const cell = document.createElement("div");
    cell.classList.add("movie-data", className);
    cell.innerHTML = content;
    row.appendChild(cell);
}
//# sourceMappingURL=script.js.map