interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string[];
  plot: string;
  cast: { actor: string; character: string }[];
  oscars: { [oscarType: string]: string };
  rating: number;
}

type MovieSorter = (first: Movie, second: Movie) => number;

document.addEventListener("DOMContentLoaded", siteCode);

let movies: Movie[] = [];

async function siteCode() {
  const data = await fetchMovies();
  movies = data;

  fillGenres(movies);

  displayMovies(movies);

  const idSort = document.getElementById("sort-id")!;
  idSort.addEventListener("click", sortById);

  const titleSort = document.getElementById("sort-title")!;
  titleSort.addEventListener("click", sortByTitle);

  const yearSort = document.getElementById("sort-year")!;
  yearSort.addEventListener("click", sortByYear);

  const applyFilterButton = document.getElementById("apply-filter")!;
  applyFilterButton.addEventListener("click", applyFilter);

  const modal = document.getElementById("movie-details")!;
  modal.addEventListener("click", () => {
      modal.classList.add("hidden");
  });
}

const idSorter: MovieSorter = (first, second) => first.id - second.id;
const titleSorter: MovieSorter = (first, second) => first.title.localeCompare(second.title);
const yearSorter: MovieSorter = (first, second) => first.year - second.year;

function sortById() {
  const sortedMovies = movies.sort(idSorter);
  displayMovies(sortedMovies);
}

function sortByTitle() {
  const sortedMovies = movies.sort(titleSorter);
  displayMovies(sortedMovies);
}

function sortByYear() {
  const sortedMovies = movies.sort(yearSorter);
  displayMovies(sortedMovies);
}

function applyFilter() {
  console.log("Applying filter");

  const titleFilter = (document.getElementById("title-filter") as HTMLInputElement).value.toLowerCase();
  const yearFilter = parseInt((document.getElementById("year-filter") as HTMLInputElement).value);
  const genreFilter = (document.getElementById("genre-filter") as HTMLSelectElement).value;

  let filteredMovies = movies.slice(); // Create a copy of the original array

  if (titleFilter) {
      filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase().includes(titleFilter));
  }

  if (!isNaN(yearFilter)) {
      filteredMovies = filteredMovies.filter((movie) => movie.year === yearFilter);
  }

  if (genreFilter !== "all") {
      filteredMovies = filteredMovies.filter((movie) => movie.genre.includes(genreFilter));
  }

  displayMovies(filteredMovies);
}

const applyFilterButton = document.getElementById("apply-filter")!;
applyFilterButton.addEventListener("click", applyFilter);

function fillGenres(movies: Movie[]) {
  const filter = document.getElementById("genre-filter")!;

  const genres = new Set<string>();
  for (const movie of movies) {
      movie.genre.forEach((genre) => genres.add(genre));
  }

  for (const genre of genres) {
      const option = document.createElement("option");
      option.value = genre;
      option.innerHTML = genre;
      filter.appendChild(option);
  }
}



async function fetchMovies(): Promise<Movie[]> {
  try {
      const response = await fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json");

      if (!response.ok) {
          throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      return data as Movie[];
  } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
  }
}

function displayMovies(movies: Movie[]) {
  const container = document.getElementById("movie-container")!;
  container.innerHTML = "";

  movies.forEach((movie) => {
      const movieRow = generateMovieRow(movie);
      container.appendChild(movieRow);
  });
}

function generateMovieRow(movie: Movie) {
  const row = document.createElement("div");
  row.classList.add("movie-table");

  const idCell = document.createElement("div");
  idCell.classList.add("movie-data", "movie-id");
  idCell.innerHTML = movie.id.toString();
  row.appendChild(idCell);

  const titleCell = document.createElement("div");
  titleCell.classList.add("movie-data", "movie-title");
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
  genreCell.innerHTML = movie.genre.join(" / ");
  row.appendChild(genreCell);

  const plotCell = document.createElement("div");
  plotCell.classList.add("movie-data", "movie-plot");
  plotCell.innerHTML = truncateText(movie.plot, 50) + "...";
  row.appendChild(plotCell);

  const castCell = document.createElement("div");
  castCell.classList.add("movie-data", "movie-cast");
  castCell.innerHTML = getFormattedCast(movie.cast);
  row.appendChild(castCell);

  const oscarsCell = document.createElement("div");
  oscarsCell.classList.add("movie-data", "movie-oscars");
  oscarsCell.innerHTML = movie.oscars ? Object.keys(movie.oscars).length.toString() : "0";
  row.appendChild(oscarsCell);

  return row;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
      return text;
  }

  const lastSpaceIndex = text.lastIndexOf(" ", maxLength);
  return text.substring(0, lastSpaceIndex) + "...";
}

function getFormattedCast(cast: { actor: string; character: string }[]): string {
  const sortedCast = cast.sort((a, b) => a.actor.localeCompare(b.actor));
  const truncatedCast = sortedCast.slice(0, 5);
  const formattedCast = truncatedCast.map((actor) => `${actor.actor} as ${actor.character}`).join(", ");
  return truncatedCast.length < cast.length ? formattedCast + " & ..." : formattedCast;
}
