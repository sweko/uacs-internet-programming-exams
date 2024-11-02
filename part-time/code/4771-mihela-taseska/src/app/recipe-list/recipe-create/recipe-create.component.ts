import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { Cuisine } from '../../models/Cuisine';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CuisineService } from '../../services/cuisine.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css',
})
export class RecipeCreateComponent implements OnInit {
  recipe = {
    title: '',
    time: 0,
    description: '',
    cuisine: '',
    instructions: '',
    servings: 0,
    ingredients: [],
  };
  cuisines!: string[];
  title: string = '';
  cuisine: string = '';
  description: string = '';
  instruction: string = '';
  time!: number;
  servings: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private cuisineService: CuisineService
  ) {}

  ngOnInit() {
    this.cuisineService.getAllCuisines().subscribe(
      (res) => {
        this.cuisines = res;
      },
      (err) => {
        window.alert('Cuisines not found');
        console.log('Cuisines not found');
      }
    );
  }

  resetFields() {
    this.recipe.time = 0;
    this.recipe.description = '';
    this.recipe.title = '';
  }

  createRecipe() {
    this.recipe.time = this.time;
    this.recipe.title = this.title;
    this.recipe.description = this.description;
    this.recipe.instructions = this.instruction;
    this.recipe.cuisine = this.cuisine;
    this.recipe.servings = parseInt(this.servings);
    this.recipeService.createRecipe(this.recipe).subscribe(
      (res) => {
        this.router.navigate([`/recipes/${res.id}`]);
      },
      (err) => {
        console.log('Error while creating recipes');
      }
    );
    //Logic for creating recipes
  }
}
