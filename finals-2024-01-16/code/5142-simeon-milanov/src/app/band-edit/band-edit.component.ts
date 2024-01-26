import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandService } from '../services/band.service';
import { Band } from '../models/band.model';
import { Place } from '../models/place.model';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrls: ['./band-edit.component.css'],
})
export class BandEditComponent implements OnInit {
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

  constructor(
    private bandService: BandService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBandDetails();
    this.loadPlaces();
  }

  loadBandDetails(): void {
    const bandId = this.route.snapshot.paramMap.get('id');
    if (bandId) {
      this.bandService.getBandById(bandId).subscribe(
        (band: Band | undefined) => {
          if (band) {
            this.band = band;
          }
        },
        (error) => {
          console.error('Error loading band details:', error);
        }
      );
    }
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
    if (this.band && this.band.id) {
      this.bandService.updateBand(this.band.id.toString(), this.band).subscribe(() => {
        this.router.navigate([`/bands/${this.band.id}`]);
      });
    }
  }
}
