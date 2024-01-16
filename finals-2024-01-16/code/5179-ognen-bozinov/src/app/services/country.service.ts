
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: Country[] = [
    { id: 1, name: 'Country 1', cities: ['City A', 'City B'] },
    { id: 2, name: 'Country 2', cities: ['City X', 'City Y'] },
  ];

  getCountryById(id: number): Observable<Country | undefined> {
    const country = this.countries.find(c => c.id === id);
    return of(country);
  }
}
