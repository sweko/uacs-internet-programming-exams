
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Recipe, Ingredient } from '../models/recipe';

  @Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-create.component.html',
    styleUrls: ['./recipe-create.component.css']
  })

  export class RecipeCreateComponent implements OnInit 
  {
    newRecipe: Recipe = {};

    constructor(private apiService: ApiService)
    {

    }
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }

    addIngredient() {
      if(!this.newRecipe.ingredients)
      {
        this.newRecipe.ingredients = []; 
      }
      
      this.newRecipe.ingredients.push({name: '', quantity: 0, unit: ''});
    }

    removeIngredient(i: number)
    {
      this.newRecipe.ingredients.splice(i, 1);
    }

    createRecipe() {
      this.apiService.createRecipe(this.newRecipe).subscribe(
        (response: any) => {
          console.log('Recipe created successfully:', response);
          // Clear the form after successful creation
          this.newRecipe = {};
        },
        (error: any) => {
          console.error('Error creating recipe:', error);
        }
      );
    }

  }
  
