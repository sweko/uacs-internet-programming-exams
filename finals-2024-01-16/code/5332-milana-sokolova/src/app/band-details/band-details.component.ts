import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BandsService } from '../services/band.service';
import { Band } from '../models/band';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.css']
})
export class BandDetailComponent implements OnInit {
  band: Band | undefined;
  yearsActive: string | undefined;
  similarBands: Band[] = [];

  constructor(private route: ActivatedRoute, private bandsService: BandsService) { }

  ngOnInit(): void {
    this.getBandDetails();
  }

  getBandDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bandsService.getBandById(+id).subscribe((band: Band | undefined) => {
        this.band = band;
        this.calculateYearsActive();
      });
    }
  }

  calculateYearsActive(): void {
    if (this.band) {
      const startYear = this.band.formed;
      const endYear = this.calculateEndYear();

      if (endYear === 'present') {
        this.yearsActive = `${startYear} - present`;
      } else {
        this.yearsActive = `${startYear} - ${endYear}`;
      }
    }
  }

  calculateEndYear(): string {
    if (this.band && this.band.albums) {
      const latestAlbum = this.band.albums.reduce((latest: { year: number; }, current: { year: number; }) => {
        return current.year > latest.year ? current : latest;
      });

      const currentYear = new Date().getFullYear();

      if (latestAlbum.year >= currentYear - 2) {
        return 'present';
      } else {
        return latestAlbum.year.toString();
      }
    }

    return 'present';
  }
}