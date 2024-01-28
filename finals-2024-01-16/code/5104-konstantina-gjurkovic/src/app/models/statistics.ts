export interface StatisticsData {
    totalBands: number;
    totalMembers: number;
    totalGenres: number;
    totalAlbums: number;
    bandsPerGenre: { genre: string, count: number }[];
    albumsPerGenre: { genre: string, count: number }[];
    albumsPerDecade: { decade: string, count: number }[];
    citiesWithoutBands: number;
  }
  