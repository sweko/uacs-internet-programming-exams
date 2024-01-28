import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BandsService } from '../services/bands.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  country: Country | undefined;

  constructor(private route: ActivatedRoute, private bandsService: BandsService) {}

  ngOnInit(): void {
  }
}
