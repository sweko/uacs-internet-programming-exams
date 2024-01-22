export interface Movie {
    findIndex(arg0: (m: any) => boolean): unknown;
    id: number;
    title?: string;
    year?: number; // the year the movie was released
    director?: string; // the name of the director
    genre?: string[]; // an array of strings, each string is the a distinct genre
    plot?: string;
    cast?: Cast[]; //array of cast objects
    //oscars?: Oscar{},   TODO
    rating?: number;
}

export interface Cast {
    actor: string,
    character: string
}

export interface Actor {
    id?: number;
    name?: string;
    birthdate?: string;
    height?: number;
    nationality?: string;
    notable_works?: string[];
}

export interface Genre {
    genre: string;
}

export interface Oscar {
    oscar_type: string;
}