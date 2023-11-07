// Define interfaces for movie data
interface Movie {
        id: number;
        title: string;
        year: number;
        director: string;
        genre: string[];
        plot: string;
        cast: { 
            actor: string; character: string 
        }[];
        oscars: { [key: string]: string };
        rating: number;
    }
    
    type MovieSorter = (first: Movie, second: Movie) => number;
    
    document.addEventListener("DOMContentLoaded", siteCode);
    
    let movies: Movie[] = [];
    
    async function siteCode() {
        const data = await loadData();
        movies = data;
        
        fillGenreDropdown(movies);
        
        displayMovies(movies);
        
        const titleFilter = document.getElementById("title-filter") as HTMLInputElement;
        titleFilter.addEventListener("input", applyFilter);
        
        const yearFilter = document.getElementById("year-filter") as HTMLInputElement;
        yearFilter.addEventListener("input", applyFilter);
        
        const genreFilter = document.getElementById("genre-filter") as
        HTMLSelectElement;
        genreFilter.addEventListener("change", applyFilter);
        
        const oscarsFilter = document.getElementById("oscar-filter") as
        HTMLSelectElement;
        oscarsFilter.addEventListener("change", applyFilter);
        
        const idSort = document.getElementById("sort-id")!;
        idSort.addEventListener("click", sortById);
        
        const titleSort = document.getElementById("sort-title")!;
        titleSort.addEventListener("click", sortByTitle);
        
        const directorSort = document.getElementById("sort-director")!;
        directorSort.addEventListener("click", sortByDirector);
        
        const yearSort = document.getElementById("sort-year")!;
        yearSort.addEventListener("click", sortByYear);
        
        const genreSort = document.getElementById("sort-genre")!;
        genreSort.addEventListener("click", sortByGenre);
        
        const oscarsSort = document.getElementById("sort-oscars")!;
        oscarsSort.addEventListener("click", sortByOscars);
        
        const ratingSort = document.getElementById("sort-rating")!;
        ratingSort.addEventListener("click", sortByRating);
        
        const modal = document.getElementById("cast-details")!;
        modal.addEventListener("click", () => {
        modal.classList.add("hidden");
        });
    }
    
    const titleSorter: MovieSorter = (first, second) =>
    first.title.localeCompare(second.title);
    const idSorter: MovieSorter = (first, second) => first.id - second.id;
    
    function sortById() {
        const sortedMovies = movies.slice().sort((a, b) => a.id - b.id);
        displayMovies(sortedMovies);
    }
    
    function sortByTitle() {
        const sortedMovies = movies.slice().sort((a, b) =>
        a.title.localeCompare(b.title));
        displayMovies(sortedMovies);
    }
    
    function sortByDirector() {
        const sortedMovies = movies.slice().sort((a, b) =>
        a.director.localeCompare(b.director));
        displayMovies(sortedMovies);
    }
    
    function sortByYear() {
        const sortedMovies = movies.slice().sort((a, b) => a.year - b.year);
        displayMovies(sortedMovies);
    }
    
    function sortByGenre() {
        const sortedMovies = movies.slice().sort((a, b) => a.genre.join(',').localeCompare(b.genre.join(', ')));
        displayMovies(sortedMovies);
    }
    
    function sortByOscars() {
        const sortedMovies = movies.slice().sort((a, b) =>
        Object.keys(a.oscars).length - Object.keys(b.oscars).length);
        displayMovies(sortedMovies);
    }
    
    function sortByRating() {
        const sortedMovies = movies.slice().sort((a, b) => a.rating - b.rating);
        displayMovies(sortedMovies);
    }
    
    function applyFilter() {
        const titleFilter = (document.getElementById("title-filter") as
        HTMLInputElement).value.toLowerCase();
        const yearFilter = parseInt((document.getElementById("year-filter") as
        HTMLInputElement).value, 10);
        const genreFilter = (document.getElementById("genre-filter") as
        HTMLSelectElement).value;
        const oscarsFilter = (document.getElementById("oscar-filter") as
        HTMLSelectElement).value;
        
        const filteredMovies = movies.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(titleFilter);
        const yearMatch = isNaN(yearFilter) || movie.year === yearFilter;
        const genreMatch = genreFilter === "all" || movie.genre.includes(genreFilter);
        const oscarsMatch = oscarsFilter === "all" || movie.oscars?.[oscarsFilter];
        
        return titleMatch && yearMatch && genreMatch && oscarsMatch;
        });
        
        displayMovies(filteredMovies);
    }
    
    function fillGenreDropdown(movies: Movie[]) {
        const genreFilter = document.getElementById("genre-filter") as
        HTMLSelectElement;
        const genres = new Set<string>();
        
        for (const movie of movies) {
        for (const genre of movie.genre) {
        genres.add(genre);
        }
        }
        
        genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
        });
    }
    
    function displayMovies(movies: Movie[]) {
        const container = document.getElementById("movie-container")!;
        container.innerHTML = "";
        for (const movie of movies) {
        const movieRow = generateMovieRow(movie);
        container.appendChild(movieRow);
        }
    }
    
    function generateMovieRow(movie: Movie) {
        const row = document.createElement("div");
        row.classList.add("movie-row");
        
        const idCell = createMovieCell(movie.id);
        const titleCell = createMovieCell(movie.title);
        const yearCell = createMovieCell(movie.year);
        const directorCell = createMovieCell(movie.director);
        const genreCell = createMovieCell(movie.genre.join(" / "));
        const plotCell = createMovieCell(truncateText(movie.plot, 50));
        const castCell = createMovieCell(formatCastList(movie.cast));
        const oscarsCell = createMovieCell(Object.keys(movie.oscars).length);
        const ratingCell = createMovieCell(movie.rating);
        
        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(yearCell);
        row.appendChild(directorCell);
        row.appendChild(genreCell);
        row.appendChild(plotCell);
        row.appendChild(castCell);
        row.appendChild(oscarsCell);
        row.appendChild(ratingCell);
        
        return row;
    }
    
    function createMovieCell(value: string) {
        const cell = document.createElement("div");
        cell.classList.add("movie-data");
        cell.textContent = value;
        return cell;
    }
    
    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) {
        return text;
        }
        
        const truncatedText = text.substr(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(" ");
        
        if (lastSpaceIndex !== -1) {
            return truncatedText.substr(0, lastSpaceIndex) + "...";
        } else {
            return truncatedText + "...";
        }
    }
    
    function formatCastList(cast: { actor: string; character: string }[]) {
        const sortedCast = cast.slice().sort((a, b) => a.actor.localeCompare(b.actor));
        
        if (sortedCast.length > 5) {
        sortedCast.splice(5);
        sortedCast.push({ actor: "and more", character: "" });
        }
        
        const castNames = sortedCast.map(actor => actor.actor).join(", ");
        
        return castNames.replace(/,([^,]*)$/, " &$1");
    }
    
    function displayCastDetails(cast: { actor: string; character: string }[]) {
        const modal = document.getElementById("cast-details")!;
        const modalContent = document.getElementById("cast-details-content")!;
        modalContent.innerHTML = "";
        
        const castList = document.createElement("ul");
        castList.classList.add("cast-list");
        
        cast.forEach(actor => {
        const castItem = document.createElement("li");
        castItem.textContent = `${actor.actor} as ${actor.character}`;
        castList.appendChild(castItem);
        });
        
        modalContent.appendChild(castList);
        modal.classList.remove("hidden");
    }
    
    async function loadData() {
        const dataUri =
        "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
        const response = await fetch(dataUri);
        
        if (!response.ok) {
        throw new Error("Failed to load movie data");
        }
        
        const data = await response.json();
        return data;
    }