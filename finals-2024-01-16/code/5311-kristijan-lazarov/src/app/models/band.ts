export interface Bands {
    id: number
    name: string
    genre: string
    formed: number
    location: string
    members: string[]
    albums: Albums[]

    country?: string;
    city?: string;
  }
  
  export interface Albums {
    name: string
    year: number
  }
  
  export interface Places {
    id: number;
    country: string;
    cities: string[];
  }
