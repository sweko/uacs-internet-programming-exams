export interface BandResponse {
    id: number;
    name: string;
    genre: string;
    formed: number; 
    location: string; 
    members: string[]; 
    albums: AlbumResponse[]; 
}

export interface AlbumResponse {
    name: string; 
    year: number; 
}

export interface PlaceDataResponse {
    id: number;
    country: string;
    cities: string[];
  }