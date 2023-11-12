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
    const response = await fetch('url');
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
    row.classList.add("movie-table");
    const idCell = document.createElement('div');
    idCell.classList.add('movie-data', 'movie-id');
    idCell.innerHTML = movie.id.toString();
    row.appendChild(idCell);
    const titleCell = document.createElement('div');
    titleCell.classList.add('movie-data', 'movie-title');
    titleCell.innerHTML = movie.title;
    row.appendChild(titleCell);
    const directorCell = document.createElement('div');
    directorCell.classList.add('movie-data', 'movie-director');
    directorCell.innerHTML = movie.director;
    row.appendChild(directorCell);
    const yearCell = document.createElement('div');
    yearCell.classList.add('movie-data', 'movie-year');
    yearCell.innerHTML = movie.year.toString();
    row.appendChild(yearCell);
    //genre
    const plotCell = document.createElement('div');
    plotCell.classList.add('movie-data', 'movie-plot');
    // plotCell.innerHTML = movie.plot.substring(0, 50)+ "...";
    if (movie.plot.charAt(50) === ' ') {
        const cutPlot = movie.plot.substring(0, 50);
        plotCell.innerHTML = cutPlot + "...";
    }
    else {
        const index = movie.plot.indexOf(' ', 50);
        if (index !== -1) {
            const cutPlot = movie.plot.substring(0, index);
            plotCell.innerHTML = cutPlot + "...";
        }
        else {
            const cutPlot = movie.plot.substring(0, 50);
            plotCell.innerHTML = cutPlot + "...";
        }
    }
    row.appendChild(plotCell);
    //cast
    const oscarCell = document.createElement('div');
    oscarCell.classList.add('movie-data', 'movie-oscar');
    const oscarText = movie.oscar.length === 0 ? "This movie has no oscars" : movie.oscar.length === 1 ? "This movie has 1 oscar" : "This movie has won " + movie.oscar.length + " oscars";
    oscarCell.innerHTML = oscarText;
    row.appendChild(oscarCell);
    const ratingCell = document.createElement('div');
    idCell.classList.add('movie-data', 'movie-rating');
    idCell.innerHTML = movie.id.toString();
    row.appendChild(ratingCell);
    oscarCell.addEventListener('mouseover', () => {
        const awardText = movie.oscar.map(oscar => oscar.award).join(', ');
        showPopup(awardText);
    });
    oscarCell.addEventListener('mouseout', () => {
        hidePopup();
    });
    function showPopup(text) {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = text;
        oscarCell.appendChild(popup);
    }
    function hidePopup() {
        const popup = oscarCell.querySelector('.popup');
        if (popup) {
            popup.remove();
        }
    }
    return row;
};
//# sourceMappingURL=script.js.map