import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {MoviesEditComponent} from "./movies-edit/movies-edit.component";
import {MoviesCreateComponent} from "./movies-create/movies-create.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  { path: 'movie-list', component: MovieListComponent },
  { path: '', redirectTo: '/movie-list', pathMatch: 'full' },
  {path: 'movies/:id', component: MovieDetailsComponent},
  {path: 'movies/:id/edit', component: MoviesEditComponent},
  {path: 'movies/create', component: MoviesCreateComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
