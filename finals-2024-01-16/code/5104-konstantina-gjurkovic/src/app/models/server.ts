export interface AlbumResponse {
    name: string;
    year: number;
  }
  
  export interface BandResponse {
    id: number;
    name: string;
    genre: string;
    formed: number;
    location: string;
    members: string[];
    albums: AlbumResponse[];
  }
  
  export interface BandsResponse {
    bands: BandResponse[];
  }