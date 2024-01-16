import { Component } from '@angular/core';
import { BandServiceService } from '../../service/band-service.service';
import { Bands } from '../models/bands';

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrl: './band.component.css'
})
export class BandComponent {

  newBand: Bands = {
    id: 0,
    name: '',
    genre: '',
    formed: 0,
    location: '',
    members: [],
    albums: []
  };
  constructor(private bandService: BandServiceService){}

  addAlbum() {
    this.newBand.albums.push({ name: '', year: 0 });
  }

  createBand() {
    this.bandService.createBand(this.newBand).subscribe(
      (createdBand: Bands) => { 
        console.log('Band created successfully:', createdBand);
       
      },
      (error: any) => { 
        console.error('Error creating band:', error);
      }
    );
  }
  
}