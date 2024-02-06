import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { DetailsRecipieComponent } from './details-recipie/details-recipie.component';
import { EditRecipieComponent } from './edit-recipie/edit-recipie.component';
import { CreateRecipieComponent } from './create-recipie/create-recipie.component';

const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  { path: 'recipes', component: RecipeListComponent },
  { path: "recipes/create", component: CreateRecipieComponent },
  { path: "recipes/:id", component: DetailsRecipieComponent }, 
  { path: "recipes/:id/edit", component: EditRecipieComponent },
  { path: "**", redirectTo: "/recipes" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
