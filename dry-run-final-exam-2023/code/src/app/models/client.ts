// this is what we work with in the app

export interface Author {
    id: number;
    name: string;
    birthDate: Date;
    deathDate?: Date;
    nationality: string;
    books: Book[];
}

export interface Book {
    title: string;
    year: number;
    type: string;
}

export interface BookType {
    name: string;
    description: string;
}