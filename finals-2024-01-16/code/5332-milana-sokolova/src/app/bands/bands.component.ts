import { Component } from '@angular/core';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrl: './bands.component.css'
})
export class BandsComponent {

}



import { Component, OnInit } from '@angular/core';
import { BandService } from '../band.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css'],
})
export class BandsComponent implements OnInit {
  bands: Band[] = [];
  bands: any[] = [];
  sortBy: string = 'id';
  sortAscending: boolean = true;

  constructor(private bandService: BandService, private router: Router) { }

  ngOnInit(): void {
    this.loadBands();
  }

  loadBands(): void {
    this.bandService.getBands().subscribe(data => {
      this.bands = data;
    });
  }

  viewBand(id: number): void {
    this.router.navigate(['/bands', id]);
  }

  editBand(id: number): void {
    this.router.navigate(['/bands', id, 'edit']);
  }

  deleteBand(id: number): void {

  }

  addMember(id: number): void {
    this.router.navigate(['/bands', id, 'members', 'add']);
  }

  addBand(): void {
    this.router.navigate(['/bands', 'create']);
  }

  sortByColumn(column: string): void {
    if (this.sortBy === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortBy = column;
      this.sortAscending = true;
    }

    this.sortBands();
  }

  private sortBands(): void {
   
  }
}