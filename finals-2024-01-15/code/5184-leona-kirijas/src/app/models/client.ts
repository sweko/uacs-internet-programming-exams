export interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
    genres: Genre[]; 
    plot: string;
    cast: CastMember[];
    oscars: OscarAwards;
    rating: number;
}

export interface CastMember {
    actor: string;
    character: string;
}

export interface Genre {
    name: string;
    description?: string; 
}

export interface OscarAwards {
    bestPicture?: string;
    bestDirector?: string;
    bestActor?: string;
    bestAdaptedScreenplay?: string;
}


export interface Actor {
    id: number;
    name: string;

}