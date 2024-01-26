import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../../services/bands.service';
import { filter, map, switchMap } from 'rxjs';
import { isNumeric } from '../../numeric';
import { Band } from '../../../service-data/app-data';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent implements OnInit {

  band?: Band;

  constructor(private route: ActivatedRoute, private bandsService: BandsService, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.bandsService.getBand(id))
    ).subscribe({
      next: band => this.band = band,
      error: err => console.log(err)
    });
  }

  editBand(): void {
    if (this.band) {
      this.router.navigate(['/bands', this.band.id, 'edit']);
    }
  }

  deleteBand(): void {
    // Implement the delete logic using this.band.id
  }

}
