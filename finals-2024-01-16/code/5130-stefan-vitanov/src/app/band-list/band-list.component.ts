import { Component, OnInit } from '@angular/core';
import { BandsService } from '../services/bands.service';
import Band from '../models/band';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.css'
})
export class BandListComponent implements OnInit {
  bands: Band[] = [];

  constructor(private bandsService: BandsService) {}

  ngOnInit(): void {
    this.bandsService.getBands().subscribe(data => this.bands = data);
  }


}
