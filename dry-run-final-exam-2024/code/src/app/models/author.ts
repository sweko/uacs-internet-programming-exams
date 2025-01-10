export interface Author {
    id: number;
    name: string;
    birth_date: string;
    nationality: string;
    bibliography: Book[];
}

export interface Book {
    name: number;
    type: string;
    year: number;
}

