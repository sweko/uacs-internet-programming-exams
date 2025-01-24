import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RecipieServiceService } from '../recipie-service.service';
import { Recipie } from '../models/client';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipie[] = [];
  recipesSubscription$?: Subscription;
  selectedRecipie?: Recipie;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>;

  constructor(private recipesService: RecipieServiceService, private router: Router) {}

  ngOnInit(): void {
    this.recipesSubscription$ = this.recipesService.getRecipies().subscribe({
      next: recipes => this.recipes = recipes.sort((a, b) => a.id - b.id),
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.recipesSubscription$?.unsubscribe();
  }

  deleteRecipie(recipie: Recipie) {
    this.selectedRecipie = recipie;
    this.dialog?.nativeElement.showModal();
  }

  editRecipie(movie: Recipie) {
    this.router.navigate(['/Recipes', movie.id, "edit"]);
  }

  viewRecipie(recipie: Recipie) {
    this.router.navigate(['/recipes', recipie.id]);
  }

  addRecipie() {
    this.router.navigate(['/recipes', "create"]);
  }

  confirmModal() {
    this.recipesService.deleteRecipie(this.selectedRecipie!.id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(r => r.id !== this.selectedRecipie!.id);
        this.selectedRecipie = undefined;
      },
      error: err => console.log(err)
    });
    this.closeModal();
  }

  closeModal() {
    this.selectedRecipie = undefined;
    this.dialog?.nativeElement.close();
  }
}

