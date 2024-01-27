import { Component } from '@angular/core';
import { BandServiceService } from '../../service/band-service.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent {
  constructor(private bandService: BandServiceService){}
  
}
