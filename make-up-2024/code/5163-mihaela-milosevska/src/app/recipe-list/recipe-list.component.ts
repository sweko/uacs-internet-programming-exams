import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/client';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipesSubscription$?: Subscription;
  selectedRecipe?: Recipe;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>;

  constructor(private recipesService: RecipesService, private router: Router) { }

  ngOnInit(): void {
    this.recipesSubscription$ = this.recipesService.getRecipes().subscribe({
      next: recipes => this.recipes = recipes.sort((a, b) => a.id - b.id),
      error: err => console.log(err)
    });
  }
  
  ngOnDestroy(): void {
    this.recipesSubscription$?.unsubscribe();
  }

  deleteRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.dialog?.nativeElement.showModal();
  }

  editRecipe(recipe: Recipe) {
    this.router.navigate(['/recipes', recipe.id, "edit"]);
  }

  viewRecipe(recipe: Recipe) {
    this.router.navigate(['/recipes', recipe.id]);
  }

  addRecipe() {
    this.router.navigate(['/recipes', "create"]);
  }

  confirmModal() {
    this.recipesService.deleteRecipe(this.selectedRecipe!.id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(r => r.id !== this.selectedRecipe!.id);
        this.selectedRecipe = undefined;
      },
      error: err => console.log(err)
    });
    this.closeModal();
  }

  closeModal() {
    this.selectedRecipe = undefined;
    this.dialog?.nativeElement.close();
  }
}
