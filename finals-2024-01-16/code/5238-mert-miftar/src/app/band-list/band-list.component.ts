import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css']
})
export class BandListComponent implements OnInit {

  bands: Band[] = [];

  constructor(private bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    this.getBands();
  }

  getBands(): void {
    this.bandsService.getBands().subscribe((bands) => {
      this.bands = bands;
      console.log(bands);
    });
  }

  viewBandDetails(bandId: number): void {
    this.router.navigate(['/band-details', bandId]);
  }
  

  editBand(bandId: number): void {
    this.router.navigate(['/band-edit', bandId]);
  }
  
  statistics(): void {
    this.router.navigate(['/statistics']);
  }

  about(): void {
    this.router.navigate(['/about']);
  }

  create(): void {
    this.router.navigate(['/band-create']);
  }

  deleteBand(band: Band): void {
    if (confirm('Are you sure you want to delete this band?')) {
      this.bandsService.deleteBand(band.id).subscribe(() => {
        this.getBands();
      });
    }
  }
}