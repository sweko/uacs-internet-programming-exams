import { Component, OnInit } from '@angular/core';
import { PlaceServiceService } from '../../service/place-service.service';
import { Places } from '../../models/places';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  places: Places[] = [];

  constructor(private placeService: PlaceServiceService) { }

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.placeService.getPlaces().subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (error) => {
        console.error('Error loading places:', error);
      }
    });
  }
}
