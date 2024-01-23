import { Component } from '@angular/core';
import { BandService } from '../band.service'; 
import { Band } from '../models/band';  

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.css'],
})
export class BandCreateComponent {
  newBand = { name: '', genre: '', formed: 0, location: '', members: [], albums: [] }; 

  constructor(private bandService: BandService) {}

 
}
