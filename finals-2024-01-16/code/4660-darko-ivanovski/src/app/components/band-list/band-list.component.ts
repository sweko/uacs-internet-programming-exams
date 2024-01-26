import { Component, OnDestroy, OnInit } from '@angular/core';
import { Band } from '../../../service-data/app-data';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BandsService } from '../../services/bands.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.css'
})
export class BandListComponent implements OnInit, OnDestroy {

  bands: Band[] = [];
  selectedBand?: Band;
  private bandsSubscription$?: Subscription;

  constructor(private bandsService: BandsService, private router: Router) { } // Update the service injection

  ngOnInit(): void {
    this.loadBands();
  }

  ngOnDestroy(): void {
    this.bandsSubscription$?.unsubscribe();
  }

  private loadBands(): void {
    this.bandsSubscription$ = this.bandsService.getBands().subscribe(
      bands => this.bands = bands,
      error => console.log(error)
    );
  }

  viewBand(band: Band): void {
    this.router.navigate(['/bands', band.id]);
  }

  editBand(band: Band): void {
    this.router.navigate(['/bands', band.id, 'edit']);
  }

  deleteBand(band: Band): void {
    
  }

  addBand(): void {
    this.router.navigate(['/bands', 'create']);
  }


}