export interface Bands {
    id: number;
    name: string;
    formed: number;
    location: string;
    genre: string;
    members: string[];
    albums: {
      name: string;
      year: number;
    }[];
    // Bonus properties
    bonusCountry?: string;
    bonusFirstAlbum?: {
      name: string;
      year: number;
    };
    bonusLastAlbum?: {
      name: string;
      year: number;
    };
}

export interface Places{
    id: number,
    country: string,
    cities: [string] 
  }
  
  
