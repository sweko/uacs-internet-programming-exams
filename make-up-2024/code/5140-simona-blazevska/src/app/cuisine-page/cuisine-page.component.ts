import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-cuisine-page',
  templateUrl: './cuisine-page.component.html',
  styleUrl: './cuisine-page.component.css',
})
export class CuisinePageComponent implements OnInit {
  cuisines: any = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getCuisines().subscribe((cuisine) => {
      this.cuisines = cuisine;
    });
  }
}
