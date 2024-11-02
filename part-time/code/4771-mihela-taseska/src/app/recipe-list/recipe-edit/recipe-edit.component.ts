import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/Recipe';
import { RecipeService } from '../../services/recipe.service';
import { CuisineService } from '../../services/cuisine.service';
import { Cuisine } from '../../models/Cuisine';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  id: string = '';
  recipe!: Recipe;
  cuisines!: string[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private cuisineService: CuisineService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.recipeService.getRecipe(this.id).subscribe(
        (res) => {
          this.recipe = res;

          this.cuisineService.getAllCuisines().subscribe(
            (res) => {
              this.cuisines = res;
            },
            (err) => {
              window.alert('Cuisines not found');
              console.log('Cuisines not found');
            }
          );
        },
        (err) => {
          window.alert('Reciepe not found');
          console.log('Reciepe not found');
        }
      );
    });
  }

  editRecipe() {
    this.recipeService.editRecipe(this.recipe).subscribe(
      (res) => {
        this.router.navigate([`/recipes/${this.id}`]);
      },
      () => window.alert('Problem while editing recipe')
    );
  }
}
