import { Component } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { IngredientsService } from '../ingredients.service';
import { CuisinesService } from '../cuisines.service';




@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.css'
})
export class StatisticsPageComponent {

recipesData:any;
ingredientsData:any;
cuisinesData:any;

  constructor (private recipes: RecipesService, private ingredients: IngredientsService, private cuisines: CuisinesService){}

  ngOnInit(){
    this.recipes.getAllRecipes().subscribe((allData)=>
      {
        console.log(allData);
        this.recipesData=allData;
      });

      this.ingredients.getAllIngredients().subscribe((allData)=>
        {
          console.log(allData);
          this.ingredientsData=allData;
        });

        this.cuisines.getAllCuisines().subscribe((allData)=>
          {
            console.log(allData);
            this.cuisinesData=allData;
          }); 
  }
  


}
