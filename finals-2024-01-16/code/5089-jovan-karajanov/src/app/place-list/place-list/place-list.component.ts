import { Component } from '@angular/core';
import { PlaceServiceService } from '../../service/place-service.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.css'
})
export class PlaceListComponent {

  constructor(private placeService:PlaceServiceService){}

  
}
