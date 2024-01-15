import { Observable } from "rxjs";
import { Oscars, actor, cast, movie } from "./movie";
import { OscarsResponse, actorResponse, castResponse, movieResponse } from "./server";


export const toActor = (response: actorResponse): actor => {
    return{
        id:response.id,
        name: response.name,
        brithdate: response.brithdate,
        height: response.height,
        nationality: response.nationality,
        notable_works: response.notable_works
    }
}

// id:number;
//     name:string;
//     brithdate:string;
//     height: number;
//     nationality: string;
//     notable_works: [string];

export const toMovie = (response: movieResponse): movie => {
    return{
        id: response.id,
        title: response.title,
        year: response.year,
        director: response.director,
        genre: response.genre,
        plot: response.plot,
        cast: response.cast,
        oscars: response.oscars,
        rating: response.rating,
    }
};

// <!-- id: number;
//     title: string;
//     year: number;
//     director: number;
//     genre: [string];
//     plot: string;
//     cast: cast[];
//     oscars: Oscars[];
//     rating: number; -->

export const toCast = (response: castResponse): cast =>{
    return{
        actor: response.actor,
        character: response.character
    }
}

// export interface cast{
//     actor: string;
//     character: string;
// }

export const toOscars = (response: OscarsResponse): Oscars =>{
    return{
        oscar_type: response.oscar_type
    }
} 

// export interface Oscars{
//     oscar_type: string;
// }

export const toActorResponse = (response: actor): actorResponse => {
    return{
        id:response.id,
        name: response.name,
        brithdate: response.brithdate,
        height: response.height,
        nationality: response.nationality,
        notable_works: response.notable_works
    }
}

export const toMovieResponse = (response: movie): movieResponse => {
    return{
        id: response.id,
        title: response.title,
        year: response.year,
        director: response.director,
        genre: response.genre,
        plot: response.plot,
        cast: response.cast,
        oscars: response.oscars,
        rating: response.rating,
    }
};

export const toCastResponse = (response: cast): castResponse =>{
    return{
        actor: response.actor,
        character: response.character
    }
}

export const toOscarsResponse = (response: Oscars): OscarsResponse =>{
    return{
        oscar_type: response.oscar_type
    }
}

