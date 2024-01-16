import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BandService } from '../../services/band/band.service';
import { Router } from '@angular/router';
import { Band, Place } from '../../models/band';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrl: './band-create.component.css'
})
export class BandCreateComponent implements OnInit{

  bandForm: FormGroup;
  genres: string[] = [];

  places$: Observable<Place[]> = this.bandService.getPlaces();

  constructor(
    private formBuilder: FormBuilder,
    private bandService: BandService,
    private router: Router
  ) {
    this.bandForm = this.formBuilder.group({
      name: ['', Validators.required],
      genre: ['', [Validators.required]],
      formed: ['', [Validators.required]],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.bandService.getGenre().subscribe(genres => {
      this.genres = genres;
    });
  }

  saveBand(): void {
    if (this.bandForm.valid) {
      const newBand: Band = {
        id: this.bandForm.value.id,
        name: this.bandForm.value.name,
        genre: this.bandForm.value.genre,
        formed: this.bandForm.value.formed,
        location: this.bandForm.value.location,
        members: [], 
        albums: []
      };

      this.bandService.createBand(newBand).subscribe({
        next: () => {
          this.router.navigate(['/bands', newBand.id]);
        },
        error: err => console.log(err)
      });
    }
  }
}