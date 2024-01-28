import { Component, OnInit } from '@angular/core';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  totalBands: number = 0;
  totalMembers: number = 0;
  totalGenres: number = 0;
  totalAlbums: number = 0;
  bandsPerGenre: { genre: string, count: number }[] = [];
  albumsPerGenre: { genre: string, count: number }[] = [];
  albumsPerDecade: { decade: string, count: number }[] = [];
  citiesWithoutBands: number = 0;

  constructor(private bandsService: BandsService) { }

  ngOnInit(): void {
    this.bandsService.getTotalBands().subscribe(total => this.totalBands = total);
    this.bandsService.getTotalBandMembers().subscribe(total => this.totalMembers = total);
    this.bandsService.getTotalGenres().subscribe(total => this.totalGenres = total);
    this.bandsService.getTotalAlbums().subscribe(total => this.totalAlbums = total);
  }
}