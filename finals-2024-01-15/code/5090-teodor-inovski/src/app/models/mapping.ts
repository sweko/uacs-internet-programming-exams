import {Movie, Cast, Oscars} from './client';
import { MovieResponse, castResponse, OscarsResponse } from './server';

export const toMovie = (response: MovieResponse): Movie => {
    return {
        id: response.id,
        title: response.title,
        year: response.year,
        director: response.director,
        genre: response.genre,
        plot: response.plot,
        cast: response.cast.map(c=>toCast(c)),
        oscars: response.oscars,
        rating: response.rating

    }
}


export const toOscars = (response: OscarsResponse): Oscars =>{
    return{
        "<oscar-type>": response['<oscar-type>']
    }
}
export const toCast = (response: castResponse): Cast => {
    return {
        actor: response.actor,
        character: response.character
    }
}

export const toMovieResponse = (movie: Movie): MovieResponse=>{
    return{
        id:movie.id,
        title: movie.title,
        year: movie.year,
        director: movie.director,
        genre: movie.genre,
        plot: movie.plot,
        cast: movie.cast.map(c=>toCast(c)),
        oscars: movie.oscars,
        rating: movie.rating

    }
}

export const toCastResponse = (cast:Cast): castResponse=>{
    return{
        actor: cast.actor,
        character: cast.character
    }
}

export const toOscarResponse = (oscar: Oscars): OscarsResponse=>{
    return{
      "<oscar-type>": oscar['<oscar-type>']
    }
}