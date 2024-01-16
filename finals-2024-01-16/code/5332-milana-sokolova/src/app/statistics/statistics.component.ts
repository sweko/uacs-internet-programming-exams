// statistics.component.ts

import { Component, OnInit } from '@angular/core';
import { BandsService } from '../bands.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalBands: number = 0;
  totalBandMembers: number = 0;
  totalGenres: number = 0;
  totalAlbums: number = 0;
  bandsPerGenre: { genre: string, count: number }[] = [];
  albumsPerGenre: { genre: string, count: number }[] = [];
  albumsPerDecade: { decade: string, count: number }[] = [];
  citiesWithoutBands: number = 0;
  citiesWithoutBandsList: string[] = [];

  constructor(private bandsService: BandsService) { }

  ngOnInit(): void {
    this.bandsService.getStatistics().subscribe(statistics => {
      this.totalBands = statistics.totalBands;
      this.totalBandMembers = statistics.totalBandMembers;
      this.totalGenres = statistics.totalGenres;
      this.totalAlbums = statistics.totalAlbums;
      this.bandsPerGenre = statistics.bandsPerGenre;
      this.albumsPerGenre = statistics.albumsPerGenre;
      this.albumsPerDecade = statistics.albumsPerDecade;
      this.citiesWithoutBands = statistics.citiesWithoutBands;
      this.citiesWithoutBandsList = statistics.citiesWithoutBandsList;
    });
  }
}
