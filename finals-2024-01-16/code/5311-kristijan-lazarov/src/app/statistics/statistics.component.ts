import { Component, OnInit } from '@angular/core';
import { Bands } from '../models/band';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  bands: Bands[] = [];


  constructor(private bandsService: BandsService) { }


  ngOnInit(): void {
    this.getBands(); 
  }

  getBands(): void {
    this.bandsService.getBands().subscribe((bands) => {
      this.bands = bands;
    });
  }

  getBandCount(){
    return this.bands.length;
  }
}