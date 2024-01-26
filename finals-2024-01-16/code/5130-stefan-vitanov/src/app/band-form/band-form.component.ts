import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Band, { defaultBand } from '../models/band';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-band-form',
  templateUrl: './band-form.component.html',
  styleUrl: './band-form.component.css'
})
export class BandFormComponent implements OnInit{

  constructor(private _placesService: PlacesService) {}

  countries = [""];
  cities = [""];

  @Input()
  band: Band = defaultBand();

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  save = new EventEmitter<{name: string, formed: number, country: string, city: string, genre: string}>();

  bandForm = new FormGroup({
    name: new FormControl(""),
    formed: new FormControl(0),
    country: new FormControl(""),
    city: new FormControl(""),
    genre: new FormControl(""),
  });

  ngOnInit(): void {
    const tmp = this.band.location;
    let [city, country] = ["", ""];
    if (tmp.length > 0) {
      const tmp2 = tmp.split(", ");
      if (tmp2.length > 1) {
        [city, country] = [tmp2[0], tmp2[1]];
      }
    }

    this.bandForm.setValue({
      name: this.band.name,
      formed: this.band.formed,
      country,
      city,
      genre: this.band.genre
    });

    this._placesService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }

  onCountryChange() {
    const country = this.bandForm.value.country!;
    this._placesService.getCities(country).subscribe(data => {
      this.cities = data
    });
  }

  onSubmit() {
    const band = this.bandForm.value;

    this.save.emit({
      name: band.name ?? "",
      formed: band.formed ?? 0,
      city: band.city ?? "",
      country: band.country ?? "",
      genre: band.genre ?? "",
    })
  }

  onCancel() {
    this.cancel.emit();
  }
}
