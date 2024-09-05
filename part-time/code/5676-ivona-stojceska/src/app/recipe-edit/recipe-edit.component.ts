import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { RecipesService } from '../recipes.service';
import { CuisinesService } from '../cuisines.service';
import { IngredientsService } from '../ingredients.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})

export class RecipeEditComponent implements OnInit {

  nextId: number = 20;
  cuisines: any; 
  ingredients: any; 

  recipeId:any;
  recipe: any;
 

  constructor(private recipeService: RecipesService,private route: ActivatedRoute, private cuisinesService:CuisinesService, 
    private ingredientsService: IngredientsService){

  }

  

  ngOnInit(): void {

      //this.addRecipe.patchValue({ id: this.nextId });
      //localStorage.setItem('currentId', this.nextId.toString());

      this.route.paramMap.subscribe(params => {
        this.recipeId = params.get('id')});

        this.recipeService.getRecipeById(this.recipeId).subscribe((data)=> {
          console.log(data);
          this.recipe=data;
        })

        console.log(this.recipeId);

      this.cuisinesService.getAllCuisines().subscribe((data: any) => {
        this.cuisines = data; 
      })

      }

   onSubmit() {

   /* if (this.addRecipe.valid){
    console.log(this.addRecipe.value);
    this.recipe.saveRecipeData(this.addRecipe.value).subscribe((result) => (console.log(result) ));

    this.nextId++;
    localStorage.setItem('nextId', this.nextId.toString());
    
      
        this.addRecipe.reset({});

        this.router.navigate(['/recipes']); 
      }
      else{
      alert('At least Title, Instructions, Cuisine & Time are required!!!');
      }*/
    }
  
}





