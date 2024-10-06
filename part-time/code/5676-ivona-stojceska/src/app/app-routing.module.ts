import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
 import { IngridientsListComponent } from './ingridients-list/ingridients-list.component';
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CuisineDetailsPageComponent } from './cuisine-details-page/cuisine-details-page.component';
import { IngridientsDetailsPageComponent } from './ingridients-details-page/ingridients-details-page.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';





const routes: Routes = [
  { path: "", redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeListComponent},

  {path: 'recipes/create', component: RecipeCreateComponent},
  {path: 'recipes/:id' , component: RecipeDetailsComponent},
  {path: 'recipes/:id/edit' , component: RecipeEditComponent },
  
  
  {path: 'ingredients', component: IngridientsListComponent},
  {path: 'ingredients/:id' , component: IngridientsDetailsPageComponent},
  {path: 'cuisine' , component: CuisineListComponent},
  {path: 'cuisine/:id' , component: CuisineDetailsPageComponent},


  {path: 'about' , component: AboutPageComponent},
  {path: 'statistics' , component: StatisticsPageComponent}



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
