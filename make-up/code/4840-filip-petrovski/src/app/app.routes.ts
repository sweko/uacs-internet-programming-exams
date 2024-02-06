import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';
import { IngredientsDetailsComponent } from './ingredients-details/ingredients-details.component';
import { CuisineDetailsComponent } from './cuisine-details/cuisine-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'recipes/:id/edit', component: RecipeEditComponent },
  { path: 'recipes/create', component: RecipeCreateComponent },
  { path: 'ingredients', component: IngredientsListComponent },
  { path: 'cuisine', component: CuisineListComponent },
  { path: 'ingredients/:id', component: IngredientsDetailsComponent },
  { path: 'cuisine/:id', component: CuisineDetailsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }