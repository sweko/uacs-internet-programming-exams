import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { AboutComponent } from './about/about.component';
import { CastCreateComponent } from './cast-create/cast-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/movie-list', pathMatch: 'full' },
  { path: 'movie-list', component: MovieListComponent },
  { path: "movies/create", component: MovieCreateComponent },
  { path: "movies/:id", component: MovieDetailsComponent },
  { path: "movies/:id/edit", component: MovieEditComponent },
  { path: "statistics", component: StatisticsComponent},
  { path: "actors/:id", component: ActorDetailsComponent},
  { path: "about", component: AboutComponent},
  { path: "movies/:id/cast/add", component: CastCreateComponent},
  { path: "**", redirectTo: "/movies" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
