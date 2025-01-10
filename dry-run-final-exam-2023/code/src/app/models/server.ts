/// this is what we get from the API

export interface AuthorResponse {
    id: number;
    name: string;
    birth_date: string;
    death_date?: string;
    nationality: string;
    bibliography: BookResponse[];
}

export interface BookResponse {
    name: string;
    year: number;
    type: string;
}

export interface BookTypeResponse {
    name: string;
    description: string;
}