import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CuisinePageComponent } from './cuisine-page/cuisine-page.component';
import { IngredientsPageComponent } from './ingredients-page/ingredients-page.component';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/:id', component: RecipeDetailsPageComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'statistics', component: StatisticsListComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'cuisines', component: CuisinePageComponent },
  { path: 'ingredients', component: IngredientsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
