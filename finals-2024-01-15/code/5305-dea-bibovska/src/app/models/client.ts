export interface Student {
    id: number,
    name: string,
    birthdate: string, // a string in the format "Month DD, YYYY"
    height: number, // a value in centimeters
    nationality: string, // a string
    notable_works: Movie[] // an array of strings, each string is the title of a movie
}

export interface Movie {
    id: number,
    title: string,
    year: number, // the year the movie was released
    director: string, // the name of the director
    genre: [string], // an array of strings, each string is the a distinct genre
    plot: string, // a short description of the plot
    rating: number,
    cast: [
      {
        actor: string, // the name of the actor
        character: string // the name of the character played by the actor
      }
    ], // an array of cast objects,
  }