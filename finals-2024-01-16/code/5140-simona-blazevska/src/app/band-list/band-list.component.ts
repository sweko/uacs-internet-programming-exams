import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Band } from '../models/bands';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css'],
})
export class BandListComponent implements OnInit {
  bands: Band[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Band[]>('http://localhost:3000/bands').subscribe((data) => {
      this.bands = data;
      console.log(this.bands); 
    });
  }
  deleteBand(bandId: number): void {
    const url = `http://localhost:3000/bands/${bandId}`;

    this.http.delete(url).subscribe(() => {
    
      this.bands = this.bands.filter((band) => band.id !== bandId);
    });
  }
 
}