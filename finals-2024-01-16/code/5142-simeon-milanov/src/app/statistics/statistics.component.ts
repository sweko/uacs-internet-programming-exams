import { Component, OnInit } from '@angular/core';
import { BandService } from '../services/band.service';
import { Band } from '../models/band.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  totalBands = 0;
  totalBandMembers = 0;
  totalGenres = 0;
  totalAlbums = 0;
  bandsPerGenre: { name: string; count: number }[] = [];
  albumsPerDecade: { name: string; count: number }[] = [];
  citiesWithoutBands = 0;
  citiesWithoutBandsList: string[] = [];

  constructor(private bandService: BandService) {}

  ngOnInit(): void {
    this.calculateStatistics();
  }

  calculateStatistics(): void {
    this.bandService.getBands().subscribe((bands: Band[]) => {
      this.totalBands = bands.length;
      this.totalBandMembers = bands.reduce((total, band) => total + band.members.length, 0);
      this.totalGenres = new Set(bands.map((band) => band.genre)).size;
      this.totalAlbums = bands.reduce((total, band) => total + band.albums.length, 0);

      const bandsByGenre: { [key: string]: number } = {};
      bands.forEach((band) => {
        if (band.genre) {
          bandsByGenre[band.genre] = (bandsByGenre[band.genre] || 0) + 1;
        }
      });
      this.bandsPerGenre = Object.entries(bandsByGenre).map(([name, count]) => ({ name, count }));

      const albumsByDecade: { [key: string]: number } = {};
      bands.forEach((band) => {
        band.albums.forEach((album) => {
          const decade = Math.floor(album.year / 10) * 10;
          albumsByDecade[decade.toString()] = (albumsByDecade[decade.toString()] || 0) + 1;
        });
      });
      this.albumsPerDecade = Object.entries(albumsByDecade).map(([name, count]) => ({ name, count }));

      const allCities = new Set(bands.map((band) => band.city));
      const citiesWithBands = new Set(bands.map((band) => band.city));
      this.citiesWithoutBands = Array.from(allCities).filter((city) => !citiesWithBands.has(city)).length;
      this.citiesWithoutBandsList = Array.from(allCities).filter((city) => !citiesWithBands.has(city));
    });
  }
}
