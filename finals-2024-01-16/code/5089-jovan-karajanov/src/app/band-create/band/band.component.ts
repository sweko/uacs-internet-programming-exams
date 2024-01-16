import { Component } from '@angular/core';
import { BandServiceService } from '../../service/band-service.service';
import { Bands } from '../../models/client';

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
      (createdBand: Bands) => { // Specify the type for createdBand
        console.log('Band created successfully:', createdBand);
        // Optionally, navigate to the band details page or perform other actions
      },
      (error: any) => { // Specify the type for error
        console.error('Error creating band:', error);
      }
    );
  }
  
}
