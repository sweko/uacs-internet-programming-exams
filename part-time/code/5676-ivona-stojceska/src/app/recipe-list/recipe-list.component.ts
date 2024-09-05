import { Component, OnInit } from '@angular/core';
import {RecipesService} from '../recipes.service';
import { Router } from '@angular/router';
import { Recipe } from '../client';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent{

constructor(private recipes: RecipesService, private router: Router){}
 
recipesData: any=[];
dataSource=new MatTableDataSource(this.recipesData);

ngOnInit(){
  this.recipes.getAllRecipes().subscribe((allData)=>
    {
      console.log(allData);
      this.recipesData=allData;
    });
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

truncateText(text: any) : string{

  const maxLength = 100;

  if (!text || text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';

}


goToCreateRecipe() {
  this.router.navigate(['/recipes/create']); 
}

viewRecipe(recipe: Recipe) {
  console.log(recipe.id);
  this.router.navigate(['/recipes', recipe.id]);
}

editRecipe(recipe: Recipe){
  console.log(recipe.id);
this.router.navigateByUrl(`/recipes/${recipe.id}/edit`);

}

deleteRecipe(recipe_id: any){
  console.log(recipe_id);
  this.recipes.deleteRecipeFromServer(recipe_id).subscribe
  ((result) => {
    this.ngOnInit()}) ;
}


}
