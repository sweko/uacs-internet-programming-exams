import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { CastCreateComponent } from './cast-create/cast-create.component';

const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'movies/:id/edit', component: MovieEditComponent },
  { path: 'movies/create', component: MovieCreateComponent },
  { path: 'actor/:id', component: ActorDetailsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'movies/:id/cast/add', component: CastCreateComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
