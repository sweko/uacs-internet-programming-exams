import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({}); 
  cuisines: string[] = []; 
  recipe: Recipe = {
    id: 0, title: '', cuisine: '', description: '',
    ingredients: undefined
  };

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      cuisine: ['', Validators.required],
      description: [''],
      instructions: ['', Validators.required],
      time: ['', Validators.required],
      servings: ['']
    });

    //this.recipe = +this.route.snapshot.paramMap.get('id');
    //this.fetchRecipeDetails(this.recipeId);
  }

  createForm(): void {
    this.editForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      cuisine: ['', Validators.required],
      description: [''],
      instructions: ['', Validators.required],
      time: ['', Validators.required],
      servings: ['']
    });
  }

  fetchCuisines(): void {
    this.recipeService.getCuisines()
      .subscribe(cuisines => {
        this.cuisines = cuisines;
      });
  }

  getRecipe(id: number): void {
    //this.recipeService.getRecipes(id)
      //.subscribe(recipe => {
       // this.recipe = recipe;
        //this.editForm.patchValue(recipe);
      //});
  }

  onSave(): void {
    if (this.editForm.valid) {
      const idString = this.route.snapshot.paramMap.get('id');
      const id = idString ? +idString : 0;

      this.recipeService.updateRecipe(id, this.editForm.value)
        .subscribe(() => {
          this.router.navigate(['/recipes', id]);
        });
    }
  }

}
