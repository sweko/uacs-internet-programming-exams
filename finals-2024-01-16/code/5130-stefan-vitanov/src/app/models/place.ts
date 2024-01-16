type Place = {
  id: number,
  country: string,
  cities: string[], // an array of strings, each string is the name of a city
};

export const defaultPlace = (): Place => ({
    id: 0,
    country: "",
    cities: [],
});

export default Place;
