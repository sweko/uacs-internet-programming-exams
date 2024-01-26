import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Band } from '../models/bands';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.css'],
})
export class BandDetailComponent implements OnInit {
  band: Band | undefined;
  yearsActive: string | undefined;
  similarBands: Band[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const bandId = +params['id']; // Convert the ID to a number
      this.loadBandDetails(bandId);
    });
  }

  loadBandDetails(bandId: number): void {
    // Fetch band details based on the ID
    const url = `http://localhost:3000/bands/${bandId}`;

    this.http.get<Band>(url).subscribe((data) => {
      this.band = data;
      console.log(this.band);

      if (this.band?.formed) {
        const currentYear = new Date().getFullYear();
        this.yearsActive = `${this.band.formed} - ${currentYear}`;
      }
    });
  }
}