
import { Component, OnInit } from '@angular/core';
import { BandService } from '../band.service'; 
import { Band } from '../models/band'; 
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bands-list',
  templateUrl: './bands-list.component.html',
  styleUrls: ['./bands-list.component.css']
})
export class BandsListComponent implements OnInit {
  bands: Band[] = [];
  filteredBands: Band[] = [];
  countries: string[] = []; 
  genres: string[] = [];


  sortColumn: string = '';
  sortDirection: string = 'asc';


  filterName: string = '';
  filterCountry: string = '';
  filterGenre: string = '';

  constructor(private bandService: BandService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBands();

  }

  loadBands(): void {
    this.bandService.getBands().subscribe(data => {
      this.bands = data;
      this.filteredBands = [...this.bands];
    });
  }

  viewBand(id: number): void {

  }

  editBand(id: number): void {

  }

  deleteBand(id: number): void {

  }

  addMember(id: number): void {

  }

  addBand(): void {

  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredBands.sort((a, b) => {

      return this.sortDirection === 'asc' ?
        a[column].localeCompare(b[column]) :
        b[column].localeCompare(a[column]);
    });
  }

  filter(): void {
    this.filteredBands = this.bands
      .filter(band =>
        band.name.toLowerCase().includes(this.filterName.toLowerCase()) &&
        (this.filterCountry === '' || band.location.includes(this.filterCountry)) &&
        (this.filterGenre === '' || band.genre === this.filterGenre)
      );
  }
}
