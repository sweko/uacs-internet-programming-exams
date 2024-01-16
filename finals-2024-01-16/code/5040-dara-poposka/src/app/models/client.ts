export interface Band {
    id: number;
    name: string;
    formedYear: number; // the year the band was formed
    origin: string; // the country of origin
    genre: string[]; // an array of strings, each string is a distinct genre
    description: string; // a short description of the band
    members: Member[];
    albums: Album[];
  }
  
  export interface Member {
    id: number;
    name: string;
    birthdate: string; // DATE, NOT STRING
    instrument: string; // the instrument played by the member
  }
  
  export interface Album {
    id: number;
    title: string;
    year: number; // the year the album was released
    genre: string[]; // an array of strings, each string is a distinct genre
    description: string; // a short description of the album
  }