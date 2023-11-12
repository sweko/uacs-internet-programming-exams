interface MovieData {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[];
    plot: string;
    cast: {
      actor: string;
      character: string;
    }[];
    oscars: { [oscarType: string]: string };
    rating: number;
  }
  
  
  type MovieSorter = (first: MovieData, second: MovieData) => number;
  
  document.addEventListener("DOMContentLoaded", siteCode);
  
  let movies: MovieData[] = [];
  
  async function siteCode() {
    try {
      const data = await loadData();
      movies = data;
      displayMovies(movies);
  
      const titleSort = document.getElementById("sort-title")!;
      titleSort.addEventListener("click", sortByTitle);
  
      const idSort = document.getElementById("sort-id")!;
      idSort.addEventListener("click", sortById);
  
      const yearSort = document.getElementById("sort-year")!;
      yearSort.addEventListener("click", sortByYear);

      const ratingSort = document.getElementById("sort-rating")!;
      ratingSort.addEventListener("click", sortByRating);
  
      const genreFilter = document.getElementById("genre-filter-select") as HTMLSelectElement;
      genreFilter.addEventListener("change", () => {
        const selectedGenre = genreFilter.value;
        filterMoviesByGenre(selectedGenre);
      });
      
      const oscarsSort = document.getElementById("sort-oscars")!;
      oscarsSort.addEventListener("click", (() => {
              const sortedOscars = movies.slice().sort((a, b) => oscarsSorter(a, b));
              displayMovies(sortedOscars);
          }));
  
      const actorFilterInput = document.getElementById("actor-filter-input") as HTMLSelectElement;
    actorFilterInput.addEventListener("input", () => {
    const actorName = actorFilterInput.value.trim();
    filterMoviesByActor(actorName);
  });
  
  
    } catch (error) {
      console.error("Error loading movie data:", error);
    }
  }
  
  const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = await fetch(dataUri);
  
    if (!response.ok) {
        throw new Error("The data is not there");
    }
  
    const data = await response.json();
    return data;
  }

  
  const titleSorter: MovieSorter = (first, second) => first.title.localeCompare(second.title);
  const idSorter: MovieSorter = (first, second) => first.id - second.id;
  const directorSorter: MovieSorter = (first, second) => first.director.localeCompare(second.director);
  const oscarsSorter: MovieSorter = (first, second) => {
    return Object.keys(first.oscars).length - Object.keys(second.oscars).length;
  };
  
  function sortByTitle() {
    const sortedMovies = movies.slice().sort((a, b) => titleSorter(a, b));
    displayMovies(sortedMovies);
}
  
  const sortById = () => {
    const sortedIds = movies.slice().sort((a, b) => idSorter(a, b));
    displayMovies(sortedIds);
  }
  
  const sortByYear = () => {
    const sortedYears = movies.slice().sort((a, b) => a.year - b.year);
    displayMovies(sortedYears);
  }

  const sortByRating = () => {
    const sortedRatings = movies.slice().sort((a, b) => a.rating - b.rating);
    displayMovies(sortedRatings);
  }

  function sortByDirector() {
    const sortedDirectors = movies.slice().sort((a, b) => directorSorter(a, b));
    displayMovies(sortedDirectors);
}

  
  const displayMovies = (movies: MovieData[]) => {
    const container = document.getElementById("movie-container")!;
    container.innerHTML = "";
  
  const oscarsSort = document.getElementById("sort-oscars")!;
  oscarsSort.addEventListener("click", (() => {
          const sortedOscars = movies.slice().sort((a, b) => oscarsSorter(a, b));
          displayMovies(sortedOscars);
      }));
    for (const movie of movies) {
      const movieRow = generateMovieRow(movie);
      container.appendChild(movieRow);
    }
  }
  
  const generateMovieRow = (movie: MovieData) => {
    const row = document.createElement("div");
    row.classList.add("movie-table");
  
    const idCell = createMovieCell("ID", movie.id);
    const titleCell = createMovieCell("Title", movie.title);
    const directorCell = createMovieCell("Director", movie.director);
    const yearCell = createMovieCell("Year", movie.year);
    const genreCell = createMovieCell("Genre", movie.genre.join(", "));
    const plotCell = createMovieCell("Plot", movie.plot);
    const castArray = movie.cast.map((castMember) => `${castMember.actor} as ${castMember.character}`);
    const castCell = createMovieCell("Cast", castArray.join(", "));
    const oscarsCell = createMovieCell("Oscars", movie.oscars);
    const ratingCell = createMovieCell("Rating", movie.rating);

    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(directorCell);
    row.appendChild(yearCell);
    row.appendChild(genreCell);
    row.appendChild(plotCell);
    row.appendChild(castCell);
    row.appendChild(oscarsCell);
    row.appendChild(ratingCell);
  
    return row;
  }

  const createMovieCell = (header: string, content: string | number | object) => {
    const cell = document.createElement("div");
    cell.classList.add("movie-data", `movie-${header.toLowerCase()}`);
  
    let formattedContent = '';
  
    if (typeof content === 'object') {
      const oscars = content as { [oscarType: string]: string };
      formattedContent = Object.keys(oscars).map((oscarType) => `${oscarType}: ${oscars[oscarType]}`).join(', ');
    } else {
      formattedContent = String(content);
    }
  
    cell.innerHTML = `<strong>${header}:</strong> ${formattedContent}`;
  
    return cell;
  }
  
  
  
  function filterMoviesByGenre(selectedGenre: string) {
    if (selectedGenre === "") {
      displayMovies(movies);
    } else {
      const filteredMovies = movies.filter((movie) => {
        return movie.genre.includes(selectedGenre);
      });
      displayMovies(filteredMovies);
    }
  }
  
  function filterMoviesByActor(actorName: string) {
    const filteredMovies = movies.filter((movie) => {
      const lowerActorName = actorName.toLowerCase();
      return movie.cast.some((castMember) => {
        const actor = castMember.actor.toLowerCase();
        const character = castMember.character.toLowerCase();
        return actor.includes(lowerActorName) || character.includes(lowerActorName);
      });
    });
  
    displayMovies(filteredMovies);
  }
  function filterMoviesByTitle(title: string) {
    const filteredMovies = movies.filter((movie) => {
      const lowerTitle = title.toLowerCase();
      return movie.title.toLowerCase().includes(lowerTitle);
    });
  
    displayMovies(filteredMovies);
  }
    const titleFilterInput = document.getElementById("title-filter-input") as HTMLInputElement;
  
  titleFilterInput.addEventListener("input", () => {
    const title = titleFilterInput.value.trim();
    filterMoviesByTitle(title);
  });
  
  
  const sortByOscars = () => {
    const sortedOscars = movies.slice().sort((a, b) => oscarsSorter(a, b));
    displayMovies(sortedOscars);
  }
  