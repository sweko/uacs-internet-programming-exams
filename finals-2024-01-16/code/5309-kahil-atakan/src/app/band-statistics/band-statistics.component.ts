import { Component, OnInit } from '@angular/core';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-band-statistics',
  templateUrl: './band-statistics.component.html',
  styleUrls: ['./band-statistics.component.css']
})

export class BandStatisticsComponent implements OnInit {
  totalBands: number = 0;
  totalAlbums: number = 0;
  totalGenres: number = 0;

  constructor(private bandsService: BandsService) { }

  ngOnInit(): void {
    this.bandsService.getStatistics().subscribe(stats => {
      this.totalBands = stats.totalBands;
      this.totalAlbums = stats.totalAlbums;
      this.totalGenres = stats.totalGenres;
    });
  }
}