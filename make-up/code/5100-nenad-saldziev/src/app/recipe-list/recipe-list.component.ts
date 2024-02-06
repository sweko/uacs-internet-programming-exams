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
    
    isAlive(author: recipes) {
      return author.deathDate === undefined;
    }
      
    deleteAuthor(author: recipes) {
      this.selectedAuthor = author;
      this.dialog?.nativeElement.showModal();
    }
      
    editAuthor(author: recipes) {
      this.router.navigate(['/recipes', author.id, "edit"]);
    }
      
    viewAuthor(author: recipes) {
      this.router.navigate(['/recipes', author.id]);
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
