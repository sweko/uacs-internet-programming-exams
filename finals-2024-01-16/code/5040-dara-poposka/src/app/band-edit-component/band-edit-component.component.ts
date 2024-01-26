
import { Component } from '@angular/core';
import { BandsService } from '../services/band.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-band-edit',
 
})
export class BandEditComponent {
  band = {};

  constructor(private bandService: BandsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bandService.getBand(params['id']).subscribe((band: {}) => {
        this.band = band;
      });
    });
  }

  save() {
    this.bandService.updateBand(this.band).subscribe(() => {
      console.log('Band updated successfully');
    });
  }
}

