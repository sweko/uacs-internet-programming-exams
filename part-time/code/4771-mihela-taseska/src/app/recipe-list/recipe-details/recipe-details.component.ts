import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/Recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  id: string = '';
  recipe!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.recipeService.getRecipe(this.id).subscribe(
        (res) => {
          this.recipe = res;
        },
        (err) => {
          console.log('Reciepe not found');
        }
      );
    });
  }

  deleteRecipe() {
    if (!confirm('Ovaa akcija kje go izbrisi zapisot, dali ste sigurni?')) {
      window.alert('Elementot ne bese izbrisan');
      return;
    }
    this.recipeService.deleteRecipe(this.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
