import { Component, Input, OnInit } from '@angular/core';
import Band, { defaultBand } from '../models/band';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrl: './band-edit.component.css'
})
export class BandEditComponent implements OnInit {
  band: Band = defaultBand();

  constructor(private bandService: BandsService, private _activatedRoute: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params['id'];
    this.bandService.getBand(id).subscribe(data => this.band = data);
  }

  onSave(band: {
    name: string;
    formed: number;
    country: string;
    city: string;
    genre: string;
    }) {
      this.bandService.editBrand(this.band.id, band.name, band.formed, band.country, band.city, band.genre).subscribe(_ => {
        this._router.navigate(['/bands'])
      });
  }

  onCancel() {
    this._router.navigate(['/bands']);
  }
}
