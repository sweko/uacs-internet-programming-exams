import { Component, Input } from '@angular/core';
import Band, { defaultBand } from '../models/band';

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrl: './band.component.css'
})
export class BandComponent {
  @Input()
  band: Band = defaultBand();
}
