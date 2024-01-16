import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Band } from '../models/band';
import { BandService } from '../band.service'; 
import { Observable, throwError } from 'rxjs';
import { BandsService } from '../services/band.services';

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

  genres: string[] = [];
  nameFilter: string = '';

  countriesLoaded: boolean = false;
  genresLoaded: boolean = false;

  constructor(private bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    this.getBands();
   
  }

  sort(column: string): void {
    if (column === this.sortedColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

  
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
    if (confirm('Are you sure you want to delete this band?')) {
      this.bandsService.deleteBand(band.id).subscribe(() => {
        this.getBands();
      });
    }
  }



  }
