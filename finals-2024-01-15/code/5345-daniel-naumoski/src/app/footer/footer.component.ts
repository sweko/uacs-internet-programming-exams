import { Component, Input } from '@angular/core';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() movie: Movie | null = null;
}
