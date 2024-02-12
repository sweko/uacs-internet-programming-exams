import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { recipes } from '../../model/client';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
[x: string]: any;
  authors: recipes[] = [];
  authorsSubscription$?: Subscription;
  selectedAuthor?: recipes;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>; // TODO: type

  constructor(private recipesService: RecipesService, private router: Router) { }

  ngOnInit(): void {
    this.authorsSubscription$ = this.recipesService.getRecipes().subscribe({
      next: recipes => this['recipes'] = recipes,
      error: err => console.log(err)
    });
  }

    ngOnDestroy(): void {
      this['recipesSubscription$']?.unsubscribe();
    }
    
    // isAlive(recipes: recipes) {
    //   return recipes.deathDate === undefined;
    // }
      
    deleteAuthor(recipes: recipes) {
      this.selectedAuthor = recipes;
      this.dialog?.nativeElement.showModal();
    }
      
    editAuthor(recipes: recipes) {
      this.router.navigate(['/recipes', recipes.id, "edit"]);
    }
      
    viewAuthor(recipes: recipes) {
      this.router.navigate(['/recipes', recipes.id]);
    }
      
    addAuthor() {
      this.router.navigate(['/recipes', "create"]);
    }
      
    confirmModal() {
      this.recipesService.deleteRecipes(this.selectedRecipes!.id).subscribe({
        next: () => {
          this.recipes = this.recipes.filter(a => a.id !== this.selectedRecipes!.id);
          this.selectedRecipes = undefined;
        },
        error: err => console.log(err)
      });
      this.closeModal();
    }
      
    closeModal() {
      this.selectedRecipes = undefined;
      this.dialog?.nativeElement.close();
    }
} 
