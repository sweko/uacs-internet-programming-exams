import { Actor, Cast, Movie } from "./client"
import { ActorResponse, CastResponse, MovieResponse } from "./server"

export const toMovie = (response: MovieResponse): Movie => {
    return {
        id: response.id,
        title: response.title,
        year: response.year,
        director: response.director,
        genre: response.genre,
        plot: response.plot,
        cast: response.cast.map(b => toCast(b)),
        rating: response.rating
    }
}

export const toCast = (response: CastResponse): Cast => {
    return {
        actor: response.actor,
        character: response.character
    }
}

export const toActor = (response: ActorResponse): Actor => {
    return {
        id: response.id,
        name: response.name,
        birthdate: response.birth_date,
        height: response.height,
        nationality: response.nationality,
        notable_works: response.notable_works
    }
}


const getDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}



export const toMovieResponse = (movie: Movie): MovieResponse => {
    return {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        director: movie.director,
        genre: movie.genre,
        plot: movie.plot,
        cast: movie.cast.map(b => toCastResponse(b)),
        rating: movie.rating
    }

}

export const toCastResponse = (cast: Cast): CastResponse => {
    return {
        actor: cast.actor,
        character: cast.character
    }
}