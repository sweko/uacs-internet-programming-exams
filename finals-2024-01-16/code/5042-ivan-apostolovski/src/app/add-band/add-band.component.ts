import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BandsService } from '../services/bands.service';
import { Bands } from '../models/student';


@Component({
  selector: 'app-add-band',
  templateUrl: './add-band.component.html',
  styleUrls: ['./add-band.component.css']
})
export class AddBandComponent implements OnInit {
  addBandForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bandsService: BandsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addBandForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      genre: ['', Validators.required],
      formed: [null, Validators.required],
      location: ['', Validators.required],
      // members: this.formBuilder.array([], Validators.required),
      albums: this.formBuilder.array([], Validators.required),
      // Add more form controls as needed
    });
  }
// Convenience getters for easier access in the template
get members(): FormArray {
  return this.addBandForm.get('members') as FormArray;
}

get albums(): FormArray {
  return this.addBandForm.get('albums') as FormArray;
}

addMember(): void {
  this.members.push(this.formBuilder.control('', Validators.required));
} 
removeMember(index: number): void {
  this.members.removeAt(index);
}    

addAlbum(): void {
  this.albums.push(this.formBuilder.group({
    name: ['', Validators.required],
    year: [null, Validators.required]
  }));
}
removeAlbum(index: number): void {
  this.albums.removeAt(index);
}





  onSubmit(): void {
    if (this.addBandForm.valid) {
      const newBand : Bands = this.addBandForm.value;
      this.bandsService.addBand(newBand).subscribe({
        next: (addedBand) => {
          console.log('Band added successfully:', addedBand);
          // Optionally, you can navigate to the details page of the newly added band
          this.router.navigate(['/bands', addedBand.id]);
        },
        error: (error) => {
          console.error('Error adding band:', error);
          // Handle error appropriately, e.g., show an error message to the user
        }
      });
    }
  }
}