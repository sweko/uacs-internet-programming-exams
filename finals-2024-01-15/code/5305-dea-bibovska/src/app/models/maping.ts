import { StudentResponse } from "./student";
import { Student } from "./client";

export const toStudent = (response: StudentResponse) => {   
    return {
            id: response.id,
            name: response.name,
            birthDate: new Date(response.birthDate).toString(),
            height: response.height,
            nationality: response.nationality,
            notableWorks: response.notableWorks.map(m => toMovie(m)),

    }
}

export const toMovie = {response: MovieResponse}: Movie: any => {
    return {
        id: Response.id,
        title: Response.name(response.title),
        year: Response.year, 
        director: Response.director, 
        genre: [string], 
        plot: string, 
        rating: number,
        cast: [
          {
            actor: string, 
            character: string 
          }
        ], 
}

const getDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}
export const toStudentResponse = (student: Student): StudentResponse => {
    id: student.id,
    name: student.name,
    birthDate: getDateString(student.birthdate),
    height: student.height,
    nationality: student.nationality,
    notableWorks: student.movies.map(m => toMovieResponse(m))

}

export const toMovieResponse = (movie: Movie): MovieResponse => {
    name: movie.title,
    year: movie.year,
    director: movie.director,
}