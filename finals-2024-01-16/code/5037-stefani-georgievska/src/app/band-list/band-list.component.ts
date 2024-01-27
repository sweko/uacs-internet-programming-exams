import { Component } from '@angular/core';
import { BandServiceService } from '../service/band-service.service';
import { Bands } from '../models/bands';
import { PlaceServiceService } from '../service/place-service.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css']
})
export class BandListComponent {
  sortField: string = ''; 
  sortDirection: string = 'asc';
  bands: Bands[] = [];
  constructor(private bandService: BandServiceService, 
    private placeService: PlaceServiceService){}
  ngOnInit(){
    this.loadBands();
  }
  loadBands() {
    this.bandService.getBands().subscribe({
      next: (bands) => {
        this.bands = bands;
      },
      error: (error) => {
        console.error('Error loading bands:', error);
      }
    });
  }

  sort(field: string) {
  this.sortField = field;
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
 }

}
