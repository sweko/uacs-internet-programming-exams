
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Band, Place } from '../models/band';
import { BandsService } from '../bands.service';

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.css']
})
export class BandCreateComponent implements OnInit {
  newBand: Band = {
    id: 0, 
    name: '',
    formed: 0,
    country: '',
    city: '',
    genre: ''
  };

  places: Place[] = [];
  constructor(
    private router: Router,
    private bandsService: BandsService
  ) { }

  ngOnInit(): void {
    this.bandsService.getPlaces().subscribe(places => {
      this.places = places;
    });
  }

  saveBand(): void {
    this.bandsService.createBand(this.newBand).subscribe(() => {
      this.router.navigate(['/bands']);
    });
  }
}
