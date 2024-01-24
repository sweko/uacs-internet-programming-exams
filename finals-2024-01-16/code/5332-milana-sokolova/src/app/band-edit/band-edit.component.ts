

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Band, Place } from '../models/band';
import { BandsService } from '../bands.service';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrls: ['./band-edit.component.css']
})
export class BandEditComponent implements OnInit {
  band: Band = {
    id: 0,
    name: '',
    formed: 0,
    country: '',
    city: '',
    genre: ''
  };

  places: Place[] = []; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bandsService: BandsService
  ) { }

  ngOnInit(): void {
    const bandId = Number(this.route.snapshot.paramMap.get('id'));
    this.bandsService.getBandById(bandId).subscribe(band => {
      this.band = band;
    });

    this.bandsService.getPlaces().subscribe(places => {
      this.places = places;
    });
  }

  saveBand(): void {
    this.bandsService.updateBand(this.band).subscribe(() => {
      this.router.navigate(['/bands', this.band.id]);
    });
  }
}
