import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { RecipieServiceService } from '../recipie-service.service';
import { Recipie } from '../models/client';
import { isNumeric } from '../common/utils';

@Component({
  selector: 'app-details-recipie',
  templateUrl: './details-recipie.component.html',
  styleUrl: './details-recipie.component.css'
})
export class DetailsRecipieComponent implements OnInit{

  recipie?: Recipie;

  constructor(
    private route: ActivatedRoute, 
    private recepesService: RecipieServiceService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.recepesService.getRecipie(id)),
    ).subscribe({
      next: recepie => {
        this.recipie = recepie;
      },
      error: err => console.log(err)
    });
  }

  deleteRecipie() {
    if(this.recipie && confirm(`Are you sure you want to delete ${this.recipie.title}?`)) {
      this.recepesService.deleteRecipie(this.recipie.id).subscribe({
        next: () => this.router.navigate(['/recipes']),
        error: err => console.log(err),
      });
    }
  }

  editRecipie() {
    this.router.navigate(['/recepes', this.recipie!.id, "edit"]);
  }
}