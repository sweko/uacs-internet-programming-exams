

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  country: any; // Replace with your actual country model

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService 
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const countryId = +params['id']; 
      this.loadCountryDetails(countryId);
    });
  }

  loadCountryDetails(countryId: number) {
    this.countryService.getCountryById(countryId).subscribe(
      (country: any) => {
        this.country = country;
      },
      (error: any) => {
        console.error('Error loading country details:', error);
      }
    );
  }

  sortedCitiesWithBandCount() {
    if (!this.country || !this.country.cities) {
      return [];
    }

    const citiesWithBandCount = this.country.cities.map((city: any) => {
      const bandCount = city.bands ? city.bands.length : 0;
      return { name: city.name, bandCount };
    });

  
    return citiesWithBandCount.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
  }
}
