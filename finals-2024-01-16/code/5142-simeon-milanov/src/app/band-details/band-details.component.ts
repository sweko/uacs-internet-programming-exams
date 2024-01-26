import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandService } from '../services/band.service';
import { Band } from '../models/band.model';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrls: ['./band-details.component.css'],
})
export class BandDetailsComponent implements OnInit {
  band: Band | undefined;

  constructor(
    private bandService: BandService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBandDetails();
  }

  loadBandDetails(): void {
    const bandId = this.route.snapshot.paramMap.get('id');
    if (bandId) {
      this.bandService.getBandById(bandId).subscribe((band) => {
        this.band = band;
      });
    }
  }

  navigateToEditPage(): void {
    if (this.band) {
      this.router.navigate([`/bands/${this.band.id}/edit`]);
    }
  }

  confirmDelete(): void {
    if (this.band) {
      const isConfirmed = confirm('Are you sure you want to delete this band?');
      if (isConfirmed) {
        this.deleteBand();
      }
    }
  }

  deleteBand(): void {
    if (this.band) {
      const bandId = this.band.id.toString();
      this.bandService.deleteBand(bandId).subscribe(() => {
        this.router.navigate(['/bands']);
      });
    }
  }
  

  extractCountryName(location: string): string {
    const parts = location.split(', ');
    return parts.length === 2 ? parts[1] : 'N/A';
  }

  extractCountryId(location: string): string {
    const parts = location.split(', ');
    return parts.length === 2 ? parts[1].toLowerCase() : '';
  }

  sortedMembers(members: string[] | undefined): string[] {
    return members ? members.sort() : [];
  }

  sortedAlbums(albums: any[] | undefined): any[] {
    return albums ? albums.sort((a, b) => (a.year === b.year ? a.name.localeCompare(b.name) : a.year - b.year)) : [];
  }

  calculateYearsActive(band: Band | undefined): string {
    if (band && band.albums.length > 0) {
      const startYear = band.formed.toString();
      const lastAlbumYear = Math.max(...band.albums.map((album) => album.year)).toString();
      const currentYear = new Date().getFullYear();

      if (lastAlbumYear === currentYear.toString() || lastAlbumYear === (currentYear - 1).toString() || lastAlbumYear === (currentYear - 2).toString()) {
        return `${startYear} - present`;
      } else {
        return `${startYear} - ${lastAlbumYear}`;
      }
    }

    return 'N/A';
  }
}
