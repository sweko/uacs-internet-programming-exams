import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/bands.service';
import { Band } from '../models/band';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrls: ['./band-details.component.css']
})
export class BandDetailsComponent implements OnInit {
  band: Band | undefined;

  constructor(private route: ActivatedRoute, private bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    const bandId = this.route.snapshot.paramMap.get('id');
    if (bandId) {
      this.bandsService.getBand(+bandId).subscribe(band => this.band = band);
    } else {
      console.error('Band ID is not available');
    }
  }

  editBand(bandId: number): void {
    this.router.navigate(['/bands', bandId, 'edit']);
  }
}
