export interface Band {
    id: number;
    name: string;
    genre: string;
    formed: number;
    location: string;
    members: string[];
    albums: Album[];
    [key: string]: any;
}

export interface Album {
    name: string;
    year: number;
}

export interface CountryCities {
    id: number;
    country: string;
    cities: string[];
}