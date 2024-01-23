import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BandsService } from '../services/band.services';
import { Band,  } from '../models/band';

@Component({
  selector: 'app-band-add',
  templateUrl: './band-add.component.html',
  styleUrls: ['./band-add.component.css']
})
export class BandAddComponent {
  newBand: Band = {
    id: 0, name: '', genre: '', formed: 0, location: '', members: [], albums: [],
    addBand: function (newBand: Band): unknown {
      throw new Error('Function not implemented.');
    }
  };
 

  constructor(private bandsService: BandsService, private router: Router) {}

  addBand(): void {
    this.bandsService.addBand(this.newBand).subscribe(() => {
      this.router.navigate(['/band-list']);
    });
  }


}