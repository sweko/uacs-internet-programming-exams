import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import {MovieDetailsComponent} from "./movie-detail/movie-details.component";
import { MovieEditComponent } from "../movie-edit/movie-edit.component";
import {MovieCreateComponent} from "./movie-create/movie-create.component";
import {MovieStatisticsComponent} from "./statistics/movie-statistics.component";

const routes: Routes = [
  { path: 'movie-list', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'movies/:id/edit', component: MovieEditComponent },
  { path: 'movies-create', component: MovieCreateComponent },
  { path: 'statistics', component: MovieStatisticsComponent },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
