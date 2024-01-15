import { Movie, Actor } from "./client";
import { MovieResponse,ActorResponse} from "./server";

export const toMovie = (response: MovieResponse): Movie => {
    return {
        id: response.id,
        title: response.title,
        year: response.year,
        director: response.director,
        genre: response.genre,
        plot: response.plot,
        cast: response.cast.map(c => toCast(c)),
        oscars: response.oscars,
        rating: response.rating
    };
};

const toCast = (castResponse: any): any => {
    return {
        actor: castResponse.actor,
        character: castResponse.character
    };
};

export const toMovieResponse = (movie: Movie): MovieResponse => {
    return {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        director: movie.director,
        genre: movie.genre,
        plot: movie.plot,
        cast: movie.cast.map(c => toCastResponse(c)),
        oscars: movie.oscars,
        rating: movie.rating
    };
};

const toCastResponse = (cast: any): any => {
    return {
        actor: cast.actor,
        character: cast.character
    };
};

export const toActor = (response: ActorResponse): Actor => {
    return {
      id: response.id,
      name: response.name,
      birthdate: response.birthdate,
      height: response.height,
      nationality: response.nationality,
      notable_works: response.notable_works,
    };
  };
  
  export const toActorResponse = (actor: Actor): ActorResponse => {
    return {
      id: actor.id,
      name: actor.name,
      birthdate: actor.birthdate,
      height: actor.height,
      nationality: actor.nationality,
      notable_works: actor.notable_works,
    };
};