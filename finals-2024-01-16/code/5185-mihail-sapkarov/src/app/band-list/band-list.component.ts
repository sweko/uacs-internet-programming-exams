import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Band, CountryCities } from '../models/band';
import { BandsService } from '../services/band.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css']
})
export class BandListComponent implements OnInit {

  bands: Band[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  countryFilter: string | undefined;
  genreFilter: string | undefined;
  countries: CountryCities[] = [];
  genres: string[] = [];
  nameFilter: string = '';

  countriesLoaded: boolean = false;
  genresLoaded: boolean = false;

  constructor(private bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    this.getBands();
    this.getGenres();
    this.getCountries();
  }

  sort(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
  
    this.bands.sort((a, b) => {
      const aValue = column === 'id' ? +a[column] : a[column];
      const bValue = column === 'id' ? +b[column] : b[column];
  
      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  getBands(): void {
    this.bandsService.getBands().subscribe((bands) => {
      this.bands = bands;
      console.log(bands);
    });
  }

  applyFilters(): void {
    this.bandsService.getBands().subscribe((bands) => {
      this.bands = this.filterBands(bands);
    });
  }

  filterBands(bands: Band[]): Band[] {
    return bands.filter(band =>
      this.filterByName(band) &&
      this.filterByGenre(band) &&
      this.filterByCountry(band)
    );
  }

  filterByName(band: Band): boolean {
    return this.nameFilter === '' || band.name.toLowerCase().includes(this.nameFilter.toLowerCase());
  }

  filterByGenre(band: Band): boolean {
    return this.genreFilter === undefined || this.genreFilter === '' || band.genre.toLowerCase().includes(this.genreFilter.toLowerCase());
  }

  filterByCountry(band: Band): boolean {
    return (
      this.countryFilter === undefined ||
      this.countryFilter === '' ||
      band.location.toLowerCase().includes(this.countryFilter.toLowerCase())
    );
  }

  viewBandDetails(band: Band): void {
    this.router.navigate(['/band-details', band.id]);
  }

  editBand(band: Band): void {
    this.router.navigate(['/band-edit', band.id]);
  }

  deleteBand(band: Band): void {
    if (confirm('Dali Sakash da fo izbrishesh Bendot')) {
      this.bandsService.deleteBand(band.id).subscribe(() => {
        this.getBands();
      });
    }
  }

  getGenres(): void {
    this.bandsService.getGenres().subscribe((genres) => {
      this.genres = genres;
      this.genreFilter = '';
      this.genresLoaded = true;
    });
  }

  getCountries(): void {
    this.bandsService.getCountries().subscribe((countries) => {
      this.countries = countries;
      this.countryFilter = undefined;
      this.countriesLoaded = true;
    });
  }
}