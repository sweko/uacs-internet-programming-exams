import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'; 
const routes: Routes = [
  { path: '', redirectTo: 'recipies', pathMatch: 'full'},
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe-/:id', component: RecipeDetailsComponent},
  { path: 'add', component: RecipeAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
