import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent  implements OnInit{

  recipeId:any;
  recipe: any;

  constructor(  private router: Router, 
    private recipeService: RecipesService,  private route: ActivatedRoute){}
  
  ngOnInit() { 
    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id')});

      this.recipeService.getRecipeById(this.recipeId).subscribe((data)=> {
        console.log(data);
        this.recipe=data;
      })
  }

  deleteRecipe(recipe_id: any){
    console.log(recipe_id);
    this.recipeService.deleteRecipeFromServer(recipe_id).subscribe(
      () => this.router.navigate(['/recipes'])
    )
    }
  

  formatTime(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
  
    if (hours > 0 && minutes > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  }

  }
