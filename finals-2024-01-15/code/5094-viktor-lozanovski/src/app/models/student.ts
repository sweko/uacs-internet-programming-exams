export interface Student {
    id: number;
    name: string;
}

export interface Movie {
    id: string
    title: string
    year: number
    director: string
    genre: string[]
    plot: string
    cast: Cast[]
    rating: number
  }

  export interface Oscar{
    bestPicture: string
    bestDirector: string
    bestActor: string
    bestAdaptedScreenplay: string
  }

  export interface Cast {
    actor: string
    character: string
  }