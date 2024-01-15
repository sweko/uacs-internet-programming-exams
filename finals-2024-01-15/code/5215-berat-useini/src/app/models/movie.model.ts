export interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string[];
  plot: string;
  cast: { actor: string; character: string }[];
  oscars: { [key: string]: string };
  rating: number;
}
