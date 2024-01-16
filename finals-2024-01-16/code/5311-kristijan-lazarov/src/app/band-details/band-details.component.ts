import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bands } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrls: ['./band-details.component.css']
})
export class BandDetailsComponent implements OnInit {


  band?: Bands;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bandsService: BandsService,
  ) { }


  ngOnInit(): void {
    this.getBand();
  }

  getBand(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bandsService.getBand(id).subscribe({
        next: (band) => {
          this.band = band;
          console.log(band)
        }
      });
    }
  }

  onDelete(): void {
    if (this.band) {
      const confirmDelete = confirm(`Are you sure you want to delete "${this.band.name}" ?`);
      if (confirmDelete) {
        this.bandsService.deleteBand(this.band.id).subscribe({
          next: () => {
            console.log('Band deleted successfully.');
            this.router.navigate(['/band-list']);
          }
        });
      }
    }
  }
}