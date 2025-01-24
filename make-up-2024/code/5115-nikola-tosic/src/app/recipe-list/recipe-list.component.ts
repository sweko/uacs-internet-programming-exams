import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  cuisines: string[] = [];
  ingredients: string[] = [];
  titleFilter: string = '';
  selectedCuisine: string = '';
  selectedIngredient: string = '';

  constructor(private apiService: ApiService, private router: Router) { }


  
  ngOnInit(): void {
    this.loadRecipes();
    this.loadCuisines();
    this.loadIngredients();
  }

  loadRecipes(): void {
    this.apiService.getRecipes().subscribe((data: any[]) => {
      this.recipes = data;
      this.applyFilters(); 
    });
  }

  loadCuisines(): void {
    this.apiService.getCuisines().subscribe((data: string[]) => {
      this.cuisines = data;
      this.cuisines.unshift('');
    });
  }

  loadIngredients(): void {
    this.apiService.getIngredients().subscribe((data: string[]) => {
      this.ingredients = data;
      this.ingredients.unshift('');
    });
  }

  applyFilters(event?: any): void {
    const titleValue = this.titleFilter.toLowerCase().trim();
    const cuisineValue = this.selectedCuisine;
    const ingredientValue = this.selectedIngredient;

    this.filteredRecipes = this.recipes.filter(recipe =>
      (recipe.title.toLowerCase().includes(titleValue) || titleValue === '') &&
      (recipe.cuisine === cuisineValue || cuisineValue === '') &&
      (ingredientValue === '' || recipe.ingredients.some((ingredient: any) => ingredient.name === ingredientValue))
    );
  }

  sort(field: string): void {
    this.filteredRecipes.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
    return `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
  }

  viewRecipe(id: number): void {
    this.router.navigate(['/recipes', id]);
  }

  editRecipe(id: number): void {
    this.router.navigate(['/recipes', id, 'edit']);
  }

  deleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.apiService.deleteRecipe(id).subscribe(() => {
        this.loadRecipes();
      });
    }
  }

  addRecipe(): void {
    this.router.navigate(['/recipes/create']);
  }
}
