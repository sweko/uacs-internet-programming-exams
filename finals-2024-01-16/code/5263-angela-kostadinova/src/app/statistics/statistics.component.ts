// statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { BandService } from '../band.service';
import { Band } from '../models/band';

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
  albumsPerGenre: { genre: string, count: number }[] = [];
  membersPerBand: { band: string, count: number }[] = [];

  constructor(private bandsService: BandService) { }

  ngOnInit(): void {
    this.bandsService.getBands().subscribe((bands: any[]) => {
      this.totalBands = bands.length;
      this.totalMembers = bands.reduce((total: any, band: { members: string | any[]; }) => total + band.members.length, 0);
      this.totalGenres = [...new Set(bands.flatMap(band => band.genre))].length;
      this.totalAlbums = bands.reduce((total, band) => total + band.albums.length, 0);
      this.albumsPerGenre = this.getAlbumsPerGenre(bands);
      this.membersPerBand = this.getMembersPerBand(bands);
    });
  }

  private getAlbumsPerGenre(bands: Band[]): { genre: string, count: number }[] {
    const albumsPerGenre = new Map<string, number>();
    bands.forEach(band => {
      band.albums.forEach(album => {
        album.genre.forEach((genre: string) => {
          if (albumsPerGenre.has(genre)) {
            albumsPerGenre.set(genre, albumsPerGenre.get(genre)! + 1);
          } else {
            albumsPerGenre.set(genre, 1);
          }
        });
      });
    });
    return Array.from(albumsPerGenre.entries()).map(([genre, count]) => ({ genre, count }));
  }

  private getMembersPerBand(bands: Band[]): { band: string, count: number }[] {
    const membersPerBand = bands.map(band => ({ band: band.name, count: band.members.length }));
    return membersPerBand;
  }
}
