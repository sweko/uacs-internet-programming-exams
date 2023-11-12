 
interface Cast {
    actor: string;
    character: string;
  }
 
  interface Oscars {
    [key: string]: string;
  }
 
  interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[];
    plot: string;
    cast: Cast[];
    oscars: Oscars;
    rating: number;
  }
 
 
  async function getMovies(): Promise<Movie[]> {
    const response = await fetch('https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<Movie[]>;
  }
 
 
 
  function truncatePlot(plot: string, maxLength: number): string {
    if (plot.length <= maxLength) return plot;
    let trimmedString = plot.substr(0, maxLength);
    if (trimmedString.lastIndexOf(' ') > 0) {
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
    }
    return `${trimmedString}...`;
  }
 
 
function formatGenres(genres: string[]): string {
    return genres.join(' / ');
  }
 
 
  function formatCast(cast: Cast[]): string {
    return cast.sort((a, b) => a.actor.localeCompare(b.actor))
               .slice(0, 5)
               .map((member, index, arr) => {
                 const actorName = `<strong>${member.actor}</strong>`;
                 const characterName = ` as ${member.character}`;
                 return index === arr.length - 1 && arr.length < 6 ? actorName + characterName : actorName + characterName + (index === arr.length - 2 ? ' &' : ', ');
               })
               .join('') + (cast.length > 5 ? '...' : '');
  }
 
 
  function formatOscars(oscars: Oscars): string {
    const oscarEntries = Object.entries(oscars)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()} won by ${value}`);
    return oscarEntries.sort().join('<br>');
  }
 
 
  function createMovieHTML(movie: Movie): HTMLElement {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-table');
 
    const idDiv = document.createElement('div');
    idDiv.classList.add('movie-data');
    idDiv.textContent = movie.id.toString();
 
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('movie-data');
    titleDiv.textContent = movie.title;
 
    const directorDiv = document.createElement('div');
    directorDiv.classList.add('movie-data');
    directorDiv.textContent = movie.director;
 
    const yearDiv = document.createElement('div');
    yearDiv.classList.add('movie-data');
    yearDiv.textContent = movie.year.toString();
 
    const genreDiv = document.createElement('div');
    genreDiv.classList.add('movie-data');
    genreDiv.textContent = formatGenres(movie.genre);
 
    const plotDiv = document.createElement('div');
    plotDiv.classList.add('movie-data');
    plotDiv.textContent = truncatePlot(movie.plot, 50);
 
    const castDiv = document.createElement('div');
    castDiv.classList.add('movie-data');
    castDiv.innerHTML = formatCast(movie.cast);
 
    const oscarsDiv = document.createElement('div');
    oscarsDiv.classList.add('movie-data');
    oscarsDiv.innerHTML = formatOscars(movie.oscars);
 
 
    movieContainer.appendChild(idDiv);
    movieContainer.appendChild(titleDiv);
    movieContainer.appendChild(directorDiv);
    movieContainer.appendChild(yearDiv);
    movieContainer.appendChild(genreDiv);
    movieContainer.appendChild(plotDiv);
    movieContainer.appendChild(castDiv);
    movieContainer.appendChild(oscarsDiv);
 
    return movieContainer;
  }
 
 
  let currentSort: { field: keyof Movie | null, ascending: boolean } = {
    field: null,
    ascending: true
  };
 
  function sortMovies(movies: Movie[], sortField: keyof Movie, ascending: boolean): Movie[] {
    return movies.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
 
      if (sortField === 'genre') {
 
        const genreLengthComparison = a.genre.length - b.genre.length;
        if (genreLengthComparison !== 0) return ascending ? genreLengthComparison : -genreLengthComparison;
 
 
        const sortedGenresA = [...a.genre].sort();
        const sortedGenresB = [...b.genre].sort();
        for (let i = 0; i < sortedGenresA.length; i++) {
          const comparison = sortedGenresA[i].localeCompare(sortedGenresB[i]);
          if (comparison !== 0) return ascending ? comparison : -comparison;
        }
 
        return 0; 
      } else if (sortField === 'cast') {
 
        const castLengthComparison = a.cast.length - b.cast.length;
        if (castLengthComparison !== 0) return ascending ? castLengthComparison : -castLengthComparison;
 
 
        for (let i = 0; i < a.cast.length; i++) {
          const comparison = a.cast[i].actor.localeCompare(b.cast[i].actor);
          if (comparison !== 0) return ascending ? comparison : -comparison;
        }
 
        return 0; 
      } else if (typeof valA === 'string' && typeof valB === 'string') {
 
        return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
 
        return ascending ? valA - valB : valB - valA;
      }
 
 
      return 0;
    });
  }
 
  async function populateGenreDropdown() {
    const movies = await getMovies();
    const genres = new Set(movies.flatMap(movie => movie.genre));
    const genreSelect = document.getElementById('filter-genre');
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genre;
      if (genreSelect) {
        genreSelect.appendChild(option);
      }
    });
  }
 
 
  async function populateOscarsDropdown() {
    const movies = await getMovies();
    const oscars = new Set(movies.flatMap(movie => Object.keys(movie.oscars)));
    const oscarSelect = document.getElementById('filter-oscars');
    oscars.forEach(oscar => {
      const option = document.createElement('option');
      option.value = oscar;
      option.textContent = oscar.replace(/([A-Z])/g, ' $1').trim(); 
      if (oscarSelect) {
        oscarSelect.appendChild(option);
      }
    });
  }
 
 
  function applyFilters(movies: Movie[]) {
    const titleElement = document.getElementById('filter-title') as HTMLInputElement;
    const titleFilter = titleElement ? titleElement.value.toLowerCase() : '';
 
    const yearElement = document.getElementById('filter-year') as HTMLInputElement;
    const yearFilter = yearElement ? parseInt(yearElement.value, 10) : NaN;
 
    const genreElement = document.getElementById('filter-genre') as HTMLInputElement;
    const genreFilter = genreElement ? genreElement.value : '';
 
    const oscarElement = document.getElementById('filter-oscars') as HTMLInputElement;
    const oscarFilter = oscarElement ? oscarElement.value : '';
 
    return movies.filter((movie: Movie) => {
      const titleMatch = movie.title.toLowerCase().includes(titleFilter);
      const yearMatch = isNaN(yearFilter) || movie.year === yearFilter;
      const genreMatch = !genreFilter || movie.genre.includes(genreFilter);
      const oscarMatch = !oscarFilter || movie.oscars.hasOwnProperty(oscarFilter);
 
      return titleMatch && yearMatch && genreMatch && oscarMatch;
    });
  }
 
 
  function handleSearchButtonClick() {
    displayMoviesWithFilters();
  }
 
  function setUpSearchButton() {
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
      searchButton.addEventListener('click', handleSearchButtonClick);
    }
  }
 
 
  async function displayMoviesWithFilters() {
    let movies = await getMovies();
 
 
    const titleElement = document.getElementById('filter-title') as HTMLInputElement;
    const yearElement = document.getElementById('filter-year') as HTMLInputElement;
    const genreElement = document.getElementById('filter-genre') as HTMLInputElement;
    const oscarElement = document.getElementById('filter-oscars') as HTMLInputElement;
 
    const titleFilter = titleElement.value.trim().toLowerCase();
    const yearFilter = parseInt(yearElement.value, 10);
    const genreFilter = genreElement.value;
    const oscarFilter = formatOscar(oscarElement.value)
 
    movies = movies.filter((movie) => {
      const titleMatch = titleFilter ? movie.title.toLowerCase().includes(titleFilter) : true;
      const yearMatch = !isNaN(yearFilter) ? movie.year === yearFilter : true;
      const genreMatch = genreFilter ? movie.genre.includes(genreFilter) : true;
      const oscarMatch = oscarFilter ? movie.oscars.hasOwnProperty(oscarFilter) : true;
 
      return titleMatch && yearMatch && genreMatch && oscarMatch;
    });
 
    if (currentSort.field === null) {
        currentSort.field = 'id';
      }
 
 
      displayMovies(currentSort.field, currentSort.ascending, movies);
 
  }
 
 
function formatOscar(oscarValue: string): string {
    if (!oscarValue) return '';
    return oscarValue.replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    ).replace(/\s+/g, '');
  }
 
 
  async function displayMovies(sortField: keyof Movie = 'id', ascending = true, movies?: Movie[]) {
 
    if (!movies) {
      movies = await getMovies();
    }
    try {
 
 
      if (sortField) {
        movies = sortMovies(movies, sortField, ascending);
      }
 
 
      const movieContainer = document.getElementById('movie-container');
      if (movieContainer) {
        movieContainer.innerHTML = '';
 
        movies.forEach((movie) => {
          const movieHTML = createMovieHTML(movie);
          movieContainer.appendChild(movieHTML);
        });
      }
    } catch (error) {
      console.error('There was an error fetching or displaying the movie data: ', error);
    }
  }
 
  function handleHeaderClick(sortField: keyof Movie) {
 
    currentSort.ascending = (sortField === currentSort.field) ? !currentSort.ascending : true;
    currentSort.field = sortField;
    displayMovies(sortField, currentSort.ascending);
    updateSortArrows();
  }
 
  function updateSortArrows() {
    const headers = document.querySelectorAll<HTMLElement>('.movie-header');
    headers.forEach(header => {
 
      header.innerHTML = header.innerHTML.replace(/ ?\u{2191}|\u{2193}/gu, '');
 
 
      if (header.dataset.field === currentSort.field) {
        const arrow = currentSort.ascending ? '\u2191' : '\u2193';
        header.innerHTML += ` ${arrow}`;
      }
    });
  }
 
 
  function setUpSortingHeaders() {
    const headers = document.querySelectorAll<HTMLElement>('.movie-header');
    headers.forEach(header => {
      if (header.dataset.field) {
        header.style.cursor = 'pointer';
 
        header.addEventListener('click', () => handleHeaderClick(header.dataset.field as keyof Movie));
      }
    });
  }
 
 
 
  document.addEventListener('DOMContentLoaded', () => {
    setUpSortingHeaders();
    populateGenreDropdown();
    populateOscarsDropdown();
    setUpSearchButton(); 
 
    document.getElementById('filter-title')?.addEventListener('input', displayMoviesWithFilters);
    document.getElementById('filter-year')?.addEventListener('input', displayMoviesWithFilters);
    document.getElementById('filter-genre')?.addEventListener('change', displayMoviesWithFilters);
    document.getElementById('filter-oscars')?.addEventListener('change', displayMoviesWithFilters);
    displayMovies("id", true);
  });
 