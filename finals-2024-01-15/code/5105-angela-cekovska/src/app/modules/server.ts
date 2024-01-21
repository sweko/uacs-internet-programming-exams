export interface MovieResponse {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[];
    plot: string;
    cast: CastResponse[];
    oscars: Record<string, string>;
    rating: number;
}

export interface CastResponse {
    actor: string;
    character: string;
}
