import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Band, Place } from '../../models/band';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';
import { BandService } from '../../services/band/band.service';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrl: './band-edit.component.css'
})
export class BandEditComponent {


  band?: Band;
  editForm: FormGroup = new FormGroup({});

  genres$: Observable<string[]> = this.bandsService.getGenre();
  places$: Observable<Place[]> = this.bandsService.getPlaces();
  
  constructor(
    private route: ActivatedRoute,
    private bandsService: BandService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => this.isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.bandsService.getBand(id)),
    ).subscribe({
      next: band => {
        this.band = band;
      },
      error: err => console.log(err)
    })
  }

  isNumeric = (value: string | null): boolean => {
    if (value === null) {
        return false;
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
        return false;
    }
    if (numValue <= 0) {
        return false;
    }
    return true;
}

prepareForm() {
  this.editForm = this.fb.group({ 
    id: [this.band?.id],
    name: [this.band?.name],
    genre: [this.band?.genre],
    formed: [this.band?.formed],
    country: [this.band?.location.split(', ')[1]],
    city: [this.band?.location.split(', ')[0]],
    location: [this.band?.location],
  });
}

updateBand() {
  const updateBand = {
    ...this.band,
    ...this.editForm.value,
  };
  this.bandsService.updateBand(updateBand).subscribe({
    next: () => this.router.navigate(['/bands']),
    error: err => console.log(err),
  });
}



}