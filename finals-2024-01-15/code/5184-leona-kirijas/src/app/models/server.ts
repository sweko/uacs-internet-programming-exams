export interface MovieResponse {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: GenreResponse[];
    plot: string;
    cast: CastResponse[];
    oscars: OscarResponse;
    rating: number;
}

export interface CastResponse {
    actor: string;
    character: string;
}

export interface GenreResponse {
    name: string;
    description?: string; 
}

export interface OscarResponse {
    bestPicture?: string;
    bestDirector?: string;
    bestActor?: string;
    bestAdaptedScreenplay?: string;
}