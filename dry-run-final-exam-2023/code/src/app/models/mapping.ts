import { Author, Book, BookType } from "./client";
import { AuthorResponse, BookResponse, BookTypeResponse } from "./server";

export const toAuthor = (response: AuthorResponse): Author => {
    return {
        id: response.id,
        name: response.name,
        birthDate: new Date(response.birth_date),
        deathDate: response.death_date ? new Date(response.death_date) : undefined,
        nationality: response.nationality,
        books: response.bibliography.map(b => toBook(b))
    }
}

export const toBook = (response: BookResponse): Book => {
    return {
        title: response.name,
        year: response.year,
        type: response.type
    }
}

export const toBookType = (response: BookTypeResponse): BookType => {
    return {
        name: response.name,
        description: response.description
    }
}

const getDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}

export const toAuthorResponse = (author: Author): AuthorResponse => {
    return {
        id: author.id,
        name: author.name,
        birth_date: getDateString(author.birthDate),
        death_date: author.deathDate ? getDateString(author.deathDate) : undefined,
        nationality: author.nationality,
        bibliography: author.books.map(b => toBookResponse(b))
    }

}

export const toBookResponse = (book: Book): BookResponse => {
    return {
        name: book.title,
        year: book.year,
        type: book.type
    }
}