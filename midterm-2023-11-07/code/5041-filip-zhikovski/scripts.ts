interface Genre {
    genre:string;
}
interface Cast {    
    actor: string,
    character: string
}
interface Oscar {
    award: string
}



interface Movie{
    id: number;
    title: string;
    year: number;
    director: string;
    genre: Genre[];
    plot: string;
    cast: Cast[];
    oscars: Oscar[];
}

document.addEventListener("DOMContentLoaded", moviesCode)

let movies: Movie[] = [];

type MovieSorter = (first: Movie,second: Movie) => number;

async function moviesCode() {
    const data = await loadData();
    movies = data;

    displayMovies(movies);
  

    console.log(movies);


    
    const idSortButton =document.getElementById('sort-id')!;
    idSortButton.addEventListener("click",sortById);

    const titleSortButton =document.getElementById('sort-title')!;
    titleSortButton.addEventListener("click",sortByTitle);


    const yearSortButton =document.getElementById('sort-year')!;
    yearSortButton.addEventListener("click",sortByYear);


    const directorSortButton =document.getElementById('sort-director')!;
    directorSortButton.addEventListener("click",sortByDirector);

    const nameFilterInput = document.getElementById("name-filter") as HTMLInputElement;
    nameFilterInput.addEventListener("input", applyNameFilter);


}


const titleSorter: MovieSorter = (first, second) => first.title.localeCompare(second.title);
const idSorter: MovieSorter = (first, second) => first.id - second.id;
const yearSorter: MovieSorter = (first, second) => first.year - second.year;
const directorSorter: MovieSorter = (first, second) => first.director.localeCompare(second.director);

const sortById =()=>
{
        const sortedMovies=movies.toSorted(idSorter);
        displayMovies(sortedMovies)
}
const sortByTitle =()=>
{
    const sortedMovies=movies.toSorted(titleSorter);
    displayMovies(sortedMovies)
}

const sortByYear =()=>
{
    const sortedMovies=movies.toSorted(yearSorter);
    displayMovies(sortedMovies)
}

const sortByDirector =()=>
{
    const sortedMovies=movies.toSorted(directorSorter);
    displayMovies(sortedMovies)
}




const applyNameFilter = () => {
    const nameFilterInput = document.getElementById("name-filter") as HTMLInputElement;
    const nameFilter = nameFilterInput.value.trim().toLowerCase();

    let filteredMovies = movies;

    if (nameFilter !== "") {
        filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(nameFilter));
    }

    displayMovies(filteredMovies);
};





const loadData = async () => {
    const url = 'https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json'
    const response = await fetch(url);
    if (!response.ok) {

        throw new Error("Response Not OK")
    }

    const data = await response.json();
    return data;
}



const displayMovies = (movies: Movie[]) => {

    const container = document.getElementById('movie-container')!;
    container.innerHTML = "";
    for (const movie of movies) {
        const movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
    }
}
  
    const generateMovieRow = (movie: Movie) => {
        const row = document.createElement('div');
        row.classList.add("movie-table")
    
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
        
        const genreCell = document.createElement('div');
        genreCell.classList.add('movie-data', 'movie-genre');
        genreCell.innerHTML = movie.genre.toString();
        row.appendChild(genreCell);

        const plotCell = document.createElement('div');
        plotCell.classList.add('movie-data', 'movie-plot');

        if (movie.plot.charAt(50) === ' ') { 
            const cutPlot = movie.plot.substring(0, 50);
            plotCell.innerHTML = cutPlot + "...";
        } else {
            const index = movie.plot.indexOf(' ', 50);
            if (index !== -1) {
                const cutPlot = movie.plot.substring(0, index);
                plotCell.innerHTML = cutPlot + "...";
            } else {
                const cutPlot = movie.plot.substring(0, 50);
                plotCell.innerHTML = cutPlot + "...";
            }
        }
        row.appendChild(plotCell);

        const castCell = document.createElement('div');
        castCell.classList.add('movie-data', 'movie-genre');
        
        const castInfo = movie.cast.map(actorInfo => `${actorInfo.actor} as ${actorInfo.character}`).join(', ');
        castCell.innerHTML = castInfo;
        row.appendChild(castCell);


        const oscarsCell = document.createElement('div');
        oscarsCell.classList.add('movie-data', 'movie-oscars');
  
        for (const category in movie.oscars) {
            oscarsCell.innerHTML += ` ${category} - ${movie.oscars[category]},<br>`;
        }
        oscarsCell.innerHTML = oscarsCell.innerHTML.slice(0, -1);

        
        row.appendChild(oscarsCell);

        return row;
}