import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';
import { CuisineService } from '../../services/cuisine.service';
import { Recipe } from '../../models/Recipe';

@Component({
  selector: 'app-cuisine-details',
  templateUrl: './cuisine-details.component.html',
  styleUrl: './cuisine-details.component.css',
})
export class CuisineDetailsComponent implements OnInit {
  name: string = '';
  cuisine: any = { name: '', recipes: [] };

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.name = param['id'];
      debugger;

      this.recipeService.getRecipes().subscribe((res: Recipe[]) => {
        let tmp = res;

        tmp.forEach((recipee: any) => {
          if (recipee.cuisine == this.name) {
            this.cuisine.recipes.push({ ...recipee });
          }
        });

        this.cuisine.name = this.name;
      });
    });
  }
}
