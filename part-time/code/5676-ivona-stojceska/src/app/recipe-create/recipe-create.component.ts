import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { RecipesService } from '../recipes.service';
import { CuisinesService } from '../cuisines.service';
import { IngredientsService } from '../ingredients.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css'
})
export class RecipeCreateComponent implements OnInit {

  nextId: number = 20;
  cuisines: any; 
  ingredients: any; 
 

  constructor(private recipe: RecipesService,private router: Router, private cuisinesService:CuisinesService, private ingredientsService: IngredientsService){
    const storedId = localStorage.getItem('nextId');
    this.nextId = storedId ? parseInt(storedId) : 20;


  }

  addRecipe=new FormGroup({
    id: new FormControl({ value: this.nextId, disabled: true }),
    title: new FormControl('',Validators.required), 
    cuisine: new FormControl('',Validators.required), 
    description: new FormControl(''),
    ingredients: new FormControl([]),
    instructions: new FormControl('',Validators.required),
    time: new FormControl('', Validators.required),
    servings: new FormControl('')
  }
  )

  ngOnInit(): void {

      this.addRecipe.patchValue({ id: this.nextId });
      localStorage.setItem('currentId', this.nextId.toString());

      this.cuisinesService.getAllCuisines().subscribe((data: any) => {
        this.cuisines = data; 
        console.log(this.cuisines);
      })

      }

   onSubmit() {

    if (this.addRecipe.valid){
    console.log(this.addRecipe.value);
    this.recipe.saveRecipeData(this.addRecipe.value).subscribe((result) => (console.log(result) ));

    this.nextId++;
    localStorage.setItem('nextId', this.nextId.toString());
    
      
        this.addRecipe.reset({});

        this.router.navigate(['/recipes']); 
      }
      else{
      alert('At least Title, Instructions, Cuisine & Time are required!!!');
      }
    }
  
}


