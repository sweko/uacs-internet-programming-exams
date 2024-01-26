import { Component, OnDestroy, OnInit } from '@angular/core';
import { Band } from '../models/client'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.css'
})
export class BandListComponent implements OnInit, OnDestroy{

  constructor(private bandsService: BandsService, private router: Router ) {}

  bands: Band[]=[];
  bandsSubscription$?: Subscription

  ngOnInit(): void {
    this.bandsSubscription$ = this.bandsService.getBands().subscribe({
     next: bands => this.bands = bands,
     error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.bandsSubscription$?.unsubscribe();
  }

  deleteBand(band: Band){
  }

  editBand(band: Band){
    this.router.navigate(['/bands', band.id, "edit"]);
  }

  viewBand(band: Band){
    this.router.navigate(['/bands', band.id]);
  }

  addBand (){
    this.router.navigate(['/bands', "create"]);

  }

}
