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
    castCell.innerHTML = movie.cast.toString();
    if (movie.cast.length > 5) {
        const sortedCast = [...movie.cast].sort((a, b) => a.actor.localeCompare(b.actor));
        const truncatedCast = sortedCast.slice(0, 5).map((castMember, index) => {
            if (index === 4) {
                return `${castMember.actor} & ${castMember.character}*`;
            }
            return `${castMember.actor}, ${castMember.character}*`;
        });
        castCell.innerHTML = truncatedCast.join(", ");
    }
    else {
        const formattedCast = [...movie.cast].sort((a, b) => a.actor.localeCompare(b.actor)).map((castMember) => `${castMember.actor} as ${castMember.character}*`);
        castCell.innerHTML = formattedCast.join("");
    }
    row.appendChild(castCell);
    row.appendChild(castCell);
    const oscarsCell = document.createElement("div");
    oscarsCell.classList.add("movie-data", "movie-oscars");
    oscarsCell.innerHTML = movie.oscars.toString();
    row.appendChild(oscarsCell);
    //row.appendChild(oscarsCell);
    //const numOscars = Object.keys(movie.oscars).length;
    //const formattedOscars = Object.keys(movie.oscars)
    //  .sort()
    //  .map((oscarType) => {
    //    const formattedOscarType = oscarType
    //      .replace(/ ([A-Z])/g, ' $1')
    //     .replace(/^\w/, (str) => str.toUpperCase());
    //  return `${formattedOscarType}: ${movie.oscars[oscarType]}`;
    // });
    return row;
};
//# sourceMappingURL=script.js.map