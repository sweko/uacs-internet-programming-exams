import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Band } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css']
})
export class BandListComponent implements OnInit {

  bands: Band[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    this.getBands();
  }

  sortAsc(column: string): void {
    this.sortedColumn = column;
    this.sortDirection = 'asc';
  
    this.sortBands(column);
  
  }
  
  sortDesc(column: string): void {
    this.sortedColumn = column;
    this.sortDirection = 'desc';
  
    this.sortBands(column);
  }
  
  private sortBands(column: string): void {
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