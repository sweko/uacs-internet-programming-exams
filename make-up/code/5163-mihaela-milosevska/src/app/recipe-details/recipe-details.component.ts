import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { isNumeric } from '../common/utils';
import { Recipe } from '../models/client';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe?: Recipe;

  constructor(
    private route: ActivatedRoute, 
    private recipesService: RecipesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => isNumeric(id)),
      map(id => parseInt(id!, 10)),
      switchMap(id => this.recipesService.getRecipe(id)),
    ).subscribe({
      next: recipe => {
        this.recipe = recipe;
      },
      error: err => console.log(err)
    });
  }

  deleteRecipe() {
    if(this.recipe && confirm(`Confirmation for deleting ${this.recipe.title}?`)) {
      this.recipesService.deleteRecipe(this.recipe.id).subscribe({
        next: () => this.router.navigate(['/recipes']),
        error: err => console.log(err),
      });
    }
  }

  editRecipe() {
    this.router.navigate(['/recipes', this.recipe!.id, "edit"]);
  }
}