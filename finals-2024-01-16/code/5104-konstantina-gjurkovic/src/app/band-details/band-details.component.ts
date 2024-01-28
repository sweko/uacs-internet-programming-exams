import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/bands.service';
import { Band } from '../models/client';
import { filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../common/utils';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrls: ['./band-details.component.scss']
})
export class BandDetailsComponent implements OnInit {

  band?: Band;
  @ViewChild('confirmationDialog') confirmationDialog?: ElementRef<HTMLDialogElement>;

  constructor(
    private route: ActivatedRoute,
    private bandsService: BandsService,
    private router: Router,
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
      },
      error: err => console.log(err)
    });
  }

  openConfirmationDialog() {
    this.confirmationDialog?.nativeElement.showModal();
  }

  closeConfirmationDialog() {
    this.confirmationDialog?.nativeElement.close();
  }

  deleteBand() {
    this.openConfirmationDialog();
  }

  confirmDelete() {
    console.log('Deleting band:', this.band);
    this.closeConfirmationDialog();
  }

  editBand() {
    this.router.navigate(['/bands', this.band!.id, 'edit']);
  }
}