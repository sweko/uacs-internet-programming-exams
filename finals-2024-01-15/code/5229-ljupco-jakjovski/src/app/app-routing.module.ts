import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  // { path: 'movie-list', component: MovieListComponent },
  // { path: '', redirectTo: '/movie-list', pathMatch: 'full' },

  { path: "", redirectTo: "/movies", pathMatch: "full" },
  { path: "movies", component: MovieListComponent },
  { path: "movies/create", component: MovieCreateComponent },
  { path: "movies/:id", component: MovieDetailsComponent },
  { path: "movies/:id/edit", component: MovieEditComponent },
  { path: "statistics", component: MovieEditComponent },
 // { path: "actor/:id", component: Acto },
  { path: "**", redirectTo: "/movies" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
