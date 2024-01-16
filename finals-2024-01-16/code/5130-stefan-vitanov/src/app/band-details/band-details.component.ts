import { Component, Input } from '@angular/core';
import Band, { defaultBand } from '../models/band';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent {
  private _band: Band = defaultBand()

  country: string = "";
  members: string[] = [];
  albums: {name: string, year: number}[] = [];

  get band() {
    return this._band;
  }

  @Input()
  set band(value: Band) {
    if (value.location.length > 0) {
      const tmp = value.location.split(", ");
      this.country = tmp.length > 1 ? value.location.split(", ")[1] : "";
    }

    this.members = [...value.members];
    this.members.sort();

    this.albums = [...value.albums];
    this.albums.sort((a, b) => b.year - a.year != 0 ? a.year - b.year : a.name.localeCompare(b.name));

    this._band = value;
  }

  

  onSubmmit() {

  }
}
