import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-list/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { RecipeCreateComponent } from './recipe-list/recipe-create/recipe-create.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';
import { IngredientDetailsComponent } from './ingredient-list/ingredient-details/ingredient-details.component';
import { CuisineDetailsComponent } from './cuisine-list/cuisine-details/cuisine-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeListComponent,
    pathMatch: 'full',
  },

  { path: 'recipes/create', component: RecipeCreateComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent, pathMatch: 'full' },
  { path: 'recipes/:id/edit', component: RecipeEditComponent },

  {
    path: 'ingredients',
    component: IngredientListComponent,
  },
  { path: 'ingredients/:id', component: IngredientDetailsComponent },
  {
    path: 'cuisines',
    component: CuisineListComponent,
  },
  { path: 'cuisines/:id', component: CuisineDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // Redirect to recipes by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
