
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country, City } from '../models/country';
import { BandsService } from '../bands.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  country: Country = { id: 0, name: '', cities: [] };

  constructor(
    private route: ActivatedRoute,
    private bandsService: BandsService
  ) { }

  ngOnInit(): void {
    // Get country ID from route parameters
    const countryId = this.route.snapshot.params['id'];

    // Fetch country details from your service
    this.bandsService.getCountryDetails(countryId).subscribe(country => {
      this.country = country;
    });
  }
}
