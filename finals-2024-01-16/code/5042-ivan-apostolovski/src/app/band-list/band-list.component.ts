import { Component, ViewChild } from '@angular/core';
import { Bands } from '../models/student';
import { BandsService } from '../services/bands.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.css'
})
export class BandListComponent {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Bands> = new MatTableDataSource<Bands>()
  bands: Bands[] = [];
  filteredBands: Bands[] = [];
  displayedColumns: string[] = ['id', 'name', 'genre', 'formed', 'location','details', 'edit', 'delete'];


  private _bandsSearch: string = '';

  get bandsSearch(): string {
    return this._bandsSearch;
  }

  set bandsSearch(value: string) {
    this._bandsSearch = value;
    console.log('set list', value)
    this.filteredBands = this.performSearch(value);
    this.dataSource = new MatTableDataSource<Bands>(this.filteredBands);
    this.dataSource.sort = this.sort;
  }

  
  constructor(private bandsService: BandsService, private router: Router) { }


  ngOnInit(): void {
    this.getBands();

  }

  getBands(): void {
    this.bandsService.getBands().subscribe((bands) => {
      this.bands = bands;
      this.filteredBands = this.bands
      this.applyFilters(this.filteredBands);
    });
  }

  applyFilters(bands: Bands[]) {
    this.dataSource = new MatTableDataSource<Bands>(bands);
    this.dataSource.sort = this.sort;
  }

  performSearch(filterBy: string): Bands[] {
    filterBy = filterBy.toLowerCase()
    return this.bands.filter((band: Bands) =>
      band.name.toLowerCase().includes(filterBy));
  }


  onRemove(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this Band?');
    if (confirmDelete) {
      this.bandsService.deleteBand(id).subscribe({
        next: () => {
          this.getBands();
          console.log('Band deleted successfully.');
        }
      });
    }
  }

  goToBandDetails(bandId: number): void {
    this.router.navigate(['/band', bandId]);
  }
}