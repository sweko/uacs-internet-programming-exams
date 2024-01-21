export interface Movie {
    id: number,
    title: string,
    year: number, // the year the movie was released
    director: string, // the name of the director
    genre: [string], // an array of strings, each string is the a distinct genre
    plot: string, // a short description of the plot
    cast: Cast[],
    rating: number;
}

export interface Cast {
    actor: string, // the name of the actor
    character: string // the name of the character played by the actor
}

export interface Actor {
    id: number,
    name: string,
    birthdate: string, // DATE, NOT STRING
    height: number, // a value in centimeters
    nationality: string, // a string
    notable_works: [string] // an array of strings, each string is the title of a movie
}