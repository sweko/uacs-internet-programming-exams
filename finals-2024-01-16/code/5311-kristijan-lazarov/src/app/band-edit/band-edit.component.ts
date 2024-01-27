import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bands } from '../models/band';
import { BandsService } from '../services/bands.service';
import { PlacesService } from '../services/places.service';
import { Place } from '../models/places';


@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrls: ['./band-edit.component.css']
})
export class BandEditComponent implements OnInit {
  band?: Bands
  placesData: Place[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bandsService: BandsService,
    private placesService: PlacesService
  ) {}

  ngOnInit(): void {
    this.getBand();
    this.getPlaces();
  }

  getBand(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bandsService.getBand(id).subscribe({
        next: (band) => {
          this.band = band;
          console.log(band)
        }
      });
    }
  }

  getPlaces(): void {
    this.placesService.getPlaces().subscribe({
      next: (places) => {
        this.placesData = places;
      }
    });
  }


  addMember(): void {
    if (this.band) {
      this.band.members.push('');
    }
  }

  removeMember(index: number): void {
    if (this.band && this.band.members && index >= 0 && index < this.band.members.length) {
      this.band.members.splice(index, 1);
    }
  }

  addAlbum(): void {
    if (this.band) {
      this.band.albums.push({ name: '', year: 2024 });
    }
  }


  removeAlbum(index: number): void {
    if (this.band && this.band.albums && index >= 0 && index < this.band.albums.length) {
      this.band.albums.splice(index, 1);
    }
  }


  onSaveChanges(): void {
    if (this.validator() && this.band) {
      this.bandsService.updateBand(this.band).subscribe({
        next: () => {
          console.log('Band updated successfully.');
          this.router.navigate(['/bands', this.band?.id]);
        }
      });
    }
  }


  validator(): boolean {
    if (this.band) {
      // Validate albums
      const newAlbum = this.band.albums[this.band.albums.length - 1];
      if (!newAlbum.name || newAlbum.name.trim() === '' || !newAlbum.year) {
        alert('Both Album Name and Year are required.');
        return false;
      }

      // Validate members
      const newMember = this.band.members[this.band.members.length - 1];
      if (!newMember || newMember.trim() === '') {
        alert('Member field cannot be empty.');
        return false;
      }
      return true;
    }
    return false;
  }

  
  onCancel(): void {
    this.router.navigate(['/bands', this.band?.id]);
  }
}  