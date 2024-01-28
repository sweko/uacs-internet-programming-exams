import { Component, OnInit } from '@angular/core';
import { BandsService } from '../services/band.service';
import { MockStatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [MockStatisticsService]
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

  constructor(private bandsService: BandsService, private mockStatisticsService: MockStatisticsService) { }

  ngOnInit(): void {
    this.getStatistics();
    this.getBandsPerGenre();
    this.getAlbumsPerGenre();
    this.getAlbumsPerDecade();
    this.getCitiesWithoutBands();
  }

  getStatistics(): void {
    this.bandsService.getBands().subscribe((bands) => {
      this.totalBands = bands.length;
      this.totalMembers = bands.reduce((total, band) => total + band.members.length, 0);
      this.totalAlbums = bands.reduce((total, band) => total + band.albums.length, 0);
  
      this.bandsService.getCountries().subscribe((countries) => {
        this.citiesWithoutBands = 0;
  
        countries.forEach((country) => {
          country.cities.forEach((city) => {
            if (!bands.some((band) => band.location.toLowerCase().includes(city.toLowerCase()))) {
              this.citiesWithoutBands++;
            }
          });
        });
      });
  
      this.bandsService.getGenres().subscribe((genres) => {
        this.totalGenres = genres.length;
      });
    });
  }

  getBandsPerGenre(): void {
    this.mockStatisticsService.getBandsPerGenre().subscribe((data) => {
      this.bandsPerGenre = Object.entries(data).map(([genre, count]) => ({ genre, count: count as number }));
    });
  }

  getAlbumsPerGenre(): void {
    this.mockStatisticsService.getAlbumsPerGenre().subscribe((data) => {
      this.albumsPerGenre = Object.entries(data).map(([genre, count]) => ({ genre, count: count as number }));
    });
  }

  getAlbumsPerDecade(): void {
    this.mockStatisticsService.getAlbumsPerDecade().subscribe((data) => {
      this.albumsPerDecade = Object.entries(data).map(([decade, count]) => ({ decade, count: count as number }));
    });
  }

  getCitiesWithoutBands(): void {
    this.bandsService.getCountries().subscribe((countries) => {
      this.citiesWithoutBands = countries.filter(
        (country) => country.cities.length === 0
      ).length;
    });
  }
}
