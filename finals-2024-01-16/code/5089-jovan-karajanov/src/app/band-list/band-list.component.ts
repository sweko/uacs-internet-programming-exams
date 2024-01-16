import { Component, OnInit } from '@angular/core';
import { BandServiceService } from '../service/band-service.service';
import { Bands } from '../models/client';
import { Subscription, map } from 'rxjs';
import { BandServerModel } from '../models/server';
import { toBand } from '../models/mapping';
import { Router } from '@angular/router';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.css']
})
export class BandListComponent implements OnInit {
  bands: Bands[] = [];
  bandsSubscription$?:Subscription;
  sortField: string = '';
  sortDirection: string = 'asc';

  constructor(private bandService: BandServiceService,private router:Router) {}

  ngOnInit() {
    this.loadBands();
  }

  loadBands() {
    this.bandsSubscription$ = this.bandService.getBands().pipe(
      map((serverBands: BandServerModel[]) => {
        
        return serverBands.map(serverBand => toBand(serverBand));
      })
    ).subscribe(
      (bands) => {
        this.bands = bands;
      },
      (error) => {
        console.error('Error loading bands:', error);
      }
    );
  }

  private extractCountry(location: string): string {
    const parts = location.split(', ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  private getFirstAlbum(albums: { name: string; year: number }[]): { name: string; year: number } | undefined {
    return albums.length > 0 ? albums[0] : undefined;
  }

  private getLastAlbum(albums: { name: string; year: number }[]): { name: string; year: number } | undefined {
    return albums.length > 0 ? albums[albums.length - 1] : undefined;
  }

  sort(field: string) {
    this.sortField = field;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.bands.sort((a, b) => {
      const aValue = this.getFieldValue(a, this.sortField);
      const bValue = this.getFieldValue(b, this.sortField);

      // Compare values based on the sort direction
      if (this.sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }

  private getFieldValue(band: Bands, field: string): any {
    return band[field as keyof Bands];
  }
  viewBandDetails(id: number) {
    this.router.navigate(['/bands-list', id]); 
  }

  // Edit action
  editBandDetails(id: number) {
    this.router.navigate(['/bands-list', id, 'edit']); // Assuming your route is '/bands/:id/edit'
  }

  // Delete action
  deleteBand(id: number) {
    this.bandService.deleteBand(id).subscribe(
      () => {
        this.loadBands();
      },
      (error) => {
        console.error('Error deleting band:', error);
      }
    );
  }


}

