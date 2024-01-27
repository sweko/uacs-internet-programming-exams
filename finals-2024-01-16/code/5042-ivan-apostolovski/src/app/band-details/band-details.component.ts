import { Component, OnInit } from '@angular/core';
import { Bands } from '../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/bands.service';


@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent implements OnInit {


  band?: Bands;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bandsService: BandsService,
  ) {}


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

  getMemberCount(): number {
    return this.band && this.band.members ? this.band.members.length : 0;
  }


  getAlbumCount(): number {
    return this.band && this.band.albums ? this.band.albums.length : 0;
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
