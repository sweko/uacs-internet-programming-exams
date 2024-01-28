import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { BandsService } from '../services/bands.service';
import { Band } from '../models/band';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrls: ['./band-edit.component.css']
})
export class BandEditComponent implements OnInit {
  band: Band | undefined;

  constructor(private route: ActivatedRoute, private bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    const bandId = this.route.snapshot.paramMap.get('id');
    if (bandId) {
      this.bandsService.getBand(+bandId).subscribe(band => this.band = band);
    } else {
      console.error('Invalid band ID');   
    }
  }

  updateBand(): void {
    if (this.band && this.band.id) {
      this.bandsService.updateBand(this.band.id, this.band).subscribe(() => {
        this.router.navigate(['/bands']);
      });
    } else {
      console.error('Band data is incomplete');
    }
  }
}
