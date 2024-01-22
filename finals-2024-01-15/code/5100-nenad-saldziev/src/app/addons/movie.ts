export interface movie{
    id: number;
    title: string;
    year: number;
    director: string;
    genre: [string];
    plot: string;
    cast: cast[];
    oscars: Oscars[];
    rating: number;
}

// export interface genre{
// }

export interface cast{
    actor: string;
    character: string;
}

export interface Oscars{
    oscar_type: string;
}

export interface actor{
    id:number;
    name:string;
    brithdate:string;
    height: number;
    nationality: string;
    notable_works: [string];
}

    // "id": "number",
    // "title": "string",
    // "year": "number", // the year the movie was released
    // "director": "string", // the name of the director
    // "genre": ["string"], // an array of strings, each string is the a distinct genre
    // "plot": "string", // a short description of the plot
    // "cast": [
    //     {
    //       "actor": "string", // the name of the actor
    //       "character": "string" // the name of the character played by the actor
    //     }
    //   ], // an array of cast objects,
    //   "oscars": {
    //     "<oscar-type>": "string"
    //     // ...
    //     // where <oscar-type> is the type of the oscar won
    //     // and the value is the recipient of the oscar
    //   },
    // "rating": "number"