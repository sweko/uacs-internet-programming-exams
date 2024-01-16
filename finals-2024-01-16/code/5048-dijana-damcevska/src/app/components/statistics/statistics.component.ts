import { Component, OnInit } from '@angular/core';
import { BandService } from '../../services/band/band.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})

export class StatisticsComponent implements OnInit {
  totalBands: number = 0;
  totalMembers: number = 0;
  totalGenres: number = 0;
  totalAlbums: number = 0;
  bandsPerGenre: { genre: string; count: number }[] = [];
  albumsPerGenre: { genre: string; count: number }[] = [];
  albumsPerDecade: { decade: string; count: number }[] = [];

  constructor(private bandService: BandService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.bandService.getBands().subscribe(bands => {
      this.totalBands = bands.length;
      this.totalMembers = bands.reduce((total, band) => total + band.members.length, 0);
      this.totalGenres = new Set(bands.map(band => band.genre)).size;
      this.totalAlbums = bands.reduce((total, band) => total + band.albums.length, 0);

      this.bandsPerGenre = this.calculateItemsByGenre(bands, 'genre');
      this.albumsPerGenre = this.calculateItemsByGenre(bands, 'albums');
    });
  }

  private calculateItemsByGenre(bands: any[], property: string): { genre: string; count: number }[] {
    const itemsByGenre = new Map<string, number>();

    bands.forEach(band => {
      const key = property === 'genre' ? band.genre : property === 'albums' ? band.albums : null;

      if (key) {
        if (Array.isArray(key)) {
          key.forEach(item => {
            itemsByGenre.set(item, (itemsByGenre.get(item) || 0) + 1);
          });
        } else {
          itemsByGenre.set(key, (itemsByGenre.get(key) || 0) + 1);
        }
      }
    });

    return Array.from(itemsByGenre.entries()).map(([item, count]) => ({ genre: item, count }));
  }

}