import { Component, Input } from '@angular/core';
import Band, { defaultBand } from '../models/band';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrl: './band-edit.component.css'
})
export class BandEditComponent {
  @Input()
  band: Band = defaultBand();

  onSave() {

  }

  onCancel() {
    
  }
}
