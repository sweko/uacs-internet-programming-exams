import { Component } from '@angular/core';
import { Band } from '../../models/band';
import { ActivatedRoute, Router } from '@angular/router';
import { BandService } from '../../services/band/band.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrl: './band-details.component.css'
})
export class BandDetailsComponent {

  band?: Band;
  yearsActive: string = "";

  constructor(
    private route: ActivatedRoute, 
    private bandService: BandService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => this.isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.bandService.getBand(id)),
    ).subscribe({
      next: band => {
        this.band = band;
        this.sortMembers();
        this.sortedAlbums();
        this.calculateYearsActive(); 
      },
      error: err => console.log(err)
    })
  }

  isNumeric = (value: string | null): boolean => {
    if (value === null) {
        return false;
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
        return false;
    }
    if (numValue <= 0) {
        return false;
    }
    return true;
}

editBand() {
  this.router.navigate(['/bands', this.band!.id, "edit"]);
}

deleteBand() {
  throw new Error('Method not implemented.');
}

sortMembers(): void {
  if (this.band && this.band.members) {
    this.band.members.sort((a, b) => a.localeCompare(b));
  }
}

sortedAlbums(): { name: string; year: number }[] {
  if (this.band && this.band.albums) {
    return this.band.albums.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return a.name.localeCompare(b.name);
    });
  }
  return [];
}

calculateYearsActive(): void {
  if (this.band && this.band.formed && this.band.albums && this.band.albums.length > 0) {
    const formationYear = this.band.formed;
    const latestAlbumYear = Math.max(...this.band.albums.map(album => album.year));
    const currentYear = new Date().getFullYear();

    if (latestAlbumYear >= currentYear - 2) {
      this.yearsActive = `${formationYear} - present`;
    } else {
      this.yearsActive = `${formationYear} - ${latestAlbumYear}`;
    }
  }
}

}