import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BandService } from '../services/band.service';
import { Band } from '../models/band.model';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css'],
})
export class BandListComponent implements OnInit {
  bands: Band[] = [];

  constructor(private bandService: BandService, private router: Router) {}

  ngOnInit(): void {
    this.loadBands();
  }

  loadBands(): void {
    this.bandService.getBands().subscribe((bands) => {
      this.bands = bands;
    });
  }

  navigateToCreatePage(): void {
    this.router.navigate(['/bands/create']);
  }

  navigateToDetailsPage(bandId: string): void { 
    this.router.navigate([`/bands/${bandId}`]);
  }

  navigateToEditPage(bandId: string): void {
    this.router.navigate([`/bands/${bandId}/edit`]);
  }

  confirmDelete(bandId: string): void {
    const isConfirmed = confirm('Are you sure you want to delete this band?');
    if (isConfirmed) {
      this.deleteBand(bandId);
    }
  }

  deleteBand(bandId: string): void {
    this.bandService.deleteBand(bandId).subscribe(() => {
      this.loadBands();
    });
  }

  getFirstAlbumInfo(band: Band): string {
    if (band.albums.length > 0) {
      const firstAlbum = band.albums[0];
      return `${firstAlbum.name} (${firstAlbum.year})`;
    }
    return 'N/A';
  }

  getLastAlbumInfo(band: Band): string {
    if (band.albums.length > 0) {
      const lastAlbum = band.albums[band.albums.length - 1];
      return `${lastAlbum.name} (${lastAlbum.year})`;
    }
    return 'N/A';
  }
}
