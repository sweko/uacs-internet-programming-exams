import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/bands.service';
import { Band } from '../models/client';
import { Observable, filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../common/utils';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrls: ['./band-edit.component.scss']
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
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.bandsService.getBand(id)),
    ).subscribe({
      next: band => {
        this.band = band;
        this.prepareForm();
      },
      error: err => console.log(err)
    });
  }

  prepareForm() {
    this.editForm = this.fb.group({
      name: [this.band?.name],
      genre: [this.band?.genre],
      formed: [this.band?.formed],
      location: [this.band?.location],
      members: [this.band?.members],
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