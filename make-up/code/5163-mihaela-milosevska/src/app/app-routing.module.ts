import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'; 

const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: "recipes", component: RecipeListComponent }, 
  { path: "recipes/:id", component: RecipeDetailsComponent }, 
  { path: "recipes/:id/edit", component: RecipeEditComponent },
  { path: "**", redirectTo: "/recipes" },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
