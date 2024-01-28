import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  country: Country | null = null;

  constructor(private route: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const countryId = params.get('id');
      
      if (countryId) {
        this.countryService.getCountryById(parseInt(countryId, 10)).subscribe(country => {
          this.country = country ?? null;
        });
      } else {
        this.country = null;
      }
    });
  }
}
