import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/band.services';
import { Band } from '../models/band';

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrls: ['./band-edit.component.css']
})
export class BandEditComponent implements OnInit {
  band: Band | undefined;
  cities: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bandsService: BandsService
  ) {}

  ngOnInit(): void {
    this.getBandDetails();
    
  }

  getBandDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bandsService.getBandById(+id).subscribe((band) => {
        this.band = band;
       
      });
    }
  }

  updateMember(index: number, event: Event): void {
    if (this.band) {
      const target = event.target as HTMLInputElement;
      this.band.members[index] = target.value;
    }
  }


  
  saveChanges(): void {
    if (this.band) {
      this.bandsService.updateBand(this.band).subscribe(() => {
        this.router.navigate(['/band-details', this.band!.id]);
      });
    }
  }
}
