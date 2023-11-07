"use strict";
document.addEventListener("DOMContentLoaded", moviesCode);
let movies = [];
async function moviesCode() {
    const data = await loadData();
    movies = data;
    displayMovies(movies);
}
const loadData = async () => {
    const url = 'https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Response Not OK");
    }
    const data = await response.json();
    return data;
};
const displayMovies = (movies) => {
    const container = document.getElementById('movie-container');
    container.innerHTML = "";
    for (const movie of movies) {
        const movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
    }
};
const generateMovieRow = (movie) => {
    const row = document.createElement('div');
    row.classList.add("movie-row");
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
    const castArray = movie.cast;
    castCell.innerHTML = castArray.join(', ');
    row.appendChild(castCell);
    const oscarCell = document.createElement('div');
    oscarCell.classList.add('movie-data', 'movie-oscars');
    const numOscars = movie.oscars.length;
    const oscarText = numOscars === 0 ? "This movie didn't win any Oscars." : numOscars === 1 ? "This movie won 1 Oscar." : `This movie won ${numOscars} Oscars.`;
    oscarCell.innerHTML = oscarText;
    row.appendChild(oscarCell);
    const ratingCell = document.createElement('div');
    ratingCell.classList.add('movie-data', 'movie-rating');
    ratingCell.innerHTML = movie.genre.toString();
    row.appendChild(ratingCell);
    return row;
};
//# sourceMappingURL=script.js.map