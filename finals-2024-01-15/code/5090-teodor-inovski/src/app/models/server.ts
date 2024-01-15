
export interface MovieResponse {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: ["string"];
    plot: string;
    cast: castResponse[];
    oscars: OscarsResponse[];
    rating: number;


}

export interface castResponse{
    actor:string;
    character: string;
}


export interface OscarsResponse {
    "<oscar-type>": string;
   
}

