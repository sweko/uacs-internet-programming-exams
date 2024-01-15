export interface MovieResponse {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[];
    plot: string;
    cast: CastResponse[];
    oscars: { [key: string]: string };
    rating: number;
}

export interface CastResponse {
    actor: string;
    character: string;
}

export interface ActorResponse {
    id: number;
    name: string;
    birthdate: string;
    height: number;
    nationality: string;
    notable_works: string[];
  }
  