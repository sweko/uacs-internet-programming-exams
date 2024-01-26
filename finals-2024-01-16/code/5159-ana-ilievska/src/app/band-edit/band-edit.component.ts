import { Component } from '@angular/core';
import { BandsService } from '../services/bands.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Band } from '../models/client';
import { filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../numeric';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrl: './band-edit.component.css'
})
export class BandEditComponent {

  band?: Band;
  editForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private bandsService: BandsService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map (params => params.get('id')),
      filter (id => isNumeric(id)),
      map (id => parseInt(id!, 10)),
      switchMap (id => this.bandsService.getBands()),
    ).subscribe({
      next: band => {
        this.band = band;
      },
      error: err => console.log(err)
    })
  }

  prepareForm() {
    this.editForm = this.fb.group({
      name: [this.band?.name],
      genre: [this.band?.genre],
      formed: [this.band?.formed],
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
