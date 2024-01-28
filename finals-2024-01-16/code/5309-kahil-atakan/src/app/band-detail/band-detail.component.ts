import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BandsService } from '../services/bands.service';
import { Band } from '../models/band';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.css']
})
export class BandDetailComponent implements OnInit {
  band: Band | undefined;

  constructor(private route: ActivatedRoute, private bandsService: BandsService) { }

  ngOnInit(): void {
    this.getBandDetails();
  }

  getBandDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.bandsService.getBandById(+id).subscribe((band: Band | undefined) => {
        this.band = band;
      });
    }
  }
}