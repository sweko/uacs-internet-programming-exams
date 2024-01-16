
export interface Band {
    addBand(newBand: Band): unknown;
    id: number;
    name: string;
    genre: string;
    formed: number;
    location: string;
    members: string[];
    albums: Album[];
  }
  
  export interface Album {
    genre: any;
    name: string;
    year: number;
  }
  