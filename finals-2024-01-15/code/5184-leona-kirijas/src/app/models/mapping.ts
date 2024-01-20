import { Movie, CastMember, Genre, OscarAwards } from "./client";
import { MovieResponse, CastResponse, GenreResponse, OscarResponse } from "./server";

export const toMovie = (response: MovieResponse): Movie => {
    return {
        id: response.id,
        title: response.title,
        year: response.year,
        director: response.director,
        genres: response.genre.map(g => toGenre(g)),
        plot: response.plot,
        cast: response.cast.map(c => toCastMember(c)),
        oscars: toOscarAwards(response.oscars),
        rating: response.rating
    }
}

export const toCastMember = (response: CastResponse): CastMember => {
    return {
        actor: response.actor,
        character: response.character
    }
}

export const toGenre = (response: GenreResponse): Genre => {
    return {
        name: response.name,
        description: response.description
    }
}

export const toOscarAwards = (response: OscarResponse): OscarAwards => {
    return {
        bestPicture: response.bestPicture,
        bestDirector: response.bestDirector,
        bestActor: response.bestActor,
        bestAdaptedScreenplay: response.bestAdaptedScreenplay
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
        genre: movie.genres.map(g => ({ name: g.name })), 
        plot: movie.plot,
        cast: movie.cast.map(c => ({ actor: c.actor, character: c.character })),
        oscars: { 
            bestPicture: movie.oscars.bestPicture,
            bestDirector: movie.oscars.bestDirector,
            bestActor: movie.oscars.bestActor,
            bestAdaptedScreenplay: movie.oscars.bestAdaptedScreenplay
        },
        rating: movie.rating
    }
}
