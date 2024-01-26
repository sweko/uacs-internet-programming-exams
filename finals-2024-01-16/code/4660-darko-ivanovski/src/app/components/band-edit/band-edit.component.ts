import { Component, OnInit } from '@angular/core';
import { Band } from '../../../service-data/app-data';
import { BandsService } from '../../services/bands.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../../numeric';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrl: './band-edit.component.css'
})
export class BandEditComponent implements OnInit {

  band?: Band;
  editForm: FormGroup = this.fb.group({
    name: [''],
    formed: [''],
    disbandedDate: [''],
    location: ['']
  });

  constructor(private route: ActivatedRoute, private bandsService: BandsService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.bandsService.getBand(id))
    ).subscribe({
      next: band => {
        this.band = band;
        this.prepareForm();
      },
      error: err => console.log(err)
    });
  }

  private prepareForm(): void {
    if (this.band) {
      this.editForm.patchValue({
        name: this.band.name,
        formed: this.band.formed,
        location: this.band.location
      });
    }
  }

  updateBand(): void {
    if (this.band) {
      const updateBand: Band = {
        ...this.band,
        ...this.editForm.value
      };

      this.bandsService.updateBand(updateBand).subscribe({
        next: () => this.router.navigate(['/bands']),
        error: err => console.log(err)
      });
    }
  }
}
