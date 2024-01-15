import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component'; 
import { MovieCreateComponent } from './movie-create/movie-create.component';


const routes: Routes = [ 
   { path: "", redirectTo: "/movies", pathMatch: "full" },
   { path: "movies", component: MovieListComponent }, 
   { path: "movies/create", component: MovieCreateComponent },
   { path: "movies/:id", component: MovieDetailsComponent }, 
   { path: "movies/:id/edit", component: MovieEditComponent },
   { path: "**", redirectTo: "/movies" },
 ];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
 }) 
  export class AppRoutingModule { }