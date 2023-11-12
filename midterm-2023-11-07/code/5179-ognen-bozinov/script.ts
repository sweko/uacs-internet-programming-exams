interface CastMember {
    actor: string;
    character: string;
}
interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[];
    plot: string;
    cast: CastMember[];
    oscars: Record<string, string>;
    rating: number;
}



document.addEventListener("DOMContentLoaded", siteCode)

async function siteCode() {
    const data = await loadData();
    displayMovies(data as any);
}

const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json"
    const response = await fetch(dataUri);

    if (!response.ok) {
        throw new Error("The data is not there");
    }

    const data = await response.json();
    return data;
}

const displayMovies = (movies: Movie[]) => {
    const container = document.getElementById("movie-container")!;
    for (const movie of movies) {
        const movieRow = generateMovieRow(movie);
        const truncatedPlot = truncatePlotDescription(movie.plot, 50);
        movie.plot = truncatedPlot; 
        container.appendChild(movieRow);
    }
}

const movieContainer = document.getElementById("movie-container");
    const headers = document.querySelectorAll(".movie-header");
  
    let currentSortColumn = 0;
    let isAscending = true;
  
    headers.forEach((header, index) => {
      header.addEventListener("click", () => {
        const column = index; 
        if (currentSortColumn !== column) {
          isAscending = true;
          currentSortColumn = column;
        } else {
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
        } else {
          return valueB.localeCompare(valueA);
        }
      });
  
      movieContainer.innerHTML = "";
  
      
      movies.forEach(movie => movieContainer.appendChild(movie));
    }





function truncatePlotDescription(plot: string, maxLength: number): string {
    if (plot.length <= maxLength) {
        return plot;
    }

    const words = plot.split(' ');
    let truncatedPlot = '';
    let currentLength = 0;

    for (const word of words) {
        if (currentLength + word.length + truncatedPlot.length > maxLength) {
            break;
        }

        truncatedPlot += word + ' ';
        currentLength += word.length;
    }

    if (truncatedPlot.length < plot.length) {
        truncatedPlot = truncatedPlot.trim() + '...';
    }

    return truncatedPlot;
}

const moviePlot = "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, beginning ...";
const truncatedPlot = truncatePlotDescription(moviePlot, 50);
console.log(truncatedPlot);




const generateMovieRow = (movie: Movie) => {
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
    genreCell.innerHTML = movie.genre.join(" / ");
    row.appendChild(genreCell);

    const plotCell = document.createElement("div");
    plotCell.classList.add("movie-data", "movie-plot");
    plotCell.innerHTML = movie.plot;
    row.appendChild(plotCell);

    const castCell = document.createElement("div");
    castCell.classList.add("movie-data", "movie-cast");

    
    if (movie.cast.length > 5) {
        
        const sortedCast = movie.cast
            .slice()
            .sort((a, b) => a.actor.localeCompare(b.actor)); 

        const truncatedCast = sortedCast.slice(0, 5).map((castMember, index) => {
            if (index === 4) {
                return `${castMember.actor} & ${castMember.character}`;
            }
            return `${castMember.actor}, ${castMember.character}`;
        });

        castCell.innerHTML = truncatedCast.join(", ") + " ...";
    } else {
        
        const formattedCast = movie.cast
            .slice()
            .sort((a, b) => a.actor.localeCompare(b.actor))
            .map((castMember) => `${castMember.actor} as ${castMember.character}`);

        castCell.innerHTML = formattedCast.join("<br>");
    }

    row.appendChild(castCell);


    const oscarsCell = document.createElement("div");
    oscarsCell.classList.add("movie-data", "movie-oscars");
    oscarsCell.innerHTML = Object.keys(movie.oscars).length.toString();
    row.appendChild(oscarsCell);
    const numOscars = Object.keys(movie.oscars).length;
    const formattedOscars = Object.keys(movie.oscars)
        .sort() 
        .map((oscarType) => {
            
            const formattedOscarType = oscarType
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase());

            return `${formattedOscarType}: ${movie.oscars[oscarType]}`;
        });

    oscarsCell.innerHTML = formattedOscars.join("<br>");
    row.appendChild(oscarsCell);
    oscarsCell.innerHTML = `Number of Oscars: ${numOscars}<br>${formattedOscars.join("<br>")}`;
    row.appendChild(oscarsCell);


    const ratingCell = document.createElement("div");
    ratingCell.classList.add("movie-data", "movie-rating");
    ratingCell.innerHTML = movie.rating.toString();
    row.appendChild(ratingCell);

    const truncatedPlot = truncatePlotDescription(movie.plot, 50);
    


    return row;

}


