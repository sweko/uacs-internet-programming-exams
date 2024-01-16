import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BandService } from '../../services/band/band.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Band } from '../../models/band';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.css'
})
export class BandListComponent  implements OnInit, OnDestroy{

  constructor(
    private bandsService: BandService, 
    private router: Router
  ) {}

  bands: Band[] = [];
  bandsSubscription$?: Subscription;
  selectedBand?: Band;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>;
  
  sortColumn: keyof Band = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.bandsSubscription$ = this.bandsService.getBands().subscribe({
      next: bands => this.bands = bands,
      error: err => console.log(err)
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
    this.router.navigate(['/bands', band.id, "edit"]);
  }

  viewBand(band: Band) {
    this.router.navigate(['/bands', band.id]);
  }

  addBand() {
    this.router.navigate(['/bands', "create"]);
  }

  updateSorting(column: keyof Band): void {
    if (column === this.sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortBands();
  }

  sortBands(): void {
    this.bands.sort((a, b) => {
      const valueA = this.getSortingValue(a, this.sortColumn);
      const valueB = this.getSortingValue(b, this.sortColumn);

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortingValue(band: Band, column: keyof Band): any {
    if (column === 'members') {
      return band.members.length;
    } else if (column === 'albums') {
      return band.albums.length;
    } else {
      return band[column];
    }
  }

  confirmModal() {
    this.bandsService.deleteBand(this.selectedBand!.id).subscribe({
      next: () => {
        this.bands = this.bands.filter(a => a.id !== this.selectedBand!.id);
        this.selectedBand = undefined;
      },
      error: err => console.log(err)
    });
    this.closeModal();
  }

  closeModal() {
    this.selectedBand = undefined;
    this.dialog?.nativeElement.close();
  }

}