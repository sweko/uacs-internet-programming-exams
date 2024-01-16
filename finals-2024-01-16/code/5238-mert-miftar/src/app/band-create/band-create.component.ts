import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.css']
})
export class BandCreateComponent {
  band: Omit<Band, 'id'> = {
    name: '',
    genre: '',
    formed: new Date().getFullYear(), 
    location: '',
    members: [],
    albums: []
  };

  constructor(private bandsService: BandsService, private router: Router) { }

  saveBand(): void {
    this.bandsService.createBand(this.band as Band).subscribe({
      next: () => this.router.navigate(['/bands']),
      error: (error) => console.error('There was an error!', error)
    });
  }
  
}