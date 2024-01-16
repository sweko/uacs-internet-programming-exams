import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BandService } from '../services/band.service';
import { Band } from '../models/band.model';
import { Place } from '../models/place.model';

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.css'],
})
export class BandCreateComponent implements OnInit {
  band: Band = {
    id: 0,
    name: '',
    formed: 0,
    country: '',
    city: '',
    genre: '',
    location: '',
    members: [],
    albums: [],
  };
  countries: string[] = [];
  cities: string[] = [];

  constructor(private bandService: BandService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.bandService.getPlaces().subscribe(
      (places: Place[] | undefined) => {
        if (places && places.length > 0) {
          this.countries = places.map((place) => place.country);
          this.cities = places.reduce<string[]>(
            (allCities, place) => allCities.concat(place.cities),
            []
          );
        } else {
          this.countries = [];
          this.cities = [];
        }
      },
      (error) => {
        console.error('Error loading places:', error);
        this.countries = [];
        this.cities = [];
      }
    );
  }

  saveBand(): void {
    this.bandService.createBand(this.band).subscribe(() => {
      this.router.navigate(['/bands']);
    });
  }
}
