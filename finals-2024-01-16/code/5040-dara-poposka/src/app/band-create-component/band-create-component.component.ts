
import { Component, OnInit } from '@angular/core';
import { BandsService } from '../services/band.service';
@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.css']
})
export class BandCreateComponent implements OnInit {
  band: any = {};

  constructor(private bandService: BandsService) { }

  ngOnInit(): void {
  }

  createBand(): void {
    this.bandService.createBand(this.band).subscribe((band: any) => {
      console.log(band);
    });
  }

}


