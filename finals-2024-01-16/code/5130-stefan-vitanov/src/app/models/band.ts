type Band = {
  id: number,
  name: string,
  genre: string,
  formed: number, // the year the band was formed
  location: string, // the city and country where the band was formed
  members: string[], // an array of strings, each string is the name of a band member
  albums: {
    name: string, // the name of the album
    year: number, // the year the album was released
  }[], // an array of album objects
}

export const defaultBand = (): Band => ({
    id: 0,
    name: "",
    genre: "",
    formed: 0,
    location: "",
    members: [],
    albums: [],
});

export default Band;
