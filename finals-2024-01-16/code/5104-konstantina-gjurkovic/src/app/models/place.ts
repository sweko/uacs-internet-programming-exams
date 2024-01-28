export class Place {
  id: number;
  country: string;
  cities: string[];

  constructor(id: number, country: string, cities: string[]) {
    this.id = id;
    this.country = country;
    this.cities = cities;
  }
}
