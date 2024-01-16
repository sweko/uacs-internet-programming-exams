import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BandsService } from '../services/bands.service';
import { Band } from '../models/client';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Genre } from '../models/genre';
import { Place } from '../models/place';


@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.scss']
})
export class BandListComponent implements OnInit, OnDestroy {

  bands: Band[] = [];
  places: Place[] = [];
  genres: Genre[] = [];
  bandsSubscription$?: Subscription;
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedBand?: Band;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>;

  filterName: string = '';
  filterCountry: string = '';
  filterGenre: string = '';

  constructor(private bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    this.bandsService.getPlaces().subscribe(places => {
      this.places = places;
  
      this.bandsService.getGenres().subscribe({
        next: genres => {
          this.genres = [{ id: 0, name: 'All' }, ...genres];
  
          this.bandsSubscription$ = this.bandsService.getBands({
            name: this.filterName,
            country: this.filterCountry,
            genre: this.filterGenre,
          }).subscribe({
            next: bands => this.bands = bands,
            error: err => console.log(err)
          });
        },
        error: err => console.log(err)
      });
    });
  }
  

  ngOnDestroy(): void {
    this.bandsSubscription$?.unsubscribe();
  }

  deleteBand(band: Band) {
    this.selectedBand = band;
    this.dialog?.nativeElement.showModal();
  }

  editBand(band: Band) {
    this.router.navigate(['/bands', band.id, 'edit']);
  }

  viewBand(band: Band) {
    this.router.navigate(['/bands', band.id]);
  }

  addBand() {
    this.router.navigate(['/bands', 'create']);
  }

  sort(column: string): void {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.bands.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue === bValue) {
        return 0;
      }

      return this.sortDirection === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
  }

  applyFilters() {
    this.bandsService.getBands({
      name: this.filterName,
      country: this.filterCountry,
      genre: this.filterGenre,
    }).subscribe({
      next: bands => this.bands = bands,
      error: err => console.log(err)
    });
  }

  confirmModal() {
    if (this.selectedBand) {
      this.bandsService.deleteBand(this.selectedBand.id).subscribe({
        next: () => {
          this.bands = this.bands.filter(b => b.id !== this.selectedBand!.id);
          this.selectedBand = undefined;
        },
        error: err => console.log(err)
      });
      this.closeModal();
    }
  }

  closeModal() {
    this.selectedBand = undefined;
    this.dialog?.nativeElement.close();
  }
}
