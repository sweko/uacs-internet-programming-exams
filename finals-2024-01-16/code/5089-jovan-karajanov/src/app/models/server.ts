export interface BandServerModel {
    id: number;
    name: string;
    genre: string;
    formed: number;
    location: string;
    members: string[];
    albums: AlbumServerModel[];
  }
  
  export interface AlbumServerModel {
    name: string;
    year: number;
  }

  export interface PlaceServerModel {
    id: number;
    country: string;
    cities: string[];
  }