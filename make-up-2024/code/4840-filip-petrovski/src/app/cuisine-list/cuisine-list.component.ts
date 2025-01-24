import { Component, OnInit } from '@angular/core';
import { Cuisine } from '../cuisine.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrls: ['./cuisine-list.component.css']
})
export class CuisineListComponent implements OnInit {
  cuisines: Cuisine[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getCuisines().subscribe(cuisines => {
      this.cuisines = cuisines;
    });
  }
}