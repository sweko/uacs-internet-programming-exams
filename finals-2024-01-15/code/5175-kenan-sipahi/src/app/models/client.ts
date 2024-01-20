export interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[];
    plot: string;
    cast: Cast[];
    oscars: { [key: string]: string };
    rating: number;
}

export interface Cast {
    actor: string;
    character: string;
}

export interface Actor {
    id: number;
    name: string;
    birthdate: string;
    height: number;
    nationality: string;
    notable_works: string[];
  }
  