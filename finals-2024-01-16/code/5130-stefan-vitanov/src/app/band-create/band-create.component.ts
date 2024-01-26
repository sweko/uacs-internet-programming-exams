import { Component } from '@angular/core';
import { BandsService } from '../services/bands.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrl: './band-create.component.css'
})
export class BandCreateComponent {
  constructor(private bandService: BandsService, private _activatedRoute: ActivatedRoute, private _router: Router) {}

  onSave(band: {
    name: string;
    formed: number;
    country: string;
    city: string;
    genre: string;
    }) {
      this.bandService.createBand(band.name, band.formed, band.country, band.city, band.genre).subscribe(_ => {
        this._router.navigate(['/bands'])
      });
  }

  onCancel() {
    this._router.navigate(['/bands']);
  }
}
