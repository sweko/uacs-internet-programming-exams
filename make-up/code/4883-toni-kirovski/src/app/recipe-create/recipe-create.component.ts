import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  createForm!: FormGroup; 
  cuisines: string[] = [];

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService) { }

  ngOnInit(): void {
    
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      cuisine: ['', Validators.required],
      description: [''],
      instructions: ['', Validators.required],
      time: ['', Validators.required],
      servings: ['']
    });

    this.fetchCuisines();
  }

  fetchCuisines(): void {
    this.recipeService.getCuisines()
      .subscribe(cuisines => {
        this.cuisines = cuisines;
      });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.recipeService.createRecipe(this.createForm.value)
        .subscribe(() => {
          
        });
    }
  }
}
