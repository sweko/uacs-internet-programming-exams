import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, flatMap, map, of } from 'rxjs';
import Place from '../models/place';

const places = `[
  {
      "id": 1,
      "country": "England",
      "cities": [
          "Birmingham",
          "Bradford, West Yorkshire",
          "Ipswich",
          "Liverpool",
          "London",
          "Manchester",
          "Oxford",
          "Sheffield",
          "York",
          "Wolverhampton",
          "Worcester"
      ]
  },
  {
      "id": 2,
      "country": "USA",
      "cities": [
          "Agoura Hills, California",
          "Altamonte Springs, Florida",
          "Arlington, Texas",
          "Atlanta, Georgia",
          "Bakersfield, California",
          "Bellevue, Washington",
          "Berkeley, California",
          "Boston, Massachusetts",
          "Brooklyn, New York",
          "Buffalo, New York",
          "Chicago, Illinois",
          "Cortland, New York",
          "Des Moines, Iowa",
          "Fort Lauderdale, Florida",
          "Greenville, South Carolina",
          "Huntington Park, California",
          "Los Angeles, California",
          "New York City, New York",
          "Peoria, Illinois",
          "Richmond, Virginia",
          "Sacramento, California",
          "Seattle, Washington",
          "Tampa, Florida",
          "Tulsa, Oklahoma",
          "Wilmington, Delaware",
          "Worcester, Massachusetts",
          "Yonkers, New York",
          "Zion, Illinois"
      ]
  },
  {
      "id": 3,
      "country": "Sweden",
      "cities": [
          "Falun",
          "Gothenburg",
          "Stockholm",
          "Tumba",
          "Umeå",
          "Uppsala",
          "Örebro",
          "Östersund",
          "Åmål",
          "Ängelholm"
      ]
  },
  {
      "id": 4,
      "country": "Germany",
      "cities": [
          "Berlin",
          "Essen",
          "Frankfurt",
          "Hamburg",
          "Hanover",
          "Munich",
          "Nuremberg",
          "Stuttgart",
          "Wiesbaden"
      ]
  },
  {
      "id": 5,
      "country": "Brazil",
      "cities": [
          "Belo Horizonte",
          "Brasília",
          "Curitiba",
          "Fortaleza",
          "Manaus",
          "Porto Alegre",
          "Recife",
          "Rio de Janeiro",
          "Salvador",
          "São Paulo"
      ]
  },
  {
      "id": 6,
      "country": "Finland",
      "cities": [
          "Kitee",
          "Kuopio",
          "Oulu",
          "Rovaniemi",
          "Savonlinna",
          "Tampere",
          "Turku",
          "Helsinki"
      ]
  },
  {
      "id": 7,
      "country": "Poland",
      "cities": [
          "Gdańsk",
          "Kraków",
          "Lublin",
          "Łódź",
          "Olsztyn",
          "Poznań",
          "Szczecin",
          "Warsaw"
      ]
  },
  {
      "id": 8,
      "country": "Switzerland",
      "cities": [
          "Zurich",
          "Geneva",
          "Basel",
          "Lausanne",
          "Bern",
          "Winterthur",
          "Lucerne",
          "St. Gallen"
      ]
  },
  {
      "id": 9,
      "country": "France",
      "cities": [
          "Ondres",
          "Paris",
          "Lyon",
          "Marseille",
          "Toulouse",
          "Nice",
          "Nantes",
          "Strasbourg",
          "Montpellier",
          "Bordeaux",
          "Lille",
          "Rennes",
          "Reims",
          "Le Havre"
      ]
  }
]`

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  parsedPlaces: Place[] = JSON.parse(places);

  constructor(private _http: HttpClientModule) { }

  getPlaces() {
    return of(JSON.parse(places));
  }

  getCountries() {
    return of(this.parsedPlaces).pipe(map(places => places.map(place => place.country)));
  }

  getCities(country: string) {
    return of(this.parsedPlaces).pipe(
      map(places => places.filter(place => place.country == country).map(place => place.cities)[0])
    );
  }
}
