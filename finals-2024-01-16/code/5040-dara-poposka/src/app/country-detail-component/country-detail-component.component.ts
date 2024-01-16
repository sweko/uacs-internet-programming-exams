import { Component } from '@angular/core';
import { CountryService } from '../services/country.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-details',
})
export class CountryDetailsComponent {
  country = {};

  constructor(private countryService: CountryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe() => {
      const { id } = params; // Extract the 'id' property from 'params'
      this.countryService.getCountry().subscribe((country: {}) => {
        this.country = country;
      });
    });
  }
}