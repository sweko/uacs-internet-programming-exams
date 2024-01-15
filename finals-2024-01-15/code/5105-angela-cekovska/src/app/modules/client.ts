export interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string[];
    plot: string;
    cast: Cast[];
    oscars: Record<string, string>;
    rating: number;
}

export interface Cast {
    actor: string;
    character: string;
}
