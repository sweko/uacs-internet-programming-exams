import { Component, OnInit } from '@angular/core';
import { Band } from '../models/client';
import { BandsService } from '../services/band.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css']
})
export class BandListComponent implements OnInit {
  bands: Band[] | undefined;

  constructor(private bandService: BandsService) { }

  ngOnInit(): void {
    this.bandService.getBands().subscribe((bands: Band[]) => {
      this.bands = bands;
    });
  }
}